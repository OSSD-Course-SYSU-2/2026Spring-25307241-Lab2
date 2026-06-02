/*
 * 花样滑冰技术元素计算器
 * Copyright (c) 2024
 */

import router from '@ohos.router';
import {
  TechnicalElement, ElementType, GOE_RANGE,
  getAllJumps, getAllSpins, getAllSteps,
  createTechnicalElement, getElementChineseName
} from '../viewmodel/TechnicalElementModel';

@Entry
@Component
struct HomePage {
  @State selectedCategory: string = 'jump'; // jump, spin, step
  @State selectedElement: string = '';
  @State selectedGOE: number = 0;
  @State currentElement: TechnicalElement | null = null;
  @State elementList: TechnicalElement[] = [];
  @State totalScore: number = 0;
  
  private jumps: string[] = getAllJumps();
  private spins: string[] = getAllSpins();
  private steps: string[] = getAllSteps();
  
  build() {
    Column() {
      // 顶部导航栏
      Row() {
        Button() {
          Text('←')
            .fontSize(24)
            .fontColor(Color.White)
        }
        .width(40)
        .height(40)
        .backgroundColor('rgba(255,255,255,0.2)')
        .borderRadius(20)
        .onClick(() => {
          router.back();
        })
        
        Blank().layoutWeight(1)
        
        Text('⛸️ 技术元素计算器')
          .fontSize(20)
          .fontColor(Color.White)
          .fontWeight(FontWeight.Bold)
        
        Blank().layoutWeight(1)
        
        Blank().width(40)
      }
      .width('100%')
      .height(80)
      .padding({ left: 20, right: 20 })
      
      Scroll() {
        Column() {
          // 分类选择
          this.buildCategorySelector()
          
          // 元素选择
          this.buildElementSelector()
          
          // GOE选择
          this.buildGOESelector()
          
          // 当前元素信息
          this.buildCurrentElementInfo()
          
          // 添加按钮
          this.buildAddButton()
          
          // 已添加元素列表
          this.buildElementList()
          
          // 总分显示
          this.buildTotalScore()
        }
        .width('100%')
        .padding(20)
      }
      .layoutWeight(1)
      .scrollBar(BarState.Auto)
      .edgeEffect(EdgeEffect.Spring)
    }
    .width('100%')
    .height('100%')
    .linearGradient({
      angle: 135,
      colors: [['#667eea', 0.0], ['#764ba2', 1.0]]
    })
  }
  
  // 分类选择器
  @Builder
  buildCategorySelector() {
    Column() {
      Text('选择元素类型')
        .fontSize(16)
        .fontColor(Color.White)
        .fontWeight(FontWeight.Bold)
        .margin({ bottom: 15 })
      
      Row() {
        this.buildCategoryButton('跳跃', 'jump', '🦘')
        this.buildCategoryButton('旋转', 'spin', '🔄')
        this.buildCategoryButton('步法', 'step', '👟')
      }
      .width('100%')
      .justifyContent(FlexAlign.SpaceEvenly)
    }
    .width('100%')
    .margin({ bottom: 25 })
  }
  
  @Builder
  buildCategoryButton(name: string, category: string, icon: string) {
    Column() {
      Text(icon)
        .fontSize(30)
      Text(name)
        .fontSize(14)
        .fontColor(Color.White)
        .margin({ top: 5 })
    }
    .width(80)
    .height(80)
    .backgroundColor(this.selectedCategory === category ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.1)')
    .borderRadius(15)
    .justifyContent(FlexAlign.Center)
    .onClick(() => {
      this.selectedCategory = category;
      this.selectedElement = '';
      this.currentElement = null;
    })
  }
  
