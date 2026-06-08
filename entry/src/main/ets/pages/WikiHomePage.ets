/**
 * 冰迹花滑 - 花滑科普首页
 * 系统化讲解花滑知识，面向零基础用户
 */

import router from '@ohos.router';
import { IceNavBar } from '../common/components/IceNavBar';
import { IceCard } from '../common/components/IceCard';

@Entry
@Component
struct WikiHomePage {
  @State selectedCategory: string = 'basics'; // basics, elements, rules, history
  
  // 科普模块
  private wikiModules: WikiModule[] = [
    { 
      id: 'discipline',
      icon: '⛸️',
      title: '项目分类',
      subtitle: '了解四大项目区别',
      description: '男单、女单、双人滑、冰舞的区别与特点',
      route: 'pages/WikiDisciplinePage',
      color: '#4FC3F7'
    },
    { 
      id: 'elements',
      icon: '🔄',
      title: '动作图鉴',
      subtitle: '可视化学习动作',
      description: '跳跃、旋转、步法、托举全解析',
      route: 'pages/MoveGalleryPage',
      color: '#66BB6A'
    },
    { 
      id: 'glossary',
      icon: '📖',
      title: '术语词典',
      subtitle: '专业词汇查询',
      description: 'GOE、PCS、TES等术语详解',
      route: 'pages/GlossaryPage',
      color: '#FFA726'
    },
    { 
      id: 'program',
      icon: '🎵',
      title: '节目科普',
      subtitle: '短节目与自由滑',
      description: '节目规则、时长、编排要求',
      route: 'pages/WikiProgramPage',
      color: '#AB47BC'
    }
  ];
  
  // 入门指南
  private guides: Guide[] = [
    { title: '新手观赛指南', icon: '👀', description: '如何看懂一场比赛' },
    { title: '评分系统入门', icon: '📊', description: 'ISU评分规则详解' },
    { title: '装备与礼仪', icon: '👔', description: '服装、冰刀、观赛礼仪' },
    { title: '赛事等级说明', icon: '🏆', description: '各大赛事级别划分' }
  ];
  
