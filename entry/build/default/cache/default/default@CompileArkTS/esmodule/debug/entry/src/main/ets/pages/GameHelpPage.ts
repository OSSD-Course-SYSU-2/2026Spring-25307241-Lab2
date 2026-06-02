if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface GameHelpPage_Params {
    currentSection?: number;
}
import router from "@ohos:router";
class GameHelpPage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__currentSection = new ObservedPropertySimplePU(0, this, "currentSection");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: GameHelpPage_Params) {
        if (params.currentSection !== undefined) {
            this.currentSection = params.currentSection;
        }
    }
    updateStateVars(params: GameHelpPage_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__currentSection.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__currentSection.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __currentSection: ObservedPropertySimplePU<number>;
    get currentSection() {
        return this.__currentSection.get();
    }
    set currentSection(newValue: number) {
        this.__currentSection.set(newValue);
    }
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
            // 顶部导航
            Row.create();
            // 顶部导航
            Row.width('100%');
            // 顶部导航
            Row.height(80);
            // 顶部导航
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
            Text.create('📖 游戏帮助');
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
        // 顶部导航
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
        // 游戏简介
        this.buildGameIntro.bind(this)();
        // 核心玩法
        this.buildCoreGameplay.bind(this)();
        // 15种动作卡牌
        this.buildActionCards.bind(this)();
        // 评分机制
        this.buildScoring.bind(this)();
        // 游戏模式
        this.buildGameModes.bind(this)();
        Column.pop();
        Scroll.pop();
        Column.pop();
    }
    // 游戏简介
    buildGameIntro(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.backgroundColor('rgba(255,255,255,0.1)');
            Column.borderRadius(15);
            Column.margin({ bottom: 15 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.padding(15);
            Row.onClick(() => {
                this.currentSection = this.currentSection === 0 ? -1 : 0;
            });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('游戏简介');
            Text.fontSize(20);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor(Color.White);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
            Blank.layoutWeight(1);
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.currentSection === 0 ? '▼' : '▶');
            Text.fontSize(16);
            Text.fontColor('rgba(255,255,255,0.7)');
        }, Text);
        Text.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.currentSection === 0) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Column.create();
                        Column.width('100%');
                        Column.padding({ left: 15, right: 15, bottom: 15 });
                    }, Column);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('⛸️ 花样滑冰解谜游戏');
                        Text.fontSize(22);
                        Text.fontWeight(FontWeight.Bold);
                        Text.fontColor(Color.White);
                        Text.margin({ bottom: 15 });
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('这是一款结合花样滑冰元素的策略解谜游戏。在3×3九宫格棋盘上，使用各种花样滑冰动作卡牌移动奖牌，凑出指定图案，完成完美的滑冰表演！');
                        Text.fontSize(15);
                        Text.fontColor('rgba(255,255,255,0.9)');
                        Text.lineHeight(24);
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
    // 核心玩法
    buildCoreGameplay(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.backgroundColor('rgba(255,255,255,0.1)');
            Column.borderRadius(15);
            Column.margin({ bottom: 15 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.padding(15);
            Row.onClick(() => {
                this.currentSection = this.currentSection === 1 ? -1 : 1;
            });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('核心玩法');
            Text.fontSize(20);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor(Color.White);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
            Blank.layoutWeight(1);
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.currentSection === 1 ? '▼' : '▶');
            Text.fontSize(16);
            Text.fontColor('rgba(255,255,255,0.7)');
        }, Text);
        Text.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.currentSection === 1) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Column.create();
                        Column.width('100%');
                        Column.padding({ left: 15, right: 15, bottom: 15 });
                    }, Column);
                    this.buildRuleItem.bind(this)('🎯 目标', '在3×3棋盘上凑出指定的奖牌图案');
                    this.buildRuleItem.bind(this)('🎴 卡牌', '使用15种花样滑冰动作卡牌移动奖牌');
                    this.buildRuleItem.bind(this)('🏆 通关', '连续完成6组图案即通关一套滑冰节目');
                    this.buildRuleItem.bind(this)('⏱️ 计时', '用时越短，失误越少，分数越高');
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
    // 动作卡牌
    buildActionCards(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.backgroundColor('rgba(255,255,255,0.1)');
            Column.borderRadius(15);
            Column.margin({ bottom: 15 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.padding(15);
            Row.onClick(() => {
                this.currentSection = this.currentSection === 2 ? -1 : 2;
            });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('动作卡牌');
            Text.fontSize(20);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor(Color.White);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
            Blank.layoutWeight(1);
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.currentSection === 2 ? '▼' : '▶');
            Text.fontSize(16);
            Text.fontColor('rgba(255,255,255,0.7)');
        }, Text);
        Text.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.currentSection === 2) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Column.create();
                        Column.width('100%');
                        Column.padding({ left: 15, right: 15, bottom: 15 });
                    }, Column);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('核心动作（必记）');
                        Text.fontSize(18);
                        Text.fontWeight(FontWeight.Bold);
                        Text.fontColor(Color.White);
                        Text.margin({ bottom: 15 });
                    }, Text);
                    Text.pop();
                    this.buildCardItem.bind(this)('🔄 Spin', '翻转整列/整堆奖牌', 2);
                    this.buildCardItem.bind(this)('🦘 Jump', '交换棋盘上两堆奖牌', 3);
                    this.buildCardItem.bind(this)('💃 Pose', '把相邻奖牌堆叠到目标格', 2);
                    this.buildCardItem.bind(this)('🎀 Pirouette', '交换侧边和匹配奖牌', 4);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('其他动作');
                        Text.fontSize(18);
                        Text.fontWeight(FontWeight.Bold);
                        Text.fontColor(Color.White);
                        Text.margin({ top: 20, bottom: 15 });
                    }, Text);
                    Text.pop();
                    this.buildCardItem.bind(this)('⭐ Axel', '高级跳跃动作', 5);
                    this.buildCardItem.bind(this)('🌟 Lutz', '难度跳跃动作', 4);
                    this.buildCardItem.bind(this)('✨ Flip', '点冰跳跃动作', 3);
                    this.buildCardItem.bind(this)('💫 Loop', '结环跳跃动作', 3);
                    this.buildCardItem.bind(this)('🔥 Salchow', '内结环跳跃', 3);
                    this.buildCardItem.bind(this)('❄️ ToeLoop', '点冰跳跃基础', 2);
                    this.buildCardItem.bind(this)('🐪 Camel', '蹲旋转动作', 2);
                    this.buildCardItem.bind(this)('🦵 Sit', '蹲姿旋转动作', 2);
                    this.buildCardItem.bind(this)('🧍 Upright', '直立旋转动作', 1);
                    this.buildCardItem.bind(this)('🌀 Spiral', '螺旋线动作', 3);
                    this.buildCardItem.bind(this)('👣 Step', '步伐连接动作', 1);
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
    // 评分机制
    buildScoring(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.backgroundColor('rgba(255,255,255,0.1)');
            Column.borderRadius(15);
            Column.margin({ bottom: 15 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.padding(15);
            Row.onClick(() => {
                this.currentSection = this.currentSection === 3 ? -1 : 3;
            });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('评分机制');
            Text.fontSize(20);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor(Color.White);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
            Blank.layoutWeight(1);
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.currentSection === 3 ? '▼' : '▶');
            Text.fontSize(16);
            Text.fontColor('rgba(255,255,255,0.7)');
        }, Text);
        Text.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.currentSection === 3) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Column.create();
                        Column.width('100%');
                        Column.padding({ left: 15, right: 15, bottom: 15 });
                    }, Column);
                    this.buildMedalItem.bind(this)('🥇 金牌', '零失误，全程无补救操作，完美完成表演');
                    this.buildMedalItem.bind(this)('🥈 银牌', '仅1次失误，用1次补救操作');
                    this.buildMedalItem.bind(this)('🥉 铜牌', '2次失误，基础合格表演');
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('评分公式');
                        Text.fontSize(18);
                        Text.fontWeight(FontWeight.Bold);
                        Text.fontColor(Color.White);
                        Text.margin({ top: 20, bottom: 10 });
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Column.create();
                        Column.width('100%');
                        Column.padding(15);
                        Column.backgroundColor('rgba(255,255,255,0.1)');
                        Column.borderRadius(10);
                    }, Column);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('总分 = 基础分 + 时间奖励 - 失误惩罚 + 效率奖励');
                        Text.fontSize(14);
                        Text.fontColor('rgba(255,255,255,0.9)');
                        Text.margin({ bottom: 8 });
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('• 基础分 = 完成图案数 × 100');
                        Text.fontSize(13);
                        Text.fontColor('rgba(255,255,255,0.8)');
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('• 时间奖励 = max(0, 300 - 用时)');
                        Text.fontSize(13);
                        Text.fontColor('rgba(255,255,255,0.8)');
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('• 失误惩罚 = 失误次数 × 20');
                        Text.fontSize(13);
                        Text.fontColor('rgba(255,255,255,0.8)');
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('• 效率奖励 = (完成图案数 / 总移动数) × 50');
                        Text.fontSize(13);
                        Text.fontColor('rgba(255,255,255,0.8)');
                    }, Text);
                    Text.pop();
                    Column.pop();
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
    // 游戏模式
    buildGameModes(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.backgroundColor('rgba(255,255,255,0.1)');
            Column.borderRadius(15);
            Column.margin({ bottom: 15 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.padding(15);
            Row.onClick(() => {
                this.currentSection = this.currentSection === 4 ? -1 : 4;
            });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('游戏模式');
            Text.fontSize(20);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor(Color.White);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
            Blank.layoutWeight(1);
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.currentSection === 4 ? '▼' : '▶');
            Text.fontSize(16);
            Text.fontColor('rgba(255,255,255,0.7)');
        }, Text);
        Text.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.currentSection === 4) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Column.create();
                        Column.width('100%');
                        Column.padding({ left: 15, right: 15, bottom: 15 });
                    }, Column);
                    this.buildModeItem.bind(this)('🎮 经典模式', [
                        '随时开启随机生成的解谜关卡',
                        '自由练习，无每日限制',
                        '刷高分，冲金牌',
                        '适合新手熟悉游戏'
                    ]);
                    this.buildModeItem.bind(this)('🏆 每日挑战', [
                        '每天全球玩家共用同一道谜题',
                        '完成后自动上传分数到全球排行榜',
                        '和全世界玩家比拼排名',
                        '看谁的滑冰表演更完美'
                    ]);
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
    buildRuleItem(icon: string, desc: string, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.padding(10);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(icon);
            Text.fontSize(24);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(desc);
            Text.fontSize(14);
            Text.fontColor('rgba(255,255,255,0.9)');
            Text.margin({ left: 15 });
            Text.layoutWeight(1);
        }, Text);
        Text.pop();
        Row.pop();
    }
    buildCardItem(name: string, desc: string, difficulty: number, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.padding(10);
            Row.backgroundColor('rgba(255,255,255,0.05)');
            Row.borderRadius(8);
            Row.margin({ bottom: 8 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.alignItems(HorizontalAlign.Start);
            Column.layoutWeight(1);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(name);
            Text.fontSize(15);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor(Color.White);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(desc);
            Text.fontSize(13);
            Text.fontColor('rgba(255,255,255,0.8)');
            Text.margin({ top: 3 });
        }, Text);
        Text.pop();
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(`难度${difficulty}`);
            Text.fontSize(12);
            Text.fontColor('rgba(255,255,255,0.7)');
            Text.padding({ left: 8, right: 8, top: 4, bottom: 4 });
            Text.backgroundColor('rgba(255,255,255,0.2)');
            Text.borderRadius(10);
        }, Text);
        Text.pop();
        Row.pop();
    }
    buildMedalItem(medal: string, desc: string, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.padding(12);
            Row.backgroundColor('rgba(255,255,255,0.1)');
            Row.borderRadius(10);
            Row.margin({ bottom: 10 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(medal);
            Text.fontSize(24);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(desc);
            Text.fontSize(14);
            Text.fontColor('rgba(255,255,255,0.9)');
            Text.margin({ left: 15 });
            Text.layoutWeight(1);
        }, Text);
        Text.pop();
        Row.pop();
    }
    buildModeItem(title: string, features: string[], parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.padding(15);
            Column.backgroundColor('rgba(255,255,255,0.1)');
            Column.borderRadius(10);
            Column.margin({ bottom: 15 });
            Column.alignItems(HorizontalAlign.Start);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(title);
            Text.fontSize(18);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor(Color.White);
            Text.margin({ bottom: 10 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = (_item, index: number) => {
                const feature = _item;
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Row.create();
                    Row.width('100%');
                    Row.margin({ bottom: 5 });
                }, Row);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create('✓');
                    Text.fontSize(14);
                    Text.fontColor('#4CAF50');
                }, Text);
                Text.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create(feature);
                    Text.fontSize(14);
                    Text.fontColor('rgba(255,255,255,0.9)');
                    Text.margin({ left: 8 });
                }, Text);
                Text.pop();
                Row.pop();
            };
            this.forEachUpdateFunction(elmtId, features, forEachItemGenFunction, (feature: string, index: number) => `${title}_${index}`, true, true);
        }, ForEach);
        ForEach.pop();
        Column.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "GameHelpPage";
    }
}
registerNamedRoute(() => new GameHelpPage(undefined, {}), "", { bundleName: "com.example.simplecalculator", moduleName: "entry", pagePath: "pages/GameHelpPage", pageFullPath: "entry/src/main/ets/pages/GameHelpPage", integratedHsp: "false", moduleType: "followWithHap" });
