if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface MoveDetailPage_Params {
    moveAbbr?: string;
    move?: MoveDetail | null;
    records?: PracticeRecord[];
    showTipsEditor?: boolean;
    tipsText?: string;
    dataStore?: DataStore;
}
import router from "@ohos:router";
import { DataStore } from "@bundle:com.example.simplecalculator/entry/ets/services/DataStore";
import type { MoveDetail, PracticeRecord } from '../models/IceTraceData';
class MoveDetailPage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__moveAbbr = new ObservedPropertySimplePU('', this, "moveAbbr");
        this.__move = new ObservedPropertyObjectPU(null, this, "move");
        this.__records = new ObservedPropertyObjectPU([], this, "records");
        this.__showTipsEditor = new ObservedPropertySimplePU(false, this, "showTipsEditor");
        this.__tipsText = new ObservedPropertySimplePU('', this, "tipsText");
        this.dataStore = DataStore.getInstance();
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: MoveDetailPage_Params) {
        if (params.moveAbbr !== undefined) {
            this.moveAbbr = params.moveAbbr;
        }
        if (params.move !== undefined) {
            this.move = params.move;
        }
        if (params.records !== undefined) {
            this.records = params.records;
        }
        if (params.showTipsEditor !== undefined) {
            this.showTipsEditor = params.showTipsEditor;
        }
        if (params.tipsText !== undefined) {
            this.tipsText = params.tipsText;
        }
        if (params.dataStore !== undefined) {
            this.dataStore = params.dataStore;
        }
    }
    updateStateVars(params: MoveDetailPage_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__moveAbbr.purgeDependencyOnElmtId(rmElmtId);
        this.__move.purgeDependencyOnElmtId(rmElmtId);
        this.__records.purgeDependencyOnElmtId(rmElmtId);
        this.__showTipsEditor.purgeDependencyOnElmtId(rmElmtId);
        this.__tipsText.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__moveAbbr.aboutToBeDeleted();
        this.__move.aboutToBeDeleted();
        this.__records.aboutToBeDeleted();
        this.__showTipsEditor.aboutToBeDeleted();
        this.__tipsText.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __moveAbbr: ObservedPropertySimplePU<string>;
    get moveAbbr() {
        return this.__moveAbbr.get();
    }
    set moveAbbr(newValue: string) {
        this.__moveAbbr.set(newValue);
    }
    private __move: ObservedPropertyObjectPU<MoveDetail | null>;
    get move() {
        return this.__move.get();
    }
    set move(newValue: MoveDetail | null) {
        this.__move.set(newValue);
    }
    private __records: ObservedPropertyObjectPU<PracticeRecord[]>;
    get records() {
        return this.__records.get();
    }
    set records(newValue: PracticeRecord[]) {
        this.__records.set(newValue);
    }
    private __showTipsEditor: ObservedPropertySimplePU<boolean>;
    get showTipsEditor() {
        return this.__showTipsEditor.get();
    }
    set showTipsEditor(newValue: boolean) {
        this.__showTipsEditor.set(newValue);
    }
    private __tipsText: ObservedPropertySimplePU<string>;
    get tipsText() {
        return this.__tipsText.get();
    }
    set tipsText(newValue: string) {
        this.__tipsText.set(newValue);
    }
    private dataStore: DataStore;
    aboutToAppear() {
        // 获取路由参数
        const params = router.getParams() as Record<string, string>;
        if (params && params['abbr']) {
            this.moveAbbr = params['abbr'] as string;
            this.loadMoveData();
        }
    }
    loadMoveData() {
        this.move = this.dataStore.getMove(this.moveAbbr) || null;
        this.records = this.dataStore.getMoveRecords(this.moveAbbr);
        if (this.move) {
            this.tipsText = this.move.tips;
        }
    }
    // 格式化时间
    formatDuration(seconds: number): string {
        if (seconds < 60)
            return `${seconds}秒`;
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return secs > 0 ? `${mins}分${secs}秒` : `${mins}分钟`;
    }
    // 格式化日期
    formatDate(date: string): string {
        const parts = date.split('-');
        return `${parts[1]}月${parts[2]}日`;
    }
    // 获取类型图标
    getTypeIcon(): string {
        if (!this.move)
            return '❓';
        switch (this.move.type) {
            case 'jump': return '🦶';
            case 'spin': return '🌀';
            case 'step': return '👣';
            default: return '❓';
        }
    }
    // 获取类型名称
    getTypeName(): string {
        if (!this.move)
            return '未知';
        switch (this.move.type) {
            case 'jump': return '跳跃';
            case 'spin': return '旋转';
            case 'step': return '步法';
            default: return '未知';
        }
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
            // 顶部导航
            Row.create();
            // 顶部导航
            Row.width('100%');
            // 顶部导航
            Row.padding({ left: 20, right: 20, top: 15, bottom: 15 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('←');
            Text.fontSize(24);
            Text.fontColor('#FFFFFF');
            Text.onClick(() => {
                router.back();
            });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.move?.name || this.moveAbbr);
            Text.fontSize(20);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#FFFFFF');
            Text.margin({ left: 15 });
            Text.layoutWeight(1);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('设置');
            Text.fontSize(14);
            Text.fontColor('#FFFFFF');
            Text.onClick(() => {
                this.showTipsEditor = true;
            });
        }, Text);
        Text.pop();
        // 顶部导航
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            // 动作信息卡片
            if (this.move) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.buildMoveInfo.bind(this)();
                });
            }
            // 练习历史时间轴
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 练习历史时间轴
            Column.create();
            // 练习历史时间轴
            Column.width('100%');
            // 练习历史时间轴
            Column.layoutWeight(1);
            // 练习历史时间轴
            Column.padding(20);
            // 练习历史时间轴
            Column.margin({ top: 10 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('练习历史');
            Text.fontSize(18);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#FFFFFF');
            Text.margin({ bottom: 15 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.records.length === 0) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Column.create();
                        Column.width('100%');
                        Column.height(150);
                        Column.justifyContent(FlexAlign.Center);
                    }, Column);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('📝');
                        Text.fontSize(40);
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('暂无练习记录');
                        Text.fontSize(14);
                        Text.fontColor('rgba(255, 255, 255, 0.6)');
                        Text.margin({ top: 10 });
                    }, Text);
                    Text.pop();
                    Column.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        List.create();
                        List.width('100%');
                        List.layoutWeight(1);
                    }, List);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        ForEach.create();
                        const forEachItemGenFunction = (_item, index: number) => {
                            const record = _item;
                            {
                                const itemCreation = (elmtId, isInitialRender) => {
                                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                                    ListItem.create(deepRenderFunction, true);
                                    if (!isInitialRender) {
                                        ListItem.pop();
                                    }
                                    ViewStackProcessor.StopGetAccessRecording();
                                };
                                const itemCreation2 = (elmtId, isInitialRender) => {
                                    ListItem.create(deepRenderFunction, true);
                                };
                                const deepRenderFunction = (elmtId, isInitialRender) => {
                                    itemCreation(elmtId, isInitialRender);
                                    this.buildTimelineItem.bind(this)(record, index);
                                    ListItem.pop();
                                };
                                this.observeComponentCreation2(itemCreation2, ListItem);
                                ListItem.pop();
                            }
                        };
                        this.forEachUpdateFunction(elmtId, this.records, forEachItemGenFunction, undefined, true, false);
                    }, ForEach);
                    ForEach.pop();
                    List.pop();
                });
            }
        }, If);
        If.pop();
        // 练习历史时间轴
        Column.pop();
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            // 动作要点编辑弹窗
            if (this.showTipsEditor) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.buildTipsEditor.bind(this)();
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
    buildMoveInfo(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('90%');
            Column.padding(20);
            Column.backgroundColor('#FFFFFF');
            Column.borderRadius(15);
            Column.margin({ top: 10 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.getTypeIcon());
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
            Text.create(this.move!.name);
            Text.fontSize(18);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#333333');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.margin({ top: 5 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.move!.abbr);
            Text.fontSize(14);
            Text.fontColor('#666666');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(' | ');
            Text.fontSize(14);
            Text.fontColor('#CCCCCC');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.getTypeName());
            Text.fontSize(14);
            Text.fontColor('#666666');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(' | ');
            Text.fontSize(14);
            Text.fontColor('#CCCCCC');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.move!.level + '级');
            Text.fontSize(14);
            Text.fontColor('#FF6B6B');
            Text.fontWeight(FontWeight.Bold);
        }, Text);
        Text.pop();
        Row.pop();
        Column.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 统计数据
            Row.create();
            // 统计数据
            Row.width('100%');
            // 统计数据
            Row.margin({ top: 20 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.layoutWeight(1);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.formatDuration(this.move!.totalDuration));
            Text.fontSize(20);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#3A7BD5');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('累计时长');
            Text.fontSize(12);
            Text.fontColor('#666666');
            Text.margin({ top: 5 });
        }, Text);
        Text.pop();
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.layoutWeight(1);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.move!.practiceCount.toString());
            Text.fontSize(20);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#3A7BD5');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('练习次数');
            Text.fontSize(12);
            Text.fontColor('#666666');
            Text.margin({ top: 5 });
        }, Text);
        Text.pop();
        Column.pop();
        // 统计数据
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            // 动作要点
            if (this.move!.tips) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Column.create();
                        Column.width('100%');
                        Column.alignItems(HorizontalAlign.Start);
                        Column.margin({ top: 15 });
                        Column.padding(15);
                        Column.backgroundColor('#F5F5F5');
                        Column.borderRadius(10);
                    }, Column);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('动作要点');
                        Text.fontSize(14);
                        Text.fontColor('#666666');
                        Text.margin({ bottom: 8 });
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(this.move!.tips);
                        Text.fontSize(14);
                        Text.fontColor('#333333');
                        Text.lineHeight(22);
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
    }
    buildTimelineItem(record: PracticeRecord, index: number, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.alignItems(VerticalAlign.Top);
            Row.margin({ bottom: 10 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 时间轴左侧
            Column.create();
            // 时间轴左侧
            Column.width(60);
            // 时间轴左侧
            Column.alignItems(HorizontalAlign.End);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.formatDate(record.date));
            Text.fontSize(12);
            Text.fontColor('rgba(255, 255, 255, 0.8)');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(record.time);
            Text.fontSize(10);
            Text.fontColor('rgba(255, 255, 255, 0.6)');
        }, Text);
        Text.pop();
        // 时间轴左侧
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 时间轴中间
            Column.create();
            // 时间轴中间
            Column.width(20);
            // 时间轴中间
            Column.margin({ left: 10, right: 10 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Circle.create();
            Circle.width(12);
            Circle.height(12);
            Circle.fill('#FFFFFF');
        }, Circle);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (index < this.records.length - 1) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Line.create();
                        Line.width(2);
                        Line.height(40);
                        Line.backgroundColor('rgba(255, 255, 255, 0.3)');
                    }, Line);
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        // 时间轴中间
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 时间轴右侧内容
            Column.create();
            // 时间轴右侧内容
            Column.alignItems(HorizontalAlign.Start);
            // 时间轴右侧内容
            Column.layoutWeight(1);
            // 时间轴右侧内容
            Column.padding(15);
            // 时间轴右侧内容
            Column.backgroundColor('rgba(255, 255, 255, 0.15)');
            // 时间轴右侧内容
            Column.borderRadius(10);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(`时长: ${this.formatDuration(record.duration)}`);
            Text.fontSize(14);
            Text.fontColor('#FFFFFF');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(`疲劳度: ${record.fatigue}`);
            Text.fontSize(14);
            Text.fontColor('rgba(255, 255, 255, 0.8)');
            Text.margin({ left: 15 });
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
                        Text.fontColor('rgba(255, 255, 255, 0.6)');
                        Text.margin({ top: 5 });
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
        // 时间轴右侧内容
        Column.pop();
        Row.pop();
    }
    buildTipsEditor(parent = null) {
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
            Text.create('设置动作要点');
            Text.fontSize(18);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#333333');
            Text.margin({ bottom: 20 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            TextArea.create({ placeholder: '输入动作要点，如：起跳角度、落冰姿势等...', text: this.tipsText });
            TextArea.width('100%');
            TextArea.height(150);
            TextArea.fontSize(14);
            TextArea.fontColor('#333333');
            TextArea.backgroundColor('#F5F5F5');
            TextArea.borderRadius(10);
            TextArea.onChange((value: string) => {
                this.tipsText = value;
            });
        }, TextArea);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.margin({ top: 20 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('取消');
            Button.fontSize(16);
            Button.fontColor('#666666');
            Button.backgroundColor('#E0E0E0');
            Button.borderRadius(20);
            Button.layoutWeight(1);
            Button.onClick(() => {
                this.showTipsEditor = false;
                this.tipsText = this.move?.tips || '';
            });
        }, Button);
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('保存');
            Button.fontSize(16);
            Button.fontColor('#FFFFFF');
            Button.backgroundColor('#3A7BD5');
            Button.borderRadius(20);
            Button.layoutWeight(1);
            Button.margin({ left: 15 });
            Button.onClick(() => {
                this.dataStore.updateMoveTips(this.moveAbbr, this.tipsText);
                this.showTipsEditor = false;
                this.loadMoveData();
            });
        }, Button);
        Button.pop();
        Row.pop();
        Column.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "MoveDetailPage";
    }
}
registerNamedRoute(() => new MoveDetailPage(undefined, {}), "", { bundleName: "com.example.simplecalculator", moduleName: "entry", pagePath: "pages/MoveDetailPage", pageFullPath: "entry/src/main/ets/pages/MoveDetailPage", integratedHsp: "false", moduleType: "followWithHap" });
