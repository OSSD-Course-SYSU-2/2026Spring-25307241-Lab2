if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface FigureSkatingPage_Params {
    currentElement?: string;
    baseValue?: string;
    goeScores?: Array<string>;
    totalScore?: string;
    elementsList?: Array<SkatingScore>;
    showResult?: boolean;
    selectedLevel?: string;
    isCombinationMode?: boolean;
    combinationElements?: Array<string>;
    combinationBaseValues?: Array<number>;
    combinationList?: Array<CombinationJump>;
    elements?: Array<string>;
    baseValues?: Map<string, number>;
}
import ScoreCalculator from "@bundle:com.example.simplecalculator/entry/ets/common/util/ScoreCalculator";
import { SkatingScore } from "@bundle:com.example.simplecalculator/entry/ets/viewmodel/SkatingScoreModel";
import type { CombinationJump } from "@bundle:com.example.simplecalculator/entry/ets/viewmodel/SkatingScoreModel";
class FigureSkatingPage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__currentElement = new ObservedPropertySimplePU('', this, "currentElement");
        this.__baseValue = new ObservedPropertySimplePU('', this, "baseValue");
        this.__goeScores = new ObservedPropertyObjectPU(['', '', '', '', '', '', '', '', ''], this, "goeScores");
        this.__totalScore = new ObservedPropertySimplePU('0.00', this, "totalScore");
        this.__elementsList = new ObservedPropertyObjectPU([], this, "elementsList");
        this.__showResult = new ObservedPropertySimplePU(false, this, "showResult");
        this.__selectedLevel = new ObservedPropertySimplePU('Base', this, "selectedLevel");
        this.__isCombinationMode = new ObservedPropertySimplePU(false, this, "isCombinationMode");
        this.__combinationElements = new ObservedPropertyObjectPU([], this, "combinationElements");
        this.__combinationBaseValues = new ObservedPropertyObjectPU([], this, "combinationBaseValues");
        this.__combinationList = new ObservedPropertyObjectPU([], this, "combinationList");
        this.elements = [
            '1T', '1S', '1Lo', '1F', '1Lz', '1A',
            '2T', '2S', '2Lo', '2F', '2Lz', '2A',
            '3T', '3S', '3Lo', '3F', '3Lz', '3A',
            '4T', '4S', '4Lo', '4F', '4Lz', '4A'
        ];
        this.baseValues = new Map([
            ['1T', 0.4], ['1S', 0.4], ['1Lo', 0.5], ['1F', 0.8], ['1Lz', 0.6], ['1A', 1.1],
            ['2T', 1.3], ['2S', 1.3], ['2Lo', 1.7], ['2F', 2.6], ['2Lz', 2.1], ['2A', 3.3],
            ['3T', 4.2], ['3S', 4.3], ['3Lo', 4.9], ['3F', 5.3], ['3Lz', 5.9], ['3A', 8.0],
            ['4T', 9.5], ['4S', 9.7], ['4Lo', 10.5], ['4F', 11.0], ['4Lz', 11.5], ['4A', 12.5]
        ]);
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: FigureSkatingPage_Params) {
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
        if (params.showResult !== undefined) {
            this.showResult = params.showResult;
        }
        if (params.selectedLevel !== undefined) {
            this.selectedLevel = params.selectedLevel;
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
        this.__currentElement.purgeDependencyOnElmtId(rmElmtId);
        this.__baseValue.purgeDependencyOnElmtId(rmElmtId);
        this.__goeScores.purgeDependencyOnElmtId(rmElmtId);
        this.__totalScore.purgeDependencyOnElmtId(rmElmtId);
        this.__elementsList.purgeDependencyOnElmtId(rmElmtId);
        this.__showResult.purgeDependencyOnElmtId(rmElmtId);
        this.__selectedLevel.purgeDependencyOnElmtId(rmElmtId);
        this.__isCombinationMode.purgeDependencyOnElmtId(rmElmtId);
        this.__combinationElements.purgeDependencyOnElmtId(rmElmtId);
        this.__combinationBaseValues.purgeDependencyOnElmtId(rmElmtId);
        this.__combinationList.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__currentElement.aboutToBeDeleted();
        this.__baseValue.aboutToBeDeleted();
        this.__goeScores.aboutToBeDeleted();
        this.__totalScore.aboutToBeDeleted();
        this.__elementsList.aboutToBeDeleted();
        this.__showResult.aboutToBeDeleted();
        this.__selectedLevel.aboutToBeDeleted();
        this.__isCombinationMode.aboutToBeDeleted();
        this.__combinationElements.aboutToBeDeleted();
        this.__combinationBaseValues.aboutToBeDeleted();
        this.__combinationList.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
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
    private __goeScores: ObservedPropertyObjectPU<Array<string>>;
    get goeScores() {
        return this.__goeScores.get();
    }
    set goeScores(newValue: Array<string>) {
        this.__goeScores.set(newValue);
    }
    private __totalScore: ObservedPropertySimplePU<string>;
    get totalScore() {
        return this.__totalScore.get();
    }
    set totalScore(newValue: string) {
        this.__totalScore.set(newValue);
    }
    private __elementsList: ObservedPropertyObjectPU<Array<SkatingScore>>;
    get elementsList() {
        return this.__elementsList.get();
    }
    set elementsList(newValue: Array<SkatingScore>) {
        this.__elementsList.set(newValue);
    }
    private __showResult: ObservedPropertySimplePU<boolean>;
    get showResult() {
        return this.__showResult.get();
    }
    set showResult(newValue: boolean) {
        this.__showResult.set(newValue);
    }
    private __selectedLevel: ObservedPropertySimplePU<string>;
    get selectedLevel() {
        return this.__selectedLevel.get();
    }
    set selectedLevel(newValue: string) {
        this.__selectedLevel.set(newValue);
    }
    // 连跳相关状态
    private __isCombinationMode: ObservedPropertySimplePU<boolean>;
    get isCombinationMode() {
        return this.__isCombinationMode.get();
    }
    set isCombinationMode(newValue: boolean) {
        this.__isCombinationMode.set(newValue);
    }
    private __combinationElements: ObservedPropertyObjectPU<Array<string>>;
    get combinationElements() {
        return this.__combinationElements.get();
    }
    set combinationElements(newValue: Array<string>) {
        this.__combinationElements.set(newValue);
    }
    private __combinationBaseValues: ObservedPropertyObjectPU<Array<number>>;
    get combinationBaseValues() {
        return this.__combinationBaseValues.get();
    }
    set combinationBaseValues(newValue: Array<number>) {
        this.__combinationBaseValues.set(newValue);
    }
    private __combinationList: ObservedPropertyObjectPU<Array<CombinationJump>>;
    get combinationList() {
        return this.__combinationList.get();
    }
    set combinationList(newValue: Array<CombinationJump>) {
        this.__combinationList.set(newValue);
    }
    private elements: Array<string>;
    private baseValues: Map<string, number>;
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.height('100%');
            Column.backgroundColor('#F0F0F0');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 标题
            Text.create('花样滑冰计分计算器');
            // 标题
            Text.fontSize(24);
            // 标题
            Text.fontWeight(FontWeight.Bold);
            // 标题
            Text.margin({ top: 20, bottom: 20 });
        }, Text);
        // 标题
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 总分显示
            Column.create();
            // 总分显示
            Column.width('90%');
            // 总分显示
            Column.height(100);
            // 总分显示
            Column.justifyContent(FlexAlign.Center);
            // 总分显示
            Column.backgroundColor('#F5F5F5');
            // 总分显示
            Column.borderRadius(10);
            // 总分显示
            Column.margin({ bottom: 20 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('总分');
            Text.fontSize(16);
            Text.fontColor('#666666');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.totalScore);
            Text.fontSize(36);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#FF6B6B');
        }, Text);
        Text.pop();
        // 总分显示
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 模式切换按钮
            Row.create();
            // 模式切换按钮
            Row.width('90%');
            // 模式切换按钮
            Row.justifyContent(FlexAlign.SpaceBetween);
            // 模式切换按钮
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
        // 模式切换按钮
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 动作选择区域
            Column.create();
            // 动作选择区域
            Column.width('90%');
            // 动作选择区域
            Column.padding(15);
            // 动作选择区域
            Column.backgroundColor(Color.White);
            // 动作选择区域
            Column.borderRadius(10);
            // 动作选择区域
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
                            // 连跳模式：直接添加到连跳组合
                            if (this.combinationElements.length < 3 && !this.combinationElements.includes(element)) {
                                const baseVal = this.baseValues.get(element) || 0;
                                this.combinationElements.push(element);
                                this.combinationBaseValues.push(baseVal);
                            }
                        }
                        else {
                            // 单跳模式：选择当前动作
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
        // 动作选择区域
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            // 连跳模式：显示已选择的连跳组合
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
                        Text.create(this.combinationBaseValues.map(v => v.toFixed(2)).join(' + '));
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
            // 单跳模式：基础分值显示
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            // 单跳模式：基础分值显示
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
            // GOE评分区域
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            // GOE评分区域
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
                        // 添加动作按钮
                        Row.create();
                        // 添加动作按钮
                        Row.width('90%');
                        // 添加动作按钮
                        Row.justifyContent(FlexAlign.SpaceBetween);
                        // 添加动作按钮
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
                    // 添加动作按钮
                    Row.pop();
                });
            }
            // 已添加动作列表
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            // 已添加动作列表
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
                        // 单跳列表
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
                    // 单跳列表
                    ForEach.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        // 连跳列表
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
                                Text.create(`各基础: ${item.baseValues.map(v => v.toFixed(2)).join(' + ')}`);
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
                    // 连跳列表
                    ForEach.pop();
                    Column.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        // 计算总分按钮
                        Button.createWithLabel('计算总分');
                        // 计算总分按钮
                        Button.width('90%');
                        // 计算总分按钮
                        Button.height(50);
                        // 计算总分按钮
                        Button.fontSize(18);
                        // 计算总分按钮
                        Button.backgroundColor('#FF6B6B');
                        // 计算总分按钮
                        Button.onClick(() => {
                            this.calculateTotal();
                        });
                    }, Button);
                    // 计算总分按钮
                    Button.pop();
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
    updateBaseValue() {
        const value = this.baseValues.get(this.currentElement);
        if (value !== undefined) {
            this.baseValue = value.toFixed(2);
        }
    }
    addElement() {
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
    removeElement(index: number) {
        this.elementsList.splice(index, 1);
        this.calculateTotal();
    }
    clearCurrent() {
        this.currentElement = '';
        this.baseValue = '';
        this.goeScores = ['', '', '', '', '', '', '', '', ''];
    }
    calculateTotal() {
        let total = 0;
        for (const item of this.elementsList) {
            total += item.finalScore;
        }
        for (const item of this.combinationList) {
            total += item.finalScore;
        }
        this.totalScore = total.toFixed(2);
    }
    // 连跳相关方法
    addToCombination() {
        if (this.currentElement === '' || this.combinationElements.length >= 3) {
            return;
        }
        const baseVal = this.baseValues.get(this.currentElement) || 0;
        this.combinationElements.push(this.currentElement);
        this.combinationBaseValues.push(baseVal);
        this.currentElement = '';
        this.baseValue = '';
    }
    addCombination() {
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
        const combination = ScoreCalculator.createCombinationJump([...this.combinationElements], [...this.combinationBaseValues], goeValues);
        this.combinationList.push(combination);
        this.clearCombination();
    }
    removeCombination(index: number) {
        this.combinationList.splice(index, 1);
        this.calculateTotal();
    }
    clearCombination() {
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
