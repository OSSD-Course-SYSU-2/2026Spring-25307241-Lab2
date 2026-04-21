/*
 * Copyright (c) 2023 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import Logger from '../common/util/Logger';
import ScoreCalculator from '../common/util/ScoreCalculator';
import { SkatingScore, JudgeScore, CombinationJump } from '../viewmodel/SkatingScoreModel';
import { CommonConstants } from '../common/constants/CommonConstants';

@Entry
@Component
struct FigureSkatingPage {
  // 节目类型选择
  @State programType: string = 'SP'; // SP: 短节目, FS: 自由滑
  
  @State currentElement: string = '';
  @State baseValue: string = '';
  @State goeScores: Array<string> = ['', '', '', '', '', '', '', '', ''];
  @State totalScore: string = '0.00';
  @State elementsList: Array<SkatingScore> = [];
  @State showResult: boolean = false;
  @State selectedLevel: string = 'Base';

  // 连跳相关状态
  @State isCombinationMode: boolean = false;
  @State combinationElements: Array<string> = [];
  @State combinationBaseValues: Array<number> = [];
  @State combinationList: Array<CombinationJump> = [];

  // 节目内容分(PCS)相关状态
  @State programComponents: Array<ProgramComponent> = [
    new ProgramComponent('滑行技术 SS', 0.8),
    new ProgramComponent('动作衔接 TR', 0.8),
    new ProgramComponent('表演质量 PE', 0.8),
    new ProgramComponent('编排构成 CH', 0.8),
    new ProgramComponent('音乐诠释 IN', 0.8)
  ];
  @State pcsScores: Array<Array<string>> = [
    ['', '', '', '', '', '', '', '', ''], // SS
    ['', '', '', '', '', '', '', '', ''], // TR
    ['', '', '', '', '', '', '', '', ''], // PE
    ['', '', '', '', '', '', '', '', ''], // CH
    ['', '', '', '', '', '', '', '', '']  // IN
  ];
  @State technicalScore: string = '0.00';
  @State componentScore: string = '0.00';

  private elements: Array<string> = [
    // 跳跃
    '1T', '1S', '1Lo', '1F', '1Lz', '1A',
    '2T', '2S', '2Lo', '2F', '2Lz', '2A',
    '3T', '3S', '3Lo', '3F', '3Lz', '3A',
    '4T', '4S', '4Lo', '4F', '4Lz', '4A',
    // 旋转
    'Sp1', 'Sp2', 'Sp3', 'Sp4',
    'LSp1', 'LSp2', 'LSp3', 'LSp4',
    'CSp1', 'CSp2', 'CSp3', 'CSp4',
    'SSp1', 'SSp2', 'SSp3', 'SSp4',
    // 步法
    'StSq1', 'StSq2', 'StSq3', 'StSq4'
  ];

  private baseValues: Map<string, number> = new Map([
    // 跳跃
    ['1T', 0.4], ['1S', 0.4], ['1Lo', 0.5], ['1F', 0.8], ['1Lz', 0.6], ['1A', 1.1],
    ['2T', 1.3], ['2S', 1.3], ['2Lo', 1.7], ['2F', 2.6], ['2Lz', 2.1], ['2A', 3.3],
    ['3T', 4.2], ['3S', 4.3], ['3Lo', 4.9], ['3F', 5.3], ['3Lz', 5.9], ['3A', 8.0],
    ['4T', 9.5], ['4S', 9.7], ['4Lo', 10.5], ['4F', 11.0], ['4Lz', 11.5], ['4A', 12.5],
    // 旋转
    ['Sp1', 1.5], ['Sp2', 2.5], ['Sp3', 3.0], ['Sp4', 3.5],
    ['LSp1', 1.7], ['LSp2', 2.7], ['LSp3', 3.2], ['LSp4', 3.7],
    ['CSp1', 1.6], ['CSp2', 2.6], ['CSp3', 3.1], ['CSp4', 3.6],
    ['SSp1', 1.7], ['SSp2', 2.7], ['SSp3', 3.3], ['SSp4', 3.8],
    // 步法
    ['StSq1', 1.5], ['StSq2', 2.5], ['StSq3', 3.25], ['StSq4', 3.9]
  ]);

  build() {
    Column() {
      // 标题
      Text('花样滑冰计分计算器')
        .fontSize(24)
        .fontWeight(FontWeight.Bold)
        .margin({ top: 20, bottom: 20 })

      // 节目类型选择
      Row() {
        Button('短节目 (SP)')
          .width('45%')
          .height(45)
          .fontSize(16)
          .backgroundColor(this.programType === 'SP' ? '#4CAF50' : '#E0E0E0')
          .fontColor(this.programType === 'SP' ? Color.White : Color.Black)
          .onClick(() => {
            this.programType = 'SP';
            this.updateProgramFactor();
          })

        Button('自由滑 (FS)')
          .width('45%')
          .height(45)
          .fontSize(16)
          .backgroundColor(this.programType === 'FS' ? '#4CAF50' : '#E0E0E0')
          .fontColor(this.programType === 'FS' ? Color.White : Color.Black)
          .onClick(() => {
            this.programType = 'FS';
            this.updateProgramFactor();
          })
      }
      .width('90%')
      .justifyContent(FlexAlign.SpaceBetween)
      .margin({ bottom: 20 })

      // 总分显示
      Column() {
        Row() {
          Column() {
            Text('技术分 (TES)')
              .fontSize(14)
              .fontColor('#666666')
            Text(this.technicalScore)
              .fontSize(24)
              .fontWeight(FontWeight.Bold)
              .fontColor('#2196F3')
          }
          .layoutWeight(1)

          Column() {
            Text('节目分 (PCS)')
              .fontSize(14)
              .fontColor('#666666')
            Text(this.componentScore)
              .fontSize(24)
              .fontWeight(FontWeight.Bold)
              .fontColor('#4CAF50')
          }
          .layoutWeight(1)

          Column() {
            Text('总分')
              .fontSize(14)
              .fontColor('#666666')
            Text(this.totalScore)
              .fontSize(28)
              .fontWeight(FontWeight.Bold)
              .fontColor('#FF6B6B')
          }
          .layoutWeight(1)
        }
        .width('100%')
      }
      .width('90%')
      .padding(15)
      .backgroundColor('#F5F5F5')
      .borderRadius(10)
      .margin({ bottom: 20 })

      // 模式切换按钮
      Row() {
        Button('单跳模式')
          .width('45%')
          .height(45)
          .fontSize(16)
          .backgroundColor(!this.isCombinationMode ? '#4CAF50' : '#E0E0E0')
          .fontColor(!this.isCombinationMode ? Color.White : Color.Black)
          .onClick(() => {
            this.isCombinationMode = false;
            this.clearCombination();
          })

        Button('连跳模式')
          .width('45%')
          .height(45)
          .fontSize(16)
          .backgroundColor(this.isCombinationMode ? '#4CAF50' : '#E0E0E0')
          .fontColor(this.isCombinationMode ? Color.White : Color.Black)
          .onClick(() => {
            this.isCombinationMode = true;
            this.clearCurrent();
          })
      }
      .width('90%')
      .justifyContent(FlexAlign.SpaceBetween)
      .margin({ bottom: 20 })

      // 动作选择区域
      Column() {
        Text(this.isCombinationMode ? '选择连跳动作（最多3个）' : '选择动作')
          .fontSize(16)
          .fontWeight(FontWeight.Medium)
          .margin({ bottom: 10 })

        Flex({ wrap: FlexWrap.Wrap }) {
          ForEach(this.elements, (element: string) => {
            Button(element)
              .width(60)
              .height(40)
              .fontSize(14)
              .margin({ right: 8, bottom: 8 })
              .backgroundColor(
                this.isCombinationMode
                  ? (this.combinationElements.includes(element) ? '#FF6B6B' : '#E0E0E0')
                  : (this.currentElement === element ? '#FF6B6B' : '#E0E0E0')
              )
              .fontColor(
                this.isCombinationMode
                  ? (this.combinationElements.includes(element) ? Color.White : Color.Black)
                  : (this.currentElement === element ? Color.White : Color.Black)
              )
              .onClick(() => {
                if (this.isCombinationMode) {
                  // 连跳模式：直接添加到连跳组合
                  if (this.combinationElements.length < 3 && !this.combinationElements.includes(element)) {
                    const baseVal = this.baseValues.get(element) || 0;
                    this.combinationElements.push(element);
                    this.combinationBaseValues.push(baseVal);
                  }
                } else {
                  // 单跳模式：选择当前动作
                  this.currentElement = element;
                  this.updateBaseValue();
                }
              })
          })
        }
        .width('100%')
      }
      .width('90%')
      .padding(15)
      .backgroundColor(Color.White)
      .borderRadius(10)
      .margin({ bottom: 20 })

      // 连跳模式：显示已选择的连跳组合
      if (this.isCombinationMode && this.combinationElements.length > 0) {
        Column() {
          Text('连跳组合')
            .fontSize(16)
            .fontWeight(FontWeight.Medium)
            .margin({ bottom: 10 })

          Row() {
            ForEach(this.combinationElements, (element: string, index: number) => {
              Row() {
                Text(element)
                  .fontSize(16)
                  .fontWeight(FontWeight.Bold)
                  .fontColor('#FF6B6B')
                if (index < this.combinationElements.length - 1) {
                  Text(' + ')
                    .fontSize(16)
                }
              }
            })
          }
          .margin({ bottom: 10 })

          Row() {
            Text('各基础分值: ')
              .fontSize(14)
            Text(this.combinationBaseValues.map(v => v.toFixed(2)).join(' + '))
              .fontSize(14)
              .fontColor('#4CAF50')
          }
          .margin({ bottom: 10 })

          Row() {
            Text('连跳总基础分值: ')
              .fontSize(14)
            Text(ScoreCalculator.calculateCombinationBaseValue(this.combinationBaseValues).toFixed(2))
              .fontSize(18)
              .fontWeight(FontWeight.Bold)
              .fontColor('#4CAF50')
          }
        }
        .width('90%')
        .padding(15)
        .backgroundColor(Color.White)
        .borderRadius(10)
        .margin({ bottom: 20 })
      }

      // 单跳模式：基础分值显示
      if (!this.isCombinationMode && this.currentElement !== '') {
        Column() {
          Row() {
            Text('动作: ')
              .fontSize(16)
            Text(this.currentElement)
              .fontSize(18)
              .fontWeight(FontWeight.Bold)
              .fontColor('#FF6B6B')
          }
          .margin({ bottom: 10 })

          Row() {
            Text('基础分值: ')
              .fontSize(16)
            Text(this.baseValue)
              .fontSize(18)
              .fontWeight(FontWeight.Bold)
              .fontColor('#4CAF50')
          }
        }
        .width('90%')
        .padding(15)
        .backgroundColor(Color.White)
        .borderRadius(10)
        .margin({ bottom: 20 })
      }

      // GOE评分区域
      if ((this.isCombinationMode && this.combinationElements.length >= 2) ||
          (!this.isCombinationMode && this.currentElement !== '')) {
        Column() {
          Text('裁判GOE评分 (-5 到 +5)')
            .fontSize(16)
            .fontWeight(FontWeight.Medium)
            .margin({ bottom: 10 })

          ForEach([0, 1, 2, 3, 4, 5, 6, 7, 8], (index: number) => {
            Row() {
              Text(`裁判 ${index + 1}:`)
                .fontSize(14)
                .width(60)
              TextInput({ text: this.goeScores[index] })
                .width(80)
                .height(40)
                .type(InputType.Number)
                .onChange((value: string) => {
                  this.goeScores[index] = value;
                })
            }
            .width('100%')
            .justifyContent(FlexAlign.Start)
            .margin({ bottom: 8 })
          })
        }
        .width('90%')
        .padding(15)
        .backgroundColor(Color.White)
        .borderRadius(10)
        .margin({ bottom: 20 })
        Column() {
          Text('裁判GOE评分 (-5 到 +5)')
            .fontSize(16)
            .fontWeight(FontWeight.Medium)
            .margin({ bottom: 10 })

          ForEach([0, 1, 2, 3, 4, 5, 6, 7, 8], (index: number) => {
            Row() {
              Text(`裁判 ${index + 1}:`)
                .fontSize(14)
                .width(60)
              TextInput({ text: this.goeScores[index] })
                .width(80)
                .height(40)
                .type(InputType.Number)
                .onChange((value: string) => {
                  this.goeScores[index] = value;
                })
            }
            .width('100%')
            .justifyContent(FlexAlign.Start)
            .margin({ bottom: 8 })
          })
        }
        .width('90%')
        .padding(15)
        .backgroundColor(Color.White)
        .borderRadius(10)
        .margin({ bottom: 20 })

        // 添加动作按钮
        Row() {
          if (this.isCombinationMode) {
            Button('完成连跳')
              .width('45%')
              .height(50)
              .fontSize(16)
              .backgroundColor('#4CAF50')
              .enabled(this.combinationElements.length >= 2)
              .onClick(() => {
                this.addCombination();
              })

            Button('清空连跳')
              .width('45%')
              .height(50)
              .fontSize(16)
              .backgroundColor('#FF9800')
              .onClick(() => {
                this.clearCombination();
              })
          } else {
            Button('添加动作')
              .width('45%')
              .height(50)
              .fontSize(16)
              .backgroundColor('#4CAF50')
              .onClick(() => {
                this.addElement();
              })

            Button('清空')
              .width('45%')
              .height(50)
              .fontSize(16)
              .backgroundColor('#FF9800')
              .onClick(() => {
                this.clearCurrent();
              })
          }
        }
        .width('90%')
        .justifyContent(FlexAlign.SpaceBetween)
        .margin({ bottom: 20 })
      }

      // 已添加动作列表
      if (this.elementsList.length > 0 || this.combinationList.length > 0) {
        Column() {
          Text('已添加动作')
            .fontSize(16)
            .fontWeight(FontWeight.Medium)
            .margin({ bottom: 10 })

          // 单跳列表
          ForEach(this.elementsList, (item: SkatingScore, index: number) => {
            Row() {
              Text(`${index + 1}. ${item.element}`)
                .fontSize(14)
                .layoutWeight(1)
              Text(`基础: ${item.baseValue.toFixed(2)}`)
                .fontSize(14)
                .width(100)
              Text(`得分: ${item.finalScore.toFixed(2)}`)
                .fontSize(14)
                .fontColor('#FF6B6B')
                .width(100)
              Button('删除')
                .width(50)
                .height(30)
                .fontSize(12)
                .backgroundColor('#FF4444')
                .onClick(() => {
                  this.removeElement(index);
                })
            }
            .width('100%')
            .justifyContent(FlexAlign.SpaceBetween)
            .padding({ top: 8, bottom: 8 })
            .borderWidth({ bottom: 1 })
            .borderColor('#E0E0E0')
          })

          // 连跳列表
          ForEach(this.combinationList, (item: CombinationJump, index: number) => {
            Column() {
              Row() {
                Text(`${this.elementsList.length + index + 1}. ${item.elements.join(' + ')} (连跳)`)
                  .fontSize(14)
                  .layoutWeight(1)
                Button('删除')
                  .width(50)
                  .height(30)
                  .fontSize(12)
                  .backgroundColor('#FF4444')
                  .onClick(() => {
                    this.removeCombination(index);
                  })
              }
              .width('100%')
              .justifyContent(FlexAlign.SpaceBetween)
              .padding({ top: 8, bottom: 4 })

              Row() {
                Text(`各基础: ${item.baseValues.map(v => v.toFixed(2)).join(' + ')}`)
                  .fontSize(12)
                  .fontColor('#666666')
                  .layoutWeight(1)
                Text(`总基础: ${item.totalBaseValue.toFixed(2)}`)
                  .fontSize(12)
                  .fontColor('#4CAF50')
                  .width(100)
                Text(`得分: ${item.finalScore.toFixed(2)}`)
                  .fontSize(14)
                  .fontColor('#FF6B6B')
                  .width(100)
              }
              .width('100%')
              .padding({ bottom: 8 })
            }
            .width('100%')
            .borderWidth({ bottom: 1 })
            .borderColor('#E0E0E0')
          })
        }
        .width('90%')
        .padding(15)
        .backgroundColor(Color.White)
        .borderRadius(10)
        .margin({ bottom: 20 })
      }

      // 节目内容分(PCS)输入区域
      Column() {
        Text('节目内容分 (PCS)')
          .fontSize(16)
          .fontWeight(FontWeight.Medium)
          .margin({ bottom: 10 })

        ForEach(this.programComponents, (component: ProgramComponent, compIndex: number) => {
          Column() {
            Row() {
              Text(component.name)
                .fontSize(14)
                .fontWeight(FontWeight.Medium)
                .layoutWeight(1)
              Text(`系数: ${component.factor.toFixed(2)}`)
                .fontSize(12)
                .fontColor('#666666')
            }
            .width('100%')
            .margin({ bottom: 8 })

            Flex({ wrap: FlexWrap.Wrap }) {
              ForEach([0, 1, 2, 3, 4, 5, 6, 7, 8], (judgeIndex: number) => {
                Column() {
                  Text(`裁判${judgeIndex + 1}`)
                    .fontSize(10)
                    .fontColor('#999999')
                  TextInput({ text: this.pcsScores[compIndex][judgeIndex] })
                    .width(35)
                    .height(35)
                    .fontSize(12)
                    .type(InputType.Number)
                    .onChange((value: string) => {
                      this.pcsScores[compIndex][judgeIndex] = value;
                    })
                }
                .margin({ right: 5, bottom: 5 })
              })
            }
            .width('100%')

            Row() {
              Text('平均分: ')
                .fontSize(12)
                .fontColor('#666666')
              Text(this.calculateComponentAverage(compIndex).toFixed(2))
                .fontSize(14)
                .fontWeight(FontWeight.Bold)
                .fontColor('#4CAF50')
              Text('  最终分: ')
                .fontSize(12)
                .fontColor('#666666')
              Text(this.calculateComponentFinalScore(compIndex).toFixed(2))
                .fontSize(14)
                .fontWeight(FontWeight.Bold)
                .fontColor('#FF6B6B')
            }
            .width('100%')
            .margin({ top: 8 })
          }
          .width('100%')
          .padding(10)
          .backgroundColor('#F9F9F9')
          .borderRadius(8)
          .margin({ bottom: 10 })
        })
      }
      .width('90%')
      .padding(15)
      .backgroundColor(Color.White)
      .borderRadius(10)
      .margin({ bottom: 20 })

      // 计算总分按钮
      Button('计算总分')
        .width('90%')
        .height(50)
        .fontSize(18)
        .backgroundColor('#FF6B6B')
        .onClick(() => {
          this.calculateTotal();
        })
      }
    }
    .width('100%')
    .height('100%')
    .backgroundColor('#F0F0F0')
  }

  updateBaseValue() {
    const value = this.baseValues.get(this.currentElement);
    if (value !== undefined) {
      this.baseValue = value.toFixed(2);
    }
  }

  addElement() {
    if (this.currentElement === '') {
      return;
    }

    const baseVal = this.baseValues.get(this.currentElement) || 0;
    const goeValues: number[] = [];
    
    for (let i = 0; i < 9; i++) {
      const goe = parseFloat(this.goeScores[i]);
      if (!isNaN(goe)) {
        goeValues.push(goe);
      }
    }

    const finalScore = ScoreCalculator.calculateElementScore(baseVal, goeValues);
    
    const score = new SkatingScore(
      this.currentElement,
      baseVal,
      goeValues,
      finalScore
    );

    this.elementsList.push(score);
    this.clearCurrent();
  }

  removeElement(index: number) {
    this.elementsList.splice(index, 1);
    this.calculateTotal();
  }

  clearCurrent() {
    this.currentElement = '';
    this.baseValue = '';
    this.goeScores = ['', '', '', '', '', '', '', '', ''];
  }

  calculateTotal() {
    // 计算技术分(TES)
    let tes = 0;
    for (const item of this.elementsList) {
      tes += item.finalScore;
    }
    for (const item of this.combinationList) {
      tes += item.finalScore;
    }
    this.technicalScore = tes.toFixed(2);

    // 计算节目内容分(PCS)
    let pcs = 0;
    for (let i = 0; i < this.programComponents.length; i++) {
      pcs += this.calculateComponentFinalScore(i);
    }
    this.componentScore = pcs.toFixed(2);

    // 计算总分
    const total = tes + pcs;
    this.totalScore = total.toFixed(2);
  }

  // 计算节目内容分项的平均分
  calculateComponentAverage(compIndex: number): number {
    const scores: number[] = [];
    for (let i = 0; i < 9; i++) {
      const score = parseFloat(this.pcsScores[compIndex][i]);
      if (!isNaN(score)) {
        scores.push(score);
      }
    }

    if (scores.length === 0) {
      return 0;
    }

    // 去掉最高分和最低分
    const sorted = [...scores].sort((a, b) => a - b);
    const trimmed = sorted.slice(1, sorted.length - 1);

    if (trimmed.length === 0) {
      return scores[0];
    }

    const sum = trimmed.reduce((acc, val) => acc + val, 0);
    return sum / trimmed.length;
  }

  // 计算节目内容分项的最终得分
  calculateComponentFinalScore(compIndex: number): number {
    const average = this.calculateComponentAverage(compIndex);
    const factor = this.programComponents[compIndex].factor;
    return Math.round(average * factor * 100) / 100;
  }

  // 更新节目系数(短节目和自由滑的系数不同)
  updateProgramFactor() {
    const factor = this.programType === 'SP' ? 0.8 : 1.6;
    for (const component of this.programComponents) {
      component.factor = factor;
    }
  }

  // 连跳相关方法
  addToCombination() {
    if (this.currentElement === '' || this.combinationElements.length >= 3) {
      return;
    }

    const baseVal = this.baseValues.get(this.currentElement) || 0;
    this.combinationElements.push(this.currentElement);
    this.combinationBaseValues.push(baseVal);
    this.currentElement = '';
    this.baseValue = '';
  }

  addCombination() {
    if (this.combinationElements.length < 2) {
      return;
    }

    const goeValues: number[] = [];
    for (let i = 0; i < 9; i++) {
      const goe = parseFloat(this.goeScores[i]);
      if (!isNaN(goe)) {
        goeValues.push(goe);
      }
    }

    const combination = ScoreCalculator.createCombinationJump(
      [...this.combinationElements],
      [...this.combinationBaseValues],
      goeValues
    );

    this.combinationList.push(combination);
    this.clearCombination();
  }

  removeCombination(index: number) {
    this.combinationList.splice(index, 1);
    this.calculateTotal();
  }

  clearCombination() {
    this.combinationElements = [];
    this.combinationBaseValues = [];
    this.currentElement = '';
    this.baseValue = '';
    this.goeScores = ['', '', '', '', '', '', '', '', ''];
  }
}
