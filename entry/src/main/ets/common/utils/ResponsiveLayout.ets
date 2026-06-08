/**
 * 响应式布局辅助工具
 * 提供便捷的多设备适配方法
 */
import { DeviceUtils } from './DeviceUtils';
import { BreakpointSystem, BreakpointConstants } from './BreakpointSystem';

export class ResponsiveLayout {
  private static instance: ResponsiveLayout;
  private breakpointSystem: BreakpointSystem = new BreakpointSystem();
  private currentBreakpoint: string = BreakpointConstants.BREAKPOINT_SM;
  
  private constructor() {
    // 注册断点变化监听
    this.breakpointSystem.onBreakpointChange((breakpoint: string) => {
      this.currentBreakpoint = breakpoint;
    });
  }
  
  static getInstance(): ResponsiveLayout {
    if (!ResponsiveLayout.instance) {
      ResponsiveLayout.instance = new ResponsiveLayout();
    }
    return ResponsiveLayout.instance;
  }
  
  /**
   * 初始化响应式布局系统
   */
  initialize(context: Context): void {
    this.breakpointSystem.register(context);
  }
  
  /**
   * 获取当前断点
   */
  getCurrentBreakpoint(): string {
    return this.currentBreakpoint;
  }
  
  /**
   * 根据设备类型获取合适的字体大小
   */
  getFontSize(baseSize: number): number {
    // 手表设备特殊处理
    if (DeviceUtils.isWearable()) {
      return Math.round(baseSize * 0.75);
    }
    
    // 使用断点系统计算
    return Math.round(BreakpointSystem.getFontSize(this.currentBreakpoint, baseSize));
  }
  
  /**
   * 根据设备类型获取合适的间距
   */
  getSpacing(baseSpacing: number): number {
    if (DeviceUtils.isWearable()) {
      return Math.round(baseSpacing * 0.5);
    } else if (DeviceUtils.isPhone()) {
      return baseSpacing;
    } else if (DeviceUtils.isTablet()) {
      return Math.round(baseSpacing * 1.25);
    } else if (DeviceUtils.is2In1()) {
      return Math.round(baseSpacing * 1.5);
    }
    return baseSpacing;
  }
  
  /**
   * 根据设备类型获取合适的尺寸
   */
  getSize(baseSize: number): number {
    if (DeviceUtils.isWearable()) {
      return Math.round(baseSize * 0.6);
    } else if (DeviceUtils.isPhone()) {
      return baseSize;
    } else if (DeviceUtils.isTablet()) {
      return Math.round(baseSize * 1.2);
    } else if (DeviceUtils.is2In1()) {
      return Math.round(baseSize * 1.4);
    }
    return baseSize;
  }
  
  /**
   * 获取网格列数
   */
  getGridColumns(): number {
    if (DeviceUtils.isWearable()) {
      return 3;
    }
    return BreakpointSystem.getColumns(this.currentBreakpoint);
  }
  
  /**
   * 获取内容区域最大宽度
   */
  getMaxContentWidth(): number | string {
    if (DeviceUtils.isWearable()) {
      return '100%';
    } else if (DeviceUtils.isPhone()) {
      return '100%';
    } else if (DeviceUtils.isTablet()) {
      return 800;
    } else if (DeviceUtils.is2In1()) {
      return 1200;
    }
    return '100%';
  }
  
  /**
   * 判断是否应该显示侧边栏
   */
  shouldShowSidebar(): boolean {
    return DeviceUtils.isTablet() || DeviceUtils.is2In1();
  }
  
  /**
   * 判断是否应该使用双栏布局
   */
  shouldUseTwoColumnLayout(): boolean {
    return this.currentBreakpoint === BreakpointConstants.BREAKPOINT_LG ||
           this.currentBreakpoint === BreakpointConstants.BREAKPOINT_XL;
  }
  
  /**
   * 获取卡片样式
   */
  getCardStyle(): CardStyle {
    const baseRadius = DeviceUtils.getCardRadius();
    const basePadding = this.getSpacing(16);
    
    return {
      borderRadius: baseRadius,
      padding: basePadding,
      shadow: {
        radius: DeviceUtils.isWearable() ? 5 : 10,
        color: 'rgba(0, 0, 0, 0.1)',
        offsetX: 0,
        offsetY: DeviceUtils.isWearable() ? 2 : 4
      }
    };
  }
  
  /**
   * 获取按钮样式
   */
  getButtonStyle(): ButtonStyle {
    const baseHeight = DeviceUtils.getButtonHeight();
    
    return {
      height: baseHeight,
      minWidth: DeviceUtils.isWearable() ? 60 : 80,
      borderRadius: Math.round(baseHeight / 2),
      fontSize: this.getFontSize(16)
    };
  }
  
  /**
   * 清理资源
   */
  cleanup(): void {
    this.breakpointSystem.unregister();
  }
}

/**
 * 卡片样式接口
 */
export interface CardStyle {
  borderRadius: number;
  padding: number;
  shadow: {
    radius: number;
    color: string;
    offsetX: number;
    offsetY: number;
  };
}

/**
 * 按钮样式接口
 */
export interface ButtonStyle {
  height: number;
  minWidth: number;
  borderRadius: number;
  fontSize: number;
}

/**
 * 响应式装饰器 - 自动适配字体大小
 */
export function ResponsiveFontSize(baseSize: number): PropertyDecorator {
  return (target: Object, propertyKey: string | symbol) => {
    const getter = function() {
      return ResponsiveLayout.getInstance().getFontSize(baseSize);
    };
    
    Object.defineProperty(target, propertyKey, {
      get: getter,
      enumerable: true,
      configurable: true
    });
  };
}

/**
 * 响应式装饰器 - 自动适配间距
 */
export function ResponsiveSpacing(baseSpacing: number): PropertyDecorator {
  return (target: Object, propertyKey: string | symbol) => {
    const getter = function() {
      return ResponsiveLayout.getInstance().getSpacing(baseSpacing);
    };
    
    Object.defineProperty(target, propertyKey, {
      get: getter,
      enumerable: true,
      configurable: true
    });
  };
}
