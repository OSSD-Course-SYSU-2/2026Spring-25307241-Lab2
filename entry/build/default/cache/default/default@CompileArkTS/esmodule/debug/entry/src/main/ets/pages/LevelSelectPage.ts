if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface LevelSelectPage_Params {
    levelProgress?: Map<number, LevelProgress>;
    selectedDifficulty?: LevelDifficulty;
    filteredLevels?: GameLevel[];
}
import router from "@ohos:router";
import { ALL_LEVELS } from "@bundle:com.example.simplecalculator/entry/ets/viewmodel/LevelData";
import { LevelDifficulty, LevelStatus, LevelProgress } from "@bundle:com.example.simplecalculator/entry/ets/viewmodel/LevelModel";
import type { GameLevel } from "@bundle:com.example.simplecalculator/entry/ets/viewmodel/LevelModel";
class LevelSelectPage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__levelProgress = new ObservedPropertyObjectPU(new Map(), this, "levelProgress");
        this.__selectedDifficulty = new ObservedPropertySimplePU(LevelDifficulty.TUTORIAL, this, "selectedDifficulty");
        this.__filteredLevels = new ObservedPropertyObjectPU([], this, "filteredLevels");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: LevelSelectPage_Params) {
        if (params.levelProgress !== undefined) {
            this.levelProgress = params.levelProgress;
        }
        if (params.selectedDifficulty !== undefined) {
            this.selectedDifficulty = params.selectedDifficulty;
        }
        if (params.filteredLevels !== undefined) {
            this.filteredLevels = params.filteredLevels;
        }
    }
    updateStateVars(params: LevelSelectPage_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__levelProgress.purgeDependencyOnElmtId(rmElmtId);
        this.__selectedDifficulty.purgeDependencyOnElmtId(rmElmtId);
        this.__filteredLevels.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__levelProgress.aboutToBeDeleted();
        this.__selectedDifficulty.aboutToBeDeleted();
        this.__filteredLevels.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __levelProgress: ObservedPropertyObjectPU<Map<number, LevelProgress>>;
    get levelProgress() {
        return this.__levelProgress.get();
    }
    set levelProgress(newValue: Map<number, LevelProgress>) {
        this.__levelProgress.set(newValue);
    }
    private __selectedDifficulty: ObservedPropertySimplePU<LevelDifficulty>;
    get selectedDifficulty() {
        return this.__selectedDifficulty.get();
    }
    set selectedDifficulty(newValue: LevelDifficulty) {
        this.__selectedDifficulty.set(newValue);
    }
    private __filteredLevels: ObservedPropertyObjectPU<GameLevel[]>;
    get filteredLevels() {
        return this.__filteredLevels.get();
    }
    set filteredLevels(newValue: GameLevel[]) {
        this.__filteredLevels.set(newValue);
    }
    aboutToAppear(): void {
        this.loadProgress();
        this.updateFilteredLevels();
    }
    loadProgress(): void {
        ALL_LEVELS.forEach((level, index) => {
            const progress = new LevelProgress(level.id);
            if (index === 0) {
                progress.status = LevelStatus.UNLOCKED;
            }
            this.levelProgress.set(level.id, progress);
        });
    }
    updateFilteredLevels(): void {
        this.filteredLevels = ALL_LEVELS.filter((level: GameLevel) => {
            return level.difficulty === this.selectedDifficulty;
        });
    }
    getDifficultyIcon(difficulty: LevelDifficulty): string {
        switch (difficulty) {
            case LevelDifficulty.TUTORIAL: return '📚';
            case LevelDifficulty.EASY: return '⭐';
            case LevelDifficulty.NORMAL: return '⭐⭐';
            case LevelDifficulty.HARD: return '⭐⭐⭐';
            case LevelDifficulty.EXPERT: return '💎';
            case LevelDifficulty.MASTER: return '👑';
            default: return '⭐';
        }
    }
    getDifficultyBg(difficulty: LevelDifficulty): string[] {
        switch (difficulty) {
            case LevelDifficulty.TUTORIAL: return ['#4CAF50', '#66BB6A'];
            case LevelDifficulty.EASY: return ['#8BC34A', '#9CCC65'];
            case LevelDifficulty.NORMAL: return ['#FFC107', '#FFCA28'];
            case LevelDifficulty.HARD: return ['#FF9800', '#FFA726'];
            case LevelDifficulty.EXPERT: return ['#F44336', '#EF5350'];
            case LevelDifficulty.MASTER: return ['#9C27B0', '#AB47BC'];
            default: return ['#9E9E9E', '#BDBDBD'];
        }
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
            // 顶部栏
            Row.create();
            // 顶部栏
            Row.width('100%');
            // 顶部栏
            Row.height(70);
            // 顶部栏
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
            Text.create('🎯 选择关卡');
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
        // 顶部栏
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 难度筛选
            Scroll.create();
            // 难度筛选
            Scroll.scrollable(ScrollDirection.Horizontal);
            // 难度筛选
            Scroll.scrollBar(BarState.Off);
            // 难度筛选
            Scroll.width('100%');
        }, Scroll);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.padding({ left: 20, right: 20 });
            Row.margin({ bottom: 15 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('教程');
            Button.height(36);
            Button.backgroundColor(this.selectedDifficulty === LevelDifficulty.TUTORIAL ?
                'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.1)');
            Button.borderRadius(18);
            Button.fontColor(Color.White);
            Button.fontSize(14);
            Button.margin({ left: 8 });
            Button.onClick(() => {
                this.selectedDifficulty = LevelDifficulty.TUTORIAL;
                this.updateFilteredLevels();
            });
        }, Button);
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('简单');
            Button.height(36);
            Button.backgroundColor(this.selectedDifficulty === LevelDifficulty.EASY ?
                'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.1)');
            Button.borderRadius(18);
            Button.fontColor(Color.White);
            Button.fontSize(14);
            Button.margin({ left: 8 });
            Button.onClick(() => {
                this.selectedDifficulty = LevelDifficulty.EASY;
                this.updateFilteredLevels();
            });
        }, Button);
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('普通');
            Button.height(36);
            Button.backgroundColor(this.selectedDifficulty === LevelDifficulty.NORMAL ?
                'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.1)');
            Button.borderRadius(18);
            Button.fontColor(Color.White);
            Button.fontSize(14);
            Button.margin({ left: 8 });
            Button.onClick(() => {
                this.selectedDifficulty = LevelDifficulty.NORMAL;
                this.updateFilteredLevels();
            });
        }, Button);
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('困难');
            Button.height(36);
            Button.backgroundColor(this.selectedDifficulty === LevelDifficulty.HARD ?
                'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.1)');
            Button.borderRadius(18);
            Button.fontColor(Color.White);
            Button.fontSize(14);
            Button.margin({ left: 8 });
            Button.onClick(() => {
                this.selectedDifficulty = LevelDifficulty.HARD;
                this.updateFilteredLevels();
            });
        }, Button);
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('专家');
            Button.height(36);
            Button.backgroundColor(this.selectedDifficulty === LevelDifficulty.EXPERT ?
                'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.1)');
            Button.borderRadius(18);
            Button.fontColor(Color.White);
            Button.fontSize(14);
            Button.margin({ left: 8 });
            Button.onClick(() => {
                this.selectedDifficulty = LevelDifficulty.EXPERT;
                this.updateFilteredLevels();
            });
        }, Button);
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('大师');
            Button.height(36);
            Button.backgroundColor(this.selectedDifficulty === LevelDifficulty.MASTER ?
                'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.1)');
            Button.borderRadius(18);
            Button.fontColor(Color.White);
            Button.fontSize(14);
            Button.margin({ left: 8 });
            Button.onClick(() => {
                this.selectedDifficulty = LevelDifficulty.MASTER;
                this.updateFilteredLevels();
            });
        }, Button);
        Button.pop();
        Row.pop();
        // 难度筛选
        Scroll.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 关卡列表
            Scroll.create();
            // 关卡列表
            Scroll.layoutWeight(1);
            // 关卡列表
            Scroll.scrollBar(BarState.Auto);
            // 关卡列表
            Scroll.edgeEffect(EdgeEffect.Spring);
        }, Scroll);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.padding({ left: 20, right: 20 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const level = _item;
                this.buildLevelCard.bind(this)(level);
            };
            this.forEachUpdateFunction(elmtId, this.filteredLevels, forEachItemGenFunction, (level: GameLevel) => level.id.toString(), false, false);
        }, ForEach);
        ForEach.pop();
        Column.pop();
        // 关卡列表
        Scroll.pop();
        Column.pop();
    }
    buildLevelCard(level: GameLevel, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.margin({ bottom: 15 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.padding(15);
            Row.backgroundColor('rgba(255,255,255,0.15)');
            Row.borderRadius(15);
            Row.border({
                width: 1,
                color: 'rgba(255,255,255,0.2)'
            });
            Row.onClick(() => {
                router.pushUrl({
                    url: 'pages/PuzzleGamePage',
                    params: { levelId: level.id }
                });
            });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 关卡编号
            Column.create();
            // 关卡编号
            Column.width(60);
            // 关卡编号
            Column.height(60);
            // 关卡编号
            Column.linearGradient({
                angle: 135,
                colors: [[this.getDifficultyBg(level.difficulty)[0], 0.0],
                    [this.getDifficultyBg(level.difficulty)[1], 1.0]]
            });
            // 关卡编号
            Column.borderRadius(15);
            // 关卡编号
            Column.justifyContent(FlexAlign.Center);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(`${level.id}`);
            Text.fontSize(28);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor(Color.White);
        }, Text);
        Text.pop();
        // 关卡编号
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 关卡信息
            Column.create();
            // 关卡信息
            Column.layoutWeight(1);
            // 关卡信息
            Column.alignItems(HorizontalAlign.Start);
            // 关卡信息
            Column.margin({ left: 15 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(level.name);
            Text.fontSize(18);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor(Color.White);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
            Blank.layoutWeight(1);
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 星星评价
            Row.create();
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('☆');
            Text.fontSize(16);
            Text.fontColor('rgba(255,255,255,0.5)');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('☆');
            Text.fontSize(16);
            Text.fontColor('rgba(255,255,255,0.5)');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('☆');
            Text.fontSize(16);
            Text.fontColor('rgba(255,255,255,0.5)');
        }, Text);
        Text.pop();
        // 星星评价
        Row.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(level.description);
            Text.fontSize(13);
            Text.fontColor('rgba(255,255,255,0.8)');
            Text.margin({ top: 5 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.margin({ top: 8 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(`${level.getDifficultyName()}`);
            Text.fontSize(12);
            Text.fontColor(this.getDifficultyBg(level.difficulty)[0]);
            Text.backgroundColor('rgba(255,255,255,0.9)');
            Text.borderRadius(10);
            Text.padding({ left: 8, right: 8, top: 2, bottom: 2 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(`最多 ${level.maxMoves} 步`);
            Text.fontSize(12);
            Text.fontColor('rgba(255,255,255,0.7)');
            Text.margin({ left: 10 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (level.timeLimit > 0) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(`${level.timeLimit}秒`);
                        Text.fontSize(12);
                        Text.fontColor('rgba(255,255,255,0.7)');
                        Text.margin({ left: 10 });
                    }, Text);
                    Text.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        Row.pop();
        // 关卡信息
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 状态图标
            Column.create();
            // 状态图标
            Column.width(50);
            // 状态图标
            Column.justifyContent(FlexAlign.Center);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('▶');
            Text.fontSize(28);
            Text.fontColor(Color.White);
        }, Text);
        Text.pop();
        // 状态图标
        Column.pop();
        Row.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "LevelSelectPage";
    }
}
registerNamedRoute(() => new LevelSelectPage(undefined, {}), "", { bundleName: "com.example.simplecalculator", moduleName: "entry", pagePath: "pages/LevelSelectPage", pageFullPath: "entry/src/main/ets/pages/LevelSelectPage", integratedHsp: "false", moduleType: "followWithHap" });
