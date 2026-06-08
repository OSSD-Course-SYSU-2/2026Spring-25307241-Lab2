/**
 * 冰迹·EdgeFlow - 成就页面
 * 柱状图 + 每日练习方块展示累计冰时
 */

import router from '@ohos.router';
import { DataStore, MoveTypeStats, DailyPracticeData } from '../services/DataStore';
import { MoveDetail } from '../models/IceTraceData';
import { DeviceUtils } from '../common/utils/DeviceUtils';

@Entry
@Component
export struct AchievementPage {
  @State totalIceTime: number = 0;
  @State totalPractices: number = 0;
  @State topMoves: MoveDetail[] = [];
  @State typeStats: MoveTypeStats = { jump: 0, spin: 0, step: 0 };
  @State dailyData: DailyPracticeData[] = [];
  @State scrollOffset: number = 0; // 流转时保存滚动位置
  
  private dataStore: DataStore = DataStore.getInstance();
  private scroller: Scroller = new Scroller(); // 滚动控制器
  
  aboutToAppear() {
    // 保存当前页面路径到AppStorage（用于流转）
    AppStorage.setOrCreate('currentPage', 'pages/AchievementPage');
    
    this.loadData();
    
    // 检查是否需要恢复流转数据
    this.restoreContinueData();
  }
  
  aboutToDisappear() {
    // 保存滚动位置到AppStorage
    AppStorage.setOrCreate('achievementScrollOffset', this.scrollOffset);
  }
  
  loadData() {
    const userData = this.dataStore.getUserData();
    this.totalIceTime = userData.totalIceTime;
    this.totalPractices = userData.totalPractices;
    this.topMoves = this.dataStore.getTopMoves(8);
    const stats = this.dataStore.getMoveTypeStats();
    this.typeStats = { jump: stats.jump, spin: stats.spin, step: stats.step };
    this.dailyData = this.dataStore.getDailyPracticeTime(30);
  }
  
  // 恢复流转数据
  restoreContinueData() {
    // 恢复滚动位置
    const savedOffset = AppStorage.get<number>('achievementScrollOffset');
    if (savedOffset && savedOffset > 0) {
      this.scrollOffset = savedOffset;
      // 延迟恢复滚动位置，确保内容已加载
      setTimeout(() => {
        this.scroller.scrollToIndex(Math.floor(savedOffset / 100));
      }, 100);
    }
    
    // 清除临时存储的流转数据
    AppStorage.delete('achievementScrollOffset');
  }
  
  // 格式化时间
  formatTime(seconds: number): string {
    if (seconds === 0) return '0分钟';
    if (seconds < 60) return `${seconds}秒`;
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    if (hours > 0) {
      return mins > 0 ? `${hours}小时${mins}分` : `${hours}小时`;
    }
    return `${mins}分钟`;
  }
  
  // 获取柱状图最大值
  getMaxBarValue(): number {
    if (this.topMoves.length === 0) return 100;
    return Math.max(...this.topMoves.map(m => m.totalDuration));
  }
  
  // 获取每日最大练习时长
  getMaxDailyDuration(): number {
    if (this.dailyData.length === 0) return 3600; // 默认1小时
    const max = Math.max(...this.dailyData.map(d => d.duration));
    return max > 0 ? max : 3600;
  }
  
  // 获取方块颜色
  getBlockColor(duration: number): string {
    if (duration === 0) return '#F0F0F0';
    const max = this.getMaxDailyDuration();
    const ratio = duration / max;
    
    if (ratio < 0.25) return '#E3F2FD';
    if (ratio < 0.5) return '#90CAF9';
    if (ratio < 0.75) return '#42A5F5';
    return '#1976D2';
  }
  
  // 响应式布局参数
  getTitleFontSize(): number {
    return DeviceUtils.isLargeScreen() ? 32 : 24;
  }
  
  getCardPadding(): number {
    return DeviceUtils.getSpacing();
  }
  
  getCardRadius(): number {
    return DeviceUtils.getCardRadius();
  }
  
  getBlockWidth(): number {
    return DeviceUtils.isLargeScreen() ? 48 : 36;
  }
  
