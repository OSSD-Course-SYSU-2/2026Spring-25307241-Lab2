if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface ScoringSimulatorPage_Params {
    elements?: TechnicalElement[];
    selectedType?: string;
    selectedElement?: string;
    selectedGOE?: number;
    totalTES?: number;
    totalPCS?: number;
    programType?: string;
    jumps?: string[];
    spins?: string[];
    steps?: string[];
}
import { IceNavBar } from "@bundle:com.example.simplecalculator/entry/ets/common/components/IceNavBar";
import { createTechnicalElement, getAllJumps, getAllSpins, getAllSteps } from "@bundle:com.example.simplecalculator/entry/ets/viewmodel/TechnicalElementModel";
import type { TechnicalElement } from "@bundle:com.example.simplecalculator/entry/ets/viewmodel/TechnicalElementModel";
import { DeviceUtils } from "@bundle:com.example.simplecalculator/entry/ets/common/utils/DeviceUtils";
class ScoringSimulatorPage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__elements = new ObservedPropertyObjectPU([], this, "elements");
        this.__selectedType = new ObservedPropertySimplePU('jump', this, "selectedType");
        this.__selectedElement = new ObservedPropertySimplePU('', this, "selectedElement");
        this.__selectedGOE = new ObservedPropertySimplePU(0, this, "selectedGOE");
        this.__totalTES = new ObservedPropertySimplePU(0, this, "totalTES");
        this.__totalPCS = new ObservedPropertySimplePU(0, this, "totalPCS");
        this.__programType = new ObservedPropertySimplePU('SP', this, "programType");
        this.jumps = getAllJumps();
        this.spins = getAllSpins();
        this.steps = getAllSteps();
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: ScoringSimulatorPage_Params) {
        if (params.elements !== undefined) {
            this.elements = params.elements;
        }
        if (params.selectedType !== undefined) {
            this.selectedType = params.selectedType;
        }
        if (params.selectedElement !== undefined) {
            this.selectedElement = params.selectedElement;
        }
        if (params.selectedGOE !== undefined) {
            this.selectedGOE = params.selectedGOE;
        }
        if (params.totalTES !== undefined) {
            this.totalTES = params.totalTES;
        }
        if (params.totalPCS !== undefined) {
            this.totalPCS = params.totalPCS;
        }
        if (params.programType !== undefined) {
            this.programType = params.programType;
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
    updateStateVars(params: ScoringSimulatorPage_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__elements.purgeDependencyOnElmtId(rmElmtId);
        this.__selectedType.purgeDependencyOnElmtId(rmElmtId);
        this.__selectedElement.purgeDependencyOnElmtId(rmElmtId);
        this.__selectedGOE.purgeDependencyOnElmtId(rmElmtId);
        this.__totalTES.purgeDependencyOnElmtId(rmElmtId);
        this.__totalPCS.purgeDependencyOnElmtId(rmElmtId);
        this.__programType.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__elements.aboutToBeDeleted();
        this.__selectedType.aboutToBeDeleted();
        this.__selectedElement.aboutToBeDeleted();
        this.__selectedGOE.aboutToBeDeleted();
        this.__totalTES.aboutToBeDeleted();
        this.__totalPCS.aboutToBeDeleted();
        this.__programType.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __elements: ObservedPropertyObjectPU<TechnicalElement[]>;
    get elements() {
        return this.__elements.get();
    }
    set elements(newValue: TechnicalElement[]) {
        this.__elements.set(newValue);
    }
    private __selectedType: ObservedPropertySimplePU<string>;
    get selectedType() {
        return this.__selectedType.get();
    }
    set selectedType(newValue: string) {
        this.__selectedType.set(newValue);
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
    private __totalTES: ObservedPropertySimplePU<number>;
    get totalTES() {
        return this.__totalTES.get();
    }
    set totalTES(newValue: number) {
        this.__totalTES.set(newValue);
    }
    private __totalPCS: ObservedPropertySimplePU<number>;
    get totalPCS() {
        return this.__totalPCS.get();
    }
    set totalPCS(newValue: number) {
        this.__totalPCS.set(newValue);
    }
    private __programType: ObservedPropertySimplePU<string>; // SP, FS
    get programType() {
        return this.__programType.get();
    }
    set programType(newValue: string) {
        this.__programType.set(newValue);
    }
    private jumps: string[];
    private spins: string[];
    private steps: string[];
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
                        title: '计分模拟器',
                        showBack: true,
                        navBackgroundColor: '#4FC3F7'
                    }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/ScoringSimulatorPage.ets", line: 31, col: 7 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            title: '计分模拟器',
                            showBack: true,
                            navBackgroundColor: '#4FC3F7'
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        title: '计分模拟器',
                        showBack: true,
                        navBackgroundColor: '#4FC3F7'
                    });
                }
            }, { name: "IceNavBar" });
        }
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 内容区
            Scroll.create();
            // 内容区
            Scroll.layoutWeight(1);
            // 内容区
            Scroll.scrollBar(BarState.Auto);
        }, Scroll);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.padding(DeviceUtils.isWearable() ? 8 : 16);
        }, Column);
        // 节目类型选择
        this.buildProgramTypeSelector.bind(this)();
        // 动作添加区
        this.buildElementAdder.bind(this)();
        // 已添加动作列表
        this.buildElementList.bind(this)();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            // PCS输入区（手表端隐藏）
            if (!DeviceUtils.isWearable()) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.buildPCSInput.bind(this)();
                });
            }
            // 总分显示
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        // 总分显示
        this.buildTotalScore.bind(this)();
        Column.pop();
        // 内容区
        Scroll.pop();
        Column.pop();
    }
    // 节目类型选择
    buildProgramTypeSelector(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.margin({ bottom: DeviceUtils.isWearable() ? 10 : 20 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('短节目 (SP)');
            Button.layoutWeight(1);
            Button.height(DeviceUtils.isWearable() ? 32 : 40);
            Button.backgroundColor(this.programType === 'SP' ? '#4FC3F7' : '#FFFFFF');
            Button.fontColor(this.programType === 'SP' ? '#FFFFFF' : '#666666');
            Button.fontSize(DeviceUtils.isWearable() ? 12 : 14);
            Button.borderRadius(DeviceUtils.isWearable() ? 16 : 20);
            Button.onClick(() => {
                this.programType = 'SP';
            });
        }, Button);
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('自由滑 (FS)');
            Button.layoutWeight(1);
            Button.height(DeviceUtils.isWearable() ? 32 : 40);
            Button.backgroundColor(this.programType === 'FS' ? '#4FC3F7' : '#FFFFFF');
            Button.fontColor(this.programType === 'FS' ? '#FFFFFF' : '#666666');
            Button.fontSize(DeviceUtils.isWearable() ? 12 : 14);
            Button.borderRadius(DeviceUtils.isWearable() ? 16 : 20);
            Button.margin({ left: DeviceUtils.isWearable() ? 6 : 12 });
            Button.onClick(() => {
                this.programType = 'FS';
            });
        }, Button);
        Button.pop();
        Row.pop();
    }
    // 动作添加器
    buildElementAdder(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.padding(DeviceUtils.isWearable() ? 10 : 16);
            Column.backgroundColor('#FFFFFF');
            Column.borderRadius(DeviceUtils.isWearable() ? 8 : 12);
            Column.margin({ bottom: DeviceUtils.isWearable() ? 10 : 16 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('添加动作');
            Text.fontSize(DeviceUtils.isWearable() ? 14 : 16);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#333333');
            Text.margin({ bottom: DeviceUtils.isWearable() ? 8 : 12 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 类型选择
            Row.create();
            // 类型选择
            Row.width('100%');
            // 类型选择
            Row.justifyContent(FlexAlign.SpaceEvenly);
            // 类型选择
            Row.margin({ bottom: DeviceUtils.isWearable() ? 10 : 16 });
        }, Row);
        this.TypeButton.bind(this)('跳跃', 'jump', '🦘');
        this.TypeButton.bind(this)('旋转', 'spin', '🔄');
        this.TypeButton.bind(this)('步法', 'step', '👟');
        // 类型选择
        Row.pop();
        // 动作选择
        this.buildElementSelector.bind(this)();
        // GOE选择
        this.buildGOESelector.bind(this)();
        // 添加按钮
        this.buildAddButton.bind(this)();
        Column.pop();
    }
    TypeButton(name: string, type: string, icon: string, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width(DeviceUtils.isWearable() ? 55 : 70);
            Column.height(DeviceUtils.isWearable() ? 45 : 60);
            Column.backgroundColor(this.selectedType === type ? '#E3F2FD' : '#F5F5F5');
            Column.borderRadius(DeviceUtils.isWearable() ? 8 : 12);
            Column.justifyContent(FlexAlign.Center);
            Column.onClick(() => {
                this.selectedType = type;
                this.selectedElement = '';
            });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(icon);
            Text.fontSize(DeviceUtils.isWearable() ? 18 : 24);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(name);
            Text.fontSize(DeviceUtils.isWearable() ? 10 : 12);
            Text.fontColor(this.selectedType === type ? '#4FC3F7' : '#666666');
            Text.margin({ top: DeviceUtils.isWearable() ? 2 : 4 });
        }, Text);
        Text.pop();
        Column.pop();
    }
    buildElementSelector(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.margin({ bottom: DeviceUtils.isWearable() ? 10 : 16 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('选择动作');
            Text.fontSize(DeviceUtils.isWearable() ? 12 : 14);
            Text.fontColor('#666666');
            Text.margin({ bottom: DeviceUtils.isWearable() ? 6 : 8 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Grid.create();
            Grid.columnsTemplate(DeviceUtils.isWearable() ? '1fr 1fr 1fr' : '1fr 1fr 1fr 1fr');
            Grid.rowsGap(DeviceUtils.isWearable() ? 6 : 8);
            Grid.columnsGap(DeviceUtils.isWearable() ? 6 : 8);
            Grid.width('100%');
            Grid.height(DeviceUtils.isWearable() ? 100 : 120);
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
                            Column.height(DeviceUtils.isWearable() ? 32 : 40);
                            Column.backgroundColor(this.selectedElement === element ? '#E3F2FD' : '#F5F5F5');
                            Column.borderRadius(DeviceUtils.isWearable() ? 6 : 8);
                            Column.justifyContent(FlexAlign.Center);
                            Column.onClick(() => {
                                this.selectedElement = element;
                            });
                        }, Column);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Text.create(element);
                            Text.fontSize(DeviceUtils.isWearable() ? 12 : 14);
                            Text.fontColor(this.selectedElement === element ? '#1976D2' : '#333333');
                            Text.fontWeight(this.selectedElement === element ? FontWeight.Bold : FontWeight.Normal);
                        }, Text);
                        Text.pop();
                        Column.pop();
                        GridItem.pop();
                    };
                    observedDeepRender();
                }
            };
            this.forEachUpdateFunction(elmtId, this.getCurrentElements(), forEachItemGenFunction, (element: string) => element, false, false);
        }, ForEach);
        ForEach.pop();
        Grid.pop();
        Column.pop();
    }
    buildGOESelector(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.margin({ bottom: DeviceUtils.isWearable() ? 10 : 16 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('GOE评分');
            Text.fontSize(DeviceUtils.isWearable() ? 12 : 14);
            Text.fontColor('#666666');
            Text.margin({ bottom: DeviceUtils.isWearable() ? 6 : 8 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            // 手表端简化GOE选择，只显示常用值
            if (DeviceUtils.isWearable()) {
                this.ifElseBranchUpdateFunction(0, () => {
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
                                Column.width(24);
                                Column.height(28);
                                Column.backgroundColor(this.selectedGOE === goe ? '#4FC3F7' : '#F5F5F5');
                                Column.borderRadius(5);
                                Column.justifyContent(FlexAlign.Center);
                                Column.onClick(() => {
                                    this.selectedGOE = goe;
                                });
                            }, Column);
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Text.create(goe > 0 ? `+${goe}` : `${goe}`);
                                Text.fontSize(10);
                                Text.fontColor(this.selectedGOE === goe ? '#FFFFFF' : '#333333');
                                Text.fontWeight(FontWeight.Bold);
                            }, Text);
                            Text.pop();
                            Column.pop();
                        };
                        this.forEachUpdateFunction(elmtId, [-3, -1, 0, 1, 3], forEachItemGenFunction, (goe: number) => goe.toString(), false, false);
                    }, ForEach);
                    ForEach.pop();
                    Row.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
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
                                Column.width(28);
                                Column.height(32);
                                Column.backgroundColor(this.selectedGOE === goe ? '#4FC3F7' : '#F5F5F5');
                                Column.borderRadius(6);
                                Column.justifyContent(FlexAlign.Center);
                                Column.onClick(() => {
                                    this.selectedGOE = goe;
                                });
                            }, Column);
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Text.create(goe > 0 ? `+${goe}` : `${goe}`);
                                Text.fontSize(12);
                                Text.fontColor(this.selectedGOE === goe ? '#FFFFFF' : '#333333');
                                Text.fontWeight(FontWeight.Bold);
                            }, Text);
                            Text.pop();
                            Column.pop();
                        };
                        this.forEachUpdateFunction(elmtId, [-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5], forEachItemGenFunction, (goe: number) => goe.toString(), false, false);
                    }, ForEach);
                    ForEach.pop();
                    Row.pop();
                });
            }
        }, If);
        If.pop();
        Column.pop();
    }
    buildAddButton(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('添加动作');
            Button.width('100%');
            Button.height(DeviceUtils.isWearable() ? 36 : 45);
            Button.backgroundColor('#4CAF50');
            Button.fontColor('#FFFFFF');
            Button.fontSize(DeviceUtils.isWearable() ? 14 : 16);
            Button.fontWeight(FontWeight.Bold);
            Button.borderRadius(DeviceUtils.isWearable() ? 18 : 22);
            Button.enabled(this.selectedElement !== '');
            Button.onClick(() => {
                this.addElement();
            });
        }, Button);
        Button.pop();
    }
    // 已添加动作列表
    buildElementList(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.elements.length > 0) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Column.create();
                        Column.width('100%');
                        Column.padding(DeviceUtils.isWearable() ? 10 : 16);
                        Column.backgroundColor('#FFFFFF');
                        Column.borderRadius(DeviceUtils.isWearable() ? 8 : 12);
                        Column.margin({ bottom: DeviceUtils.isWearable() ? 10 : 16 });
                    }, Column);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Row.create();
                        Row.width('100%');
                        Row.margin({ bottom: DeviceUtils.isWearable() ? 8 : 12 });
                    }, Row);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('技术动作列表');
                        Text.fontSize(DeviceUtils.isWearable() ? 14 : 16);
                        Text.fontWeight(FontWeight.Bold);
                        Text.fontColor('#333333');
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Blank.create();
                    }, Blank);
                    Blank.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Button.createWithLabel('清空');
                        Button.height(DeviceUtils.isWearable() ? 24 : 30);
                        Button.backgroundColor('#FFEBEE');
                        Button.fontColor('#F44336');
                        Button.fontSize(DeviceUtils.isWearable() ? 10 : 12);
                        Button.borderRadius(DeviceUtils.isWearable() ? 12 : 15);
                        Button.onClick(() => {
                            this.elements = [];
                            this.calculateTotal();
                        });
                    }, Button);
                    Button.pop();
                    Row.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        ForEach.create();
                        const forEachItemGenFunction = (_item, index: number) => {
                            const element = _item;
                            this.ElementItem.bind(this)(element, index);
                        };
                        this.forEachUpdateFunction(elmtId, this.elements, forEachItemGenFunction, (element: TechnicalElement, index: number) => index.toString(), true, true);
                    }, ForEach);
                    ForEach.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        // TES总分
                        Row.create();
                        // TES总分
                        Row.width('100%');
                        // TES总分
                        Row.padding({ top: DeviceUtils.isWearable() ? 8 : 12 });
                    }, Row);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('技术分 (TES)');
                        Text.fontSize(DeviceUtils.isWearable() ? 14 : 16);
                        Text.fontWeight(FontWeight.Bold);
                        Text.fontColor('#333333');
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Blank.create();
                    }, Blank);
                    Blank.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(this.totalTES.toFixed(2));
                        Text.fontSize(DeviceUtils.isWearable() ? 16 : 20);
                        Text.fontWeight(FontWeight.Bold);
                        Text.fontColor('#FF6B6B');
                    }, Text);
                    Text.pop();
                    // TES总分
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
    ElementItem(element: TechnicalElement, index: number, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.padding({ top: DeviceUtils.isWearable() ? 6 : 8, bottom: DeviceUtils.isWearable() ? 6 : 8 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(element.name);
            Text.fontSize(DeviceUtils.isWearable() ? 12 : 14);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#333333');
            Text.layoutWeight(1);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            // 手表端简化显示
            if (!DeviceUtils.isWearable()) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(`基础: ${element.baseValue.toFixed(2)}`);
                        Text.fontSize(12);
                        Text.fontColor('#999999');
                        Text.margin({ right: 8 });
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(`GOE: ${element.goe > 0 ? '+' : ''}${element.goe}`);
                        Text.fontSize(12);
                        Text.fontColor(element.goe > 0 ? '#4CAF50' : element.goe < 0 ? '#F44336' : '#999999');
                        Text.margin({ right: 8 });
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
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(element.finalScore.toFixed(2));
            Text.fontSize(DeviceUtils.isWearable() ? 12 : 14);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#1976D2');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('×');
            Button.width(DeviceUtils.isWearable() ? 20 : 24);
            Button.height(DeviceUtils.isWearable() ? 20 : 24);
            Button.backgroundColor('#FFEBEE');
            Button.fontColor('#F44336');
            Button.fontSize(DeviceUtils.isWearable() ? 10 : 12);
            Button.borderRadius(DeviceUtils.isWearable() ? 10 : 12);
            Button.margin({ left: DeviceUtils.isWearable() ? 4 : 8 });
            Button.onClick(() => {
                this.elements.splice(index, 1);
                this.calculateTotal();
            });
        }, Button);
        Button.pop();
        Row.pop();
    }
    // PCS输入区
    buildPCSInput(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.padding(DeviceUtils.isWearable() ? 10 : 16);
            Column.backgroundColor('#FFFFFF');
            Column.borderRadius(DeviceUtils.isWearable() ? 8 : 12);
            Column.margin({ bottom: DeviceUtils.isWearable() ? 10 : 16 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('节目内容分 (PCS)');
            Text.fontSize(DeviceUtils.isWearable() ? 14 : 16);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#333333');
            Text.margin({ bottom: DeviceUtils.isWearable() ? 8 : 12 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('总分');
            Text.fontSize(DeviceUtils.isWearable() ? 12 : 14);
            Text.fontColor('#666666');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            TextInput.create({ placeholder: '输入PCS分数', text: this.totalPCS.toString() });
            TextInput.layoutWeight(1);
            TextInput.height(DeviceUtils.isWearable() ? 32 : 40);
            TextInput.backgroundColor('#F5F5F5');
            TextInput.borderRadius(DeviceUtils.isWearable() ? 6 : 8);
            TextInput.margin({ left: DeviceUtils.isWearable() ? 8 : 12 });
            TextInput.fontSize(DeviceUtils.isWearable() ? 12 : 14);
            TextInput.type(InputType.Number);
            TextInput.onChange((value: string) => {
                this.totalPCS = parseFloat(value) || 0;
            });
        }, TextInput);
        Row.pop();
        Column.pop();
    }
    // 总分显示
    buildTotalScore(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.padding(DeviceUtils.isWearable() ? 12 : 20);
            Column.backgroundColor('#E3F2FD');
            Column.borderRadius(DeviceUtils.isWearable() ? 8 : 12);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('节目总分');
            Text.fontSize(DeviceUtils.isWearable() ? 16 : 18);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#333333');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.alignItems(HorizontalAlign.End);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create((this.totalTES + this.totalPCS).toFixed(2));
            Text.fontSize(DeviceUtils.isWearable() ? 24 : 32);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#FF6B6B');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            // 手表端简化显示
            if (!DeviceUtils.isWearable()) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(`TES: ${this.totalTES.toFixed(2)} + PCS: ${this.totalPCS.toFixed(2)}`);
                        Text.fontSize(12);
                        Text.fontColor('#999999');
                        Text.margin({ top: 4 });
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
        Row.pop();
        Column.pop();
    }
    // 辅助方法
    private getCurrentElements(): string[] {
        switch (this.selectedType) {
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
    private addElement() {
        if (this.selectedElement) {
            const element = createTechnicalElement(this.selectedElement);
            if (element) {
                element.goe = this.selectedGOE;
                element.calculateFinalScore();
                this.elements.push(element);
                this.calculateTotal();
                this.selectedElement = '';
                this.selectedGOE = 0;
            }
        }
    }
    private calculateTotal() {
        this.totalTES = this.elements.reduce((sum, element) => sum + element.finalScore, 0);
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "ScoringSimulatorPage";
    }
}
registerNamedRoute(() => new ScoringSimulatorPage(undefined, {}), "", { bundleName: "com.example.simplecalculator", moduleName: "entry", pagePath: "pages/ScoringSimulatorPage", pageFullPath: "entry/src/main/ets/pages/ScoringSimulatorPage", integratedHsp: "false", moduleType: "followWithHap" });
