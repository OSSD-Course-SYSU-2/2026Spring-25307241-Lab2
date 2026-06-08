if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface ActionGuessPage_Params {
    currentQuestion?: GuessQuestion | null;
    selectedAnswer?: number;
    showResult?: boolean;
    score?: number;
    totalQuestions?: number;
    streak?: number;
    gameMode?: string;
    questions?: GuessQuestion[];
}
import { IceNavBar } from "@bundle:com.example.simplecalculator/entry/ets/common/components/IceNavBar";
import { IceTag } from "@bundle:com.example.simplecalculator/entry/ets/common/components/IceTag";
class ActionGuessPage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__currentQuestion = new ObservedPropertyObjectPU(null, this, "currentQuestion");
        this.__selectedAnswer = new ObservedPropertySimplePU(-1, this, "selectedAnswer");
        this.__showResult = new ObservedPropertySimplePU(false, this, "showResult");
        this.__score = new ObservedPropertySimplePU(0, this, "score");
        this.__totalQuestions = new ObservedPropertySimplePU(0, this, "totalQuestions");
        this.__streak = new ObservedPropertySimplePU(0, this, "streak");
        this.__gameMode = new ObservedPropertySimplePU('action', this, "gameMode");
        this.questions = [
            {
                id: '1',
                type: 'action',
                emoji: '🦘',
                hint: '这是花样滑冰中最难的一种跳跃',
                options: ['阿克塞尔跳', '鲁兹跳', '萨霍夫跳', '后外点冰跳'],
                correctAnswer: 0,
                explanation: '阿克塞尔跳(Axel)是唯一向前起跳的跳跃，难度最高，基础分值也最大。',
                difficulty: 'advanced'
            },
            {
                id: '2',
                type: 'action',
                emoji: '🔄',
                hint: '这是一种直立旋转，手臂呈特定姿势',
                options: ['弓身旋转', '贝尔曼旋转', '直立旋转', '蹲转'],
                correctAnswer: 2,
                explanation: '直立旋转(Upright Spin)是最基础的旋转类型，选手保持直立姿势旋转。',
                difficulty: 'beginner'
            },
            {
                id: '3',
                type: 'difficulty',
                emoji: '⚡',
                hint: '这个动作的基础分值是11.50',
                options: ['4T (四周后外点冰)', '4S (四周萨霍夫)', '4Lz (四周鲁兹)', '4A (四周阿克塞尔)'],
                correctAnswer: 2,
                explanation: '四周鲁兹跳(4Lz)的基础分值是11.50分，是四周跳中难度第二高的跳跃。',
                difficulty: 'intermediate'
            },
            {
                id: '4',
                type: 'action',
                emoji: '💃',
                hint: '这是冰上舞蹈特有的动作',
                options: ['托举', '螺旋线', '捻转托举', '双人联合旋转'],
                correctAnswer: 1,
                explanation: '螺旋线(Spiral Sequence)是冰上舞蹈的特色动作，女选手在冰上滑行时保持优美姿势。',
                difficulty: 'intermediate'
            },
            {
                id: '5',
                type: 'difficulty',
                emoji: '🎯',
                hint: '这个动作需要选手蹲下旋转',
                options: ['直立旋转', '蹲转', '弓身旋转', '飞旋转'],
                correctAnswer: 1,
                explanation: '蹲转(Sit Spin)要求选手在旋转时保持蹲姿，是大纲中规定的旋转类型之一。',
                difficulty: 'beginner'
            }
        ];
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: ActionGuessPage_Params) {
        if (params.currentQuestion !== undefined) {
            this.currentQuestion = params.currentQuestion;
        }
        if (params.selectedAnswer !== undefined) {
            this.selectedAnswer = params.selectedAnswer;
        }
        if (params.showResult !== undefined) {
            this.showResult = params.showResult;
        }
        if (params.score !== undefined) {
            this.score = params.score;
        }
        if (params.totalQuestions !== undefined) {
            this.totalQuestions = params.totalQuestions;
        }
        if (params.streak !== undefined) {
            this.streak = params.streak;
        }
        if (params.gameMode !== undefined) {
            this.gameMode = params.gameMode;
        }
        if (params.questions !== undefined) {
            this.questions = params.questions;
        }
    }
    updateStateVars(params: ActionGuessPage_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__currentQuestion.purgeDependencyOnElmtId(rmElmtId);
        this.__selectedAnswer.purgeDependencyOnElmtId(rmElmtId);
        this.__showResult.purgeDependencyOnElmtId(rmElmtId);
        this.__score.purgeDependencyOnElmtId(rmElmtId);
        this.__totalQuestions.purgeDependencyOnElmtId(rmElmtId);
        this.__streak.purgeDependencyOnElmtId(rmElmtId);
        this.__gameMode.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__currentQuestion.aboutToBeDeleted();
        this.__selectedAnswer.aboutToBeDeleted();
        this.__showResult.aboutToBeDeleted();
        this.__score.aboutToBeDeleted();
        this.__totalQuestions.aboutToBeDeleted();
        this.__streak.aboutToBeDeleted();
        this.__gameMode.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __currentQuestion: ObservedPropertyObjectPU<GuessQuestion | null>;
    get currentQuestion() {
        return this.__currentQuestion.get();
    }
    set currentQuestion(newValue: GuessQuestion | null) {
        this.__currentQuestion.set(newValue);
    }
    private __selectedAnswer: ObservedPropertySimplePU<number>;
    get selectedAnswer() {
        return this.__selectedAnswer.get();
    }
    set selectedAnswer(newValue: number) {
        this.__selectedAnswer.set(newValue);
    }
    private __showResult: ObservedPropertySimplePU<boolean>;
    get showResult() {
        return this.__showResult.get();
    }
    set showResult(newValue: boolean) {
        this.__showResult.set(newValue);
    }
    private __score: ObservedPropertySimplePU<number>;
    get score() {
        return this.__score.get();
    }
    set score(newValue: number) {
        this.__score.set(newValue);
    }
    private __totalQuestions: ObservedPropertySimplePU<number>;
    get totalQuestions() {
        return this.__totalQuestions.get();
    }
    set totalQuestions(newValue: number) {
        this.__totalQuestions.set(newValue);
    }
    private __streak: ObservedPropertySimplePU<number>; // 连续答对次数
    get streak() {
        return this.__streak.get();
    }
    set streak(newValue: number) {
        this.__streak.set(newValue);
    }
    private __gameMode: ObservedPropertySimplePU<string>; // action, difficulty
    get gameMode() {
        return this.__gameMode.get();
    }
    set gameMode(newValue: string) {
        this.__gameMode.set(newValue);
    }
    // 题库
    private questions: GuessQuestion[];
    aboutToAppear() {
        this.loadRandomQuestion();
    }
    loadRandomQuestion() {
        const randomIndex = Math.floor(Math.random() * this.questions.length);
        this.currentQuestion = this.questions[randomIndex];
        this.selectedAnswer = -1;
        this.showResult = false;
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
                        title: '动作猜猜看',
                        showBack: true,
                        navBackgroundColor: '#4FC3F7'
                    }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/ActionGuessPage.ets", line: 89, col: 7 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            title: '动作猜猜看',
                            showBack: true,
                            navBackgroundColor: '#4FC3F7'
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        title: '动作猜猜看',
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
        // 游戏状态栏
        this.buildGameStatus.bind(this)();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            // 题目区域
            if (this.currentQuestion) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.buildQuestionArea.bind(this)();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        // 内容区
        Column.pop();
        Column.pop();
    }
    // 游戏状态栏
    buildGameStatus(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.padding(16);
            Row.backgroundColor('#FFFFFF');
            Row.margin({ bottom: 16 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.layoutWeight(1);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('得分');
            Text.fontSize(12);
            Text.fontColor('#999999');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.score.toString());
            Text.fontSize(20);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#4FC3F7');
        }, Text);
        Text.pop();
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.layoutWeight(1);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('题目');
            Text.fontSize(12);
            Text.fontColor('#999999');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.totalQuestions.toString());
            Text.fontSize(20);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#666666');
        }, Text);
        Text.pop();
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.layoutWeight(1);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('连胜');
            Text.fontSize(12);
            Text.fontColor('#999999');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.streak.toString());
            Text.fontSize(20);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#FFA726');
        }, Text);
        Text.pop();
        Column.pop();
        Row.pop();
    }
    // 题目区域
    buildQuestionArea(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Scroll.create();
            Scroll.layoutWeight(1);
            Scroll.scrollBar(BarState.Auto);
        }, Scroll);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.padding(16);
        }, Column);
        // 题目卡片
        this.buildQuestionCard.bind(this)();
        // 选项列表
        this.buildOptionsList.bind(this)();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            // 结果解析
            if (this.showResult) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.buildResultExplanation.bind(this)();
                    // 下一题按钮
                    this.buildNextButton.bind(this)();
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
    buildQuestionCard(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.padding(20);
            Column.backgroundColor('#FFFFFF');
            Column.borderRadius(12);
            Column.margin({ bottom: 16 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // Emoji图标
            Column.create();
            // Emoji图标
            Column.width('100%');
            // Emoji图标
            Column.height(150);
            // Emoji图标
            Column.justifyContent(FlexAlign.Center);
            // Emoji图标
            Column.backgroundColor('#E3F2FD');
            // Emoji图标
            Column.borderRadius(12);
            // Emoji图标
            Column.margin({ bottom: 16 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.currentQuestion!.emoji);
            Text.fontSize(80);
        }, Text);
        Text.pop();
        // Emoji图标
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 题目类型标签
            Row.create();
            // 题目类型标签
            Row.width('100%');
            // 题目类型标签
            Row.margin({ bottom: 12 });
        }, Row);
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new IceTag(this, {
                        text: this.currentQuestion!.type === 'action' ? '猜动作' : '猜难度',
                        type: 'primary',
                        tagSize: 'small'
                    }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/ActionGuessPage.ets", line: 198, col: 9 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            text: this.currentQuestion!.type === 'action' ? '猜动作' : '猜难度',
                            type: 'primary',
                            tagSize: 'small'
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        text: this.currentQuestion!.type === 'action' ? '猜动作' : '猜难度',
                        type: 'primary',
                        tagSize: 'small'
                    });
                }
            }, { name: "IceTag" });
        }
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
        }, Blank);
        Blank.pop();
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new IceTag(this, {
                        text: this.getDifficultyName(this.currentQuestion!.difficulty),
                        type: this.currentQuestion!.difficulty === 'beginner' ? 'success' :
                            this.currentQuestion!.difficulty === 'intermediate' ? 'warning' : 'danger',
                        tagSize: 'small'
                    }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/ActionGuessPage.ets", line: 206, col: 9 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            text: this.getDifficultyName(this.currentQuestion!.difficulty),
                            type: this.currentQuestion!.difficulty === 'beginner' ? 'success' :
                                this.currentQuestion!.difficulty === 'intermediate' ? 'warning' : 'danger',
                            tagSize: 'small'
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        text: this.getDifficultyName(this.currentQuestion!.difficulty),
                        type: this.currentQuestion!.difficulty === 'beginner' ? 'success' :
                            this.currentQuestion!.difficulty === 'intermediate' ? 'warning' : 'danger',
                        tagSize: 'small'
                    });
                }
            }, { name: "IceTag" });
        }
        // 题目类型标签
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 提示文字
            Text.create('💡 提示：' + this.currentQuestion!.hint);
            // 提示文字
            Text.fontSize(16);
            // 提示文字
            Text.fontColor('#333333');
            // 提示文字
            Text.lineHeight(24);
            // 提示文字
            Text.textAlign(TextAlign.Center);
        }, Text);
        // 提示文字
        Text.pop();
        Column.pop();
    }
    buildOptionsList(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = (_item, index: number) => {
                const option = _item;
                this.OptionItem.bind(this)(option, index);
            };
            this.forEachUpdateFunction(elmtId, this.currentQuestion!.options, forEachItemGenFunction, (option: string, index: number) => index.toString(), true, true);
        }, ForEach);
        ForEach.pop();
        Column.pop();
    }
    OptionItem(option: string, index: number, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.padding(16);
            Row.backgroundColor(this.getOptionBackgroundColor(index));
            Row.borderRadius(12);
            Row.margin({ bottom: 12 });
            Row.onClick(() => {
                if (!this.showResult) {
                    this.selectedAnswer = index;
                    this.showResult = true;
                    this.totalQuestions++;
                    if (index === this.currentQuestion!.correctAnswer) {
                        this.score += 10;
                        this.streak++;
                    }
                    else {
                        this.streak = 0;
                    }
                }
            });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(String.fromCharCode(65 + index));
            Text.fontSize(16);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor(this.getOptionTextColor(index));
            Text.width(30);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(option);
            Text.fontSize(16);
            Text.fontColor(this.getOptionTextColor(index));
            Text.layoutWeight(1);
        }, Text);
        Text.pop();
        Row.pop();
    }
    buildResultExplanation(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.padding(16);
            Column.backgroundColor('#F5F5F5');
            Column.borderRadius(12);
            Column.margin({ bottom: 16 });
            Column.alignItems(HorizontalAlign.Start);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.margin({ bottom: 12 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.selectedAnswer === this.currentQuestion!.correctAnswer) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('✅ 回答正确！');
                        Text.fontSize(16);
                        Text.fontWeight(FontWeight.Bold);
                        Text.fontColor('#4CAF50');
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        If.create();
                        if (this.streak > 1) {
                            this.ifElseBranchUpdateFunction(0, () => {
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    Text.create(` 连胜 ${this.streak} 题！`);
                                    Text.fontSize(14);
                                    Text.fontColor('#FFA726');
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
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('❌ 回答错误');
                        Text.fontSize(16);
                        Text.fontWeight(FontWeight.Bold);
                        Text.fontColor('#F44336');
                    }, Text);
                    Text.pop();
                });
            }
        }, If);
        If.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('正确答案：' + this.currentQuestion!.options[this.currentQuestion!.correctAnswer]);
            Text.fontSize(14);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#333333');
            Text.margin({ bottom: 8 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('解析：' + this.currentQuestion!.explanation);
            Text.fontSize(14);
            Text.fontColor('#666666');
            Text.lineHeight(22);
        }, Text);
        Text.pop();
        Column.pop();
    }
    buildNextButton(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('下一题');
            Button.width('100%');
            Button.height(50);
            Button.backgroundColor('#4FC3F7');
            Button.fontColor('#FFFFFF');
            Button.fontSize(16);
            Button.fontWeight(FontWeight.Bold);
            Button.borderRadius(25);
            Button.onClick(() => {
                this.loadRandomQuestion();
            });
        }, Button);
        Button.pop();
    }
    // 辅助方法
    private getOptionBackgroundColor(index: number): string {
        if (!this.showResult) {
            return this.selectedAnswer === index ? '#E3F2FD' : '#FFFFFF';
        }
        else {
            if (index === this.currentQuestion!.correctAnswer) {
                return '#E8F5E9';
            }
            else if (index === this.selectedAnswer) {
                return '#FFEBEE';
            }
            else {
                return '#FFFFFF';
            }
        }
    }
    private getOptionTextColor(index: number): string {
        if (!this.showResult) {
            return this.selectedAnswer === index ? '#1976D2' : '#333333';
        }
        else {
            if (index === this.currentQuestion!.correctAnswer) {
                return '#4CAF50';
            }
            else if (index === this.selectedAnswer) {
                return '#F44336';
            }
            else {
                return '#333333';
            }
        }
    }
    private getDifficultyName(difficulty: string): string {
        const names: Record<string, string> = {
            'beginner': '简单',
            'intermediate': '中等',
            'advanced': '困难'
        };
        return names[difficulty] || difficulty;
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "ActionGuessPage";
    }
}
// 数据类型
interface GuessQuestion {
    id: string;
    type: string; // action, difficulty
    emoji: string;
    hint: string;
    options: string[];
    correctAnswer: number;
    explanation: string;
    difficulty: string;
}
registerNamedRoute(() => new ActionGuessPage(undefined, {}), "", { bundleName: "com.example.simplecalculator", moduleName: "entry", pagePath: "pages/ActionGuessPage", pageFullPath: "entry/src/main/ets/pages/ActionGuessPage", integratedHsp: "false", moduleType: "followWithHap" });
