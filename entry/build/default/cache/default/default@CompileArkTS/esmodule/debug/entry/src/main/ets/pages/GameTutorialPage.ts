if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface GameTutorialPage_Params {
    gameEngine?: PuzzleGameEngine;
    board?: Medal[];
    handCards?: ActionCard[];
    currentTarget?: TargetPattern | null;
    tutorialStep?: number;
    isPlaying?: boolean;
    showTip?: boolean;
    highlightPositions?: number[];
    highlightCard?: number;
    animationProgress?: number;
    timer?: number;
    animationTimer?: number;
    tutorialSteps?: string[];
}
import router from "@ohos:router";
import { PuzzleGameEngine } from "@bundle:com.example.simplecalculator/entry/ets/common/util/PuzzleGameEngine";
import { Medal, MedalType, ActionType, ActionCard, TargetPattern, GameMode } from "@bundle:com.example.simplecalculator/entry/ets/viewmodel/PuzzleGameModel";
class GameTutorialPage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.gameEngine = new PuzzleGameEngine();
        this.__board = new ObservedPropertyObjectPU([], this, "board");
        this.__handCards = new ObservedPropertyObjectPU([], this, "handCards");
        this.__currentTarget = new ObservedPropertyObjectPU(null, this, "currentTarget");
        this.__tutorialStep = new ObservedPropertySimplePU(0, this, "tutorialStep");
        this.__isPlaying = new ObservedPropertySimplePU(false, this, "isPlaying");
        this.__showTip = new ObservedPropertySimplePU(true, this, "showTip");
        this.__highlightPositions = new ObservedPropertyObjectPU([], this, "highlightPositions");
        this.__highlightCard = new ObservedPropertySimplePU(-1, this, "highlightCard");
        this.__animationProgress = new ObservedPropertySimplePU(0, this, "animationProgress");
        this.timer = -1;
        this.animationTimer = -1;
        this.tutorialSteps = [
            '欢迎来到花样滑冰解谜游戏！\n让我们学习如何玩这个游戏。',
            '这是3×3的滑冰场地，每个格子上放着不同的奖牌。',
            '这是目标图案，我们需要在棋盘上凑出这个图案才能过关。',
            '这些是动作卡牌，每个卡牌代表一个花样滑冰动作。',
            '让我们使用 Spin（旋转）卡牌来翻转一列奖牌。',
            '点击卡牌后，再点击棋盘位置来执行动作。',
            '太棒了！我们成功完成了目标图案！',
            '现在你已经学会了基本操作，开始你的表演吧！'
        ];
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: GameTutorialPage_Params) {
        if (params.gameEngine !== undefined) {
            this.gameEngine = params.gameEngine;
        }
        if (params.board !== undefined) {
            this.board = params.board;
        }
        if (params.handCards !== undefined) {
            this.handCards = params.handCards;
        }
        if (params.currentTarget !== undefined) {
            this.currentTarget = params.currentTarget;
        }
        if (params.tutorialStep !== undefined) {
            this.tutorialStep = params.tutorialStep;
        }
        if (params.isPlaying !== undefined) {
            this.isPlaying = params.isPlaying;
        }
        if (params.showTip !== undefined) {
            this.showTip = params.showTip;
        }
        if (params.highlightPositions !== undefined) {
            this.highlightPositions = params.highlightPositions;
        }
        if (params.highlightCard !== undefined) {
            this.highlightCard = params.highlightCard;
        }
        if (params.animationProgress !== undefined) {
            this.animationProgress = params.animationProgress;
        }
        if (params.timer !== undefined) {
            this.timer = params.timer;
        }
        if (params.animationTimer !== undefined) {
            this.animationTimer = params.animationTimer;
        }
        if (params.tutorialSteps !== undefined) {
            this.tutorialSteps = params.tutorialSteps;
        }
    }
    updateStateVars(params: GameTutorialPage_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__board.purgeDependencyOnElmtId(rmElmtId);
        this.__handCards.purgeDependencyOnElmtId(rmElmtId);
        this.__currentTarget.purgeDependencyOnElmtId(rmElmtId);
        this.__tutorialStep.purgeDependencyOnElmtId(rmElmtId);
        this.__isPlaying.purgeDependencyOnElmtId(rmElmtId);
        this.__showTip.purgeDependencyOnElmtId(rmElmtId);
        this.__highlightPositions.purgeDependencyOnElmtId(rmElmtId);
        this.__highlightCard.purgeDependencyOnElmtId(rmElmtId);
        this.__animationProgress.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__board.aboutToBeDeleted();
        this.__handCards.aboutToBeDeleted();
        this.__currentTarget.aboutToBeDeleted();
        this.__tutorialStep.aboutToBeDeleted();
        this.__isPlaying.aboutToBeDeleted();
        this.__showTip.aboutToBeDeleted();
        this.__highlightPositions.aboutToBeDeleted();
        this.__highlightCard.aboutToBeDeleted();
        this.__animationProgress.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private gameEngine: PuzzleGameEngine;
    private __board: ObservedPropertyObjectPU<Medal[]>;
    get board() {
        return this.__board.get();
    }
    set board(newValue: Medal[]) {
        this.__board.set(newValue);
    }
    private __handCards: ObservedPropertyObjectPU<ActionCard[]>;
    get handCards() {
        return this.__handCards.get();
    }
    set handCards(newValue: ActionCard[]) {
        this.__handCards.set(newValue);
    }
    private __currentTarget: ObservedPropertyObjectPU<TargetPattern | null>;
    get currentTarget() {
        return this.__currentTarget.get();
    }
    set currentTarget(newValue: TargetPattern | null) {
        this.__currentTarget.set(newValue);
    }
    private __tutorialStep: ObservedPropertySimplePU<number>;
    get tutorialStep() {
        return this.__tutorialStep.get();
    }
    set tutorialStep(newValue: number) {
        this.__tutorialStep.set(newValue);
    }
    private __isPlaying: ObservedPropertySimplePU<boolean>;
    get isPlaying() {
        return this.__isPlaying.get();
    }
    set isPlaying(newValue: boolean) {
        this.__isPlaying.set(newValue);
    }
    private __showTip: ObservedPropertySimplePU<boolean>;
    get showTip() {
        return this.__showTip.get();
    }
    set showTip(newValue: boolean) {
        this.__showTip.set(newValue);
    }
    private __highlightPositions: ObservedPropertyObjectPU<number[]>;
    get highlightPositions() {
        return this.__highlightPositions.get();
    }
    set highlightPositions(newValue: number[]) {
        this.__highlightPositions.set(newValue);
    }
    private __highlightCard: ObservedPropertySimplePU<number>;
    get highlightCard() {
        return this.__highlightCard.get();
    }
    set highlightCard(newValue: number) {
        this.__highlightCard.set(newValue);
    }
    private __animationProgress: ObservedPropertySimplePU<number>;
    get animationProgress() {
        return this.__animationProgress.get();
    }
    set animationProgress(newValue: number) {
        this.__animationProgress.set(newValue);
    }
    private timer: number;
    private animationTimer: number;
    // 教程步骤定义
    private tutorialSteps: string[];
    aboutToAppear(): void {
        this.initDemoGame();
    }
    aboutToDisappear(): void {
        this.stopAnimation();
    }
    initDemoGame(): void {
        // 创建一个简单的演示棋盘
        this.board = [
            new Medal(MedalType.GOLD, '0'),
            new Medal(MedalType.SILVER, '1'),
            new Medal(MedalType.BRONZE, '2'),
            new Medal(MedalType.SILVER, '3'),
            new Medal(MedalType.GOLD, '4'),
            new Medal(MedalType.BRONZE, '5'),
            new Medal(MedalType.BRONZE, '6'),
            new Medal(MedalType.SILVER, '7'),
            new Medal(MedalType.GOLD, '8')
        ];
        // 创建演示卡牌
        this.handCards = [
            new ActionCard(ActionType.SPIN, 'Spin', '翻转整列奖牌', 2, '🔄'),
            new ActionCard(ActionType.JUMP, 'Jump', '交换两堆奖牌', 3, '🦘'),
            new ActionCard(ActionType.POSE, 'Pose', '堆叠相邻奖牌', 2, '💃')
        ];
        // 创建演示目标
        this.currentTarget = new TargetPattern([0, 1, 2], [MedalType.GOLD, MedalType.GOLD, MedalType.GOLD], '第一行全是金牌');
    }
    startAutoPlay(): void {
        this.isPlaying = true;
        this.tutorialStep = 0;
        this.playNextStep();
    }
    playNextStep(): void {
        if (this.tutorialStep >= this.tutorialSteps.length) {
            this.isPlaying = false;
            return;
        }
        // 清除之前的高亮
        this.highlightPositions = [];
        this.highlightCard = -1;
        // 根据步骤设置演示效果
        switch (this.tutorialStep) {
            case 1: // 展示棋盘
                this.highlightPositions = [0, 1, 2, 3, 4, 5, 6, 7, 8];
                break;
            case 2: // 展示目标
                this.highlightPositions = [0, 1, 2];
                break;
            case 3: // 展示卡牌
                this.highlightCard = -2; // 所有卡牌
                break;
            case 4: // 选择Spin卡牌
                this.highlightCard = 0;
                break;
            case 5: // 执行动作
                this.highlightCard = 0;
                this.highlightPositions = [1];
                break;
            case 6: // 完成演示
                this.board = [
                    new Medal(MedalType.GOLD, '0'),
                    new Medal(MedalType.GOLD, '1'),
                    new Medal(MedalType.GOLD, '2'),
                    new Medal(MedalType.SILVER, '3'),
                    new Medal(MedalType.BRONZE, '4'),
                    new Medal(MedalType.BRONZE, '5'),
                    new Medal(MedalType.BRONZE, '6'),
                    new Medal(MedalType.SILVER, '7'),
                    new Medal(MedalType.GOLD, '8')
                ];
                this.highlightPositions = [0, 1, 2];
                break;
        }
        // 动画进度
        this.startAnimation();
        // 自动进入下一步
        this.timer = setTimeout(() => {
            this.tutorialStep++;
            this.playNextStep();
        }, 3000);
    }
    startAnimation(): void {
        this.animationProgress = 0;
        this.animationTimer = setInterval(() => {
            this.animationProgress += 2;
            if (this.animationProgress >= 100) {
                this.animationProgress = 100;
                clearInterval(this.animationTimer);
            }
        }, 60);
    }
    stopAnimation(): void {
        if (this.timer !== -1) {
            clearTimeout(this.timer);
            this.timer = -1;
        }
        if (this.animationTimer !== -1) {
            clearInterval(this.animationTimer);
            this.animationTimer = -1;
        }
    }
    getMedalColor(type: MedalType): string {
        switch (type) {
            case MedalType.GOLD:
                return '#FFD700';
            case MedalType.SILVER:
                return '#C0C0C0';
            case MedalType.BRONZE:
                return '#CD7F32';
            default:
                return '#CCCCCC';
        }
    }
    getMedalIcon(type: MedalType): string {
        switch (type) {
            case MedalType.GOLD:
                return '🥇';
            case MedalType.SILVER:
                return '🥈';
            case MedalType.BRONZE:
                return '🥉';
            default:
                return '🏅';
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
            Button.height(40);
            Button.backgroundColor('rgba(255,255,255,0.2)');
            Button.borderRadius(20);
            Button.onClick(() => {
                this.stopAnimation();
                router.replaceUrl({
                    url: 'pages/PuzzleGamePage',
                    params: { mode: GameMode.CLASSIC }
                });
            });
        }, Button);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('跳过');
            Text.fontSize(16);
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
            Text.create('📖 新手教程');
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
            Blank.width(60);
        }, Blank);
        Blank.pop();
        // 顶部栏
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 主内容区
            Column.create();
            // 主内容区
            Column.layoutWeight(1);
            // 主内容区
            Column.width('100%');
            // 主内容区
            Column.padding(20);
        }, Column);
        // 棋盘展示
        this.buildDemoBoard.bind(this)();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            // 目标展示
            if (this.currentTarget) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.buildTargetDisplay.bind(this)();
                });
            }
            // 卡牌展示
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        // 卡牌展示
        this.buildDemoCards.bind(this)();
        // 提示文字
        this.buildTipText.bind(this)();
        // 主内容区
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 底部控制
            Row.create();
            // 底部控制
            Row.width('100%');
            // 底部控制
            Row.height(80);
            // 底部控制
            Row.padding({ left: 20, right: 20 });
            // 底部控制
            Row.justifyContent(FlexAlign.Center);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (!this.isPlaying) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Button.createWithLabel('开始演示');
                        Button.width('80%');
                        Button.height(50);
                        Button.backgroundColor('#667eea');
                        Button.borderRadius(25);
                        Button.fontColor(Color.White);
                        Button.fontSize(18);
                        Button.onClick(() => {
                            this.startAutoPlay();
                        });
                    }, Button);
                    Button.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Row.create();
                        Row.justifyContent(FlexAlign.Center);
                        Row.width('100%');
                    }, Row);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(`步骤 ${this.tutorialStep + 1}/${this.tutorialSteps.length}`);
                        Text.fontSize(16);
                        Text.fontColor(Color.White);
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        // 进度条
                        Row.create();
                        // 进度条
                        Row.width(150);
                        // 进度条
                        Row.height(8);
                        // 进度条
                        Row.backgroundColor('rgba(255,255,255,0.3)');
                        // 进度条
                        Row.borderRadius(4);
                        // 进度条
                        Row.margin({ left: 15 });
                    }, Row);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Row.create();
                        Row.width(`${this.animationProgress}%`);
                        Row.height('100%');
                        Row.backgroundColor('#FFD700');
                        Row.borderRadius(4);
                    }, Row);
                    Row.pop();
                    // 进度条
                    Row.pop();
                    Row.pop();
                });
            }
        }, If);
        If.pop();
        // 底部控制
        Row.pop();
        Column.pop();
    }
    buildDemoBoard(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.padding(15);
            Column.backgroundColor('rgba(255,255,255,0.1)');
            Column.borderRadius(15);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('⛸️ 滑冰场地');
            Text.fontSize(16);
            Text.fontColor(Color.White);
            Text.fontWeight(FontWeight.Bold);
            Text.margin({ bottom: 10 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const row = _item;
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Row.create();
                    Row.margin({ top: row === 0 ? 0 : 8 });
                }, Row);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    ForEach.create();
                    const forEachItemGenFunction = _item => {
                        const col = _item;
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Column.create();
                            Context.animation({
                                duration: 300,
                                curve: Curve.EaseInOut
                            });
                            Column.width(70);
                            Column.height(70);
                            Column.backgroundColor(this.getMedalColor(this.board[row * 3 + col]?.type || MedalType.BRONZE));
                            Column.borderRadius(10);
                            Column.justifyContent(FlexAlign.Center);
                            Column.border({
                                width: this.highlightPositions.includes(row * 3 + col) ? 3 : 1,
                                color: this.highlightPositions.includes(row * 3 + col) ? '#FF6B6B' : 'rgba(255,255,255,0.3)'
                            });
                            Column.shadow({ radius: 5, color: 'rgba(0,0,0,0.3)', offsetX: 2, offsetY: 2 });
                            Column.opacity(this.highlightPositions.length > 0 && !this.highlightPositions.includes(row * 3 + col) ? 0.5 : 1);
                            Context.animation(null);
                            Column.margin({ left: col === 0 ? 0 : 8 });
                        }, Column);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Text.create(this.getMedalIcon(this.board[row * 3 + col]?.type || MedalType.BRONZE));
                            Text.fontSize(36);
                        }, Text);
                        Text.pop();
                        Column.pop();
                    };
                    this.forEachUpdateFunction(elmtId, [0, 1, 2], forEachItemGenFunction, (col: number) => col.toString(), false, false);
                }, ForEach);
                ForEach.pop();
                Row.pop();
            };
            this.forEachUpdateFunction(elmtId, [0, 1, 2], forEachItemGenFunction, (row: number) => row.toString(), false, false);
        }, ForEach);
        ForEach.pop();
        Column.pop();
    }
    buildTargetDisplay(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.padding(15);
            Column.backgroundColor('rgba(255,255,255,0.1)');
            Column.borderRadius(15);
            Column.margin({ top: 15 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.margin({ bottom: 10 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('🎯 目标图案');
            Text.fontSize(16);
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
            Text.create(this.currentTarget?.description || '');
            Text.fontSize(14);
            Text.fontColor('rgba(255,255,255,0.8)');
        }, Text);
        Text.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.justifyContent(FlexAlign.Center);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = (_item, index: number) => {
                const medal = _item;
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create(this.getMedalIcon(medal));
                    Text.fontSize(30);
                    Text.margin({ left: index === 0 ? 0 : 10 });
                }, Text);
                Text.pop();
            };
            this.forEachUpdateFunction(elmtId, this.currentTarget?.requiredMedals || [], forEachItemGenFunction, (medal: MedalType, index: number) => index.toString(), true, true);
        }, ForEach);
        ForEach.pop();
        Row.pop();
        Column.pop();
    }
    buildDemoCards(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.padding(15);
            Column.backgroundColor('rgba(255,255,255,0.1)');
            Column.borderRadius(15);
            Column.margin({ top: 15 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('🎴 动作卡牌');
            Text.fontSize(16);
            Text.fontColor(Color.White);
            Text.fontWeight(FontWeight.Bold);
            Text.margin({ bottom: 10 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.justifyContent(FlexAlign.Center);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = (_item, index: number) => {
                const card = _item;
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Column.create();
                    Context.animation({
                        duration: 300,
                        curve: Curve.EaseInOut
                    });
                    Column.width(70);
                    Column.height(80);
                    Column.backgroundColor(this.highlightCard === index || this.highlightCard === -2 ? '#FF6B6B' : 'rgba(255,255,255,0.2)');
                    Column.borderRadius(10);
                    Column.justifyContent(FlexAlign.Center);
                    Column.border({
                        width: 2,
                        color: this.highlightCard === index || this.highlightCard === -2 ? '#FF6B6B' : 'rgba(255,255,255,0.3)'
                    });
                    Column.opacity(this.highlightCard >= 0 && this.highlightCard !== index ? 0.5 : 1);
                    Context.animation(null);
                    Column.margin({ left: index === 0 ? 0 : 10 });
                }, Column);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create(card.icon);
                    Text.fontSize(28);
                }, Text);
                Text.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create(card.name);
                    Text.fontSize(12);
                    Text.fontColor(Color.White);
                    Text.margin({ top: 5 });
                }, Text);
                Text.pop();
                Column.pop();
            };
            this.forEachUpdateFunction(elmtId, this.handCards, forEachItemGenFunction, (card: ActionCard, index: number) => index.toString(), true, true);
        }, ForEach);
        ForEach.pop();
        Row.pop();
        Column.pop();
    }
    buildTipText(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.margin({ top: 20 });
            Column.padding(15);
            Column.backgroundColor('rgba(255,255,255,0.15)');
            Column.borderRadius(15);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.tutorialSteps[this.tutorialStep] || '点击"开始演示"查看游戏玩法');
            Text.fontSize(16);
            Text.fontColor(Color.White);
            Text.textAlign(TextAlign.Center);
            Text.lineHeight(26);
            Text.padding(20);
        }, Text);
        Text.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "GameTutorialPage";
    }
}
registerNamedRoute(() => new GameTutorialPage(undefined, {}), "", { bundleName: "com.example.simplecalculator", moduleName: "entry", pagePath: "pages/GameTutorialPage", pageFullPath: "entry/src/main/ets/pages/GameTutorialPage", integratedHsp: "false", moduleType: "followWithHap" });
