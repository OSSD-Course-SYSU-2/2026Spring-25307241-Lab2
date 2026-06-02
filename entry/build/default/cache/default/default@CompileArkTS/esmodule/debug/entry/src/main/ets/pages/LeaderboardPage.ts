if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface LeaderboardPage_Params {
    leaderboard?: LeaderboardEntry[];
    isLoading?: boolean;
    currentTab?: number;
}
import router from "@ohos:router";
import { LeaderboardManager } from "@bundle:com.example.simplecalculator/entry/ets/common/util/LeaderboardManager";
import { MedalType } from "@bundle:com.example.simplecalculator/entry/ets/viewmodel/PuzzleGameModel";
import type { LeaderboardEntry } from "@bundle:com.example.simplecalculator/entry/ets/viewmodel/PuzzleGameModel";
class LeaderboardPage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__leaderboard = new ObservedPropertyObjectPU([], this, "leaderboard");
        this.__isLoading = new ObservedPropertySimplePU(true, this, "isLoading");
        this.__currentTab = new ObservedPropertySimplePU(0, this, "currentTab");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: LeaderboardPage_Params) {
        if (params.leaderboard !== undefined) {
            this.leaderboard = params.leaderboard;
        }
        if (params.isLoading !== undefined) {
            this.isLoading = params.isLoading;
        }
        if (params.currentTab !== undefined) {
            this.currentTab = params.currentTab;
        }
    }
    updateStateVars(params: LeaderboardPage_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__leaderboard.purgeDependencyOnElmtId(rmElmtId);
        this.__isLoading.purgeDependencyOnElmtId(rmElmtId);
        this.__currentTab.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__leaderboard.aboutToBeDeleted();
        this.__isLoading.aboutToBeDeleted();
        this.__currentTab.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __leaderboard: ObservedPropertyObjectPU<LeaderboardEntry[]>;
    get leaderboard() {
        return this.__leaderboard.get();
    }
    set leaderboard(newValue: LeaderboardEntry[]) {
        this.__leaderboard.set(newValue);
    }
    private __isLoading: ObservedPropertySimplePU<boolean>;
    get isLoading() {
        return this.__isLoading.get();
    }
    set isLoading(newValue: boolean) {
        this.__isLoading.set(newValue);
    }
    private __currentTab: ObservedPropertySimplePU<number>; // 0: 全球排行, 1: 今日排行
    get currentTab() {
        return this.__currentTab.get();
    }
    set currentTab(newValue: number) {
        this.__currentTab.set(newValue);
    }
    aboutToAppear(): void {
        this.loadLeaderboard();
    }
    async loadLeaderboard(): Promise<void> {
        this.isLoading = true;
        this.leaderboard = await LeaderboardManager.getLeaderboard();
        this.isLoading = false;
    }
    getMedalIcon(type: MedalType): string {
        switch (type) {
            case MedalType.GOLD:
                return '🥇';
            case MedalType.SILVER:
                return '🥈';
            case MedalType.BRONZE:
                return '🥉';
            default:
                return '🏅';
        }
    }
    getRankIcon(rank: number): string {
        switch (rank) {
            case 1:
                return '🥇';
            case 2:
                return '🥈';
            case 3:
                return '🥉';
            default:
                return `${rank}`;
        }
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
            Text.create('🏆 排行榜');
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
            // 标签切换
            Row.create();
            // 标签切换
            Row.width('90%');
            // 标签切换
            Row.justifyContent(FlexAlign.SpaceEvenly);
            // 标签切换
            Row.margin({ bottom: 20 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('全球排行');
            Button.width('45%');
            Button.height(40);
            Button.backgroundColor(this.currentTab === 0 ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.1)');
            Button.borderRadius(20);
            Button.fontColor(Color.White);
            Button.onClick(() => {
                this.currentTab = 0;
            });
        }, Button);
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('今日排行');
            Button.width('45%');
            Button.height(40);
            Button.backgroundColor(this.currentTab === 1 ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.1)');
            Button.borderRadius(20);
            Button.fontColor(Color.White);
            Button.onClick(() => {
                this.currentTab = 1;
            });
        }, Button);
        Button.pop();
        // 标签切换
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            // 排行榜列表
            if (this.isLoading) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Column.create();
                        Column.width('100%');
                        Column.layoutWeight(1);
                        Column.justifyContent(FlexAlign.Center);
                    }, Column);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        LoadingProgress.create();
                        LoadingProgress.width(50);
                        LoadingProgress.height(50);
                        LoadingProgress.color(Color.White);
                    }, LoadingProgress);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('加载中...');
                        Text.fontSize(16);
                        Text.fontColor('rgba(255,255,255,0.8)');
                        Text.margin({ top: 15 });
                    }, Text);
                    Text.pop();
                    Column.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Column.create();
                        Column.width('100%');
                        Column.layoutWeight(1);
                        Column.justifyContent(FlexAlign.Start);
                        Column.padding({ top: 10 });
                    }, Column);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        // 表头
                        Row.create();
                        // 表头
                        Row.width('95%');
                        // 表头
                        Row.padding({ top: 10, bottom: 10 });
                        // 表头
                        Row.backgroundColor('rgba(255,255,255,0.1)');
                        // 表头
                        Row.borderRadius({ topLeft: 10, topRight: 10 });
                    }, Row);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('排名');
                        Text.fontSize(14);
                        Text.fontColor('rgba(255,255,255,0.7)');
                        Text.width('15%');
                        Text.textAlign(TextAlign.Center);
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('玩家');
                        Text.fontSize(14);
                        Text.fontColor('rgba(255,255,255,0.7)');
                        Text.width('30%');
                        Text.textAlign(TextAlign.Center);
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('分数');
                        Text.fontSize(14);
                        Text.fontColor('rgba(255,255,255,0.7)');
                        Text.width('25%');
                        Text.textAlign(TextAlign.Center);
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('用时');
                        Text.fontSize(14);
                        Text.fontColor('rgba(255,255,255,0.7)');
                        Text.width('15%');
                        Text.textAlign(TextAlign.Center);
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('奖牌');
                        Text.fontSize(14);
                        Text.fontColor('rgba(255,255,255,0.7)');
                        Text.width('15%');
                        Text.textAlign(TextAlign.Center);
                    }, Text);
                    Text.pop();
                    // 表头
                    Row.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        // 列表
                        List.create();
                        // 列表
                        List.width('95%');
                        // 列表
                        List.layoutWeight(1);
                        // 列表
                        List.divider({
                            strokeWidth: 1,
                            color: 'rgba(255,255,255,0.1)'
                        });
                    }, List);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        ForEach.create();
                        const forEachItemGenFunction = (_item, index: number) => {
                            const entry = _item;
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
                                };
                                const deepRenderFunction = (elmtId, isInitialRender) => {
                                    itemCreation(elmtId, isInitialRender);
                                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                                        Row.create();
                                        Row.width('95%');
                                        Row.height(60);
                                        Row.backgroundColor(index % 2 === 0 ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.05)');
                                        Row.borderRadius(index === this.leaderboard.length - 1 ? 10 : 0);
                                    }, Row);
                                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                                        // 排名
                                        Column.create();
                                        // 排名
                                        Column.width('15%');
                                        // 排名
                                        Column.justifyContent(FlexAlign.Center);
                                    }, Column);
                                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                                        Text.create(this.getRankIcon(index + 1));
                                        Text.fontSize(index < 3 ? 24 : 16);
                                    }, Text);
                                    Text.pop();
                                    // 排名
                                    Column.pop();
                                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                                        // 玩家名
                                        Text.create(entry.playerName);
                                        // 玩家名
                                        Text.fontSize(14);
                                        // 玩家名
                                        Text.fontColor(Color.White);
                                        // 玩家名
                                        Text.fontWeight(index < 3 ? FontWeight.Bold : FontWeight.Normal);
                                        // 玩家名
                                        Text.width('30%');
                                        // 玩家名
                                        Text.textAlign(TextAlign.Center);
                                    }, Text);
                                    // 玩家名
                                    Text.pop();
                                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                                        // 分数
                                        Text.create(`${entry.score}`);
                                        // 分数
                                        Text.fontSize(16);
                                        // 分数
                                        Text.fontColor(Color.White);
                                        // 分数
                                        Text.fontWeight(FontWeight.Bold);
                                        // 分数
                                        Text.width('25%');
                                        // 分数
                                        Text.textAlign(TextAlign.Center);
                                    }, Text);
                                    // 分数
                                    Text.pop();
                                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                                        // 用时
                                        Text.create(this.formatTime(entry.time));
                                        // 用时
                                        Text.fontSize(14);
                                        // 用时
                                        Text.fontColor('rgba(255,255,255,0.8)');
                                        // 用时
                                        Text.width('15%');
                                        // 用时
                                        Text.textAlign(TextAlign.Center);
                                    }, Text);
                                    // 用时
                                    Text.pop();
                                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                                        // 奖牌
                                        Text.create(this.getMedalIcon(entry.medal));
                                        // 奖牌
                                        Text.fontSize(20);
                                        // 奖牌
                                        Text.width('15%');
                                        // 奖牌
                                        Text.textAlign(TextAlign.Center);
                                    }, Text);
                                    // 奖牌
                                    Text.pop();
                                    Row.pop();
                                    ListItem.pop();
                                };
                                this.observeComponentCreation2(itemCreation2, ListItem);
                                ListItem.pop();
                            }
                        };
                        this.forEachUpdateFunction(elmtId, this.leaderboard, forEachItemGenFunction, undefined, true, false);
                    }, ForEach);
                    ForEach.pop();
                    // 列表
                    List.pop();
                    Column.pop();
                });
            }
        }, If);
        If.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 底部提示
            Column.create();
            // 底部提示
            Column.width('100%');
            // 底部提示
            Column.height(60);
            // 底部提示
            Column.justifyContent(FlexAlign.Center);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('💡 每日挑战完成后自动上传分数');
            Text.fontSize(13);
            Text.fontColor('rgba(255,255,255,0.7)');
        }, Text);
        Text.pop();
        // 底部提示
        Column.pop();
        Column.pop();
    }
    formatTime(seconds: number): string {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "LeaderboardPage";
    }
}
registerNamedRoute(() => new LeaderboardPage(undefined, {}), "", { bundleName: "com.example.simplecalculator", moduleName: "entry", pagePath: "pages/LeaderboardPage", pageFullPath: "entry/src/main/ets/pages/LeaderboardPage", integratedHsp: "false", moduleType: "followWithHap" });
