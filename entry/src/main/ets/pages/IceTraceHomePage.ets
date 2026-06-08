/**
 * 冰迹花滑 - 首页
 * 综合门户，展示核心入口和实时信息
 */

import router from '@ohos.router';
import { IceNavBar } from '../common/components/IceNavBar';
import { IceCard } from '../common/components/IceCard';
import { IceTag } from '../common/components/IceTag';
import { SAMPLE_SKATERS, DAILY_KNOWLEDGE } from '../viewmodel/SampleData';
import { getDisciplineIcon, DISCIPLINE_NAMES, Discipline, Skater } from '../viewmodel/IceTraceModel';

@Entry
@Component
struct IceTraceHomePage {
  @State currentBannerIndex: number = 0;      // 当前轮播索引
  @State dailyKnowledgeIndex: number = 0;     // 每日知识索引
  
  // 轮播数据
  private banners: BannerItem[] = [
    { title: '2024世界锦标赛', subtitle: '蒙特利尔 3月18-24日', type: 'competition' },
    { title: '花滑科普专题', subtitle: '从零开始了解花样滑冰', type: 'wiki' },
    { title: '动作图鉴上线', subtitle: '可视化学习跳跃、旋转', type: 'feature' }
  ];
  
  // 快速入口
  private quickEntries: QuickEntry[] = [
    { icon: '⛸️', title: '动作图鉴', subtitle: '学习跳跃旋转', route: 'pages/MoveGalleryPage' },
    { icon: '📝', title: '知识闯关', subtitle: '答题学知识', route: 'pages/QuizChallengePage' },
    { icon: '🧮', title: '计分工具', subtitle: '模拟计算分数', route: 'pages/ScoringSimulatorPage' },
    { icon: '📖', title: '术语词典', subtitle: '专业词汇查询', route: 'pages/GlossaryPage' }
  ];
  
  // 导航菜单
  private navMenus: NavMenu[] = [
    { title: '赛事中心', icon: '🏆', route: 'pages/CompetitionCenterPage' },
    { title: '选手档案', icon: '👤', route: 'pages/SkaterArchivePage' },
    { title: '数据纪录', icon: '📊', route: 'pages/DataRecordsPage' },
    { title: '花滑科普', icon: '📚', route: 'pages/WikiHomePage' },
    { title: '互动乐园', icon: '🎮', route: 'pages/QuizChallengePage' },
    { title: '计分工具', icon: '🧮', route: 'pages/ScoringSimulatorPage' }
  ];
  
  aboutToAppear() {
    // 随机选择每日知识
    this.dailyKnowledgeIndex = Math.floor(Math.random() * DAILY_KNOWLEDGE.length);
  }
  
  build() {
    Column() {
      // 顶部导航栏
      this.buildNavBar();
      
      // 滚动内容区
      Scroll() {
        Column() {
          // 轮播横幅
          this.buildBanner();
          
          // 导航菜单
          this.buildNavMenus();
          
          // 实时赛况
          this.buildLiveCompetition();
          
          // 热门选手
          this.buildPopularSkaters();
          
          // 每日一识
          this.buildDailyKnowledge();
          
          // 近期赛事日历
          this.buildCompetitionCalendar();
          
          // 快速入口
          this.buildQuickEntries();
        }
        .width('100%')
        .padding({ bottom: 20 })
      }
      .layoutWeight(1)
      .scrollBar(BarState.Auto)
      .edgeEffect(EdgeEffect.Spring)
    }
    .width('100%')
    .height('100%')
    .backgroundColor('#F5F5F5')
  }
  
  // 构建导航栏
  @Builder
  buildNavBar() {
    Row() {
      Text('⛸️ 冰迹花滑')
        .fontSize(20)
        .fontWeight(FontWeight.Bold)
        .fontColor('#FFFFFF')
      
      Blank()
      
      // 语言切换
      Button('EN')
        .fontSize(12)
        .height(28)
        .width(40)
        .backgroundColor('rgba(255,255,255,0.2)')
        .fontColor('#FFFFFF')
        .borderRadius(14)
    }
    .width('100%')
    .height(56)
    .padding({ left: 20, right: 20 })
    .linearGradient({
      angle: 135,
      colors: [['#4FC3F7', 0.0], ['#1976D2', 1.0]]
    })
  }
  
