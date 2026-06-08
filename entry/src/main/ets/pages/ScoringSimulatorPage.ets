/**
 * 冰迹花滑 - 计分模拟器
 * 复刻ISU官方计分规则
 * 支持多设备适配
 */

import { IceNavBar } from '../common/components/IceNavBar';
import { IceCard } from '../common/components/IceCard';
import { IceTag } from '../common/components/IceTag';
import { TechnicalElement, createTechnicalElement, getAllJumps, getAllSpins, getAllSteps } from '../viewmodel/TechnicalElementModel';
import { DeviceUtils } from '../common/utils/DeviceUtils';

@Entry
@Component
struct ScoringSimulatorPage {
  @State elements: TechnicalElement[] = [];
  @State selectedType: string = 'jump';
  @State selectedElement: string = '';
  @State selectedGOE: number = 0;
  @State totalTES: number = 0;
  @State totalPCS: number = 0;
  @State programType: string = 'SP'; // SP, FS
  
  private jumps: string[] = getAllJumps();
  private spins: string[] = getAllSpins();
  private steps: string[] = getAllSteps();
  
  build() {
    Column() {
      // 导航栏
      IceNavBar({
        title: '计分模拟器',
        showBack: true,
        navBackgroundColor: '#4FC3F7'
      });
      
      // 内容区
      Scroll() {
        Column() {
          // 节目类型选择
          this.buildProgramTypeSelector();
          
          // 动作添加区
          this.buildElementAdder();
          
          // 已添加动作列表
          this.buildElementList();
          
          // PCS输入区（手表端隐藏）
          if (!DeviceUtils.isWearable()) {
            this.buildPCSInput();
          }
          
          // 总分显示
          this.buildTotalScore();
        }
        .width('100%')
        .padding(DeviceUtils.isWearable() ? 8 : 16)
      }
      .layoutWeight(1)
      .scrollBar(BarState.Auto)
    }
    .width('100%')
    .height('100%')
    .backgroundColor('#F5F5F5')
  }
  
  // 节目类型选择
  @Builder
  buildProgramTypeSelector() {
    Row() {
      Button('短节目 (SP)')
        .layoutWeight(1)
        .height(DeviceUtils.isWearable() ? 32 : 40)
        .backgroundColor(this.programType === 'SP' ? '#4FC3F7' : '#FFFFFF')
        .fontColor(this.programType === 'SP' ? '#FFFFFF' : '#666666')
        .fontSize(DeviceUtils.isWearable() ? 12 : 14)
        .borderRadius(DeviceUtils.isWearable() ? 16 : 20)
        .onClick(() => {
          this.programType = 'SP';
        })
      
      Button('自由滑 (FS)')
        .layoutWeight(1)
        .height(DeviceUtils.isWearable() ? 32 : 40)
        .backgroundColor(this.programType === 'FS' ? '#4FC3F7' : '#FFFFFF')
        .fontColor(this.programType === 'FS' ? '#FFFFFF' : '#666666')
        .fontSize(DeviceUtils.isWearable() ? 12 : 14)
        .borderRadius(DeviceUtils.isWearable() ? 16 : 20)
        .margin({ left: DeviceUtils.isWearable() ? 6 : 12 })
        .onClick(() => {
          this.programType = 'FS';
        })
    }
    .width('100%')
    .margin({ bottom: DeviceUtils.isWearable() ? 10 : 20 })
  }
  
  // 动作添加器
  @Builder
  buildElementAdder() {
    Column() {
      Text('添加动作')
        .fontSize(DeviceUtils.isWearable() ? 14 : 16)
        .fontWeight(FontWeight.Bold)
        .fontColor('#333333')
        .margin({ bottom: DeviceUtils.isWearable() ? 8 : 12 })
      
      // 类型选择
      Row() {
        this.TypeButton('跳跃', 'jump', '🦘');
        this.TypeButton('旋转', 'spin', '🔄');
        this.TypeButton('步法', 'step', '👟');
      }
      .width('100%')
      .justifyContent(FlexAlign.SpaceEvenly)
      .margin({ bottom: DeviceUtils.isWearable() ? 10 : 16 })
      
      // 动作选择
      this.buildElementSelector();
      
      // GOE选择
      this.buildGOESelector();
      
      // 添加按钮
      this.buildAddButton();
    }
    .width('100%')
    .padding(DeviceUtils.isWearable() ? 10 : 16)
    .backgroundColor('#FFFFFF')
    .borderRadius(DeviceUtils.isWearable() ? 8 : 12)
    .margin({ bottom: DeviceUtils.isWearable() ? 10 : 16 })
  }
  
