/**
 * 冰迹·EdgeFlow - 训练台页面
 * 核心训练入口，实时记录训练数据
 */

import router from '@ohos.router';
import { DataStore } from '../services/DataStore';
import { PracticeRecord, WeeklyPlan, DailyPlan, PlannedMove } from '../models/IceTraceData';
import { DeviceUtils } from '../common/utils/DeviceUtils';

@Component
export struct TrainingGroundPage {
  @State isTraining: boolean = false;
  @State isPaused: boolean = false;
  @State trainingTime: number = 0;
  @State selectedMoves: string[] = [];
  @State showMoveSelector: boolean = false;
  @State showEndDialog: boolean = false;
  @State trainingNotes: string = '';
  
  // 当天历史练习记录
  @State todayRecords: PracticeRecord[] = [];
  @State showHistoryPanel: boolean = false;
  
  // 周训练计划
  @State currentWeekPlan: WeeklyPlan | null = null;
  @State showPlanPanel: boolean = false;
  @State editingDayIndex: number = -1;
  @State editingMoveIndex: number = -1;
  
  private timer: number = -1;
  private dataStore: DataStore = DataStore.getInstance();
  
  // 可选动作列表（按类型分组）
  private jumpMoves: string[] = ['1A', '2A', '3A', '4A', '1Lz', '2Lz', '3Lz', '4Lz', '1F', '2F', '3F', '4F', '1Lo', '2Lo', '3Lo', '4Lo', '1S', '2S', '3S', '4S', '1T', '2T', '3T', '4T'];
  private spinMoves: string[] = ['USp', 'SSp', 'CSp', 'LSp', 'CCoSp', 'LCoSp'];
  private stepMoves: string[] = ['StSq', 'CiSt', 'RoLi', 'SlSt', 'ChSt'];
  
  // 今日训练记录
  @State todayMinutes: number = 0;
  @State todayActions: number = 0;
  @State todayCalories: number = 0;
  
  aboutToAppear() {
    this.loadTodayStats();
    this.loadTodayRecords();
    this.loadCurrentWeekPlan();
  }
  
  aboutToDisappear() {
    if (this.timer !== -1) {
      clearInterval(this.timer);
    }
  }
  
  loadTodayStats() {
    const stats = this.dataStore.getTodayStats();
    this.todayMinutes = stats.minutes;
    this.todayActions = stats.actions;
    this.todayCalories = Math.round(stats.minutes * 6); // 简单估算卡路里
  }
  
  loadTodayRecords() {
    this.todayRecords = this.dataStore.getTodayRecords();
  }
  
  loadCurrentWeekPlan() {
    const plan = this.dataStore.getCurrentWeekPlan();
    this.currentWeekPlan = plan || null;
  }
  
  // 计算疲劳度：步法=1，旋转=3，跳跃=7
  private calculateFatigue(): number {
    let fatigue = 0;
    this.selectedMoves.forEach((move: string) => {
      if (this.jumpMoves.includes(move)) fatigue += 7;
      else if (this.spinMoves.includes(move)) fatigue += 3;
      else if (this.stepMoves.includes(move)) fatigue += 1;
    });
    return fatigue;
  }
  