  getBlockHeight(): number {
    return DeviceUtils.isLargeScreen() ? 48 : 36;
  }
  
  getBlockMargin(): number {
    return DeviceUtils.isLargeScreen() ? 4 : 2;
  }
  
  build() {
    Column() {
      // 标题
      Text('🏆 成就')
        .fontSize(this.getTitleFontSize())
        .fontWeight(FontWeight.Bold)
        .fontColor('#FFFFFF')
        .margin({ bottom: DeviceUtils.isLargeScreen() ? 30 : 20 })
      
      // 滚动容器 - 支持Pad端滚动查看所有内容
      Scroll(this.scroller) {
        Column() {
          // 总览卡片
          this.buildOverviewCard()
          
          // 每日练习方块
          this.buildDailyBlocks()
          
          // 柱状图
          this.buildBarChart()
        }
        .width('100%')
      }
      .width('100%')
      .layoutWeight(1)
      .scrollBar(BarState.Auto)
      .scrollBarColor('#FFFFFF')
      .scrollBarWidth(DeviceUtils.isLargeScreen() ? 6 : 4)
      .edgeEffect(EdgeEffect.Spring)
      .onScroll(() => {
        // 实时更新滚动位置
        this.scrollOffset = this.scroller.currentOffset().yOffset;
      })
      .onScrollEnd(() => {
        // 滚动结束时保存位置
        AppStorage.setOrCreate('achievementScrollOffset', this.scrollOffset);
      })
    }
    .width('100%')
    .height('100%')
    .padding(DeviceUtils.isLargeScreen() ? 30 : 20)
    .linearGradient({
      angle: 135,
      colors: [['#00D2FF', 0.0], ['#3A7BD5', 1.0]]
    })
  }
  
  @Builder
  buildOverviewCard() {
    Column() {
      Row() {
        Column() {
          Text('⏱️')
            .fontSize(DeviceUtils.isLargeScreen() ? 40 : 30)
          Text(this.formatTime(this.totalIceTime))
            .fontSize(DeviceUtils.isLargeScreen() ? 20 : 16)
            .fontWeight(FontWeight.Bold)
            .fontColor('#333333')
            .margin({ top: DeviceUtils.isLargeScreen() ? 8 : 5 })
          Text('总冰时')
            .fontSize(DeviceUtils.isLargeScreen() ? 14 : 12)
            .fontColor('#666666')
        }
        .layoutWeight(1)
        
        Column() {
          Text('🎯')
            .fontSize(DeviceUtils.isLargeScreen() ? 40 : 30)
          Text(this.totalPractices.toString())
            .fontSize(DeviceUtils.isLargeScreen() ? 20 : 16)
            .fontWeight(FontWeight.Bold)
            .fontColor('#333333')
            .margin({ top: DeviceUtils.isLargeScreen() ? 8 : 5 })
          Text('练习次数')
            .fontSize(DeviceUtils.isLargeScreen() ? 14 : 12)
            .fontColor('#666666')
        }
        .layoutWeight(1)
        
        Column() {
          Text('📊')
            .fontSize(DeviceUtils.isLargeScreen() ? 40 : 30)
          Text(this.topMoves.length.toString())
            .fontSize(DeviceUtils.isLargeScreen() ? 20 : 16)
            .fontWeight(FontWeight.Bold)
            .fontColor('#333333')
            .margin({ top: DeviceUtils.isLargeScreen() ? 8 : 5 })
          Text('已掌握动作')
            .fontSize(DeviceUtils.isLargeScreen() ? 14 : 12)
            .fontColor('#666666')
        }
        .layoutWeight(1)
      }
      .width('100%')
    }
    .width('100%')
    .padding(this.getCardPadding())
    .backgroundColor('#FFFFFF')
    .borderRadius(this.getCardRadius())
    .margin({ bottom: DeviceUtils.isLargeScreen() ? 30 : 20 })
    .shadow(DeviceUtils.isLargeScreen() ? {
      radius: 8,
      color: 'rgba(0, 0, 0, 0.1)',
      offsetX: 0,
      offsetY: 2
    } : undefined)
  }
  