  @Builder
  TypeButton(name: string, type: string, icon: string) {
    Column() {
      Text(icon)
        .fontSize(DeviceUtils.isWearable() ? 18 : 24)
      Text(name)
        .fontSize(DeviceUtils.isWearable() ? 10 : 12)
        .fontColor(this.selectedType === type ? '#4FC3F7' : '#666666')
        .margin({ top: DeviceUtils.isWearable() ? 2 : 4 })
    }
    .width(DeviceUtils.isWearable() ? 55 : 70)
    .height(DeviceUtils.isWearable() ? 45 : 60)
    .backgroundColor(this.selectedType === type ? '#E3F2FD' : '#F5F5F5')
    .borderRadius(DeviceUtils.isWearable() ? 8 : 12)
    .justifyContent(FlexAlign.Center)
    .onClick(() => {
      this.selectedType = type;
      this.selectedElement = '';
    })
  }
  
  @Builder
  buildElementSelector() {
    Column() {
      Text('选择动作')
        .fontSize(DeviceUtils.isWearable() ? 12 : 14)
        .fontColor('#666666')
        .margin({ bottom: DeviceUtils.isWearable() ? 6 : 8 })
      
      Grid() {
        ForEach(this.getCurrentElements(), (element: string) => {
          GridItem() {
            Column() {
              Text(element)
                .fontSize(DeviceUtils.isWearable() ? 12 : 14)
                .fontColor(this.selectedElement === element ? '#1976D2' : '#333333')
                .fontWeight(this.selectedElement === element ? FontWeight.Bold : FontWeight.Normal)
            }
            .width('100%')
            .height(DeviceUtils.isWearable() ? 32 : 40)
            .backgroundColor(this.selectedElement === element ? '#E3F2FD' : '#F5F5F5')
            .borderRadius(DeviceUtils.isWearable() ? 6 : 8)
            .justifyContent(FlexAlign.Center)
            .onClick(() => {
              this.selectedElement = element;
            })
          }
        }, (element: string) => element)
      }
      .columnsTemplate(DeviceUtils.isWearable() ? '1fr 1fr 1fr' : '1fr 1fr 1fr 1fr')
      .rowsGap(DeviceUtils.isWearable() ? 6 : 8)
      .columnsGap(DeviceUtils.isWearable() ? 6 : 8)
      .width('100%')
      .height(DeviceUtils.isWearable() ? 100 : 120)
    }
    .width('100%')
    .margin({ bottom: DeviceUtils.isWearable() ? 10 : 16 })
  }
  
  @Builder
  buildGOESelector() {
    Column() {
      Text('GOE评分')
        .fontSize(DeviceUtils.isWearable() ? 12 : 14)
        .fontColor('#666666')
        .margin({ bottom: DeviceUtils.isWearable() ? 6 : 8 })
      
      // 手表端简化GOE选择，只显示常用值
      if (DeviceUtils.isWearable()) {
        Row() {
          ForEach([-3, -1, 0, 1, 3], (goe: number) => {
            Column() {
              Text(goe > 0 ? `+${goe}` : `${goe}`)
                .fontSize(10)
                .fontColor(this.selectedGOE === goe ? '#FFFFFF' : '#333333')
                .fontWeight(FontWeight.Bold)
            }
            .width(24)
            .height(28)
            .backgroundColor(this.selectedGOE === goe ? '#4FC3F7' : '#F5F5F5')
            .borderRadius(5)
            .justifyContent(FlexAlign.Center)
            .onClick(() => {
              this.selectedGOE = goe;
            })
          }, (goe: number) => goe.toString())
        }
        .width('100%')
        .justifyContent(FlexAlign.SpaceBetween)
      } else {
        Row() {
          ForEach([-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5], (goe: number) => {
            Column() {
              Text(goe > 0 ? `+${goe}` : `${goe}`)
                .fontSize(12)
                .fontColor(this.selectedGOE === goe ? '#FFFFFF' : '#333333')
                .fontWeight(FontWeight.Bold)
            }
            .width(28)
            .height(32)
            .backgroundColor(this.selectedGOE === goe ? '#4FC3F7' : '#F5F5F5')
            .borderRadius(6)
            .justifyContent(FlexAlign.Center)
            .onClick(() => {
              this.selectedGOE = goe;
            })
          }, (goe: number) => goe.toString())
        }
        .width('100%')
        .justifyContent(FlexAlign.SpaceBetween)
      }
    }
    .width('100%')
    .margin({ bottom: DeviceUtils.isWearable() ? 10 : 16 })
  }
  
