/**
 * 冰迹花滑 - 卡片容器组件
 * 统一的卡片样式，支持标题、内容、点击事件
 */

@Component
export struct IceCard {
  @Prop title: string = '';                    // 卡片标题
  @Prop subtitle: string = '';                 // 副标题
  @Prop showBorder: boolean = true;            // 是否显示边框
  @Prop cardPadding: number = 16;              // 内边距
  @Prop cardMargin: number = 8;                // 外边距
  @Prop cardBorderRadius: number = 12;         // 圆角
  @Prop cardBackgroundColor: string = '#FFFFFF'; // 背景色
  
  onCardClick?: () => void;                    // 卡片点击事件
  
  @BuilderParam content: () => void;           // 卡片内容
  
  build() {
    Column() {
      // 标题区域
      if (this.title) {
        Row() {
          Text(this.title)
            .fontSize(16)
            .fontWeight(FontWeight.Bold)
            .fontColor('#333333')
          
          if (this.subtitle) {
            Text(this.subtitle)
              .fontSize(12)
              .fontColor('#999999')
              .margin({ left: 8 })
          }
          
          Blank()
          
          if (this.onCardClick) {
            Text('›')
              .fontSize(20)
              .fontColor('#999999')
          }
        }
        .width('100%')
        .margin({ bottom: 12 })
      }
      
      // 内容区域
      if (this.content) {
        this.content();
      }
    }
    .width('100%')
    .padding(this.cardPadding)
    .margin(this.cardMargin)
    .backgroundColor(this.cardBackgroundColor)
    .borderRadius(this.cardBorderRadius)
    .shadow({
      radius: this.showBorder ? 8 : 0,
      color: '#1A000000',
      offsetX: 0,
      offsetY: 2
    })
    .onClick(() => {
      if (this.onCardClick) {
        this.onCardClick();
      }
    })
  }
}
