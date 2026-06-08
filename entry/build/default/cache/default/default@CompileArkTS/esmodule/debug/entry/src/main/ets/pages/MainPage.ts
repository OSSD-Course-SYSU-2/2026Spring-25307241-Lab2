if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface MainPage_Params {
    currentBreakpoint?: string;
    breakpointSystem?: BreakpointSystem;
}
import router from "@ohos:router";
import { BreakpointSystem, BreakpointConstants } from "@bundle:com.example.simplecalculator/entry/ets/common/utils/BreakpointSystem";
import { DeviceUtils } from "@bundle:com.example.simplecalculator/entry/ets/common/utils/DeviceUtils";
class MainPage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__currentBreakpoint = new ObservedPropertySimplePU(BreakpointConstants.BREAKPOINT_SM, this, "currentBreakpoint");
        this.breakpointSystem = new BreakpointSystem();
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: MainPage_Params) {
        if (params.currentBreakpoint !== undefined) {
            this.currentBreakpoint = params.currentBreakpoint;
        }
        if (params.breakpointSystem !== undefined) {
            this.breakpointSystem = params.breakpointSystem;
        }
    }
    updateStateVars(params: MainPage_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__currentBreakpoint.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__currentBreakpoint.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __currentBreakpoint: ObservedPropertySimplePU<string>;
    get currentBreakpoint() {
        return this.__currentBreakpoint.get();
    }
    set currentBreakpoint(newValue: string) {
        this.__currentBreakpoint.set(newValue);
    }
    private breakpointSystem: BreakpointSystem;
    aboutToAppear(): void {
        // 注册断点监听
        this.breakpointSystem.register(getContext(this) as Context);
        this.currentBreakpoint = this.breakpointSystem.getCurrentBreakpoint();
        // 监听断点变化
        this.breakpointSystem.onBreakpointChange((breakpoint: string) => {
            this.currentBreakpoint = breakpoint;
        });
    }
    aboutToDisappear(): void {
        this.breakpointSystem.unregister();
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.height('100%');
            Column.linearGradient({
                angle: 135,
                colors: [['#667eea', 0.0], ['#764ba2', 1.0]]
            });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 标题区域 - 使用响应式布局
            Column.create();
            // 标题区域 - 使用响应式布局
            Column.width('100%');
            // 标题区域 - 使用响应式布局
            Column.height(this.getTitleHeight());
            // 标题区域 - 使用响应式布局
            Column.justifyContent(FlexAlign.Center);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('计算器应用');
            Text.fontSize(this.getTitleFontSize());
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#333333');
            Text.margin({ top: this.getTopMargin(), bottom: 20 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('请选择计算器类型');
            Text.fontSize(this.getSubTitleFontSize());
            Text.fontColor('#666666');
        }, Text);
        Text.pop();
        // 标题区域 - 使用响应式布局
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 计算器选择区域 - 使用栅格布局实现响应式
            GridRow.create({
                columns: {
                    sm: 4,
                    md: 8,
                    lg: 12,
                    xl: 12 // 超大屏: 12列
                },
                gutter: { x: 16, y: 16 },
                breakpoints: {
                    value: ['320vp', '600vp', '840vp', '1440vp'],
                    reference: BreakpointsReference.WindowSize
                }
            });
            // 计算器选择区域 - 使用栅格布局实现响应式
            GridRow.width('100%');
            // 计算器选择区域 - 使用栅格布局实现响应式
            GridRow.padding({ left: this.getSidePadding(), right: this.getSidePadding() });
            // 计算器选择区域 - 使用栅格布局实现响应式
            GridRow.layoutWeight(1);
        }, GridRow);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 技术元素计算器卡片
            GridCol.create({
                span: { sm: 4, md: 4, lg: 6, xl: 6 },
                offset: { sm: 0, md: 0, lg: 0, xl: 0 }
            });
        }, GridCol);
        this.CalculatorCard.bind(this)('⛸️', '技术元素计算器', '计算跳跃、旋转、步法得分', 'pages/HomePage');
        // 技术元素计算器卡片
        GridCol.pop();
        // 计算器选择区域 - 使用栅格布局实现响应式
        GridRow.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 底部信息
            Column.create();
            // 底部信息
            Column.width('100%');
            // 底部信息
            Column.height(80);
            // 底部信息
            Column.justifyContent(FlexAlign.Center);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('基于HarmonyOS开发 | 支持多端部署');
            Text.fontSize(12);
            Text.fontColor('#CCCCCC');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(`当前设备: ${DeviceUtils.getDeviceType()} | 断点: ${this.currentBreakpoint}`);
            Text.fontSize(10);
            Text.fontColor('#AAAAAA');
            Text.margin({ top: 5 });
        }, Text);
        Text.pop();
        // 底部信息
        Column.pop();
        Column.pop();
    }
    /**
     * 计算器卡片组件
     */
    CalculatorCard(icon: string, title: string, description: string, targetPage: string, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.backgroundColor(Color.White);
            Column.borderRadius(this.getCardRadius());
            Column.shadow({ radius: 10, color: '#E0E0E0', offsetX: 0, offsetY: 5 });
            Column.onClick(() => {
                router.pushUrl({ url: targetPage });
            });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.padding(this.getCardPadding());
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(icon);
            Text.fontSize(this.getIconSize());
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.alignItems(HorizontalAlign.Start);
            Column.margin({ left: 15 });
            Column.layoutWeight(1);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(title);
            Text.fontSize(this.getCardTitleSize());
            Text.fontWeight(FontWeight.Medium);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(description);
            Text.fontSize(this.getCardDescSize());
            Text.fontColor('#999999');
            Text.margin({ top: 5 });
        }, Text);
        Text.pop();
        Column.pop();
        Row.pop();
        Column.pop();
    }
    // 响应式尺寸计算方法
    private getTitleFontSize(): number {
        return BreakpointSystem.getFontSize(this.currentBreakpoint, 32);
    }
    private getSubTitleFontSize(): number {
        return BreakpointSystem.getFontSize(this.currentBreakpoint, 16);
    }
    private getTitleHeight(): number {
        switch (this.currentBreakpoint) {
            case BreakpointConstants.BREAKPOINT_SM:
                return 200;
            case BreakpointConstants.BREAKPOINT_MD:
                return 250;
            case BreakpointConstants.BREAKPOINT_LG:
            case BreakpointConstants.BREAKPOINT_XL:
                return 300;
            default:
                return 200;
        }
    }
    private getTopMargin(): number {
        switch (this.currentBreakpoint) {
            case BreakpointConstants.BREAKPOINT_SM:
                return 60;
            case BreakpointConstants.BREAKPOINT_MD:
                return 80;
            case BreakpointConstants.BREAKPOINT_LG:
            case BreakpointConstants.BREAKPOINT_XL:
                return 100;
            default:
                return 60;
        }
    }
    private getSidePadding(): number {
        return DeviceUtils.getSpacing();
    }
    private getIconSize(): number {
        return BreakpointSystem.getFontSize(this.currentBreakpoint, 40);
    }
    private getCardTitleSize(): number {
        return BreakpointSystem.getFontSize(this.currentBreakpoint, 20);
    }
    private getCardDescSize(): number {
        return BreakpointSystem.getFontSize(this.currentBreakpoint, 14);
    }
    private getCardPadding(): number {
        return DeviceUtils.getSpacing() + 4;
    }
    private getCardRadius(): number {
        return DeviceUtils.getCardRadius();
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "MainPage";
    }
}
registerNamedRoute(() => new MainPage(undefined, {}), "", { bundleName: "com.example.simplecalculator", moduleName: "entry", pagePath: "pages/MainPage", pageFullPath: "entry/src/main/ets/pages/MainPage", integratedHsp: "false", moduleType: "followWithHap" });