  build() {
    Column() {
      // 导航栏
      IceNavBar({
        title: '花滑科普',
        showBack: true,
        navBackgroundColor: '#4FC3F7'
      });
      
      // 内容区
      Scroll() {
        Column() {
          // 欢迎横幅
          this.buildWelcomeBanner();
          
          // 核心科普模块
          this.buildWikiModules();
          
          // 入门指南
          this.buildGuides();
          
          // 推荐学习路径
          this.buildLearningPath();
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
  
  // 欢迎横幅
  @Builder
  buildWelcomeBanner() {
    Column() {
      Text('欢迎来到花滑世界')
        .fontSize(24)
        .fontWeight(FontWeight.Bold)
        .fontColor('#FFFFFF')
        .margin({ bottom: 8 })
      
      Text('从零开始，轻松入门花样滑冰')
        .fontSize(14)
        .fontColor('rgba(255,255,255,0.8)')
    }
    .width('100%')
    .height(150)
    .justifyContent(FlexAlign.Center)
    .linearGradient({
      angle: 135,
      colors: [['#4FC3F7', 0.0], ['#1976D2', 1.0]]
    })
    .borderRadius(16)
    .margin({ bottom: 20 })
  }
  
  // 核心科普模块
  @Builder
  buildWikiModules() {
    Column() {
      Text('核心科普模块')
        .fontSize(18)
        .fontWeight(FontWeight.Bold)
        .fontColor('#333333')
        .margin({ bottom: 16 })
      
      GridRow({
        columns: { sm: 1, md: 2, lg: 2 },
        gutter: 16
      }) {
        ForEach(this.wikiModules, (module: WikiModule) => {
          GridCol({ span: 1 }) {
            this.WikiModuleCard(module);
          }
        }, (module: WikiModule) => module.id)
      }
    }
    .width('100%')
    .alignItems(HorizontalAlign.Start)
    .margin({ bottom: 24 })
  }
  
  @Builder
  WikiModuleCard(module: WikiModule) {
    Column() {
      Row() {
        Text(module.icon)
          .fontSize(40)
          .margin({ right: 16 })
        
        Column() {
          Text(module.title)
            .fontSize(16)
            .fontWeight(FontWeight.Bold)
            .fontColor('#333333')
          
          Text(module.subtitle)
            .fontSize(12)
            .fontColor('#999999')
            .margin({ top: 4 })
        }
        .alignItems(HorizontalAlign.Start)
        .layoutWeight(1)
      }
      .width('100%')
      .margin({ bottom: 12 })
      
      Text(module.description)
        .fontSize(14)
        .fontColor('#666666')
        .lineHeight(22)
    }
    .width('100%')
    .padding(20)
    .backgroundColor('#FFFFFF')
    .borderRadius(12)
    .shadow({
      radius: 8,
      color: '#1A000000',
      offsetX: 0,
      offsetY: 2
    })
    .onClick(() => {
      router.pushUrl({ url: module.route });
    })
  }
  
  // 入门指南
  @Builder
  buildGuides() {
    Column() {
      Text('入门指南')
        .fontSize(18)
        .fontWeight(FontWeight.Bold)
        .fontColor('#333333')
        .margin({ bottom: 16 })
      
      Column() {
        ForEach(this.guides, (guide: Guide) => {
          this.GuideItem(guide);
        }, (guide: Guide) => guide.title)
      }
    }
    .width('100%')
    .alignItems(HorizontalAlign.Start)
    .margin({ bottom: 24 })
  }
  
  @Builder
  GuideItem(guide: Guide) {
    Row() {
      Text(guide.icon)
        .fontSize(32)
        .margin({ right: 16 })
      
      Column() {
        Text(guide.title)
          .fontSize(16)
          .fontWeight(FontWeight.Bold)
          .fontColor('#333333')
        
        Text(guide.description)
          .fontSize(12)
          .fontColor('#999999')
          .margin({ top: 4 })
      }
      .alignItems(HorizontalAlign.Start)
      .layoutWeight(1)
      
      Text('›')
        .fontSize(20)
        .fontColor('#999999')
    }
    .width('100%')
    .padding(16)
    .backgroundColor('#FFFFFF')
    .borderRadius(12)
    .margin({ bottom: 12 })
    .onClick(() => {
      // 导航到具体指南页面
    })
  }
  
  // 推荐学习路径
  @Builder
  buildLearningPath() {
    Column() {
      Text('推荐学习路径')
        .fontSize(18)
        .fontWeight(FontWeight.Bold)
        .fontColor('#333333')
        .margin({ bottom: 16 })
      
      Column() {
        this.PathStep('1', '了解项目分类', '认识四大项目的区别');
        this.PathStep('2', '学习基础动作', '掌握跳跃、旋转等基本概念');
        this.PathStep('3', '理解评分系统', '学习ISU评分规则');
        this.PathStep('4', '观看经典节目', '在实践中巩固知识');
      }
    }
    .width('100%')
    .alignItems(HorizontalAlign.Start)
  }
  
  @Builder
  PathStep(step: string, title: string, description: string) {
    Row() {
      Column() {
        Text(step)
          .fontSize(18)
          .fontWeight(FontWeight.Bold)
          .fontColor('#FFFFFF')
      }
      .width(40)
      .height(40)
      .backgroundColor('#4FC3F7')
      .borderRadius(20)
      .justifyContent(FlexAlign.Center)
      .margin({ right: 16 })
      
      Column() {
        Text(title)
          .fontSize(16)
          .fontWeight(FontWeight.Bold)
          .fontColor('#333333')
        
        Text(description)
          .fontSize(12)
          .fontColor('#999999')
          .margin({ top: 4 })
      }
      .alignItems(HorizontalAlign.Start)
      .layoutWeight(1)
    }
    .width('100%')
    .padding({ top: 8, bottom: 8 })
  }
}

// 数据类型
interface WikiModule {
  id: string;
  icon: string;
  title: string;
  subtitle: string;
  description: string;
  route: string;
  color: string;
}

interface Guide {
  title: string;
  icon: string;
  description: string;
}
