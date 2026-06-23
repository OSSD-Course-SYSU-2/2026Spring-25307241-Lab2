/**
 * 冰迹·EdgeFlow - 主导航页面
 * 底部五Tab导航：训练台、动作库、冰闻、成就、我的
 */

import router from '@ohos.router';
import { TestDataGenerator } from '../utils/TestDataGenerator';
import { MoveLibraryPage } from './MoveLibraryPage';
import { AchievementPage } from './AchievementPage';
import { DataStore } from '../services/DataStore';
import { PracticeRecord, WeeklyPlan, DailyPlan, PlannedMove } from '../models/IceTraceData';
import { DeviceUtils } from '../common/utils/DeviceUtils';

@Entry
@Component
struct EdgeFlowMainPage {
  @State currentTab: number = 0;
  @State isTraining: boolean = false;
  @State trainingTime: number = 0;
  @State selectedMoves: string[] = [];
  @State showMoveSelector: boolean = false;
  
  // 当天历史练习记录
  @State todayRecords: PracticeRecord[] = [];
  @State showHistoryPanel: boolean = false;
  
  // 周训练计划
  @State currentWeekPlan: WeeklyPlan | null = null;
  @State showPlanPanel: boolean = false;
  @State editingDayIndex: number = -1;
  @State showAddMovePanel: boolean = false;
  @State selectedMoveForPlan: string = '';
  @State targetCountInput: string = '';
  @State selectedPriority: string = 'medium';
  
  private timer: number = -1;
  private dataStore: DataStore = DataStore.getInstance();
  
  // 可选动作列表
  private jumpMoves: string[] = ['1A', '2A', '3A', '1Lz', '2Lz', '3Lz', '1F', '2F', '3F', '1Lo', '2Lo', '3Lo', '1S', '2S', '3S', '1T', '2T', '3T'];
  private spinMoves: string[] = ['USp', 'SSp', 'CSp', 'LSp', 'CCoSp'];
  private stepMoves: string[] = ['StSq', 'CiSt', 'RoLi', 'SlSt'];
  
  aboutToAppear() {
    // 注释掉测试数据生成，避免初始值不为零
    // TestDataGenerator.getInstance().generateTestData();
    // 加载今日记录和周计划
    this.loadTodayRecords();
    this.loadCurrentWeekPlan();
  }
  
  aboutToDisappear() {
    if (this.timer !== -1) {
      clearInterval(this.timer);
    }
  }
  
  loadTodayRecords() {
    this.todayRecords = this.dataStore.getTodayRecords();
  }
  
  loadCurrentWeekPlan() {
    const plan = this.dataStore.getCurrentWeekPlan();
    this.currentWeekPlan = plan || null;
  }
  
  // 格式化时间
  formatTime(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }
  
  // 计算疲劳度
  calculateFatigue(): number {
    let fatigue = 0;
    this.selectedMoves.forEach(move => {
      if (this.jumpMoves.includes(move)) fatigue += 7;
      else if (this.spinMoves.includes(move)) fatigue += 3;
      else if (this.stepMoves.includes(move)) fatigue += 1;
    });
    return fatigue;
  }
  
  // 获取今日总训练分钟
  getTodayTotalMinutes(): number {
    // 计算已保存记录的总时长
    const savedSeconds = this.todayRecords.reduce((sum, record) => sum + record.duration, 0);
    // 加上当前正在训练的时长
    const currentSeconds = this.isTraining ? this.trainingTime : 0;
    return Math.floor((savedSeconds + currentSeconds) / 60);
  }
  
  // 获取今日总疲劳度
  getTodayTotalFatigue(): number {
    // 计算已保存记录的总疲劳度
    const savedFatigue = this.todayRecords.reduce((sum, record) => sum + record.fatigue, 0);
    // 加上当前正在训练的疲劳度
    const currentFatigue = this.isTraining ? this.calculateFatigue() : 0;
    return savedFatigue + currentFatigue;
  }
  
  // 获取今日总训练次数
  getTodayTotalCount(): number {
    // 已保存记录数 + 当前正在训练的动作数
    return this.todayRecords.length + (this.isTraining ? this.selectedMoves.length : 0);
  }
  
  build() {
    Stack() {
      Column() {
        // 内容区域
        Column() {
          if (this.currentTab === 0) {
            this.buildTrainingGround()
          } else if (this.currentTab === 1) {
            MoveLibraryPage()
          } else if (this.currentTab === 2) {
            AchievementPage()
          } else {
            this.buildProfile()
          }
        }
        .width('100%')
        .layoutWeight(1)
        
        // 底部导航栏
        this.buildBottomNav()
      }
      .width('100%')
      .height('100%')
      .linearGradient({
        angle: 135,
        colors: [['#00D2FF', 0.0], ['#3A7BD5', 1.0]]
      })
      
      // 动作选择弹窗
      if (this.showMoveSelector) {
        this.buildMoveSelector()
      }
      
      // 历史记录面板
      if (this.showHistoryPanel) {
        this.buildHistoryPanel()
      }
      
      // 计划本面板
      if (this.showPlanPanel) {
        this.buildPlanPanel()
      }
      
      // 添加动作面板
      if (this.showAddMovePanel) {
        this.buildAddMovePanel()
      }
    }
    .width('100%')
    .height('100%')
  }

