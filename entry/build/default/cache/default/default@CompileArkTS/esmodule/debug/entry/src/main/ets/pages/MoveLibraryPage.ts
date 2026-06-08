if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface MoveLibraryPage_Params {
    searchText?: string;
    selectedType?: string;
    selectedMastery?: string;
    showAddDialog?: boolean;
    customMoveName?: string;
    customMoveNotes?: string;
    moveList?: MoveDetail[];
    filteredMoves?: MoveDetail[];
    customMoves?: CustomMove[];
    dataStore?: DataStore;
    typeFilters?: TypeFilter[];
    masteryFilters?: MasteryFilter[];
}
import router from "@ohos:router";
import { DataStore } from "@bundle:com.example.simplecalculator/entry/ets/services/DataStore";
import type { MoveDetail } from '../models/IceTraceData';
interface TypeFilter {
    id: string;
    name: string;
}
interface MasteryFilter {
    id: string;
    name: string;
    color: string;
}
interface CustomMove {
    name: string;
    notes: string;
    createDate: string;
}
export class MoveLibraryPage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__searchText = new ObservedPropertySimplePU('', this, "searchText");
        this.__selectedType = new ObservedPropertySimplePU('all', this, "selectedType");
        this.__selectedMastery = new ObservedPropertySimplePU('all', this, "selectedMastery");
        this.__showAddDialog = new ObservedPropertySimplePU(false, this, "showAddDialog");
        this.__customMoveName = new ObservedPropertySimplePU('', this, "customMoveName");
        this.__customMoveNotes = new ObservedPropertySimplePU('', this, "customMoveNotes");
        this.__moveList = new ObservedPropertyObjectPU([], this, "moveList");
        this.__filteredMoves = new ObservedPropertyObjectPU([], this, "filteredMoves");
        this.__customMoves = new ObservedPropertyObjectPU([], this, "customMoves");
        this.dataStore = DataStore.getInstance();
        this.typeFilters = [
            { id: 'all', name: '全部' },
            { id: 'jump', name: '跳跃' },
            { id: 'spin', name: '旋转' },
            { id: 'step', name: '步法' }
        ];
        this.masteryFilters = [
            { id: 'all', name: '全部', color: '#999999' },
            { id: 'S', name: 'S级', color: '#FF6B6B' },
            { id: 'A', name: 'A级', color: '#FFA500' },
            { id: 'B', name: 'B级', color: '#4CAF50' },
            { id: 'C', name: 'C级', color: '#2196F3' }
        ];
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: MoveLibraryPage_Params) {
        if (params.searchText !== undefined) {
            this.searchText = params.searchText;
        }
        if (params.selectedType !== undefined) {
            this.selectedType = params.selectedType;
        }
        if (params.selectedMastery !== undefined) {
            this.selectedMastery = params.selectedMastery;
        }
        if (params.showAddDialog !== undefined) {
            this.showAddDialog = params.showAddDialog;
        }
        if (params.customMoveName !== undefined) {
            this.customMoveName = params.customMoveName;
        }
        if (params.customMoveNotes !== undefined) {
            this.customMoveNotes = params.customMoveNotes;
        }
        if (params.moveList !== undefined) {
            this.moveList = params.moveList;
        }
        if (params.filteredMoves !== undefined) {
            this.filteredMoves = params.filteredMoves;
        }
        if (params.customMoves !== undefined) {
            this.customMoves = params.customMoves;
        }
        if (params.dataStore !== undefined) {
            this.dataStore = params.dataStore;
        }
        if (params.typeFilters !== undefined) {
            this.typeFilters = params.typeFilters;
        }
        if (params.masteryFilters !== undefined) {
            this.masteryFilters = params.masteryFilters;
        }
    }
    updateStateVars(params: MoveLibraryPage_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__searchText.purgeDependencyOnElmtId(rmElmtId);
        this.__selectedType.purgeDependencyOnElmtId(rmElmtId);
        this.__selectedMastery.purgeDependencyOnElmtId(rmElmtId);
        this.__showAddDialog.purgeDependencyOnElmtId(rmElmtId);
        this.__customMoveName.purgeDependencyOnElmtId(rmElmtId);
        this.__customMoveNotes.purgeDependencyOnElmtId(rmElmtId);
        this.__moveList.purgeDependencyOnElmtId(rmElmtId);
        this.__filteredMoves.purgeDependencyOnElmtId(rmElmtId);
        this.__customMoves.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__searchText.aboutToBeDeleted();
        this.__selectedType.aboutToBeDeleted();
        this.__selectedMastery.aboutToBeDeleted();
        this.__showAddDialog.aboutToBeDeleted();
        this.__customMoveName.aboutToBeDeleted();
        this.__customMoveNotes.aboutToBeDeleted();
        this.__moveList.aboutToBeDeleted();
        this.__filteredMoves.aboutToBeDeleted();
        this.__customMoves.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __searchText: ObservedPropertySimplePU<string>;
    get searchText() {
        return this.__searchText.get();
    }
    set searchText(newValue: string) {
        this.__searchText.set(newValue);
    }
    private __selectedType: ObservedPropertySimplePU<string>;
    get selectedType() {
        return this.__selectedType.get();
    }
    set selectedType(newValue: string) {
        this.__selectedType.set(newValue);
    }
    private __selectedMastery: ObservedPropertySimplePU<string>;
    get selectedMastery() {
        return this.__selectedMastery.get();
    }
    set selectedMastery(newValue: string) {
        this.__selectedMastery.set(newValue);
    }
    private __showAddDialog: ObservedPropertySimplePU<boolean>;
    get showAddDialog() {
        return this.__showAddDialog.get();
    }
    set showAddDialog(newValue: boolean) {
        this.__showAddDialog.set(newValue);
    }
    private __customMoveName: ObservedPropertySimplePU<string>;
    get customMoveName() {
        return this.__customMoveName.get();
    }
    set customMoveName(newValue: string) {
        this.__customMoveName.set(newValue);
    }
    private __customMoveNotes: ObservedPropertySimplePU<string>;
    get customMoveNotes() {
        return this.__customMoveNotes.get();
    }
    set customMoveNotes(newValue: string) {
        this.__customMoveNotes.set(newValue);
    }
    private __moveList: ObservedPropertyObjectPU<MoveDetail[]>;
    get moveList() {
        return this.__moveList.get();
    }
    set moveList(newValue: MoveDetail[]) {
        this.__moveList.set(newValue);
    }
    private __filteredMoves: ObservedPropertyObjectPU<MoveDetail[]>;
    get filteredMoves() {
        return this.__filteredMoves.get();
    }
    set filteredMoves(newValue: MoveDetail[]) {
        this.__filteredMoves.set(newValue);
    }
    // 自定义动作列表
    private __customMoves: ObservedPropertyObjectPU<CustomMove[]>;
    get customMoves() {
        return this.__customMoves.get();
    }
    set customMoves(newValue: CustomMove[]) {
        this.__customMoves.set(newValue);
    }
    private dataStore: DataStore;
    // 动作类型筛选
    private typeFilters: TypeFilter[];
    // 掌握度筛选
    private masteryFilters: MasteryFilter[];
    aboutToAppear() {
        this.loadMoves();
    }
    loadMoves() {
        this.moveList = this.dataStore.getMoveList();
        this.applyFilters();
    }
    applyFilters() {
        let filtered = this.moveList;
        // 类型筛选
        if (this.selectedType !== 'all') {
            filtered = filtered.filter(m => m.type === this.selectedType);
        }
        // 掌握度筛选
        if (this.selectedMastery !== 'all') {
            filtered = filtered.filter(m => m.level === this.selectedMastery);
        }
        // 搜索筛选
        if (this.searchText) {
            filtered = filtered.filter(m => m.name.includes(this.searchText) ||
                m.abbr.includes(this.searchText));
        }
        this.filteredMoves = filtered;
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
            // 顶部搜索栏
            Row.create();
            // 顶部搜索栏
            Row.width('100%');
            // 顶部搜索栏
            Row.padding({ left: 20, right: 20, top: 20, bottom: 10 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            TextInput.create({ placeholder: '搜索动作...', text: this.searchText });
            TextInput.fontSize(14);
            TextInput.backgroundColor('rgba(255, 255, 255, 0.9)');
            TextInput.borderRadius(20);
            TextInput.height(40);
            TextInput.layoutWeight(1);
            TextInput.onChange((value: string) => {
                this.searchText = value;
                this.applyFilters();
            });
        }, TextInput);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('+');
            Button.fontSize(20);
            Button.fontColor('#FFFFFF');
            Button.backgroundColor('rgba(255, 255, 255, 0.3)');
            Button.borderRadius(20);
            Button.width(40);
            Button.height(40);
            Button.margin({ left: 10 });
            Button.onClick(() => {
                this.showAddDialog = true;
            });
        }, Button);
        Button.pop();
        // 顶部搜索栏
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 筛选栏
            Column.create();
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 类型筛选
            Scroll.create();
            // 类型筛选
            Scroll.scrollable(ScrollDirection.Horizontal);
            // 类型筛选
            Scroll.scrollBar(BarState.Off);
            // 类型筛选
            Scroll.width('100%');
            // 类型筛选
            Scroll.padding({ left: 20, right: 20 });
        }, Scroll);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const filter = _item;
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create(filter.name);
                    Text.fontSize(14);
                    Text.fontColor(this.selectedType === filter.id ? '#FFFFFF' : 'rgba(255, 255, 255, 0.7)');
                    Text.backgroundColor(this.selectedType === filter.id ? 'rgba(255, 255, 255, 0.3)' : 'transparent');
                    Text.borderRadius(15);
                    Text.padding({ left: 15, right: 15, top: 8, bottom: 8 });
                    Text.margin({ right: 10 });
                    Text.onClick(() => {
                        this.selectedType = filter.id;
                        this.applyFilters();
                    });
                }, Text);
                Text.pop();
            };
            this.forEachUpdateFunction(elmtId, this.typeFilters, forEachItemGenFunction);
        }, ForEach);
        ForEach.pop();
        Row.pop();
        // 类型筛选
        Scroll.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 掌握度筛选
            Scroll.create();
            // 掌握度筛选
            Scroll.scrollable(ScrollDirection.Horizontal);
            // 掌握度筛选
            Scroll.scrollBar(BarState.Off);
            // 掌握度筛选
            Scroll.width('100%');
            // 掌握度筛选
            Scroll.padding({ left: 20, right: 20, top: 10 });
        }, Scroll);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const filter = _item;
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create(filter.name);
                    Text.fontSize(14);
                    Text.fontColor(this.selectedMastery === filter.id ? '#FFFFFF' : 'rgba(255, 255, 255, 0.7)');
                    Text.backgroundColor(this.selectedMastery === filter.id ? 'rgba(255, 255, 255, 0.3)' : 'transparent');
                    Text.borderRadius(15);
                    Text.padding({ left: 15, right: 15, top: 8, bottom: 8 });
                    Text.margin({ right: 10 });
                    Text.onClick(() => {
                        this.selectedMastery = filter.id;
                        this.applyFilters();
                    });
                }, Text);
                Text.pop();
            };
            this.forEachUpdateFunction(elmtId, this.masteryFilters, forEachItemGenFunction);
        }, ForEach);
        ForEach.pop();
        Row.pop();
        // 掌握度筛选
        Scroll.pop();
        // 筛选栏
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 动作列表
            List.create();
            // 动作列表
            List.width('100%');
            // 动作列表
            List.layoutWeight(1);
            // 动作列表
            List.padding({ left: 20, right: 20, top: 15 });
            // 动作列表
            List.scrollBar(BarState.Off);
        }, List);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const move = _item;
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
                        ListItem.margin({ bottom: 15 });
                    };
                    const deepRenderFunction = (elmtId, isInitialRender) => {
                        itemCreation(elmtId, isInitialRender);
                        this.MoveCard.bind(this)(move);
                        ListItem.pop();
                    };
                    this.observeComponentCreation2(itemCreation2, ListItem);
                    ListItem.pop();
                }
            };
            this.forEachUpdateFunction(elmtId, this.filteredMoves, forEachItemGenFunction);
        }, ForEach);
        ForEach.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 自定义动作
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const move = _item;
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
                        ListItem.margin({ bottom: 15 });
                    };
                    const deepRenderFunction = (elmtId, isInitialRender) => {
                        itemCreation(elmtId, isInitialRender);
                        this.CustomMoveCard.bind(this)(move);
                        ListItem.pop();
                    };
                    this.observeComponentCreation2(itemCreation2, ListItem);
                    ListItem.pop();
                }
            };
            this.forEachUpdateFunction(elmtId, this.customMoves, forEachItemGenFunction);
        }, ForEach);
        // 自定义动作
        ForEach.pop();
        // 动作列表
        List.pop();
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            // 添加自定义动作弹窗
            if (this.showAddDialog) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.buildAddCustomMove.bind(this)();
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
    MoveCard(move: MoveDetail, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.backgroundColor('#FFFFFF');
            Column.borderRadius(15);
            Column.shadow({ radius: 10, color: 'rgba(0, 0, 0, 0.1)', offsetX: 0, offsetY: 5 });
            Column.onClick(() => {
                // 跳转到动作详情页
                router.pushUrl({
                    url: 'pages/MoveDetailPage',
                    params: { abbr: move.abbr }
                });
            });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.padding(15);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.getMoveIcon(move.type));
            Text.fontSize(32);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.alignItems(HorizontalAlign.Start);
            Column.layoutWeight(1);
            Column.margin({ left: 15 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(move.name);
            Text.fontSize(16);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#333333');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.margin({ top: 5 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(move.abbr);
            Text.fontSize(14);
            Text.fontColor('#666666');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (move.practiceCount > 0) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(` · 已练习${move.practiceCount}次`);
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
        Row.pop();
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 掌握度标签
            Text.create(move.level + '级');
            // 掌握度标签
            Text.fontSize(12);
            // 掌握度标签
            Text.fontColor('#FFFFFF');
            // 掌握度标签
            Text.backgroundColor(this.getMasteryColor(move.level));
            // 掌握度标签
            Text.borderRadius(10);
            // 掌握度标签
            Text.padding({ left: 10, right: 10, top: 5, bottom: 5 });
        }, Text);
        // 掌握度标签
        Text.pop();
        Row.pop();
        Column.pop();
    }
    CustomMoveCard(move: CustomMove, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.backgroundColor('#FFFFFF');
            Column.borderRadius(15);
            Column.shadow({ radius: 10, color: 'rgba(0, 0, 0, 0.1)', offsetX: 0, offsetY: 5 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.padding(15);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('✨');
            Text.fontSize(32);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.alignItems(HorizontalAlign.Start);
            Column.layoutWeight(1);
            Column.margin({ left: 15 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(move.name);
            Text.fontSize(16);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#333333');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('自定义动作');
            Text.fontSize(14);
            Text.fontColor('#FF6B6B');
            Text.margin({ top: 5 });
        }, Text);
        Text.pop();
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('自定义');
            Text.fontSize(12);
            Text.fontColor('#FFFFFF');
            Text.backgroundColor('#FF6B6B');
            Text.borderRadius(10);
            Text.padding({ left: 10, right: 10, top: 5, bottom: 5 });
        }, Text);
        Text.pop();
        Row.pop();
        Column.pop();
    }
    buildAddCustomMove(parent = null) {
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
            Text.create('✨ 添加自定义动作');
            Text.fontSize(18);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#333333');
            Text.margin({ bottom: 20 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            TextInput.create({ placeholder: '动作名称', text: this.customMoveName });
            TextInput.fontSize(14);
            TextInput.backgroundColor('#F0F0F0');
            TextInput.borderRadius(10);
            TextInput.height(45);
            TextInput.width('100%');
            TextInput.margin({ bottom: 15 });
            TextInput.onChange((value: string) => {
                this.customMoveName = value;
            });
        }, TextInput);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            TextArea.create({ placeholder: '添加文字笔记（如：落冰时重心靠前一点）...', text: this.customMoveNotes });
            TextArea.fontSize(14);
            TextArea.backgroundColor('#F0F0F0');
            TextArea.borderRadius(10);
            TextArea.height(100);
            TextArea.width('100%');
            TextArea.margin({ bottom: 15 });
            TextArea.onChange((value: string) => {
                this.customMoveNotes = value;
            });
        }, TextArea);
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
                this.showAddDialog = false;
                this.customMoveName = '';
                this.customMoveNotes = '';
            });
        }, Button);
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('添加');
            Button.fontSize(16);
            Button.fontColor('#FFFFFF');
            Button.backgroundColor('#4CAF50');
            Button.borderRadius(20);
            Button.width(100);
            Button.margin({ left: 20 });
            Button.onClick(() => {
                if (this.customMoveName) {
                    this.customMoves.push({
                        name: this.customMoveName,
                        notes: this.customMoveNotes,
                        createDate: new Date().toLocaleDateString()
                    });
                    this.showAddDialog = false;
                    this.customMoveName = '';
                    this.customMoveNotes = '';
                }
            });
        }, Button);
        Button.pop();
        Row.pop();
        Column.pop();
        Column.pop();
    }
    private getMoveIcon(type: string): string {
        switch (type) {
            case 'jump': return '🦶';
            case 'spin': return '🌀';
            case 'step': return '👣';
            default: return '⛸️';
        }
    }
    private getMasteryColor(level: string): string {
        const colors: Record<string, string> = {
            'S': '#FF6B6B',
            'A': '#FFA500',
            'B': '#4CAF50',
            'C': '#2196F3',
            'D': '#9E9E9E'
        };
        return colors[level] || '#9E9E9E';
    }
    rerender() {
        this.updateDirtyElements();
    }
}
