/**
 * 冰迹花滑 - 空状态组件
 */

@Component
export struct IceEmpty {
  @Prop icon: string = '📭';                  // 图标
  @Prop title: string = '暂无数据';            // 标题
  @Prop description: string = '';             // 描述
  @Prop buttonText: string = '';              // 按钮文字
  
  onButtonClick?: () => void;                 // 按钮点击事件
  
  build() {
    Column() {
      Text(this.icon)
        .fontSize(64)
        .margin({ bottom: 16 })
      
      Text(this.title)
        .fontSize(16)
        .fontColor('#666666')
        .margin({ bottom: 8 })
      
      if (this.description) {
        Text(this.description)
          .fontSize(14)
          .fontColor('#999999')
          .textAlign(TextAlign.Center)
          .margin({ bottom: 16 })
      }
      
      if (this.buttonText) {
        Button(this.buttonText)
          .fontSize(14)
          .height(40)
          .backgroundColor('#4FC3F7')
          .fontColor('#FFFFFF')
          .borderRadius(20)
          .onClick(() => {
            if (this.onButtonClick) {
              this.onButtonClick();
            }
          })
      }
    }
    .width('100%')
    .padding(32)
    .justifyContent(FlexAlign.Center)
    .alignItems(HorizontalAlign.Center)
  }
}