  // 训练台
  @Builder
  buildTrainingGround() {
    Scroll() {
      Column() {
        Row() {
          Text('⛸️ 训练台')
            .fontSize(DeviceUtils.isWearable() ? 16 : 24)
            .fontWeight(FontWeight.Bold)
            .fontColor('#FFFFFF')
          
          Blank()
          
          // 手表端隐藏部分按钮，只保留核心功能
          if (!DeviceUtils.isWearable()) {
            // 计划本按钮
            Button('📅 计划')
              .fontSize(13)
              .fontColor('#FFFFFF')
              .backgroundColor('rgba(255, 255, 255, 0.2)')
              .borderRadius(15)
              .height(32)
              .padding({ left: 10, right: 10 })
              .onClick(() => {
                this.showPlanPanel = true;
              })
            
            // 历史记录按钮
            Button('📋 记录')
              .fontSize(13)
              .fontColor('#FFFFFF')
              .backgroundColor('rgba(255, 255, 255, 0.2)')
              .borderRadius(15)
              .height(32)
              .padding({ left: 10, right: 10 })
              .margin({ left: 6 })
              .onClick(() => {
                this.showHistoryPanel = true;
              })
            
            // 计算器入口
            Button('🧮 计算器')
              .fontSize(13)
              .fontColor('#FFFFFF')
              .backgroundColor('rgba(255, 255, 255, 0.2)')
              .borderRadius(15)
              .height(32)
              .padding({ left: 10, right: 10 })
              .margin({ left: 6 })
              .onClick(() => {
                router.pushUrl({
                  url: 'pages/ScoringSimulatorPage'
                });
              })
          } else {
            // 手表端只显示计算器按钮
            Button('🧮')
              .fontSize(14)
              .fontColor('#FFFFFF')
              .backgroundColor('rgba(255, 255, 255, 0.2)')
              .borderRadius(12)
              .height(28)
              .width(28)
              .onClick(() => {
                router.pushUrl({
                  url: 'pages/ScoringSimulatorPage'
                });
              })
          }
        }
        .width('100%')
        .margin({ bottom: DeviceUtils.isWearable() ? 12 : 30 })
        
        if (!this.isTraining) {
          // 大圆环开始按钮
          Column() {
            Text('⛸️')
              .fontSize(DeviceUtils.isWearable() ? 32 : 60)
            
            Text('开始训练')
              .fontSize(DeviceUtils.isWearable() ? 14 : 20)
              .fontWeight(FontWeight.Bold)
              .fontColor('#FFFFFF')
              .margin({ top: DeviceUtils.isWearable() ? 4 : 10 })
          }
          .width(DeviceUtils.isWearable() ? 100 : 180)
          .height(DeviceUtils.isWearable() ? 100 : 180)
          .borderRadius(DeviceUtils.isWearable() ? 50 : 90)
          .backgroundColor('rgba(255, 255, 255, 0.25)')
          .justifyContent(FlexAlign.Center)
          .shadow({ radius: 20, color: 'rgba(0, 0, 0, 0.3)', offsetX: 0, offsetY: 10 })
          .onClick(() => {
            this.showMoveSelector = true;
          })
          
          // 手表端添加更多内容，确保可以滚动
          if (DeviceUtils.isWearable()) {
            Column() {
              Text('今日统计')
                .fontSize(14)
                .fontColor('#FFFFFF')
                .margin({ top: 20, bottom: 10 })
              
              Row() {
                Column() {
                  Text('⏱️')
                    .fontSize(20)
                  Text(`${this.getTodayTotalMinutes()}分钟`)
                    .fontSize(12)
                    .fontColor('#FFFFFF')
                    .margin({ top: 4 })
                }
                .layoutWeight(1)
                
                Column() {
                  Text('🎯')
                    .fontSize(20)
                  Text(`${this.getTodayTotalCount()}次`)
                    .fontSize(12)
                    .fontColor('#FFFFFF')
                    .margin({ top: 4 })
                }
                .layoutWeight(1)
              }
              .width('100%')
            }
            .width('100%')
            .padding(10)
            .margin({ top: 20 })
          }
        } else {
          // 训练进行中
          Column() {
            Text(this.formatTime(this.trainingTime))
              .fontSize(DeviceUtils.isWearable() ? 32 : 48)
              .fontWeight(FontWeight.Bold)
              .fontColor('#FFFFFF')
            
            Text(`已选动作: ${this.selectedMoves.length}个`)
              .fontSize(DeviceUtils.isWearable() ? 11 : 16)
              .fontColor('rgba(255, 255, 255, 0.8)')
              .margin({ top: DeviceUtils.isWearable() ? 4 : 10 })
            
            Text(`疲劳度: ${this.calculateFatigue()}`)
              .fontSize(DeviceUtils.isWearable() ? 11 : 16)
              .fontColor('rgba(255, 255, 255, 0.8)')
              .margin({ top: 4 })
            
            // 结束训练按钮
            Button('结束训练')
              .fontSize(DeviceUtils.isWearable() ? 13 : 18)
              .fontColor('#FFFFFF')
              .backgroundColor('rgba(255, 100, 100, 0.8)')
              .borderRadius(DeviceUtils.isWearable() ? 18 : 25)
              .height(DeviceUtils.isWearable() ? 36 : 50)
              .width(DeviceUtils.isWearable() ? 100 : 150)
              .margin({ top: DeviceUtils.isWearable() ? 16 : 30 })
              .onClick(() => {
                this.stopTraining();
              })
          }
          .width('100%')
          .justifyContent(FlexAlign.Center)
        }
        
      }
      .width('100%')
      .padding(DeviceUtils.isWearable() ? 8 : 20)
    }
    .width('100%')
    .layoutWeight(1)
    .scrollBar(BarState.Off)
    .edgeEffect(EdgeEffect.Spring)
  }
  
