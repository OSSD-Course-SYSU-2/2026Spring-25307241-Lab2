/**
 * 冰迹花滑 - 统一导航栏组件
 * 支持返回按钮、标题、右侧操作按钮
 */

import router from '@ohos.router';

@Component
export struct IceNavBar {
  @Prop title: string = '';                    // 标题
  @Prop showBack: boolean = true;              // 是否显示返回按钮
  @Prop backText: string = '';                 // 返回按钮文字(可选)
  @Prop rightIcon: string = '';                // 右侧图标
  @Prop rightText: string = '';                // 右侧文字
  @Prop navBackgroundColor: string = '#4FC3F7';   // 背景色
  @Prop textColor: string = '#FFFFFF';         // 文字颜色
  
  onRightClick?: () => void;                   // 右侧按钮点击事件
  onBackClick?: () => void;                    // 返回按钮点击事件(可选)
  
  build() {
    Row() {
      // 左侧返回按钮
      if (this.showBack) {
        Button() {
          Row() {
            Text('←')
              .fontSize(20)
              .fontColor(this.textColor)
            
            if (this.backText) {
              Text(this.backText)
                .fontSize(16)
                .fontColor(this.textColor)
                .margin({ left: 4 })
            }
          }
        }
        .width(this.backText ? 60 : 40)
        .height(40)
        .backgroundColor(Color.Transparent)
        .onClick(() => {
          if (this.onBackClick) {
            this.onBackClick();
          } else {
            router.back();
          }
        })
      } else {
        Blank().width(40)
      }
      
      // 中间标题
      Text(this.title)
        .fontSize(18)
        .fontColor(this.textColor)
        .fontWeight(FontWeight.Bold)
        .layoutWeight(1)
        .textAlign(TextAlign.Center)
      
      // 右侧操作按钮
      if (this.rightIcon || this.rightText) {
        Button() {
          Row() {
            if (this.rightIcon) {
              Text(this.rightIcon)
                .fontSize(20)
                .fontColor(this.textColor)
            }
            if (this.rightText) {
              Text(this.rightText)
                .fontSize(16)
                .fontColor(this.textColor)
                .margin({ left: this.rightIcon ? 4 : 0 })
            }
          }
        }
        .width(this.rightText ? 60 : 40)
        .height(40)
        .backgroundColor(Color.Transparent)
        .onClick(() => {
          if (this.onRightClick) {
            this.onRightClick();
          }
        })
      } else {
        Blank().width(40)
      }
    }
    .width('100%')
    .height(56)
    .padding({ left: 8, right: 8 })
    .backgroundColor(this.navBackgroundColor)
  }
}
