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

import router from '@ohos.router';

@Entry
@Component
struct MainPage {
  build() {
    Column() {
      // 标题
      Column() {
        Text('计算器应用')
          .fontSize(32)
          .fontWeight(FontWeight.Bold)
          .fontColor('#333333')
          .margin({ top: 60, bottom: 20 })

        Text('请选择计算器类型')
          .fontSize(16)
          .fontColor('#666666')
      }
      .width('100%')
      .height(200)
      .justifyContent(FlexAlign.Center)

      // 计算器选择按钮
      Column() {
        // 普通计算器
        Column() {
          Row() {
            Text('🔢')
              .fontSize(40)
            Column() {
              Text('普通计算器')
                .fontSize(20)
                .fontWeight(FontWeight.Medium)
              Text('基础四则运算')
                .fontSize(14)
                .fontColor('#999999')
                .margin({ top: 5 })
            }
            .alignItems(HorizontalAlign.Start)
            .margin({ left: 15 })
            .layoutWeight(1)
          }
          .width('100%')
          .padding(20)
        }
        .width('90%')
        .backgroundColor(Color.White)
        .borderRadius(15)
        .margin({ bottom: 20 })
        .shadow({ radius: 10, color: '#E0E0E0', offsetX: 0, offsetY: 5 })
        .onClick(() => {
          router.pushUrl({ url: 'pages/HomePage' });
        })

        // 花样滑冰计分计算器
        Column() {
          Row() {
            Text('⛸️')
              .fontSize(40)
            Column() {
              Text('花样滑冰计分')
                .fontSize(20)
                .fontWeight(FontWeight.Medium)
              Text('专业ISU评分系统')
                .fontSize(14)
                .fontColor('#999999')
                .margin({ top: 5 })
            }
            .alignItems(HorizontalAlign.Start)
            .margin({ left: 15 })
            .layoutWeight(1)
          }
          .width('100%')
          .padding(20)
        }
        .width('90%')
        .backgroundColor(Color.White)
        .borderRadius(15)
        .margin({ bottom: 20 })
        .shadow({ radius: 10, color: '#E0E0E0', offsetX: 0, offsetY: 5 })
        .onClick(() => {
          router.pushUrl({ url: 'pages/FigureSkatingPage' });
        })
      }
      .width('100%')
      .layoutWeight(1)
      .justifyContent(FlexAlign.Start)
      .padding({ top: 20 })

      // 底部信息
      Column() {
        Text('基于HarmonyOS开发')
          .fontSize(12)
          .fontColor('#CCCCCC')
      }
      .width('100%')
      .height(60)
      .justifyContent(FlexAlign.Center)
    }
    .width('100%')
    .height('100%')
    .linearGradient({
      angle: 135,
      colors: [['#667eea', 0.0], ['#764ba2', 1.0]]
    })
  }
}