  // 开始训练
  startTraining() {
    this.isTraining = true;
    this.trainingTime = 0;
    this.showMoveSelector = false;
    
    this.timer = setInterval(() => {
      this.trainingTime++;
    }, 1000);
  }
  
  
  // 停止训练
  stopTraining() {
    if (this.timer !== -1) {
      clearInterval(this.timer);
      this.timer = -1;
    }
    
    // 保存训练记录
    if (this.trainingTime > 0 && this.selectedMoves.length > 0) {
      const today = new Date();
      const dateStr = today.toISOString().split('T')[0];
      const timeStr = today.toTimeString().split(' ')[0].substring(0, 5);
      const fatigue = this.calculateFatigue();
      
      // 为每个选中的动作保存练习记录
      this.selectedMoves.forEach((moveId, index) => {
        // 计算每个动作的练习时长（平均分配总时长）
        const moveDuration = Math.floor(this.trainingTime / this.selectedMoves.length);
        
        // 生成唯一ID
        const recordId = `${dateStr}-${timeStr}-${moveId}-${index}`;
        
        // 保存训练记录
        this.dataStore.addPracticeRecord({
          id: recordId,
          moveName: moveId,
          date: dateStr,
          time: timeStr,
          duration: moveDuration,
          fatigue: Math.floor(fatigue / this.selectedMoves.length),
          notes: `训练时长: ${this.formatTime(moveDuration)}`
        });
      });
      
      // 清空选中动作
      this.selectedMoves = [];
      
      // 刷新今日记录
      this.loadTodayRecords();
    }
    
    this.isTraining = false;
  }

  // 动作选择弹窗
  @Builder
  buildMoveSelector() {
    Column() {
      Column() {
        Text('选择训练动作')
          .fontSize(20)
          .fontWeight(FontWeight.Bold)
          .fontColor('#333333')
          .margin({ bottom: 20 })
        
        // 跳跃动作
        Text('跳跃 (疲劳度: 7)')
          .fontSize(14)
          .fontColor('#666666')
          .margin({ bottom: 10 })
        
        Flex({ wrap: FlexWrap.Wrap }) {
          ForEach(this.jumpMoves, (move: string) => {
            this.moveChip(move)
          })
        }
        .width('100%')
        .margin({ bottom: 15 })
        
        // 旋转动作
        Text('旋转 (疲劳度: 3)')
          .fontSize(14)
          .fontColor('#666666')
          .margin({ bottom: 10 })
        
        Flex({ wrap: FlexWrap.Wrap }) {
          ForEach(this.spinMoves, (move: string) => {
            this.moveChip(move)
          })
        }
        .width('100%')
        .margin({ bottom: 15 })
        
        // 步法动作
        Text('步法 (疲劳度: 1)')
          .fontSize(14)
          .fontColor('#666666')
          .margin({ bottom: 10 })
        
        Flex({ wrap: FlexWrap.Wrap }) {
          ForEach(this.stepMoves, (move: string) => {
            this.moveChip(move)
          })
        }
        .width('100%')
        .margin({ bottom: 20 })
        
        Row() {
          Button('取消')
            .fontSize(16)
            .fontColor('#666666')
            .backgroundColor('#E0E0E0')
            .borderRadius(20)
            .layoutWeight(1)
            .onClick(() => {
              this.showMoveSelector = false;
              this.selectedMoves = [];
            })
          
          Button('开始')
            .fontSize(16)
            .fontColor('#FFFFFF')
            .backgroundColor('#3A7BD5')
            .borderRadius(20)
            .layoutWeight(1)
            .margin({ left: 15 })
            .onClick(() => {
              this.startTraining();
            })
        }
        .width('100%')
      }
      .width('85%')
      .padding(25)
      .backgroundColor('#FFFFFF')
      .borderRadius(20)
    }
    .width('100%')
    .height('100%')
    .backgroundColor('rgba(0, 0, 0, 0.5)')
    .justifyContent(FlexAlign.Center)
    .onClick(() => {
      // 点击外部不关闭
    })
  }
  
  @Builder
  moveChip(move: string) {
    Text(move)
      .fontSize(14)
      .fontColor(this.selectedMoves.includes(move) ? '#FFFFFF' : '#333333')
      .backgroundColor(this.selectedMoves.includes(move) ? '#3A7BD5' : '#E8E8E8')
      .borderRadius(15)
      .padding({ left: 12, right: 12, top: 8, bottom: 8 })
      .margin({ right: 8, bottom: 8 })
      .onClick(() => {
        if (this.selectedMoves.includes(move)) {
          this.selectedMoves = this.selectedMoves.filter(m => m !== move);
        } else {
          this.selectedMoves.push(move);
        }
      })
  }