  @Builder
  buildAddButton() {
    Button('添加动作')
      .width('100%')
      .height(DeviceUtils.isWearable() ? 36 : 45)
      .backgroundColor('#4CAF50')
      .fontColor('#FFFFFF')
      .fontSize(DeviceUtils.isWearable() ? 14 : 16)
      .fontWeight(FontWeight.Bold)
      .borderRadius(DeviceUtils.isWearable() ? 18 : 22)
      .enabled(this.selectedElement !== '')
      .onClick(() => {
        this.addElement();
      })
  }
  
  // 已添加动作列表
  @Builder
  buildElementList() {
    if (this.elements.length > 0) {
      Column() {
        Row() {
          Text('技术动作列表')
            .fontSize(DeviceUtils.isWearable() ? 14 : 16)
            .fontWeight(FontWeight.Bold)
            .fontColor('#333333')
          
          Blank()
          
          Button('清空')
            .height(DeviceUtils.isWearable() ? 24 : 30)
            .backgroundColor('#FFEBEE')
            .fontColor('#F44336')
            .fontSize(DeviceUtils.isWearable() ? 10 : 12)
            .borderRadius(DeviceUtils.isWearable() ? 12 : 15)
            .onClick(() => {
              this.elements = [];
              this.calculateTotal();
            })
        }
        .width('100%')
        .margin({ bottom: DeviceUtils.isWearable() ? 8 : 12 })
        
        ForEach(this.elements, (element: TechnicalElement, index: number) => {
          this.ElementItem(element, index);
        }, (element: TechnicalElement, index: number) => index.toString())
        
        // TES总分
        Row() {
          Text('技术分 (TES)')
            .fontSize(DeviceUtils.isWearable() ? 14 : 16)
            .fontWeight(FontWeight.Bold)
            .fontColor('#333333')
          
          Blank()
          
          Text(this.totalTES.toFixed(2))
            .fontSize(DeviceUtils.isWearable() ? 16 : 20)
            .fontWeight(FontWeight.Bold)
            .fontColor('#FF6B6B')
        }
        .width('100%')
        .padding({ top: DeviceUtils.isWearable() ? 8 : 12 })
      }
      .width('100%')
      .padding(DeviceUtils.isWearable() ? 10 : 16)
      .backgroundColor('#FFFFFF')
      .borderRadius(DeviceUtils.isWearable() ? 8 : 12)
      .margin({ bottom: DeviceUtils.isWearable() ? 10 : 16 })
    }
  }
  