  @Builder
  buildBarChart() {
    Column() {
      Text('各动作累计时长')
        .fontSize(DeviceUtils.isLargeScreen() ? 20 : 16)
        .fontWeight(FontWeight.Bold)
        .fontColor('#333333')
        .margin({ bottom: DeviceUtils.isLargeScreen() ? 20 : 15 })
      
      if (this.topMoves.length === 0) {
        Column() {
          Text('📊')
            .fontSize(DeviceUtils.isLargeScreen() ? 60 : 40)
          Text('暂无数据，开始训练吧！')
            .fontSize(DeviceUtils.isLargeScreen() ? 16 : 14)
            .fontColor('#999999')
            .margin({ top: DeviceUtils.isLargeScreen() ? 15 : 10 })
        }
        .width('100%')
        .height(DeviceUtils.isLargeScreen() ? 200 : 150)
        .justifyContent(FlexAlign.Center)
      } else {
        // 柱状图
        Column() {
          ForEach(this.topMoves, (move: MoveDetail) => {
            Row() {
              Text(move.abbr)
                .fontSize(DeviceUtils.isLargeScreen() ? 14 : 12)
                .fontColor('#666666')
                .width(DeviceUtils.isLargeScreen() ? 60 : 40)
              
              // 柱状条
              Row() {
                Row()
                  .width(`${(move.totalDuration / this.getMaxBarValue()) * 100}%`)
                  .height(DeviceUtils.isLargeScreen() ? 28 : 20)
                  .linearGradient({
                    angle: 90,
                    colors: [['#00D2FF', 0.0], ['#3A7BD5', 1.0]]
                  })
                  .borderRadius({ topRight: DeviceUtils.isLargeScreen() ? 6 : 4, bottomRight: DeviceUtils.isLargeScreen() ? 6 : 4 })
              }
              .width('100%')
              .height(DeviceUtils.isLargeScreen() ? 28 : 20)
              .backgroundColor('#F0F0F0')
              .borderRadius(DeviceUtils.isLargeScreen() ? 6 : 4)
              .layoutWeight(1)
              
              Text(this.formatTime(move.totalDuration))
                .fontSize(DeviceUtils.isLargeScreen() ? 13 : 11)
                .fontColor('#999999')
                .width(DeviceUtils.isLargeScreen() ? 80 : 60)
                .margin({ left: DeviceUtils.isLargeScreen() ? 12 : 8 })
            }
            .width('100%')
            .margin({ bottom: DeviceUtils.isLargeScreen() ? 12 : 8 })
            .alignItems(VerticalAlign.Center)
            .onClick(() => {
              // 跳转到动作详情页
              router.pushUrl({
                url: 'pages/MoveDetailPage',
                params: { abbr: move.abbr }
              });
            })
          })
        }
        .width('100%')
        .padding({ left: DeviceUtils.isLargeScreen() ? 15 : 10, right: DeviceUtils.isLargeScreen() ? 15 : 10 })
      }
    }
    .width('100%')
    .padding(this.getCardPadding())
    .backgroundColor('#FFFFFF')
    .borderRadius(this.getCardRadius())
    .margin({ bottom: DeviceUtils.isLargeScreen() ? 30 : 20 })
    .shadow(DeviceUtils.isLargeScreen() ? {
      radius: 8,
      color: 'rgba(0, 0, 0, 0.1)',
      offsetX: 0,
      offsetY: 2
    } : undefined)
  }
  
