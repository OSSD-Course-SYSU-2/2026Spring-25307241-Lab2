/**
 * 冰迹花滑 - 搜索栏组件
 */

@Component
export struct IceSearchBar {
  @Link searchText: string;                    // 搜索文本(双向绑定)
  @Prop placeholder: string = '搜索...';       // 占位文本
  @Prop showSearchButton: boolean = true;      // 是否显示搜索按钮
  
  onSearch?: (text: string) => void;           // 搜索事件
  onClear?: () => void;                        // 清空事件
  
  build() {
    Row() {
      // 搜索图标
      Text('🔍')
        .fontSize(18)
        .margin({ left: 12 })
      
      // 输入框
      TextInput({ placeholder: this.placeholder, text: this.searchText })
        .layoutWeight(1)
        .height(40)
        .backgroundColor(Color.Transparent)
        .placeholderColor('#999999')
        .fontColor('#333333')
        .onChange((value: string) => {
          this.searchText = value;
        })
        .onSubmit(() => {
          if (this.onSearch) {
            this.onSearch(this.searchText);
          }
        })
      
      // 清空按钮
      if (this.searchText) {
        Button() {
          Text('×')
            .fontSize(18)
            .fontColor('#999999')
        }
        .width(32)
        .height(32)
        .backgroundColor(Color.Transparent)
        .onClick(() => {
          this.searchText = '';
          if (this.onClear) {
            this.onClear();
          }
        })
      }
      
      // 搜索按钮
      if (this.showSearchButton) {
        Button('搜索')
          .fontSize(14)
          .height(32)
          .backgroundColor('#4FC3F7')
          .fontColor('#FFFFFF')
          .borderRadius(16)
          .margin({ right: 8 })
          .onClick(() => {
            if (this.onSearch) {
              this.onSearch(this.searchText);
            }
          })
      }
    }
    .width('100%')
    .height(48)
    .backgroundColor('#F5F5F5')
    .borderRadius(24)
  }
}
