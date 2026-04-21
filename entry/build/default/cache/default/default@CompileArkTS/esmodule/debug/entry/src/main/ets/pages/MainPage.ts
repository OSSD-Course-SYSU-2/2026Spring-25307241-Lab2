if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface MainPage_Params {
}
import router from "@ohos:router";
class MainPage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: MainPage_Params) {
    }
    updateStateVars(params: MainPage_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
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
            // 标题
            Column.create();
            // 标题
            Column.width('100%');
            // 标题
            Column.height(200);
            // 标题
            Column.justifyContent(FlexAlign.Center);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('计算器应用');
            Text.fontSize(32);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#333333');
            Text.margin({ top: 60, bottom: 20 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('请选择计算器类型');
            Text.fontSize(16);
            Text.fontColor('#666666');
        }, Text);
        Text.pop();
        // 标题
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 计算器选择按钮
            Column.create();
            // 计算器选择按钮
            Column.width('100%');
            // 计算器选择按钮
            Column.layoutWeight(1);
            // 计算器选择按钮
            Column.justifyContent(FlexAlign.Start);
            // 计算器选择按钮
            Column.padding({ top: 20 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 普通计算器
            Column.create();
            // 普通计算器
            Column.width('90%');
            // 普通计算器
            Column.backgroundColor(Color.White);
            // 普通计算器
            Column.borderRadius(15);
            // 普通计算器
            Column.margin({ bottom: 20 });
            // 普通计算器
            Column.shadow({ radius: 10, color: '#E0E0E0', offsetX: 0, offsetY: 5 });
            // 普通计算器
            Column.onClick(() => {
                router.pushUrl({ url: 'pages/HomePage' });
            });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.padding(20);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('🔢');
            Text.fontSize(40);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.alignItems(HorizontalAlign.Start);
            Column.margin({ left: 15 });
            Column.layoutWeight(1);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('普通计算器');
            Text.fontSize(20);
            Text.fontWeight(FontWeight.Medium);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('基础四则运算');
            Text.fontSize(14);
            Text.fontColor('#999999');
            Text.margin({ top: 5 });
        }, Text);
        Text.pop();
        Column.pop();
        Row.pop();
        // 普通计算器
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 花样滑冰计分计算器
            Column.create();
            // 花样滑冰计分计算器
            Column.width('90%');
            // 花样滑冰计分计算器
            Column.backgroundColor(Color.White);
            // 花样滑冰计分计算器
            Column.borderRadius(15);
            // 花样滑冰计分计算器
            Column.margin({ bottom: 20 });
            // 花样滑冰计分计算器
            Column.shadow({ radius: 10, color: '#E0E0E0', offsetX: 0, offsetY: 5 });
            // 花样滑冰计分计算器
            Column.onClick(() => {
                router.pushUrl({ url: 'pages/FigureSkatingPage' });
            });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.padding(20);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('⛸️');
            Text.fontSize(40);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.alignItems(HorizontalAlign.Start);
            Column.margin({ left: 15 });
            Column.layoutWeight(1);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('花样滑冰计分');
            Text.fontSize(20);
            Text.fontWeight(FontWeight.Medium);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('专业ISU评分系统');
            Text.fontSize(14);
            Text.fontColor('#999999');
            Text.margin({ top: 5 });
        }, Text);
        Text.pop();
        Column.pop();
        Row.pop();
        // 花样滑冰计分计算器
        Column.pop();
        // 计算器选择按钮
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 底部信息
            Column.create();
            // 底部信息
            Column.width('100%');
            // 底部信息
            Column.height(60);
            // 底部信息
            Column.justifyContent(FlexAlign.Center);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('基于HarmonyOS开发');
            Text.fontSize(12);
            Text.fontColor('#CCCCCC');
        }, Text);
        Text.pop();
        // 底部信息
        Column.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "MainPage";
    }
}
registerNamedRoute(() => new MainPage(undefined, {}), "", { bundleName: "com.example.simplecalculator", moduleName: "entry", pagePath: "pages/MainPage", pageFullPath: "entry/src/main/ets/pages/MainPage", integratedHsp: "false", moduleType: "followWithHap" });
