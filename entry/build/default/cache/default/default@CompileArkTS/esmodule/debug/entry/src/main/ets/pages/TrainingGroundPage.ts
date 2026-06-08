if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface TrainingGroundPage_Params {
    isTraining?: boolean;
    isPaused?: boolean;
    trainingTime?: number;
    selectedMoves?: string[];
    showMoveSelector?: boolean;
    showEndDialog?: boolean;
    trainingNotes?: string;
    timer?: number;
    jumpMoves?: string[];
    spinMoves?: string[];
    stepMoves?: string[];
    todayMinutes?: number;
    todayActions?: number;
    todayCalories?: number;
}
import router from "@ohos:router";
export class TrainingGroundPage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__isTraining = new ObservedPropertySimplePU(false, this, "isTraining");
        this.__isPaused = new ObservedPropertySimplePU(false, this, "isPaused");
        this.__trainingTime = new ObservedPropertySimplePU(0, this, "trainingTime");
        this.__selectedMoves = new ObservedPropertyObjectPU([], this, "selectedMoves");
        this.__showMoveSelector = new ObservedPropertySimplePU(false, this, "showMoveSelector");
        this.__showEndDialog = new ObservedPropertySimplePU(false, this, "showEndDialog");
        this.__trainingNotes = new ObservedPropertySimplePU('', this, "trainingNotes");
        this.timer = -1;
        this.jumpMoves = ['1A', '2A', '3A', '4A', '1Lz', '2Lz', '3Lz', '4Lz', '1F', '2F', '3F', '4F', '1Lo', '2Lo', '3Lo', '4Lo', '1S', '2S', '3S', '4S', '1T', '2T', '3T', '4T'];
        this.spinMoves = ['USp', 'SSp', 'CSp', 'LSp', 'CCoSp', 'LCoSp'];
        this.stepMoves = ['StSq', 'CiSt', 'RoLi', 'SlSt', 'ChSt'];
        this.__todayMinutes = new ObservedPropertySimplePU(0, this, "todayMinutes");
        this.__todayActions = new ObservedPropertySimplePU(0, this, "todayActions");
        this.__todayCalories = new ObservedPropertySimplePU(0, this, "todayCalories");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: TrainingGroundPage_Params) {
        if (params.isTraining !== undefined) {
            this.isTraining = params.isTraining;
        }
        if (params.isPaused !== undefined) {
            this.isPaused = params.isPaused;
        }
        if (params.trainingTime !== undefined) {
            this.trainingTime = params.trainingTime;
        }
        if (params.selectedMoves !== undefined) {
            this.selectedMoves = params.selectedMoves;
        }
        if (params.showMoveSelector !== undefined) {
            this.showMoveSelector = params.showMoveSelector;
        }
        if (params.showEndDialog !== undefined) {
            this.showEndDialog = params.showEndDialog;
        }
        if (params.trainingNotes !== undefined) {
            this.trainingNotes = params.trainingNotes;
        }
        if (params.timer !== undefined) {
            this.timer = params.timer;
        }
        if (params.jumpMoves !== undefined) {
            this.jumpMoves = params.jumpMoves;
        }
        if (params.spinMoves !== undefined) {
            this.spinMoves = params.spinMoves;
        }
        if (params.stepMoves !== undefined) {
            this.stepMoves = params.stepMoves;
        }
        if (params.todayMinutes !== undefined) {
            this.todayMinutes = params.todayMinutes;
        }
        if (params.todayActions !== undefined) {
            this.todayActions = params.todayActions;
        }
        if (params.todayCalories !== undefined) {
            this.todayCalories = params.todayCalories;
        }
    }
    updateStateVars(params: TrainingGroundPage_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__isTraining.purgeDependencyOnElmtId(rmElmtId);
        this.__isPaused.purgeDependencyOnElmtId(rmElmtId);
        this.__trainingTime.purgeDependencyOnElmtId(rmElmtId);
        this.__selectedMoves.purgeDependencyOnElmtId(rmElmtId);
        this.__showMoveSelector.purgeDependencyOnElmtId(rmElmtId);
        this.__showEndDialog.purgeDependencyOnElmtId(rmElmtId);
        this.__trainingNotes.purgeDependencyOnElmtId(rmElmtId);
        this.__todayMinutes.purgeDependencyOnElmtId(rmElmtId);
        this.__todayActions.purgeDependencyOnElmtId(rmElmtId);
        this.__todayCalories.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__isTraining.aboutToBeDeleted();
        this.__isPaused.aboutToBeDeleted();
        this.__trainingTime.aboutToBeDeleted();
        this.__selectedMoves.aboutToBeDeleted();
        this.__showMoveSelector.aboutToBeDeleted();
        this.__showEndDialog.aboutToBeDeleted();
        this.__trainingNotes.aboutToBeDeleted();
        this.__todayMinutes.aboutToBeDeleted();
        this.__todayActions.aboutToBeDeleted();
        this.__todayCalories.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __isTraining: ObservedPropertySimplePU<boolean>;
    get isTraining() {
        return this.__isTraining.get();
    }
    set isTraining(newValue: boolean) {
        this.__isTraining.set(newValue);
    }
    private __isPaused: ObservedPropertySimplePU<boolean>;
    get isPaused() {
        return this.__isPaused.get();
    }
    set isPaused(newValue: boolean) {
        this.__isPaused.set(newValue);
    }
    private __trainingTime: ObservedPropertySimplePU<number>;
    get trainingTime() {
        return this.__trainingTime.get();
    }
    set trainingTime(newValue: number) {
        this.__trainingTime.set(newValue);
    }
    private __selectedMoves: ObservedPropertyObjectPU<string[]>;
    get selectedMoves() {
        return this.__selectedMoves.get();
    }
    set selectedMoves(newValue: string[]) {
        this.__selectedMoves.set(newValue);
    }
    private __showMoveSelector: ObservedPropertySimplePU<boolean>;
    get showMoveSelector() {
        return this.__showMoveSelector.get();
    }
    set showMoveSelector(newValue: boolean) {
        this.__showMoveSelector.set(newValue);
    }
    private __showEndDialog: ObservedPropertySimplePU<boolean>;
    get showEndDialog() {
        return this.__showEndDialog.get();
    }
    set showEndDialog(newValue: boolean) {
        this.__showEndDialog.set(newValue);
    }
    private __trainingNotes: ObservedPropertySimplePU<string>;
    get trainingNotes() {
        return this.__trainingNotes.get();
    }
    set trainingNotes(newValue: string) {
        this.__trainingNotes.set(newValue);
    }
    private timer: number;
    // 可选动作列表（按类型分组）
    private jumpMoves: string[];
    private spinMoves: string[];
    private stepMoves: string[];
    // 今日训练记录
    private __todayMinutes: ObservedPropertySimplePU<number>;
    get todayMinutes() {
        return this.__todayMinutes.get();
    }
    set todayMinutes(newValue: number) {
        this.__todayMinutes.set(newValue);
    }
    private __todayActions: ObservedPropertySimplePU<number>;
    get todayActions() {
        return this.__todayActions.get();
    }
    set todayActions(newValue: number) {
        this.__todayActions.set(newValue);
    }
    private __todayCalories: ObservedPropertySimplePU<number>;
    get todayCalories() {
        return this.__todayCalories.get();
    }
    set todayCalories(newValue: number) {
        this.__todayCalories.set(newValue);
    }
    aboutToDisappear() {
        if (this.timer !== -1) {
            clearInterval(this.timer);
        }
    }
    // 计算疲劳度：步法=1，旋转=3，跳跃=7
    private calculateFatigue(): number {
        let fatigue = 0;
        this.selectedMoves.forEach((move: string) => {
            if (this.jumpMoves.includes(move))
                fatigue += 7;
            else if (this.spinMoves.includes(move))
                fatigue += 3;
            else if (this.stepMoves.includes(move))
                fatigue += 1;
        });
        return fatigue;
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
            // 顶部标题
            Row.create();
            // 顶部标题
            Row.width('100%');
            // 顶部标题
            Row.padding({ left: 20, right: 20, top: 20, bottom: 20 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('训练台');
            Text.fontSize(24);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#FFFFFF');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 计算器入口
            Button.createWithLabel('计算器');
            // 计算器入口
            Button.fontSize(14);
            // 计算器入口
            Button.fontColor('#FFFFFF');
            // 计算器入口
            Button.backgroundColor('rgba(255, 255, 255, 0.2)');
            // 计算器入口
            Button.borderRadius(20);
            // 计算器入口
            Button.height(36);
            // 计算器入口
            Button.padding({ left: 16, right: 16 });
            // 计算器入口
            Button.onClick(() => {
                router.pushUrl({ url: 'pages/ScoringSimulatorPage' });
            });
        }, Button);
        // 计算器入口
        Button.pop();
        // 顶部标题
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 主内容区
            Column.create();
            // 主内容区
            Column.width('100%');
            // 主内容区
            Column.layoutWeight(1);
            // 主内容区
            Column.padding(20);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (!this.isTraining) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.buildStartTraining.bind(this)();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                    this.buildTrainingProgress.bind(this)();
                });
            }
        }, If);
        If.pop();
        // 主内容区
        Column.pop();
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            // 动作选择弹窗
            if (this.showMoveSelector) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.buildMoveSelector.bind(this)();
                });
            }
            // 结束训练弹窗
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            // 结束训练弹窗
            if (this.showEndDialog) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.buildEndDialog.bind(this)();
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
    buildStartTraining(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.justifyContent(FlexAlign.Center);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 大圆环开始按钮
            Column.create();
            // 大圆环开始按钮
            Column.width(180);
            // 大圆环开始按钮
            Column.height(180);
            // 大圆环开始按钮
            Column.borderRadius(90);
            // 大圆环开始按钮
            Column.backgroundColor('rgba(255, 255, 255, 0.25)');
            // 大圆环开始按钮
            Column.backdropBlur(10);
            // 大圆环开始按钮
            Column.justifyContent(FlexAlign.Center);
            // 大圆环开始按钮
            Column.shadow({ radius: 20, color: 'rgba(0, 0, 0, 0.3)', offsetX: 0, offsetY: 10 });
            // 大圆环开始按钮
            Column.onClick(() => {
                this.showMoveSelector = true;
            });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('⛸️');
            Text.fontSize(60);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('开始训练');
            Text.fontSize(20);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#FFFFFF');
            Text.margin({ top: 10 });
        }, Text);
        Text.pop();
        // 大圆环开始按钮
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 今日统计
            Column.create();
            // 今日统计
            Column.width('100%');
            // 今日统计
            Column.margin({ top: 40 });
            // 今日统计
            Column.padding(20);
            // 今日统计
            Column.backgroundColor('rgba(255, 255, 255, 0.15)');
            // 今日统计
            Column.borderRadius(20);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('今日统计');
            Text.fontSize(16);
            Text.fontColor('#FFFFFF');
            Text.margin({ bottom: 15 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.justifyContent(FlexAlign.SpaceEvenly);
        }, Row);
        this.statCard.bind(this)('⏱️', this.todayMinutes.toString(), '分钟');
        this.statCard.bind(this)('🎯', this.todayActions.toString(), '动作');
        this.statCard.bind(this)('🔥', this.todayCalories.toString(), '卡路里');
        Row.pop();
        // 今日统计
        Column.pop();
        Column.pop();
    }
    buildTrainingProgress(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 计时器
            Column.create();
            // 计时器
            Column.margin({ top: 30 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.formatTime(this.trainingTime));
            Text.fontSize(56);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#FFFFFF');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.isPaused ? '已暂停' : '训练中...');
            Text.fontSize(16);
            Text.fontColor('rgba(255, 255, 255, 0.8)');
            Text.margin({ top: 10 });
        }, Text);
        Text.pop();
        // 计时器
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 已选动作
            Column.create();
            // 已选动作
            Column.width('100%');
            // 已选动作
            Column.padding(20);
            // 已选动作
            Column.backgroundColor('rgba(255, 255, 255, 0.15)');
            // 已选动作
            Column.borderRadius(20);
            // 已选动作
            Column.margin({ top: 20 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.margin({ bottom: 10 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('本次练习动作');
            Text.fontSize(16);
            Text.fontColor('#FFFFFF');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 疲劳度显示
            Text.create(`疲劳度: ${this.calculateFatigue()}`);
            // 疲劳度显示
            Text.fontSize(14);
            // 疲劳度显示
            Text.fontColor('#FFD700');
        }, Text);
        // 疲劳度显示
        Text.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Flex.create({ wrap: FlexWrap.Wrap });
            Flex.width('100%');
        }, Flex);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const move = _item;
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Row.create();
                    Row.backgroundColor(this.getMoveColor(move));
                    Row.borderRadius(15);
                    Row.padding({ left: 12, right: 12, top: 6, bottom: 6 });
                    Row.margin({ right: 8, bottom: 8 });
                }, Row);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create(this.getMoveIcon(move));
                    Text.fontSize(12);
                }, Text);
                Text.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create(move);
                    Text.fontSize(14);
                    Text.fontColor('#FFFFFF');
                    Text.margin({ left: 4 });
                }, Text);
                Text.pop();
                Row.pop();
            };
            this.forEachUpdateFunction(elmtId, this.selectedMoves, forEachItemGenFunction);
        }, ForEach);
        ForEach.pop();
        Flex.pop();
        // 已选动作
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 控制按钮
            Row.create();
            // 控制按钮
            Row.margin({ top: 30 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel(this.isPaused ? '继续' : '暂停');
            Button.fontSize(16);
            Button.fontColor('#FFFFFF');
            Button.backgroundColor('rgba(255, 255, 255, 0.3)');
            Button.borderRadius(25);
            Button.width(100);
            Button.height(50);
            Button.onClick(() => {
                this.togglePause();
            });
        }, Button);
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('结束训练');
            Button.fontSize(16);
            Button.fontColor('#FFFFFF');
            Button.backgroundColor('#FF6B6B');
            Button.borderRadius(25);
            Button.width(120);
            Button.height(50);
            Button.margin({ left: 20 });
            Button.onClick(() => {
                this.stopTraining();
            });
        }, Button);
        Button.pop();
        // 控制按钮
        Row.pop();
        Column.pop();
    }
    buildMoveSelector(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.height('100%');
            Column.backgroundColor('rgba(0, 0, 0, 0.5)');
            Column.justifyContent(FlexAlign.Center);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('90%');
            Column.padding(20);
            Column.backgroundColor('#FFFFFF');
            Column.borderRadius(20);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('选择本次练习动作');
            Text.fontSize(18);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#333333');
            Text.margin({ bottom: 15 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Scroll.create();
            Scroll.height(350);
            Scroll.width('100%');
        }, Scroll);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
        }, Column);
        // 跳跃
        this.buildMoveCategory.bind(this)('跳跃', this.jumpMoves, '🦶');
        // 旋转
        this.buildMoveCategory.bind(this)('旋转', this.spinMoves, '🌀');
        // 步法
        this.buildMoveCategory.bind(this)('步法', this.stepMoves, '👣');
        Column.pop();
        Scroll.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 已选疲劳度预览
            Row.create();
            // 已选疲劳度预览
            Row.width('100%');
            // 已选疲劳度预览
            Row.margin({ top: 15, bottom: 15 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(`已选 ${this.selectedMoves.length} 个动作`);
            Text.fontSize(14);
            Text.fontColor('#666666');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(`疲劳度: ${this.calculateFatigue()}`);
            Text.fontSize(14);
            Text.fontColor('#FF6B6B');
            Text.fontWeight(FontWeight.Bold);
        }, Text);
        Text.pop();
        // 已选疲劳度预览
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('取消');
            Button.fontSize(16);
            Button.fontColor('#666666');
            Button.backgroundColor('#F0F0F0');
            Button.borderRadius(20);
            Button.width(100);
            Button.onClick(() => {
                this.showMoveSelector = false;
                this.selectedMoves = [];
            });
        }, Button);
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('开始训练');
            Button.fontSize(16);
            Button.fontColor('#FFFFFF');
            Button.backgroundColor('#3A7BD5');
            Button.borderRadius(20);
            Button.width(120);
            Button.margin({ left: 20 });
            Button.onClick(() => {
                if (this.selectedMoves.length > 0) {
                    this.showMoveSelector = false;
                    this.startTraining();
                }
            });
        }, Button);
        Button.pop();
        Row.pop();
        Column.pop();
        Column.pop();
    }
    buildMoveCategory(title: string, moves: string[], icon: string, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.alignItems(HorizontalAlign.Start);
            Column.margin({ bottom: 15 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.margin({ bottom: 8 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(icon);
            Text.fontSize(16);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(title);
            Text.fontSize(14);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#333333');
            Text.margin({ left: 5 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(`疲劳度: ${title === '跳跃' ? '7' : title === '旋转' ? '3' : '1'}`);
            Text.fontSize(12);
            Text.fontColor('#999999');
        }, Text);
        Text.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Flex.create({ wrap: FlexWrap.Wrap });
        }, Flex);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const move = _item;
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create(move);
                    Text.fontSize(13);
                    Text.fontColor(this.selectedMoves.includes(move) ? '#FFFFFF' : '#333333');
                    Text.backgroundColor(this.selectedMoves.includes(move) ? '#3A7BD5' : '#F0F0F0');
                    Text.borderRadius(8);
                    Text.padding({ left: 10, right: 10, top: 6, bottom: 6 });
                    Text.margin({ right: 6, bottom: 6 });
                    Text.onClick(() => {
                        if (this.selectedMoves.includes(move)) {
                            this.selectedMoves = this.selectedMoves.filter((m: string) => m !== move);
                        }
                        else {
                            this.selectedMoves.push(move);
                        }
                    });
                }, Text);
                Text.pop();
            };
            this.forEachUpdateFunction(elmtId, moves, forEachItemGenFunction);
        }, ForEach);
        ForEach.pop();
        Flex.pop();
        Column.pop();
    }
    buildEndDialog(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.height('100%');
            Column.backgroundColor('rgba(0, 0, 0, 0.5)');
            Column.justifyContent(FlexAlign.Center);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('85%');
            Column.padding(25);
            Column.backgroundColor('#FFFFFF');
            Column.borderRadius(20);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('🎉 训练完成！');
            Text.fontSize(20);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#333333');
            Text.margin({ bottom: 20 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 训练统计
            Column.create();
            // 训练统计
            Column.width('100%');
            // 训练统计
            Column.padding(20);
            // 训练统计
            Column.backgroundColor('#F8F8F8');
            // 训练统计
            Column.borderRadius(15);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.justifyContent(FlexAlign.SpaceEvenly);
        }, Row);
        this.resultItem.bind(this)('⏱️', this.formatTime(this.trainingTime), '时长');
        this.resultItem.bind(this)('🎯', this.selectedMoves.length.toString(), '动作');
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.justifyContent(FlexAlign.SpaceEvenly);
            Row.margin({ top: 15 });
        }, Row);
        this.resultItem.bind(this)('🔥', Math.round(this.trainingTime * 0.1).toString(), '卡路里');
        this.resultItem.bind(this)('💪', this.calculateFatigue().toString(), '疲劳度');
        Row.pop();
        // 训练统计
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 备注
            TextInput.create({ placeholder: '添加训练备注...', text: this.trainingNotes });
            // 备注
            TextInput.fontSize(14);
            // 备注
            TextInput.backgroundColor('#F0F0F0');
            // 备注
            TextInput.borderRadius(10);
            // 备注
            TextInput.height(40);
            // 备注
            TextInput.width('100%');
            // 备注
            TextInput.margin({ top: 15 });
            // 备注
            TextInput.onChange((value: string) => {
                this.trainingNotes = value;
            });
        }, TextInput);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('保存记录');
            Button.fontSize(16);
            Button.fontColor('#FFFFFF');
            Button.backgroundColor('#4CAF50');
            Button.borderRadius(20);
            Button.width('100%');
            Button.height(45);
            Button.margin({ top: 20 });
            Button.onClick(() => {
                this.saveTraining();
            });
        }, Button);
        Button.pop();
        Column.pop();
        Column.pop();
    }
    statCard(icon: string, value: string, label: string, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(icon);
            Text.fontSize(24);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(value);
            Text.fontSize(24);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#FFFFFF');
            Text.margin({ top: 5 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(label);
            Text.fontSize(12);
            Text.fontColor('rgba(255, 255, 255, 0.8)');
        }, Text);
        Text.pop();
        Column.pop();
    }
    resultItem(icon: string, value: string, label: string, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(icon);
            Text.fontSize(24);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(value);
            Text.fontSize(20);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#333333');
            Text.margin({ top: 5 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(label);
            Text.fontSize(12);
            Text.fontColor('#999999');
        }, Text);
        Text.pop();
        Column.pop();
    }
    private getMoveIcon(move: string): string {
        if (this.jumpMoves.includes(move))
            return '🦶';
        if (this.spinMoves.includes(move))
            return '🌀';
        if (this.stepMoves.includes(move))
            return '👣';
        return '⛸️';
    }
    private getMoveColor(move: string): string {
        if (this.jumpMoves.includes(move))
            return 'rgba(255, 107, 107, 0.8)';
        if (this.spinMoves.includes(move))
            return 'rgba(102, 187, 106, 0.8)';
        if (this.stepMoves.includes(move))
            return 'rgba(79, 195, 247, 0.8)';
        return 'rgba(255, 255, 255, 0.3)';
    }
    private startTraining() {
        this.isTraining = true;
        this.isPaused = false;
        this.trainingTime = 0;
        this.timer = setInterval(() => {
            if (!this.isPaused) {
                this.trainingTime++;
            }
        }, 1000);
    }
    private togglePause() {
        this.isPaused = !this.isPaused;
    }
    private stopTraining() {
        if (this.timer !== -1) {
            clearInterval(this.timer);
            this.timer = -1;
        }
        this.showEndDialog = true;
    }
    private saveTraining() {
        // 更新今日统计
        this.todayMinutes += Math.floor(this.trainingTime / 60);
        this.todayActions += this.selectedMoves.length;
        this.todayCalories += Math.round(this.trainingTime * 0.1);
        // 重置状态
        this.showEndDialog = false;
        this.isTraining = false;
        this.trainingTime = 0;
        this.selectedMoves = [];
        this.trainingNotes = '';
    }
    private formatTime(seconds: number): string {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    rerender() {
        this.updateDirtyElements();
    }
}