  build() {
    Stack() {
      Column() {
        // 顶部标题
        Row() {
          Text('训练台')
            .fontSize(24)
            .fontWeight(FontWeight.Bold)
            .fontColor('#FFFFFF')
          
          Blank()
          
          // 计划本按钮
          Button('📅 计划本')
            .fontSize(14)
            .fontColor('#FFFFFF')
            .backgroundColor('rgba(255, 255, 255, 0.2)')
            .borderRadius(20)
            .height(36)
            .padding({ left: 12, right: 12 })
            .onClick(() => {
              this.showPlanPanel = true;
            })
          
          // 历史记录按钮
          Button('📋 今日记录')
            .fontSize(14)
            .fontColor('#FFFFFF')
            .backgroundColor('rgba(255, 255, 255, 0.2)')
            .borderRadius(20)
            .height(36)
            .padding({ left: 12, right: 12 })
            .margin({ left: 8 })
            .onClick(() => {
              this.showHistoryPanel = true;
            })
          
          // 计算器入口
          Button('计算器')
            .fontSize(14)
            .fontColor('#FFFFFF')
            .backgroundColor('rgba(255, 255, 255, 0.2)')
            .borderRadius(20)
            .height(36)
            .padding({ left: 16, right: 16 })
            .margin({ left: 8 })
            .onClick(() => {
              router.pushUrl({ url: 'pages/ScoringSimulatorPage' });
            })
        }
        .width('100%')
        .padding({ left: 20, right: 20, top: 20, bottom: 20 })
        
        // 主内容区
        Column() {
          if (!this.isTraining) {
            this.buildStartTraining()
          } else {
            this.buildTrainingProgress()
          }
        }
        .width('100%')
        .layoutWeight(1)
        .padding(20)
      }
      .width('100%')
      .height('100%')
      
      // 动作选择弹窗
      if (this.showMoveSelector) {
        this.buildMoveSelector()
      }
      
      // 结束训练弹窗
      if (this.showEndDialog) {
        this.buildEndDialog()
      }
      
      // 历史记录面板
      if (this.showHistoryPanel) {
        this.buildHistoryPanel()
      }
      
      // 计划本面板
      if (this.showPlanPanel) {
        this.buildPlanPanel()
      }
    }
    .width('100%')
    .height('100%')
  }
  
  @Builder
  buildStartTraining() {
    Column() {
      // 大圆环开始按钮
      Column() {
        Text('⛸️')
          .fontSize(60)
        
        Text('开始训练')
          .fontSize(20)
          .fontWeight(FontWeight.Bold)
          .fontColor('#FFFFFF')
          .margin({ top: 10 })
      }
      .width(180)
      .height(180)
      .borderRadius(90)
      .backgroundColor('rgba(255, 255, 255, 0.25)')
      .backdropBlur(10)
      .justifyContent(FlexAlign.Center)
      .shadow({ radius: 20, color: 'rgba(0, 0, 0, 0.3)', offsetX: 0, offsetY: 10 })
      .onClick(() => {
        this.showMoveSelector = true;
      })
      
      // 今日统计
      Column() {
        Text('今日统计')
          .fontSize(16)
          .fontColor('#FFFFFF')
          .margin({ bottom: 15 })
        
        Row() {
          this.statCard('⏱️', this.todayMinutes.toString(), '分钟')
          this.statCard('🎯', this.todayActions.toString(), '动作')
          this.statCard('🔥', this.todayCalories.toString(), '卡路里')
        }
        .width('100%')
        .justifyContent(FlexAlign.SpaceEvenly)
      }
      .width('100%')
      .margin({ top: 40 })
      .padding(20)
      .backgroundColor('rgba(255, 255, 255, 0.15)')
      .borderRadius(20)
    }
    .width('100%')
    .justifyContent(FlexAlign.Center)
  }
  