  // 我的
  @Builder
  buildProfile() {
    Scroll() {
      Column() {
        Text('👤 我的')
          .fontSize(DeviceUtils.isWearable() ? 18 : 24)
          .fontWeight(FontWeight.Bold)
          .fontColor('#FFFFFF')
          .margin({ bottom: DeviceUtils.isWearable() ? 12 : 20 })
        
        Column() {
          Text('⛸️')
            .fontSize(DeviceUtils.isWearable() ? 40 : 50)
          
          Text('冰上舞者')
            .fontSize(DeviceUtils.isWearable() ? 16 : 20)
            .fontWeight(FontWeight.Bold)
            .fontColor('#333333')
            .margin({ top: DeviceUtils.isWearable() ? 6 : 10 })
          
          Text('Lv.12')
            .fontSize(DeviceUtils.isWearable() ? 12 : 14)
            .fontColor('#666666')
            .margin({ top: 4 })
        }
        .width('90%')
        .padding(DeviceUtils.isWearable() ? 20 : 30)
        .backgroundColor('#FFFFFF')
        .borderRadius(DeviceUtils.isWearable() ? 10 : 15)
        .margin({ top: DeviceUtils.isWearable() ? 10 : 20 })
        
        // 功能入口 - 手表端简化显示
        if (!DeviceUtils.isWearable()) {
          Column() {
            // 打分解读
            Row() {
              Text('📊')
                .fontSize(24)
              
              Column() {
                Text('打分解读')
                  .fontSize(16)
                  .fontWeight(FontWeight.Bold)
                  .fontColor('#333333')
                
                Text('解读比赛分数，了解评分规则')
                  .fontSize(12)
                  .fontColor('#999999')
                  .margin({ top: 4 })
              }
              .alignItems(HorizontalAlign.Start)
              .layoutWeight(1)
              .margin({ left: 15 })
              
              Text('›')
                .fontSize(24)
                .fontColor('#CCCCCC')
            }
            .width('100%')
            .padding(15)
            .backgroundColor('#FFFFFF')
            .borderRadius(12)
            .onClick(() => {
              router.pushUrl({
                url: 'pages/ScoreInterpreterPage'
              });
            })
            
            // 计分模拟器
            Row() {
              Text('🧮')
                .fontSize(24)
              
              Column() {
                Text('计分模拟器')
                  .fontSize(16)
                  .fontWeight(FontWeight.Bold)
                  .fontColor('#333333')
                
                Text('模拟ISU官方计分规则')
                  .fontSize(12)
                  .fontColor('#999999')
                  .margin({ top: 4 })
              }
              .alignItems(HorizontalAlign.Start)
              .layoutWeight(1)
              .margin({ left: 15 })
              
              Text('›')
                .fontSize(24)
                .fontColor('#CCCCCC')
            }
            .width('100%')
            .padding(15)
            .backgroundColor('#FFFFFF')
            .borderRadius(12)
            .margin({ top: 12 })
            .onClick(() => {
              router.pushUrl({
                url: 'pages/ScoringSimulatorPage'
              });
            })
          }
          .width('90%')
          .margin({ top: 20 })
        } else {
          // 手表端显示功能列表
          Column() {
            // 计分模拟器
            Row() {
              Text('🧮')
                .fontSize(20)
              
              Text('计分模拟器')
                .fontSize(14)
                .fontColor('#333333')
                .margin({ left: 10 })
              
              Blank()
              
              Text('›')
                .fontSize(20)
                .fontColor('#CCCCCC')
            }
            .width('100%')
            .padding(12)
            .backgroundColor('#FFFFFF')
            .borderRadius(10)
            .onClick(() => {
              router.pushUrl({
                url: 'pages/ScoringSimulatorPage'
              });
            })
            
            // 设置
            Row() {
              Text('⚙️')
                .fontSize(20)
              
              Text('设置')
                .fontSize(14)
                .fontColor('#333333')
                .margin({ left: 10 })
              
              Blank()
              
              Text('›')
                .fontSize(20)
                .fontColor('#CCCCCC')
            }
            .width('100%')
            .padding(12)
            .backgroundColor('#FFFFFF')
            .borderRadius(10)
            .margin({ top: 10 })
            
            // 关于
            Row() {
              Text('ℹ️')
                .fontSize(20)
              
              Text('关于')
                .fontSize(14)
                .fontColor('#333333')
                .margin({ left: 10 })
              
              Blank()
              
              Text('›')
                .fontSize(20)
                .fontColor('#CCCCCC')
            }
            .width('100%')
            .padding(12)
            .backgroundColor('#FFFFFF')
            .borderRadius(10)
            .margin({ top: 10 })
          }
          .width('90%')
          .margin({ top: 15 })
        }
      }
      .width('100%')
      .padding(DeviceUtils.isWearable() ? 10 : 20)
    }
    .width('100%')
    .layoutWeight(1)
    .scrollBar(BarState.Off)
    .edgeEffect(EdgeEffect.Spring)
  }

  @Builder