  @Builder
  ElementItem(element: TechnicalElement, index: number) {
    Row() {
      Text(element.name)
        .fontSize(DeviceUtils.isWearable() ? 12 : 14)
        .fontWeight(FontWeight.Bold)
        .fontColor('#333333')
        .layoutWeight(1)
      
      // 手表端简化显示
      if (!DeviceUtils.isWearable()) {
        Text(`基础: ${element.baseValue.toFixed(2)}`)
          .fontSize(12)
          .fontColor('#999999')
          .margin({ right: 8 })
        
        Text(`GOE: ${element.goe > 0 ? '+' : ''}${element.goe}`)
          .fontSize(12)
          .fontColor(element.goe > 0 ? '#4CAF50' : element.goe < 0 ? '#F44336' : '#999999')
          .margin({ right: 8 })
      }
      
      Text(element.finalScore.toFixed(2))
        .fontSize(DeviceUtils.isWearable() ? 12 : 14)
        .fontWeight(FontWeight.Bold)
        .fontColor('#1976D2')
      
      Button('×')
        .width(DeviceUtils.isWearable() ? 20 : 24)
        .height(DeviceUtils.isWearable() ? 20 : 24)
        .backgroundColor('#FFEBEE')
        .fontColor('#F44336')
        .fontSize(DeviceUtils.isWearable() ? 10 : 12)
        .borderRadius(DeviceUtils.isWearable() ? 10 : 12)
        .margin({ left: DeviceUtils.isWearable() ? 4 : 8 })
        .onClick(() => {
          this.elements.splice(index, 1);
          this.calculateTotal();
        })
    }
    .width('100%')
    .padding({ top: DeviceUtils.isWearable() ? 6 : 8, bottom: DeviceUtils.isWearable() ? 6 : 8 })
  }
  
  // PCS输入区
  @Builder
  buildPCSInput() {
    Column() {
      Text('节目内容分 (PCS)')
        .fontSize(DeviceUtils.isWearable() ? 14 : 16)
        .fontWeight(FontWeight.Bold)
        .fontColor('#333333')
        .margin({ bottom: DeviceUtils.isWearable() ? 8 : 12 })
      
      Row() {
        Text('总分')
          .fontSize(DeviceUtils.isWearable() ? 12 : 14)
          .fontColor('#666666')
        
        TextInput({ placeholder: '输入PCS分数', text: this.totalPCS.toString() })
          .layoutWeight(1)
          .height(DeviceUtils.isWearable() ? 32 : 40)
          .backgroundColor('#F5F5F5')
          .borderRadius(DeviceUtils.isWearable() ? 6 : 8)
          .margin({ left: DeviceUtils.isWearable() ? 8 : 12 })
          .fontSize(DeviceUtils.isWearable() ? 12 : 14)
          .type(InputType.Number)
          .onChange((value: string) => {
            this.totalPCS = parseFloat(value) || 0;
          })
      }
      .width('100%')
    }
    .width('100%')
    .padding(DeviceUtils.isWearable() ? 10 : 16)
    .backgroundColor('#FFFFFF')
    .borderRadius(DeviceUtils.isWearable() ? 8 : 12)
    .margin({ bottom: DeviceUtils.isWearable() ? 10 : 16 })
  }
  
  // 总分显示
  @Builder
  buildTotalScore() {
    Column() {
      Row() {
        Text('节目总分')
          .fontSize(DeviceUtils.isWearable() ? 16 : 18)
          .fontWeight(FontWeight.Bold)
          .fontColor('#333333')
        
        Blank()
        
        Column() {
          Text((this.totalTES + this.totalPCS).toFixed(2))
            .fontSize(DeviceUtils.isWearable() ? 24 : 32)
            .fontWeight(FontWeight.Bold)
            .fontColor('#FF6B6B')
          
          // 手表端简化显示
          if (!DeviceUtils.isWearable()) {
            Text(`TES: ${this.totalTES.toFixed(2)} + PCS: ${this.totalPCS.toFixed(2)}`)
              .fontSize(12)
              .fontColor('#999999')
              .margin({ top: 4 })
          }
        }
        .alignItems(HorizontalAlign.End)
      }
      .width('100%')
    }
    .width('100%')
    .padding(DeviceUtils.isWearable() ? 12 : 20)
    .backgroundColor('#E3F2FD')
    .borderRadius(DeviceUtils.isWearable() ? 8 : 12)
  }
  
  // 辅助方法
  private getCurrentElements(): string[] {
    switch (this.selectedType) {
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
  
  private addElement() {
    if (this.selectedElement) {
      const element = createTechnicalElement(this.selectedElement);
      if (element) {
        element.goe = this.selectedGOE;
        element.calculateFinalScore();
        this.elements.push(element);
        this.calculateTotal();
        this.selectedElement = '';
        this.selectedGOE = 0;
      }
    }
  }
  
  private calculateTotal() {
    this.totalTES = this.elements.reduce((sum, element) => sum + element.finalScore, 0);
  }
}
