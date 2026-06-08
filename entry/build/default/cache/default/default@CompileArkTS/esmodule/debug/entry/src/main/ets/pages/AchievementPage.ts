if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface AchievementPage_Params {
    totalIceTime?: number;
    totalPractices?: number;
    topMoves?: MoveDetail[];
    typeStats?: MoveTypeStats;
    dailyData?: DailyPracticeData[];
    scrollOffset?: number;
    dataStore?: DataStore;
    scroller?: Scroller;
}
import router from "@ohos:router";
import { DataStore } from "@bundle:com.example.simplecalculator/entry/ets/services/DataStore";
import type { MoveTypeStats, DailyPracticeData } from "@bundle:com.example.simplecalculator/entry/ets/services/DataStore";
import type { MoveDetail } from '../models/IceTraceData';
import { DeviceUtils } from "@bundle:com.example.simplecalculator/entry/ets/common/utils/DeviceUtils";
export class AchievementPage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__totalIceTime = new ObservedPropertySimplePU(0, this, "totalIceTime");
        this.__totalPractices = new ObservedPropertySimplePU(0, this, "totalPractices");
        this.__topMoves = new ObservedPropertyObjectPU([], this, "topMoves");
        this.__typeStats = new ObservedPropertyObjectPU({ jump: 0, spin: 0, step: 0 }, this, "typeStats");
        this.__dailyData = new ObservedPropertyObjectPU([], this, "dailyData");
        this.__scrollOffset = new ObservedPropertySimplePU(0, this, "scrollOffset");
        this.dataStore = DataStore.getInstance();
        this.scroller = new Scroller();
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: AchievementPage_Params) {
        if (params.totalIceTime !== undefined) {
            this.totalIceTime = params.totalIceTime;
        }
        if (params.totalPractices !== undefined) {
            this.totalPractices = params.totalPractices;
        }
        if (params.topMoves !== undefined) {
            this.topMoves = params.topMoves;
        }
        if (params.typeStats !== undefined) {
            this.typeStats = params.typeStats;
        }
        if (params.dailyData !== undefined) {
            this.dailyData = params.dailyData;
        }
        if (params.scrollOffset !== undefined) {
            this.scrollOffset = params.scrollOffset;
        }
        if (params.dataStore !== undefined) {
            this.dataStore = params.dataStore;
        }
        if (params.scroller !== undefined) {
            this.scroller = params.scroller;
        }
    }
    updateStateVars(params: AchievementPage_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__totalIceTime.purgeDependencyOnElmtId(rmElmtId);
        this.__totalPractices.purgeDependencyOnElmtId(rmElmtId);
        this.__topMoves.purgeDependencyOnElmtId(rmElmtId);
        this.__typeStats.purgeDependencyOnElmtId(rmElmtId);
        this.__dailyData.purgeDependencyOnElmtId(rmElmtId);
        this.__scrollOffset.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__totalIceTime.aboutToBeDeleted();
        this.__totalPractices.aboutToBeDeleted();
        this.__topMoves.aboutToBeDeleted();
        this.__typeStats.aboutToBeDeleted();
        this.__dailyData.aboutToBeDeleted();
        this.__scrollOffset.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __totalIceTime: ObservedPropertySimplePU<number>;
    get totalIceTime() {
        return this.__totalIceTime.get();
    }
    set totalIceTime(newValue: number) {
        this.__totalIceTime.set(newValue);
    }
    private __totalPractices: ObservedPropertySimplePU<number>;
    get totalPractices() {
        return this.__totalPractices.get();
    }
    set totalPractices(newValue: number) {
        this.__totalPractices.set(newValue);
    }
    private __topMoves: ObservedPropertyObjectPU<MoveDetail[]>;
    get topMoves() {
        return this.__topMoves.get();
    }
    set topMoves(newValue: MoveDetail[]) {
        this.__topMoves.set(newValue);
    }
    private __typeStats: ObservedPropertyObjectPU<MoveTypeStats>;
    get typeStats() {
        return this.__typeStats.get();
    }
    set typeStats(newValue: MoveTypeStats) {
        this.__typeStats.set(newValue);
    }
    private __dailyData: ObservedPropertyObjectPU<DailyPracticeData[]>;
    get dailyData() {
        return this.__dailyData.get();
    }
    set dailyData(newValue: DailyPracticeData[]) {
        this.__dailyData.set(newValue);
    }
    private __scrollOffset: ObservedPropertySimplePU<number>; // 流转时保存滚动位置
    get scrollOffset() {
        return this.__scrollOffset.get();
    }
    set scrollOffset(newValue: number) {
        this.__scrollOffset.set(newValue);
    }
    private dataStore: DataStore;
    private scroller: Scroller; // 滚动控制器
    aboutToAppear() {
        // 保存当前页面路径到AppStorage（用于流转）
        AppStorage.setOrCreate('currentPage', 'pages/AchievementPage');
        this.loadData();
        // 检查是否需要恢复流转数据
        this.restoreContinueData();
    }
    aboutToDisappear() {
        // 保存滚动位置到AppStorage
        AppStorage.setOrCreate('achievementScrollOffset', this.scrollOffset);
    }
    loadData() {
        const userData = this.dataStore.getUserData();
        this.totalIceTime = userData.totalIceTime;
        this.totalPractices = userData.totalPractices;
        this.topMoves = this.dataStore.getTopMoves(8);
        const stats = this.dataStore.getMoveTypeStats();
        this.typeStats = { jump: stats.jump, spin: stats.spin, step: stats.step };
        this.dailyData = this.dataStore.getDailyPracticeTime(30);
    }
    // 恢复流转数据
    restoreContinueData() {
        // 恢复滚动位置
        const savedOffset = AppStorage.get<number>('achievementScrollOffset');
        if (savedOffset && savedOffset > 0) {
            this.scrollOffset = savedOffset;
            // 延迟恢复滚动位置，确保内容已加载
            setTimeout(() => {
                this.scroller.scrollToIndex(Math.floor(savedOffset / 100));
            }, 100);
        }
        // 清除临时存储的流转数据
        AppStorage.delete('achievementScrollOffset');
    }
    // 格式化时间
    formatTime(seconds: number): string {
        if (seconds === 0)
            return '0分钟';
        if (seconds < 60)
            return `${seconds}秒`;
        const hours = Math.floor(seconds / 3600);
        const mins = Math.floor((seconds % 3600) / 60);
        if (hours > 0) {
            return mins > 0 ? `${hours}小时${mins}分` : `${hours}小时`;
        }
        return `${mins}分钟`;
    }
    // 获取柱状图最大值
    getMaxBarValue(): number {
        if (this.topMoves.length === 0)
            return 100;
        return Math.max(...this.topMoves.map(m => m.totalDuration));
    }
    // 获取每日最大练习时长
    getMaxDailyDuration(): number {
        if (this.dailyData.length === 0)
            return 3600; // 默认1小时
        const max = Math.max(...this.dailyData.map(d => d.duration));
        return max > 0 ? max : 3600;
    }
    // 获取方块颜色
    getBlockColor(duration: number): string {
        if (duration === 0)
            return '#F0F0F0';
        const max = this.getMaxDailyDuration();
        const ratio = duration / max;
        if (ratio < 0.25)
            return '#E3F2FD';
        if (ratio < 0.5)
            return '#90CAF9';
        if (ratio < 0.75)
            return '#42A5F5';
        return '#1976D2';
    }
    // 响应式布局参数
    getTitleFontSize(): number {
        return DeviceUtils.isLargeScreen() ? 32 : 24;
    }
    getCardPadding(): number {
        return DeviceUtils.getSpacing();
    }
    getCardRadius(): number {
        return DeviceUtils.getCardRadius();
    }
    getBlockWidth(): number {
        return DeviceUtils.isLargeScreen() ? 48 : 36;
    }
    getBlockHeight(): number {
        return DeviceUtils.isLargeScreen() ? 48 : 36;
    }
    getBlockMargin(): number {
        return DeviceUtils.isLargeScreen() ? 4 : 2;
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.height('100%');
            Column.padding(DeviceUtils.isLargeScreen() ? 30 : 20);
            Column.linearGradient({
                angle: 135,
                colors: [['#00D2FF', 0.0], ['#3A7BD5', 1.0]]
            });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 标题
            Text.create('🏆 成就');
            // 标题
            Text.fontSize(this.getTitleFontSize());
            // 标题
            Text.fontWeight(FontWeight.Bold);
            // 标题
            Text.fontColor('#FFFFFF');
            // 标题
            Text.margin({ bottom: DeviceUtils.isLargeScreen() ? 30 : 20 });
        }, Text);
        // 标题
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 滚动容器 - 支持Pad端滚动查看所有内容
            Scroll.create(this.scroller);
            // 滚动容器 - 支持Pad端滚动查看所有内容
            Scroll.width('100%');
            // 滚动容器 - 支持Pad端滚动查看所有内容
            Scroll.layoutWeight(1);
            // 滚动容器 - 支持Pad端滚动查看所有内容
            Scroll.scrollBar(BarState.Auto);
            // 滚动容器 - 支持Pad端滚动查看所有内容
            Scroll.scrollBarColor('#FFFFFF');
            // 滚动容器 - 支持Pad端滚动查看所有内容
            Scroll.scrollBarWidth(DeviceUtils.isLargeScreen() ? 6 : 4);
            // 滚动容器 - 支持Pad端滚动查看所有内容
            Scroll.edgeEffect(EdgeEffect.Spring);
            // 滚动容器 - 支持Pad端滚动查看所有内容
            Scroll.onScroll(() => {
                // 实时更新滚动位置
                this.scrollOffset = this.scroller.currentOffset().yOffset;
            });
            // 滚动容器 - 支持Pad端滚动查看所有内容
            Scroll.onScrollEnd(() => {
                // 滚动结束时保存位置
                AppStorage.setOrCreate('achievementScrollOffset', this.scrollOffset);
            });
        }, Scroll);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
        }, Column);
        // 总览卡片
        this.buildOverviewCard.bind(this)();
        // 每日练习方块
        this.buildDailyBlocks.bind(this)();
        // 柱状图
        this.buildBarChart.bind(this)();
        Column.pop();
        // 滚动容器 - 支持Pad端滚动查看所有内容
        Scroll.pop();
        Column.pop();
    }
    buildOverviewCard(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.padding(this.getCardPadding());
            Column.backgroundColor('#FFFFFF');
            Column.borderRadius(this.getCardRadius());
            Column.margin({ bottom: DeviceUtils.isLargeScreen() ? 30 : 20 });
            Column.shadow(DeviceUtils.isLargeScreen() ? {
                radius: 8,
                color: 'rgba(0, 0, 0, 0.1)',
                offsetX: 0,
                offsetY: 2
            } : undefined);
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
            Text.create('⏱️');
            Text.fontSize(DeviceUtils.isLargeScreen() ? 40 : 30);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.formatTime(this.totalIceTime));
            Text.fontSize(DeviceUtils.isLargeScreen() ? 20 : 16);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#333333');
            Text.margin({ top: DeviceUtils.isLargeScreen() ? 8 : 5 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('总冰时');
            Text.fontSize(DeviceUtils.isLargeScreen() ? 14 : 12);
            Text.fontColor('#666666');
        }, Text);
        Text.pop();
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.layoutWeight(1);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('🎯');
            Text.fontSize(DeviceUtils.isLargeScreen() ? 40 : 30);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.totalPractices.toString());
            Text.fontSize(DeviceUtils.isLargeScreen() ? 20 : 16);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#333333');
            Text.margin({ top: DeviceUtils.isLargeScreen() ? 8 : 5 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('练习次数');
            Text.fontSize(DeviceUtils.isLargeScreen() ? 14 : 12);
            Text.fontColor('#666666');
        }, Text);
        Text.pop();
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.layoutWeight(1);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('📊');
            Text.fontSize(DeviceUtils.isLargeScreen() ? 40 : 30);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.topMoves.length.toString());
            Text.fontSize(DeviceUtils.isLargeScreen() ? 20 : 16);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#333333');
            Text.margin({ top: DeviceUtils.isLargeScreen() ? 8 : 5 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('已掌握动作');
            Text.fontSize(DeviceUtils.isLargeScreen() ? 14 : 12);
            Text.fontColor('#666666');
        }, Text);
        Text.pop();
        Column.pop();
        Row.pop();
        Column.pop();
    }
    buildBarChart(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.padding(this.getCardPadding());
            Column.backgroundColor('#FFFFFF');
            Column.borderRadius(this.getCardRadius());
            Column.margin({ bottom: DeviceUtils.isLargeScreen() ? 30 : 20 });
            Column.shadow(DeviceUtils.isLargeScreen() ? {
                radius: 8,
                color: 'rgba(0, 0, 0, 0.1)',
                offsetX: 0,
                offsetY: 2
            } : undefined);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('各动作累计时长');
            Text.fontSize(DeviceUtils.isLargeScreen() ? 20 : 16);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#333333');
            Text.margin({ bottom: DeviceUtils.isLargeScreen() ? 20 : 15 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.topMoves.length === 0) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Column.create();
                        Column.width('100%');
                        Column.height(DeviceUtils.isLargeScreen() ? 200 : 150);
                        Column.justifyContent(FlexAlign.Center);
                    }, Column);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('📊');
                        Text.fontSize(DeviceUtils.isLargeScreen() ? 60 : 40);
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('暂无数据，开始训练吧！');
                        Text.fontSize(DeviceUtils.isLargeScreen() ? 16 : 14);
                        Text.fontColor('#999999');
                        Text.margin({ top: DeviceUtils.isLargeScreen() ? 15 : 10 });
                    }, Text);
                    Text.pop();
                    Column.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        // 柱状图
                        Column.create();
                        // 柱状图
                        Column.width('100%');
                        // 柱状图
                        Column.padding({ left: DeviceUtils.isLargeScreen() ? 15 : 10, right: DeviceUtils.isLargeScreen() ? 15 : 10 });
                    }, Column);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        ForEach.create();
                        const forEachItemGenFunction = _item => {
                            const move = _item;
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Row.create();
                                Row.width('100%');
                                Row.margin({ bottom: DeviceUtils.isLargeScreen() ? 12 : 8 });
                                Row.alignItems(VerticalAlign.Center);
                                Row.onClick(() => {
                                    // 跳转到动作详情页
                                    router.pushUrl({
                                        url: 'pages/MoveDetailPage',
                                        params: { abbr: move.abbr }
                                    });
                                });
                            }, Row);
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Text.create(move.abbr);
                                Text.fontSize(DeviceUtils.isLargeScreen() ? 14 : 12);
                                Text.fontColor('#666666');
                                Text.width(DeviceUtils.isLargeScreen() ? 60 : 40);
                            }, Text);
                            Text.pop();
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                // 柱状条
                                Row.create();
                                // 柱状条
                                Row.width('100%');
                                // 柱状条
                                Row.height(DeviceUtils.isLargeScreen() ? 28 : 20);
                                // 柱状条
                                Row.backgroundColor('#F0F0F0');
                                // 柱状条
                                Row.borderRadius(DeviceUtils.isLargeScreen() ? 6 : 4);
                                // 柱状条
                                Row.layoutWeight(1);
                            }, Row);
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Row.create();
                                Row.width(`${(move.totalDuration / this.getMaxBarValue()) * 100}%`);
                                Row.height(DeviceUtils.isLargeScreen() ? 28 : 20);
                                Row.linearGradient({
                                    angle: 90,
                                    colors: [['#00D2FF', 0.0], ['#3A7BD5', 1.0]]
                                });
                                Row.borderRadius({ topRight: DeviceUtils.isLargeScreen() ? 6 : 4, bottomRight: DeviceUtils.isLargeScreen() ? 6 : 4 });
                            }, Row);
                            Row.pop();
                            // 柱状条
                            Row.pop();
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Text.create(this.formatTime(move.totalDuration));
                                Text.fontSize(DeviceUtils.isLargeScreen() ? 13 : 11);
                                Text.fontColor('#999999');
                                Text.width(DeviceUtils.isLargeScreen() ? 80 : 60);
                                Text.margin({ left: DeviceUtils.isLargeScreen() ? 12 : 8 });
                            }, Text);
                            Text.pop();
                            Row.pop();
                        };
                        this.forEachUpdateFunction(elmtId, this.topMoves, forEachItemGenFunction);
                    }, ForEach);
                    ForEach.pop();
                    // 柱状图
                    Column.pop();
                });
            }
        }, If);
        If.pop();
        Column.pop();
    }
    buildDailyBlocks(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.padding(this.getCardPadding());
            Column.backgroundColor('#FFFFFF');
            Column.borderRadius(this.getCardRadius());
            Column.margin({ bottom: DeviceUtils.isLargeScreen() ? 30 : 20 });
            Column.shadow(DeviceUtils.isLargeScreen() ? {
                radius: 8,
                color: 'rgba(0, 0, 0, 0.1)',
                offsetX: 0,
                offsetY: 2
            } : undefined);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('最近30天练习记录');
            Text.fontSize(DeviceUtils.isLargeScreen() ? 20 : 16);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#333333');
            Text.margin({ bottom: DeviceUtils.isLargeScreen() ? 20 : 15 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 星期标题
            Row.create();
            // 星期标题
            Row.width('100%');
            // 星期标题
            Row.justifyContent(FlexAlign.Start);
            // 星期标题
            Row.margin({ bottom: DeviceUtils.isLargeScreen() ? 12 : 8 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const day = _item;
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create(day);
                    Text.fontSize(DeviceUtils.isLargeScreen() ? 12 : 10);
                    Text.fontColor('#999999');
                    Text.width(this.getBlockWidth() + this.getBlockMargin());
                    Text.textAlign(TextAlign.Center);
                }, Text);
                Text.pop();
            };
            this.forEachUpdateFunction(elmtId, ['日', '一', '二', '三', '四', '五', '六'], forEachItemGenFunction);
        }, ForEach);
        ForEach.pop();
        // 星期标题
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 方块网格
            Flex.create({ wrap: FlexWrap.Wrap });
            // 方块网格
            Flex.width('100%');
        }, Flex);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = (_item, index: number) => {
                const data = _item;
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Column.create();
                    Column.width(this.getBlockWidth() + this.getBlockMargin());
                    Column.height(this.getBlockHeight() + this.getBlockMargin());
                    Column.margin({ right: this.getBlockMargin(), bottom: this.getBlockMargin() });
                }, Column);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    // 方块
                    Column.create();
                    // 方块
                    Column.width(this.getBlockWidth());
                    // 方块
                    Column.height(this.getBlockHeight());
                    // 方块
                    Column.backgroundColor(this.getBlockColor(data.duration));
                    // 方块
                    Column.borderRadius(DeviceUtils.isLargeScreen() ? 8 : 6);
                    // 方块
                    Column.justifyContent(FlexAlign.Center);
                }, Column);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    If.create();
                    if (data.duration > 0) {
                        this.ifElseBranchUpdateFunction(0, () => {
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Text.create(Math.floor(data.duration / 60).toString());
                                Text.fontSize(DeviceUtils.isLargeScreen() ? 12 : 10);
                                Text.fontWeight(FontWeight.Bold);
                                Text.fontColor(data.duration > this.getMaxDailyDuration() * 0.5 ? '#FFFFFF' : '#333333');
                            }, Text);
                            Text.pop();
                        });
                    }
                    else {
                        this.ifElseBranchUpdateFunction(1, () => {
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Text.create('');
                                Text.fontSize(DeviceUtils.isLargeScreen() ? 12 : 10);
                            }, Text);
                            Text.pop();
                        });
                    }
                }, If);
                If.pop();
                // 方块
                Column.pop();
                Column.pop();
            };
            this.forEachUpdateFunction(elmtId, this.dailyData, forEachItemGenFunction, undefined, true, false);
        }, ForEach);
        ForEach.pop();
        // 方块网格
        Flex.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 图例
            Row.create();
            // 图例
            Row.width('100%');
            // 图例
            Row.margin({ top: DeviceUtils.isLargeScreen() ? 20 : 15 });
            // 图例
            Row.justifyContent(FlexAlign.Center);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('图例：');
            Text.fontSize(DeviceUtils.isLargeScreen() ? 14 : 12);
            Text.fontColor('#666666');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width(DeviceUtils.isLargeScreen() ? 24 : 20);
            Column.height(DeviceUtils.isLargeScreen() ? 24 : 20);
            Column.backgroundColor('#F0F0F0');
            Column.borderRadius(DeviceUtils.isLargeScreen() ? 6 : 4);
        }, Column);
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('无');
            Text.fontSize(DeviceUtils.isLargeScreen() ? 12 : 10);
            Text.fontColor('#999999');
            Text.margin({ left: 4, right: DeviceUtils.isLargeScreen() ? 12 : 8 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width(DeviceUtils.isLargeScreen() ? 24 : 20);
            Column.height(DeviceUtils.isLargeScreen() ? 24 : 20);
            Column.backgroundColor('#E3F2FD');
            Column.borderRadius(DeviceUtils.isLargeScreen() ? 6 : 4);
        }, Column);
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('少');
            Text.fontSize(DeviceUtils.isLargeScreen() ? 12 : 10);
            Text.fontColor('#999999');
            Text.margin({ left: 4, right: DeviceUtils.isLargeScreen() ? 12 : 8 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width(DeviceUtils.isLargeScreen() ? 24 : 20);
            Column.height(DeviceUtils.isLargeScreen() ? 24 : 20);
            Column.backgroundColor('#90CAF9');
            Column.borderRadius(DeviceUtils.isLargeScreen() ? 6 : 4);
        }, Column);
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('中');
            Text.fontSize(DeviceUtils.isLargeScreen() ? 12 : 10);
            Text.fontColor('#999999');
            Text.margin({ left: 4, right: DeviceUtils.isLargeScreen() ? 12 : 8 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width(DeviceUtils.isLargeScreen() ? 24 : 20);
            Column.height(DeviceUtils.isLargeScreen() ? 24 : 20);
            Column.backgroundColor('#1976D2');
            Column.borderRadius(DeviceUtils.isLargeScreen() ? 6 : 4);
        }, Column);
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('多');
            Text.fontSize(DeviceUtils.isLargeScreen() ? 12 : 10);
            Text.fontColor('#999999');
            Text.margin({ left: 4 });
        }, Text);
        Text.pop();
        // 图例
        Row.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "AchievementPage";
    }
}
registerNamedRoute(() => new AchievementPage(undefined, {}), "", { bundleName: "com.example.simplecalculator", moduleName: "entry", pagePath: "pages/AchievementPage", pageFullPath: "entry/src/main/ets/pages/AchievementPage", integratedHsp: "false", moduleType: "followWithHap" });