  // 构建轮播横幅
  @Builder
  buildBanner() {
    Swiper() {
      ForEach(this.banners, (banner: BannerItem, index: number) => {
        Column() {
          Text(banner.title)
            .fontSize(24)
            .fontWeight(FontWeight.Bold)
            .fontColor('#FFFFFF')
            .margin({ bottom: 8 })
          
          Text(banner.subtitle)
            .fontSize(14)
            .fontColor('rgba(255,255,255,0.8)')
        }
        .width('100%')
        .height(180)
        .justifyContent(FlexAlign.Center)
        .linearGradient({
          angle: 135,
          colors: [['#667eea', 0.0], ['#764ba2', 1.0]]
        })
        .onClick(() => {
          // 点击轮播
        })
      }, (banner: BannerItem) => banner.title)
    }
    .width('100%')
    .height(180)
    .autoPlay(true)
    .interval(3000)
    .indicator(true)
    .onChange((index: number) => {
      this.currentBannerIndex = index;
    })
    .margin({ bottom: 16 })
  }
  
  // 构建导航菜单
  @Builder
  buildNavMenus() {
    Column() {
      Text('功能导航')
        .fontSize(16)
        .fontWeight(FontWeight.Bold)
        .fontColor('#333333')
        .margin({ bottom: 12 })
      
      GridRow({
        columns: { sm: 3, md: 6, lg: 6 },
        gutter: 12
      }) {
        ForEach(this.navMenus, (menu: NavMenu) => {
          GridCol({ span: 1 }) {
            Column() {
              Text(menu.icon)
                .fontSize(32)
                .margin({ bottom: 8 })
              
              Text(menu.title)
                .fontSize(12)
                .fontColor('#666666')
            }
            .width('100%')
            .height(80)
            .backgroundColor('#FFFFFF')
            .borderRadius(8)
            .justifyContent(FlexAlign.Center)
            .onClick(() => {
              router.pushUrl({ url: menu.route });
            })
          }
        }, (menu: NavMenu) => menu.title)
      }
    }
    .width('100%')
    .padding(16)
    .backgroundColor('#FFFFFF')
    .margin({ bottom: 16 })
  }
  
  // 构建实时赛况
  @Builder
  buildLiveCompetition() {
    IceCard({
      title: '🏆 实时赛况',
      subtitle: '正在进行',
      onCardClick: () => {
        router.pushUrl({ url: 'pages/CompetitionCenterPage' });
      }
    }) {
      Column() {
        Row() {
          Text('2024世界锦标赛')
            .fontSize(14)
            .fontWeight(FontWeight.Bold)
            .fontColor('#333333')
          
          IceTag({ text: '进行中', type: 'primary', tagSize: 'small' })
        }
        .width('100%')
        .margin({ bottom: 8 })
        
        Text('男子单人滑 自由滑')
          .fontSize(12)
          .fontColor('#666666')
          .margin({ bottom: 12 })
        
        Row() {
          Text('🥇 陈巍 (USA)')
            .fontSize(14)
            .fontColor('#333333')
            .layoutWeight(1)
          
          Text('332.60')
            .fontSize(14)
            .fontWeight(FontWeight.Bold)
            .fontColor('#1976D2')
        }
        .width('100%')
      }
      .width('100%')
    }
  }
  
  // 构建热门选手
  @Builder
  buildPopularSkaters() {
    IceCard({
      title: '⭐ 热门选手',
      onCardClick: () => {
        router.pushUrl({ url: 'pages/SkaterArchivePage' });
      }
    }) {
      Column() {
        ForEach(SAMPLE_SKATERS.slice(0, 3), (skater: Skater) => {
          Row() {
            // 头像
            Column() {
              Text('👤')
                .fontSize(32)
            }
            .width(48)
            .height(48)
            .backgroundColor('#F5F5F5')
            .borderRadius(24)
            .justifyContent(FlexAlign.Center)
            
            // 信息
            Column() {
              Row() {
                Text(skater.name)
                  .fontSize(14)
                  .fontWeight(FontWeight.Bold)
                  .fontColor('#333333')
                
                Text(getDisciplineIcon(skater.discipline))
                  .fontSize(12)
                  .margin({ left: 8 })
                
                Text(skater.nationality)
                  .fontSize(12)
                  .fontColor('#999999')
                  .margin({ left: 4 })
              }
              .width('100%')
              
              Text(skater.biography.substring(0, 30) + '...')
                .fontSize(12)
                .fontColor('#666666')
                .margin({ top: 4 })
            }
            .layoutWeight(1)
            .alignItems(HorizontalAlign.Start)
            .margin({ left: 12 })
            
            Text('›')
              .fontSize(20)
              .fontColor('#999999')
          }
          .width('100%')
          .padding({ top: 8, bottom: 8 })
          .onClick(() => {
            router.pushUrl({
              url: 'pages/SkaterDetailPage',
              params: { skaterId: skater.id }
            });
          })
        }, (skater: Skater) => skater.id)
      }
      .width('100%')
    }
  }
  