  @Builder
  buildTrainingProgress() {
    Column() {
      // 计时器
      Column() {
        Text(this.formatTime(this.trainingTime))
          .fontSize(56)
          .fontWeight(FontWeight.Bold)
          .fontColor('#FFFFFF')
        
        Text(this.isPaused ? '已暂停' : '训练中...')
          .fontSize(16)
          .fontColor('rgba(255, 255, 255, 0.8)')
          .margin({ top: 10 })
      }
      .margin({ top: 30 })
      
      // 已选动作
      Column() {
        Row() {
          Text('本次练习动作')
            .fontSize(16)
            .fontColor('#FFFFFF')
          
          Blank()
          
          // 疲劳度显示
          Text(`疲劳度: ${this.calculateFatigue()}`)
            .fontSize(14)
            .fontColor('#FFD700')
        }
        .width('100%')
        .margin({ bottom: 10 })
        
        Flex({ wrap: FlexWrap.Wrap }) {
          ForEach(this.selectedMoves, (move: string) => {
            Row() {
              Text(this.getMoveIcon(move))
                .fontSize(12)
              Text(move)
                .fontSize(14)
                .fontColor('#FFFFFF')
                .margin({ left: 4 })
            }
            .backgroundColor(this.getMoveColor(move))
            .borderRadius(15)
            .padding({ left: 12, right: 12, top: 6, bottom: 6 })
            .margin({ right: 8, bottom: 8 })
          })
        }
        .width('100%')
      }
      .width('100%')
      .padding(20)
      .backgroundColor('rgba(255, 255, 255, 0.15)')
      .borderRadius(20)
      .margin({ top: 20 })
      
      // 控制按钮
      Row() {
        Button(this.isPaused ? '继续' : '暂停')
          .fontSize(16)
          .fontColor('#FFFFFF')
          .backgroundColor('rgba(255, 255, 255, 0.3)')
          .borderRadius(25)
          .width(100)
          .height(50)
          .onClick(() => {
            this.togglePause();
          })
        
        Button('结束训练')
          .fontSize(16)
          .fontColor('#FFFFFF')
          .backgroundColor('#FF6B6B')
          .borderRadius(25)
          .width(120)
          .height(50)
          .margin({ left: 20 })
          .onClick(() => {
            this.stopTraining();
          })
      }
      .margin({ top: 30 })
    }
    .width('100%')
  }
  
  @Builder
  buildMoveSelector() {
    Column() {
      Column() {
        Text('选择本次练习动作')
          .fontSize(18)
          .fontWeight(FontWeight.Bold)
          .fontColor('#333333')
          .margin({ bottom: 15 })
        
        Scroll() {
          Column() {
            // 跳跃
            this.buildMoveCategory('跳跃', this.jumpMoves, '🦶')
            // 旋转
            this.buildMoveCategory('旋转', this.spinMoves, '🌀')
            // 步法
            this.buildMoveCategory('步法', this.stepMoves, '👣')
          }
        }
        .height(350)
        .width('100%')
        
        // 已选疲劳度预览
        Row() {
          Text(`已选 ${this.selectedMoves.length} 个动作`)
            .fontSize(14)
            .fontColor('#666666')
          
          Blank()
          
          Text(`疲劳度: ${this.calculateFatigue()}`)
            .fontSize(14)
            .fontColor('#FF6B6B')
            .fontWeight(FontWeight.Bold)
        }
        .width('100%')
        .margin({ top: 15, bottom: 15 })
        
        Row() {
          Button('取消')
            .fontSize(16)
            .fontColor('#666666')
            .backgroundColor('#F0F0F0')
            .borderRadius(20)
            .width(100)
            .onClick(() => {
              this.showMoveSelector = false;
              this.selectedMoves = [];
            })
          
          Button('开始训练')
            .fontSize(16)
            .fontColor('#FFFFFF')
            .backgroundColor('#3A7BD5')
            .borderRadius(20)
            .width(120)
            .margin({ left: 20 })
            .onClick(() => {
              if (this.selectedMoves.length > 0) {
                this.showMoveSelector = false;
                this.startTraining();
              }
            })
        }
      }
      .width('90%')
      .padding(20)
      .backgroundColor('#FFFFFF')
      .borderRadius(20)
    }
    .width('100%')
    .height('100%')
    .backgroundColor('rgba(0, 0, 0, 0.5)')
    .justifyContent(FlexAlign.Center)
  }
  
