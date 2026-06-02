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
import { BreakpointSystem, BreakpointConstants } from '../common/utils/BreakpointSystem';
import { DeviceUtils } from '../common/utils/DeviceUtils';

@Entry
@Component
struct MainPage {
  @State currentBreakpoint: string = BreakpointConstants.BREAKPOINT_SM;
  private breakpointSystem: BreakpointSystem = new BreakpointSystem();
  
  aboutToAppear(): void {
    // 注册断点监听
    this.breakpointSystem.register(getContext(this) as Context);
    this.currentBreakpoint = this.breakpointSystem.getCurrentBreakpoint();
    
    // 监听断点变化
    this.breakpointSystem.onBreakpointChange((breakpoint: string) => {
      this.currentBreakpoint = breakpoint;
    });
  }
  
  aboutToDisappear(): void {
    this.breakpointSystem.unregister();
  }
  
  build() {
    Column() {
      // 标题区域 - 使用响应式布局
      Column() {
        Text('计算器应用')
          .fontSize(this.getTitleFontSize())
          .fontWeight(FontWeight.Bold)
          .fontColor('#333333')
          .margin({ top: this.getTopMargin(), bottom: 20 })

        Text('请选择计算器类型')
          .fontSize(this.getSubTitleFontSize())
          .fontColor('#666666')
      }
      .width('100%')
      .height(this.getTitleHeight())
      .justifyContent(FlexAlign.Center)

      // 计算器选择区域 - 使用栅格布局实现响应式
      GridRow({
        columns: { 
          sm: 4,   // 手机: 4列
          md: 8,   // 中屏: 8列
          lg: 12,  // 大屏: 12列
          xl: 12   // 超大屏: 12列
        },
        gutter: { x: 16, y: 16 },
        breakpoints: {
          value: ['320vp', '600vp', '840vp', '1440vp'],
          reference: BreakpointsReference.WindowSize
        }
      }) {
        // 技术元素计算器卡片
        GridCol({ 
          span: { sm: 4, md: 4, lg: 6, xl: 6 },
          offset: { sm: 0, md: 0, lg: 0, xl: 0 }
        }) {
          this.CalculatorCard(
            '⛸️',
            '技术元素计算器',
            '计算跳跃、旋转、步法得分',
            'pages/HomePage'
          )
        }
        
        // 花样滑冰解谜游戏卡片
        GridCol({ 
          span: { sm: 4, md: 4, lg: 6, xl: 6 },
          offset: { sm: 0, md: 0, lg: 0, xl: 0 }
        }) {
          this.CalculatorCard(
            '⛸️',
            '花样滑冰解谜',
            '3×3棋盘解谜游戏',
            'pages/GameModePage'
          )
        }
      }
      .width('100%')
      .padding({ left: this.getSidePadding(), right: this.getSidePadding() })
      .layoutWeight(1)

      // 底部信息
      Column() {
        Text('基于HarmonyOS开发 | 支持多端部署')
          .fontSize(12)
          .fontColor('#CCCCCC')
        
        Text(`当前设备: ${DeviceUtils.getDeviceType()} | 断点: ${this.currentBreakpoint}`)
          .fontSize(10)
          .fontColor('#AAAAAA')
          .margin({ top: 5 })
      }
      .width('100%')
      .height(80)
      .justifyContent(FlexAlign.Center)
    }
    .width('100%')
    .height('100%')
    .linearGradient({
      angle: 135,
      colors: [['#667eea', 0.0], ['#764ba2', 1.0]]
    })
  }
  
  /**
   * 计算器卡片组件
   */
  @Builder
  CalculatorCard(icon: string, title: string, description: string, targetPage: string) {
    Column() {
      Row() {
        Text(icon)
          .fontSize(this.getIconSize())
        
        Column() {
          Text(title)
            .fontSize(this.getCardTitleSize())
            .fontWeight(FontWeight.Medium)
          
          Text(description)
            .fontSize(this.getCardDescSize())
            .fontColor('#999999')
            .margin({ top: 5 })
        }
        .alignItems(HorizontalAlign.Start)
        .margin({ left: 15 })
        .layoutWeight(1)
      }
      .width('100%')
      .padding(this.getCardPadding())
    }
    .width('100%')
    .backgroundColor(Color.White)
    .borderRadius(this.getCardRadius())
    .shadow({ radius: 10, color: '#E0E0E0', offsetX: 0, offsetY: 5 })
    .onClick(() => {
      router.pushUrl({ url: targetPage });
    })
  }
  
  // 响应式尺寸计算方法
  private getTitleFontSize(): number {
    return BreakpointSystem.getFontSize(this.currentBreakpoint, 32);
  }
  
  private getSubTitleFontSize(): number {
    return BreakpointSystem.getFontSize(this.currentBreakpoint, 16);
  }
  
  private getTitleHeight(): number {
    switch (this.currentBreakpoint) {
      case BreakpointConstants.BREAKPOINT_SM:
        return 200;
      case BreakpointConstants.BREAKPOINT_MD:
        return 250;
      case BreakpointConstants.BREAKPOINT_LG:
      case BreakpointConstants.BREAKPOINT_XL:
        return 300;
      default:
        return 200;
    }
  }
  
  private getTopMargin(): number {
    switch (this.currentBreakpoint) {
      case BreakpointConstants.BREAKPOINT_SM:
        return 60;
      case BreakpointConstants.BREAKPOINT_MD:
        return 80;
      case BreakpointConstants.BREAKPOINT_LG:
      case BreakpointConstants.BREAKPOINT_XL:
        return 100;
      default:
        return 60;
    }
  }
  
  private getSidePadding(): number {
    return DeviceUtils.getSpacing();
  }
  
  private getIconSize(): number {
    return BreakpointSystem.getFontSize(this.currentBreakpoint, 40);
  }
  
  private getCardTitleSize(): number {
    return BreakpointSystem.getFontSize(this.currentBreakpoint, 20);
  }
  
  private getCardDescSize(): number {
    return BreakpointSystem.getFontSize(this.currentBreakpoint, 14);
  }
  
  private getCardPadding(): number {
    return DeviceUtils.getSpacing() + 4;
  }
  
  private getCardRadius(): number {
    return DeviceUtils.getCardRadius();
  }
}