  @Builder
  buildDailyBlocks() {
    Column() {
      Text('最近30天练习记录')
        .fontSize(DeviceUtils.isLargeScreen() ? 20 : 16)
        .fontWeight(FontWeight.Bold)
        .fontColor('#333333')
        .margin({ bottom: DeviceUtils.isLargeScreen() ? 20 : 15 })
      
      // 星期标题
      Row() {
        ForEach(['日', '一', '二', '三', '四', '五', '六'], (day: string) => {
          Text(day)
            .fontSize(DeviceUtils.isLargeScreen() ? 12 : 10)
            .fontColor('#999999')
            .width(this.getBlockWidth() + this.getBlockMargin())
            .textAlign(TextAlign.Center)
        })
      }
      .width('100%')
      .justifyContent(FlexAlign.Start)
      .margin({ bottom: DeviceUtils.isLargeScreen() ? 12 : 8 })
      
      // 方块网格
      Flex({ wrap: FlexWrap.Wrap }) {
        ForEach(this.dailyData, (data: DailyPracticeData, index: number) => {
          Column() {
            // 方块
            Column() {
              if (data.duration > 0) {
                Text(Math.floor(data.duration / 60).toString())
                  .fontSize(DeviceUtils.isLargeScreen() ? 12 : 10)
                  .fontWeight(FontWeight.Bold)
                  .fontColor(data.duration > this.getMaxDailyDuration() * 0.5 ? '#FFFFFF' : '#333333')
              } else {
                Text('')
                  .fontSize(DeviceUtils.isLargeScreen() ? 12 : 10)
              }
            }
            .width(this.getBlockWidth())
            .height(this.getBlockHeight())
            .backgroundColor(this.getBlockColor(data.duration))
            .borderRadius(DeviceUtils.isLargeScreen() ? 8 : 6)
            .justifyContent(FlexAlign.Center)
          }
          .width(this.getBlockWidth() + this.getBlockMargin())
          .height(this.getBlockHeight() + this.getBlockMargin())
          .margin({ right: this.getBlockMargin(), bottom: this.getBlockMargin() })
        })
      }
      .width('100%')
      
      // 图例
      Row() {
        Text('图例：')
          .fontSize(DeviceUtils.isLargeScreen() ? 14 : 12)
          .fontColor('#666666')
        
        Column()
          .width(DeviceUtils.isLargeScreen() ? 24 : 20)
          .height(DeviceUtils.isLargeScreen() ? 24 : 20)
          .backgroundColor('#F0F0F0')
          .borderRadius(DeviceUtils.isLargeScreen() ? 6 : 4)
        
        Text('无')
          .fontSize(DeviceUtils.isLargeScreen() ? 12 : 10)
          .fontColor('#999999')
          .margin({ left: 4, right: DeviceUtils.isLargeScreen() ? 12 : 8 })
        
        Column()
          .width(DeviceUtils.isLargeScreen() ? 24 : 20)
          .height(DeviceUtils.isLargeScreen() ? 24 : 20)
          .backgroundColor('#E3F2FD')
          .borderRadius(DeviceUtils.isLargeScreen() ? 6 : 4)
        
        Text('少')
          .fontSize(DeviceUtils.isLargeScreen() ? 12 : 10)
          .fontColor('#999999')
          .margin({ left: 4, right: DeviceUtils.isLargeScreen() ? 12 : 8 })
        
        Column()
          .width(DeviceUtils.isLargeScreen() ? 24 : 20)
          .height(DeviceUtils.isLargeScreen() ? 24 : 20)
          .backgroundColor('#90CAF9')
          .borderRadius(DeviceUtils.isLargeScreen() ? 6 : 4)
        
        Text('中')
          .fontSize(DeviceUtils.isLargeScreen() ? 12 : 10)
          .fontColor('#999999')
          .margin({ left: 4, right: DeviceUtils.isLargeScreen() ? 12 : 8 })
        
        Column()
          .width(DeviceUtils.isLargeScreen() ? 24 : 20)
          .height(DeviceUtils.isLargeScreen() ? 24 : 20)
          .backgroundColor('#1976D2')
          .borderRadius(DeviceUtils.isLargeScreen() ? 6 : 4)
        
        Text('多')
          .fontSize(DeviceUtils.isLargeScreen() ? 12 : 10)
          .fontColor('#999999')
          .margin({ left: 4 })
      }
      .width('100%')
      .margin({ top: DeviceUtils.isLargeScreen() ? 20 : 15 })
      .justifyContent(FlexAlign.Center)
    }
    .width('100%')
    .padding(this.getCardPadding())
    .backgroundColor('#FFFFFF')
    .borderRadius(this.getCardRadius())
    .margin({ bottom: DeviceUtils.isLargeScreen() ? 30 : 20 })
    .shadow(DeviceUtils.isLargeScreen() ? {
      radius: 8,
      color: 'rgba(0, 0, 0, 0.1)',
      offsetX: 0,
      offsetY: 2
    } : undefined)
  }
}
