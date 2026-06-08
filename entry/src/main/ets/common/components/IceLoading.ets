/**
 * 冰迹花滑 - 加载状态组件
 */

@Component
export struct IceLoading {
  @Prop text: string = '加载中...';           // 提示文字
  @Prop size: 'small' | 'medium' | 'large' = 'medium';
  
  build() {
    Column() {
      LoadingProgress()
        .width(this.getSize())
        .height(this.getSize())
        .color('#4FC3F7')
      
      if (this.text) {
        Text(this.text)
          .fontSize(14)
          .fontColor('#666666')
          .margin({ top: 16 })
      }
    }
    .width('100%')
    .padding(32)
    .justifyContent(FlexAlign.Center)
    .alignItems(HorizontalAlign.Center)
  }
  
  private getSize(): number {
    switch (this.size) {
      case 'small': return 24;
      case 'medium': return 48;
      case 'large': return 64;
      default: return 48;
    }
  }
}