  @Builder
  buildMoveCategory(title: string, moves: string[], icon: string) {
    Column() {
      Row() {
        Text(icon)
          .fontSize(16)
        Text(title)
          .fontSize(14)
          .fontWeight(FontWeight.Bold)
          .fontColor('#333333')
          .margin({ left: 5 })
        
        Blank()
        
        Text(`疲劳度: ${title === '跳跃' ? '7' : title === '旋转' ? '3' : '1'}`)
          .fontSize(12)
          .fontColor('#999999')
      }
      .width('100%')
      .margin({ bottom: 8 })
      
      Flex({ wrap: FlexWrap.Wrap }) {
        ForEach(moves, (move: string) => {
          Text(move)
            .fontSize(13)
            .fontColor(this.selectedMoves.includes(move) ? '#FFFFFF' : '#333333')
            .backgroundColor(this.selectedMoves.includes(move) ? '#3A7BD5' : '#F0F0F0')
            .borderRadius(8)
            .padding({ left: 10, right: 10, top: 6, bottom: 6 })
            .margin({ right: 6, bottom: 6 })
            .onClick(() => {
              if (this.selectedMoves.includes(move)) {
                this.selectedMoves = this.selectedMoves.filter((m: string) => m !== move);
              } else {
                this.selectedMoves.push(move);
              }
            })
        })
      }
    }
    .width('100%')
    .alignItems(HorizontalAlign.Start)
    .margin({ bottom: 15 })
  }
  
