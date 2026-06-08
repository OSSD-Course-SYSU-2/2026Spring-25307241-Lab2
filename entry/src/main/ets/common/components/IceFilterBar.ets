/**
 * 冰迹花滑 - 筛选栏组件
 * 支持多条件筛选
 */

@Component
export struct IceFilterBar {
  @Prop filters: FilterItem[] = [];           // 筛选项列表
  @Link activeFilters: string[];              // 当前激活的筛选条件
  
  onFilterChange?: (filters: string[]) => void;  // 筛选变化事件
  
  build() {
    Scroll() {
      Row() {
        ForEach(this.filters, (filter: FilterItem) => {
          this.FilterButton(filter);
        }, (filter: FilterItem) => filter.id)
      }
      .padding({ left: 16, right: 16 })
    }
    .width('100%')
    .height(48)
    .scrollable(ScrollDirection.Horizontal)
    .scrollBar(BarState.Off)
  }
  
  @Builder
  FilterButton(filter: FilterItem) {
    Button(filter.label)
      .fontSize(14)
      .height(32)
      .padding({ left: 16, right: 16 })
      .backgroundColor(this.isActive(filter.id) ? '#4FC3F7' : '#F5F5F5')
      .fontColor(this.isActive(filter.id) ? '#FFFFFF' : '#666666')
      .borderRadius(16)
      .margin({ right: 8 })
      .onClick(() => {
        this.toggleFilter(filter.id);
      })
  }
  
  private isActive(filterId: string): boolean {
    return this.activeFilters.includes(filterId);
  }
  
  private toggleFilter(filterId: string): void {
    const index = this.activeFilters.indexOf(filterId);
    if (index > -1) {
      // 移除筛选
      this.activeFilters.splice(index, 1);
    } else {
      // 添加筛选
      this.activeFilters.push(filterId);
    }
    
    if (this.onFilterChange) {
      this.onFilterChange(this.activeFilters);
    }
  }
}

/**
 * 筛选项定义
 */
export interface FilterItem {
  id: string;          // 筛选项ID
  label: string;       // 显示文本
  value?: string;      // 筛选值
}
