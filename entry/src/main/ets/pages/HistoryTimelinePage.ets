/**
 * 冰迹花滑 - 花滑历史长廊
 * 时间轴展示花样滑冰发展历史
 */

import { IceNavBar } from '../common/components/IceNavBar';
import { IceCard } from '../common/components/IceCard';

@Entry
@Component
struct HistoryTimelinePage {
  private timelineEvents: TimelineEvent[] = [
    {
      year: '1908',
      title: '花样滑冰首次进入奥运会',
      description: '在伦敦奥运会上，花样滑冰成为奥运会正式比赛项目，这是冬季项目首次进入奥运会。',
      icon: '🏆',
      type: 'milestone'
    },
    {
      year: '1924',
      title: '首届冬奥会举办',
      description: '法国夏蒙尼举办首届冬季奥运会，花样滑冰成为核心项目。',
      icon: '❄️',
      type: 'milestone'
    },
    {
      year: '1952',
      title: '迪克·按钮时代',
      description: '美国选手迪克·按钮完成首个三周跳，开创现代花样滑冰技术时代。',
      icon: '⛸️',
      type: 'technical'
    },
    {
      year: '1976',
      title: '冰上舞蹈成为正式项目',
      description: '因斯布鲁克冬奥会上，冰上舞蹈首次成为正式比赛项目。',
      icon: '💃',
      type: 'milestone'
    },
    {
      year: '1988',
      title: '卡特琳娜·维特传奇',
      description: '德国选手维特连续两届冬奥会夺冠，成为花滑史上最伟大的女选手之一。',
      icon: '👑',
      type: 'legend'
    },
    {
      year: '2002',
      title: '双人滑争议与改革',
      description: '盐湖城冬奥会双人滑争议事件，促使ISU进行评分系统改革。',
      icon: '⚖️',
      type: 'reform'
    },
    {
      year: '2004',
      title: '新评分系统启用',
      description: 'ISU正式启用新的评分系统(COP)，取代传统的6.0分制。',
      icon: '📊',
      type: 'reform'
    },
    {
      year: '2014',
      title: '羽生结弦亚洲首金',
      description: '索契冬奥会上，日本选手羽生结弦成为首位亚洲男子单人滑奥运冠军。',
      icon: '🥇',
      type: 'legend'
    },
    {
      year: '2018',
      title: '团体赛正式设立',
      description: '平昌冬奥会上，花样滑冰团体赛首次成为正式比赛项目。',
      icon: '👥',
      type: 'milestone'
    },
    {
      year: '2022',
      title: '北京冬奥会',
      description: '北京成功举办冬奥会，花样滑冰赛事精彩纷呈，陈巍夺冠。',
      icon: '🇨🇳',
      type: 'milestone'
    }
  ];
  
  build() {
    Column() {
      // 导航栏
      IceNavBar({
        title: '花滑历史长廊',
        showBack: true,
        navBackgroundColor: '#4FC3F7'
      });
      
      // 内容区
      Scroll() {
        Column() {
          // 介绍横幅
          this.buildIntroBanner();
          
          // 时间轴
          this.buildTimeline();
        }
        .width('100%')
        .padding(16)
      }
      .layoutWeight(1)
      .scrollBar(BarState.Auto)
    }
    .width('100%')
    .height('100%')
    .backgroundColor('#F5F5F5')
  }
  
  // 介绍横幅
  @Builder
  buildIntroBanner() {
    Column() {
      Text('花样滑冰发展史')
        .fontSize(24)
        .fontWeight(FontWeight.Bold)
        .fontColor('#FFFFFF')
        .margin({ bottom: 8 })
      
      Text('从冰上舞蹈到现代竞技体育')
        .fontSize(14)
        .fontColor('rgba(255,255,255,0.8)')
    }
    .width('100%')
    .height(150)
    .justifyContent(FlexAlign.Center)
    .linearGradient({
      angle: 135,
      colors: [['#667eea', 0.0], ['#764ba2', 1.0]]
    })
    .borderRadius(16)
    .margin({ bottom: 24 })
  }
  
  // 时间轴
  @Builder
  buildTimeline() {
    Column() {
      ForEach(this.timelineEvents, (event: TimelineEvent, index: number) => {
        this.TimelineItem(event, index);
      }, (event: TimelineEvent) => event.year)
    }
    .width('100%')
  }
  
  @Builder
  TimelineItem(event: TimelineEvent, index: number) {
    Row() {
      // 时间轴线条
      Column() {
        // 圆点
        Column() {
          Text(event.icon)
            .fontSize(20)
        }
        .width(40)
        .height(40)
        .backgroundColor(this.getEventColor(event.type))
        .borderRadius(20)
        .justifyContent(FlexAlign.Center)
        
        // 连接线
        if (index < this.timelineEvents.length - 1) {
          Column()
            .width(2)
            .height(60)
            .backgroundColor('#E0E0E0')
            .margin({ top: 8 })
        }
      }
      .width(60)
      
      // 内容卡片
      Column() {
        Row() {
          Text(event.year)
            .fontSize(20)
            .fontWeight(FontWeight.Bold)
            .fontColor(this.getEventColor(event.type))
          
          Text(event.title)
            .fontSize(16)
            .fontWeight(FontWeight.Bold)
            .fontColor('#333333')
            .margin({ left: 12 })
            .layoutWeight(1)
        }
        .width('100%')
        .margin({ bottom: 8 })
        
        Text(event.description)
          .fontSize(14)
          .fontColor('#666666')
          .lineHeight(22)
      }
      .layoutWeight(1)
      .padding(16)
      .backgroundColor('#FFFFFF')
      .borderRadius(12)
      .margin({ left: 16, bottom: 16 })
      .alignItems(HorizontalAlign.Start)
    }
    .width('100%')
    .alignItems(VerticalAlign.Top)
  }
  
  private getEventColor(type: string): string {
    const colors: Record<string, string> = {
      'milestone': '#4FC3F7',
      'technical': '#66BB6A',
      'legend': '#FFA726',
      'reform': '#AB47BC'
    };
    return colors[type] || '#4FC3F7';
  }
}

// 数据类型
interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  icon: string;
  type: string;
}
