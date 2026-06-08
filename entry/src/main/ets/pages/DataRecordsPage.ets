/**
 * 冰迹花滑 - 数据纪录
 * 展示历史最高分、赛季最佳、各项纪录
 */

import { IceNavBar } from '../common/components/IceNavBar';
import { IceCard } from '../common/components/IceCard';
import { IceTag } from '../common/components/IceTag';

@Entry
@Component
struct DataRecordsPage {
  @State selectedCategory: string = 'score'; // score, element, medal
  @State selectedDiscipline: string = 'MEN'; // MEN, LADIES, PAIRS, ICE_DANCE
  
  // 纪录数据
  private scoreRecords: RecordRecord[] = [
    { category: '总分', discipline: 'MEN', skater: '陈巍', country: 'USA', score: 332.60, competition: '2023世锦赛', date: '2023-03-25' },
    { category: '总分', discipline: 'LADIES', skater: '谢尔巴科娃', country: 'RUS', score: 255.95, competition: '2021世锦赛', date: '2021-03-26' },
    { category: '技术分', discipline: 'MEN', skater: '陈巍', country: 'USA', score: 127.64, competition: '2023世锦赛', date: '2023-03-25' },
    { category: '内容分', discipline: 'MEN', skater: '羽生结弦', country: 'JPN', score: 98.58, competition: '2020四大洲', date: '2020-02-08' }
  ];
  
  private elementRecords: ElementRecord[] = [
    { element: '4Lz', name: '四周鲁兹', skater: '陈巍', country: 'USA', baseValue: 11.50, goe: '+5', finalScore: 17.25 },
    { element: '4A', name: '四周阿克塞尔', skater: '羽生结弦', country: 'JPN', baseValue: 12.50, goe: '+2', finalScore: 15.00 },
    { element: '3A', name: '三周阿克塞尔', skater: '纪平梨花', country: 'JPN', baseValue: 8.00, goe: '+4', finalScore: 12.00 }
  ];
  
  private medalRecords: MedalRecord[] = [
    { country: 'RUS', gold: 24, silver: 18, bronze: 12, total: 54 },
    { country: 'USA', gold: 15, silver: 20, bronze: 16, total: 51 },
    { country: 'JPN', gold: 12, silver: 15, bronze: 18, total: 45 },
    { country: 'CAN', gold: 10, silver: 12, bronze: 14, total: 36 }
  ];
  
  build() {
    Column() {
      // 导航栏
      IceNavBar({
        title: '数据纪录',
        showBack: true,
        navBackgroundColor: '#4FC3F7'
      });
      
      // 内容区
      Column() {
        // 分类选择
        this.buildCategoryTabs();
        
        // 内容区域
        Scroll() {
          Column() {
            if (this.selectedCategory === 'score') {
              this.buildScoreRecords();
            } else if (this.selectedCategory === 'element') {
              this.buildElementRecords();
            } else {
              this.buildMedalRecords();
            }
          }
          .width('100%')
          .padding(16)
        }
        .layoutWeight(1)
        .scrollBar(BarState.Auto)
      }
      .layoutWeight(1)
    }
    .width('100%')
    .height('100%')
    .backgroundColor('#F5F5F5')
  }
  
  // 分类标签
  @Builder
  buildCategoryTabs() {
    Row() {
      this.CategoryTab('分数纪录', 'score', '📊');
      this.CategoryTab('动作纪录', 'element', '⛸️');
      this.CategoryTab('奖牌榜', 'medal', '🏆');
    }
    .width('100%')
    .padding({ left: 16, right: 16, top: 12, bottom: 12 })
    .justifyContent(FlexAlign.SpaceEvenly)
  }
  
  @Builder
  CategoryTab(title: string, category: string, icon: string) {
    Column() {
      Text(icon)
        .fontSize(24)
      Text(title)
        .fontSize(12)
        .fontColor(this.selectedCategory === category ? '#4FC3F7' : '#666666')
        .margin({ top: 4 })
    }
    .width(100)
    .height(70)
    .backgroundColor(this.selectedCategory === category ? '#E3F2FD' : '#FFFFFF')
    .borderRadius(12)
    .justifyContent(FlexAlign.Center)
    .onClick(() => {
      this.selectedCategory = category;
    })
  }
  
  // 分数纪录
  @Builder
  buildScoreRecords() {
    Column() {
      Text('历史最高分纪录')
        .fontSize(18)
        .fontWeight(FontWeight.Bold)
        .fontColor('#333333')
        .margin({ bottom: 16 })
      
      ForEach(this.scoreRecords, (record: RecordRecord) => {
        this.RecordCard(record);
      }, (record: RecordRecord) => record.category + record.discipline)
    }
    .width('100%')
    .alignItems(HorizontalAlign.Start)
  }
  
