if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface PuzzleGamePage_Params {
    gameEngine?: PuzzleGameEngine;
    gameMode?: GameMode;
    board?: Medal[];
    handCards?: ActionCard[];
    currentTarget?: TargetPattern | null;
    allTargets?: TargetPattern[];
    gameState?: GameState;
    playerScore?: PlayerScore;
    selectedCardIndex?: number;
    selectedPosition?: number;
    elapsedTime?: number;
    showResult?: boolean;
    showHelp?: boolean;
    timer?: number;
}
import router from "@ohos:router";
import { PuzzleGameEngine } from "@bundle:com.example.simplecalculator/entry/ets/common/util/PuzzleGameEngine";
import { MedalType, ActionType, GameMode, GameState, PlayerScore } from "@bundle:com.example.simplecalculator/entry/ets/viewmodel/PuzzleGameModel";
import type { Medal, ActionCard, TargetPattern } from "@bundle:com.example.simplecalculator/entry/ets/viewmodel/PuzzleGameModel";
class PuzzleGamePage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.gameEngine = new PuzzleGameEngine();
        this.__gameMode = new ObservedPropertySimplePU(GameMode.CLASSIC, this, "gameMode");
        this.__board = new ObservedPropertyObjectPU([], this, "board");
        this.__handCards = new ObservedPropertyObjectPU([], this, "handCards");
        this.__currentTarget = new ObservedPropertyObjectPU(null, this, "currentTarget");
        this.__allTargets = new ObservedPropertyObjectPU([], this, "allTargets");
        this.__gameState = new ObservedPropertySimplePU(GameState.READY, this, "gameState");
        this.__playerScore = new ObservedPropertyObjectPU(new PlayerScore(), this, "playerScore");
        this.__selectedCardIndex = new ObservedPropertySimplePU(-1, this, "selectedCardIndex");
        this.__selectedPosition = new ObservedPropertySimplePU(-1, this, "selectedPosition");
        this.__elapsedTime = new ObservedPropertySimplePU(0, this, "elapsedTime");
        this.__showResult = new ObservedPropertySimplePU(false, this, "showResult");
        this.__showHelp = new ObservedPropertySimplePU(false, this, "showHelp");
        this.timer = -1;
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: PuzzleGamePage_Params) {
        if (params.gameEngine !== undefined) {
            this.gameEngine = params.gameEngine;
        }
        if (params.gameMode !== undefined) {
            this.gameMode = params.gameMode;
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
        if (params.allTargets !== undefined) {
            this.allTargets = params.allTargets;
        }
        if (params.gameState !== undefined) {
            this.gameState = params.gameState;
        }
        if (params.playerScore !== undefined) {
            this.playerScore = params.playerScore;
        }
        if (params.selectedCardIndex !== undefined) {
            this.selectedCardIndex = params.selectedCardIndex;
        }
        if (params.selectedPosition !== undefined) {
            this.selectedPosition = params.selectedPosition;
        }
        if (params.elapsedTime !== undefined) {
            this.elapsedTime = params.elapsedTime;
        }
        if (params.showResult !== undefined) {
            this.showResult = params.showResult;
        }
        if (params.showHelp !== undefined) {
            this.showHelp = params.showHelp;
        }
        if (params.timer !== undefined) {
            this.timer = params.timer;
        }
    }
    updateStateVars(params: PuzzleGamePage_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__gameMode.purgeDependencyOnElmtId(rmElmtId);
        this.__board.purgeDependencyOnElmtId(rmElmtId);
        this.__handCards.purgeDependencyOnElmtId(rmElmtId);
        this.__currentTarget.purgeDependencyOnElmtId(rmElmtId);
        this.__allTargets.purgeDependencyOnElmtId(rmElmtId);
        this.__gameState.purgeDependencyOnElmtId(rmElmtId);
        this.__playerScore.purgeDependencyOnElmtId(rmElmtId);
        this.__selectedCardIndex.purgeDependencyOnElmtId(rmElmtId);
        this.__selectedPosition.purgeDependencyOnElmtId(rmElmtId);
        this.__elapsedTime.purgeDependencyOnElmtId(rmElmtId);
        this.__showResult.purgeDependencyOnElmtId(rmElmtId);
        this.__showHelp.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__gameMode.aboutToBeDeleted();
        this.__board.aboutToBeDeleted();
        this.__handCards.aboutToBeDeleted();
        this.__currentTarget.aboutToBeDeleted();
        this.__allTargets.aboutToBeDeleted();
        this.__gameState.aboutToBeDeleted();
        this.__playerScore.aboutToBeDeleted();
        this.__selectedCardIndex.aboutToBeDeleted();
        this.__selectedPosition.aboutToBeDeleted();
        this.__elapsedTime.aboutToBeDeleted();
        this.__showResult.aboutToBeDeleted();
        this.__showHelp.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private gameEngine: PuzzleGameEngine;
    private __gameMode: ObservedPropertySimplePU<GameMode>;
    get gameMode() {
        return this.__gameMode.get();
    }
    set gameMode(newValue: GameMode) {
        this.__gameMode.set(newValue);
    }
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
    private __allTargets: ObservedPropertyObjectPU<TargetPattern[]>;
    get allTargets() {
        return this.__allTargets.get();
    }
    set allTargets(newValue: TargetPattern[]) {
        this.__allTargets.set(newValue);
    }
    private __gameState: ObservedPropertySimplePU<GameState>;
    get gameState() {
        return this.__gameState.get();
    }
    set gameState(newValue: GameState) {
        this.__gameState.set(newValue);
    }
    private __playerScore: ObservedPropertyObjectPU<PlayerScore>;
    get playerScore() {
        return this.__playerScore.get();
    }
    set playerScore(newValue: PlayerScore) {
        this.__playerScore.set(newValue);
    }
    private __selectedCardIndex: ObservedPropertySimplePU<number>;
    get selectedCardIndex() {
        return this.__selectedCardIndex.get();
    }
    set selectedCardIndex(newValue: number) {
        this.__selectedCardIndex.set(newValue);
    }
    private __selectedPosition: ObservedPropertySimplePU<number>;
    get selectedPosition() {
        return this.__selectedPosition.get();
    }
    set selectedPosition(newValue: number) {
        this.__selectedPosition.set(newValue);
    }
    private __elapsedTime: ObservedPropertySimplePU<number>;
    get elapsedTime() {
        return this.__elapsedTime.get();
    }
    set elapsedTime(newValue: number) {
        this.__elapsedTime.set(newValue);
    }
    private __showResult: ObservedPropertySimplePU<boolean>;
    get showResult() {
        return this.__showResult.get();
    }
    set showResult(newValue: boolean) {
        this.__showResult.set(newValue);
    }
    private __showHelp: ObservedPropertySimplePU<boolean>;
    get showHelp() {
        return this.__showHelp.get();
    }
    set showHelp(newValue: boolean) {
        this.__showHelp.set(newValue);
    }
    private timer: number;
    aboutToAppear(): void {
        const params = router.getParams() as Record<string, GameMode>;
        if (params && params['mode']) {
            this.gameMode = params['mode'];
        }
        this.startNewGame();
    }
    aboutToDisappear(): void {
        if (this.timer !== -1) {
            clearInterval(this.timer);
        }
    }
    startNewGame(): void {
        this.gameEngine.initializeGame(this.gameMode);
        this.gameEngine.startGame();
        this.updateGameState();
        this.startTimer();
    }
    updateGameState(): void {
        this.board = this.gameEngine.getBoard();
        this.handCards = this.gameEngine.getHandCards();
        this.currentTarget = this.gameEngine.getCurrentTarget();
        this.allTargets = this.gameEngine.getAllTargets();
        this.gameState = this.gameEngine.getGameState();
        this.playerScore = this.gameEngine.getPlayerScore();
        if (this.gameState === GameState.COMPLETED) {
            this.stopTimer();
            this.showResult = true;
        }
    }
    startTimer(): void {
        this.elapsedTime = 0;
        this.timer = setInterval(() => {
            this.elapsedTime++;
        }, 1000);
    }
    stopTimer(): void {
        if (this.timer !== -1) {
            clearInterval(this.timer);
            this.timer = -1;
        }
    }
    useCard(cardIndex: number): void {
        if (this.gameState !== GameState.PLAYING)
            return;
        this.selectedCardIndex = cardIndex;
        const card = this.handCards[cardIndex];
        if (this.needsPositionSelection(card.type)) {
            return;
        }
        const params: any = {};
        const success = this.gameEngine.executeAction(cardIndex, params);
        if (success) {
            this.updateGameState();
        }
        else {
            this.selectedCardIndex = -1;
        }
    }
    clickBoardPosition(pos: number): void {
        if (this.selectedCardIndex === -1)
            return;
        const card = this.handCards[this.selectedCardIndex];
        let params: any = {};
        switch (card.type) {
            case ActionType.SPIN:
                params.column = pos % 3;
                break;
            case ActionType.JUMP:
                if (this.selectedPosition === -1) {
                    this.selectedPosition = pos;
                    return;
                }
                params.pos1 = this.selectedPosition;
                params.pos2 = pos;
                this.selectedPosition = -1;
                break;
            case ActionType.POSE:
                if (this.selectedPosition === -1) {
                    this.selectedPosition = pos;
                    return;
                }
                params.from = this.selectedPosition;
                params.to = pos;
                this.selectedPosition = -1;
                break;
            default:
                params.pos = pos;
                break;
        }
        const success = this.gameEngine.executeAction(this.selectedCardIndex, params);
        if (success) {
            this.updateGameState();
        }
        this.selectedCardIndex = -1;
    }
    needsPositionSelection(type: ActionType): boolean {
        return [
            ActionType.SPIN, ActionType.JUMP, ActionType.POSE,
            ActionType.PIROUETTE, ActionType.AXEL, ActionType.LUTZ,
            ActionType.FLIP, ActionType.LOOP, ActionType.SALCHOW,
            ActionType.TOE_LOOP, ActionType.CAMEL, ActionType.SIT,
            ActionType.UPRIGHT, ActionType.SPIRAL, ActionType.STEP
        ].includes(type);
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
    formatTime(seconds: number): string {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Stack.create();
            Stack.width('100%');
            Stack.height('100%');
        }, Stack);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.height('100%');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.showResult) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.buildResultPage.bind(this)();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                    this.buildGamePage.bind(this)();
                });
            }
        }, If);
        If.pop();
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            // 帮助弹窗
            if (this.showHelp) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Column.create();
                        Column.width('100%');
                        Column.height('100%');
                        Column.justifyContent(FlexAlign.Center);
                        Column.alignItems(HorizontalAlign.Center);
                        Column.backgroundColor('rgba(0,0,0,0.5)');
                        Column.onClick(() => {
                            this.showHelp = false;
                        });
                    }, Column);
                    this.buildHelpDialog.bind(this)();
                    Column.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        Stack.pop();
    }
    buildGamePage(parent = null) {
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
            Row.create();
            Row.width('100%');
            Row.height(60);
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
            Text.create(this.gameMode === GameMode.CLASSIC ? '经典模式' : '每日挑战');
            Text.fontSize(18);
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
            Row.create();
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithChild();
            Button.width(40);
            Button.height(40);
            Button.backgroundColor('rgba(255,255,255,0.2)');
            Button.borderRadius(20);
            Button.onClick(() => {
                this.showHelp = true;
            });
        }, Button);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('?');
            Text.fontSize(20);
            Text.fontColor(Color.White);
            Text.fontWeight(FontWeight.Bold);
        }, Text);
        Text.pop();
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('⏱️');
            Text.fontSize(20);
            Text.margin({ left: 10 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.formatTime(this.elapsedTime));
            Text.fontSize(16);
            Text.fontColor(Color.White);
            Text.margin({ left: 5 });
        }, Text);
        Text.pop();
        Row.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.layoutWeight(1);
            Column.width('100%');
            Column.padding(20);
        }, Column);
        this.buildTargetSection.bind(this)();
        this.buildBoard.bind(this)();
        this.buildHandCards.bind(this)();
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.height(80);
            Row.padding({ left: 20, right: 20 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('重新开始');
            Button.width('40%');
            Button.height(45);
            Button.backgroundColor('rgba(255,255,255,0.2)');
            Button.borderRadius(25);
            Button.fontColor(Color.White);
            Button.onClick(() => {
                this.stopTimer();
                this.startNewGame();
            });
        }, Button);
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
            Blank.layoutWeight(1);
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('暂停');
            Button.width('40%');
            Button.height(45);
            Button.backgroundColor('rgba(255,255,255,0.2)');
            Button.borderRadius(25);
            Button.fontColor(Color.White);
            Button.onClick(() => {
                if (this.gameState === GameState.PLAYING) {
                    this.gameEngine.pauseGame();
                    this.stopTimer();
                }
                else if (this.gameState === GameState.PAUSED) {
                    this.gameEngine.resumeGame();
                    this.startTimer();
                }
                this.gameState = this.gameEngine.getGameState();
            });
        }, Button);
        Button.pop();
        Row.pop();
        Column.pop();
    }
    buildResultPage(parent = null) {
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
            Text.create('🎉 表演完成！');
            Text.fontSize(28);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor(Color.White);
            Text.margin({ top: 80, bottom: 30 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.getMedalIcon(this.playerScore.medal));
            Text.fontSize(80);
            Text.margin({ bottom: 30 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('85%');
            Column.padding(25);
            Column.backgroundColor('rgba(255,255,255,0.15)');
            Column.borderRadius(20);
            Column.margin({ bottom: 40 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.margin({ top: 10 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('完成图案');
            Text.fontSize(16);
            Text.fontColor('rgba(255,255,255,0.8)');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
            Blank.layoutWeight(1);
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(`${this.playerScore.patternsCompleted}/${this.allTargets.length}`);
            Text.fontSize(20);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor(Color.White);
        }, Text);
        Text.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.margin({ top: 10 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('总移动次数');
            Text.fontSize(16);
            Text.fontColor('rgba(255,255,255,0.8)');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
            Blank.layoutWeight(1);
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(`${this.playerScore.moves}`);
            Text.fontSize(20);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor(Color.White);
        }, Text);
        Text.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.margin({ top: 10 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('失误次数');
            Text.fontSize(16);
            Text.fontColor('rgba(255,255,255,0.8)');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
            Blank.layoutWeight(1);
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(`${this.playerScore.mistakes}`);
            Text.fontSize(20);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor(Color.White);
        }, Text);
        Text.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.margin({ top: 10 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('用时');
            Text.fontSize(16);
            Text.fontColor('rgba(255,255,255,0.8)');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
            Blank.layoutWeight(1);
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.formatTime(this.playerScore.time));
            Text.fontSize(20);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor(Color.White);
        }, Text);
        Text.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.margin({ top: 10 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('总分');
            Text.fontSize(16);
            Text.fontColor('rgba(255,255,255,0.8)');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
            Blank.layoutWeight(1);
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(`${this.playerScore.score}`);
            Text.fontSize(20);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#FFD700');
        }, Text);
        Text.pop();
        Row.pop();
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('85%');
            Row.justifyContent(FlexAlign.Center);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('再来一局');
            Button.width('45%');
            Button.height(50);
            Button.backgroundColor('#667eea');
            Button.borderRadius(25);
            Button.fontColor(Color.White);
            Button.fontSize(18);
            Button.onClick(() => {
                this.showResult = false;
                this.startNewGame();
            });
        }, Button);
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('返回');
            Button.width('45%');
            Button.height(50);
            Button.backgroundColor('rgba(255,255,255,0.3)');
            Button.borderRadius(25);
            Button.fontColor(Color.White);
            Button.fontSize(18);
            Button.onClick(() => {
                router.back();
            });
            Button.margin({ left: 10 });
        }, Button);
        Button.pop();
        Row.pop();
        Column.pop();
    }
    buildTargetSection(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.padding(15);
            Column.backgroundColor('rgba(255,255,255,0.1)');
            Column.borderRadius(15);
            Column.margin({ bottom: 20 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('当前目标');
            Text.fontSize(16);
            Text.fontColor(Color.White);
            Text.fontWeight(FontWeight.Bold);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.currentTarget) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Row.create();
                        Row.margin({ top: 10 });
                    }, Row);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(this.currentTarget.description);
                        Text.fontSize(14);
                        Text.fontColor('rgba(255,255,255,0.8)');
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('需要: ');
                        Text.fontSize(14);
                        Text.fontColor('rgba(255,255,255,0.8)');
                        Text.margin({ left: 10 });
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        ForEach.create();
                        const forEachItemGenFunction = (_item, index: number) => {
                            const medal = _item;
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Text.create(this.getMedalIcon(medal));
                                Text.fontSize(20);
                            }, Text);
                            Text.pop();
                        };
                        this.forEachUpdateFunction(elmtId, this.currentTarget.requiredMedals, forEachItemGenFunction, (medal: MedalType, index: number) => index.toString(), true, true);
                    }, ForEach);
                    ForEach.pop();
                    Row.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Row.create();
                        Row.margin({ top: 5 });
                    }, Row);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(`进度: ${this.playerScore.patternsCompleted}/${this.allTargets.length}`);
                        Text.fontSize(14);
                        Text.fontColor('rgba(255,255,255,0.8)');
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(`失误: ${this.playerScore.mistakes}`);
                        Text.fontSize(14);
                        Text.fontColor(this.playerScore.mistakes > 0 ? '#FF6B6B' : 'rgba(255,255,255,0.8)');
                        Text.margin({ left: 20 });
                    }, Text);
                    Text.pop();
                    Row.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        Column.pop();
    }
    buildBoard(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.justifyContent(FlexAlign.Center);
            Column.padding(20);
            Column.backgroundColor('rgba(255,255,255,0.1)');
            Column.borderRadius(15);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const row = _item;
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Row.create();
                    Row.margin({ top: row === 0 ? 0 : 10 });
                }, Row);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    ForEach.create();
                    const forEachItemGenFunction = _item => {
                        const col = _item;
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Column.create();
                            Column.width(80);
                            Column.height(80);
                            Column.backgroundColor(this.getMedalColor(this.board[row * 3 + col]?.type || MedalType.BRONZE));
                            Column.borderRadius(10);
                            Column.justifyContent(FlexAlign.Center);
                            Column.border({
                                width: this.selectedPosition === row * 3 + col ? 3 : 1,
                                color: this.selectedPosition === row * 3 + col ? '#FF6B6B' : 'rgba(255,255,255,0.3)'
                            });
                            Column.shadow({ radius: 5, color: 'rgba(0,0,0,0.3)', offsetX: 2, offsetY: 2 });
                            Column.onClick(() => {
                                this.clickBoardPosition(row * 3 + col);
                            });
                            Column.margin({ left: col === 0 ? 0 : 10 });
                        }, Column);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Text.create(this.getMedalIcon(this.board[row * 3 + col]?.type || MedalType.BRONZE));
                            Text.fontSize(40);
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
    buildHandCards(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.padding(15);
            Column.backgroundColor('rgba(255,255,255,0.1)');
            Column.borderRadius(15);
            Column.margin({ top: 20 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('动作卡牌');
            Text.fontSize(16);
            Text.fontColor(Color.White);
            Text.fontWeight(FontWeight.Bold);
            Text.margin({ bottom: 10 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Scroll.create();
            Scroll.scrollable(ScrollDirection.Horizontal);
            Scroll.width('100%');
            Scroll.height(120);
        }, Scroll);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = (_item, index: number) => {
                const card = _item;
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Column.create();
                    Column.width(80);
                    Column.height(100);
                    Column.backgroundColor(this.selectedCardIndex === index ? '#FF6B6B' : 'rgba(255,255,255,0.2)');
                    Column.borderRadius(10);
                    Column.justifyContent(FlexAlign.Center);
                    Column.border({
                        width: 2,
                        color: this.selectedCardIndex === index ? '#FF6B6B' : 'rgba(255,255,255,0.3)'
                    });
                    Column.onClick(() => {
                        this.useCard(index);
                    });
                    Column.margin({ left: index === 0 ? 0 : 10 });
                }, Column);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create(card.icon);
                    Text.fontSize(30);
                }, Text);
                Text.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create(card.name);
                    Text.fontSize(12);
                    Text.fontColor(Color.White);
                    Text.margin({ top: 5 });
                }, Text);
                Text.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create(`难度: ${card.difficulty}`);
                    Text.fontSize(10);
                    Text.fontColor('rgba(255,255,255,0.7)');
                    Text.margin({ top: 2 });
                }, Text);
                Text.pop();
                Column.pop();
            };
            this.forEachUpdateFunction(elmtId, this.handCards, forEachItemGenFunction, (card: ActionCard, index: number) => index.toString(), true, true);
        }, ForEach);
        ForEach.pop();
        Row.pop();
        Scroll.pop();
        Column.pop();
    }
    // 帮助弹窗
    buildHelpDialog(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('90%');
            Column.constraintSize({ maxHeight: '80%' });
            Column.padding(20);
            Column.backgroundColor('rgba(102,126,234,0.95)');
            Column.borderRadius(20);
            Column.shadow({ radius: 20, color: 'rgba(0,0,0,0.3)', offsetX: 0, offsetY: 10 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 标题
            Row.create();
            // 标题
            Row.width('100%');
            // 标题
            Row.margin({ bottom: 20 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('📖 游戏玩法');
            Text.fontSize(22);
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
            Button.createWithChild();
            Button.width(36);
            Button.height(36);
            Button.backgroundColor('rgba(255,255,255,0.2)');
            Button.borderRadius(18);
            Button.onClick(() => {
                this.showHelp = false;
            });
        }, Button);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('✕');
            Text.fontSize(20);
            Text.fontColor(Color.White);
        }, Text);
        Text.pop();
        Button.pop();
        // 标题
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
        }, Column);
        // 游戏目标
        this.buildHelpSection.bind(this)('🎯 游戏目标', [
            '在3×3棋盘上凑出指定的奖牌图案',
            '连续完成6组图案即可通关',
            '用时越短、失误越少，分数越高'
        ]);
        // 操作方法
        this.buildHelpSection.bind(this)('🎮 操作方法', [
            '1. 点击下方卡牌选择要执行的动作',
            '2. 点击棋盘位置执行动作效果',
            '3. 部分卡牌需要选择两个位置',
            '4. 完成目标图案后自动进入下一关'
        ]);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 核心卡牌
            Column.create();
            // 核心卡牌
            Column.width('100%');
            // 核心卡牌
            Column.padding(15);
            // 核心卡牌
            Column.backgroundColor('rgba(255,255,255,0.1)');
            // 核心卡牌
            Column.borderRadius(12);
            // 核心卡牌
            Column.margin({ bottom: 15 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('🎴 核心卡牌');
            Text.fontSize(18);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor(Color.White);
            Text.width('100%');
            Text.margin({ bottom: 12 });
        }, Text);
        Text.pop();
        this.buildCardHelp.bind(this)('🔄 Spin', '翻转整列奖牌', '点击后选择列');
        this.buildCardHelp.bind(this)('🦘 Jump', '交换两堆奖牌', '点击后选择两个位置');
        this.buildCardHelp.bind(this)('💃 Pose', '堆叠相邻奖牌', '点击后选择目标位置');
        this.buildCardHelp.bind(this)('🎀 Pirouette', '交换侧边奖牌', '点击后选择位置');
        // 核心卡牌
        Column.pop();
        // 奖牌说明
        this.buildHelpSection.bind(this)('🏆 奖牌评分', [
            '🥇 金牌：零失误，完美表演',
            '🥈 银牌：仅1次失误',
            '🥉 铜牌：2次失误'
        ]);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 提示
            Column.create();
            // 提示
            Column.width('100%');
            // 提示
            Column.padding(15);
            // 提示
            Column.backgroundColor('rgba(255,255,255,0.1)');
            // 提示
            Column.borderRadius(12);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('💡 小提示');
            Text.fontSize(16);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#FFD700');
            Text.width('100%');
            Text.margin({ bottom: 8 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('观察目标图案，规划好步骤再操作，可以减少失误次数！');
            Text.fontSize(14);
            Text.fontColor('rgba(255,255,255,0.9)');
            Text.lineHeight(22);
        }, Text);
        Text.pop();
        // 提示
        Column.pop();
        Column.pop();
        Scroll.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 关闭按钮
            Button.createWithLabel('知道了');
            // 关闭按钮
            Button.width('100%');
            // 关闭按钮
            Button.height(50);
            // 关闭按钮
            Button.backgroundColor('#667eea');
            // 关闭按钮
            Button.borderRadius(25);
            // 关闭按钮
            Button.fontColor(Color.White);
            // 关闭按钮
            Button.fontSize(18);
            // 关闭按钮
            Button.margin({ top: 15 });
            // 关闭按钮
            Button.onClick(() => {
                this.showHelp = false;
            });
        }, Button);
        // 关闭按钮
        Button.pop();
        Column.pop();
    }
    buildHelpSection(title: string, items: string[], parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.padding(15);
            Column.backgroundColor('rgba(255,255,255,0.1)');
            Column.borderRadius(12);
            Column.margin({ bottom: 15 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(title);
            Text.fontSize(18);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor(Color.White);
            Text.width('100%');
            Text.margin({ bottom: 12 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = (_item, index: number) => {
                const item = _item;
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Row.create();
                    Row.width('100%');
                    Row.margin({ bottom: 6 });
                }, Row);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create('•');
                    Text.fontSize(14);
                    Text.fontColor('rgba(255,255,255,0.8)');
                }, Text);
                Text.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create(item);
                    Text.fontSize(14);
                    Text.fontColor('rgba(255,255,255,0.9)');
                    Text.margin({ left: 8 });
                    Text.layoutWeight(1);
                }, Text);
                Text.pop();
                Row.pop();
            };
            this.forEachUpdateFunction(elmtId, items, forEachItemGenFunction, (item: string, index: number) => index.toString(), true, true);
        }, ForEach);
        ForEach.pop();
        Column.pop();
    }
    buildCardHelp(icon: string, desc: string, tip: string, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.padding(8);
            Row.margin({ bottom: 8 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(icon);
            Text.fontSize(20);
            Text.width(50);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.alignItems(HorizontalAlign.Start);
            Column.layoutWeight(1);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(desc);
            Text.fontSize(14);
            Text.fontColor(Color.White);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(tip);
            Text.fontSize(12);
            Text.fontColor('rgba(255,255,255,0.7)');
            Text.margin({ top: 2 });
        }, Text);
        Text.pop();
        Column.pop();
        Row.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "PuzzleGamePage";
    }
}
registerNamedRoute(() => new PuzzleGamePage(undefined, {}), "", { bundleName: "com.example.simplecalculator", moduleName: "entry", pagePath: "pages/PuzzleGamePage", pageFullPath: "entry/src/main/ets/pages/PuzzleGamePage", integratedHsp: "false", moduleType: "followWithHap" });
