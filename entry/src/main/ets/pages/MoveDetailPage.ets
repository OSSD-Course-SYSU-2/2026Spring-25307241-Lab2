/**
 * 冰迹·EdgeFlow - 动作详情页面
 * 展示练习历史时间轴 + 动作要点设置
 */

import router from '@ohos.router';
import { DataStore } from '../services/DataStore';
import { MoveDetail, PracticeRecord } from '../models/IceTraceData';

@Entry
@Component
struct MoveDetailPage {
  @State moveAbbr: string = '';
  @State move: MoveDetail | null = null;
  @State records: PracticeRecord[] = [];
  @State showTipsEditor: boolean = false;
  @State tipsText: string = '';
  
  private dataStore: DataStore = DataStore.getInstance();
  
  aboutToAppear() {
    // 获取路由参数
    const params = router.getParams() as Record<string, string>;
    if (params && params['abbr']) {
      this.moveAbbr = params['abbr'] as string;
      this.loadMoveData();
    }
  }
  
  loadMoveData() {
    this.move = this.dataStore.getMove(this.moveAbbr) || null;
    this.records = this.dataStore.getMoveRecords(this.moveAbbr);
    if (this.move) {
      this.tipsText = this.move.tips;
    }
  }
  
  // 格式化时间
  formatDuration(seconds: number): string {
    if (seconds < 60) return `${seconds}秒`;
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return secs > 0 ? `${mins}分${secs}秒` : `${mins}分钟`;
  }
  
  // 格式化日期
  formatDate(date: string): string {
    const parts = date.split('-');
    return `${parts[1]}月${parts[2]}日`;
  }
  
  // 获取类型图标
  getTypeIcon(): string {
    if (!this.move) return '❓';
    switch (this.move.type) {
      case 'jump': return '🦶';
      case 'spin': return '🌀';
      case 'step': return '👣';
      default: return '❓';
    }
  }
  
  // 获取类型名称
  getTypeName(): string {
    if (!this.move) return '未知';
    switch (this.move.type) {
      case 'jump': return '跳跃';
      case 'spin': return '旋转';
      case 'step': return '步法';
      default: return '未知';
    }
  }
  
  build() {
    Stack() {
      Column() {
        // 顶部导航
        Row() {
          Text('←')
            .fontSize(24)
            .fontColor('#FFFFFF')
            .onClick(() => {
              router.back();
            })
          
          Text(this.move?.name || this.moveAbbr)
            .fontSize(20)
            .fontWeight(FontWeight.Bold)
            .fontColor('#FFFFFF')
            .margin({ left: 15 })
            .layoutWeight(1)
          
          Text('设置')
            .fontSize(14)
            .fontColor('#FFFFFF')
            .onClick(() => {
              this.showTipsEditor = true;
            })
        }
        .width('100%')
        .padding({ left: 20, right: 20, top: 15, bottom: 15 })
        
        // 动作信息卡片
        if (this.move) {
          this.buildMoveInfo()
        }
        
        // 练习历史时间轴
        Column() {
          Text('练习历史')
            .fontSize(18)
            .fontWeight(FontWeight.Bold)
            .fontColor('#FFFFFF')
            .margin({ bottom: 15 })
          
          if (this.records.length === 0) {
            Column() {
              Text('📝')
                .fontSize(40)
              Text('暂无练习记录')
                .fontSize(14)
                .fontColor('rgba(255, 255, 255, 0.6)')
                .margin({ top: 10 })
            }
            .width('100%')
            .height(150)
            .justifyContent(FlexAlign.Center)
          } else {
            List() {
              ForEach(this.records, (record: PracticeRecord, index: number) => {
                ListItem() {
                  this.buildTimelineItem(record, index)
                }
              })
            }
            .width('100%')
            .layoutWeight(1)
          }
        }
        .width('100%')
        .layoutWeight(1)
        .padding(20)
        .margin({ top: 10 })
      }
      .width('100%')
      .height('100%')
      .linearGradient({
        angle: 135,
        colors: [['#00D2FF', 0.0], ['#3A7BD5', 1.0]]
      })
      
      // 动作要点编辑弹窗
      if (this.showTipsEditor) {
        this.buildTipsEditor()
      }
    }
    .width('100%')
    .height('100%')
  }
  
