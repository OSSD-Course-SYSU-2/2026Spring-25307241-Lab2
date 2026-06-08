/**
 * 冰迹花滑 - 打分解读工具
 * 上传截图、自动拆解分数、解读打分
 */

import router from '@ohos.router';
import { IceNavBar } from '../common/components/IceNavBar';
import { IceCard } from '../common/components/IceCard';
import { IceTag } from '../common/components/IceTag';

@Entry
@Component
struct ScoreInterpreterPage {
  @State totalScore: string = '';
  @State tesScore: string = '';
  @State pcsScore: string = '';
  @State deductions: string = '0';
  @State showResult: boolean = false;
  
  // 示例数据
  private exampleScores: ExampleScore[] = [
    {
      skater: '羽生结弦',
      competition: '2019大奖赛总决赛',
      segment: 'FS',
      totalScore: 195.71,
      tes: 106.02,
      pcs: 90.69,
      deductions: -1.00,
      elements: [
        { name: '4T', baseValue: 9.50, goe: 2.85, finalValue: 12.35, quality: 'excellent' },
        { name: '4T+3T', baseValue: 13.50, goe: 3.80, finalValue: 17.30, quality: 'excellent' },
        { name: '3A', baseValue: 8.00, goe: 2.40, finalValue: 10.40, quality: 'good' },
        { name: '3F+3Lo', baseValue: 10.00, goe: 2.50, finalValue: 12.50, quality: 'good' }
      ],
      components: [
        { name: '滑行技术', score: 9.25 },
        { name: '动作衔接', score: 9.00 },
        { name: '表演表现', score: 9.25 },
        { name: '编排构图', score: 9.00 },
        { name: '音乐诠释', score: 9.25 }
      ]
    }
  ];
  
