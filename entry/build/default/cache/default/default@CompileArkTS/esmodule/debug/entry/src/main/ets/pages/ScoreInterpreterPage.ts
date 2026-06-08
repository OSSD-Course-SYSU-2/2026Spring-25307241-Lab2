if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface ScoreInterpreterPage_Params {
    totalScore?: string;
    tesScore?: string;
    pcsScore?: string;
    deductions?: string;
    showResult?: boolean;
    exampleScores?: ExampleScore[];
}
import { IceNavBar } from "@bundle:com.example.simplecalculator/entry/ets/common/components/IceNavBar";
import { IceCard } from "@bundle:com.example.simplecalculator/entry/ets/common/components/IceCard";
class ScoreInterpreterPage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__totalScore = new ObservedPropertySimplePU('', this, "totalScore");
        this.__tesScore = new ObservedPropertySimplePU('', this, "tesScore");
        this.__pcsScore = new ObservedPropertySimplePU('', this, "pcsScore");
        this.__deductions = new ObservedPropertySimplePU('0', this, "deductions");
        this.__showResult = new ObservedPropertySimplePU(false, this, "showResult");
        this.exampleScores = [
            {
                skater: '羽生结弦',
                competition: '2019大奖赛总决赛',
                segment: 'FS',
                totalScore: 195.71,
                tes: 106.02,
                pcs: 90.69,
                deductions: -1.00,
                elements: [
                    { name: '4T', baseValue: 9.50, goe: 2.85, finalValue: 12.35, quality: 'excellent' },
                    { name: '4T+3T', baseValue: 13.50, goe: 3.80, finalValue: 17.30, quality: 'excellent' },
                    { name: '3A', baseValue: 8.00, goe: 2.40, finalValue: 10.40, quality: 'good' },
                    { name: '3F+3Lo', baseValue: 10.00, goe: 2.50, finalValue: 12.50, quality: 'good' }
                ],
                components: [
                    { name: '滑行技术', score: 9.25 },
                    { name: '动作衔接', score: 9.00 },
                    { name: '表演表现', score: 9.25 },
                    { name: '编排构图', score: 9.00 },
                    { name: '音乐诠释', score: 9.25 }
                ]
            }
        ];
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: ScoreInterpreterPage_Params) {
        if (params.totalScore !== undefined) {
            this.totalScore = params.totalScore;
        }
        if (params.tesScore !== undefined) {
            this.tesScore = params.tesScore;
        }
        if (params.pcsScore !== undefined) {
            this.pcsScore = params.pcsScore;
        }
        if (params.deductions !== undefined) {
            this.deductions = params.deductions;
        }
        if (params.showResult !== undefined) {
            this.showResult = params.showResult;
        }
        if (params.exampleScores !== undefined) {
            this.exampleScores = params.exampleScores;
        }
    }
    updateStateVars(params: ScoreInterpreterPage_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__totalScore.purgeDependencyOnElmtId(rmElmtId);
        this.__tesScore.purgeDependencyOnElmtId(rmElmtId);
        this.__pcsScore.purgeDependencyOnElmtId(rmElmtId);
        this.__deductions.purgeDependencyOnElmtId(rmElmtId);
        this.__showResult.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__totalScore.aboutToBeDeleted();
        this.__tesScore.aboutToBeDeleted();
        this.__pcsScore.aboutToBeDeleted();
        this.__deductions.aboutToBeDeleted();
        this.__showResult.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __totalScore: ObservedPropertySimplePU<string>;
    get totalScore() {
        return this.__totalScore.get();
    }
    set totalScore(newValue: string) {
        this.__totalScore.set(newValue);
    }
    private __tesScore: ObservedPropertySimplePU<string>;
    get tesScore() {
        return this.__tesScore.get();
    }
    set tesScore(newValue: string) {
        this.__tesScore.set(newValue);
    }
    private __pcsScore: ObservedPropertySimplePU<string>;
    get pcsScore() {
        return this.__pcsScore.get();
    }
    set pcsScore(newValue: string) {
        this.__pcsScore.set(newValue);
    }
    private __deductions: ObservedPropertySimplePU<string>;
    get deductions() {
        return this.__deductions.get();
    }
    set deductions(newValue: string) {
        this.__deductions.set(newValue);
    }
    private __showResult: ObservedPropertySimplePU<boolean>;
    get showResult() {
        return this.__showResult.get();
    }
    set showResult(newValue: boolean) {
        this.__showResult.set(newValue);
    }
    // 示例数据
    private exampleScores: ExampleScore[];
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
                        title: '打分解读',
                        showBack: true,
                        navBackgroundColor: '#E91E63'
                    }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/ScoreInterpreterPage.ets", line: 49, col: 7 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            title: '打分解读',
                            showBack: true,
                            navBackgroundColor: '#E91E63'
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        title: '打分解读',
                        showBack: true,
                        navBackgroundColor: '#E91E63'
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
            Column.padding(16);
        }, Column);
        // 介绍横幅
        this.buildIntroBanner.bind(this)();
        // 输入区域
        this.buildInputArea.bind(this)();
        // 示例数据
        this.buildExampleData.bind(this)();
        // 评分知识
        this.buildScoringKnowledge.bind(this)();
        Column.pop();
        // 内容区
        Scroll.pop();
        Column.pop();
    }
    // 介绍横幅
    buildIntroBanner(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.height(150);
            Column.justifyContent(FlexAlign.Center);
            Column.linearGradient({
                angle: 135,
                colors: [['#E91E63', 0.0], ['#C2185B', 1.0]]
            });
            Column.borderRadius(16);
            Column.margin({ bottom: 20 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('📊 打分解读工具');
            Text.fontSize(24);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#FFFFFF');
            Text.margin({ bottom: 8 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('输入分数，自动拆解技术分与内容分');
            Text.fontSize(14);
            Text.fontColor('rgba(255,255,255,0.8)');
        }, Text);
        Text.pop();
        Column.pop();
    }
    // 输入区域
    buildInputArea(parent = null) {
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new IceCard(this, {
                        title: '✏️ 输入分数',
                        content: () => {
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Column.create();
                                Column.width('100%');
                            }, Column);
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                // 总分输入
                                Row.create();
                                // 总分输入
                                Row.width('100%');
                                // 总分输入
                                Row.margin({ bottom: 16 });
                            }, Row);
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Text.create('总分');
                                Text.fontSize(14);
                                Text.fontColor('#333333');
                                Text.width(80);
                            }, Text);
                            Text.pop();
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                TextInput.create({ placeholder: '请输入总分', text: this.totalScore });
                                TextInput.fontSize(14);
                                TextInput.layoutWeight(1);
                                TextInput.height(40);
                                TextInput.backgroundColor('#F5F5F5');
                                TextInput.borderRadius(8);
                                TextInput.onChange((value: string) => {
                                    this.totalScore = value;
                                });
                            }, TextInput);
                            // 总分输入
                            Row.pop();
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                // 技术分输入
                                Row.create();
                                // 技术分输入
                                Row.width('100%');
                                // 技术分输入
                                Row.margin({ bottom: 16 });
                            }, Row);
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Text.create('技术分TES');
                                Text.fontSize(14);
                                Text.fontColor('#333333');
                                Text.width(80);
                            }, Text);
                            Text.pop();
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                TextInput.create({ placeholder: '请输入技术分', text: this.tesScore });
                                TextInput.fontSize(14);
                                TextInput.layoutWeight(1);
                                TextInput.height(40);
                                TextInput.backgroundColor('#F5F5F5');
                                TextInput.borderRadius(8);
                                TextInput.onChange((value: string) => {
                                    this.tesScore = value;
                                });
                            }, TextInput);
                            // 技术分输入
                            Row.pop();
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                // 内容分输入
                                Row.create();
                                // 内容分输入
                                Row.width('100%');
                                // 内容分输入
                                Row.margin({ bottom: 16 });
                            }, Row);
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Text.create('内容分PCS');
                                Text.fontSize(14);
                                Text.fontColor('#333333');
                                Text.width(80);
                            }, Text);
                            Text.pop();
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                TextInput.create({ placeholder: '请输入内容分', text: this.pcsScore });
                                TextInput.fontSize(14);
                                TextInput.layoutWeight(1);
                                TextInput.height(40);
                                TextInput.backgroundColor('#F5F5F5');
                                TextInput.borderRadius(8);
                                TextInput.onChange((value: string) => {
                                    this.pcsScore = value;
                                });
                            }, TextInput);
                            // 内容分输入
                            Row.pop();
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                // 扣分输入
                                Row.create();
                                // 扣分输入
                                Row.width('100%');
                                // 扣分输入
                                Row.margin({ bottom: 20 });
                            }, Row);
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Text.create('扣分');
                                Text.fontSize(14);
                                Text.fontColor('#333333');
                                Text.width(80);
                            }, Text);
                            Text.pop();
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                TextInput.create({ placeholder: '请输入扣分（默认0）', text: this.deductions });
                                TextInput.fontSize(14);
                                TextInput.layoutWeight(1);
                                TextInput.height(40);
                                TextInput.backgroundColor('#F5F5F5');
                                TextInput.borderRadius(8);
                                TextInput.onChange((value: string) => {
                                    this.deductions = value;
                                });
                            }, TextInput);
                            // 扣分输入
                            Row.pop();
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                // 解析按钮
                                Button.createWithLabel('🔍 解析分数');
                                // 解析按钮
                                Button.width('100%');
                                // 解析按钮
                                Button.height(48);
                                // 解析按钮
                                Button.fontSize(16);
                                // 解析按钮
                                Button.fontWeight(FontWeight.Bold);
                                // 解析按钮
                                Button.backgroundColor('#E91E63');
                                // 解析按钮
                                Button.fontColor('#FFFFFF');
                                // 解析按钮
                                Button.borderRadius(24);
                                // 解析按钮
                                Button.onClick(() => {
                                    this.showResult = true;
                                });
                            }, Button);
                            // 解析按钮
                            Button.pop();
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                If.create();
                                // 解析结果
                                if (this.showResult && this.tesScore && this.pcsScore) {
                                    this.ifElseBranchUpdateFunction(0, () => {
                                        this.buildScoreResult.bind(this)();
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
                    }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/ScoreInterpreterPage.ets", line: 109, col: 5 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            title: '✏️ 输入分数',
                            content: () => {
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    Column.create();
                                    Column.width('100%');
                                }, Column);
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    // 总分输入
                                    Row.create();
                                    // 总分输入
                                    Row.width('100%');
                                    // 总分输入
                                    Row.margin({ bottom: 16 });
                                }, Row);
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    Text.create('总分');
                                    Text.fontSize(14);
                                    Text.fontColor('#333333');
                                    Text.width(80);
                                }, Text);
                                Text.pop();
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    TextInput.create({ placeholder: '请输入总分', text: this.totalScore });
                                    TextInput.fontSize(14);
                                    TextInput.layoutWeight(1);
                                    TextInput.height(40);
                                    TextInput.backgroundColor('#F5F5F5');
                                    TextInput.borderRadius(8);
                                    TextInput.onChange((value: string) => {
                                        this.totalScore = value;
                                    });
                                }, TextInput);
                                // 总分输入
                                Row.pop();
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    // 技术分输入
                                    Row.create();
                                    // 技术分输入
                                    Row.width('100%');
                                    // 技术分输入
                                    Row.margin({ bottom: 16 });
                                }, Row);
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    Text.create('技术分TES');
                                    Text.fontSize(14);
                                    Text.fontColor('#333333');
                                    Text.width(80);
                                }, Text);
                                Text.pop();
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    TextInput.create({ placeholder: '请输入技术分', text: this.tesScore });
                                    TextInput.fontSize(14);
                                    TextInput.layoutWeight(1);
                                    TextInput.height(40);
                                    TextInput.backgroundColor('#F5F5F5');
                                    TextInput.borderRadius(8);
                                    TextInput.onChange((value: string) => {
                                        this.tesScore = value;
                                    });
                                }, TextInput);
                                // 技术分输入
                                Row.pop();
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    // 内容分输入
                                    Row.create();
                                    // 内容分输入
                                    Row.width('100%');
                                    // 内容分输入
                                    Row.margin({ bottom: 16 });
                                }, Row);
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    Text.create('内容分PCS');
                                    Text.fontSize(14);
                                    Text.fontColor('#333333');
                                    Text.width(80);
                                }, Text);
                                Text.pop();
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    TextInput.create({ placeholder: '请输入内容分', text: this.pcsScore });
                                    TextInput.fontSize(14);
                                    TextInput.layoutWeight(1);
                                    TextInput.height(40);
                                    TextInput.backgroundColor('#F5F5F5');
                                    TextInput.borderRadius(8);
                                    TextInput.onChange((value: string) => {
                                        this.pcsScore = value;
                                    });
                                }, TextInput);
                                // 内容分输入
                                Row.pop();
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    // 扣分输入
                                    Row.create();
                                    // 扣分输入
                                    Row.width('100%');
                                    // 扣分输入
                                    Row.margin({ bottom: 20 });
                                }, Row);
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    Text.create('扣分');
                                    Text.fontSize(14);
                                    Text.fontColor('#333333');
                                    Text.width(80);
                                }, Text);
                                Text.pop();
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    TextInput.create({ placeholder: '请输入扣分（默认0）', text: this.deductions });
                                    TextInput.fontSize(14);
                                    TextInput.layoutWeight(1);
                                    TextInput.height(40);
                                    TextInput.backgroundColor('#F5F5F5');
                                    TextInput.borderRadius(8);
                                    TextInput.onChange((value: string) => {
                                        this.deductions = value;
                                    });
                                }, TextInput);
                                // 扣分输入
                                Row.pop();
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    // 解析按钮
                                    Button.createWithLabel('🔍 解析分数');
                                    // 解析按钮
                                    Button.width('100%');
                                    // 解析按钮
                                    Button.height(48);
                                    // 解析按钮
                                    Button.fontSize(16);
                                    // 解析按钮
                                    Button.fontWeight(FontWeight.Bold);
                                    // 解析按钮
                                    Button.backgroundColor('#E91E63');
                                    // 解析按钮
                                    Button.fontColor('#FFFFFF');
                                    // 解析按钮
                                    Button.borderRadius(24);
                                    // 解析按钮
                                    Button.onClick(() => {
                                        this.showResult = true;
                                    });
                                }, Button);
                                // 解析按钮
                                Button.pop();
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    If.create();
                                    // 解析结果
                                    if (this.showResult && this.tesScore && this.pcsScore) {
                                        this.ifElseBranchUpdateFunction(0, () => {
                                            this.buildScoreResult.bind(this)();
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
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        title: '✏️ 输入分数'
                    });
                }
            }, { name: "IceCard" });
        }
    }
    // 解析结果
    buildScoreResult(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.padding(16);
            Column.backgroundColor('#FCE4EC');
            Column.borderRadius(12);
            Column.margin({ top: 16 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Divider.create();
            Divider.color('#E0E0E0');
            Divider.margin({ top: 20, bottom: 20 });
        }, Divider);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('📊 分数解析');
            Text.fontSize(18);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#333333');
            Text.margin({ bottom: 16 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 分数构成
            Row.create();
            // 分数构成
            Row.width('100%');
            // 分数构成
            Row.margin({ bottom: 20 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.layoutWeight(1);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('技术分TES');
            Text.fontSize(14);
            Text.fontColor('#666666');
            Text.margin({ bottom: 4 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.tesScore);
            Text.fontSize(24);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#E91E63');
        }, Text);
        Text.pop();
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('+');
            Text.fontSize(20);
            Text.fontColor('#999999');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.layoutWeight(1);
            Column.margin({ left: 16, right: 16 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('内容分PCS');
            Text.fontSize(14);
            Text.fontColor('#666666');
            Text.margin({ bottom: 4 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.pcsScore);
            Text.fontSize(24);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#9C27B0');
        }, Text);
        Text.pop();
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (parseFloat(this.deductions) !== 0) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('-');
                        Text.fontSize(20);
                        Text.fontColor('#999999');
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Column.create();
                        Column.layoutWeight(1);
                    }, Column);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('扣分');
                        Text.fontSize(14);
                        Text.fontColor('#666666');
                        Text.margin({ bottom: 4 });
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(Math.abs(parseFloat(this.deductions)).toFixed(2));
                        Text.fontSize(24);
                        Text.fontWeight(FontWeight.Bold);
                        Text.fontColor('#F44336');
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
        // 分数构成
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 解读
            Column.create();
            // 解读
            Column.width('100%');
            // 解读
            Column.alignItems(HorizontalAlign.Start);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('💡 解读');
            Text.fontSize(16);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#333333');
            Text.margin({ bottom: 12 });
        }, Text);
        Text.pop();
        this.InterpretationItem.bind(this)('技术分占比', (parseFloat(this.tesScore) / (parseFloat(this.tesScore) + parseFloat(this.pcsScore)) * 100).toFixed(1) + '%', '技术分占比越高，说明跳跃、旋转等难度动作得分越高');
        this.InterpretationItem.bind(this)('内容分占比', (parseFloat(this.pcsScore) / (parseFloat(this.tesScore) + parseFloat(this.pcsScore)) * 100).toFixed(1) + '%', '内容分占比越高，说明滑行、表演、编排等艺术表现得分越高');
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (parseFloat(this.deductions) !== 0) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.InterpretationItem.bind(this)('扣分原因', Math.abs(parseFloat(this.deductions)).toFixed(2) + '分', '可能包括摔倒、超时、违规等扣分项');
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        // 解读
        Column.pop();
        Column.pop();
    }
    InterpretationItem(title: string, value: string, description: string, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.padding({ top: 8, bottom: 8 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.alignItems(HorizontalAlign.Start);
            Column.layoutWeight(1);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(title);
            Text.fontSize(14);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#333333');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(description);
            Text.fontSize(12);
            Text.fontColor('#666666');
            Text.margin({ top: 4 });
        }, Text);
        Text.pop();
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(value);
            Text.fontSize(16);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#E91E63');
        }, Text);
        Text.pop();
        Row.pop();
    }
    // 示例数据
    buildExampleData(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.alignItems(HorizontalAlign.Start);
            Column.margin({ top: 24 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('📋 示例数据');
            Text.fontSize(18);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#333333');
            Text.margin({ bottom: 16 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const example = _item;
                this.ExampleCard.bind(this)(example);
            };
            this.forEachUpdateFunction(elmtId, this.exampleScores, forEachItemGenFunction, (example: ExampleScore) => example.skater + example.competition, false, false);
        }, ForEach);
        ForEach.pop();
        Column.pop();
    }
    ExampleCard(example: ExampleScore, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.padding(16);
            Column.backgroundColor('#FFFFFF');
            Column.borderRadius(12);
            Column.shadow({
                radius: 8,
                color: '#1A000000',
                offsetX: 0,
                offsetY: 2
            });
            Column.margin({ bottom: 16 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 选手信息
            Row.create();
            // 选手信息
            Row.width('100%');
            // 选手信息
            Row.margin({ bottom: 16 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.alignItems(HorizontalAlign.Start);
            Column.layoutWeight(1);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(example.skater);
            Text.fontSize(16);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#333333');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(example.competition + ' - ' + (example.segment === 'SP' ? '短节目' : '自由滑'));
            Text.fontSize(12);
            Text.fontColor('#999999');
            Text.margin({ top: 4 });
        }, Text);
        Text.pop();
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(example.totalScore.toFixed(2));
            Text.fontSize(24);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#E91E63');
        }, Text);
        Text.pop();
        // 选手信息
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 分数构成
            Row.create();
            // 分数构成
            Row.width('100%');
            // 分数构成
            Row.margin({ bottom: 16 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.layoutWeight(1);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('技术分TES');
            Text.fontSize(12);
            Text.fontColor('#666666');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(example.tes.toFixed(2));
            Text.fontSize(18);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#E91E63');
            Text.margin({ top: 4 });
        }, Text);
        Text.pop();
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.layoutWeight(1);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('内容分PCS');
            Text.fontSize(12);
            Text.fontColor('#666666');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(example.pcs.toFixed(2));
            Text.fontSize(18);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#9C27B0');
            Text.margin({ top: 4 });
        }, Text);
        Text.pop();
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.layoutWeight(1);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('扣分');
            Text.fontSize(12);
            Text.fontColor('#666666');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(Math.abs(example.deductions).toFixed(2));
            Text.fontSize(18);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#F44336');
            Text.margin({ top: 4 });
        }, Text);
        Text.pop();
        Column.pop();
        // 分数构成
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 技术动作
            Column.create();
            // 技术动作
            Column.width('100%');
            // 技术动作
            Column.alignItems(HorizontalAlign.Start);
            // 技术动作
            Column.padding(12);
            // 技术动作
            Column.backgroundColor('#F5F5F5');
            // 技术动作
            Column.borderRadius(8);
            // 技术动作
            Column.margin({ bottom: 12 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('技术动作');
            Text.fontSize(14);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#333333');
            Text.margin({ bottom: 8 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const element = _item;
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Row.create();
                    Row.width('100%');
                    Row.padding({ top: 4, bottom: 4 });
                }, Row);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create(element.name);
                    Text.fontSize(14);
                    Text.fontColor('#333333');
                    Text.width(60);
                }, Text);
                Text.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create('基础: ' + element.baseValue.toFixed(2));
                    Text.fontSize(12);
                    Text.fontColor('#666666');
                    Text.layoutWeight(1);
                }, Text);
                Text.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create('GOE: ' + (element.goe >= 0 ? '+' : '') + element.goe.toFixed(2));
                    Text.fontSize(12);
                    Text.fontColor(element.goe >= 0 ? '#4CAF50' : '#F44336');
                    Text.width(70);
                }, Text);
                Text.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create(element.finalValue.toFixed(2));
                    Text.fontSize(14);
                    Text.fontWeight(FontWeight.Bold);
                    Text.fontColor('#E91E63');
                    Text.width(50);
                }, Text);
                Text.pop();
                Row.pop();
            };
            this.forEachUpdateFunction(elmtId, example.elements.slice(0, 3), forEachItemGenFunction, (element: ElementScore) => element.name, false, false);
        }, ForEach);
        ForEach.pop();
        // 技术动作
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 节目内容分
            Column.create();
            // 节目内容分
            Column.width('100%');
            // 节目内容分
            Column.alignItems(HorizontalAlign.Start);
            // 节目内容分
            Column.padding(12);
            // 节目内容分
            Column.backgroundColor('#F3E5F5');
            // 节目内容分
            Column.borderRadius(8);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('节目内容分');
            Text.fontSize(14);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#333333');
            Text.margin({ bottom: 8 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const component = _item;
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Row.create();
                    Row.width('100%');
                    Row.padding({ top: 4, bottom: 4 });
                }, Row);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create(component.name);
                    Text.fontSize(14);
                    Text.fontColor('#333333');
                    Text.layoutWeight(1);
                }, Text);
                Text.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create(component.score.toFixed(2));
                    Text.fontSize(14);
                    Text.fontWeight(FontWeight.Bold);
                    Text.fontColor('#9C27B0');
                }, Text);
                Text.pop();
                Row.pop();
            };
            this.forEachUpdateFunction(elmtId, example.components, forEachItemGenFunction, (component: ComponentScore) => component.name, false, false);
        }, ForEach);
        ForEach.pop();
        // 节目内容分
        Column.pop();
        Column.pop();
    }
    // 评分知识
    buildScoringKnowledge(parent = null) {
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new IceCard(this, {
                        title: '📚 评分知识',
                        cardBackgroundColor: '#E8EAF6',
                        content: () => {
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Column.create();
                                Column.width('100%');
                            }, Column);
                            this.KnowledgeItem.bind(this)('技术分TES', '跳跃、旋转、步法等动作的基础分值 + GOE加分');
                            this.KnowledgeItem.bind(this)('GOE加分', 'Grade of Execution，根据动作质量给予-5到+5的加分');
                            this.KnowledgeItem.bind(this)('内容分PCS', 'Program Component Score，包含5项评分指标');
                            this.KnowledgeItem.bind(this)('PCS五项', '滑行技术、动作衔接、表演表现、编排构图、音乐诠释');
                            this.KnowledgeItem.bind(this)('扣分项', '摔倒(-1)、超时(-1)、违规动作等');
                            Column.pop();
                        }
                    }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/ScoreInterpreterPage.ets", line: 520, col: 5 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            title: '📚 评分知识',
                            cardBackgroundColor: '#E8EAF6',
                            content: () => {
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    Column.create();
                                    Column.width('100%');
                                }, Column);
                                this.KnowledgeItem.bind(this)('技术分TES', '跳跃、旋转、步法等动作的基础分值 + GOE加分');
                                this.KnowledgeItem.bind(this)('GOE加分', 'Grade of Execution，根据动作质量给予-5到+5的加分');
                                this.KnowledgeItem.bind(this)('内容分PCS', 'Program Component Score，包含5项评分指标');
                                this.KnowledgeItem.bind(this)('PCS五项', '滑行技术、动作衔接、表演表现、编排构图、音乐诠释');
                                this.KnowledgeItem.bind(this)('扣分项', '摔倒(-1)、超时(-1)、违规动作等');
                                Column.pop();
                            }
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        title: '📚 评分知识',
                        cardBackgroundColor: '#E8EAF6'
                    });
                }
            }, { name: "IceCard" });
        }
    }
    KnowledgeItem(title: string, description: string, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.padding({ top: 8, bottom: 8 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.alignItems(HorizontalAlign.Start);
            Column.layoutWeight(1);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(title);
            Text.fontSize(14);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#333333');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(description);
            Text.fontSize(12);
            Text.fontColor('#666666');
            Text.margin({ top: 4 });
        }, Text);
        Text.pop();
        Column.pop();
        Row.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "ScoreInterpreterPage";
    }
}
// 数据类型定义
interface ExampleScore {
    skater: string;
    competition: string;
    segment: 'SP' | 'FS';
    totalScore: number;
    tes: number;
    pcs: number;
    deductions: number;
    elements: ElementScore[];
    components: ComponentScore[];
}
interface ElementScore {
    name: string;
    baseValue: number;
    goe: number;
    finalValue: number;
    quality: string;
}
interface ComponentScore {
    name: string;
    score: number;
}
registerNamedRoute(() => new ScoreInterpreterPage(undefined, {}), "", { bundleName: "com.example.simplecalculator", moduleName: "entry", pagePath: "pages/ScoreInterpreterPage", pageFullPath: "entry/src/main/ets/pages/ScoreInterpreterPage", integratedHsp: "false", moduleType: "followWithHap" });