  @Builder
  buildEndDialog() {
    Column() {
      Column() {
        Text('🎉 训练完成！')
          .fontSize(20)
          .fontWeight(FontWeight.Bold)
          .fontColor('#333333')
          .margin({ bottom: 20 })
        
        // 训练统计
        Column() {
          Row() {
            this.resultItem('⏱️', this.formatTime(this.trainingTime), '时长')
            this.resultItem('🎯', this.selectedMoves.length.toString(), '动作')
          }
          .width('100%')
          .justifyContent(FlexAlign.SpaceEvenly)
          
          Row() {
            this.resultItem('🔥', Math.round(this.trainingTime * 0.1).toString(), '卡路里')
            this.resultItem('💪', this.calculateFatigue().toString(), '疲劳度')
          }
          .width('100%')
          .justifyContent(FlexAlign.SpaceEvenly)
          .margin({ top: 15 })
        }
        .width('100%')
        .padding(20)
        .backgroundColor('#F8F8F8')
        .borderRadius(15)
        
        // 备注
        TextInput({ placeholder: '添加训练备注...', text: this.trainingNotes })
          .fontSize(14)
          .backgroundColor('#F0F0F0')
          .borderRadius(10)
          .height(40)
          .width('100%')
          .margin({ top: 15 })
          .onChange((value: string) => {
            this.trainingNotes = value;
          })
        
        Button('保存记录')
          .fontSize(16)
          .fontColor('#FFFFFF')
          .backgroundColor('#4CAF50')
          .borderRadius(20)
          .width('100%')
          .height(45)
          .margin({ top: 20 })
          .onClick(() => {
            this.saveTraining();
          })
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
  }
  
  @Builder
  statCard(icon: string, value: string, label: string) {
    Column() {
      Text(icon)
        .fontSize(24)
      Text(value)
        .fontSize(24)
        .fontWeight(FontWeight.Bold)
        .fontColor('#FFFFFF')
        .margin({ top: 5 })
      Text(label)
        .fontSize(12)
        .fontColor('rgba(255, 255, 255, 0.8)')
    }
  }
  
  @Builder
  resultItem(icon: string, value: string, label: string) {
    Column() {
      Text(icon)
        .fontSize(24)
      Text(value)
        .fontSize(20)
        .fontWeight(FontWeight.Bold)
        .fontColor('#333333')
        .margin({ top: 5 })
      Text(label)
        .fontSize(12)
        .fontColor('#999999')
    }
  }
  
  private getMoveIcon(move: string): string {
    if (this.jumpMoves.includes(move)) return '🦶';
    if (this.spinMoves.includes(move)) return '🌀';
    if (this.stepMoves.includes(move)) return '👣';
    return '⛸️';
  }
  
  private getMoveColor(move: string): string {
    if (this.jumpMoves.includes(move)) return 'rgba(255, 107, 107, 0.8)';
    if (this.spinMoves.includes(move)) return 'rgba(102, 187, 106, 0.8)';
    if (this.stepMoves.includes(move)) return 'rgba(79, 195, 247, 0.8)';
    return 'rgba(255, 255, 255, 0.3)';
  }
  
  private startTraining() {
    this.isTraining = true;
    this.isPaused = false;
    this.trainingTime = 0;
    this.timer = setInterval(() => {
      if (!this.isPaused) {
        this.trainingTime++;
      }
    }, 1000);
  }
  
  private togglePause() {
    this.isPaused = !this.isPaused;
  }
  
  private stopTraining() {
    if (this.timer !== -1) {
      clearInterval(this.timer);
      this.timer = -1;
    }
    this.showEndDialog = true;
  }
  
  private saveTraining() {
    // 保存训练记录到DataStore
    const now = new Date();
    const dateStr = now.toISOString().split('T')[0];
    const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    
    // 为每个选中的动作创建练习记录
    this.selectedMoves.forEach((move: string) => {
      const record: PracticeRecord = {
        id: `${Date.now()}-${move}`,
        moveName: move,
        date: dateStr,
        time: timeStr,
        duration: Math.floor(this.trainingTime / this.selectedMoves.length),
        fatigue: this.calculateFatigue(),
        notes: this.trainingNotes
      };
      this.dataStore.addPracticeRecord(record);
    });
    
    // 更新今日统计
    this.loadTodayStats();
    
    // 重置状态
    this.showEndDialog = false;
    this.isTraining = false;
    this.trainingTime = 0;
    this.selectedMoves = [];
    this.trainingNotes = '';
  }
  
  private formatTime(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }
  
  // 格式化时长（秒转分钟）
  private formatDuration(seconds: number): string {
    if (seconds < 60) return `${seconds}秒`;
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return secs > 0 ? `${mins}分${secs}秒` : `${mins}分钟`;
  }
  
  // 获取星期几名称
  private getDayName(dayOfWeek: number): string {
    const days = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
    return days[dayOfWeek] || '';
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
      .maxHeight('85%')
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
                    Text('暂无计划')
                      .fontSize(14)
                      .fontColor('#CCCCCC')
                      .width('100%')
                      .padding(10)
                      .backgroundColor('#F8F8F8')
                      .borderRadius(8)
                  } else {
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
          
          // 编辑按钮
          Row() {
            Button('编辑计划')
              .fontSize(16)
              .fontColor('#FFFFFF')
              .backgroundColor('#3A7BD5')
              .borderRadius(20)
              .width('45%')
              .height(44)
              .onClick(() => {
                // TODO: 打开编辑界面
              })
            
            Button('删除计划')
              .fontSize(16)
              .fontColor('#FF6B6B')
              .backgroundColor('#FFE5E5')
              .borderRadius(20)
              .width('45%')
              .height(44)
              .margin({ left: 10 })
              .onClick(() => {
                this.deleteCurrentPlan();
              })
          }
          .width('100%')
          .justifyContent(FlexAlign.Center)
          .margin({ top: 15 })
        }
      }
      .width('90%')
      .maxHeight('85%')
      .padding(25)
      .backgroundColor('#FFFFFF')
      .borderRadius(20)
    }
    .width('100%')
    .height('100%')
    .backgroundColor('rgba(0, 0, 0, 0.5)')
    .justifyContent(FlexAlign.Center)
  }
  
  // 获取优先级颜色
  private getPriorityColor(priority: string): string {
    switch (priority) {
      case 'high': return '#FFE5E5';
      case 'medium': return '#FFF9E6';
      case 'low': return '#E8F5E9';
      default: return '#F0F0F0';
    }
  }
  
  // 创建新周计划
  private createNewWeekPlan() {
    const plan = this.dataStore.createWeeklyPlan();
    this.dataStore.saveWeeklyPlan(plan);
    this.currentWeekPlan = plan;
  }
  
  // 删除当前计划
  private deleteCurrentPlan() {
    if (this.currentWeekPlan) {
      this.dataStore.deleteWeeklyPlan(this.currentWeekPlan.id);
      this.currentWeekPlan = null;
    }
  }
}