  @Builder
  buildBottomNav() {
    Row() {
      // 手表端只显示3个主要Tab，其他设备显示5个
      if (DeviceUtils.isWearable()) {
        // 手表端简化导航栏
        Column() {
          Text('⛸️')
            .fontSize(18)
            .opacity(this.currentTab === 0 ? 1.0 : 0.6)
          Text('训练')
            .fontSize(9)
            .fontColor(this.currentTab === 0 ? '#FFFFFF' : '#E0E0E0')
            .margin({ top: 1 })
        }
        .width('33.3%')
        .height(40)
        .justifyContent(FlexAlign.Center)
        .onClick(() => { this.currentTab = 0; })
        
        Column() {
          Text('🏆')
            .fontSize(18)
            .opacity(this.currentTab === 3 ? 1.0 : 0.6)
          Text('成就')
            .fontSize(9)
            .fontColor(this.currentTab === 3 ? '#FFFFFF' : '#E0E0E0')
            .margin({ top: 1 })
        }
        .width('33.3%')
        .height(40)
        .justifyContent(FlexAlign.Center)
        .onClick(() => { this.currentTab = 2; })
        
        Column() {
          Text('👤')
            .fontSize(18)
            .opacity(this.currentTab === 4 ? 1.0 : 0.6)
          Text('我的')
            .fontSize(9)
            .fontColor(this.currentTab === 4 ? '#FFFFFF' : '#E0E0E0')
            .margin({ top: 1 })
        }
        .width('33.3%')
        .height(40)
        .justifyContent(FlexAlign.Center)
        .onClick(() => { this.currentTab = 3; })
      } else {
        // 手机、平板、PC显示完整导航栏
        Column() {
          Text('⛸️')
            .fontSize(24)
            .opacity(this.currentTab === 0 ? 1.0 : 0.6)
          Text('训练台')
            .fontSize(12)
            .fontColor(this.currentTab === 0 ? '#FFFFFF' : '#E0E0E0')
            .margin({ top: 4 })
        }
        .width('25%')
        .height(60)
        .justifyContent(FlexAlign.Center)
        .onClick(() => { this.currentTab = 0; })
        
        Column() {
          Text('🦶')
            .fontSize(24)
            .opacity(this.currentTab === 1 ? 1.0 : 0.6)
          Text('动作库')
            .fontSize(12)
            .fontColor(this.currentTab === 1 ? '#FFFFFF' : '#E0E0E0')
            .margin({ top: 4 })
        }
        .width('25%')
        .height(60)
        .justifyContent(FlexAlign.Center)
        .onClick(() => { this.currentTab = 1; })
        
        Column() {
          Text('🏆')
            .fontSize(24)
            .opacity(this.currentTab === 3 ? 1.0 : 0.6)
          Text('成就')
            .fontSize(12)
            .fontColor(this.currentTab === 3 ? '#FFFFFF' : '#E0E0E0')
            .margin({ top: 4 })
        }
        .width('25%')
        .height(60)
        .justifyContent(FlexAlign.Center)
        .onClick(() => { this.currentTab = 2; })
        
        Column() {
          Text('👤')
            .fontSize(24)
            .opacity(this.currentTab === 4 ? 1.0 : 0.6)
          Text('我的')
            .fontSize(12)
            .fontColor(this.currentTab === 4 ? '#FFFFFF' : '#E0E0E0')
            .margin({ top: 4 })
        }
        .width('25%')
        .height(60)
        .justifyContent(FlexAlign.Center)
        .onClick(() => { this.currentTab = 3; })
      }
    }
    .width('100%')
    .height(DeviceUtils.isWearable() ? 55 : 70)
    .backgroundColor('rgba(255, 255, 255, 0.15)')
  }
  
  // ========== 历史记录面板 ==========
  @Builder
  buildHistoryPanel() {
    Column() {
      Column() {
        // 标题栏
        Row() {
          Text('📋 今日练习记录')
            .fontSize(20)
            .fontWeight(FontWeight.Bold)
            .fontColor('#333333')
          
          Blank()
          
          Button('关闭')
            .fontSize(14)
            .fontColor('#666666')
            .backgroundColor('#F0F0F0')
            .borderRadius(15)
            .height(32)
            .padding({ left: 16, right: 16 })
            .onClick(() => {
              this.showHistoryPanel = false;
            })
        }
        .width('100%')
        .margin({ bottom: 20 })
        
        // 记录列表
        if (this.todayRecords.length === 0) {
          Column() {
            Text('😴')
              .fontSize(60)
            Text('今天还没有练习记录')
              .fontSize(16)
              .fontColor('#999999')
              .margin({ top: 15 })
            Text('开始训练，记录你的每一次进步！')
              .fontSize(14)
              .fontColor('#CCCCCC')
              .margin({ top: 8 })
          }
          .width('100%')
          .height(300)
          .justifyContent(FlexAlign.Center)
        } else {
          Scroll() {
            Column() {
              ForEach(this.todayRecords, (record: PracticeRecord, index: number) => {
                Row() {
                  // 时间
                  Column() {
                    Text(record.time)
                      .fontSize(16)
                      .fontWeight(FontWeight.Bold)
                      .fontColor('#3A7BD5')
                  }
                  .width(60)
                  
                  // 动作信息
                  Column() {
                    Row() {
                      Text(this.getMoveIcon(record.moveName))
                        .fontSize(20)
                      Text(record.moveName)
                        .fontSize(16)
                        .fontWeight(FontWeight.Bold)
                        .fontColor('#333333')
                        .margin({ left: 8 })
                    }
                    
                    if (record.notes) {
                      Text(record.notes)
                        .fontSize(12)
                        .fontColor('#999999')
                        .margin({ top: 4 })
                        .maxLines(1)
                        .textOverflow({ overflow: TextOverflow.Ellipsis })
                    }
                  }
                  .layoutWeight(1)
                  .alignItems(HorizontalAlign.Start)
                  .margin({ left: 15 })
                  
                  // 时长和疲劳度
                  Column() {
                    Text(this.formatDuration(record.duration))
                      .fontSize(14)
                      .fontWeight(FontWeight.Bold)
                      .fontColor('#FF6B6B')
                    Text(`疲劳度 ${record.fatigue}`)
                      .fontSize(12)
                      .fontColor('#999999')
                      .margin({ top: 4 })
                  }
                  .alignItems(HorizontalAlign.End)
                }
                .width('100%')
                .padding(15)
                .backgroundColor(index % 2 === 0 ? '#FFFFFF' : '#F8F8F8')
                .borderRadius(10)
                .margin({ bottom: 10 })
              })
            }
            .width('100%')
          }
          .width('100%')
          .layoutWeight(1)
          .scrollBar(BarState.Auto)
        }
        
        // 底部统计
        Row() {
          Column() {
            Text(this.todayRecords.length.toString())
              .fontSize(24)
              .fontWeight(FontWeight.Bold)
              .fontColor('#3A7BD5')
            Text('练习次数')
              .fontSize(12)
              .fontColor('#999999')
          }
          .layoutWeight(1)
          
          Column() {
            Text(this.formatDuration(this.todayRecords.reduce((sum, r) => sum + r.duration, 0)))
              .fontSize(24)
              .fontWeight(FontWeight.Bold)
              .fontColor('#FF6B6B')
            Text('总时长')
              .fontSize(12)
              .fontColor('#999999')
          }
          .layoutWeight(1)
          
          Column() {
            Text(this.todayRecords.reduce((sum, r) => sum + r.fatigue, 0).toString())
              .fontSize(24)
              .fontWeight(FontWeight.Bold)
              .fontColor('#FFD700')
            Text('总疲劳度')
              .fontSize(12)
              .fontColor('#999999')
          }
          .layoutWeight(1)
        }
        .width('100%')
        .padding(20)
        .backgroundColor('#F0F0F0')
        .borderRadius(15)
        .margin({ top: 15 })
      }
      .width('90%')
      .height('85%')
      .padding(25)
      .backgroundColor('#FFFFFF')
      .borderRadius(20)
    }
    .width('100%')
    .height('100%')
    .backgroundColor('rgba(0, 0, 0, 0.5)')
    .justifyContent(FlexAlign.Center)
  }
  
