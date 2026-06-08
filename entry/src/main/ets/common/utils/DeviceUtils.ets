/**
 * 设备适配工具类
 * 用于处理不同设备类型的特定逻辑
 */
import { deviceInfo } from '@kit.BasicServicesKit';

export class DeviceType {
  static readonly PHONE: string = 'phone';
  static readonly TABLET: string = 'tablet';
  static readonly TWO_IN_ONE: string = '2in1';
  static readonly TV: string = 'tv';
  static readonly WEARABLE: string = 'wearable';
  static readonly CAR: string = 'car';
  static readonly DEFAULT: string = 'default';
}

export class DeviceUtils {
  /**
   * 获取当前设备类型
   */
  static getDeviceType(): string {
    return deviceInfo.deviceType;
  }
  
  /**
   * 判断是否为手机设备
   */
  static isPhone(): boolean {
    return deviceInfo.deviceType === DeviceType.PHONE || 
           deviceInfo.deviceType === DeviceType.DEFAULT;
  }
  
  /**
   * 判断是否为平板设备
   */
  static isTablet(): boolean {
    return deviceInfo.deviceType === DeviceType.TABLET;
  }
  
  /**
   * 判断是否为PC/2in1设备
   */
  static is2In1(): boolean {
    return deviceInfo.deviceType === DeviceType.TWO_IN_ONE;
  }
  
  /**
   * 判断是否为智慧屏设备
   */
  static isTV(): boolean {
    return deviceInfo.deviceType === DeviceType.TV;
  }
  
  /**
   * 判断是否为穿戴设备
   */
  static isWearable(): boolean {
    return deviceInfo.deviceType === DeviceType.WEARABLE;
  }
  
  /**
   * 判断是否为车机设备
   */
  static isCar(): boolean {
    return deviceInfo.deviceType === DeviceType.CAR;
  }
  
  /**
   * 判断是否为大屏设备(平板或PC)
   */
  static isLargeScreen(): boolean {
    return DeviceUtils.isTablet() || DeviceUtils.is2In1();
  }
  
  /**
   * 根据设备类型获取合适的间距
   */
  static getSpacing(): number {
    if (DeviceUtils.isWearable()) {
      return 8; // 手表使用最小间距
    } else if (DeviceUtils.isPhone()) {
      return 16; // 手机使用较小间距
    } else if (DeviceUtils.isTablet()) {
      return 24; // 平板使用中等间距
    } else if (DeviceUtils.is2In1()) {
      return 32; // PC使用较大间距
    } else {
      return 16; // 默认间距
    }
  }
  
  /**
   * 根据设备类型获取合适的按钮高度
   */
  static getButtonHeight(): number {
    if (DeviceUtils.isWearable()) {
      return 36; // 手表使用较小的按钮高度
    } else if (DeviceUtils.isPhone()) {
      return 48;
    } else if (DeviceUtils.isTablet()) {
      return 56;
    } else if (DeviceUtils.is2In1()) {
      return 64;
    } else {
      return 48;
    }
  }
  
  /**
   * 根据设备类型获取合适的卡片圆角
   */
  static getCardRadius(): number {
    if (DeviceUtils.isWearable()) {
      return 8; // 手表使用较小的圆角
    } else if (DeviceUtils.isPhone()) {
      return 12;
    } else if (DeviceUtils.isTablet()) {
      return 16;
    } else if (DeviceUtils.is2In1()) {
      return 20;
    } else {
      return 12;
    }
  }
  
  /**
   * 根据设备类型获取合适的字体大小缩放比例
   */
  static getFontScale(): number {
    if (DeviceUtils.isWearable()) {
      return 0.8; // 手表字体缩小
    } else if (DeviceUtils.isPhone()) {
      return 1.0;
    } else if (DeviceUtils.isTablet()) {
      return 1.1;
    } else if (DeviceUtils.is2In1()) {
      return 1.2;
    } else {
      return 1.0;
    }
  }
  
  /**
   * 判断是否为小屏设备（手表或手机）
   */
  static isSmallScreen(): boolean {
    return DeviceUtils.isWearable() || DeviceUtils.isPhone();
  }
  
  /**
   * 检查设备是否支持特定能力
   */
  static hasCapability(capability: string): boolean {
    // 使用canIUse检查系统能力
    return canIUse(capability);
  }
}