  // 构建每日一识
  @Builder
  buildDailyKnowledge() {
    IceCard({
      title: '💡 每日一识',
      cardBackgroundColor: '#E3F2FD'
    }) {
      Column() {
        Text(DAILY_KNOWLEDGE[this.dailyKnowledgeIndex].title)
          .fontSize(16)
          .fontWeight(FontWeight.Bold)
          .fontColor('#1976D2')
          .margin({ bottom: 8 })
        
        Text(DAILY_KNOWLEDGE[this.dailyKnowledgeIndex].content)
          .fontSize(14)
          .fontColor('#333333')
          .lineHeight(22)
      }
      .width('100%')
      .alignItems(HorizontalAlign.Start)
    }
  }
  
  // 构建赛事日历
  @Builder
  buildCompetitionCalendar() {
    IceCard({
      title: '📅 近期赛事',
      onCardClick: () => {
        router.pushUrl({ url: 'pages/CompetitionCenterPage' });
      }
    }) {
      Column() {
        this.CalendarItem('3月18日', '世界锦标赛', '蒙特利尔', '即将开始');
        this.CalendarItem('4月12日', '世界团体杯', '东京', '即将开始');
        this.CalendarItem('10月20日', '大奖赛美国站', '普莱西德湖', '预告');
      }
      .width('100%')
    }
  }
  
  @Builder
  CalendarItem(date: string, name: string, location: string, status: string) {
    Row() {
      Column() {
        Text(date.split('月')[1].replace('日', ''))
          .fontSize(20)
          .fontWeight(FontWeight.Bold)
          .fontColor('#1976D2')
        
        Text(date.split('月')[0] + '月')
          .fontSize(12)
          .fontColor('#666666')
      }
      .width(50)
      
      Column() {
        Text(name)
          .fontSize(14)
          .fontWeight(FontWeight.Bold)
          .fontColor('#333333')
        
        Text(location)
          .fontSize(12)
          .fontColor('#999999')
          .margin({ top: 4 })
      }
      .layoutWeight(1)
      .alignItems(HorizontalAlign.Start)
      .margin({ left: 12 })
      
      IceTag({ text: status, type: status === '即将开始' ? 'warning' : 'default', tagSize: 'small' })
    }
    .width('100%')
    .padding({ top: 8, bottom: 8 })
  }
  
  // 构建快速入口
  @Builder
  buildQuickEntries() {
    Column() {
      Text('快速入口')
        .fontSize(16)
        .fontWeight(FontWeight.Bold)
        .fontColor('#333333')
        .margin({ bottom: 12 })
      
      GridRow({
        columns: { sm: 2, md: 4, lg: 4 },
        gutter: 12
      }) {
        ForEach(this.quickEntries, (entry: QuickEntry) => {
          GridCol({ span: 1 }) {
            Column() {
              Text(entry.icon)
                .fontSize(40)
                .margin({ bottom: 8 })
              
              Text(entry.title)
                .fontSize(14)
                .fontWeight(FontWeight.Bold)
                .fontColor('#333333')
              
              Text(entry.subtitle)
                .fontSize(12)
                .fontColor('#999999')
                .margin({ top: 4 })
            }
            .width('100%')
            .height(120)
            .backgroundColor('#FFFFFF')
            .borderRadius(12)
            .justifyContent(FlexAlign.Center)
            .shadow({
              radius: 8,
              color: '#1A000000',
              offsetX: 0,
              offsetY: 2
            })
            .onClick(() => {
              router.pushUrl({ url: entry.route });
            })
          }
        }, (entry: QuickEntry) => entry.title)
      }
    }
    .width('100%')
    .padding(16)
    .margin({ top: 16 })
  }
}

// 数据类型定义
interface BannerItem {
  title: string;
  subtitle: string;
  type: string;
}

interface QuickEntry {
  icon: string;
  title: string;
  subtitle: string;
  route: string;
}

interface NavMenu {
  title: string;
  icon: string;
  route: string;
}
