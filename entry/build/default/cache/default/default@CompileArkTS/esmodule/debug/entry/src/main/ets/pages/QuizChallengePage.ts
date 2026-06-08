if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface QuizChallengePage_Params {
    selectedMode?: string;
    selectedDifficulty?: string;
    currentQuestion?: QuizQuestion | null;
    selectedAnswer?: number;
    showResult?: boolean;
    score?: number;
    totalQuestions?: number;
    categories?: QuizCategory[];
    sampleQuestions?: QuizQuestion[];
}
import { IceNavBar } from "@bundle:com.example.simplecalculator/entry/ets/common/components/IceNavBar";
import { IceTag } from "@bundle:com.example.simplecalculator/entry/ets/common/components/IceTag";
class QuizChallengePage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__selectedMode = new ObservedPropertySimplePU('daily', this, "selectedMode");
        this.__selectedDifficulty = new ObservedPropertySimplePU('beginner', this, "selectedDifficulty");
        this.__currentQuestion = new ObservedPropertyObjectPU(null, this, "currentQuestion");
        this.__selectedAnswer = new ObservedPropertySimplePU(-1, this, "selectedAnswer");
        this.__showResult = new ObservedPropertySimplePU(false, this, "showResult");
        this.__score = new ObservedPropertySimplePU(0, this, "score");
        this.__totalQuestions = new ObservedPropertySimplePU(0, this, "totalQuestions");
        this.categories = [
            { id: 'basics', name: '入门常识', icon: '📚', count: 50 },
            { id: 'elements', name: '动作识别', icon: '⛸️', count: 40 },
            { id: 'rules', name: '规则知识', icon: '📋', count: 35 },
            { id: 'history', name: '赛事历史', icon: '🏆', count: 30 },
            { id: 'skaters', name: '选手小知识', icon: '👤', count: 25 }
        ];
        this.sampleQuestions = [
            {
                id: '1',
                category: 'basics',
                difficulty: 'beginner',
                question: '花样滑冰有几个项目？',
                options: ['3个', '4个', '5个', '6个'],
                correctAnswer: 1,
                explanation: '花样滑冰有4个正式比赛项目：男子单人滑、女子单人滑、双人滑、冰上舞蹈。'
            },
            {
                id: '2',
                category: 'elements',
                difficulty: 'beginner',
                question: '以下哪个是跳跃动作？',
                options: ['旋转', '托举', '阿克塞尔跳', '螺旋线'],
                correctAnswer: 2,
                explanation: '阿克塞尔跳(Axel)是花样滑冰的一种跳跃动作，是唯一向前起跳的跳跃。'
            },
            {
                id: '3',
                category: 'rules',
                difficulty: 'intermediate',
                question: 'GOE的取值范围是？',
                options: ['-3到+3', '-5到+5', '0到10', '-1到+1'],
                correctAnswer: 1,
                explanation: 'GOE(Grade of Execution)执行等级的取值范围是-5到+5，用于评估动作执行质量。'
            }
        ];
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: QuizChallengePage_Params) {
        if (params.selectedMode !== undefined) {
            this.selectedMode = params.selectedMode;
        }
        if (params.selectedDifficulty !== undefined) {
            this.selectedDifficulty = params.selectedDifficulty;
        }
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
        if (params.categories !== undefined) {
            this.categories = params.categories;
        }
        if (params.sampleQuestions !== undefined) {
            this.sampleQuestions = params.sampleQuestions;
        }
    }
    updateStateVars(params: QuizChallengePage_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__selectedMode.purgeDependencyOnElmtId(rmElmtId);
        this.__selectedDifficulty.purgeDependencyOnElmtId(rmElmtId);
        this.__currentQuestion.purgeDependencyOnElmtId(rmElmtId);
        this.__selectedAnswer.purgeDependencyOnElmtId(rmElmtId);
        this.__showResult.purgeDependencyOnElmtId(rmElmtId);
        this.__score.purgeDependencyOnElmtId(rmElmtId);
        this.__totalQuestions.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__selectedMode.aboutToBeDeleted();
        this.__selectedDifficulty.aboutToBeDeleted();
        this.__currentQuestion.aboutToBeDeleted();
        this.__selectedAnswer.aboutToBeDeleted();
        this.__showResult.aboutToBeDeleted();
        this.__score.aboutToBeDeleted();
        this.__totalQuestions.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __selectedMode: ObservedPropertySimplePU<string>; // daily, random, category
    get selectedMode() {
        return this.__selectedMode.get();
    }
    set selectedMode(newValue: string) {
        this.__selectedMode.set(newValue);
    }
    private __selectedDifficulty: ObservedPropertySimplePU<string>; // beginner, intermediate, advanced
    get selectedDifficulty() {
        return this.__selectedDifficulty.get();
    }
    set selectedDifficulty(newValue: string) {
        this.__selectedDifficulty.set(newValue);
    }
    private __currentQuestion: ObservedPropertyObjectPU<QuizQuestion | null>;
    get currentQuestion() {
        return this.__currentQuestion.get();
    }
    set currentQuestion(newValue: QuizQuestion | null) {
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
    // 题库分类
    private categories: QuizCategory[];
    // 示例题目
    private sampleQuestions: QuizQuestion[];
    aboutToAppear() {
        this.loadQuestion();
    }
    loadQuestion() {
        // 随机加载题目
        const randomIndex = Math.floor(Math.random() * this.sampleQuestions.length);
        this.currentQuestion = this.sampleQuestions[randomIndex];
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
                        title: '知识闯关',
                        showBack: true,
                        navBackgroundColor: '#4FC3F7'
                    }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/QuizChallengePage.ets", line: 76, col: 7 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            title: '知识闯关',
                            showBack: true,
                            navBackgroundColor: '#4FC3F7'
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        title: '知识闯关',
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
        // 模式选择
        this.buildModeSelector.bind(this)();
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
                    this.buildCategoryList.bind(this)();
                });
            }
        }, If);
        If.pop();
        // 内容区
        Column.pop();
        Column.pop();
    }
    // 模式选择器
    buildModeSelector(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.padding(16);
            Row.justifyContent(FlexAlign.SpaceEvenly);
        }, Row);
        this.ModeButton.bind(this)('每日闯关', 'daily', '📅');
        this.ModeButton.bind(this)('随机刷题', 'random', '🎲');
        this.ModeButton.bind(this)('专项练习', 'category', '📝');
        Row.pop();
    }
    ModeButton(title: string, mode: string, icon: string, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width(90);
            Column.height(70);
            Column.backgroundColor(this.selectedMode === mode ? '#E3F2FD' : '#FFFFFF');
            Column.borderRadius(12);
            Column.justifyContent(FlexAlign.Center);
            Column.onClick(() => {
                this.selectedMode = mode;
                if (mode !== 'category') {
                    this.loadQuestion();
                }
                else {
                    this.currentQuestion = null;
                }
            });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(icon);
            Text.fontSize(24);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(title);
            Text.fontSize(12);
            Text.fontColor(this.selectedMode === mode ? '#4FC3F7' : '#666666');
            Text.margin({ top: 4 });
        }, Text);
        Text.pop();
        Column.pop();
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
        // 进度信息
        this.buildProgressInfo.bind(this)();
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
                });
            }
            // 下一题按钮
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            // 下一题按钮
            if (this.showResult) {
                this.ifElseBranchUpdateFunction(0, () => {
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
    buildProgressInfo(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.padding({ bottom: 16 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(`第 ${this.totalQuestions + 1} 题`);
            Text.fontSize(14);
            Text.fontColor('#666666');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(`得分: ${this.score}`);
            Text.fontSize(14);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#4FC3F7');
        }, Text);
        Text.pop();
        Row.pop();
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
            Row.create();
            Row.width('100%');
            Row.margin({ bottom: 16 });
        }, Row);
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new IceTag(this, {
                        text: this.getDifficultyName(this.currentQuestion!.difficulty),
                        type: this.currentQuestion!.difficulty === 'beginner' ? 'success' :
                            this.currentQuestion!.difficulty === 'intermediate' ? 'warning' : 'danger',
                        tagSize: 'small'
                    }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/QuizChallengePage.ets", line: 192, col: 9 });
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
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.getCategoryName(this.currentQuestion!.category));
            Text.fontSize(12);
            Text.fontColor('#999999');
        }, Text);
        Text.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.currentQuestion!.question);
            Text.fontSize(18);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#333333');
            Text.lineHeight(28);
        }, Text);
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
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.margin({ bottom: 12 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.selectedAnswer === this.currentQuestion!.correctAnswer ? '✅ 回答正确！' : '❌ 回答错误');
            Text.fontSize(16);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor(this.selectedAnswer === this.currentQuestion!.correctAnswer ? '#4CAF50' : '#F44336');
        }, Text);
        Text.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('解析：');
            Text.fontSize(14);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#333333');
            Text.margin({ bottom: 8 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.currentQuestion!.explanation);
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
                this.loadQuestion();
            });
        }, Button);
        Button.pop();
    }
    // 分类列表
    buildCategoryList(parent = null) {
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
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('选择题目分类');
            Text.fontSize(18);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#333333');
            Text.margin({ bottom: 16 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const category = _item;
                this.CategoryCard.bind(this)(category);
            };
            this.forEachUpdateFunction(elmtId, this.categories, forEachItemGenFunction, (category: QuizCategory) => category.id, false, false);
        }, ForEach);
        ForEach.pop();
        Column.pop();
        Scroll.pop();
    }
    CategoryCard(category: QuizCategory, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.padding(16);
            Row.backgroundColor('#FFFFFF');
            Row.borderRadius(12);
            Row.margin({ bottom: 12 });
            Row.onClick(() => {
                this.loadQuestion();
            });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(category.icon);
            Text.fontSize(40);
            Text.margin({ right: 16 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.alignItems(HorizontalAlign.Start);
            Column.layoutWeight(1);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(category.name);
            Text.fontSize(16);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#333333');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(`${category.count} 道题目`);
            Text.fontSize(12);
            Text.fontColor('#999999');
            Text.margin({ top: 4 });
        }, Text);
        Text.pop();
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('›');
            Text.fontSize(20);
            Text.fontColor('#999999');
        }, Text);
        Text.pop();
        Row.pop();
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
            'beginner': '萌新',
            'intermediate': '进阶',
            'advanced': '资深'
        };
        return names[difficulty] || difficulty;
    }
    private getCategoryName(category: string): string {
        const names: Record<string, string> = {
            'basics': '入门常识',
            'elements': '动作识别',
            'rules': '规则知识',
            'history': '赛事历史',
            'skaters': '选手小知识'
        };
        return names[category] || category;
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "QuizChallengePage";
    }
}
// 数据类型
interface QuizCategory {
    id: string;
    name: string;
    icon: string;
    count: number;
}
interface QuizQuestion {
    id: string;
    category: string;
    difficulty: string;
    question: string;
    options: string[];
    correctAnswer: number;
    explanation: string;
}
registerNamedRoute(() => new QuizChallengePage(undefined, {}), "", { bundleName: "com.example.simplecalculator", moduleName: "entry", pagePath: "pages/QuizChallengePage", pageFullPath: "entry/src/main/ets/pages/QuizChallengePage", integratedHsp: "false", moduleType: "followWithHap" });
