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
    // ������ʷ��ϰ��¼
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
    // ��ѵ���ƻ�
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
    // ��ѡ�����б�
    private jumpMoves: string[];
    private spinMoves: string[];
    private stepMoves: string[];
    aboutToAppear() {
        // ע�͵������������ɣ������ʼֵ��Ϊ��
        // TestDataGenerator.getInstance().generateTestData();
        // ���ؽ��ռ�¼���ܼƻ�
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
    // ��ʽ��ʱ��
    formatTime(seconds: number): string {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    // ����ƣ�Ͷ�
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
    // ��ȡ������ѵ������
    getTodayTotalMinutes(): number {
        // �����ѱ����¼����ʱ��
        const savedSeconds = this.todayRecords.reduce((sum, record) => sum + record.duration, 0);
        // ���ϵ�ǰ����ѵ����ʱ��
        const currentSeconds = this.isTraining ? this.trainingTime : 0;
        return Math.floor((savedSeconds + currentSeconds) / 60);
    }
    // ��ȡ������ƣ�Ͷ�
    getTodayTotalFatigue(): number {
        // �����ѱ����¼����ƣ�Ͷ�
        const savedFatigue = this.todayRecords.reduce((sum, record) => sum + record.fatigue, 0);
        // ���ϵ�ǰ����ѵ����ƣ�Ͷ�
        const currentFatigue = this.isTraining ? this.calculateFatigue() : 0;
        return savedFatigue + currentFatigue;
    }
    // ��ȡ������ѵ������
    getTodayTotalCount(): number {
        // �ѱ����¼�� + ��ǰ����ѵ���Ķ�����
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
            // ��������
            Column.create();
            // ��������
            Column.width('100%');
            // ��������
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
                    {
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            if (isInitialRender) {
                                let componentCall = new AchievementPage(this, {}, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/EdgeFlowMainPage.ets", line: 119, col: 13 });
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
                this.ifElseBranchUpdateFunction(3, () => {
                    this.buildProfile.bind(this)();
                });
            }
        }, If);
        If.pop();
        // ��������
        Column.pop();
        // �ײ�������
        this.buildBottomNav.bind(this)();
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            // ����ѡ�񵯴�
            if (this.showMoveSelector) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.buildMoveSelector.bind(this)();
                });
            }
            // ��ʷ��¼���
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            // ��ʷ��¼���
            if (this.showHistoryPanel) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.buildHistoryPanel.bind(this)();
                });
            }
            // �ƻ������
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            // �ƻ������
            if (this.showPlanPanel) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.buildPlanPanel.bind(this)();
                });
            }
            // ���Ӷ������
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            // ���Ӷ������
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
    // ѵ��̨
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
            Text.create('?? ѵ��̨');
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
            // �ֱ������ز��ְ�ť��ֻ�������Ĺ���
            if (!DeviceUtils.isWearable()) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        // �ƻ�����ť
                        Button.createWithLabel('?? �ƻ�');
                        // �ƻ�����ť
                        Button.fontSize(13);
                        // �ƻ�����ť
                        Button.fontColor('#FFFFFF');
                        // �ƻ�����ť
                        Button.backgroundColor('rgba(255, 255, 255, 0.2)');
                        // �ƻ�����ť
                        Button.borderRadius(15);
                        // �ƻ�����ť
                        Button.height(32);
                        // �ƻ�����ť
                        Button.padding({ left: 10, right: 10 });
                        // �ƻ�����ť
                        Button.onClick(() => {
                            this.showPlanPanel = true;
                        });
                    }, Button);
                    // �ƻ�����ť
                    Button.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        // ��ʷ��¼��ť
                        Button.createWithLabel('?? ��¼');
                        // ��ʷ��¼��ť
                        Button.fontSize(13);
                        // ��ʷ��¼��ť
                        Button.fontColor('#FFFFFF');
                        // ��ʷ��¼��ť
                        Button.backgroundColor('rgba(255, 255, 255, 0.2)');
                        // ��ʷ��¼��ť
                        Button.borderRadius(15);
                        // ��ʷ��¼��ť
                        Button.height(32);
                        // ��ʷ��¼��ť
                        Button.padding({ left: 10, right: 10 });
                        // ��ʷ��¼��ť
                        Button.margin({ left: 6 });
                        // ��ʷ��¼��ť
                        Button.onClick(() => {
                            this.showHistoryPanel = true;
                        });
                    }, Button);
                    // ��ʷ��¼��ť
                    Button.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        // ���������
                        Button.createWithLabel('?? ������');
                        // ���������
                        Button.fontSize(13);
                        // ���������
                        Button.fontColor('#FFFFFF');
                        // ���������
                        Button.backgroundColor('rgba(255, 255, 255, 0.2)');
                        // ���������
                        Button.borderRadius(15);
                        // ���������
                        Button.height(32);
                        // ���������
                        Button.padding({ left: 10, right: 10 });
                        // ���������
                        Button.margin({ left: 6 });
                        // ���������
                        Button.onClick(() => {
                            router.pushUrl({
                                url: 'pages/ScoringSimulatorPage'
                            });
                        });
                    }, Button);
                    // ���������
                    Button.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        // �ֱ���ֻ��ʾ��������ť
                        Button.createWithLabel('??');
                        // �ֱ���ֻ��ʾ��������ť
                        Button.fontSize(14);
                        // �ֱ���ֻ��ʾ��������ť
                        Button.fontColor('#FFFFFF');
                        // �ֱ���ֻ��ʾ��������ť
                        Button.backgroundColor('rgba(255, 255, 255, 0.2)');
                        // �ֱ���ֻ��ʾ��������ť
                        Button.borderRadius(12);
                        // �ֱ���ֻ��ʾ��������ť
                        Button.height(28);
                        // �ֱ���ֻ��ʾ��������ť
                        Button.width(28);
                        // �ֱ���ֻ��ʾ��������ť
                        Button.onClick(() => {
                            router.pushUrl({
                                url: 'pages/ScoringSimulatorPage'
                            });
                        });
                    }, Button);
                    // �ֱ���ֻ��ʾ��������ť
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
                        // ��Բ����ʼ��ť
                        Column.create();
                        // ��Բ����ʼ��ť
                        Column.width(DeviceUtils.isWearable() ? 100 : 180);
                        // ��Բ����ʼ��ť
                        Column.height(DeviceUtils.isWearable() ? 100 : 180);
                        // ��Բ����ʼ��ť
                        Column.borderRadius(DeviceUtils.isWearable() ? 50 : 90);
                        // ��Բ����ʼ��ť
                        Column.backgroundColor('rgba(255, 255, 255, 0.25)');
                        // ��Բ����ʼ��ť
                        Column.justifyContent(FlexAlign.Center);
                        // ��Բ����ʼ��ť
                        Column.shadow({ radius: 20, color: 'rgba(0, 0, 0, 0.3)', offsetX: 0, offsetY: 10 });
                        // ��Բ����ʼ��ť
                        Column.onClick(() => {
                            this.showMoveSelector = true;
                        });
                    }, Column);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('??');
                        Text.fontSize(DeviceUtils.isWearable() ? 32 : 60);
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('��ʼѵ��');
                        Text.fontSize(DeviceUtils.isWearable() ? 14 : 20);
                        Text.fontWeight(FontWeight.Bold);
                        Text.fontColor('#FFFFFF');
                        Text.margin({ top: DeviceUtils.isWearable() ? 4 : 10 });
                    }, Text);
                    Text.pop();
                    // ��Բ����ʼ��ť
                    Column.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        If.create();
                        // �ֱ������Ӹ������ݣ�ȷ�����Թ���
                        if (DeviceUtils.isWearable()) {
                            this.ifElseBranchUpdateFunction(0, () => {
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    Column.create();
                                    Column.width('100%');
                                    Column.padding(10);
                                    Column.margin({ top: 20 });
                                }, Column);
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    Text.create('����ͳ��');
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
                                    Text.create('??');
                                    Text.fontSize(20);
                                }, Text);
                                Text.pop();
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    Text.create(`${this.getTodayTotalMinutes()}����`);
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
                                    Text.create('??');
                                    Text.fontSize(20);
                                }, Text);
                                Text.pop();
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    Text.create(`${this.getTodayTotalCount()}��`);
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
                        // ѵ��������
                        Column.create();
                        // ѵ��������
                        Column.width('100%');
                        // ѵ��������
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
                        Text.create(`��ѡ����: ${this.selectedMoves.length}��`);
                        Text.fontSize(DeviceUtils.isWearable() ? 11 : 16);
                        Text.fontColor('rgba(255, 255, 255, 0.8)');
                        Text.margin({ top: DeviceUtils.isWearable() ? 4 : 10 });
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(`ƣ�Ͷ�: ${this.calculateFatigue()}`);
                        Text.fontSize(DeviceUtils.isWearable() ? 11 : 16);
                        Text.fontColor('rgba(255, 255, 255, 0.8)');
                        Text.margin({ top: 4 });
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        // ����ѵ����ť
                        Button.createWithLabel('����ѵ��');
                        // ����ѵ����ť
                        Button.fontSize(DeviceUtils.isWearable() ? 13 : 18);
                        // ����ѵ����ť
                        Button.fontColor('#FFFFFF');
                        // ����ѵ����ť
                        Button.backgroundColor('rgba(255, 100, 100, 0.8)');
                        // ����ѵ����ť
                        Button.borderRadius(DeviceUtils.isWearable() ? 18 : 25);
                        // ����ѵ����ť
                        Button.height(DeviceUtils.isWearable() ? 36 : 50);
                        // ����ѵ����ť
                        Button.width(DeviceUtils.isWearable() ? 100 : 150);
                        // ����ѵ����ť
                        Button.margin({ top: DeviceUtils.isWearable() ? 16 : 30 });
                        // ����ѵ����ť
                        Button.onClick(() => {
                            this.stopTraining();
                        });
                    }, Button);
                    // ����ѵ����ť
                    Button.pop();
                    // ѵ��������
                    Column.pop();
                });
            }
        }, If);
        If.pop();
        Column.pop();
        Scroll.pop();
    }
    // ��ʼѵ��
    startTraining() {
        this.isTraining = true;
        this.trainingTime = 0;
        this.showMoveSelector = false;
        this.timer = setInterval(() => {
            this.trainingTime++;
        }, 1000);
    }
    // ֹͣѵ��
    stopTraining() {
        if (this.timer !== -1) {
            clearInterval(this.timer);
            this.timer = -1;
        }
        // ����ѵ����¼
        if (this.trainingTime > 0 && this.selectedMoves.length > 0) {
            const today = new Date();
            const dateStr = today.toISOString().split('T')[0];
            const timeStr = today.toTimeString().split(' ')[0].substring(0, 5);
            const fatigue = this.calculateFatigue();
            // Ϊÿ��ѡ�еĶ���������ϰ��¼
            this.selectedMoves.forEach((moveId, index) => {
                // ����ÿ����������ϰʱ����ƽ��������ʱ����
                const moveDuration = Math.floor(this.trainingTime / this.selectedMoves.length);
                // ����ΨһID
                const recordId = `${dateStr}-${timeStr}-${moveId}-${index}`;
                // ����ѵ����¼
                this.dataStore.addPracticeRecord({
                    id: recordId,
                    moveName: moveId,
                    date: dateStr,
                    time: timeStr,
                    duration: moveDuration,
                    fatigue: Math.floor(fatigue / this.selectedMoves.length),
                    notes: `ѵ��ʱ��: ${this.formatTime(moveDuration)}`
                });
            });
            // ���ѡ�ж���
            this.selectedMoves = [];
            // ˢ�½��ռ�¼
            this.loadTodayRecords();
        }
        this.isTraining = false;
    }
    // ����ѡ�񵯴�
    buildMoveSelector(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.height('100%');
            Column.backgroundColor('rgba(0, 0, 0, 0.5)');
            Column.justifyContent(FlexAlign.Center);
            Column.onClick(() => {
                // ����ⲿ���ر�
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
            Text.create('ѡ��ѵ������');
            Text.fontSize(20);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#333333');
            Text.margin({ bottom: 20 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // ��Ծ����
            Text.create('��Ծ (ƣ�Ͷ�: 7)');
            // ��Ծ����
            Text.fontSize(14);
            // ��Ծ����
            Text.fontColor('#666666');
            // ��Ծ����
            Text.margin({ bottom: 10 });
        }, Text);
        // ��Ծ����
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
            // ��ת����
            Text.create('��ת (ƣ�Ͷ�: 3)');
            // ��ת����
            Text.fontSize(14);
            // ��ת����
            Text.fontColor('#666666');
            // ��ת����
            Text.margin({ bottom: 10 });
        }, Text);
        // ��ת����
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
            // ��������
            Text.create('���� (ƣ�Ͷ�: 1)');
            // ��������
            Text.fontSize(14);
            // ��������
            Text.fontColor('#666666');
            // ��������
            Text.margin({ bottom: 10 });
        }, Text);
        // ��������
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
            Button.createWithLabel('ȡ��');
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
            Button.createWithLabel('��ʼ');
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
    // �ҵ�
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
            Text.create('?? �ҵ�');
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
            Text.create('??');
            Text.fontSize(DeviceUtils.isWearable() ? 40 : 50);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('��������');
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
            // ������� - �ֱ��˼���ʾ
            if (!DeviceUtils.isWearable()) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Column.create();
                        Column.width('90%');
                        Column.margin({ top: 20 });
                    }, Column);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        // ��ֽ��
                        Row.create();
                        // ��ֽ��
                        Row.width('100%');
                        // ��ֽ��
                        Row.padding(15);
                        // ��ֽ��
                        Row.backgroundColor('#FFFFFF');
                        // ��ֽ��
                        Row.borderRadius(12);
                        // ��ֽ��
                        Row.onClick(() => {
                            router.pushUrl({
                                url: 'pages/ScoreInterpreterPage'
                            });
                        });
                    }, Row);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('??');
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
                        Text.create('��ֽ��');
                        Text.fontSize(16);
                        Text.fontWeight(FontWeight.Bold);
                        Text.fontColor('#333333');
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('��������������˽����ֹ���');
                        Text.fontSize(12);
                        Text.fontColor('#999999');
                        Text.margin({ top: 4 });
                    }, Text);
                    Text.pop();
                    Column.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('?');
                        Text.fontSize(24);
                        Text.fontColor('#CCCCCC');
                    }, Text);
                    Text.pop();
                    // ��ֽ��
                    Row.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        // �Ʒ�ģ����
                        Row.create();
                        // �Ʒ�ģ����
                        Row.width('100%');
                        // �Ʒ�ģ����
                        Row.padding(15);
                        // �Ʒ�ģ����
                        Row.backgroundColor('#FFFFFF');
                        // �Ʒ�ģ����
                        Row.borderRadius(12);
                        // �Ʒ�ģ����
                        Row.margin({ top: 12 });
                        // �Ʒ�ģ����
                        Row.onClick(() => {
                            router.pushUrl({
                                url: 'pages/ScoringSimulatorPage'
                            });
                        });
                    }, Row);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('??');
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
                        Text.create('�Ʒ�ģ����');
                        Text.fontSize(16);
                        Text.fontWeight(FontWeight.Bold);
                        Text.fontColor('#333333');
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('ģ��ISU�ٷ��Ʒֹ���');
                        Text.fontSize(12);
                        Text.fontColor('#999999');
                        Text.margin({ top: 4 });
                    }, Text);
                    Text.pop();
                    Column.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('?');
                        Text.fontSize(24);
                        Text.fontColor('#CCCCCC');
                    }, Text);
                    Text.pop();
                    // �Ʒ�ģ����
                    Row.pop();
                    Column.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        // �ֱ�����ʾ�����б�
                        Column.create();
                        // �ֱ�����ʾ�����б�
                        Column.width('90%');
                        // �ֱ�����ʾ�����б�
                        Column.margin({ top: 15 });
                    }, Column);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        // �Ʒ�ģ����
                        Row.create();
                        // �Ʒ�ģ����
                        Row.width('100%');
                        // �Ʒ�ģ����
                        Row.padding(12);
                        // �Ʒ�ģ����
                        Row.backgroundColor('#FFFFFF');
                        // �Ʒ�ģ����
                        Row.borderRadius(10);
                        // �Ʒ�ģ����
                        Row.onClick(() => {
                            router.pushUrl({
                                url: 'pages/ScoringSimulatorPage'
                            });
                        });
                    }, Row);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('??');
                        Text.fontSize(20);
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('�Ʒ�ģ����');
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
                        Text.create('?');
                        Text.fontSize(20);
                        Text.fontColor('#CCCCCC');
                    }, Text);
                    Text.pop();
                    // �Ʒ�ģ����
                    Row.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        // ����
                        Row.create();
                        // ����
                        Row.width('100%');
                        // ����
                        Row.padding(12);
                        // ����
                        Row.backgroundColor('#FFFFFF');
                        // ����
                        Row.borderRadius(10);
                        // ����
                        Row.margin({ top: 10 });
                    }, Row);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('??');
                        Text.fontSize(20);
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('����');
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
                        Text.create('?');
                        Text.fontSize(20);
                        Text.fontColor('#CCCCCC');
                    }, Text);
                    Text.pop();
                    // ����
                    Row.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        // ����
                        Row.create();
                        // ����
                        Row.width('100%');
                        // ����
                        Row.padding(12);
                        // ����
                        Row.backgroundColor('#FFFFFF');
                        // ����
                        Row.borderRadius(10);
                        // ����
                        Row.margin({ top: 10 });
                    }, Row);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('??');
                        Text.fontSize(20);
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('����');
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
                        Text.create('?');
                        Text.fontSize(20);
                        Text.fontColor('#CCCCCC');
                    }, Text);
                    Text.pop();
                    // ����
                    Row.pop();
                    // �ֱ�����ʾ�����б�
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
            // �ֱ���ֻ��ʾ3����ҪTab�������豸��ʾ5��
            if (DeviceUtils.isWearable()) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        // �ֱ��˼򻯵�����
                        Column.create();
                        // �ֱ��˼򻯵�����
                        Column.width('33.3%');
                        // �ֱ��˼򻯵�����
                        Column.height(40);
                        // �ֱ��˼򻯵�����
                        Column.justifyContent(FlexAlign.Center);
                        // �ֱ��˼򻯵�����
                        Column.onClick(() => { this.currentTab = 0; });
                    }, Column);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('??');
                        Text.fontSize(18);
                        Text.opacity(this.currentTab === 0 ? 1.0 : 0.6);
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('ѵ��');
                        Text.fontSize(9);
                        Text.fontColor(this.currentTab === 0 ? '#FFFFFF' : '#E0E0E0');
                        Text.margin({ top: 1 });
                    }, Text);
                    Text.pop();
                    // �ֱ��˼򻯵�����
                    Column.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Column.create();
                        Column.width('33.3%');
                        Column.height(40);
                        Column.justifyContent(FlexAlign.Center);
                        Column.onClick(() => { this.currentTab = 2; });
                    }, Column);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('??');
                        Text.fontSize(18);
                        Text.opacity(this.currentTab === 3 ? 1.0 : 0.6);
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('�ɾ�');
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
                        Column.onClick(() => { this.currentTab = 3; });
                    }, Column);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('??');
                        Text.fontSize(18);
                        Text.opacity(this.currentTab === 4 ? 1.0 : 0.6);
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('�ҵ�');
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
                        // �ֻ���ƽ�塢PC��ʾ����������
                        Column.create();
                        // �ֻ���ƽ�塢PC��ʾ����������
                        Column.width('25%');
                        // �ֻ���ƽ�塢PC��ʾ����������
                        Column.height(60);
                        // �ֻ���ƽ�塢PC��ʾ����������
                        Column.justifyContent(FlexAlign.Center);
                        // �ֻ���ƽ�塢PC��ʾ����������
                        Column.onClick(() => { this.currentTab = 0; });
                    }, Column);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('??');
                        Text.fontSize(24);
                        Text.opacity(this.currentTab === 0 ? 1.0 : 0.6);
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('ѵ��̨');
                        Text.fontSize(12);
                        Text.fontColor(this.currentTab === 0 ? '#FFFFFF' : '#E0E0E0');
                        Text.margin({ top: 4 });
                    }, Text);
                    Text.pop();
                    // �ֻ���ƽ�塢PC��ʾ����������
                    Column.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Column.create();
                        Column.width('25%');
                        Column.height(60);
                        Column.justifyContent(FlexAlign.Center);
                        Column.onClick(() => { this.currentTab = 1; });
                    }, Column);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('??');
                        Text.fontSize(24);
                        Text.opacity(this.currentTab === 1 ? 1.0 : 0.6);
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('������');
                        Text.fontSize(12);
                        Text.fontColor(this.currentTab === 1 ? '#FFFFFF' : '#E0E0E0');
                        Text.margin({ top: 4 });
                    }, Text);
                    Text.pop();
                    Column.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Column.create();
                        Column.width('25%');
                        Column.height(60);
                        Column.justifyContent(FlexAlign.Center);
                        Column.onClick(() => { this.currentTab = 2; });
                    }, Column);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('??');
                        Text.fontSize(24);
                        Text.opacity(this.currentTab === 3 ? 1.0 : 0.6);
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('�ɾ�');
                        Text.fontSize(12);
                        Text.fontColor(this.currentTab === 3 ? '#FFFFFF' : '#E0E0E0');
                        Text.margin({ top: 4 });
                    }, Text);
                    Text.pop();
                    Column.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Column.create();
                        Column.width('25%');
                        Column.height(60);
                        Column.justifyContent(FlexAlign.Center);
                        Column.onClick(() => { this.currentTab = 3; });
                    }, Column);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('??');
                        Text.fontSize(24);
                        Text.opacity(this.currentTab === 4 ? 1.0 : 0.6);
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('�ҵ�');
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
    // ========== ��ʷ��¼��� ==========
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
            // ������
            Row.create();
            // ������
            Row.width('100%');
            // ������
            Row.margin({ bottom: 20 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('?? ������ϰ��¼');
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
            Button.createWithLabel('�ر�');
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
        // ������
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            // ��¼�б�
            if (this.todayRecords.length === 0) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Column.create();
                        Column.width('100%');
                        Column.height(300);
                        Column.justifyContent(FlexAlign.Center);
                    }, Column);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('??');
                        Text.fontSize(60);
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('���컹û����ϰ��¼');
                        Text.fontSize(16);
                        Text.fontColor('#999999');
                        Text.margin({ top: 15 });
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('��ʼѵ������¼���ÿһ�ν�����');
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
                                // ʱ��
                                Column.create();
                                // ʱ��
                                Column.width(60);
                            }, Column);
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Text.create(record.time);
                                Text.fontSize(16);
                                Text.fontWeight(FontWeight.Bold);
                                Text.fontColor('#3A7BD5');
                            }, Text);
                            Text.pop();
                            // ʱ��
                            Column.pop();
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                // ������Ϣ
                                Column.create();
                                // ������Ϣ
                                Column.layoutWeight(1);
                                // ������Ϣ
                                Column.alignItems(HorizontalAlign.Start);
                                // ������Ϣ
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
                            // ������Ϣ
                            Column.pop();
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                // ʱ����ƣ�Ͷ�
                                Column.create();
                                // ʱ����ƣ�Ͷ�
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
                                Text.create(`ƣ�Ͷ� ${record.fatigue}`);
                                Text.fontSize(12);
                                Text.fontColor('#999999');
                                Text.margin({ top: 4 });
                            }, Text);
                            Text.pop();
                            // ʱ����ƣ�Ͷ�
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
            // �ײ�ͳ��
            Row.create();
            // �ײ�ͳ��
            Row.width('100%');
            // �ײ�ͳ��
            Row.padding(20);
            // �ײ�ͳ��
            Row.backgroundColor('#F0F0F0');
            // �ײ�ͳ��
            Row.borderRadius(15);
            // �ײ�ͳ��
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
            Text.create('��ϰ����');
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
            Text.create('��ʱ��');
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
            Text.create('��ƣ�Ͷ�');
            Text.fontSize(12);
            Text.fontColor('#999999');
        }, Text);
        Text.pop();
        Column.pop();
        // �ײ�ͳ��
        Row.pop();
        Column.pop();
        Column.pop();
    }
    // ========== �ƻ������ ==========
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
            // ������
            Row.create();
            // ������
            Row.width('100%');
            // ������
            Row.margin({ bottom: 20 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('?? ��ѵ���ƻ�');
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
                        Button.createWithLabel('�����ƻ�');
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
            Button.createWithLabel('�ر�');
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
        // ������
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (!this.currentWeekPlan) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        // �޼ƻ���ʾ
                        Column.create();
                        // �޼ƻ���ʾ
                        Column.width('100%');
                        // �޼ƻ���ʾ
                        Column.height(300);
                        // �޼ƻ���ʾ
                        Column.justifyContent(FlexAlign.Center);
                    }, Column);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('??');
                        Text.fontSize(60);
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('��û�б���ѵ���ƻ�');
                        Text.fontSize(16);
                        Text.fontColor('#999999');
                        Text.margin({ top: 15 });
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('���"�����ƻ�"��ʼ�滮���ѵ����');
                        Text.fontSize(14);
                        Text.fontColor('#CCCCCC');
                        Text.margin({ top: 8 });
                    }, Text);
                    Text.pop();
                    // �޼ƻ���ʾ
                    Column.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        // �ƻ�����
                        Scroll.create();
                        // �ƻ�����
                        Scroll.width('100%');
                        // �ƻ�����
                        Scroll.layoutWeight(1);
                        // �ƻ�����
                        Scroll.scrollBar(BarState.Auto);
                    }, Scroll);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Column.create();
                        Column.width('100%');
                    }, Column);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        // �����ڷ�Χ
                        Text.create(`${this.currentWeekPlan.weekStart} �� ${this.currentWeekPlan.weekEnd}`);
                        // �����ڷ�Χ
                        Text.fontSize(14);
                        // �����ڷ�Χ
                        Text.fontColor('#999999');
                        // �����ڷ�Χ
                        Text.margin({ bottom: 15 });
                    }, Text);
                    // �����ڷ�Χ
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        // ÿ�ռƻ�
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
                                // ���ڱ���
                                Row.create();
                                // ���ڱ���
                                Row.width('100%');
                                // ���ڱ���
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
                                // Ŀ��ʱ��
                                if (dayPlan.targetDuration) {
                                    this.ifElseBranchUpdateFunction(0, () => {
                                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                                            Text.create(`Ŀ��: ${dayPlan.targetDuration}����`);
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
                            // ���ڱ���
                            Row.pop();
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                If.create();
                                // �ƻ��Ķ���
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
                                            Text.create('���޼ƻ�');
                                            Text.fontSize(14);
                                            Text.fontColor('#CCCCCC');
                                        }, Text);
                                        Text.pop();
                                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                                            Button.createWithLabel('+ ���Ӷ���');
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
                                                                Text.create(`��${move.targetCount}`);
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
                                            Button.createWithLabel('+ ���Ӹ���');
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
                                // ��ע
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
                    // ÿ�ռƻ�
                    ForEach.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        If.create();
                        // �ܱ�ע
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
                                    Text.create('����Ŀ��');
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
                    // �ƻ�����
                    Scroll.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        // ɾ����ť
                        Button.createWithLabel('ɾ���ƻ�');
                        // ɾ����ť
                        Button.fontSize(16);
                        // ɾ����ť
                        Button.fontColor('#FF6B6B');
                        // ɾ����ť
                        Button.backgroundColor('#FFE5E5');
                        // ɾ����ť
                        Button.borderRadius(20);
                        // ɾ����ť
                        Button.width('100%');
                        // ɾ����ť
                        Button.height(44);
                        // ɾ����ť
                        Button.margin({ top: 15 });
                        // ɾ����ť
                        Button.onClick(() => {
                            this.deleteCurrentPlan();
                        });
                    }, Button);
                    // ɾ����ť
                    Button.pop();
                });
            }
        }, If);
        If.pop();
        Column.pop();
        Column.pop();
    }
    // ========== ���Ӷ������ ==========
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
            // ������
            Row.create();
            // ������
            Row.width('100%');
            // ������
            Row.margin({ bottom: 20 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('����ѵ������');
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
            Button.createWithLabel('�ر�');
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
        // ������
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
            // ѡ����
            Text.create('ѡ����');
            // ѡ����
            Text.fontSize(16);
            // ѡ����
            Text.fontWeight(FontWeight.Bold);
            // ѡ����
            Text.fontColor('#333333');
            // ѡ����
            Text.margin({ bottom: 10 });
        }, Text);
        // ѡ����
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // ��Ծ����
            Text.create('��Ծ');
            // ��Ծ����
            Text.fontSize(14);
            // ��Ծ����
            Text.fontColor('#666666');
            // ��Ծ����
            Text.margin({ bottom: 8 });
        }, Text);
        // ��Ծ����
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
            // ��ת����
            Text.create('��ת');
            // ��ת����
            Text.fontSize(14);
            // ��ת����
            Text.fontColor('#666666');
            // ��ת����
            Text.margin({ bottom: 8 });
        }, Text);
        // ��ת����
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
            // ��������
            Text.create('����');
            // ��������
            Text.fontSize(14);
            // ��������
            Text.fontColor('#666666');
            // ��������
            Text.margin({ bottom: 8 });
        }, Text);
        // ��������
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
            // Ŀ�����
            Text.create('Ŀ���������ѡ��');
            // Ŀ�����
            Text.fontSize(16);
            // Ŀ�����
            Text.fontWeight(FontWeight.Bold);
            // Ŀ�����
            Text.fontColor('#333333');
            // Ŀ�����
            Text.margin({ bottom: 10 });
        }, Text);
        // Ŀ�����
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            TextInput.create({ placeholder: '����: 10', text: this.targetCountInput });
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
            // ���ȼ�
            Text.create('���ȼ�');
            // ���ȼ�
            Text.fontSize(16);
            // ���ȼ�
            Text.fontWeight(FontWeight.Bold);
            // ���ȼ�
            Text.fontColor('#333333');
            // ���ȼ�
            Text.margin({ bottom: 10 });
        }, Text);
        // ���ȼ�
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.margin({ bottom: 30 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('��');
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
            Button.createWithLabel('��');
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
            Button.createWithLabel('��');
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
            // ȷ�ϰ�ť
            Button.createWithLabel('ȷ������');
            // ȷ�ϰ�ť
            Button.fontSize(18);
            // ȷ�ϰ�ť
            Button.fontColor('#FFFFFF');
            // ȷ�ϰ�ť
            Button.backgroundColor(this.selectedMoveForPlan ? '#3A7BD5' : '#CCCCCC');
            // ȷ�ϰ�ť
            Button.borderRadius(25);
            // ȷ�ϰ�ť
            Button.width('100%');
            // ȷ�ϰ�ť
            Button.height(50);
            // ȷ�ϰ�ť
            Button.enabled(!!this.selectedMoveForPlan);
            // ȷ�ϰ�ť
            Button.onClick(() => {
                this.addMoveToPlan();
            });
        }, Button);
        // ȷ�ϰ�ť
        Button.pop();
        Column.pop();
        Scroll.pop();
        Column.pop();
        Column.pop();
    }
    // ��������
    private getMoveIcon(moveName: string): string {
        if (this.jumpMoves.includes(moveName))
            return '??';
        if (this.spinMoves.includes(moveName))
            return '??';
        if (this.stepMoves.includes(moveName))
            return '??';
        return '??';
    }
    private formatDuration(seconds: number): string {
        if (seconds < 60)
            return `${seconds}��`;
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return secs > 0 ? `${mins}��${secs}��` : `${mins}����`;
    }
    private getDayName(dayOfWeek: number): string {
        const days = ['����', '��һ', '�ܶ�', '����', '����', '����', '����'];
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
        // �����µĶ����ƻ�
        const newMove: PlannedMove = {
            moveName: this.selectedMoveForPlan,
            targetCount: this.targetCountInput ? parseInt(this.targetCountInput) : undefined,
            priority: this.selectedPriority as 'high' | 'medium' | 'low',
            notes: ''
        };
        // ���ӵ���Ӧ��ļƻ���
        this.currentWeekPlan.dailyPlans[this.editingDayIndex].moves.push(newMove);
        // �������
        this.dataStore.saveWeeklyPlan(this.currentWeekPlan);
        // ����״̬
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