  // ========== 计划本面板 ==========
  @Builder
  buildPlanPanel() {
    Column() {
      Column() {
        // 标题栏
        Row() {
          Text('📅 周训练计划')
            .fontSize(20)
            .fontWeight(FontWeight.Bold)
            .fontColor('#333333')
          
          Blank()
          
          if (!this.currentWeekPlan) {
            Button('创建计划')
              .fontSize(14)
              .fontColor('#FFFFFF')
              .backgroundColor('#3A7BD5')
              .borderRadius(15)
              .height(32)
              .padding({ left: 16, right: 16 })
              .onClick(() => {
                this.createNewWeekPlan();
              })
          }
          
          Button('关闭')
            .fontSize(14)
            .fontColor('#666666')
            .backgroundColor('#F0F0F0')
            .borderRadius(15)
            .height(32)
            .padding({ left: 16, right: 16 })
            .margin({ left: 8 })
            .onClick(() => {
              this.showPlanPanel = false;
            })
        }
        .width('100%')
        .margin({ bottom: 20 })
        
        if (!this.currentWeekPlan) {
          // 无计划提示
          Column() {
            Text('📝')
              .fontSize(60)
            Text('还没有本周训练计划')
              .fontSize(16)
              .fontColor('#999999')
              .margin({ top: 15 })
            Text('点击"创建计划"开始规划你的训练！')
              .fontSize(14)
              .fontColor('#CCCCCC')
              .margin({ top: 8 })
          }
          .width('100%')
          .height(300)
          .justifyContent(FlexAlign.Center)
        } else {
          // 计划内容
          Scroll() {
            Column() {
              // 周日期范围
              Text(`${this.currentWeekPlan.weekStart} 至 ${this.currentWeekPlan.weekEnd}`)
                .fontSize(14)
                .fontColor('#999999')
                .margin({ bottom: 15 })
              
              // 每日计划
              ForEach(this.currentWeekPlan.dailyPlans, (dayPlan: DailyPlan, dayIndex: number) => {
                Column() {
                  // 日期标题
                  Row() {
                    Text(this.getDayName(dayPlan.dayOfWeek))
                      .fontSize(16)
                      .fontWeight(FontWeight.Bold)
                      .fontColor('#333333')
                    
                    Text(`(${dayPlan.date})`)
                      .fontSize(12)
                      .fontColor('#999999')
                      .margin({ left: 8 })
                    
                    Blank()
                    
                    // 目标时长
                    if (dayPlan.targetDuration) {
                      Text(`目标: ${dayPlan.targetDuration}分钟`)
                        .fontSize(12)
                        .fontColor('#3A7BD5')
                    }
                  }
                  .width('100%')
                  .margin({ bottom: 10 })
                  
                  // 计划的动作
                  if (dayPlan.moves.length === 0) {
                    Column() {
                      Text('暂无计划')
                        .fontSize(14)
                        .fontColor('#CCCCCC')
                      
                      Button('+ 添加动作')
                        .fontSize(12)
                        .fontColor('#3A7BD5')
                        .backgroundColor('#E8F4FD')
                        .borderRadius(15)
                        .height(28)
                        .margin({ top: 8 })
                        .onClick(() => {
                          this.editingDayIndex = dayIndex;
                          this.showAddMovePanel = true;
                        })
                    }
                    .width('100%')
                    .padding(10)
                    .backgroundColor('#F8F8F8')
                    .borderRadius(8)
                  } else {
                    Column() {
                      Flex({ wrap: FlexWrap.Wrap }) {
                        ForEach(dayPlan.moves, (move: PlannedMove, moveIndex: number) => {
                          Row() {
                            Text(this.getMoveIcon(move.moveName))
                              .fontSize(14)
                            Text(move.moveName)
                              .fontSize(14)
                              .fontColor('#333333')
                              .margin({ left: 4 })
                            
                            if (move.targetCount) {
                              Text(`×${move.targetCount}`)
                                .fontSize(12)
                                .fontColor('#FF6B6B')
                                .margin({ left: 4 })
                            }
                          }
                          .backgroundColor(this.getPriorityColor(move.priority))
                          .borderRadius(8)
                          .padding({ left: 10, right: 10, top: 6, bottom: 6 })
                          .margin({ right: 8, bottom: 8 })
                        })
                      }
                      
                      Button('+ 添加更多')
                        .fontSize(12)
                        .fontColor('#3A7BD5')
                        .backgroundColor('#E8F4FD')
                        .borderRadius(15)
                        .height(28)
                        .margin({ top: 8 })
                        .onClick(() => {
                          this.editingDayIndex = dayIndex;
                          this.showAddMovePanel = true;
                        })
                    }
                  }
                  
                  // 备注
                  if (dayPlan.notes) {
                    Text(dayPlan.notes)
                      .fontSize(12)
                      .fontColor('#666666')
                      .fontStyle(FontStyle.Italic)
                      .margin({ top: 8 })
                  }
                }
                .width('100%')
                .padding(15)
                .backgroundColor('#FFFFFF')
                .borderRadius(12)
                .margin({ bottom: 12 })
                .border({ width: 1, color: '#E0E0E0' })
              })
              
              // 周备注
              if (this.currentWeekPlan.notes) {
                Column() {
                  Text('本周目标')
                    .fontSize(14)
                    .fontWeight(FontWeight.Bold)
                    .fontColor('#333333')
                    .margin({ bottom: 8 })
                  Text(this.currentWeekPlan.notes)
                    .fontSize(14)
                    .fontColor('#666666')
                }
                .width('100%')
                .padding(15)
                .backgroundColor('#FFF9E6')
                .borderRadius(12)
                .margin({ top: 10 })
              }
            }
            .width('100%')
          }
          .width('100%')
          .layoutWeight(1)
          .scrollBar(BarState.Auto)
          
          // 删除按钮
          Button('删除计划')
            .fontSize(16)
            .fontColor('#FF6B6B')
            .backgroundColor('#FFE5E5')
            .borderRadius(20)
            .width('100%')
            .height(44)
            .margin({ top: 15 })
            .onClick(() => {
              this.deleteCurrentPlan();
            })
        }
      }
      .width('90%')
      .height('85%')
      .padding(25)
      .backgroundColor('#FFFFFF')
      .borderRadius(20)
    }
    .width('100%')
    .height('100%')
    .backgroundColor('rgba(0, 0, 0, 0.5)')
    .justifyContent(FlexAlign.Center)
  }
  