  // 元素选择器
  @Builder
  buildElementSelector() {
    Column() {
      Text('选择技术元素')
        .fontSize(16)
        .fontColor(Color.White)
        .fontWeight(FontWeight.Bold)
        .margin({ bottom: 15 })
      
      Grid() {
        ForEach(this.getCurrentElements(), (element: string) => {
          GridItem() {
            Column() {
              Text(element)
                .fontSize(16)
                .fontColor(Color.White)
                .fontWeight(FontWeight.Medium)
              Text(getElementChineseName(element))
                .fontSize(12)
                .fontColor('rgba(255,255,255,0.7)')
                .margin({ top: 3 })
            }
            .width('100%')
            .height(60)
            .backgroundColor(this.selectedElement === element ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.1)')
            .borderRadius(10)
            .justifyContent(FlexAlign.Center)
            .onClick(() => {
              this.selectedElement = element;
              this.currentElement = createTechnicalElement(element);
              if (this.currentElement) {
                this.currentElement.goe = this.selectedGOE;
                this.currentElement.calculateFinalScore();
              }
            })
          }
        })
      }
      .columnsTemplate('1fr 1fr 1fr')
      .rowsGap(10)
      .columnsGap(10)
      .width('100%')
      .height(300)
    }
    .width('100%')
    .margin({ bottom: 25 })
  }
  
  // GOE选择器
  @Builder
  buildGOESelector() {
    Column() {
      Text('选择GOE评分')
        .fontSize(16)
        .fontColor(Color.White)
        .fontWeight(FontWeight.Bold)
        .margin({ bottom: 15 })
      
      Row() {
        ForEach(GOE_RANGE, (goe: number) => {
          Column() {
            Text(goe > 0 ? `+${goe}` : `${goe}`)
              .fontSize(18)
              .fontColor(Color.White)
              .fontWeight(FontWeight.Bold)
          }
          .width(30)
          .height(40)
          .backgroundColor(this.selectedGOE === goe ? this.getGOEColor(goe) : 'rgba(255,255,255,0.1)')
          .borderRadius(8)
          .justifyContent(FlexAlign.Center)
          .onClick(() => {
            this.selectedGOE = goe;
            if (this.currentElement) {
              this.currentElement.goe = goe;
              this.currentElement.calculateFinalScore();
            }
          })
        })
      }
      .width('100%')
      .justifyContent(FlexAlign.SpaceBetween)
    }
    .width('100%')
    .margin({ bottom: 25 })
  }
  
  // 当前元素信息
  @Builder
  buildCurrentElementInfo() {
    if (this.currentElement) {
      Column() {
        Text('当前元素得分')
          .fontSize(16)
          .fontColor(Color.White)
          .fontWeight(FontWeight.Bold)
          .margin({ bottom: 15 })
        
        Row() {
          Column() {
            Text('元素')
              .fontSize(14)
              .fontColor('rgba(255,255,255,0.7)')
            Text(this.currentElement.name)
              .fontSize(20)
              .fontColor(Color.White)
              .fontWeight(FontWeight.Bold)
              .margin({ top: 5 })
          }
          .layoutWeight(1)
          
          Column() {
            Text('基础分')
              .fontSize(14)
              .fontColor('rgba(255,255,255,0.7)')
            Text(this.currentElement.baseValue.toFixed(2))
              .fontSize(20)
              .fontColor(Color.White)
              .fontWeight(FontWeight.Bold)
              .margin({ top: 5 })
          }
          .layoutWeight(1)
          
          Column() {
            Text('GOE')
              .fontSize(14)
              .fontColor('rgba(255,255,255,0.7)')
            Text(this.selectedGOE > 0 ? `+${this.selectedGOE}` : `${this.selectedGOE}`)
              .fontSize(20)
              .fontColor(this.getGOEColor(this.selectedGOE))
              .fontWeight(FontWeight.Bold)
              .margin({ top: 5 })
          }
          .layoutWeight(1)
          
          Column() {
            Text('最终得分')
              .fontSize(14)
              .fontColor('rgba(255,255,255,0.7)')
            Text(this.currentElement.finalScore.toFixed(2))
              .fontSize(20)
              .fontColor('#FFD700')
              .fontWeight(FontWeight.Bold)
              .margin({ top: 5 })
          }
          .layoutWeight(1)
        }
        .width('100%')
      }
      .width('100%')
      .padding(20)
      .backgroundColor('rgba(255,255,255,0.15)')
      .borderRadius(15)
      .margin({ bottom: 20 })
    }
  }
  
