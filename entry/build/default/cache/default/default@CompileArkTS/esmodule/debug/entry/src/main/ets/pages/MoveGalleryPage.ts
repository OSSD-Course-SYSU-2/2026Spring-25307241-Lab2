if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface MoveGalleryPage_Params {
    searchText?: string;
    selectedType?: MoveType;
    selectedDifficulty?: Difficulty | 'ALL';
    moves?: Move[];
    showDetail?: boolean;
    selectedMove?: Move | null;
    moveTypes?: MoveTypeItem[];
    difficultyLevels?: DifficultyLevelItem[];
}
import { IceNavBar } from "@bundle:com.example.simplecalculator/entry/ets/common/components/IceNavBar";
import { IceTag } from "@bundle:com.example.simplecalculator/entry/ets/common/components/IceTag";
import { SAMPLE_MOVES } from "@bundle:com.example.simplecalculator/entry/ets/viewmodel/SampleData";
import type { MoveType, Difficulty } from '../viewmodel/IceTraceModel';
// 动作类型项接口
interface MoveTypeItem {
    type: MoveType;
    label: string;
    icon: string;
}
// 难度等级项接口
interface DifficultyLevelItem {
    value: Difficulty | 'ALL';
    label: string;
}
class MoveGalleryPage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__searchText = new ObservedPropertySimplePU('', this, "searchText");
        this.__selectedType = new ObservedPropertySimplePU('JUMP', this, "selectedType");
        this.__selectedDifficulty = new ObservedPropertySimplePU('ALL', this, "selectedDifficulty");
        this.__moves = new ObservedPropertyObjectPU([], this, "moves");
        this.__showDetail = new ObservedPropertySimplePU(false, this, "showDetail");
        this.__selectedMove = new ObservedPropertyObjectPU(null, this, "selectedMove");
        this.moveTypes = [
            { type: 'JUMP', label: '跳跃', icon: '🦘' },
            { type: 'SPIN', label: '旋转', icon: '🌀' },
            { type: 'STEP_SEQUENCE', label: '步法', icon: '👣' },
            { type: 'LIFT', label: '托举', icon: '💪' },
            { type: 'SPIRAL', label: '螺旋线', icon: '〰️' }
        ];
        this.difficultyLevels = [
            { value: 'ALL', label: '全部' },
            { value: 'BEGINNER', label: '入门' },
            { value: 'INTERMEDIATE', label: '进阶' },
            { value: 'ADVANCED', label: '高级' }
        ];
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: MoveGalleryPage_Params) {
        if (params.searchText !== undefined) {
            this.searchText = params.searchText;
        }
        if (params.selectedType !== undefined) {
            this.selectedType = params.selectedType;
        }
        if (params.selectedDifficulty !== undefined) {
            this.selectedDifficulty = params.selectedDifficulty;
        }
        if (params.moves !== undefined) {
            this.moves = params.moves;
        }
        if (params.showDetail !== undefined) {
            this.showDetail = params.showDetail;
        }
        if (params.selectedMove !== undefined) {
            this.selectedMove = params.selectedMove;
        }
        if (params.moveTypes !== undefined) {
            this.moveTypes = params.moveTypes;
        }
        if (params.difficultyLevels !== undefined) {
            this.difficultyLevels = params.difficultyLevels;
        }
    }
    updateStateVars(params: MoveGalleryPage_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__searchText.purgeDependencyOnElmtId(rmElmtId);
        this.__selectedType.purgeDependencyOnElmtId(rmElmtId);
        this.__selectedDifficulty.purgeDependencyOnElmtId(rmElmtId);
        this.__moves.purgeDependencyOnElmtId(rmElmtId);
        this.__showDetail.purgeDependencyOnElmtId(rmElmtId);
        this.__selectedMove.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__searchText.aboutToBeDeleted();
        this.__selectedType.aboutToBeDeleted();
        this.__selectedDifficulty.aboutToBeDeleted();
        this.__moves.aboutToBeDeleted();
        this.__showDetail.aboutToBeDeleted();
        this.__selectedMove.aboutToBeDeleted();
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
    private __selectedType: ObservedPropertySimplePU<MoveType>;
    get selectedType() {
        return this.__selectedType.get();
    }
    set selectedType(newValue: MoveType) {
        this.__selectedType.set(newValue);
    }
    private __selectedDifficulty: ObservedPropertySimplePU<Difficulty | 'ALL'>;
    get selectedDifficulty() {
        return this.__selectedDifficulty.get();
    }
    set selectedDifficulty(newValue: Difficulty | 'ALL') {
        this.__selectedDifficulty.set(newValue);
    }
    private __moves: ObservedPropertyObjectPU<Move[]>;
    get moves() {
        return this.__moves.get();
    }
    set moves(newValue: Move[]) {
        this.__moves.set(newValue);
    }
    private __showDetail: ObservedPropertySimplePU<boolean>;
    get showDetail() {
        return this.__showDetail.get();
    }
    set showDetail(newValue: boolean) {
        this.__showDetail.set(newValue);
    }
    private __selectedMove: ObservedPropertyObjectPU<Move | null>;
    get selectedMove() {
        return this.__selectedMove.get();
    }
    set selectedMove(newValue: Move | null) {
        this.__selectedMove.set(newValue);
    }
    // 动作类型标签
    private moveTypes: MoveTypeItem[];
    // 难度等级
    private difficultyLevels: DifficultyLevelItem[];
    aboutToAppear() {
        this.loadMoves();
    }
    loadMoves() {
        let filtered = SAMPLE_MOVES.filter(move => {
            // 类型筛选
            if (move.type !== this.selectedType) {
                return false;
            }
            // 难度筛选
            if (this.selectedDifficulty !== 'ALL') {
                const difficultyMap: Record<number, Difficulty> = {
                    1: 'BEGINNER',
                    2: 'BEGINNER',
                    3: 'INTERMEDIATE',
                    4: 'ADVANCED',
                    5: 'ADVANCED'
                };
                if (difficultyMap[move.difficulty] !== this.selectedDifficulty) {
                    return false;
                }
            }
            // 搜索筛选
            if (this.searchText) {
                const keyword = this.searchText.toLowerCase();
                return move.name.toLowerCase().includes(keyword) ||
                    move.nameEn.toLowerCase().includes(keyword) ||
                    move.abbreviation.toLowerCase().includes(keyword);
            }
            return true;
        });
        // 按难度排序
        filtered.sort((a, b) => a.difficulty - b.difficulty);
        this.moves = filtered;
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.height('100%');
            Column.backgroundColor('#F5F5F5');
        }, Column);
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new 
                    // 导航栏
                    IceNavBar(this, {
                        title: '动作图鉴',
                        showBack: true,
                        navBackgroundColor: '#4FC3F7'
                    }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/MoveGalleryPage.ets", line: 98, col: 7 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            title: '动作图鉴',
                            showBack: true,
                            navBackgroundColor: '#4FC3F7'
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        title: '动作图鉴',
                        showBack: true,
                        navBackgroundColor: '#4FC3F7'
                    });
                }
            }, { name: "IceNavBar" });
        }
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 内容区
            Column.create();
            // 内容区
            Column.layoutWeight(1);
        }, Column);
        // 搜索栏
        this.buildSearchBar.bind(this)();
        // 动作类型选择
        this.buildTypeSelector.bind(this)();
        // 难度筛选
        this.buildDifficultyFilter.bind(this)();
        // 动作网格
        this.buildMoveGrid.bind(this)();
        // 内容区
        Column.pop();
        Column.pop();
    }
    buildSearchBar(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.padding({ left: 16, right: 16, top: 12, bottom: 12 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            TextInput.create({ placeholder: '搜索动作名称、缩写...', text: this.searchText });
            TextInput.layoutWeight(1);
            TextInput.height(40);
            TextInput.backgroundColor('#FFFFFF');
            TextInput.borderRadius(20);
            TextInput.padding({ left: 16, right: 16 });
            TextInput.onChange((value: string) => {
                this.searchText = value;
                this.loadMoves();
            });
        }, TextInput);
        Row.pop();
    }
    buildTypeSelector(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Scroll.create();
            Scroll.width('100%');
            Scroll.height(80);
            Scroll.scrollable(ScrollDirection.Horizontal);
            Scroll.scrollBar(BarState.Off);
        }, Scroll);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.padding({ left: 16, right: 16 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const item = _item;
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Column.create();
                    Column.width(60);
                    Column.height(70);
                    Column.backgroundColor(this.selectedType === item.type ? '#E3F2FD' : '#FFFFFF');
                    Column.borderRadius(8);
                    Column.justifyContent(FlexAlign.Center);
                    Column.onClick(() => {
                        this.selectedType = item.type;
                        this.loadMoves();
                    });
                    Column.margin({ right: 8 });
                }, Column);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create(item.icon);
                    Text.fontSize(24);
                }, Text);
                Text.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create(item.label);
                    Text.fontSize(12);
                    Text.fontColor(this.selectedType === item.type ? '#1976D2' : '#666666');
                    Text.margin({ top: 4 });
                }, Text);
                Text.pop();
                Column.pop();
            };
            this.forEachUpdateFunction(elmtId, this.moveTypes, forEachItemGenFunction, (item: MoveTypeItem) => item.type, false, false);
        }, ForEach);
        ForEach.pop();
        Row.pop();
        Scroll.pop();
    }
    buildDifficultyFilter(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.padding({ left: 16, right: 16, top: 8, bottom: 8 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const item = _item;
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Button.createWithLabel(item.label);
                    Button.fontSize(12);
                    Button.height(32);
                    Button.padding({ left: 12, right: 12 });
                    Button.backgroundColor(this.selectedDifficulty === item.value ? '#4FC3F7' : '#FFFFFF');
                    Button.fontColor(this.selectedDifficulty === item.value ? '#FFFFFF' : '#666666');
                    Button.borderRadius(16);
                    Button.margin({ right: 8 });
                    Button.onClick(() => {
                        this.selectedDifficulty = item.value;
                        this.loadMoves();
                    });
                }, Button);
                Button.pop();
            };
            this.forEachUpdateFunction(elmtId, this.difficultyLevels, forEachItemGenFunction, (item: DifficultyLevelItem) => item.value, false, false);
        }, ForEach);
        ForEach.pop();
        Row.pop();
    }
    buildMoveGrid(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.moves.length === 0) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Column.create();
                        Column.width('100%');
                        Column.layoutWeight(1);
                        Column.justifyContent(FlexAlign.Center);
                    }, Column);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('📭');
                        Text.fontSize(64);
                        Text.margin({ bottom: 16 });
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('暂无动作数据');
                        Text.fontSize(16);
                        Text.fontColor('#666666');
                    }, Text);
                    Text.pop();
                    Column.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Grid.create();
                        Grid.width('100%');
                        Grid.layoutWeight(1);
                        Grid.padding({ left: 16, right: 16, top: 8, bottom: 8 });
                        Grid.columnsTemplate('1fr 1fr');
                        Grid.rowsGap(12);
                        Grid.columnsGap(12);
                    }, Grid);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        ForEach.create();
                        const forEachItemGenFunction = _item => {
                            const move = _item;
                            {
                                const itemCreation2 = (elmtId, isInitialRender) => {
                                    GridItem.create(() => { }, false);
                                };
                                const observedDeepRender = () => {
                                    this.observeComponentCreation2(itemCreation2, GridItem);
                                    this.MoveCard.bind(this)(move);
                                    GridItem.pop();
                                };
                                observedDeepRender();
                            }
                        };
                        this.forEachUpdateFunction(elmtId, this.moves, forEachItemGenFunction, (move: Move) => move.id, false, false);
                    }, ForEach);
                    ForEach.pop();
                    Grid.pop();
                });
            }
        }, If);
        If.pop();
    }
    MoveCard(move: Move, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.backgroundColor('#FFFFFF');
            Column.borderRadius(12);
            Column.onClick(() => {
                this.selectedMove = move;
                this.showDetail = true;
            });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 动作图示
            Column.create();
            // 动作图示
            Column.width('100%');
            // 动作图示
            Column.height(100);
            // 动作图示
            Column.backgroundColor('#F5F5F5');
            // 动作图示
            Column.justifyContent(FlexAlign.Center);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('⛸️');
            Text.fontSize(48);
        }, Text);
        Text.pop();
        // 动作图示
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 动作信息
            Column.create();
            // 动作信息
            Column.width('100%');
            // 动作信息
            Column.padding(8);
            // 动作信息
            Column.alignItems(HorizontalAlign.Start);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(move.abbreviation);
            Text.fontSize(18);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#333333');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (move.isBeginner) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        __Common__.create();
                        __Common__.margin({ left: 8 });
                    }, __Common__);
                    {
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            if (isInitialRender) {
                                let componentCall = new IceTag(this, { text: '入门', type: 'success', tagSize: 'small' }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/MoveGalleryPage.ets", line: 253, col: 13 });
                                ViewPU.create(componentCall);
                                let paramsLambda = () => {
                                    return {
                                        text: '入门',
                                        type: 'success',
                                        tagSize: 'small'
                                    };
                                };
                                componentCall.paramsGenerator_ = paramsLambda;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(elmtId, {
                                    text: '入门', type: 'success', tagSize: 'small'
                                });
                            }
                        }, { name: "IceTag" });
                    }
                    __Common__.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(move.name);
            Text.fontSize(12);
            Text.fontColor('#666666');
            Text.margin({ top: 4 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.margin({ top: 4 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('基础分: ' + move.baseValue.toFixed(2));
            Text.fontSize(12);
            Text.fontColor('#1976D2');
            Text.fontWeight(FontWeight.Bold);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('难度: ' + move.difficulty);
            Text.fontSize(12);
            Text.fontColor('#999999');
            Text.margin({ left: 8 });
        }, Text);
        Text.pop();
        Row.pop();
        // 动作信息
        Column.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "MoveGalleryPage";
    }
}
// 简化的动作类型
interface Move {
    id: string;
    name: string;
    nameEn: string;
    abbreviation: string;
    type: MoveType;
    difficulty: number;
    baseValue: number;
    description: string;
    keyPoints: string[];
    commonErrors: string[];
    imageUrl: string;
    isBeginner: boolean;
}
registerNamedRoute(() => new MoveGalleryPage(undefined, {}), "", { bundleName: "com.example.simplecalculator", moduleName: "entry", pagePath: "pages/MoveGalleryPage", pageFullPath: "entry/src/main/ets/pages/MoveGalleryPage", integratedHsp: "false", moduleType: "followWithHap" });
