if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface HomePage_Params {
    selectedCategory?: string;
    selectedElement?: string;
    selectedGOE?: number;
    currentElement?: TechnicalElement | null;
    elementList?: TechnicalElement[];
    totalScore?: number;
    jumps?: string[];
    spins?: string[];
    steps?: string[];
}
import router from "@ohos:router";
import { GOE_RANGE, getAllJumps, getAllSpins, getAllSteps, createTechnicalElement, getElementChineseName } from "@bundle:com.example.simplecalculator/entry/ets/viewmodel/TechnicalElementModel";
import type { TechnicalElement } from "@bundle:com.example.simplecalculator/entry/ets/viewmodel/TechnicalElementModel";
class HomePage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__selectedCategory = new ObservedPropertySimplePU('jump', this, "selectedCategory");
        this.__selectedElement = new ObservedPropertySimplePU('', this, "selectedElement");
        this.__selectedGOE = new ObservedPropertySimplePU(0, this, "selectedGOE");
        this.__currentElement = new ObservedPropertyObjectPU(null, this, "currentElement");
        this.__elementList = new ObservedPropertyObjectPU([], this, "elementList");
        this.__totalScore = new ObservedPropertySimplePU(0, this, "totalScore");
        this.jumps = getAllJumps();
        this.spins = getAllSpins();
        this.steps = getAllSteps();
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: HomePage_Params) {
        if (params.selectedCategory !== undefined) {
            this.selectedCategory = params.selectedCategory;
        }
        if (params.selectedElement !== undefined) {
            this.selectedElement = params.selectedElement;
        }
        if (params.selectedGOE !== undefined) {
            this.selectedGOE = params.selectedGOE;
        }
        if (params.currentElement !== undefined) {
            this.currentElement = params.currentElement;
        }
        if (params.elementList !== undefined) {
            this.elementList = params.elementList;
        }
        if (params.totalScore !== undefined) {
            this.totalScore = params.totalScore;
        }
        if (params.jumps !== undefined) {
            this.jumps = params.jumps;
        }
        if (params.spins !== undefined) {
            this.spins = params.spins;
        }
        if (params.steps !== undefined) {
            this.steps = params.steps;
        }
    }
    updateStateVars(params: HomePage_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__selectedCategory.purgeDependencyOnElmtId(rmElmtId);
        this.__selectedElement.purgeDependencyOnElmtId(rmElmtId);
        this.__selectedGOE.purgeDependencyOnElmtId(rmElmtId);
        this.__currentElement.purgeDependencyOnElmtId(rmElmtId);
        this.__elementList.purgeDependencyOnElmtId(rmElmtId);
        this.__totalScore.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__selectedCategory.aboutToBeDeleted();
        this.__selectedElement.aboutToBeDeleted();
        this.__selectedGOE.aboutToBeDeleted();
        this.__currentElement.aboutToBeDeleted();
        this.__elementList.aboutToBeDeleted();
        this.__totalScore.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __selectedCategory: ObservedPropertySimplePU<string>; // jump, spin, step
    get selectedCategory() {
        return this.__selectedCategory.get();
    }
    set selectedCategory(newValue: string) {
        this.__selectedCategory.set(newValue);
    }
    private __selectedElement: ObservedPropertySimplePU<string>;
    get selectedElement() {
        return this.__selectedElement.get();
    }
    set selectedElement(newValue: string) {
        this.__selectedElement.set(newValue);
    }
    private __selectedGOE: ObservedPropertySimplePU<number>;
    get selectedGOE() {
        return this.__selectedGOE.get();
    }
    set selectedGOE(newValue: number) {
        this.__selectedGOE.set(newValue);
    }
    private __currentElement: ObservedPropertyObjectPU<TechnicalElement | null>;
    get currentElement() {
        return this.__currentElement.get();
    }
    set currentElement(newValue: TechnicalElement | null) {
        this.__currentElement.set(newValue);
    }
    private __elementList: ObservedPropertyObjectPU<TechnicalElement[]>;
    get elementList() {
        return this.__elementList.get();
    }
    set elementList(newValue: TechnicalElement[]) {
        this.__elementList.set(newValue);
    }
    private __totalScore: ObservedPropertySimplePU<number>;
    get totalScore() {
        return this.__totalScore.get();
    }
    set totalScore(newValue: number) {
        this.__totalScore.set(newValue);
    }
    private jumps: string[];
    private spins: string[];
    private steps: string[];
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
            // 顶部导航栏
            Row.create();
            // 顶部导航栏
            Row.width('100%');
            // 顶部导航栏
            Row.height(80);
            // 顶部导航栏
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
            Text.create('⛸️ 技术元素计算器');
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
        // 顶部导航栏
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
        // 分类选择
        this.buildCategorySelector.bind(this)();
        // 元素选择
        this.buildElementSelector.bind(this)();
        // GOE选择
        this.buildGOESelector.bind(this)();
        // 当前元素信息
        this.buildCurrentElementInfo.bind(this)();
        // 添加按钮
        this.buildAddButton.bind(this)();
        // 已添加元素列表
        this.buildElementList.bind(this)();
        // 总分显示
        this.buildTotalScore.bind(this)();
        Column.pop();
        Scroll.pop();
        Column.pop();
    }
    // 分类选择器
    buildCategorySelector(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.margin({ bottom: 25 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('选择元素类型');
            Text.fontSize(16);
            Text.fontColor(Color.White);
            Text.fontWeight(FontWeight.Bold);
            Text.margin({ bottom: 15 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.justifyContent(FlexAlign.SpaceEvenly);
        }, Row);
        this.buildCategoryButton.bind(this)('跳跃', 'jump', '🦘');
        this.buildCategoryButton.bind(this)('旋转', 'spin', '🔄');
        this.buildCategoryButton.bind(this)('步法', 'step', '👟');
        Row.pop();
        Column.pop();
    }
    buildCategoryButton(name: string, category: string, icon: string, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width(80);
            Column.height(80);
            Column.backgroundColor(this.selectedCategory === category ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.1)');
            Column.borderRadius(15);
            Column.justifyContent(FlexAlign.Center);
            Column.onClick(() => {
                this.selectedCategory = category;
                this.selectedElement = '';
                this.currentElement = null;
            });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(icon);
            Text.fontSize(30);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(name);
            Text.fontSize(14);
            Text.fontColor(Color.White);
            Text.margin({ top: 5 });
        }, Text);
        Text.pop();
        Column.pop();
    }
    // 元素选择器
    buildElementSelector(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.margin({ bottom: 25 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('选择技术元素');
            Text.fontSize(16);
            Text.fontColor(Color.White);
            Text.fontWeight(FontWeight.Bold);
            Text.margin({ bottom: 15 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Grid.create();
            Grid.columnsTemplate('1fr 1fr 1fr');
            Grid.rowsGap(10);
            Grid.columnsGap(10);
            Grid.width('100%');
            Grid.height(300);
        }, Grid);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const element = _item;
                {
                    const itemCreation2 = (elmtId, isInitialRender) => {
                        GridItem.create(() => { }, false);
                    };
                    const observedDeepRender = () => {
                        this.observeComponentCreation2(itemCreation2, GridItem);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Column.create();
                            Column.width('100%');
                            Column.height(60);
                            Column.backgroundColor(this.selectedElement === element ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.1)');
                            Column.borderRadius(10);
                            Column.justifyContent(FlexAlign.Center);
                            Column.onClick(() => {
                                this.selectedElement = element;
                                this.currentElement = createTechnicalElement(element);
                                if (this.currentElement) {
                                    this.currentElement.goe = this.selectedGOE;
                                    this.currentElement.calculateFinalScore();
                                }
                            });
                        }, Column);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Text.create(element);
                            Text.fontSize(16);
                            Text.fontColor(Color.White);
                            Text.fontWeight(FontWeight.Medium);
                        }, Text);
                        Text.pop();
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Text.create(getElementChineseName(element));
                            Text.fontSize(12);
                            Text.fontColor('rgba(255,255,255,0.7)');
                            Text.margin({ top: 3 });
                        }, Text);
                        Text.pop();
                        Column.pop();
                        GridItem.pop();
                    };
                    observedDeepRender();
                }
            };
            this.forEachUpdateFunction(elmtId, this.getCurrentElements(), forEachItemGenFunction);
        }, ForEach);
        ForEach.pop();
        Grid.pop();
        Column.pop();
    }
    // GOE选择器
    buildGOESelector(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.margin({ bottom: 25 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('选择GOE评分');
            Text.fontSize(16);
            Text.fontColor(Color.White);
            Text.fontWeight(FontWeight.Bold);
            Text.margin({ bottom: 15 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.justifyContent(FlexAlign.SpaceBetween);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const goe = _item;
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Column.create();
                    Column.width(30);
                    Column.height(40);
                    Column.backgroundColor(this.selectedGOE === goe ? this.getGOEColor(goe) : 'rgba(255,255,255,0.1)');
                    Column.borderRadius(8);
                    Column.justifyContent(FlexAlign.Center);
                    Column.onClick(() => {
                        this.selectedGOE = goe;
                        if (this.currentElement) {
                            this.currentElement.goe = goe;
                            this.currentElement.calculateFinalScore();
                        }
                    });
                }, Column);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create(goe > 0 ? `+${goe}` : `${goe}`);
                    Text.fontSize(18);
                    Text.fontColor(Color.White);
                    Text.fontWeight(FontWeight.Bold);
                }, Text);
                Text.pop();
                Column.pop();
            };
            this.forEachUpdateFunction(elmtId, GOE_RANGE, forEachItemGenFunction);
        }, ForEach);
        ForEach.pop();
        Row.pop();
        Column.pop();
    }
    // 当前元素信息
    buildCurrentElementInfo(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.currentElement) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Column.create();
                        Column.width('100%');
                        Column.padding(20);
                        Column.backgroundColor('rgba(255,255,255,0.15)');
                        Column.borderRadius(15);
                        Column.margin({ bottom: 20 });
                    }, Column);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('当前元素得分');
                        Text.fontSize(16);
                        Text.fontColor(Color.White);
                        Text.fontWeight(FontWeight.Bold);
                        Text.margin({ bottom: 15 });
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
                        Text.create('元素');
                        Text.fontSize(14);
                        Text.fontColor('rgba(255,255,255,0.7)');
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(this.currentElement.name);
                        Text.fontSize(20);
                        Text.fontColor(Color.White);
                        Text.fontWeight(FontWeight.Bold);
                        Text.margin({ top: 5 });
                    }, Text);
                    Text.pop();
                    Column.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Column.create();
                        Column.layoutWeight(1);
                    }, Column);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('基础分');
                        Text.fontSize(14);
                        Text.fontColor('rgba(255,255,255,0.7)');
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(this.currentElement.baseValue.toFixed(2));
                        Text.fontSize(20);
                        Text.fontColor(Color.White);
                        Text.fontWeight(FontWeight.Bold);
                        Text.margin({ top: 5 });
                    }, Text);
                    Text.pop();
                    Column.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Column.create();
                        Column.layoutWeight(1);
                    }, Column);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('GOE');
                        Text.fontSize(14);
                        Text.fontColor('rgba(255,255,255,0.7)');
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(this.selectedGOE > 0 ? `+${this.selectedGOE}` : `${this.selectedGOE}`);
                        Text.fontSize(20);
                        Text.fontColor(this.getGOEColor(this.selectedGOE));
                        Text.fontWeight(FontWeight.Bold);
                        Text.margin({ top: 5 });
                    }, Text);
                    Text.pop();
                    Column.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Column.create();
                        Column.layoutWeight(1);
                    }, Column);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('最终得分');
                        Text.fontSize(14);
                        Text.fontColor('rgba(255,255,255,0.7)');
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(this.currentElement.finalScore.toFixed(2));
                        Text.fontSize(20);
                        Text.fontColor('#FFD700');
                        Text.fontWeight(FontWeight.Bold);
                        Text.margin({ top: 5 });
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
    }
    // 添加按钮
    buildAddButton(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.currentElement) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Button.createWithLabel('添加元素');
                        Button.width('100%');
                        Button.height(50);
                        Button.backgroundColor('#4CAF50');
                        Button.borderRadius(25);
                        Button.fontSize(18);
                        Button.fontColor(Color.White);
                        Button.fontWeight(FontWeight.Bold);
                        Button.onClick(() => {
                            if (this.currentElement) {
                                this.elementList.push(ObservedObject.GetRawObject(this.currentElement));
                                this.calculateTotalScore();
                                // 重置选择
                                this.selectedElement = '';
                                this.currentElement = null;
                                this.selectedGOE = 0;
                            }
                        });
                        Button.margin({ bottom: 25 });
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
    }
    // 已添加元素列表
    buildElementList(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.elementList.length > 0) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Column.create();
                        Column.width('100%');
                        Column.padding(20);
                        Column.backgroundColor('rgba(255,255,255,0.15)');
                        Column.borderRadius(15);
                        Column.margin({ bottom: 25 });
                    }, Column);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Row.create();
                        Row.width('100%');
                        Row.margin({ bottom: 15 });
                    }, Row);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('已添加元素');
                        Text.fontSize(16);
                        Text.fontColor(Color.White);
                        Text.fontWeight(FontWeight.Bold);
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Blank.create();
                    }, Blank);
                    Blank.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Button.createWithLabel('清空');
                        Button.height(30);
                        Button.backgroundColor('rgba(255,255,255,0.2)');
                        Button.borderRadius(15);
                        Button.fontSize(14);
                        Button.fontColor(Color.White);
                        Button.onClick(() => {
                            this.elementList = [];
                            this.totalScore = 0;
                        });
                    }, Button);
                    Button.pop();
                    Row.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        ForEach.create();
                        const forEachItemGenFunction = (_item, index: number) => {
                            const element = _item;
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Row.create();
                                Row.width('100%');
                                Row.padding(15);
                                Row.backgroundColor('rgba(255,255,255,0.1)');
                                Row.borderRadius(10);
                                Row.margin({ bottom: 10 });
                            }, Row);
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Text.create(element.name);
                                Text.fontSize(16);
                                Text.fontColor(Color.White);
                                Text.fontWeight(FontWeight.Medium);
                                Text.layoutWeight(1);
                            }, Text);
                            Text.pop();
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Text.create(`基础: ${element.baseValue.toFixed(2)}`);
                                Text.fontSize(14);
                                Text.fontColor('rgba(255,255,255,0.7)');
                                Text.margin({ right: 10 });
                            }, Text);
                            Text.pop();
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Text.create(`GOE: ${element.goe > 0 ? '+' : ''}${element.goe}`);
                                Text.fontSize(14);
                                Text.fontColor(this.getGOEColor(element.goe));
                                Text.margin({ right: 10 });
                            }, Text);
                            Text.pop();
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Text.create(`${element.finalScore.toFixed(2)}`);
                                Text.fontSize(16);
                                Text.fontColor('#FFD700');
                                Text.fontWeight(FontWeight.Bold);
                            }, Text);
                            Text.pop();
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Button.createWithLabel('×');
                                Button.width(30);
                                Button.height(30);
                                Button.backgroundColor('rgba(255,255,255,0.2)');
                                Button.borderRadius(15);
                                Button.fontSize(16);
                                Button.fontColor(Color.White);
                                Button.margin({ left: 10 });
                                Button.onClick(() => {
                                    this.elementList.splice(index, 1);
                                    this.calculateTotalScore();
                                });
                            }, Button);
                            Button.pop();
                            Row.pop();
                        };
                        this.forEachUpdateFunction(elmtId, this.elementList, forEachItemGenFunction, undefined, true, false);
                    }, ForEach);
                    ForEach.pop();
                    Column.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
    }
    // 总分显示
    buildTotalScore(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.padding(25);
            Column.backgroundColor('rgba(255,255,255,0.2)');
            Column.borderRadius(20);
            Column.shadow({ radius: 10, color: 'rgba(0,0,0,0.3)', offsetX: 0, offsetY: 5 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.justifyContent(FlexAlign.SpaceBetween);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('技术分总分');
            Text.fontSize(18);
            Text.fontColor(Color.White);
            Text.fontWeight(FontWeight.Bold);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.totalScore.toFixed(2));
            Text.fontSize(32);
            Text.fontColor('#FFD700');
            Text.fontWeight(FontWeight.Bold);
        }, Text);
        Text.pop();
        Row.pop();
        Column.pop();
    }
    // 获取当前分类的元素列表
    getCurrentElements(): string[] {
        switch (this.selectedCategory) {
            case 'jump':
                return this.jumps;
            case 'spin':
                return this.spins;
            case 'step':
                return this.steps;
            default:
                return this.jumps;
        }
    }
    // 获取GOE对应的颜色
    getGOEColor(goe: number): string {
        if (goe > 0) {
            return '#4CAF50'; // 绿色
        }
        else if (goe < 0) {
            return '#F44336'; // 红色
        }
        else {
            return '#FFFFFF'; // 白色
        }
    }
    // 计算总分
    calculateTotalScore(): void {
        this.totalScore = this.elementList.reduce((sum, element) => {
            return sum + element.finalScore;
        }, 0);
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "HomePage";
    }
}
registerNamedRoute(() => new HomePage(undefined, {}), "", { bundleName: "com.example.simplecalculator", moduleName: "entry", pagePath: "pages/HomePage", pageFullPath: "entry/src/main/ets/pages/HomePage", integratedHsp: "false", moduleType: "followWithHap" });