  // 添加按钮
  @Builder
  buildAddButton() {
    if (this.currentElement) {
      Button('添加元素')
        .width('100%')
        .height(50)
        .backgroundColor('#4CAF50')
        .borderRadius(25)
        .fontSize(18)
        .fontColor(Color.White)
        .fontWeight(FontWeight.Bold)
        .onClick(() => {
          if (this.currentElement) {
            this.elementList.push(this.currentElement);
            this.calculateTotalScore();
            // 重置选择
            this.selectedElement = '';
            this.currentElement = null;
            this.selectedGOE = 0;
          }
        })
        .margin({ bottom: 25 })
    }
  }
  
  // 已添加元素列表
  @Builder
  buildElementList() {
    if (this.elementList.length > 0) {
      Column() {
        Row() {
          Text('已添加元素')
            .fontSize(16)
            .fontColor(Color.White)
            .fontWeight(FontWeight.Bold)
          
          Blank()
          
          Button('清空')
            .height(30)
            .backgroundColor('rgba(255,255,255,0.2)')
            .borderRadius(15)
            .fontSize(14)
            .fontColor(Color.White)
            .onClick(() => {
              this.elementList = [];
              this.totalScore = 0;
            })
        }
        .width('100%')
        .margin({ bottom: 15 })
        
        ForEach(this.elementList, (element: TechnicalElement, index: number) => {
          Row() {
            Text(element.name)
              .fontSize(16)
              .fontColor(Color.White)
              .fontWeight(FontWeight.Medium)
              .layoutWeight(1)
            
            Text(`基础: ${element.baseValue.toFixed(2)}`)
              .fontSize(14)
              .fontColor('rgba(255,255,255,0.7)')
              .margin({ right: 10 })
            
            Text(`GOE: ${element.goe > 0 ? '+' : ''}${element.goe}`)
              .fontSize(14)
              .fontColor(this.getGOEColor(element.goe))
              .margin({ right: 10 })
            
            Text(`${element.finalScore.toFixed(2)}`)
              .fontSize(16)
              .fontColor('#FFD700')
              .fontWeight(FontWeight.Bold)
            
            Button('×')
              .width(30)
              .height(30)
              .backgroundColor('rgba(255,255,255,0.2)')
              .borderRadius(15)
              .fontSize(16)
              .fontColor(Color.White)
              .margin({ left: 10 })
              .onClick(() => {
                this.elementList.splice(index, 1);
                this.calculateTotalScore();
              })
          }
          .width('100%')
          .padding(15)
          .backgroundColor('rgba(255,255,255,0.1)')
          .borderRadius(10)
          .margin({ bottom: 10 })
        })
      }
      .width('100%')
      .padding(20)
      .backgroundColor('rgba(255,255,255,0.15)')
      .borderRadius(15)
      .margin({ bottom: 25 })
    }
  }
  
  // 总分显示
  @Builder
  buildTotalScore() {
    Column() {
      Row() {
        Text('技术分总分')
          .fontSize(18)
          .fontColor(Color.White)
          .fontWeight(FontWeight.Bold)
        
        Blank()
        
        Text(this.totalScore.toFixed(2))
          .fontSize(32)
          .fontColor('#FFD700')
          .fontWeight(FontWeight.Bold)
      }
      .width('100%')
      .justifyContent(FlexAlign.SpaceBetween)
    }
    .width('100%')
    .padding(25)
    .backgroundColor('rgba(255,255,255,0.2)')
    .borderRadius(20)
    .shadow({ radius: 10, color: 'rgba(0,0,0,0.3)', offsetX: 0, offsetY: 5 })
  }
  
  // 获取当前分类的元素列表
  getCurrentElements(): string[] {
    switch (this.selectedCategory) {
      case 'jump':
        return this.jumps;
      case 'spin':
        return this.spins;
      case 'step':
        return this.steps;
      default:
        return this.jumps;
    }
  }
  
  // 获取GOE对应的颜色
  getGOEColor(goe: number): string {
    if (goe > 0) {
      return '#4CAF50'; // 绿色
    } else if (goe < 0) {
      return '#F44336'; // 红色
    } else {
      return '#FFFFFF'; // 白色
    }
  }
  
  // 计算总分
  calculateTotalScore(): void {
    this.totalScore = this.elementList.reduce((sum, element) => {
      return sum + element.finalScore;
    }, 0);
  }
}
