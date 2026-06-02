/**
 * 响应式布局示例组件
 * 展示如何在不同设备上实现自适应UI
 */
import { BreakpointSystem, BreakpointConstants } from '../common/utils/BreakpointSystem';
import { DeviceUtils } from '../common/utils/DeviceUtils';

@Component
export struct ResponsiveLayoutExample {
  @State currentBreakpoint: string = BreakpointConstants.BREAKPOINT_SM;
  private breakpointSystem: BreakpointSystem = new BreakpointSystem();
  
  aboutToAppear(): void {
    this.breakpointSystem.register(getContext(this) as Context);
    this.breakpointSystem.onBreakpointChange((breakpoint: string) => {
      this.currentBreakpoint = breakpoint;
    });
  }
  
  aboutToDisappear(): void {
    this.breakpointSystem.unregister();
  }
  
  build() {
    Column() {
      // 示例1: 根据断点调整布局
      this.LayoutExample();
      
      // 示例2: 使用栅格系统
      this.GridExample();
      
      // 示例3: 设备特定功能
      this.DeviceSpecificExample();
    }
    .width('100%')
    .padding(16)
  }
  
  /**
   * 示例1: 根据断点调整布局
   */
  @Builder
  LayoutExample() {
    Column() {
      Text('布局自适应示例')
        .fontSize(20)
        .fontWeight(FontWeight.Bold)
        .margin({ bottom: 16 })
      
      // 根据断点显示不同的布局方向
      if (this.currentBreakpoint === BreakpointConstants.BREAKPOINT_SM) {
        // 手机: 垂直布局
        Column({ space: 10 }) {
          this.ContentCard('卡片1')
          this.ContentCard('卡片2')
        }
      } else {
        // 平板和PC: 水平布局
        Row({ space: 10 }) {
          this.ContentCard('卡片1')
          this.ContentCard('卡片2')
        }
      }
    }
    .width('100%')
    .margin({ bottom: 20 })
  }
  
  /**
   * 示例2: 使用栅格系统
   */
  @Builder
  GridExample() {
    Column() {
      Text('栅格布局示例')
        .fontSize(20)
        .fontWeight(FontWeight.Bold)
        .margin({ bottom: 16 })
      
      GridRow({
        columns: { sm: 4, md: 8, lg: 12 },
        gutter: { x: 12, y: 12 }
      }) {
        // 4个卡片,在不同设备上显示不同列数
        ForEach([1, 2, 3, 4], (item: number) => {
          GridCol({ 
            span: { 
              sm: 2,  // 手机: 2列(每个卡片占2列)
              md: 4,  // 平板: 2列(每个卡片占4列)
              lg: 3   // PC: 4列(每个卡片占3列)
            } 
          }) {
            this.GridItem(`项目 ${item}`)
          }
        })
      }
    }
    .width('100%')
    .margin({ bottom: 20 })
  }
  
  /**
   * 示例3: 设备特定功能
   */
  @Builder
  DeviceSpecificExample() {
    Column() {
      Text('设备特定功能示例')
        .fontSize(20)
        .fontWeight(FontWeight.Bold)
        .margin({ bottom: 16 })
      
      // 显示当前设备信息
      Column({ space: 8 }) {
        Text(`当前设备: ${DeviceUtils.getDeviceType()}`)
          .fontSize(14)
        
        Text(`当前断点: ${this.currentBreakpoint}`)
          .fontSize(14)
        
        Text(`是否大屏: ${DeviceUtils.isLargeScreen() ? '是' : '否'}`)
          .fontSize(14)
        
        // PC端特定功能
        if (DeviceUtils.is2In1()) {
          Row({ space: 10 }) {
            Button('键盘快捷键')
              .fontSize(14)
            
            Button('鼠标右键菜单')
              .fontSize(14)
          }
          .margin({ top: 10 })
        }
        
        // 平板特定功能
        if (DeviceUtils.isTablet()) {
          Button('分屏模式')
            .fontSize(14)
            .margin({ top: 10 })
        }
      }
      .alignItems(HorizontalAlign.Start)
    }
    .width('100%')
  }
  
  /**
   * 内容卡片组件
   */
  @Builder
  ContentCard(title: string) {
    Column() {
      Text(title)
        .fontSize(16)
        .fontWeight(FontWeight.Medium)
    }
    .width('100%')
    .height(100)
    .backgroundColor('#F0F0F0')
    .borderRadius(8)
    .justifyContent(FlexAlign.Center)
  }
  
  /**
   * 栅格项组件
   */
  @Builder
  GridItem(title: string) {
    Column() {
      Text(title)
        .fontSize(14)
    }
    .width('100%')
    .height(80)
    .backgroundColor('#E8E8E8')
    .borderRadius(8)
    .justifyContent(FlexAlign.Center)
  }
}
