if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface EdgeFlowMainPage_Params {
    currentTab?: number;
    isTraining?: boolean;
    trainingTime?: number;
    selectedMoves?: string[];
    showMoveSelector?: boolean;
    todayRecords?: PracticeRecord[];
    showHistoryPanel?: boolean;
    currentWeekPlan?: WeeklyPlan | null;
    showPlanPanel?: boolean;
    editingDayIndex?: number;
    showAddMovePanel?: boolean;
    selectedMoveForPlan?: string;
    targetCountInput?: string;
    selectedPriority?: string;
    timer?: number;
    dataStore?: DataStore;
    jumpMoves?: string[];
    spinMoves?: string[];
    stepMoves?: string[];
}
import router from "@ohos:router";
import { MoveLibraryPage } from "@bundle:com.example.simplecalculator/entry/ets/pages/MoveLibraryPage";
import { AchievementPage } from "@bundle:com.example.simplecalculator/entry/ets/pages/AchievementPage";
import { DataStore } from "@bundle:com.example.simplecalculator/entry/ets/services/DataStore";
import type { PracticeRecord, WeeklyPlan, DailyPlan, PlannedMove } from '../models/IceTraceData';
import { DeviceUtils } from "@bundle:com.example.simplecalculator/entry/ets/common/utils/DeviceUtils";
class EdgeFlowMainPage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__currentTab = new ObservedPropertySimplePU(0, this, "currentTab");
        this.__isTraining = new ObservedPropertySimplePU(false, this, "isTraining");
        this.__trainingTime = new ObservedPropertySimplePU(0, this, "trainingTime");
        this.__selectedMoves = new ObservedPropertyObjectPU([], this, "selectedMoves");
        this.__showMoveSelector = new ObservedPropertySimplePU(false, this, "showMoveSelector");
        this.__todayRecords = new ObservedPropertyObjectPU([], this, "todayRecords");
        this.__showHistoryPanel = new ObservedPropertySimplePU(false, this, "showHistoryPanel");
        this.__currentWeekPlan = new ObservedPropertyObjectPU(null, this, "currentWeekPlan");
        this.__showPlanPanel = new ObservedPropertySimplePU(false, this, "showPlanPanel");
        this.__editingDayIndex = new ObservedPropertySimplePU(-1, this, "editingDayIndex");
        this.__showAddMovePanel = new ObservedPropertySimplePU(false, this, "showAddMovePanel");
        this.__selectedMoveForPlan = new ObservedPropertySimplePU('', this, "selectedMoveForPlan");
        this.__targetCountInput = new ObservedPropertySimplePU('', this, "targetCountInput");
        this.__selectedPriority = new ObservedPropertySimplePU('medium', this, "selectedPriority");
        this.timer = -1;
        this.dataStore = DataStore.getInstance();
        this.jumpMoves = ['1A', '2A', '3A', '1Lz', '2Lz', '3Lz', '1F', '2F', '3F', '1Lo', '2Lo', '3Lo', '1S', '2S', '3S', '1T', '2T', '3T'];
        this.spinMoves = ['USp', 'SSp', 'CSp', 'LSp', 'CCoSp'];
        this.stepMoves = ['StSq', 'CiSt', 'RoLi', 'SlSt'];
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: EdgeFlowMainPage_Params) {
        if (params.currentTab !== undefined) {
            this.currentTab = params.currentTab;
        }
        if (params.isTraining !== undefined) {
            this.isTraining = params.isTraining;
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
        if (params.todayRecords !== undefined) {
            this.todayRecords = params.todayRecords;
        }
        if (params.showHistoryPanel !== undefined) {
            this.showHistoryPanel = params.showHistoryPanel;
        }
        if (params.currentWeekPlan !== undefined) {
            this.currentWeekPlan = params.currentWeekPlan;
        }
        if (params.showPlanPanel !== undefined) {
            this.showPlanPanel = params.showPlanPanel;
        }
        if (params.editingDayIndex !== undefined) {
            this.editingDayIndex = params.editingDayIndex;
        }
        if (params.showAddMovePanel !== undefined) {
            this.showAddMovePanel = params.showAddMovePanel;
        }
        if (params.selectedMoveForPlan !== undefined) {
            this.selectedMoveForPlan = params.selectedMoveForPlan;
        }
        if (params.targetCountInput !== undefined) {
            this.targetCountInput = params.targetCountInput;
        }
        if (params.selectedPriority !== undefined) {
            this.selectedPriority = params.selectedPriority;
        }
        if (params.timer !== undefined) {
            this.timer = params.timer;
        }
        if (params.dataStore !== undefined) {
            this.dataStore = params.dataStore;
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
    }
    updateStateVars(params: EdgeFlowMainPage_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__currentTab.purgeDependencyOnElmtId(rmElmtId);
        this.__isTraining.purgeDependencyOnElmtId(rmElmtId);
        this.__trainingTime.purgeDependencyOnElmtId(rmElmtId);
        this.__selectedMoves.purgeDependencyOnElmtId(rmElmtId);
        this.__showMoveSelector.purgeDependencyOnElmtId(rmElmtId);
        this.__todayRecords.purgeDependencyOnElmtId(rmElmtId);
        this.__showHistoryPanel.purgeDependencyOnElmtId(rmElmtId);
        this.__currentWeekPlan.purgeDependencyOnElmtId(rmElmtId);
        this.__showPlanPanel.purgeDependencyOnElmtId(rmElmtId);
        this.__editingDayIndex.purgeDependencyOnElmtId(rmElmtId);
        this.__showAddMovePanel.purgeDependencyOnElmtId(rmElmtId);
        this.__selectedMoveForPlan.purgeDependencyOnElmtId(rmElmtId);
        this.__targetCountInput.purgeDependencyOnElmtId(rmElmtId);
        this.__selectedPriority.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__currentTab.aboutToBeDeleted();
        this.__isTraining.aboutToBeDeleted();
        this.__trainingTime.aboutToBeDeleted();
        this.__selectedMoves.aboutToBeDeleted();
        this.__showMoveSelector.aboutToBeDeleted();
        this.__todayRecords.aboutToBeDeleted();
        this.__showHistoryPanel.aboutToBeDeleted();
        this.__currentWeekPlan.aboutToBeDeleted();
        this.__showPlanPanel.aboutToBeDeleted();
        this.__editingDayIndex.aboutToBeDeleted();
        this.__showAddMovePanel.aboutToBeDeleted();
        this.__selectedMoveForPlan.aboutToBeDeleted();
        this.__targetCountInput.aboutToBeDeleted();
        this.__selectedPriority.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __currentTab: ObservedPropertySimplePU<number>;
    get currentTab() {
        return this.__currentTab.get();
    }
    set currentTab(newValue: number) {
        this.__currentTab.set(newValue);
    }
    private __isTraining: ObservedPropertySimplePU<boolean>;
    get isTraining() {
        return this.__isTraining.get();
    }
    set isTraining(newValue: boolean) {
        this.__isTraining.set(newValue);
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
    // 当天历史练习记录
    private __todayRecords: ObservedPropertyObjectPU<PracticeRecord[]>;
    get todayRecords() {
        return this.__todayRecords.get();
    }
    set todayRecords(newValue: PracticeRecord[]) {
        this.__todayRecords.set(newValue);
    }
    private __showHistoryPanel: ObservedPropertySimplePU<boolean>;
    get showHistoryPanel() {
        return this.__showHistoryPanel.get();
    }
    set showHistoryPanel(newValue: boolean) {
        this.__showHistoryPanel.set(newValue);
    }
    // 周训练计划
    private __currentWeekPlan: ObservedPropertyObjectPU<WeeklyPlan | null>;
    get currentWeekPlan() {
        return this.__currentWeekPlan.get();
    }
    set currentWeekPlan(newValue: WeeklyPlan | null) {
        this.__currentWeekPlan.set(newValue);
    }
    private __showPlanPanel: ObservedPropertySimplePU<boolean>;
    get showPlanPanel() {
        return this.__showPlanPanel.get();
    }
    set showPlanPanel(newValue: boolean) {
        this.__showPlanPanel.set(newValue);
    }
    private __editingDayIndex: ObservedPropertySimplePU<number>;
    get editingDayIndex() {
        return this.__editingDayIndex.get();
    }
    set editingDayIndex(newValue: number) {
        this.__editingDayIndex.set(newValue);
    }
    private __showAddMovePanel: ObservedPropertySimplePU<boolean>;
    get showAddMovePanel() {
        return this.__showAddMovePanel.get();
    }
    set showAddMovePanel(newValue: boolean) {
        this.__showAddMovePanel.set(newValue);
    }
    private __selectedMoveForPlan: ObservedPropertySimplePU<string>;
    get selectedMoveForPlan() {
        return this.__selectedMoveForPlan.get();
    }
    set selectedMoveForPlan(newValue: string) {
        this.__selectedMoveForPlan.set(newValue);
    }
    private __targetCountInput: ObservedPropertySimplePU<string>;
    get targetCountInput() {
        return this.__targetCountInput.get();
    }
    set targetCountInput(newValue: string) {
        this.__targetCountInput.set(newValue);
    }
    private __selectedPriority: ObservedPropertySimplePU<string>;
    get selectedPriority() {
        return this.__selectedPriority.get();
    }
    set selectedPriority(newValue: string) {
        this.__selectedPriority.set(newValue);
    }
    private timer: number;
    private dataStore: DataStore;
    // 可选动作列表
    private jumpMoves: string[];
    private spinMoves: string[];
    private stepMoves: string[];
    aboutToAppear() {
        // 注释掉测试数据生成，避免初始值不为零
        // TestDataGenerator.getInstance().generateTestData();
        // 加载今日记录和周计划
        this.loadTodayRecords();
        this.loadCurrentWeekPlan();
    }
    aboutToDisappear() {
        if (this.timer !== -1) {
            clearInterval(this.timer);
        }
    }
    loadTodayRecords() {
        this.todayRecords = this.dataStore.getTodayRecords();
    }
    loadCurrentWeekPlan() {
        const plan = this.dataStore.getCurrentWeekPlan();
        this.currentWeekPlan = plan || null;
    }
    // 格式化时间
    formatTime(seconds: number): string {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    // 计算疲劳度
    calculateFatigue(): number {
        let fatigue = 0;
        this.selectedMoves.forEach(move => {
            if (this.jumpMoves.includes(move))
                fatigue += 7;
            else if (this.spinMoves.includes(move))
                fatigue += 3;
            else if (this.stepMoves.includes(move))
                fatigue += 1;
        });
        return fatigue;
    }
    // 获取今日总训练分钟
    getTodayTotalMinutes(): number {
        // 计算已保存记录的总时长
        const savedSeconds = this.todayRecords.reduce((sum, record) => sum + record.duration, 0);
        // 加上当前正在训练的时长
        const currentSeconds = this.isTraining ? this.trainingTime : 0;
        return Math.floor((savedSeconds + currentSeconds) / 60);
    }
    // 获取今日总疲劳度
    getTodayTotalFatigue(): number {
        // 计算已保存记录的总疲劳度
        const savedFatigue = this.todayRecords.reduce((sum, record) => sum + record.fatigue, 0);
        // 加上当前正在训练的疲劳度
        const currentFatigue = this.isTraining ? this.calculateFatigue() : 0;
        return savedFatigue + currentFatigue;
    }
    // 获取今日总训练次数
    getTodayTotalCount(): number {
        // 已保存记录数 + 当前正在训练的动作数
        return this.todayRecords.length + (this.isTraining ? this.selectedMoves.length : 0);
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
            Column.linearGradient({
                angle: 135,
                colors: [['#00D2FF', 0.0], ['#3A7BD5', 1.0]]
            });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 内容区域
            Column.create();
            // 内容区域
            Column.width('100%');
            // 内容区域
            Column.layoutWeight(1);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.currentTab === 0) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.buildTrainingGround.bind(this)();
                });
            }
            else if (this.currentTab === 1) {
                this.ifElseBranchUpdateFunction(1, () => {
                    {
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            if (isInitialRender) {
                                let componentCall = new MoveLibraryPage(this, {}, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/EdgeFlowMainPage.ets", line: 117, col: 13 });
                                ViewPU.create(componentCall);
                                let paramsLambda = () => {
                                    return {};
                                };
                                componentCall.paramsGenerator_ = paramsLambda;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(elmtId, {});
                            }
                        }, { name: "MoveLibraryPage" });
                    }
                });
            }
            else if (this.currentTab === 2) {
                this.ifElseBranchUpdateFunction(2, () => {
                    this.buildIceNews.bind(this)();
                });
            }
            else if (this.currentTab === 3) {
                this.ifElseBranchUpdateFunction(3, () => {
                    {
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            if (isInitialRender) {
                                let componentCall = new AchievementPage(this, {}, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/EdgeFlowMainPage.ets", line: 121, col: 13 });
                                ViewPU.create(componentCall);
                                let paramsLambda = () => {
                                    return {};
                                };
                                componentCall.paramsGenerator_ = paramsLambda;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(elmtId, {});
                            }
                        }, { name: "AchievementPage" });
                    }
                });
            }
            else {
                this.ifElseBranchUpdateFunction(4, () => {
                    this.buildProfile.bind(this)();
                });
            }
        }, If);
        If.pop();
        // 内容区域
        Column.pop();
        // 底部导航栏
        this.buildBottomNav.bind(this)();
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            // 动作选择弹窗
            if (this.showMoveSelector) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.buildMoveSelector.bind(this)();
                });
            }
            // 历史记录面板
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            // 历史记录面板
            if (this.showHistoryPanel) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.buildHistoryPanel.bind(this)();
                });
            }
            // 计划本面板
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            // 计划本面板
            if (this.showPlanPanel) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.buildPlanPanel.bind(this)();
                });
            }
            // 添加动作面板
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            // 添加动作面板
            if (this.showAddMovePanel) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.buildAddMovePanel.bind(this)();
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
    // 训练台
    buildTrainingGround(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Scroll.create();
            Scroll.width('100%');
            Scroll.layoutWeight(1);
            Scroll.scrollBar(BarState.Off);
            Scroll.edgeEffect(EdgeEffect.Spring);
        }, Scroll);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.padding(DeviceUtils.isWearable() ? 8 : 20);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.margin({ bottom: DeviceUtils.isWearable() ? 12 : 30 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('⛸️ 训练台');
            Text.fontSize(DeviceUtils.isWearable() ? 16 : 24);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#FFFFFF');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            // 手表端隐藏部分按钮，只保留核心功能
            if (!DeviceUtils.isWearable()) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        // 计划本按钮
                        Button.createWithLabel('📅 计划');
                        // 计划本按钮
                        Button.fontSize(13);
                        // 计划本按钮
                        Button.fontColor('#FFFFFF');
                        // 计划本按钮
                        Button.backgroundColor('rgba(255, 255, 255, 0.2)');
                        // 计划本按钮
                        Button.borderRadius(15);
                        // 计划本按钮
                        Button.height(32);
                        // 计划本按钮
                        Button.padding({ left: 10, right: 10 });
                        // 计划本按钮
                        Button.onClick(() => {
                            this.showPlanPanel = true;
                        });
                    }, Button);
                    // 计划本按钮
                    Button.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        // 历史记录按钮
                        Button.createWithLabel('📋 记录');
                        // 历史记录按钮
                        Button.fontSize(13);
                        // 历史记录按钮
                        Button.fontColor('#FFFFFF');
                        // 历史记录按钮
                        Button.backgroundColor('rgba(255, 255, 255, 0.2)');
                        // 历史记录按钮
                        Button.borderRadius(15);
                        // 历史记录按钮
                        Button.height(32);
                        // 历史记录按钮
                        Button.padding({ left: 10, right: 10 });
                        // 历史记录按钮
                        Button.margin({ left: 6 });
                        // 历史记录按钮
                        Button.onClick(() => {
                            this.showHistoryPanel = true;
                        });
                    }, Button);
                    // 历史记录按钮
                    Button.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        // 计算器入口
                        Button.createWithLabel('🧮 计算器');
                        // 计算器入口
                        Button.fontSize(13);
                        // 计算器入口
                        Button.fontColor('#FFFFFF');
                        // 计算器入口
                        Button.backgroundColor('rgba(255, 255, 255, 0.2)');
                        // 计算器入口
                        Button.borderRadius(15);
                        // 计算器入口
                        Button.height(32);
                        // 计算器入口
                        Button.padding({ left: 10, right: 10 });
                        // 计算器入口
                        Button.margin({ left: 6 });
                        // 计算器入口
                        Button.onClick(() => {
                            router.pushUrl({
                                url: 'pages/ScoringSimulatorPage'
                            });
                        });
                    }, Button);
                    // 计算器入口
                    Button.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        // 手表端只显示计算器按钮
                        Button.createWithLabel('🧮');
                        // 手表端只显示计算器按钮
                        Button.fontSize(14);
                        // 手表端只显示计算器按钮
                        Button.fontColor('#FFFFFF');
                        // 手表端只显示计算器按钮
                        Button.backgroundColor('rgba(255, 255, 255, 0.2)');
                        // 手表端只显示计算器按钮
                        Button.borderRadius(12);
                        // 手表端只显示计算器按钮
                        Button.height(28);
                        // 手表端只显示计算器按钮
                        Button.width(28);
                        // 手表端只显示计算器按钮
                        Button.onClick(() => {
                            router.pushUrl({
                                url: 'pages/ScoringSimulatorPage'
                            });
                        });
                    }, Button);
                    // 手表端只显示计算器按钮
                    Button.pop();
                });
            }
        }, If);
        If.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (!this.isTraining) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        // 大圆环开始按钮
                        Column.create();
                        // 大圆环开始按钮
                        Column.width(DeviceUtils.isWearable() ? 100 : 180);
                        // 大圆环开始按钮
                        Column.height(DeviceUtils.isWearable() ? 100 : 180);
                        // 大圆环开始按钮
                        Column.borderRadius(DeviceUtils.isWearable() ? 50 : 90);
                        // 大圆环开始按钮
                        Column.backgroundColor('rgba(255, 255, 255, 0.25)');
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
                        Text.fontSize(DeviceUtils.isWearable() ? 32 : 60);
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('开始训练');
                        Text.fontSize(DeviceUtils.isWearable() ? 14 : 20);
                        Text.fontWeight(FontWeight.Bold);
                        Text.fontColor('#FFFFFF');
                        Text.margin({ top: DeviceUtils.isWearable() ? 4 : 10 });
                    }, Text);
                    Text.pop();
                    // 大圆环开始按钮
                    Column.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        If.create();
                        // 手表端添加更多内容，确保可以滚动
                        if (DeviceUtils.isWearable()) {
                            this.ifElseBranchUpdateFunction(0, () => {
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    Column.create();
                                    Column.width('100%');
                                    Column.padding(10);
                                    Column.margin({ top: 20 });
                                }, Column);
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    Text.create('今日统计');
                                    Text.fontSize(14);
                                    Text.fontColor('#FFFFFF');
                                    Text.margin({ top: 20, bottom: 10 });
                                }, Text);
                                Text.pop();
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    Row.create();
                                    Row.width('100%');
                                }, Row);
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    Column.create();
                                    Column.layoutWeight(1);
                                }, Column);
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    Text.create('⏱️');
                                    Text.fontSize(20);
                                }, Text);
                                Text.pop();
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    Text.create(`${this.getTodayTotalMinutes()}分钟`);
                                    Text.fontSize(12);
                                    Text.fontColor('#FFFFFF');
                                    Text.margin({ top: 4 });
                                }, Text);
                                Text.pop();
                                Column.pop();
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    Column.create();
                                    Column.layoutWeight(1);
                                }, Column);
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    Text.create('🎯');
                                    Text.fontSize(20);
                                }, Text);
                                Text.pop();
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    Text.create(`${this.getTodayTotalCount()}次`);
                                    Text.fontSize(12);
                                    Text.fontColor('#FFFFFF');
                                    Text.margin({ top: 4 });
                                }, Text);
                                Text.pop();
                                Column.pop();
                                Row.pop();
                                Column.pop();
                            });
                        }
                        else {
                            this.ifElseBranchUpdateFunction(1, () => {
                            });
                        }
                    }, If);
                    If.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        // 训练进行中
                        Column.create();
                        // 训练进行中
                        Column.width('100%');
                        // 训练进行中
                        Column.justifyContent(FlexAlign.Center);
                    }, Column);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(this.formatTime(this.trainingTime));
                        Text.fontSize(DeviceUtils.isWearable() ? 32 : 48);
                        Text.fontWeight(FontWeight.Bold);
                        Text.fontColor('#FFFFFF');
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(`已选动作: ${this.selectedMoves.length}个`);
                        Text.fontSize(DeviceUtils.isWearable() ? 11 : 16);
                        Text.fontColor('rgba(255, 255, 255, 0.8)');
                        Text.margin({ top: DeviceUtils.isWearable() ? 4 : 10 });
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(`疲劳度: ${this.calculateFatigue()}`);
                        Text.fontSize(DeviceUtils.isWearable() ? 11 : 16);
                        Text.fontColor('rgba(255, 255, 255, 0.8)');
                        Text.margin({ top: 4 });
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        // 结束训练按钮
                        Button.createWithLabel('结束训练');
                        // 结束训练按钮
                        Button.fontSize(DeviceUtils.isWearable() ? 13 : 18);
                        // 结束训练按钮
                        Button.fontColor('#FFFFFF');
                        // 结束训练按钮
                        Button.backgroundColor('rgba(255, 100, 100, 0.8)');
                        // 结束训练按钮
                        Button.borderRadius(DeviceUtils.isWearable() ? 18 : 25);
                        // 结束训练按钮
                        Button.height(DeviceUtils.isWearable() ? 36 : 50);
                        // 结束训练按钮
                        Button.width(DeviceUtils.isWearable() ? 100 : 150);
                        // 结束训练按钮
                        Button.margin({ top: DeviceUtils.isWearable() ? 16 : 30 });
                        // 结束训练按钮
                        Button.onClick(() => {
                            this.stopTraining();
                        });
                    }, Button);
                    // 结束训练按钮
                    Button.pop();
                    // 训练进行中
                    Column.pop();
                });
            }
        }, If);
        If.pop();
        Column.pop();
        Scroll.pop();
    }
    // 开始训练
    startTraining() {
        this.isTraining = true;
        this.trainingTime = 0;
        this.showMoveSelector = false;
        this.timer = setInterval(() => {
            this.trainingTime++;
        }, 1000);
    }
    // 停止训练
    stopTraining() {
        if (this.timer !== -1) {
            clearInterval(this.timer);
            this.timer = -1;
        }
        // 保存训练记录
        if (this.trainingTime > 0 && this.selectedMoves.length > 0) {
            const today = new Date();
            const dateStr = today.toISOString().split('T')[0];
            const timeStr = today.toTimeString().split(' ')[0].substring(0, 5);
            const fatigue = this.calculateFatigue();
            // 为每个选中的动作保存练习记录
            this.selectedMoves.forEach((moveId, index) => {
                // 计算每个动作的练习时长（平均分配总时长）
                const moveDuration = Math.floor(this.trainingTime / this.selectedMoves.length);
                // 生成唯一ID
                const recordId = `${dateStr}-${timeStr}-${moveId}-${index}`;
                // 保存训练记录
                this.dataStore.addPracticeRecord({
                    id: recordId,
                    moveName: moveId,
                    date: dateStr,
                    time: timeStr,
                    duration: moveDuration,
                    fatigue: Math.floor(fatigue / this.selectedMoves.length),
                    notes: `训练时长: ${this.formatTime(moveDuration)}`
                });
            });
            // 清空选中动作
            this.selectedMoves = [];
            // 刷新今日记录
            this.loadTodayRecords();
        }
        this.isTraining = false;
    }
    // 动作选择弹窗
    buildMoveSelector(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.height('100%');
            Column.backgroundColor('rgba(0, 0, 0, 0.5)');
            Column.justifyContent(FlexAlign.Center);
            Column.onClick(() => {
                // 点击外部不关闭
            });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('85%');
            Column.padding(25);
            Column.backgroundColor('#FFFFFF');
            Column.borderRadius(20);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('选择训练动作');
            Text.fontSize(20);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#333333');
            Text.margin({ bottom: 20 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 跳跃动作
            Text.create('跳跃 (疲劳度: 7)');
            // 跳跃动作
            Text.fontSize(14);
            // 跳跃动作
            Text.fontColor('#666666');
            // 跳跃动作
            Text.margin({ bottom: 10 });
        }, Text);
        // 跳跃动作
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Flex.create({ wrap: FlexWrap.Wrap });
            Flex.width('100%');
            Flex.margin({ bottom: 15 });
        }, Flex);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const move = _item;
                this.moveChip.bind(this)(move);
            };
            this.forEachUpdateFunction(elmtId, this.jumpMoves, forEachItemGenFunction);
        }, ForEach);
        ForEach.pop();
        Flex.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 旋转动作
            Text.create('旋转 (疲劳度: 3)');
            // 旋转动作
            Text.fontSize(14);
            // 旋转动作
            Text.fontColor('#666666');
            // 旋转动作
            Text.margin({ bottom: 10 });
        }, Text);
        // 旋转动作
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Flex.create({ wrap: FlexWrap.Wrap });
            Flex.width('100%');
            Flex.margin({ bottom: 15 });
        }, Flex);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const move = _item;
                this.moveChip.bind(this)(move);
            };
            this.forEachUpdateFunction(elmtId, this.spinMoves, forEachItemGenFunction);
        }, ForEach);
        ForEach.pop();
        Flex.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 步法动作
            Text.create('步法 (疲劳度: 1)');
            // 步法动作
            Text.fontSize(14);
            // 步法动作
            Text.fontColor('#666666');
            // 步法动作
            Text.margin({ bottom: 10 });
        }, Text);
        // 步法动作
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Flex.create({ wrap: FlexWrap.Wrap });
            Flex.width('100%');
            Flex.margin({ bottom: 20 });
        }, Flex);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const move = _item;
                this.moveChip.bind(this)(move);
            };
            this.forEachUpdateFunction(elmtId, this.stepMoves, forEachItemGenFunction);
        }, ForEach);
        ForEach.pop();
        Flex.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('取消');
            Button.fontSize(16);
            Button.fontColor('#666666');
            Button.backgroundColor('#E0E0E0');
            Button.borderRadius(20);
            Button.layoutWeight(1);
            Button.onClick(() => {
                this.showMoveSelector = false;
                this.selectedMoves = [];
            });
        }, Button);
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('开始');
            Button.fontSize(16);
            Button.fontColor('#FFFFFF');
            Button.backgroundColor('#3A7BD5');
            Button.borderRadius(20);
            Button.layoutWeight(1);
            Button.margin({ left: 15 });
            Button.onClick(() => {
                this.startTraining();
            });
        }, Button);
        Button.pop();
        Row.pop();
        Column.pop();
        Column.pop();
    }
    moveChip(move: string, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(move);
            Text.fontSize(14);
            Text.fontColor(this.selectedMoves.includes(move) ? '#FFFFFF' : '#333333');
            Text.backgroundColor(this.selectedMoves.includes(move) ? '#3A7BD5' : '#E8E8E8');
            Text.borderRadius(15);
            Text.padding({ left: 12, right: 12, top: 8, bottom: 8 });
            Text.margin({ right: 8, bottom: 8 });
            Text.onClick(() => {
                if (this.selectedMoves.includes(move)) {
                    this.selectedMoves = this.selectedMoves.filter(m => m !== move);
                }
                else {
                    this.selectedMoves.push(move);
                }
            });
        }, Text);
        Text.pop();
    }
    // 冰闻
    buildIceNews(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Scroll.create();
            Scroll.width('100%');
            Scroll.layoutWeight(1);
            Scroll.scrollBar(BarState.Off);
            Scroll.edgeEffect(EdgeEffect.Spring);
        }, Scroll);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.padding(DeviceUtils.isWearable() ? 10 : 20);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('📰 冰闻');
            Text.fontSize(DeviceUtils.isWearable() ? 18 : 24);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#FFFFFF');
            Text.margin({ bottom: DeviceUtils.isWearable() ? 12 : 20 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('90%');
            Column.padding(DeviceUtils.isWearable() ? 15 : 20);
            Column.backgroundColor('#FFFFFF');
            Column.borderRadius(DeviceUtils.isWearable() ? 10 : 15);
            Column.margin({ top: DeviceUtils.isWearable() ? 10 : 20 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('2024世界锦标赛');
            Text.fontSize(DeviceUtils.isWearable() ? 16 : 18);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#333333');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('蒙特利尔 3月18-24日');
            Text.fontSize(DeviceUtils.isWearable() ? 12 : 14);
            Text.fontColor('#666666');
            Text.margin({ top: DeviceUtils.isWearable() ? 4 : 8 });
        }, Text);
        Text.pop();
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            // 手表端添加更多新闻内容
            if (DeviceUtils.isWearable()) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Column.create();
                        Column.width('90%');
                        Column.padding(15);
                        Column.backgroundColor('#FFFFFF');
                        Column.borderRadius(10);
                        Column.margin({ top: 10 });
                    }, Column);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('国内赛事');
                        Text.fontSize(14);
                        Text.fontWeight(FontWeight.Bold);
                        Text.fontColor('#333333');
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('全国锦标赛 4月15-20日');
                        Text.fontSize(12);
                        Text.fontColor('#666666');
                        Text.margin({ top: 4 });
                    }, Text);
                    Text.pop();
                    Column.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Column.create();
                        Column.width('90%');
                        Column.padding(15);
                        Column.backgroundColor('#FFFFFF');
                        Column.borderRadius(10);
                        Column.margin({ top: 10 });
                    }, Column);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('训练技巧');
                        Text.fontSize(14);
                        Text.fontWeight(FontWeight.Bold);
                        Text.fontColor('#333333');
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('如何提高跳跃稳定性');
                        Text.fontSize(12);
                        Text.fontColor('#666666');
                        Text.margin({ top: 4 });
                    }, Text);
                    Text.pop();
                    Column.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        Column.pop();
        Scroll.pop();
    }
    // 我的
    buildProfile(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Scroll.create();
            Scroll.width('100%');
            Scroll.layoutWeight(1);
            Scroll.scrollBar(BarState.Off);
            Scroll.edgeEffect(EdgeEffect.Spring);
        }, Scroll);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.padding(DeviceUtils.isWearable() ? 10 : 20);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('👤 我的');
            Text.fontSize(DeviceUtils.isWearable() ? 18 : 24);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#FFFFFF');
            Text.margin({ bottom: DeviceUtils.isWearable() ? 12 : 20 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('90%');
            Column.padding(DeviceUtils.isWearable() ? 20 : 30);
            Column.backgroundColor('#FFFFFF');
            Column.borderRadius(DeviceUtils.isWearable() ? 10 : 15);
            Column.margin({ top: DeviceUtils.isWearable() ? 10 : 20 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('⛸️');
            Text.fontSize(DeviceUtils.isWearable() ? 40 : 50);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('冰上舞者');
            Text.fontSize(DeviceUtils.isWearable() ? 16 : 20);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#333333');
            Text.margin({ top: DeviceUtils.isWearable() ? 6 : 10 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('Lv.12');
            Text.fontSize(DeviceUtils.isWearable() ? 12 : 14);
            Text.fontColor('#666666');
            Text.margin({ top: 4 });
        }, Text);
        Text.pop();
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            // 功能入口 - 手表端简化显示
            if (!DeviceUtils.isWearable()) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Column.create();
                        Column.width('90%');
                        Column.margin({ top: 20 });
                    }, Column);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        // 打分解读
                        Row.create();
                        // 打分解读
                        Row.width('100%');
                        // 打分解读
                        Row.padding(15);
                        // 打分解读
                        Row.backgroundColor('#FFFFFF');
                        // 打分解读
                        Row.borderRadius(12);
                        // 打分解读
                        Row.onClick(() => {
                            router.pushUrl({
                                url: 'pages/ScoreInterpreterPage'
                            });
                        });
                    }, Row);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('📊');
                        Text.fontSize(24);
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Column.create();
                        Column.alignItems(HorizontalAlign.Start);
                        Column.layoutWeight(1);
                        Column.margin({ left: 15 });
                    }, Column);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('打分解读');
                        Text.fontSize(16);
                        Text.fontWeight(FontWeight.Bold);
                        Text.fontColor('#333333');
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('解读比赛分数，了解评分规则');
                        Text.fontSize(12);
                        Text.fontColor('#999999');
                        Text.margin({ top: 4 });
                    }, Text);
                    Text.pop();
                    Column.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('›');
                        Text.fontSize(24);
                        Text.fontColor('#CCCCCC');
                    }, Text);
                    Text.pop();
                    // 打分解读
                    Row.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        // 计分模拟器
                        Row.create();
                        // 计分模拟器
                        Row.width('100%');
                        // 计分模拟器
                        Row.padding(15);
                        // 计分模拟器
                        Row.backgroundColor('#FFFFFF');
                        // 计分模拟器
                        Row.borderRadius(12);
                        // 计分模拟器
                        Row.margin({ top: 12 });
                        // 计分模拟器
                        Row.onClick(() => {
                            router.pushUrl({
                                url: 'pages/ScoringSimulatorPage'
                            });
                        });
                    }, Row);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('🧮');
                        Text.fontSize(24);
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Column.create();
                        Column.alignItems(HorizontalAlign.Start);
                        Column.layoutWeight(1);
                        Column.margin({ left: 15 });
                    }, Column);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('计分模拟器');
                        Text.fontSize(16);
                        Text.fontWeight(FontWeight.Bold);
                        Text.fontColor('#333333');
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('模拟ISU官方计分规则');
                        Text.fontSize(12);
                        Text.fontColor('#999999');
                        Text.margin({ top: 4 });
                    }, Text);
                    Text.pop();
                    Column.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('›');
                        Text.fontSize(24);
                        Text.fontColor('#CCCCCC');
                    }, Text);
                    Text.pop();
                    // 计分模拟器
                    Row.pop();
                    Column.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        // 手表端显示功能列表
                        Column.create();
                        // 手表端显示功能列表
                        Column.width('90%');
                        // 手表端显示功能列表
                        Column.margin({ top: 15 });
                    }, Column);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        // 计分模拟器
                        Row.create();
                        // 计分模拟器
                        Row.width('100%');
                        // 计分模拟器
                        Row.padding(12);
                        // 计分模拟器
                        Row.backgroundColor('#FFFFFF');
                        // 计分模拟器
                        Row.borderRadius(10);
                        // 计分模拟器
                        Row.onClick(() => {
                            router.pushUrl({
                                url: 'pages/ScoringSimulatorPage'
                            });
                        });
                    }, Row);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('🧮');
                        Text.fontSize(20);
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('计分模拟器');
                        Text.fontSize(14);
                        Text.fontColor('#333333');
                        Text.margin({ left: 10 });
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Blank.create();
                    }, Blank);
                    Blank.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('›');
                        Text.fontSize(20);
                        Text.fontColor('#CCCCCC');
                    }, Text);
                    Text.pop();
                    // 计分模拟器
                    Row.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        // 设置
                        Row.create();
                        // 设置
                        Row.width('100%');
                        // 设置
                        Row.padding(12);
                        // 设置
                        Row.backgroundColor('#FFFFFF');
                        // 设置
                        Row.borderRadius(10);
                        // 设置
                        Row.margin({ top: 10 });
                    }, Row);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('⚙️');
                        Text.fontSize(20);
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('设置');
                        Text.fontSize(14);
                        Text.fontColor('#333333');
                        Text.margin({ left: 10 });
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Blank.create();
                    }, Blank);
                    Blank.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('›');
                        Text.fontSize(20);
                        Text.fontColor('#CCCCCC');
                    }, Text);
                    Text.pop();
                    // 设置
                    Row.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        // 关于
                        Row.create();
                        // 关于
                        Row.width('100%');
                        // 关于
                        Row.padding(12);
                        // 关于
                        Row.backgroundColor('#FFFFFF');
                        // 关于
                        Row.borderRadius(10);
                        // 关于
                        Row.margin({ top: 10 });
                    }, Row);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('ℹ️');
                        Text.fontSize(20);
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('关于');
                        Text.fontSize(14);
                        Text.fontColor('#333333');
                        Text.margin({ left: 10 });
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Blank.create();
                    }, Blank);
                    Blank.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('›');
                        Text.fontSize(20);
                        Text.fontColor('#CCCCCC');
                    }, Text);
                    Text.pop();
                    // 关于
                    Row.pop();
                    // 手表端显示功能列表
                    Column.pop();
                });
            }
        }, If);
        If.pop();
        Column.pop();
        Scroll.pop();
    }
    buildBottomNav(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.height(DeviceUtils.isWearable() ? 55 : 70);
            Row.backgroundColor('rgba(255, 255, 255, 0.15)');
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            // 手表端只显示3个主要Tab，其他设备显示5个
            if (DeviceUtils.isWearable()) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        // 手表端简化导航栏
                        Column.create();
                        // 手表端简化导航栏
                        Column.width('33.3%');
                        // 手表端简化导航栏
                        Column.height(40);
                        // 手表端简化导航栏
                        Column.justifyContent(FlexAlign.Center);
                        // 手表端简化导航栏
                        Column.onClick(() => { this.currentTab = 0; });
                    }, Column);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('⛸️');
                        Text.fontSize(18);
                        Text.opacity(this.currentTab === 0 ? 1.0 : 0.6);
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('训练');
                        Text.fontSize(9);
                        Text.fontColor(this.currentTab === 0 ? '#FFFFFF' : '#E0E0E0');
                        Text.margin({ top: 1 });
                    }, Text);
                    Text.pop();
                    // 手表端简化导航栏
                    Column.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Column.create();
                        Column.width('33.3%');
                        Column.height(40);
                        Column.justifyContent(FlexAlign.Center);
                        Column.onClick(() => { this.currentTab = 3; });
                    }, Column);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('🏆');
                        Text.fontSize(18);
                        Text.opacity(this.currentTab === 3 ? 1.0 : 0.6);
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('成就');
                        Text.fontSize(9);
                        Text.fontColor(this.currentTab === 3 ? '#FFFFFF' : '#E0E0E0');
                        Text.margin({ top: 1 });
                    }, Text);
                    Text.pop();
                    Column.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Column.create();
                        Column.width('33.3%');
                        Column.height(40);
                        Column.justifyContent(FlexAlign.Center);
                        Column.onClick(() => { this.currentTab = 4; });
                    }, Column);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('👤');
                        Text.fontSize(18);
                        Text.opacity(this.currentTab === 4 ? 1.0 : 0.6);
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('我的');
                        Text.fontSize(9);
                        Text.fontColor(this.currentTab === 4 ? '#FFFFFF' : '#E0E0E0');
                        Text.margin({ top: 1 });
                    }, Text);
                    Text.pop();
                    Column.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        // 手机、平板、PC显示完整导航栏
                        Column.create();
                        // 手机、平板、PC显示完整导航栏
                        Column.width('20%');
                        // 手机、平板、PC显示完整导航栏
                        Column.height(60);
                        // 手机、平板、PC显示完整导航栏
                        Column.justifyContent(FlexAlign.Center);
                        // 手机、平板、PC显示完整导航栏
                        Column.onClick(() => { this.currentTab = 0; });
                    }, Column);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('⛸️');
                        Text.fontSize(24);
                        Text.opacity(this.currentTab === 0 ? 1.0 : 0.6);
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('训练台');
                        Text.fontSize(12);
                        Text.fontColor(this.currentTab === 0 ? '#FFFFFF' : '#E0E0E0');
                        Text.margin({ top: 4 });
                    }, Text);
                    Text.pop();
                    // 手机、平板、PC显示完整导航栏
                    Column.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Column.create();
                        Column.width('20%');
                        Column.height(60);
                        Column.justifyContent(FlexAlign.Center);
                        Column.onClick(() => { this.currentTab = 1; });
                    }, Column);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('📚');
                        Text.fontSize(24);
                        Text.opacity(this.currentTab === 1 ? 1.0 : 0.6);
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('动作库');
                        Text.fontSize(12);
                        Text.fontColor(this.currentTab === 1 ? '#FFFFFF' : '#E0E0E0');
                        Text.margin({ top: 4 });
                    }, Text);
                    Text.pop();
                    Column.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Column.create();
                        Column.width('20%');
                        Column.height(60);
                        Column.justifyContent(FlexAlign.Center);
                        Column.onClick(() => { this.currentTab = 2; });
                    }, Column);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('📰');
                        Text.fontSize(24);
                        Text.opacity(this.currentTab === 2 ? 1.0 : 0.6);
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('冰闻');
                        Text.fontSize(12);
                        Text.fontColor(this.currentTab === 2 ? '#FFFFFF' : '#E0E0E0');
                        Text.margin({ top: 4 });
                    }, Text);
                    Text.pop();
                    Column.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Column.create();
                        Column.width('20%');
                        Column.height(60);
                        Column.justifyContent(FlexAlign.Center);
                        Column.onClick(() => { this.currentTab = 3; });
                    }, Column);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('🏆');
                        Text.fontSize(24);
                        Text.opacity(this.currentTab === 3 ? 1.0 : 0.6);
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('成就');
                        Text.fontSize(12);
                        Text.fontColor(this.currentTab === 3 ? '#FFFFFF' : '#E0E0E0');
                        Text.margin({ top: 4 });
                    }, Text);
                    Text.pop();
                    Column.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Column.create();
                        Column.width('20%');
                        Column.height(60);
                        Column.justifyContent(FlexAlign.Center);
                        Column.onClick(() => { this.currentTab = 4; });
                    }, Column);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('👤');
                        Text.fontSize(24);
                        Text.opacity(this.currentTab === 4 ? 1.0 : 0.6);
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('我的');
                        Text.fontSize(12);
                        Text.fontColor(this.currentTab === 4 ? '#FFFFFF' : '#E0E0E0');
                        Text.margin({ top: 4 });
                    }, Text);
                    Text.pop();
                    Column.pop();
                });
            }
        }, If);
        If.pop();
        Row.pop();
    }
    // ========== 历史记录面板 ==========
    buildHistoryPanel(parent = null) {
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
            Column.height('85%');
            Column.padding(25);
            Column.backgroundColor('#FFFFFF');
            Column.borderRadius(20);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 标题栏
            Row.create();
            // 标题栏
            Row.width('100%');
            // 标题栏
            Row.margin({ bottom: 20 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('📋 今日练习记录');
            Text.fontSize(20);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#333333');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('关闭');
            Button.fontSize(14);
            Button.fontColor('#666666');
            Button.backgroundColor('#F0F0F0');
            Button.borderRadius(15);
            Button.height(32);
            Button.padding({ left: 16, right: 16 });
            Button.onClick(() => {
                this.showHistoryPanel = false;
            });
        }, Button);
        Button.pop();
        // 标题栏
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            // 记录列表
            if (this.todayRecords.length === 0) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Column.create();
                        Column.width('100%');
                        Column.height(300);
                        Column.justifyContent(FlexAlign.Center);
                    }, Column);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('😴');
                        Text.fontSize(60);
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('今天还没有练习记录');
                        Text.fontSize(16);
                        Text.fontColor('#999999');
                        Text.margin({ top: 15 });
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('开始训练，记录你的每一次进步！');
                        Text.fontSize(14);
                        Text.fontColor('#CCCCCC');
                        Text.margin({ top: 8 });
                    }, Text);
                    Text.pop();
                    Column.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Scroll.create();
                        Scroll.width('100%');
                        Scroll.layoutWeight(1);
                        Scroll.scrollBar(BarState.Auto);
                    }, Scroll);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Column.create();
                        Column.width('100%');
                    }, Column);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        ForEach.create();
                        const forEachItemGenFunction = (_item, index: number) => {
                            const record = _item;
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Row.create();
                                Row.width('100%');
                                Row.padding(15);
                                Row.backgroundColor(index % 2 === 0 ? '#FFFFFF' : '#F8F8F8');
                                Row.borderRadius(10);
                                Row.margin({ bottom: 10 });
                            }, Row);
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                // 时间
                                Column.create();
                                // 时间
                                Column.width(60);
                            }, Column);
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Text.create(record.time);
                                Text.fontSize(16);
                                Text.fontWeight(FontWeight.Bold);
                                Text.fontColor('#3A7BD5');
                            }, Text);
                            Text.pop();
                            // 时间
                            Column.pop();
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                // 动作信息
                                Column.create();
                                // 动作信息
                                Column.layoutWeight(1);
                                // 动作信息
                                Column.alignItems(HorizontalAlign.Start);
                                // 动作信息
                                Column.margin({ left: 15 });
                            }, Column);
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Row.create();
                            }, Row);
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Text.create(this.getMoveIcon(record.moveName));
                                Text.fontSize(20);
                            }, Text);
                            Text.pop();
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Text.create(record.moveName);
                                Text.fontSize(16);
                                Text.fontWeight(FontWeight.Bold);
                                Text.fontColor('#333333');
                                Text.margin({ left: 8 });
                            }, Text);
                            Text.pop();
                            Row.pop();
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                If.create();
                                if (record.notes) {
                                    this.ifElseBranchUpdateFunction(0, () => {
                                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                                            Text.create(record.notes);
                                            Text.fontSize(12);
                                            Text.fontColor('#999999');
                                            Text.margin({ top: 4 });
                                            Text.maxLines(1);
                                            Text.textOverflow({ overflow: TextOverflow.Ellipsis });
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
                            // 动作信息
                            Column.pop();
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                // 时长和疲劳度
                                Column.create();
                                // 时长和疲劳度
                                Column.alignItems(HorizontalAlign.End);
                            }, Column);
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Text.create(this.formatDuration(record.duration));
                                Text.fontSize(14);
                                Text.fontWeight(FontWeight.Bold);
                                Text.fontColor('#FF6B6B');
                            }, Text);
                            Text.pop();
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Text.create(`疲劳度 ${record.fatigue}`);
                                Text.fontSize(12);
                                Text.fontColor('#999999');
                                Text.margin({ top: 4 });
                            }, Text);
                            Text.pop();
                            // 时长和疲劳度
                            Column.pop();
                            Row.pop();
                        };
                        this.forEachUpdateFunction(elmtId, this.todayRecords, forEachItemGenFunction, undefined, true, false);
                    }, ForEach);
                    ForEach.pop();
                    Column.pop();
                    Scroll.pop();
                });
            }
        }, If);
        If.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 底部统计
            Row.create();
            // 底部统计
            Row.width('100%');
            // 底部统计
            Row.padding(20);
            // 底部统计
            Row.backgroundColor('#F0F0F0');
            // 底部统计
            Row.borderRadius(15);
            // 底部统计
            Row.margin({ top: 15 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.layoutWeight(1);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.todayRecords.length.toString());
            Text.fontSize(24);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#3A7BD5');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('练习次数');
            Text.fontSize(12);
            Text.fontColor('#999999');
        }, Text);
        Text.pop();
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.layoutWeight(1);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.formatDuration(this.todayRecords.reduce((sum, r) => sum + r.duration, 0)));
            Text.fontSize(24);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#FF6B6B');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('总时长');
            Text.fontSize(12);
            Text.fontColor('#999999');
        }, Text);
        Text.pop();
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.layoutWeight(1);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.todayRecords.reduce((sum, r) => sum + r.fatigue, 0).toString());
            Text.fontSize(24);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#FFD700');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('总疲劳度');
            Text.fontSize(12);
            Text.fontColor('#999999');
        }, Text);
        Text.pop();
        Column.pop();
        // 底部统计
        Row.pop();
        Column.pop();
        Column.pop();
    }
    // ========== 计划本面板 ==========
    buildPlanPanel(parent = null) {
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
            Column.height('85%');
            Column.padding(25);
            Column.backgroundColor('#FFFFFF');
            Column.borderRadius(20);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 标题栏
            Row.create();
            // 标题栏
            Row.width('100%');
            // 标题栏
            Row.margin({ bottom: 20 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('📅 周训练计划');
            Text.fontSize(20);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#333333');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (!this.currentWeekPlan) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Button.createWithLabel('创建计划');
                        Button.fontSize(14);
                        Button.fontColor('#FFFFFF');
                        Button.backgroundColor('#3A7BD5');
                        Button.borderRadius(15);
                        Button.height(32);
                        Button.padding({ left: 16, right: 16 });
                        Button.onClick(() => {
                            this.createNewWeekPlan();
                        });
                    }, Button);
                    Button.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('关闭');
            Button.fontSize(14);
            Button.fontColor('#666666');
            Button.backgroundColor('#F0F0F0');
            Button.borderRadius(15);
            Button.height(32);
            Button.padding({ left: 16, right: 16 });
            Button.margin({ left: 8 });
            Button.onClick(() => {
                this.showPlanPanel = false;
            });
        }, Button);
        Button.pop();
        // 标题栏
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (!this.currentWeekPlan) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        // 无计划提示
                        Column.create();
                        // 无计划提示
                        Column.width('100%');
                        // 无计划提示
                        Column.height(300);
                        // 无计划提示
                        Column.justifyContent(FlexAlign.Center);
                    }, Column);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('📝');
                        Text.fontSize(60);
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('还没有本周训练计划');
                        Text.fontSize(16);
                        Text.fontColor('#999999');
                        Text.margin({ top: 15 });
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('点击"创建计划"开始规划你的训练！');
                        Text.fontSize(14);
                        Text.fontColor('#CCCCCC');
                        Text.margin({ top: 8 });
                    }, Text);
                    Text.pop();
                    // 无计划提示
                    Column.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        // 计划内容
                        Scroll.create();
                        // 计划内容
                        Scroll.width('100%');
                        // 计划内容
                        Scroll.layoutWeight(1);
                        // 计划内容
                        Scroll.scrollBar(BarState.Auto);
                    }, Scroll);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Column.create();
                        Column.width('100%');
                    }, Column);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        // 周日期范围
                        Text.create(`${this.currentWeekPlan.weekStart} 至 ${this.currentWeekPlan.weekEnd}`);
                        // 周日期范围
                        Text.fontSize(14);
                        // 周日期范围
                        Text.fontColor('#999999');
                        // 周日期范围
                        Text.margin({ bottom: 15 });
                    }, Text);
                    // 周日期范围
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        // 每日计划
                        ForEach.create();
                        const forEachItemGenFunction = (_item, dayIndex: number) => {
                            const dayPlan = _item;
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Column.create();
                                Column.width('100%');
                                Column.padding(15);
                                Column.backgroundColor('#FFFFFF');
                                Column.borderRadius(12);
                                Column.margin({ bottom: 12 });
                                Column.border({ width: 1, color: '#E0E0E0' });
                            }, Column);
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                // 日期标题
                                Row.create();
                                // 日期标题
                                Row.width('100%');
                                // 日期标题
                                Row.margin({ bottom: 10 });
                            }, Row);
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Text.create(this.getDayName(dayPlan.dayOfWeek));
                                Text.fontSize(16);
                                Text.fontWeight(FontWeight.Bold);
                                Text.fontColor('#333333');
                            }, Text);
                            Text.pop();
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Text.create(`(${dayPlan.date})`);
                                Text.fontSize(12);
                                Text.fontColor('#999999');
                                Text.margin({ left: 8 });
                            }, Text);
                            Text.pop();
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Blank.create();
                            }, Blank);
                            Blank.pop();
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                If.create();
                                // 目标时长
                                if (dayPlan.targetDuration) {
                                    this.ifElseBranchUpdateFunction(0, () => {
                                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                                            Text.create(`目标: ${dayPlan.targetDuration}分钟`);
                                            Text.fontSize(12);
                                            Text.fontColor('#3A7BD5');
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
                            // 日期标题
                            Row.pop();
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                If.create();
                                // 计划的动作
                                if (dayPlan.moves.length === 0) {
                                    this.ifElseBranchUpdateFunction(0, () => {
                                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                                            Column.create();
                                            Column.width('100%');
                                            Column.padding(10);
                                            Column.backgroundColor('#F8F8F8');
                                            Column.borderRadius(8);
                                        }, Column);
                                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                                            Text.create('暂无计划');
                                            Text.fontSize(14);
                                            Text.fontColor('#CCCCCC');
                                        }, Text);
                                        Text.pop();
                                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                                            Button.createWithLabel('+ 添加动作');
                                            Button.fontSize(12);
                                            Button.fontColor('#3A7BD5');
                                            Button.backgroundColor('#E8F4FD');
                                            Button.borderRadius(15);
                                            Button.height(28);
                                            Button.margin({ top: 8 });
                                            Button.onClick(() => {
                                                this.editingDayIndex = dayIndex;
                                                this.showAddMovePanel = true;
                                            });
                                        }, Button);
                                        Button.pop();
                                        Column.pop();
                                    });
                                }
                                else {
                                    this.ifElseBranchUpdateFunction(1, () => {
                                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                                            Column.create();
                                        }, Column);
                                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                                            Flex.create({ wrap: FlexWrap.Wrap });
                                        }, Flex);
                                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                                            ForEach.create();
                                            const forEachItemGenFunction = (_item, moveIndex: number) => {
                                                const move = _item;
                                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                                    Row.create();
                                                    Row.backgroundColor(this.getPriorityColor(move.priority));
                                                    Row.borderRadius(8);
                                                    Row.padding({ left: 10, right: 10, top: 6, bottom: 6 });
                                                    Row.margin({ right: 8, bottom: 8 });
                                                }, Row);
                                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                                    Text.create(this.getMoveIcon(move.moveName));
                                                    Text.fontSize(14);
                                                }, Text);
                                                Text.pop();
                                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                                    Text.create(move.moveName);
                                                    Text.fontSize(14);
                                                    Text.fontColor('#333333');
                                                    Text.margin({ left: 4 });
                                                }, Text);
                                                Text.pop();
                                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                                    If.create();
                                                    if (move.targetCount) {
                                                        this.ifElseBranchUpdateFunction(0, () => {
                                                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                                                Text.create(`×${move.targetCount}`);
                                                                Text.fontSize(12);
                                                                Text.fontColor('#FF6B6B');
                                                                Text.margin({ left: 4 });
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
                                            };
                                            this.forEachUpdateFunction(elmtId, dayPlan.moves, forEachItemGenFunction, undefined, true, false);
                                        }, ForEach);
                                        ForEach.pop();
                                        Flex.pop();
                                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                                            Button.createWithLabel('+ 添加更多');
                                            Button.fontSize(12);
                                            Button.fontColor('#3A7BD5');
                                            Button.backgroundColor('#E8F4FD');
                                            Button.borderRadius(15);
                                            Button.height(28);
                                            Button.margin({ top: 8 });
                                            Button.onClick(() => {
                                                this.editingDayIndex = dayIndex;
                                                this.showAddMovePanel = true;
                                            });
                                        }, Button);
                                        Button.pop();
                                        Column.pop();
                                    });
                                }
                            }, If);
                            If.pop();
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                If.create();
                                // 备注
                                if (dayPlan.notes) {
                                    this.ifElseBranchUpdateFunction(0, () => {
                                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                                            Text.create(dayPlan.notes);
                                            Text.fontSize(12);
                                            Text.fontColor('#666666');
                                            Text.fontStyle(FontStyle.Italic);
                                            Text.margin({ top: 8 });
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
                            Column.pop();
                        };
                        this.forEachUpdateFunction(elmtId, this.currentWeekPlan.dailyPlans, forEachItemGenFunction, undefined, true, false);
                    }, ForEach);
                    // 每日计划
                    ForEach.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        If.create();
                        // 周备注
                        if (this.currentWeekPlan.notes) {
                            this.ifElseBranchUpdateFunction(0, () => {
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    Column.create();
                                    Column.width('100%');
                                    Column.padding(15);
                                    Column.backgroundColor('#FFF9E6');
                                    Column.borderRadius(12);
                                    Column.margin({ top: 10 });
                                }, Column);
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    Text.create('本周目标');
                                    Text.fontSize(14);
                                    Text.fontWeight(FontWeight.Bold);
                                    Text.fontColor('#333333');
                                    Text.margin({ bottom: 8 });
                                }, Text);
                                Text.pop();
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    Text.create(this.currentWeekPlan.notes);
                                    Text.fontSize(14);
                                    Text.fontColor('#666666');
                                }, Text);
                                Text.pop();
                                Column.pop();
                            });
                        }
                        else {
                            this.ifElseBranchUpdateFunction(1, () => {
                            });
                        }
                    }, If);
                    If.pop();
                    Column.pop();
                    // 计划内容
                    Scroll.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        // 删除按钮
                        Button.createWithLabel('删除计划');
                        // 删除按钮
                        Button.fontSize(16);
                        // 删除按钮
                        Button.fontColor('#FF6B6B');
                        // 删除按钮
                        Button.backgroundColor('#FFE5E5');
                        // 删除按钮
                        Button.borderRadius(20);
                        // 删除按钮
                        Button.width('100%');
                        // 删除按钮
                        Button.height(44);
                        // 删除按钮
                        Button.margin({ top: 15 });
                        // 删除按钮
                        Button.onClick(() => {
                            this.deleteCurrentPlan();
                        });
                    }, Button);
                    // 删除按钮
                    Button.pop();
                });
            }
        }, If);
        If.pop();
        Column.pop();
        Column.pop();
    }
    // ========== 添加动作面板 ==========
    buildAddMovePanel(parent = null) {
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
            Column.height('85%');
            Column.padding(25);
            Column.backgroundColor('#FFFFFF');
            Column.borderRadius(20);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 标题栏
            Row.create();
            // 标题栏
            Row.width('100%');
            // 标题栏
            Row.margin({ bottom: 20 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('添加训练动作');
            Text.fontSize(20);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#333333');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('关闭');
            Button.fontSize(14);
            Button.fontColor('#666666');
            Button.backgroundColor('#F0F0F0');
            Button.borderRadius(15);
            Button.height(32);
            Button.padding({ left: 16, right: 16 });
            Button.onClick(() => {
                this.showAddMovePanel = false;
                this.selectedMoveForPlan = '';
                this.targetCountInput = '';
            });
        }, Button);
        Button.pop();
        // 标题栏
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Scroll.create();
            Scroll.width('100%');
            Scroll.layoutWeight(1);
            Scroll.scrollBar(BarState.Auto);
        }, Scroll);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 选择动作
            Text.create('选择动作');
            // 选择动作
            Text.fontSize(16);
            // 选择动作
            Text.fontWeight(FontWeight.Bold);
            // 选择动作
            Text.fontColor('#333333');
            // 选择动作
            Text.margin({ bottom: 10 });
        }, Text);
        // 选择动作
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 跳跃动作
            Text.create('跳跃');
            // 跳跃动作
            Text.fontSize(14);
            // 跳跃动作
            Text.fontColor('#666666');
            // 跳跃动作
            Text.margin({ bottom: 8 });
        }, Text);
        // 跳跃动作
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Flex.create({ wrap: FlexWrap.Wrap });
            Flex.width('100%');
            Flex.margin({ bottom: 15 });
        }, Flex);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const move = _item;
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create(move);
                    Text.fontSize(14);
                    Text.fontColor(this.selectedMoveForPlan === move ? '#FFFFFF' : '#333333');
                    Text.backgroundColor(this.selectedMoveForPlan === move ? '#3A7BD5' : '#E8E8E8');
                    Text.borderRadius(15);
                    Text.padding({ left: 12, right: 12, top: 8, bottom: 8 });
                    Text.margin({ right: 8, bottom: 8 });
                    Text.onClick(() => {
                        this.selectedMoveForPlan = move;
                    });
                }, Text);
                Text.pop();
            };
            this.forEachUpdateFunction(elmtId, this.jumpMoves, forEachItemGenFunction);
        }, ForEach);
        ForEach.pop();
        Flex.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 旋转动作
            Text.create('旋转');
            // 旋转动作
            Text.fontSize(14);
            // 旋转动作
            Text.fontColor('#666666');
            // 旋转动作
            Text.margin({ bottom: 8 });
        }, Text);
        // 旋转动作
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Flex.create({ wrap: FlexWrap.Wrap });
            Flex.width('100%');
            Flex.margin({ bottom: 15 });
        }, Flex);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const move = _item;
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create(move);
                    Text.fontSize(14);
                    Text.fontColor(this.selectedMoveForPlan === move ? '#FFFFFF' : '#333333');
                    Text.backgroundColor(this.selectedMoveForPlan === move ? '#3A7BD5' : '#E8E8E8');
                    Text.borderRadius(15);
                    Text.padding({ left: 12, right: 12, top: 8, bottom: 8 });
                    Text.margin({ right: 8, bottom: 8 });
                    Text.onClick(() => {
                        this.selectedMoveForPlan = move;
                    });
                }, Text);
                Text.pop();
            };
            this.forEachUpdateFunction(elmtId, this.spinMoves, forEachItemGenFunction);
        }, ForEach);
        ForEach.pop();
        Flex.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 步法动作
            Text.create('步法');
            // 步法动作
            Text.fontSize(14);
            // 步法动作
            Text.fontColor('#666666');
            // 步法动作
            Text.margin({ bottom: 8 });
        }, Text);
        // 步法动作
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Flex.create({ wrap: FlexWrap.Wrap });
            Flex.width('100%');
            Flex.margin({ bottom: 20 });
        }, Flex);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const move = _item;
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create(move);
                    Text.fontSize(14);
                    Text.fontColor(this.selectedMoveForPlan === move ? '#FFFFFF' : '#333333');
                    Text.backgroundColor(this.selectedMoveForPlan === move ? '#3A7BD5' : '#E8E8E8');
                    Text.borderRadius(15);
                    Text.padding({ left: 12, right: 12, top: 8, bottom: 8 });
                    Text.margin({ right: 8, bottom: 8 });
                    Text.onClick(() => {
                        this.selectedMoveForPlan = move;
                    });
                }, Text);
                Text.pop();
            };
            this.forEachUpdateFunction(elmtId, this.stepMoves, forEachItemGenFunction);
        }, ForEach);
        ForEach.pop();
        Flex.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 目标次数
            Text.create('目标次数（可选）');
            // 目标次数
            Text.fontSize(16);
            // 目标次数
            Text.fontWeight(FontWeight.Bold);
            // 目标次数
            Text.fontColor('#333333');
            // 目标次数
            Text.margin({ bottom: 10 });
        }, Text);
        // 目标次数
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            TextInput.create({ placeholder: '例如: 10', text: this.targetCountInput });
            TextInput.fontSize(16);
            TextInput.type(InputType.Number);
            TextInput.height(44);
            TextInput.backgroundColor('#F5F5F5');
            TextInput.borderRadius(10);
            TextInput.width('100%');
            TextInput.onChange((value: string) => {
                this.targetCountInput = value;
            });
            TextInput.margin({ bottom: 20 });
        }, TextInput);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 优先级
            Text.create('优先级');
            // 优先级
            Text.fontSize(16);
            // 优先级
            Text.fontWeight(FontWeight.Bold);
            // 优先级
            Text.fontColor('#333333');
            // 优先级
            Text.margin({ bottom: 10 });
        }, Text);
        // 优先级
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.margin({ bottom: 30 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('高');
            Button.fontSize(14);
            Button.fontColor(this.selectedPriority === 'high' ? '#FFFFFF' : '#FF6B6B');
            Button.backgroundColor(this.selectedPriority === 'high' ? '#FF6B6B' : '#FFE5E5');
            Button.borderRadius(15);
            Button.layoutWeight(1);
            Button.onClick(() => {
                this.selectedPriority = 'high';
            });
        }, Button);
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('中');
            Button.fontSize(14);
            Button.fontColor(this.selectedPriority === 'medium' ? '#FFFFFF' : '#FFD700');
            Button.backgroundColor(this.selectedPriority === 'medium' ? '#FFD700' : '#FFF9E6');
            Button.borderRadius(15);
            Button.layoutWeight(1);
            Button.margin({ left: 10 });
            Button.onClick(() => {
                this.selectedPriority = 'medium';
            });
        }, Button);
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('低');
            Button.fontSize(14);
            Button.fontColor(this.selectedPriority === 'low' ? '#FFFFFF' : '#4CAF50');
            Button.backgroundColor(this.selectedPriority === 'low' ? '#4CAF50' : '#E8F5E9');
            Button.borderRadius(15);
            Button.layoutWeight(1);
            Button.margin({ left: 10 });
            Button.onClick(() => {
                this.selectedPriority = 'low';
            });
        }, Button);
        Button.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 确认按钮
            Button.createWithLabel('确认添加');
            // 确认按钮
            Button.fontSize(18);
            // 确认按钮
            Button.fontColor('#FFFFFF');
            // 确认按钮
            Button.backgroundColor(this.selectedMoveForPlan ? '#3A7BD5' : '#CCCCCC');
            // 确认按钮
            Button.borderRadius(25);
            // 确认按钮
            Button.width('100%');
            // 确认按钮
            Button.height(50);
            // 确认按钮
            Button.enabled(!!this.selectedMoveForPlan);
            // 确认按钮
            Button.onClick(() => {
                this.addMoveToPlan();
            });
        }, Button);
        // 确认按钮
        Button.pop();
        Column.pop();
        Scroll.pop();
        Column.pop();
        Column.pop();
    }
    // 辅助方法
    private getMoveIcon(moveName: string): string {
        if (this.jumpMoves.includes(moveName))
            return '🦶';
        if (this.spinMoves.includes(moveName))
            return '🌀';
        if (this.stepMoves.includes(moveName))
            return '👣';
        return '⛸️';
    }
    private formatDuration(seconds: number): string {
        if (seconds < 60)
            return `${seconds}秒`;
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return secs > 0 ? `${mins}分${secs}秒` : `${mins}分钟`;
    }
    private getDayName(dayOfWeek: number): string {
        const days = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
        return days[dayOfWeek] || '';
    }
    private getPriorityColor(priority: string): string {
        switch (priority) {
            case 'high': return '#FFE5E5';
            case 'medium': return '#FFF9E6';
            case 'low': return '#E8F5E9';
            default: return '#F0F0F0';
        }
    }
    private createNewWeekPlan() {
        const plan = this.dataStore.createWeeklyPlan();
        this.dataStore.saveWeeklyPlan(plan);
        this.currentWeekPlan = plan;
    }
    private addMoveToPlan() {
        if (!this.currentWeekPlan || this.editingDayIndex < 0 || !this.selectedMoveForPlan) {
            return;
        }
        // 创建新的动作计划
        const newMove: PlannedMove = {
            moveName: this.selectedMoveForPlan,
            targetCount: this.targetCountInput ? parseInt(this.targetCountInput) : undefined,
            priority: this.selectedPriority as 'high' | 'medium' | 'low',
            notes: ''
        };
        // 添加到对应天的计划中
        this.currentWeekPlan.dailyPlans[this.editingDayIndex].moves.push(newMove);
        // 保存更新
        this.dataStore.saveWeeklyPlan(this.currentWeekPlan);
        // 重置状态
        this.showAddMovePanel = false;
        this.selectedMoveForPlan = '';
        this.targetCountInput = '';
        this.selectedPriority = 'medium';
        this.editingDayIndex = -1;
    }
    private deleteCurrentPlan() {
        if (this.currentWeekPlan) {
            this.dataStore.deleteWeeklyPlan(this.currentWeekPlan.id);
            this.currentWeekPlan = null;
        }
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "EdgeFlowMainPage";
    }
}
registerNamedRoute(() => new EdgeFlowMainPage(undefined, {}), "", { bundleName: "com.example.simplecalculator", moduleName: "entry", pagePath: "pages/EdgeFlowMainPage", pageFullPath: "entry/src/main/ets/pages/EdgeFlowMainPage", integratedHsp: "false", moduleType: "followWithHap" });
