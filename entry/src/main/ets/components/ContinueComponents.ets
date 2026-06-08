/**
 * 流转UI组件
 * 提供流转状态显示和用户交互
 */
import { AbilityConstant, UIAbility, Want } from '@kit.AbilityKit';
import { hilog } from '@kit.PerformanceAnalysisKit';
import { DeviceUtils } from '../common/utils/DeviceUtils';

const TAG = 'ContinueManager';
const DOMAIN_NUMBER = 0xFF00;

export class ContinueManager {
  private static instance: ContinueManager;
  private isContinuing: boolean = false;
  
  private constructor() {}
  
  static getInstance(): ContinueManager {
    if (!ContinueManager.instance) {
      ContinueManager.instance = new ContinueManager();
    }
    return ContinueManager.instance;
  }
  
  /**
   * 获取流转状态
   */
  isContinuingState(): boolean {
    return this.isContinuing;
  }
  
  /**
   * 设置流转状态
   */
  setContinuingState(state: boolean): void {
    this.isContinuing = state;
    AppStorage.setOrCreate('isContinuing', state);
  }
  
  /**
   * 获取设备类型显示名称
   */
  getDeviceDisplayName(): string {
    if (DeviceUtils.isWearable()) {
      return '手表';
    } else if (DeviceUtils.isPhone()) {
      return '手机';
    } else if (DeviceUtils.isTablet()) {
      return '平板';
    } else if (DeviceUtils.is2In1()) {
      return 'PC';
    } else {
      return '设备';
    }
  }
  
  /**
   * 获取流转提示信息
   */
  getContinueTip(): string {
    const deviceName = this.getDeviceDisplayName();
    if (this.isContinuing) {
      return `正在从其他${deviceName}恢复数据...`;
    } else {
      return `可以流转到其他${deviceName}`;
    }
  }
  
  /**
   * 保存当前页面状态
   */
  saveCurrentPageState(pagePath: string, additionalData?: Record<string, Object>): void {
    try {
      // 保存当前页面路径
      AppStorage.setOrCreate('currentPage', pagePath);
      
      // 保存额外数据
      if (additionalData) {
        Object.keys(additionalData).forEach(key => {
          AppStorage.setOrCreate(key, additionalData[key]);
        });
      }
      
      hilog.info(DOMAIN_NUMBER, TAG, `Page state saved: ${pagePath}`);
    } catch (error) {
      hilog.error(DOMAIN_NUMBER, TAG, `Failed to save page state: ${JSON.stringify(error)}`);
    }
  }
  
  /**
   * 恢复页面状态
   */
  restorePageState(): Record<string, Object> | null {
    try {
      const currentPage = AppStorage.get<string>('continuePage');
      if (!currentPage) {
        return null;
      }
      
      const state: Record<string, Object> = {
        currentPage: currentPage
      };
      
      // 清除临时状态
      AppStorage.delete('continuePage');
      
      hilog.info(DOMAIN_NUMBER, TAG, `Page state restored: ${currentPage}`);
      return state;
    } catch (error) {
      hilog.error(DOMAIN_NUMBER, TAG, `Failed to restore page state: ${JSON.stringify(error)}`);
      return null;
    }
  }
}

/**
 * 流转状态指示器组件
 */
@Component
export struct ContinueIndicator {
  @StorageLink('isContinuing') isContinuing: boolean = false;
  
  build() {
    if (this.isContinuing) {
      Row() {
        LoadingProgress()
          .width(20)
          .height(20)
          .color('#FFFFFF')
        
        Text('正在恢复数据...')
          .fontSize(14)
          .fontColor('#FFFFFF')
          .margin({ left: 8 })
      }
      .padding({ left: 16, right: 16, top: 8, bottom: 8 })
      .backgroundColor('rgba(0, 0, 0, 0.6)')
      .borderRadius(20)
    }
  }
}

/**
 * 流转按钮组件
 */
@Component
export struct ContinueButton {
  @StorageLink('isContinuing') isContinuing: boolean = false;
  private onContinueCallback?: () => void;
  
  aboutToAppear() {
    this.onContinueCallback = () => {
      // 触发流转
      hilog.info(DOMAIN_NUMBER, TAG, 'Continue button clicked');
    };
  }
  
  build() {
    if (!this.isContinuing && !DeviceUtils.isWearable()) {
      Button({ type: ButtonType.Circle }) {
        Text('🔄')
          .fontSize(20)
      }
      .width(44)
      .height(44)
      .backgroundColor('rgba(255, 255, 255, 0.3)')
      .onClick(() => {
        if (this.onContinueCallback) {
          this.onContinueCallback();
        }
      })
    }
  }
}