  @Builder
  buildMoveInfo() {
    Column() {
      Row() {
        Text(this.getTypeIcon())
          .fontSize(40)
        
        Column() {
          Text(this.move!.name)
            .fontSize(18)
            .fontWeight(FontWeight.Bold)
            .fontColor('#333333')
          
          Row() {
            Text(this.move!.abbr)
              .fontSize(14)
              .fontColor('#666666')
            
            Text(' | ')
              .fontSize(14)
              .fontColor('#CCCCCC')
            
            Text(this.getTypeName())
              .fontSize(14)
              .fontColor('#666666')
            
            Text(' | ')
              .fontSize(14)
              .fontColor('#CCCCCC')
            
            Text(this.move!.level + '级')
              .fontSize(14)
              .fontColor('#FF6B6B')
              .fontWeight(FontWeight.Bold)
          }
          .margin({ top: 5 })
        }
        .alignItems(HorizontalAlign.Start)
        .margin({ left: 15 })
        .layoutWeight(1)
      }
      .width('100%')
      
      // 统计数据
      Row() {
        Column() {
          Text(this.formatDuration(this.move!.totalDuration))
            .fontSize(20)
            .fontWeight(FontWeight.Bold)
            .fontColor('#3A7BD5')
          Text('累计时长')
            .fontSize(12)
            .fontColor('#666666')
            .margin({ top: 5 })
        }
        .layoutWeight(1)
        
        Column() {
          Text(this.move!.practiceCount.toString())
            .fontSize(20)
            .fontWeight(FontWeight.Bold)
            .fontColor('#3A7BD5')
          Text('练习次数')
            .fontSize(12)
            .fontColor('#666666')
            .margin({ top: 5 })
        }
        .layoutWeight(1)
      }
      .width('100%')
      .margin({ top: 20 })
      
      // 动作要点
      if (this.move!.tips) {
        Column() {
          Text('动作要点')
            .fontSize(14)
            .fontColor('#666666')
            .margin({ bottom: 8 })
          
          Text(this.move!.tips)
            .fontSize(14)
            .fontColor('#333333')
            .lineHeight(22)
        }
        .width('100%')
        .alignItems(HorizontalAlign.Start)
        .margin({ top: 15 })
        .padding(15)
        .backgroundColor('#F5F5F5')
        .borderRadius(10)
      }
    }
    .width('90%')
    .padding(20)
    .backgroundColor('#FFFFFF')
    .borderRadius(15)
    .margin({ top: 10 })
  }
  
  @Builder
  buildTimelineItem(record: PracticeRecord, index: number) {
    Row() {
      // 时间轴左侧
      Column() {
        Text(this.formatDate(record.date))
          .fontSize(12)
          .fontColor('rgba(255, 255, 255, 0.8)')
        
        Text(record.time)
          .fontSize(10)
          .fontColor('rgba(255, 255, 255, 0.6)')
      }
      .width(60)
      .alignItems(HorizontalAlign.End)
      
      // 时间轴中间
      Column() {
        Circle()
          .width(12)
          .height(12)
          .fill('#FFFFFF')
        
        if (index < this.records.length - 1) {
          Line()
            .width(2)
            .height(40)
            .backgroundColor('rgba(255, 255, 255, 0.3)')
        }
      }
      .width(20)
      .margin({ left: 10, right: 10 })
      
      // 时间轴右侧内容
      Column() {
        Row() {
          Text(`时长: ${this.formatDuration(record.duration)}`)
            .fontSize(14)
            .fontColor('#FFFFFF')
          
          Text(`疲劳度: ${record.fatigue}`)
            .fontSize(14)
            .fontColor('rgba(255, 255, 255, 0.8)')
            .margin({ left: 15 })
        }
        
        if (record.notes) {
          Text(record.notes)
            .fontSize(12)
            .fontColor('rgba(255, 255, 255, 0.6)')
            .margin({ top: 5 })
        }
      }
      .alignItems(HorizontalAlign.Start)
      .layoutWeight(1)
      .padding(15)
      .backgroundColor('rgba(255, 255, 255, 0.15)')
      .borderRadius(10)
    }
    .width('100%')
    .alignItems(VerticalAlign.Top)
    .margin({ bottom: 10 })
  }
  
  @Builder
  buildTipsEditor() {
    Column() {
      Column() {
        Text('设置动作要点')
          .fontSize(18)
          .fontWeight(FontWeight.Bold)
          .fontColor('#333333')
          .margin({ bottom: 20 })
        
        TextArea({ placeholder: '输入动作要点，如：起跳角度、落冰姿势等...', text: this.tipsText })
          .width('100%')
          .height(150)
          .fontSize(14)
          .fontColor('#333333')
          .backgroundColor('#F5F5F5')
          .borderRadius(10)
          .onChange((value: string) => {
            this.tipsText = value;
          })
        
        Row() {
          Button('取消')
            .fontSize(16)
            .fontColor('#666666')
            .backgroundColor('#E0E0E0')
            .borderRadius(20)
            .layoutWeight(1)
            .onClick(() => {
              this.showTipsEditor = false;
              this.tipsText = this.move?.tips || '';
            })
          
          Button('保存')
            .fontSize(16)
            .fontColor('#FFFFFF')
            .backgroundColor('#3A7BD5')
            .borderRadius(20)
            .layoutWeight(1)
            .margin({ left: 15 })
            .onClick(() => {
              this.dataStore.updateMoveTips(this.moveAbbr, this.tipsText);
              this.showTipsEditor = false;
              this.loadMoveData();
            })
        }
        .width('100%')
        .margin({ top: 20 })
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
}