  // ========== 添加动作面板 ==========
  @Builder
  buildAddMovePanel() {
    Column() {
      Column() {
        // 标题栏
        Row() {
          Text('添加训练动作')
            .fontSize(20)
            .fontWeight(FontWeight.Bold)
            .fontColor('#333333')
          
          Blank()
          
          Button('关闭')
            .fontSize(14)
            .fontColor('#666666')
            .backgroundColor('#F0F0F0')
            .borderRadius(15)
            .height(32)
            .padding({ left: 16, right: 16 })
            .onClick(() => {
              this.showAddMovePanel = false;
              this.selectedMoveForPlan = '';
              this.targetCountInput = '';
            })
        }
        .width('100%')
        .margin({ bottom: 20 })
        
        Scroll() {
          Column() {
            // 选择动作
            Text('选择动作')
              .fontSize(16)
              .fontWeight(FontWeight.Bold)
              .fontColor('#333333')
              .margin({ bottom: 10 })
            
            // 跳跃动作
            Text('跳跃')
              .fontSize(14)
              .fontColor('#666666')
              .margin({ bottom: 8 })
            
            Flex({ wrap: FlexWrap.Wrap }) {
              ForEach(this.jumpMoves, (move: string) => {
                Text(move)
                  .fontSize(14)
                  .fontColor(this.selectedMoveForPlan === move ? '#FFFFFF' : '#333333')
                  .backgroundColor(this.selectedMoveForPlan === move ? '#3A7BD5' : '#E8E8E8')
                  .borderRadius(15)
                  .padding({ left: 12, right: 12, top: 8, bottom: 8 })
                  .margin({ right: 8, bottom: 8 })
                  .onClick(() => {
                    this.selectedMoveForPlan = move;
                  })
              })
            }
            .width('100%')
            .margin({ bottom: 15 })
            
            // 旋转动作
            Text('旋转')
              .fontSize(14)
              .fontColor('#666666')
              .margin({ bottom: 8 })
            
            Flex({ wrap: FlexWrap.Wrap }) {
              ForEach(this.spinMoves, (move: string) => {
                Text(move)
                  .fontSize(14)
                  .fontColor(this.selectedMoveForPlan === move ? '#FFFFFF' : '#333333')
                  .backgroundColor(this.selectedMoveForPlan === move ? '#3A7BD5' : '#E8E8E8')
                  .borderRadius(15)
                  .padding({ left: 12, right: 12, top: 8, bottom: 8 })
                  .margin({ right: 8, bottom: 8 })
                  .onClick(() => {
                    this.selectedMoveForPlan = move;
                  })
              })
            }
            .width('100%')
            .margin({ bottom: 15 })
            
            // 步法动作
            Text('步法')
              .fontSize(14)
              .fontColor('#666666')
              .margin({ bottom: 8 })
            
            Flex({ wrap: FlexWrap.Wrap }) {
              ForEach(this.stepMoves, (move: string) => {
                Text(move)
                  .fontSize(14)
                  .fontColor(this.selectedMoveForPlan === move ? '#FFFFFF' : '#333333')
                  .backgroundColor(this.selectedMoveForPlan === move ? '#3A7BD5' : '#E8E8E8')
                  .borderRadius(15)
                  .padding({ left: 12, right: 12, top: 8, bottom: 8 })
                  .margin({ right: 8, bottom: 8 })
                  .onClick(() => {
                    this.selectedMoveForPlan = move;
                  })
              })
            }
            .width('100%')
            .margin({ bottom: 20 })
            
            // 目标次数
            Text('目标次数（可选）')
              .fontSize(16)
              .fontWeight(FontWeight.Bold)
              .fontColor('#333333')
              .margin({ bottom: 10 })
            
            TextInput({ placeholder: '例如: 10', text: this.targetCountInput })
              .fontSize(16)
              .type(InputType.Number)
              .height(44)
              .backgroundColor('#F5F5F5')
              .borderRadius(10)
              .width('100%')
              .onChange((value: string) => {
                this.targetCountInput = value;
              })
              .margin({ bottom: 20 })
            
            // 优先级
            Text('优先级')
              .fontSize(16)
              .fontWeight(FontWeight.Bold)
              .fontColor('#333333')
              .margin({ bottom: 10 })
            
            Row() {
              Button('高')
                .fontSize(14)
                .fontColor(this.selectedPriority === 'high' ? '#FFFFFF' : '#FF6B6B')
                .backgroundColor(this.selectedPriority === 'high' ? '#FF6B6B' : '#FFE5E5')
                .borderRadius(15)
                .layoutWeight(1)
                .onClick(() => {
                  this.selectedPriority = 'high';
                })
              
              Button('中')
                .fontSize(14)
                .fontColor(this.selectedPriority === 'medium' ? '#FFFFFF' : '#FFD700')
                .backgroundColor(this.selectedPriority === 'medium' ? '#FFD700' : '#FFF9E6')
                .borderRadius(15)
                .layoutWeight(1)
                .margin({ left: 10 })
                .onClick(() => {
                  this.selectedPriority = 'medium';
                })
              
              Button('低')
                .fontSize(14)
                .fontColor(this.selectedPriority === 'low' ? '#FFFFFF' : '#4CAF50')
                .backgroundColor(this.selectedPriority === 'low' ? '#4CAF50' : '#E8F5E9')
                .borderRadius(15)
                .layoutWeight(1)
                .margin({ left: 10 })
                .onClick(() => {
                  this.selectedPriority = 'low';
                })
            }
            .width('100%')
            .margin({ bottom: 30 })
            
            // 确认按钮
            Button('确认添加')
              .fontSize(18)
              .fontColor('#FFFFFF')
              .backgroundColor(this.selectedMoveForPlan ? '#3A7BD5' : '#CCCCCC')
              .borderRadius(25)
              .width('100%')
              .height(50)
              .enabled(!!this.selectedMoveForPlan)
              .onClick(() => {
                this.addMoveToPlan();
              })
          }
          .width('100%')
        }
        .width('100%')
        .layoutWeight(1)
        .scrollBar(BarState.Auto)
      }
      .width('90%')
      .height('85%')
      .padding(25)
      .backgroundColor('#FFFFFF')
      .borderRadius(20)
    }
    .width('100%')
    .height('100%')
    .backgroundColor('rgba(0, 0, 0, 0.5)')
    .justifyContent(FlexAlign.Center)
  }
  
