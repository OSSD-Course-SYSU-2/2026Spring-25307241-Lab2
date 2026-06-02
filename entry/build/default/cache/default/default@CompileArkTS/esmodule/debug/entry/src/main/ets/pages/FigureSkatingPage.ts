if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface FigureSkatingPage_Params {
    programType?: string;
    currentElement?: string;
    baseValue?: string;
    goeScores?: string[];
    totalScore?: string;
    elementsList?: SkatingScore[];
    isCombinationMode?: boolean;
    combinationElements?: string[];
    combinationBaseValues?: number[];
    combinationList?: CombinationJump[];
    programComponents?: ProgramComponent[];
    pcsScores?: string[][];
    technicalScore?: string;
    componentScore?: string;
    elements?: string[];
    baseValues?: Map<string, number>;
}
import ScoreCalculator from "@bundle:com.example.simplecalculator/entry/ets/common/util/ScoreCalculator";
import { SkatingScore, ProgramComponent } from "@bundle:com.example.simplecalculator/entry/ets/viewmodel/SkatingScoreModel";
import type { CombinationJump } from "@bundle:com.example.simplecalculator/entry/ets/viewmodel/SkatingScoreModel";
class FigureSkatingPage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__programType = new ObservedPropertySimplePU('SP', this, "programType");
        this.__currentElement = new ObservedPropertySimplePU('', this, "currentElement");
        this.__baseValue = new ObservedPropertySimplePU('', this, "baseValue");
        this.__goeScores = new ObservedPropertyObjectPU(['', '', '', '', '', '', '', '', ''], this, "goeScores");
        this.__totalScore = new ObservedPropertySimplePU('0.00', this, "totalScore");
        this.__elementsList = new ObservedPropertyObjectPU([], this, "elementsList");
        this.__isCombinationMode = new ObservedPropertySimplePU(false, this, "isCombinationMode");
        this.__combinationElements = new ObservedPropertyObjectPU([], this, "combinationElements");
        this.__combinationBaseValues = new ObservedPropertyObjectPU([], this, "combinationBaseValues");
        this.__combinationList = new ObservedPropertyObjectPU([], this, "combinationList");
        this.__programComponents = new ObservedPropertyObjectPU([
            new ProgramComponent('滑行技术 SS', 0.8),
            new ProgramComponent('动作衔接 TR', 0.8),
            new ProgramComponent('表演质量 PE', 0.8),
            new ProgramComponent('编排构成 CH', 0.8),
            new ProgramComponent('音乐诠释 IN', 0.8)
        ], this, "programComponents");
        this.__pcsScores = new ObservedPropertyObjectPU([
            ['', '', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', '', '']
        ], this, "pcsScores");
        this.__technicalScore = new ObservedPropertySimplePU('0.00', this, "technicalScore");
        this.__componentScore = new ObservedPropertySimplePU('0.00', this, "componentScore");
        this.elements = [
            '1T', '1S', '1Lo', '1F', '1Lz', '1A',
            '2T', '2S', '2Lo', '2F', '2Lz', '2A',
            '3T', '3S', '3Lo', '3F', '3Lz', '3A',
            '4T', '4S', '4Lo', '4F', '4Lz', '4A',
            'Sp1', 'Sp2', 'Sp3', 'Sp4',
            'LSp1', 'LSp2', 'LSp3', 'LSp4',
            'CSp1', 'CSp2', 'CSp3', 'CSp4',
            'SSp1', 'SSp2', 'SSp3', 'SSp4',
            'StSq1', 'StSq2', 'StSq3', 'StSq4'
        ];
        this.baseValues = new Map([
            ['1T', 0.4], ['1S', 0.4], ['1Lo', 0.5], ['1F', 0.8], ['1Lz', 0.6], ['1A', 1.1],
            ['2T', 1.3], ['2S', 1.3], ['2Lo', 1.7], ['2F', 2.6], ['2Lz', 2.1], ['2A', 3.3],
            ['3T', 4.2], ['3S', 4.3], ['3Lo', 4.9], ['3F', 5.3], ['3Lz', 5.9], ['3A', 8.0],
            ['4T', 9.5], ['4S', 9.7], ['4Lo', 10.5], ['4F', 11.0], ['4Lz', 11.5], ['4A', 12.5],
            ['Sp1', 1.5], ['Sp2', 2.5], ['Sp3', 3.0], ['Sp4', 3.5],
            ['LSp1', 1.7], ['LSp2', 2.7], ['LSp3', 3.2], ['LSp4', 3.7],
            ['CSp1', 1.6], ['CSp2', 2.6], ['CSp3', 3.1], ['CSp4', 3.6],
            ['SSp1', 1.7], ['SSp2', 2.7], ['SSp3', 3.3], ['SSp4', 3.8],
            ['StSq1', 1.5], ['StSq2', 2.5], ['StSq3', 3.25], ['StSq4', 3.9]
        ]);
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: FigureSkatingPage_Params) {
        if (params.programType !== undefined) {
            this.programType = params.programType;
        }
        if (params.currentElement !== undefined) {
            this.currentElement = params.currentElement;
        }
        if (params.baseValue !== undefined) {
            this.baseValue = params.baseValue;
        }
        if (params.goeScores !== undefined) {
            this.goeScores = params.goeScores;
        }
        if (params.totalScore !== undefined) {
            this.totalScore = params.totalScore;
        }
        if (params.elementsList !== undefined) {
            this.elementsList = params.elementsList;
        }
        if (params.isCombinationMode !== undefined) {
            this.isCombinationMode = params.isCombinationMode;
        }
        if (params.combinationElements !== undefined) {
            this.combinationElements = params.combinationElements;
        }
        if (params.combinationBaseValues !== undefined) {
            this.combinationBaseValues = params.combinationBaseValues;
        }
        if (params.combinationList !== undefined) {
            this.combinationList = params.combinationList;
        }
        if (params.programComponents !== undefined) {
            this.programComponents = params.programComponents;
        }
        if (params.pcsScores !== undefined) {
            this.pcsScores = params.pcsScores;
        }
        if (params.technicalScore !== undefined) {
            this.technicalScore = params.technicalScore;
        }
        if (params.componentScore !== undefined) {
            this.componentScore = params.componentScore;
        }
        if (params.elements !== undefined) {
            this.elements = params.elements;
        }
        if (params.baseValues !== undefined) {
            this.baseValues = params.baseValues;
        }
    }
    updateStateVars(params: FigureSkatingPage_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__programType.purgeDependencyOnElmtId(rmElmtId);
        this.__currentElement.purgeDependencyOnElmtId(rmElmtId);
        this.__baseValue.purgeDependencyOnElmtId(rmElmtId);
        this.__goeScores.purgeDependencyOnElmtId(rmElmtId);
        this.__totalScore.purgeDependencyOnElmtId(rmElmtId);
        this.__elementsList.purgeDependencyOnElmtId(rmElmtId);
        this.__isCombinationMode.purgeDependencyOnElmtId(rmElmtId);
        this.__combinationElements.purgeDependencyOnElmtId(rmElmtId);
        this.__combinationBaseValues.purgeDependencyOnElmtId(rmElmtId);
        this.__combinationList.purgeDependencyOnElmtId(rmElmtId);
        this.__programComponents.purgeDependencyOnElmtId(rmElmtId);
        this.__pcsScores.purgeDependencyOnElmtId(rmElmtId);
        this.__technicalScore.purgeDependencyOnElmtId(rmElmtId);
        this.__componentScore.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__programType.aboutToBeDeleted();
        this.__currentElement.aboutToBeDeleted();
        this.__baseValue.aboutToBeDeleted();
        this.__goeScores.aboutToBeDeleted();
        this.__totalScore.aboutToBeDeleted();
        this.__elementsList.aboutToBeDeleted();
        this.__isCombinationMode.aboutToBeDeleted();
        this.__combinationElements.aboutToBeDeleted();
        this.__combinationBaseValues.aboutToBeDeleted();
        this.__combinationList.aboutToBeDeleted();
        this.__programComponents.aboutToBeDeleted();
        this.__pcsScores.aboutToBeDeleted();
        this.__technicalScore.aboutToBeDeleted();
        this.__componentScore.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __programType: ObservedPropertySimplePU<string>;
    get programType() {
        return this.__programType.get();
    }
    set programType(newValue: string) {
        this.__programType.set(newValue);
    }
    private __currentElement: ObservedPropertySimplePU<string>;
    get currentElement() {
        return this.__currentElement.get();
    }
    set currentElement(newValue: string) {
        this.__currentElement.set(newValue);
    }
    private __baseValue: ObservedPropertySimplePU<string>;
    get baseValue() {
        return this.__baseValue.get();
    }
    set baseValue(newValue: string) {
        this.__baseValue.set(newValue);
    }
    private __goeScores: ObservedPropertyObjectPU<string[]>;
    get goeScores() {
        return this.__goeScores.get();
    }
    set goeScores(newValue: string[]) {
        this.__goeScores.set(newValue);
    }
    private __totalScore: ObservedPropertySimplePU<string>;
    get totalScore() {
        return this.__totalScore.get();
    }
    set totalScore(newValue: string) {
        this.__totalScore.set(newValue);
    }
    private __elementsList: ObservedPropertyObjectPU<SkatingScore[]>;
    get elementsList() {
        return this.__elementsList.get();
    }
    set elementsList(newValue: SkatingScore[]) {
        this.__elementsList.set(newValue);
    }
    private __isCombinationMode: ObservedPropertySimplePU<boolean>;
    get isCombinationMode() {
        return this.__isCombinationMode.get();
    }
    set isCombinationMode(newValue: boolean) {
        this.__isCombinationMode.set(newValue);
    }
    private __combinationElements: ObservedPropertyObjectPU<string[]>;
    get combinationElements() {
        return this.__combinationElements.get();
    }
    set combinationElements(newValue: string[]) {
        this.__combinationElements.set(newValue);
    }
    private __combinationBaseValues: ObservedPropertyObjectPU<number[]>;
    get combinationBaseValues() {
        return this.__combinationBaseValues.get();
    }
    set combinationBaseValues(newValue: number[]) {
        this.__combinationBaseValues.set(newValue);
    }
    private __combinationList: ObservedPropertyObjectPU<CombinationJump[]>;
    get combinationList() {
        return this.__combinationList.get();
    }
    set combinationList(newValue: CombinationJump[]) {
        this.__combinationList.set(newValue);
    }
    private __programComponents: ObservedPropertyObjectPU<ProgramComponent[]>;
    get programComponents() {
        return this.__programComponents.get();
    }
    set programComponents(newValue: ProgramComponent[]) {
        this.__programComponents.set(newValue);
    }
    private __pcsScores: ObservedPropertyObjectPU<string[][]>;
    get pcsScores() {
        return this.__pcsScores.get();
    }
    set pcsScores(newValue: string[][]) {
        this.__pcsScores.set(newValue);
    }
    private __technicalScore: ObservedPropertySimplePU<string>;
    get technicalScore() {
        return this.__technicalScore.get();
    }
    set technicalScore(newValue: string) {
        this.__technicalScore.set(newValue);
    }
    private __componentScore: ObservedPropertySimplePU<string>;
    get componentScore() {
        return this.__componentScore.get();
    }
    set componentScore(newValue: string) {
        this.__componentScore.set(newValue);
    }
    private elements: string[];
    private baseValues: Map<string, number>;
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.height('100%');
            Column.backgroundColor('#F0F0F0');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('花样滑冰计分计算器');
            Text.fontSize(24);
            Text.fontWeight(FontWeight.Bold);
            Text.margin({ top: 20, bottom: 20 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('90%');
            Row.justifyContent(FlexAlign.SpaceBetween);
            Row.margin({ bottom: 20 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('短节目 (SP)');
            Button.width('45%');
            Button.height(45);
            Button.fontSize(16);
            Button.backgroundColor(this.programType === 'SP' ? '#4CAF50' : '#E0E0E0');
            Button.fontColor(this.programType === 'SP' ? Color.White : Color.Black);
            Button.onClick(() => {
                this.programType = 'SP';
                this.updateProgramFactor();
            });
        }, Button);
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('自由滑 (FS)');
            Button.width('45%');
            Button.height(45);
            Button.fontSize(16);
            Button.backgroundColor(this.programType === 'FS' ? '#4CAF50' : '#E0E0E0');
            Button.fontColor(this.programType === 'FS' ? Color.White : Color.Black);
            Button.onClick(() => {
                this.programType = 'FS';
                this.updateProgramFactor();
            });
        }, Button);
        Button.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('90%');
            Column.padding(15);
            Column.backgroundColor('#F5F5F5');
            Column.borderRadius(10);
            Column.margin({ bottom: 20 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.layoutWeight(1);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('技术分 (TES)');
            Text.fontSize(14);
            Text.fontColor('#666666');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.technicalScore);
            Text.fontSize(24);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#2196F3');
        }, Text);
        Text.pop();
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.layoutWeight(1);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('节目分 (PCS)');
            Text.fontSize(14);
            Text.fontColor('#666666');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.componentScore);
            Text.fontSize(24);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#4CAF50');
        }, Text);
        Text.pop();
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.layoutWeight(1);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('总分');
            Text.fontSize(14);
            Text.fontColor('#666666');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.totalScore);
            Text.fontSize(28);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#FF6B6B');
        }, Text);
        Text.pop();
        Column.pop();
        Row.pop();
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('90%');
            Row.justifyContent(FlexAlign.SpaceBetween);
            Row.margin({ bottom: 20 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('单跳模式');
            Button.width('45%');
            Button.height(45);
            Button.fontSize(16);
            Button.backgroundColor(!this.isCombinationMode ? '#4CAF50' : '#E0E0E0');
            Button.fontColor(!this.isCombinationMode ? Color.White : Color.Black);
            Button.onClick(() => {
                this.isCombinationMode = false;
                this.clearCombination();
            });
        }, Button);
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('连跳模式');
            Button.width('45%');
            Button.height(45);
            Button.fontSize(16);
            Button.backgroundColor(this.isCombinationMode ? '#4CAF50' : '#E0E0E0');
            Button.fontColor(this.isCombinationMode ? Color.White : Color.Black);
            Button.onClick(() => {
                this.isCombinationMode = true;
                this.clearCurrent();
            });
        }, Button);
        Button.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('90%');
            Column.padding(15);
            Column.backgroundColor(Color.White);
            Column.borderRadius(10);
            Column.margin({ bottom: 20 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.isCombinationMode ? '选择连跳动作（最多3个）' : '选择动作');
            Text.fontSize(16);
            Text.fontWeight(FontWeight.Medium);
            Text.margin({ bottom: 10 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Flex.create({ wrap: FlexWrap.Wrap });
            Flex.width('100%');
        }, Flex);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const element = _item;
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Button.createWithLabel(element);
                    Button.width(60);
                    Button.height(40);
                    Button.fontSize(14);
                    Button.margin({ right: 8, bottom: 8 });
                    Button.backgroundColor(this.isCombinationMode
                        ? (this.combinationElements.includes(element) ? '#FF6B6B' : '#E0E0E0')
                        : (this.currentElement === element ? '#FF6B6B' : '#E0E0E0'));
                    Button.fontColor(this.isCombinationMode
                        ? (this.combinationElements.includes(element) ? Color.White : Color.Black)
                        : (this.currentElement === element ? Color.White : Color.Black));
                    Button.onClick(() => {
                        if (this.isCombinationMode) {
                            if (this.combinationElements.length < 3 && !this.combinationElements.includes(element)) {
                                const baseVal = this.baseValues.get(element) || 0;
                                this.combinationElements.push(element);
                                this.combinationBaseValues.push(baseVal);
                            }
                        }
                        else {
                            this.currentElement = element;
                            this.updateBaseValue();
                        }
                    });
                }, Button);
                Button.pop();
            };
            this.forEachUpdateFunction(elmtId, this.elements, forEachItemGenFunction);
        }, ForEach);
        ForEach.pop();
        Flex.pop();
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.isCombinationMode && this.combinationElements.length > 0) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Column.create();
                        Column.width('90%');
                        Column.padding(15);
                        Column.backgroundColor(Color.White);
                        Column.borderRadius(10);
                        Column.margin({ bottom: 20 });
                    }, Column);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('连跳组合');
                        Text.fontSize(16);
                        Text.fontWeight(FontWeight.Medium);
                        Text.margin({ bottom: 10 });
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Row.create();
                        Row.margin({ bottom: 10 });
                    }, Row);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        ForEach.create();
                        const forEachItemGenFunction = (_item, index: number) => {
                            const element = _item;
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Row.create();
                            }, Row);
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Text.create(element);
                                Text.fontSize(16);
                                Text.fontWeight(FontWeight.Bold);
                                Text.fontColor('#FF6B6B');
                            }, Text);
                            Text.pop();
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                If.create();
                                if (index < this.combinationElements.length - 1) {
                                    this.ifElseBranchUpdateFunction(0, () => {
                                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                                            Text.create(' + ');
                                            Text.fontSize(16);
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
                        this.forEachUpdateFunction(elmtId, this.combinationElements, forEachItemGenFunction, undefined, true, false);
                    }, ForEach);
                    ForEach.pop();
                    Row.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Row.create();
                        Row.margin({ bottom: 10 });
                    }, Row);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('各基础分值: ');
                        Text.fontSize(14);
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(this.combinationBaseValues.map((v: number): string => v.toFixed(2)).join(' + '));
                        Text.fontSize(14);
                        Text.fontColor('#4CAF50');
                    }, Text);
                    Text.pop();
                    Row.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Row.create();
                    }, Row);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('连跳总基础分值: ');
                        Text.fontSize(14);
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(ScoreCalculator.calculateCombinationBaseValue(ObservedObject.GetRawObject(this.combinationBaseValues)).toFixed(2));
                        Text.fontSize(18);
                        Text.fontWeight(FontWeight.Bold);
                        Text.fontColor('#4CAF50');
                    }, Text);
                    Text.pop();
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
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (!this.isCombinationMode && this.currentElement !== '') {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Column.create();
                        Column.width('90%');
                        Column.padding(15);
                        Column.backgroundColor(Color.White);
                        Column.borderRadius(10);
                        Column.margin({ bottom: 20 });
                    }, Column);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Row.create();
                        Row.margin({ bottom: 10 });
                    }, Row);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('动作: ');
                        Text.fontSize(16);
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(this.currentElement);
                        Text.fontSize(18);
                        Text.fontWeight(FontWeight.Bold);
                        Text.fontColor('#FF6B6B');
                    }, Text);
                    Text.pop();
                    Row.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Row.create();
                    }, Row);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('基础分值: ');
                        Text.fontSize(16);
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(this.baseValue);
                        Text.fontSize(18);
                        Text.fontWeight(FontWeight.Bold);
                        Text.fontColor('#4CAF50');
                    }, Text);
                    Text.pop();
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
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if ((this.isCombinationMode && this.combinationElements.length >= 2) ||
                (!this.isCombinationMode && this.currentElement !== '')) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Column.create();
                        Column.width('90%');
                        Column.padding(15);
                        Column.backgroundColor(Color.White);
                        Column.borderRadius(10);
                        Column.margin({ bottom: 20 });
                    }, Column);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('裁判GOE评分 (-5 到 +5)');
                        Text.fontSize(16);
                        Text.fontWeight(FontWeight.Medium);
                        Text.margin({ bottom: 10 });
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        ForEach.create();
                        const forEachItemGenFunction = _item => {
                            const index = _item;
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Row.create();
                                Row.width('100%');
                                Row.justifyContent(FlexAlign.Start);
                                Row.margin({ bottom: 8 });
                            }, Row);
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Text.create(`裁判 ${index + 1}:`);
                                Text.fontSize(14);
                                Text.width(60);
                            }, Text);
                            Text.pop();
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                TextInput.create({ text: this.goeScores[index] });
                                TextInput.width(80);
                                TextInput.height(40);
                                TextInput.type(InputType.Number);
                                TextInput.onChange((value: string) => {
                                    this.goeScores[index] = value;
                                });
                            }, TextInput);
                            Row.pop();
                        };
                        this.forEachUpdateFunction(elmtId, [0, 1, 2, 3, 4, 5, 6, 7, 8], forEachItemGenFunction);
                    }, ForEach);
                    ForEach.pop();
                    Column.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Row.create();
                        Row.width('90%');
                        Row.justifyContent(FlexAlign.SpaceBetween);
                        Row.margin({ bottom: 20 });
                    }, Row);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        If.create();
                        if (this.isCombinationMode) {
                            this.ifElseBranchUpdateFunction(0, () => {
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    Button.createWithLabel('完成连跳');
                                    Button.width('45%');
                                    Button.height(50);
                                    Button.fontSize(16);
                                    Button.backgroundColor('#4CAF50');
                                    Button.enabled(this.combinationElements.length >= 2);
                                    Button.onClick(() => {
                                        this.addCombination();
                                    });
                                }, Button);
                                Button.pop();
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    Button.createWithLabel('清空连跳');
                                    Button.width('45%');
                                    Button.height(50);
                                    Button.fontSize(16);
                                    Button.backgroundColor('#FF9800');
                                    Button.onClick(() => {
                                        this.clearCombination();
                                    });
                                }, Button);
                                Button.pop();
                            });
                        }
                        else {
                            this.ifElseBranchUpdateFunction(1, () => {
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    Button.createWithLabel('添加动作');
                                    Button.width('45%');
                                    Button.height(50);
                                    Button.fontSize(16);
                                    Button.backgroundColor('#4CAF50');
                                    Button.onClick(() => {
                                        this.addElement();
                                    });
                                }, Button);
                                Button.pop();
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    Button.createWithLabel('清空');
                                    Button.width('45%');
                                    Button.height(50);
                                    Button.fontSize(16);
                                    Button.backgroundColor('#FF9800');
                                    Button.onClick(() => {
                                        this.clearCurrent();
                                    });
                                }, Button);
                                Button.pop();
                            });
                        }
                    }, If);
                    If.pop();
                    Row.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.elementsList.length > 0 || this.combinationList.length > 0) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Column.create();
                        Column.width('90%');
                        Column.padding(15);
                        Column.backgroundColor(Color.White);
                        Column.borderRadius(10);
                        Column.margin({ bottom: 20 });
                    }, Column);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('已添加动作');
                        Text.fontSize(16);
                        Text.fontWeight(FontWeight.Medium);
                        Text.margin({ bottom: 10 });
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        ForEach.create();
                        const forEachItemGenFunction = (_item, index: number) => {
                            const item = _item;
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Row.create();
                                Row.width('100%');
                                Row.justifyContent(FlexAlign.SpaceBetween);
                                Row.padding({ top: 8, bottom: 8 });
                                Row.borderWidth({ bottom: 1 });
                                Row.borderColor('#E0E0E0');
                            }, Row);
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Text.create(`${index + 1}. ${item.element}`);
                                Text.fontSize(14);
                                Text.layoutWeight(1);
                            }, Text);
                            Text.pop();
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Text.create(`基础: ${item.baseValue.toFixed(2)}`);
                                Text.fontSize(14);
                                Text.width(100);
                            }, Text);
                            Text.pop();
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Text.create(`得分: ${item.finalScore.toFixed(2)}`);
                                Text.fontSize(14);
                                Text.fontColor('#FF6B6B');
                                Text.width(100);
                            }, Text);
                            Text.pop();
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Button.createWithLabel('删除');
                                Button.width(50);
                                Button.height(30);
                                Button.fontSize(12);
                                Button.backgroundColor('#FF4444');
                                Button.onClick(() => {
                                    this.removeElement(index);
                                });
                            }, Button);
                            Button.pop();
                            Row.pop();
                        };
                        this.forEachUpdateFunction(elmtId, this.elementsList, forEachItemGenFunction, undefined, true, false);
                    }, ForEach);
                    ForEach.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        ForEach.create();
                        const forEachItemGenFunction = (_item, index: number) => {
                            const item = _item;
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Column.create();
                                Column.width('100%');
                                Column.borderWidth({ bottom: 1 });
                                Column.borderColor('#E0E0E0');
                            }, Column);
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Row.create();
                                Row.width('100%');
                                Row.justifyContent(FlexAlign.SpaceBetween);
                                Row.padding({ top: 8, bottom: 4 });
                            }, Row);
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Text.create(`${this.elementsList.length + index + 1}. ${item.elements.join(' + ')} (连跳)`);
                                Text.fontSize(14);
                                Text.layoutWeight(1);
                            }, Text);
                            Text.pop();
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Button.createWithLabel('删除');
                                Button.width(50);
                                Button.height(30);
                                Button.fontSize(12);
                                Button.backgroundColor('#FF4444');
                                Button.onClick(() => {
                                    this.removeCombination(index);
                                });
                            }, Button);
                            Button.pop();
                            Row.pop();
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Row.create();
                                Row.width('100%');
                                Row.padding({ bottom: 8 });
                            }, Row);
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Text.create(`各基础: ${item.baseValues.map((v: number): string => v.toFixed(2)).join(' + ')}`);
                                Text.fontSize(12);
                                Text.fontColor('#666666');
                                Text.layoutWeight(1);
                            }, Text);
                            Text.pop();
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Text.create(`总基础: ${item.totalBaseValue.toFixed(2)}`);
                                Text.fontSize(12);
                                Text.fontColor('#4CAF50');
                                Text.width(100);
                            }, Text);
                            Text.pop();
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Text.create(`得分: ${item.finalScore.toFixed(2)}`);
                                Text.fontSize(14);
                                Text.fontColor('#FF6B6B');
                                Text.width(100);
                            }, Text);
                            Text.pop();
                            Row.pop();
                            Column.pop();
                        };
                        this.forEachUpdateFunction(elmtId, this.combinationList, forEachItemGenFunction, undefined, true, false);
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
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('90%');
            Column.padding(15);
            Column.backgroundColor(Color.White);
            Column.borderRadius(10);
            Column.margin({ bottom: 20 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('节目内容分 (PCS)');
            Text.fontSize(16);
            Text.fontWeight(FontWeight.Medium);
            Text.margin({ bottom: 10 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = (_item, compIndex: number) => {
                const component = _item;
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Column.create();
                    Column.width('100%');
                    Column.padding(10);
                    Column.backgroundColor('#F9F9F9');
                    Column.borderRadius(8);
                    Column.margin({ bottom: 10 });
                }, Column);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Row.create();
                    Row.width('100%');
                    Row.margin({ bottom: 8 });
                }, Row);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create(component.name);
                    Text.fontSize(14);
                    Text.fontWeight(FontWeight.Medium);
                    Text.layoutWeight(1);
                }, Text);
                Text.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create(`系数: ${component.factor.toFixed(2)}`);
                    Text.fontSize(12);
                    Text.fontColor('#666666');
                }, Text);
                Text.pop();
                Row.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Flex.create({ wrap: FlexWrap.Wrap });
                    Flex.width('100%');
                }, Flex);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    ForEach.create();
                    const forEachItemGenFunction = _item => {
                        const judgeIndex = _item;
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Column.create();
                            Column.margin({ right: 5, bottom: 5 });
                        }, Column);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Text.create(`裁判${judgeIndex + 1}`);
                            Text.fontSize(10);
                            Text.fontColor('#999999');
                        }, Text);
                        Text.pop();
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            TextInput.create({ text: this.pcsScores[compIndex][judgeIndex] });
                            TextInput.width(35);
                            TextInput.height(35);
                            TextInput.fontSize(12);
                            TextInput.type(InputType.Number);
                            TextInput.onChange((value: string) => {
                                this.pcsScores[compIndex][judgeIndex] = value;
                            });
                        }, TextInput);
                        Column.pop();
                    };
                    this.forEachUpdateFunction(elmtId, [0, 1, 2, 3, 4, 5, 6, 7, 8], forEachItemGenFunction);
                }, ForEach);
                ForEach.pop();
                Flex.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Row.create();
                    Row.width('100%');
                    Row.margin({ top: 8 });
                }, Row);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create('平均分: ');
                    Text.fontSize(12);
                    Text.fontColor('#666666');
                }, Text);
                Text.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create(this.calculateComponentAverage(compIndex).toFixed(2));
                    Text.fontSize(14);
                    Text.fontWeight(FontWeight.Bold);
                    Text.fontColor('#4CAF50');
                }, Text);
                Text.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create('  最终分: ');
                    Text.fontSize(12);
                    Text.fontColor('#666666');
                }, Text);
                Text.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create(this.calculateComponentFinalScore(compIndex).toFixed(2));
                    Text.fontSize(14);
                    Text.fontWeight(FontWeight.Bold);
                    Text.fontColor('#FF6B6B');
                }, Text);
                Text.pop();
                Row.pop();
                Column.pop();
            };
            this.forEachUpdateFunction(elmtId, this.programComponents, forEachItemGenFunction, undefined, true, false);
        }, ForEach);
        ForEach.pop();
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('计算总分');
            Button.width('90%');
            Button.height(50);
            Button.fontSize(18);
            Button.backgroundColor('#FF6B6B');
            Button.onClick(() => {
                this.calculateTotal();
            });
            Button.margin({ bottom: 20 });
        }, Button);
        Button.pop();
        Column.pop();
    }
    updateBaseValue(): void {
        const value = this.baseValues.get(this.currentElement);
        if (value !== undefined) {
            this.baseValue = value.toFixed(2);
        }
    }
    addElement(): void {
        if (this.currentElement === '') {
            return;
        }
        const baseVal = this.baseValues.get(this.currentElement) || 0;
        const goeValues: number[] = [];
        for (let i = 0; i < 9; i++) {
            const goe = parseFloat(this.goeScores[i]);
            if (!isNaN(goe)) {
                goeValues.push(goe);
            }
        }
        const finalScore = ScoreCalculator.calculateElementScore(baseVal, goeValues);
        const score = new SkatingScore(this.currentElement, baseVal, goeValues, finalScore);
        this.elementsList.push(score);
        this.clearCurrent();
    }
    removeElement(index: number): void {
        this.elementsList.splice(index, 1);
        this.calculateTotal();
    }
    clearCurrent(): void {
        this.currentElement = '';
        this.baseValue = '';
        this.goeScores = ['', '', '', '', '', '', '', '', ''];
    }
    calculateTotal(): void {
        let tes = 0;
        for (const item of this.elementsList) {
            tes += item.finalScore;
        }
        for (const item of this.combinationList) {
            tes += item.finalScore;
        }
        this.technicalScore = tes.toFixed(2);
        let pcs = 0;
        for (let i = 0; i < this.programComponents.length; i++) {
            pcs += this.calculateComponentFinalScore(i);
        }
        this.componentScore = pcs.toFixed(2);
        const total = tes + pcs;
        this.totalScore = total.toFixed(2);
    }
    calculateComponentAverage(compIndex: number): number {
        const scores: number[] = [];
        for (let i = 0; i < 9; i++) {
            const score = parseFloat(this.pcsScores[compIndex][i]);
            if (!isNaN(score)) {
                scores.push(score);
            }
        }
        if (scores.length === 0) {
            return 0;
        }
        const sorted = scores.slice().sort((a: number, b: number): number => a - b);
        const trimmed = sorted.slice(1, sorted.length - 1);
        if (trimmed.length === 0) {
            return scores[0];
        }
        const sum = trimmed.reduce((acc: number, val: number): number => acc + val, 0);
        return sum / trimmed.length;
    }
    calculateComponentFinalScore(compIndex: number): number {
        const average = this.calculateComponentAverage(compIndex);
        const factor = this.programComponents[compIndex].factor;
        return Math.round(average * factor * 100) / 100;
    }
    updateProgramFactor(): void {
        const factor = this.programType === 'SP' ? 0.8 : 1.6;
        for (const component of this.programComponents) {
            component.factor = factor;
        }
    }
    addCombination(): void {
        if (this.combinationElements.length < 2) {
            return;
        }
        const goeValues: number[] = [];
        for (let i = 0; i < 9; i++) {
            const goe = parseFloat(this.goeScores[i]);
            if (!isNaN(goe)) {
                goeValues.push(goe);
            }
        }
        const combination = ScoreCalculator.createCombinationJump(this.combinationElements.slice(), this.combinationBaseValues.slice(), goeValues);
        this.combinationList.push(combination);
        this.clearCombination();
    }
    removeCombination(index: number): void {
        this.combinationList.splice(index, 1);
        this.calculateTotal();
    }
    clearCombination(): void {
        this.combinationElements = [];
        this.combinationBaseValues = [];
        this.currentElement = '';
        this.baseValue = '';
        this.goeScores = ['', '', '', '', '', '', '', '', ''];
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "FigureSkatingPage";
    }
}
registerNamedRoute(() => new FigureSkatingPage(undefined, {}), "", { bundleName: "com.example.simplecalculator", moduleName: "entry", pagePath: "pages/FigureSkatingPage", pageFullPath: "entry/src/main/ets/pages/FigureSkatingPage", integratedHsp: "false", moduleType: "followWithHap" });