  @Builder
  RecordCard(record: RecordRecord) {
    Column() {
      Row() {
        Column() {
          Text(record.category)
            .fontSize(14)
            .fontWeight(FontWeight.Bold)
            .fontColor('#4FC3F7')
          
          Text(this.getDisciplineName(record.discipline))
            .fontSize(12)
            .fontColor('#999999')
            .margin({ top: 4 })
        }
        .alignItems(HorizontalAlign.Start)
        .layoutWeight(1)
        
        Column() {
          Text(record.score.toFixed(2))
            .fontSize(24)
            .fontWeight(FontWeight.Bold)
            .fontColor('#FF6B6B')
        }
        .alignItems(HorizontalAlign.End)
      }
      .width('100%')
      .margin({ bottom: 12 })
      
      Row() {
        Text(record.skater)
          .fontSize(14)
          .fontColor('#333333')
        
        Text('(' + record.country + ')')
          .fontSize(12)
          .fontColor('#999999')
          .margin({ left: 4 })
        
        Blank()
        
        Text(record.competition)
          .fontSize(12)
          .fontColor('#666666')
      }
      .width('100%')
    }
    .width('100%')
    .padding(16)
    .backgroundColor('#FFFFFF')
    .borderRadius(12)
    .margin({ bottom: 12 })
  }
  
  // 动作纪录
  @Builder
  buildElementRecords() {
    Column() {
      Text('跳跃动作最高分')
        .fontSize(18)
        .fontWeight(FontWeight.Bold)
        .fontColor('#333333')
        .margin({ bottom: 16 })
      
      ForEach(this.elementRecords, (record: ElementRecord) => {
        this.ElementCard(record);
      }, (record: ElementRecord) => record.element)
    }
    .width('100%')
    .alignItems(HorizontalAlign.Start)
  }
  
  @Builder
  ElementCard(record: ElementRecord) {
    Column() {
      Row() {
        Column() {
          Text(record.element)
            .fontSize(20)
            .fontWeight(FontWeight.Bold)
            .fontColor('#4FC3F7')
          
          Text(record.name)
            .fontSize(12)
            .fontColor('#999999')
            .margin({ top: 4 })
        }
        .alignItems(HorizontalAlign.Start)
        
        Blank()
        
        Column() {
          Text(record.finalScore.toFixed(2))
            .fontSize(24)
            .fontWeight(FontWeight.Bold)
            .fontColor('#FF6B6B')
          
          Text('基础分: ' + record.baseValue.toFixed(2))
            .fontSize(12)
            .fontColor('#999999')
            .margin({ top: 4 })
        }
        .alignItems(HorizontalAlign.End)
      }
      .width('100%')
      .margin({ bottom: 12 })
      
      Row() {
        Text(record.skater)
          .fontSize(14)
          .fontColor('#333333')
        
        Text('(' + record.country + ')')
          .fontSize(12)
          .fontColor('#999999')
          .margin({ left: 4 })
        
        Blank()
        
        IceTag({ text: 'GOE ' + record.goe, type: 'success', tagSize: 'small' })
      }
      .width('100%')
    }
    .width('100%')
    .padding(16)
    .backgroundColor('#FFFFFF')
    .borderRadius(12)
    .margin({ bottom: 12 })
  }
  
  // 奖牌榜
  @Builder
  buildMedalRecords() {
    Column() {
      Text('世锦赛奖牌榜 (历史总计)')
        .fontSize(18)
        .fontWeight(FontWeight.Bold)
        .fontColor('#333333')
        .margin({ bottom: 16 })
      
      ForEach(this.medalRecords, (record: MedalRecord, index: number) => {
        this.MedalCard(record, index + 1);
      }, (record: MedalRecord) => record.country)
    }
    .width('100%')
    .alignItems(HorizontalAlign.Start)
  }
  
  @Builder
  MedalCard(record: MedalRecord, rank: number) {
    Row() {
      Text(rank.toString())
        .fontSize(20)
        .fontWeight(FontWeight.Bold)
        .fontColor('#4FC3F7')
        .width(40)
      
      Text(record.country)
        .fontSize(16)
        .fontWeight(FontWeight.Bold)
        .fontColor('#333333')
        .layoutWeight(1)
      
      Row() {
        Text('🥇' + record.gold)
          .fontSize(14)
          .fontColor('#FFD700')
          .margin({ right: 12 })
        
        Text('🥈' + record.silver)
          .fontSize(14)
          .fontColor('#C0C0C0')
          .margin({ right: 12 })
        
        Text('🥉' + record.bronze)
          .fontSize(14)
          .fontColor('#CD7F32')
      }
    }
    .width('100%')
    .padding(16)
    .backgroundColor('#FFFFFF')
    .borderRadius(12)
    .margin({ bottom: 12 })
  }
  
  private getDisciplineName(discipline: string): string {
    const names: Record<string, string> = {
      'MEN': '男子单人滑',
      'LADIES': '女子单人滑',
      'PAIRS': '双人滑',
      'ICE_DANCE': '冰上舞蹈'
    };
    return names[discipline] || discipline;
  }
}

// 数据类型
interface RecordRecord {
  category: string;
  discipline: string;
  skater: string;
  country: string;
  score: number;
  competition: string;
  date: string;
}

interface ElementRecord {
  element: string;
  name: string;
  skater: string;
  country: string;
  baseValue: number;
  goe: string;
  finalScore: number;
}

interface MedalRecord {
  country: string;
  gold: number;
  silver: number;
  bronze: number;
  total: number;
}