  // 辅助方法
  private getMoveIcon(moveName: string): string {
    if (this.jumpMoves.includes(moveName)) return '🦶';
    if (this.spinMoves.includes(moveName)) return '🌀';
    if (this.stepMoves.includes(moveName)) return '👣';
    return '⛸️';
  }
  
  private formatDuration(seconds: number): string {
    if (seconds < 60) return `${seconds}秒`;
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return secs > 0 ? `${mins}分${secs}秒` : `${mins}分钟`;
  }
  
  private getDayName(dayOfWeek: number): string {
    const days = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
    return days[dayOfWeek] || '';
  }
  
  private getPriorityColor(priority: string): string {
    switch (priority) {
      case 'high': return '#FFE5E5';
      case 'medium': return '#FFF9E6';
      case 'low': return '#E8F5E9';
      default: return '#F0F0F0';
    }
  }
  
  private createNewWeekPlan() {
    const plan = this.dataStore.createWeeklyPlan();
    this.dataStore.saveWeeklyPlan(plan);
    this.currentWeekPlan = plan;
  }
  
  private addMoveToPlan() {
    if (!this.currentWeekPlan || this.editingDayIndex < 0 || !this.selectedMoveForPlan) {
      return;
    }
    
    // 创建新的动作计划
    const newMove: PlannedMove = {
      moveName: this.selectedMoveForPlan,
      targetCount: this.targetCountInput ? parseInt(this.targetCountInput) : undefined,
      priority: this.selectedPriority as 'high' | 'medium' | 'low',
      notes: ''
    };
    
    // 添加到对应天的计划中
    this.currentWeekPlan.dailyPlans[this.editingDayIndex].moves.push(newMove);
    
    // 保存更新
    this.dataStore.saveWeeklyPlan(this.currentWeekPlan);
    
    // 重置状态
    this.showAddMovePanel = false;
    this.selectedMoveForPlan = '';
    this.targetCountInput = '';
    this.selectedPriority = 'medium';
    this.editingDayIndex = -1;
  }
  
  private deleteCurrentPlan() {
    if (this.currentWeekPlan) {
      this.dataStore.deleteWeeklyPlan(this.currentWeekPlan.id);
      this.currentWeekPlan = null;
    }
  }
}