  build() {
    Column() {
      // 导航栏
      IceNavBar({
        title: '打分解读',
        showBack: true,
        navBackgroundColor: '#E91E63'
      });
      
      // 内容区
      Scroll() {
        Column() {
          // 介绍横幅
          this.buildIntroBanner();
          
          // 输入区域
          this.buildInputArea();
          
          // 示例数据
          this.buildExampleData();
          
          // 评分知识
          this.buildScoringKnowledge();
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
      Text('📊 打分解读工具')
        .fontSize(24)
        .fontWeight(FontWeight.Bold)
        .fontColor('#FFFFFF')
        .margin({ bottom: 8 })
      
      Text('输入分数，自动拆解技术分与内容分')
        .fontSize(14)
        .fontColor('rgba(255,255,255,0.8)')
    }
    .width('100%')
    .height(150)
    .justifyContent(FlexAlign.Center)
    .linearGradient({
      angle: 135,
      colors: [['#E91E63', 0.0], ['#C2185B', 1.0]]
    })
    .borderRadius(16)
    .margin({ bottom: 20 })
  }
  
  // 输入区域
  @Builder
  buildInputArea() {
    IceCard({
      title: '✏️ 输入分数'
    }) {
      Column() {
        // 总分输入
        Row() {
          Text('总分')
            .fontSize(14)
            .fontColor('#333333')
            .width(80)
          
          TextInput({ placeholder: '请输入总分', text: this.totalScore })
            .fontSize(14)
            .layoutWeight(1)
            .height(40)
            .backgroundColor('#F5F5F5')
            .borderRadius(8)
            .onChange((value: string) => {
              this.totalScore = value;
            })
        }
        .width('100%')
        .margin({ bottom: 16 })
        
        // 技术分输入
        Row() {
          Text('技术分TES')
            .fontSize(14)
            .fontColor('#333333')
            .width(80)
          
          TextInput({ placeholder: '请输入技术分', text: this.tesScore })
            .fontSize(14)
            .layoutWeight(1)
            .height(40)
            .backgroundColor('#F5F5F5')
            .borderRadius(8)
            .onChange((value: string) => {
              this.tesScore = value;
            })
        }
        .width('100%')
        .margin({ bottom: 16 })
        
        // 内容分输入
        Row() {
          Text('内容分PCS')
            .fontSize(14)
            .fontColor('#333333')
            .width(80)
          
          TextInput({ placeholder: '请输入内容分', text: this.pcsScore })
            .fontSize(14)
            .layoutWeight(1)
            .height(40)
            .backgroundColor('#F5F5F5')
            .borderRadius(8)
            .onChange((value: string) => {
              this.pcsScore = value;
            })
        }
        .width('100%')
        .margin({ bottom: 16 })
        
        // 扣分输入
        Row() {
          Text('扣分')
            .fontSize(14)
            .fontColor('#333333')
            .width(80)
          
          TextInput({ placeholder: '请输入扣分（默认0）', text: this.deductions })
            .fontSize(14)
            .layoutWeight(1)
            .height(40)
            .backgroundColor('#F5F5F5')
            .borderRadius(8)
            .onChange((value: string) => {
              this.deductions = value;
            })
        }
        .width('100%')
        .margin({ bottom: 20 })
        
        // 解析按钮
        Button('🔍 解析分数')
          .width('100%')
          .height(48)
          .fontSize(16)
          .fontWeight(FontWeight.Bold)
          .backgroundColor('#E91E63')
          .fontColor('#FFFFFF')
          .borderRadius(24)
          .onClick(() => {
            this.showResult = true;
          })
        
        // 解析结果
        if (this.showResult && this.tesScore && this.pcsScore) {
          this.buildScoreResult();
        }
      }
      .width('100%')
    }
  }
  
  // 解析结果
  @Builder
  buildScoreResult() {
    Column() {
      Divider()
        .color('#E0E0E0')
        .margin({ top: 20, bottom: 20 })
      
      Text('📊 分数解析')
        .fontSize(18)
        .fontWeight(FontWeight.Bold)
        .fontColor('#333333')
        .margin({ bottom: 16 })
      
      // 分数构成
      Row() {
        Column() {
          Text('技术分TES')
            .fontSize(14)
            .fontColor('#666666')
            .margin({ bottom: 4 })
          
          Text(this.tesScore)
            .fontSize(24)
            .fontWeight(FontWeight.Bold)
            .fontColor('#E91E63')
        }
        .layoutWeight(1)
        
        Text('+')
          .fontSize(20)
          .fontColor('#999999')
        
        Column() {
          Text('内容分PCS')
            .fontSize(14)
            .fontColor('#666666')
            .margin({ bottom: 4 })
          
          Text(this.pcsScore)
            .fontSize(24)
            .fontWeight(FontWeight.Bold)
            .fontColor('#9C27B0')
        }
        .layoutWeight(1)
        .margin({ left: 16, right: 16 })
        
        if (parseFloat(this.deductions) !== 0) {
          Text('-')
            .fontSize(20)
            .fontColor('#999999')
          
          Column() {
            Text('扣分')
              .fontSize(14)
              .fontColor('#666666')
              .margin({ bottom: 4 })
            
            Text(Math.abs(parseFloat(this.deductions)).toFixed(2))
              .fontSize(24)
              .fontWeight(FontWeight.Bold)
              .fontColor('#F44336')
          }
          .layoutWeight(1)
        }
      }
      .width('100%')
      .margin({ bottom: 20 })
      
      // 解读
      Column() {
        Text('💡 解读')
          .fontSize(16)
          .fontWeight(FontWeight.Bold)
          .fontColor('#333333')
          .margin({ bottom: 12 })
        
        this.InterpretationItem('技术分占比', 
          (parseFloat(this.tesScore) / (parseFloat(this.tesScore) + parseFloat(this.pcsScore)) * 100).toFixed(1) + '%',
          '技术分占比越高，说明跳跃、旋转等难度动作得分越高');
        
        this.InterpretationItem('内容分占比', 
          (parseFloat(this.pcsScore) / (parseFloat(this.tesScore) + parseFloat(this.pcsScore)) * 100).toFixed(1) + '%',
          '内容分占比越高，说明滑行、表演、编排等艺术表现得分越高');
        
        if (parseFloat(this.deductions) !== 0) {
          this.InterpretationItem('扣分原因', 
            Math.abs(parseFloat(this.deductions)).toFixed(2) + '分',
            '可能包括摔倒、超时、违规等扣分项');
        }
      }
      .width('100%')
      .alignItems(HorizontalAlign.Start)
    }
    .width('100%')
    .padding(16)
    .backgroundColor('#FCE4EC')
    .borderRadius(12)
    .margin({ top: 16 })
  }
  
  @Builder
  InterpretationItem(title: string, value: string, description: string) {
    Row() {
      Column() {
        Text(title)
          .fontSize(14)
          .fontWeight(FontWeight.Bold)
          .fontColor('#333333')
        
        Text(description)
          .fontSize(12)
          .fontColor('#666666')
          .margin({ top: 4 })
      }
      .alignItems(HorizontalAlign.Start)
      .layoutWeight(1)
      
      Text(value)
        .fontSize(16)
        .fontWeight(FontWeight.Bold)
        .fontColor('#E91E63')
    }
    .width('100%')
    .padding({ top: 8, bottom: 8 })
  }
  
  // 示例数据
  @Builder
  buildExampleData() {
    Column() {
      Text('📋 示例数据')
        .fontSize(18)
        .fontWeight(FontWeight.Bold)
        .fontColor('#333333')
        .margin({ bottom: 16 })
      
      ForEach(this.exampleScores, (example: ExampleScore) => {
        this.ExampleCard(example);
      }, (example: ExampleScore) => example.skater + example.competition)
    }
    .width('100%')
    .alignItems(HorizontalAlign.Start)
    .margin({ top: 24 })
  }
  
  @Builder
  ExampleCard(example: ExampleScore) {
    Column() {
      // 选手信息
      Row() {
        Column() {
          Text(example.skater)
            .fontSize(16)
            .fontWeight(FontWeight.Bold)
            .fontColor('#333333')
          
          Text(example.competition + ' - ' + (example.segment === 'SP' ? '短节目' : '自由滑'))
            .fontSize(12)
            .fontColor('#999999')
            .margin({ top: 4 })
        }
        .alignItems(HorizontalAlign.Start)
        .layoutWeight(1)
        
        Text(example.totalScore.toFixed(2))
          .fontSize(24)
          .fontWeight(FontWeight.Bold)
          .fontColor('#E91E63')
      }
      .width('100%')
      .margin({ bottom: 16 })
      
      // 分数构成
      Row() {
        Column() {
          Text('技术分TES')
            .fontSize(12)
            .fontColor('#666666')
          
          Text(example.tes.toFixed(2))
            .fontSize(18)
            .fontWeight(FontWeight.Bold)
            .fontColor('#E91E63')
            .margin({ top: 4 })
        }
        .layoutWeight(1)
        
        Column() {
          Text('内容分PCS')
            .fontSize(12)
            .fontColor('#666666')
          
          Text(example.pcs.toFixed(2))
            .fontSize(18)
            .fontWeight(FontWeight.Bold)
            .fontColor('#9C27B0')
            .margin({ top: 4 })
        }
        .layoutWeight(1)
        
        Column() {
          Text('扣分')
            .fontSize(12)
            .fontColor('#666666')
          
          Text(Math.abs(example.deductions).toFixed(2))
            .fontSize(18)
            .fontWeight(FontWeight.Bold)
            .fontColor('#F44336')
            .margin({ top: 4 })
        }
        .layoutWeight(1)
      }
      .width('100%')
      .margin({ bottom: 16 })
      
      // 技术动作
      Column() {
        Text('技术动作')
          .fontSize(14)
          .fontWeight(FontWeight.Bold)
          .fontColor('#333333')
          .margin({ bottom: 8 })
        
        ForEach(example.elements.slice(0, 3), (element: ElementScore) => {
          Row() {
            Text(element.name)
              .fontSize(14)
              .fontColor('#333333')
              .width(60)
            
            Text('基础: ' + element.baseValue.toFixed(2))
              .fontSize(12)
              .fontColor('#666666')
              .layoutWeight(1)
            
            Text('GOE: ' + (element.goe >= 0 ? '+' : '') + element.goe.toFixed(2))
              .fontSize(12)
              .fontColor(element.goe >= 0 ? '#4CAF50' : '#F44336')
              .width(70)
            
            Text(element.finalValue.toFixed(2))
              .fontSize(14)
              .fontWeight(FontWeight.Bold)
              .fontColor('#E91E63')
              .width(50)
          }
          .width('100%')
          .padding({ top: 4, bottom: 4 })
        }, (element: ElementScore) => element.name)
      }
      .width('100%')
      .alignItems(HorizontalAlign.Start)
      .padding(12)
      .backgroundColor('#F5F5F5')
      .borderRadius(8)
      .margin({ bottom: 12 })
      
      // 节目内容分
      Column() {
        Text('节目内容分')
          .fontSize(14)
          .fontWeight(FontWeight.Bold)
          .fontColor('#333333')
          .margin({ bottom: 8 })
        
        ForEach(example.components, (component: ComponentScore) => {
          Row() {
            Text(component.name)
              .fontSize(14)
              .fontColor('#333333')
              .layoutWeight(1)
            
            Text(component.score.toFixed(2))
              .fontSize(14)
              .fontWeight(FontWeight.Bold)
              .fontColor('#9C27B0')
          }
          .width('100%')
          .padding({ top: 4, bottom: 4 })
        }, (component: ComponentScore) => component.name)
      }
      .width('100%')
      .alignItems(HorizontalAlign.Start)
      .padding(12)
      .backgroundColor('#F3E5F5')
      .borderRadius(8)
    }
    .width('100%')
    .padding(16)
    .backgroundColor('#FFFFFF')
    .borderRadius(12)
    .shadow({
      radius: 8,
      color: '#1A000000',
      offsetX: 0,
      offsetY: 2
    })
    .margin({ bottom: 16 })
  }
  
  // 评分知识
  @Builder
  buildScoringKnowledge() {
    IceCard({
      title: '📚 评分知识',
      cardBackgroundColor: '#E8EAF6'
    }) {
      Column() {
        this.KnowledgeItem('技术分TES', '跳跃、旋转、步法等动作的基础分值 + GOE加分');
        this.KnowledgeItem('GOE加分', 'Grade of Execution，根据动作质量给予-5到+5的加分');
        this.KnowledgeItem('内容分PCS', 'Program Component Score，包含5项评分指标');
        this.KnowledgeItem('PCS五项', '滑行技术、动作衔接、表演表现、编排构图、音乐诠释');
        this.KnowledgeItem('扣分项', '摔倒(-1)、超时(-1)、违规动作等');
      }
      .width('100%')
    }
  }
  
  @Builder
  KnowledgeItem(title: string, description: string) {
    Row() {
      Column() {
        Text(title)
          .fontSize(14)
          .fontWeight(FontWeight.Bold)
          .fontColor('#333333')
        
        Text(description)
          .fontSize(12)
          .fontColor('#666666')
          .margin({ top: 4 })
      }
      .alignItems(HorizontalAlign.Start)
      .layoutWeight(1)
    }
    .width('100%')
    .padding({ top: 8, bottom: 8 })
  }
}

// 数据类型定义
interface ExampleScore {
  skater: string;
  competition: string;
  segment: 'SP' | 'FS';
  totalScore: number;
  tes: number;
  pcs: number;
  deductions: number;
  elements: ElementScore[];
  components: ComponentScore[];
}

interface ElementScore {
  name: string;
  baseValue: number;
  goe: number;
  finalValue: number;
  quality: string;
}

interface ComponentScore {
  name: string;
  score: number;
}
