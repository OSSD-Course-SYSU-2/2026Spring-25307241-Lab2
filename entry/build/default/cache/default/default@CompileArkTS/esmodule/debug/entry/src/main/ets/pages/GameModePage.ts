if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface GameModePage_Params {
}
import router from "@ohos:router";
import { GameMode } from "@bundle:com.example.simplecalculator/entry/ets/viewmodel/PuzzleGameModel";
class GameModePage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: GameModePage_Params) {
    }
    updateStateVars(params: GameModePage_Params) {
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
            // 顶部导航
            Row.create();
            // 顶部导航
            Row.width('100%');
            // 顶部导航
            Row.height(80);
            // 顶部导航
            Row.padding({ left: 20, right: 20 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithChild();
            Button.width(40);
            Button.height(40);
            Button.backgroundColor('rgba(255,255,255,0.2)');
            Button.borderRadius(20);
            Button.onClick(() => {
                router.back();
            });
        }, Button);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('←');
            Text.fontSize(24);
            Text.fontColor(Color.White);
        }, Text);
        Text.pop();
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
            Blank.layoutWeight(1);
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('⛸️ 花样滑冰解谜');
            Text.fontSize(20);
            Text.fontColor(Color.White);
            Text.fontWeight(FontWeight.Bold);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
            Blank.layoutWeight(1);
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
            Blank.width(40);
        }, Blank);
        Blank.pop();
        // 顶部导航
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Scroll.create();
            Scroll.layoutWeight(1);
            Scroll.scrollBar(BarState.Auto);
            Scroll.edgeEffect(EdgeEffect.Spring);
        }, Scroll);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.padding(20);
        }, Column);
        // 关卡模式
        this.buildModeCard.bind(this)('🎯 关卡模式', '从简单到困难，逐步挑战', '🎮', ['#00BCD4', '#4DD0E1'], () => {
            router.pushUrl({ url: 'pages/LevelSelectPage' });
        });
        // 新手教程
        this.buildModeCard.bind(this)('📖 新手教程', '观看游戏演示，快速上手', '🎓', ['#4CAF50', '#66BB6A'], () => {
            router.pushUrl({ url: 'pages/GameTutorialPage' });
        });
        // 经典模式
        this.buildModeCard.bind(this)('🎮 经典模式', '随机关卡，自由练习', '⭐', ['#667eea', '#764ba2'], () => {
            router.pushUrl({
                url: 'pages/PuzzleGamePage',
                params: { mode: GameMode.CLASSIC }
            });
        });
        // 每日挑战
        this.buildModeCard.bind(this)('🏆 每日挑战', '全球排行，一较高下', '🌍', ['#f093fb', '#f5576c'], () => {
            router.pushUrl({
                url: 'pages/PuzzleGamePage',
                params: { mode: GameMode.DAILY }
            });
        });
        // 排行榜
        this.buildModeCard.bind(this)('📊 排行榜', '查看全球排名', '🏅', ['#4facfe', '#00f2fe'], () => {
            router.pushUrl({ url: 'pages/LeaderboardPage' });
        });
        // 游戏帮助
        this.buildModeCard.bind(this)('❓ 游戏帮助', '详细玩法说明', '💡', ['#fa709a', '#fee140'], () => {
            router.pushUrl({ url: 'pages/GameHelpPage' });
        });
        Column.pop();
        Scroll.pop();
        Column.pop();
    }
    buildModeCard(title: string, subtitle: string, icon: string, colors: string[], onClick: () => void, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.height(100);
            Row.padding({ left: 20, right: 20 });
            Row.linearGradient({
                angle: 90,
                colors: [[colors[0], 0.0], [colors[1], 1.0]]
            });
            Row.borderRadius(20);
            Row.shadow({ radius: 10, color: 'rgba(0,0,0,0.2)', offsetX: 0, offsetY: 5 });
            Row.margin({ bottom: 15 });
            Row.onClick(onClick);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width(70);
            Column.height(70);
            Column.backgroundColor('rgba(255,255,255,0.2)');
            Column.borderRadius(15);
            Column.justifyContent(FlexAlign.Center);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(icon);
            Text.fontSize(40);
        }, Text);
        Text.pop();
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.alignItems(HorizontalAlign.Start);
            Column.margin({ left: 15 });
            Column.layoutWeight(1);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(title);
            Text.fontSize(18);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor(Color.White);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(subtitle);
            Text.fontSize(14);
            Text.fontColor('rgba(255,255,255,0.8)');
            Text.margin({ top: 5 });
        }, Text);
        Text.pop();
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('→');
            Text.fontSize(24);
            Text.fontColor('rgba(255,255,255,0.6)');
        }, Text);
        Text.pop();
        Row.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "GameModePage";
    }
}
registerNamedRoute(() => new GameModePage(undefined, {}), "", { bundleName: "com.example.simplecalculator", moduleName: "entry", pagePath: "pages/GameModePage", pageFullPath: "entry/src/main/ets/pages/GameModePage", integratedHsp: "false", moduleType: "followWithHap" });
