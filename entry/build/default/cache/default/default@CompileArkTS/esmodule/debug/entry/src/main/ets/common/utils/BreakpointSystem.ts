import mediaquery from "@ohos:mediaquery";
export class BreakpointConstants {
    // 断点类型
    static readonly BREAKPOINT_SM: string = 'sm'; // 小屏设备(手机)
    static readonly BREAKPOINT_MD: string = 'md'; // 中屏设备(折叠屏、小平板)
    static readonly BREAKPOINT_LG: string = 'lg'; // 大屏设备(平板)
    static readonly BREAKPOINT_XL: string = 'xl'; // 超大屏设备(PC/2in1)
    // 断点范围(vp)
    static readonly BREAKPOINT_SM_MAX: number = 600;
    static readonly BREAKPOINT_MD_MAX: number = 840;
    static readonly BREAKPOINT_LG_MAX: number = 1440;
}
export class BreakpointSystem {
    private currentBreakpoint: string = BreakpointConstants.BREAKPOINT_SM;
    private listener: mediaquery.MediaQueryListener | null = null;
    private callbacks: Array<(breakpoint: string) => void> = [];
    /**
     * 注册断点监听
     */
    register(context: Context): void {
        // 监听小屏断点
        this.addListener(context, `(0vp<=width<${BreakpointConstants.BREAKPOINT_SM_MAX}vp)`, BreakpointConstants.BREAKPOINT_SM);
        // 监听中屏断点
        this.addListener(context, `(${BreakpointConstants.BREAKPOINT_SM_MAX}vp<=width<${BreakpointConstants.BREAKPOINT_MD_MAX}vp)`, BreakpointConstants.BREAKPOINT_MD);
        // 监听大屏断点
        this.addListener(context, `(${BreakpointConstants.BREAKPOINT_MD_MAX}vp<=width<${BreakpointConstants.BREAKPOINT_LG_MAX}vp)`, BreakpointConstants.BREAKPOINT_LG);
        // 监听超大屏断点
        this.addListener(context, `(${BreakpointConstants.BREAKPOINT_LG_MAX}vp<=width)`, BreakpointConstants.BREAKPOINT_XL);
    }
    /**
     * 添加媒体查询监听器
     */
    private addListener(context: Context, condition: string, breakpoint: string): void {
        try {
            this.listener = mediaquery.matchMediaSync(condition);
            this.listener.on('change', (result: mediaquery.MediaQueryResult) => {
                if (result.matches) {
                    this.currentBreakpoint = breakpoint;
                    // 通知所有监听者
                    this.callbacks.forEach(callback => callback(breakpoint));
                }
            });
        }
        catch (error) {
            console.error(`BreakpointSystem: Failed to add listener for ${breakpoint}`, error);
        }
    }
    /**
     * 获取当前断点
     */
    getCurrentBreakpoint(): string {
        return this.currentBreakpoint;
    }
    /**
     * 注册断点变化回调
     */
    onBreakpointChange(callback: (breakpoint: string) => void): void {
        this.callbacks.push(callback);
    }
    /**
     * 取消注册
     */
    unregister(): void {
        if (this.listener) {
            this.listener.off('change');
            this.listener = null;
        }
        this.callbacks = [];
    }
    /**
     * 根据断点获取列数(用于栅格布局)
     */
    static getColumns(breakpoint: string): number {
        switch (breakpoint) {
            case BreakpointConstants.BREAKPOINT_SM:
                return 4; // 手机4列
            case BreakpointConstants.BREAKPOINT_MD:
                return 8; // 中屏8列
            case BreakpointConstants.BREAKPOINT_LG:
                return 12; // 大屏12列
            case BreakpointConstants.BREAKPOINT_XL:
                return 12; // 超大屏12列
            default:
                return 4;
        }
    }
    /**
     * 根据断点获取字体大小
     */
    static getFontSize(breakpoint: string, baseSize: number): number {
        switch (breakpoint) {
            case BreakpointConstants.BREAKPOINT_SM:
                return baseSize;
            case BreakpointConstants.BREAKPOINT_MD:
                return baseSize * 1.1;
            case BreakpointConstants.BREAKPOINT_LG:
                return baseSize * 1.2;
            case BreakpointConstants.BREAKPOINT_XL:
                return baseSize * 1.3;
            default:
                return baseSize;
        }
    }
}
