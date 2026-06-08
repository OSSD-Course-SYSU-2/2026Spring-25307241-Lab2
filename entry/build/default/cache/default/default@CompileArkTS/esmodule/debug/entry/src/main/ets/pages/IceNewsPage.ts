if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface IceNewsPage_Params {
    selectedTab?: string;
    currentBannerIndex?: number;
    selectedScienceCategory?: string;
    collectedItems?: string[];
    bannerTimer?: number;
    banners?: BannerItem[];
    dailyKnowledge?: DailyKnowledge;
    todaySchedule?: TodaySchedule;
    newsList?: NewsItem[];
    scienceCategories?: ScienceCategory[];
    scienceList?: ScienceItem[];
}
/**
 * 冰迹·EdgeFlow - 冰闻页面
 * 每日新闻与科普聚合页
 */
interface BannerItem {
    title: string;
    subtitle: string;
    tag: string;
    color: string;
}
interface NewsItem {
    title: string;
    source: string;
    time: string;
    category: string;
}
interface ScienceCategory {
    id: string;
    name: string;
    icon: string;
}
interface ScienceItem {
    title: string;
    category: string;
    readTime: string;
    id: string;
}
interface DailyKnowledge {
    question: string;
    answer: string;
}
interface TodaySchedule {
    event: string;
    time: string;
    status: string;
}
export class IceNewsPage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__selectedTab = new ObservedPropertySimplePU('news', this, "selectedTab");
        this.__currentBannerIndex = new ObservedPropertySimplePU(0, this, "currentBannerIndex");
        this.__selectedScienceCategory = new ObservedPropertySimplePU('all', this, "selectedScienceCategory");
        this.__collectedItems = new ObservedPropertyObjectPU([], this, "collectedItems");
        this.bannerTimer = -1;
        this.banners = [
            { title: '宇野昌磨宣布新赛季曲目', subtitle: '将演绎《图兰朵》', tag: '热点', color: '#667eea' },
            { title: 'ISU发布新评分规则', subtitle: '2024-25赛季生效', tag: '官方', color: '#764ba2' },
            { title: '陈巍宣布退役', subtitle: '结束职业生涯', tag: '快讯', color: '#FF6B6B' }
        ];
        this.dailyKnowledge = {
            question: '为什么阿克塞尔跳是唯一向前起跳的跳跃？',
            answer: '因为阿克塞尔跳从向后滑行起跳，其他跳跃都从向后滑行起跳，所以实际的阿克塞尔跳旋转周数多半周。'
        };
        this.todaySchedule = {
            event: '世界花样滑冰锦标赛',
            time: '今晚 20:00',
            status: '即将开始'
        };
        this.newsList = [
            { title: '2024世锦参赛名单公布', source: 'ISU官网', time: '2小时前', category: '赛事' },
            { title: '羽生结弦转职职业选手后首秀', source: '日刊体育', time: '5小时前', category: '选手' },
            { title: '新规则解析：GOE调整影响分析', source: '滑冰协会', time: '1天前', category: '规则' },
            { title: '金妍儿现身平昌冬奥纪念活动', source: '韩联社', time: '1天前', category: '选手' },
            { title: '中国杯大奖赛门票开售', source: '官方公告', time: '2天前', category: '赛事' }
        ];
        this.scienceCategories = [
            { id: 'all', name: '全部', icon: '📚' },
            { id: 'tech', name: '技术解剖', icon: '🔬' },
            { id: 'equip', name: '装备保养', icon: '⛸️' },
            { id: 'fitness', name: '陆地体能', icon: '💪' },
            { id: 'recovery', name: '运动康复', icon: '🏥' }
        ];
        this.scienceList = [
            { title: '技术解剖：三周跳的空中姿态', category: 'tech', readTime: '5分钟', id: 's1' },
            { title: '装备保养：冰刀磨刃周期指南', category: 'equip', readTime: '3分钟', id: 's2' },
            { title: '陆地体能：核心力量训练系列', category: 'fitness', readTime: '8分钟', id: 's3' },
            { title: '运动康复：常见损伤预防', category: 'recovery', readTime: '6分钟', id: 's4' },
            { title: '技术解剖：旋转速度提升技巧', category: 'tech', readTime: '4分钟', id: 's5' },
            { title: '装备保养：冰鞋热塑技术详解', category: 'equip', readTime: '5分钟', id: 's6' }
        ];
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: IceNewsPage_Params) {
        if (params.selectedTab !== undefined) {
            this.selectedTab = params.selectedTab;
        }
        if (params.currentBannerIndex !== undefined) {
            this.currentBannerIndex = params.currentBannerIndex;
        }
        if (params.selectedScienceCategory !== undefined) {
            this.selectedScienceCategory = params.selectedScienceCategory;
        }
        if (params.collectedItems !== undefined) {
            this.collectedItems = params.collectedItems;
        }
        if (params.bannerTimer !== undefined) {
            this.bannerTimer = params.bannerTimer;
        }
        if (params.banners !== undefined) {
            this.banners = params.banners;
        }
        if (params.dailyKnowledge !== undefined) {
            this.dailyKnowledge = params.dailyKnowledge;
        }
        if (params.todaySchedule !== undefined) {
            this.todaySchedule = params.todaySchedule;
        }
        if (params.newsList !== undefined) {
            this.newsList = params.newsList;
        }
        if (params.scienceCategories !== undefined) {
            this.scienceCategories = params.scienceCategories;
        }
        if (params.scienceList !== undefined) {
            this.scienceList = params.scienceList;
        }
    }
    updateStateVars(params: IceNewsPage_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__selectedTab.purgeDependencyOnElmtId(rmElmtId);
        this.__currentBannerIndex.purgeDependencyOnElmtId(rmElmtId);
        this.__selectedScienceCategory.purgeDependencyOnElmtId(rmElmtId);
        this.__collectedItems.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__selectedTab.aboutToBeDeleted();
        this.__currentBannerIndex.aboutToBeDeleted();
        this.__selectedScienceCategory.aboutToBeDeleted();
        this.__collectedItems.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __selectedTab: ObservedPropertySimplePU<string>;
    get selectedTab() {
        return this.__selectedTab.get();
    }
    set selectedTab(newValue: string) {
        this.__selectedTab.set(newValue);
    }
    private __currentBannerIndex: ObservedPropertySimplePU<number>;
    get currentBannerIndex() {
        return this.__currentBannerIndex.get();
    }
    set currentBannerIndex(newValue: number) {
        this.__currentBannerIndex.set(newValue);
    }
    private __selectedScienceCategory: ObservedPropertySimplePU<string>;
    get selectedScienceCategory() {
        return this.__selectedScienceCategory.get();
    }
    set selectedScienceCategory(newValue: string) {
        this.__selectedScienceCategory.set(newValue);
    }
    private __collectedItems: ObservedPropertyObjectPU<string[]>;
    get collectedItems() {
        return this.__collectedItems.get();
    }
    set collectedItems(newValue: string[]) {
        this.__collectedItems.set(newValue);
    }
    private bannerTimer: number;
    // Banner数据
    private banners: BannerItem[];
    // 每日知识
    private dailyKnowledge: DailyKnowledge;
    // 今日赛程
    private todaySchedule: TodaySchedule;
    // 新闻列表
    private newsList: NewsItem[];
    // 科普分类
    private scienceCategories: ScienceCategory[];
    // 科普列表
    private scienceList: ScienceItem[];
    aboutToAppear() {
        this.bannerTimer = setInterval(() => {
            this.currentBannerIndex = (this.currentBannerIndex + 1) % this.banners.length;
        }, 3000);
    }
    aboutToDisappear() {
        if (this.bannerTimer !== -1) {
            clearInterval(this.bannerTimer);
        }
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Stack.create();
            Stack.width('100%');
            Stack.height('100%');
        }, Stack);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.height('100%');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 顶部标题
            Row.create();
            // 顶部标题
            Row.width('100%');
            // 顶部标题
            Row.padding({ left: 20, right: 20, top: 20, bottom: 15 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('冰闻');
            Text.fontSize(24);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#FFFFFF');
        }, Text);
        Text.pop();
        // 顶部标题
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Scroll.create();
            Scroll.width('100%');
            Scroll.layoutWeight(1);
            Scroll.scrollBar(BarState.Off);
        }, Scroll);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
        }, Column);
        // Banner轮播
        this.buildBanner.bind(this)();
        // 双卡槽
        this.buildCards.bind(this)();
        // Tab切换
        this.buildTabs.bind(this)();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            // 内容列表
            if (this.selectedTab === 'news') {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.buildNewsList.bind(this)();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                    this.buildScienceList.bind(this)();
                });
            }
        }, If);
        If.pop();
        Column.pop();
        Scroll.pop();
        Column.pop();
        Stack.pop();
    }
    buildBanner(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Stack.create();
            Stack.width('100%');
            Stack.height(160);
            Stack.padding({ left: 20, right: 20 });
        }, Stack);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.height(150);
            Column.padding(20);
            Column.linearGradient({
                angle: 90,
                colors: [[this.banners[this.currentBannerIndex].color, 0.0], ['#3A7BD5', 1.0]]
            });
            Column.borderRadius(15);
            Column.alignItems(HorizontalAlign.Start);
            Column.justifyContent(FlexAlign.End);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.banners[this.currentBannerIndex].title);
            Text.fontSize(18);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#FFFFFF');
            Text.maxLines(2);
            Text.textOverflow({ overflow: TextOverflow.Ellipsis });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.banners[this.currentBannerIndex].subtitle);
            Text.fontSize(14);
            Text.fontColor('rgba(255, 255, 255, 0.8)');
            Text.margin({ top: 8 });
        }, Text);
        Text.pop();
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.banners[this.currentBannerIndex].tag);
            Text.fontSize(12);
            Text.fontColor('#FFFFFF');
            Text.backgroundColor('#FF6B6B');
            Text.borderRadius(10);
            Text.padding({ left: 10, right: 10, top: 5, bottom: 5 });
            Text.position({ x: 20, y: 20 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.position({ x: '50%', y: 140 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const index = _item;
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Circle.create();
                    Circle.width(this.currentBannerIndex === index ? 20 : 8);
                    Circle.height(8);
                    Circle.fill(this.currentBannerIndex === index ? '#FFFFFF' : 'rgba(255, 255, 255, 0.5)');
                    Circle.margin({ right: 5 });
                }, Circle);
            };
            this.forEachUpdateFunction(elmtId, [0, 1, 2], forEachItemGenFunction);
        }, ForEach);
        ForEach.pop();
        Row.pop();
        Stack.pop();
    }
    buildCards(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.padding({ left: 20, right: 20, top: 15, bottom: 15 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('45%');
            Column.height(110);
            Column.backgroundColor('#FFFFFF');
            Column.borderRadius(15);
            Column.justifyContent(FlexAlign.Center);
            Column.padding(10);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('📅');
            Text.fontSize(24);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('今日赛程');
            Text.fontSize(14);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#333333');
            Text.margin({ top: 8 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.todaySchedule.event);
            Text.fontSize(11);
            Text.fontColor('#666666');
            Text.maxLines(1);
            Text.textOverflow({ overflow: TextOverflow.Ellipsis });
            Text.margin({ top: 5 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.todaySchedule.time);
            Text.fontSize(12);
            Text.fontColor('#FF6B6B');
            Text.fontWeight(FontWeight.Bold);
            Text.margin({ top: 3 });
        }, Text);
        Text.pop();
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('45%');
            Column.height(110);
            Column.backgroundColor('#FFFFFF');
            Column.borderRadius(15);
            Column.justifyContent(FlexAlign.Center);
            Column.padding(10);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('❄️');
            Text.fontSize(24);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('今日冷知识');
            Text.fontSize(14);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#333333');
            Text.margin({ top: 8 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.dailyKnowledge.question);
            Text.fontSize(10);
            Text.fontColor('#666666');
            Text.maxLines(2);
            Text.textOverflow({ overflow: TextOverflow.Ellipsis });
            Text.margin({ top: 5 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('收藏');
            Text.fontSize(11);
            Text.fontColor('#3A7BD5');
        }, Text);
        Text.pop();
        Row.pop();
        Column.pop();
        Row.pop();
    }
    buildTabs(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.padding({ left: 20, right: 20, bottom: 15 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('资讯');
            Text.fontSize(16);
            Text.fontWeight(this.selectedTab === 'news' ? FontWeight.Bold : FontWeight.Normal);
            Text.fontColor(this.selectedTab === 'news' ? '#FFFFFF' : 'rgba(255, 255, 255, 0.7)');
            Text.padding({ left: 20, right: 20, top: 10, bottom: 10 });
            Text.backgroundColor(this.selectedTab === 'news' ? 'rgba(255, 255, 255, 0.3)' : 'transparent');
            Text.borderRadius(20);
            Text.onClick(() => {
                this.selectedTab = 'news';
            });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('科普');
            Text.fontSize(16);
            Text.fontWeight(this.selectedTab === 'science' ? FontWeight.Bold : FontWeight.Normal);
            Text.fontColor(this.selectedTab === 'science' ? '#FFFFFF' : 'rgba(255, 255, 255, 0.7)');
            Text.padding({ left: 20, right: 20, top: 10, bottom: 10 });
            Text.backgroundColor(this.selectedTab === 'science' ? 'rgba(255, 255, 255, 0.3)' : 'transparent');
            Text.borderRadius(20);
            Text.margin({ left: 15 });
            Text.onClick(() => {
                this.selectedTab = 'science';
            });
        }, Text);
        Text.pop();
        Row.pop();
    }
    buildNewsList(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.padding({ left: 20, right: 20 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const news = _item;
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Row.create();
                    Row.width('100%');
                    Row.padding(15);
                    Row.backgroundColor('#FFFFFF');
                    Row.borderRadius(12);
                    Row.margin({ bottom: 10 });
                }, Row);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Column.create();
                    Column.alignItems(HorizontalAlign.Start);
                    Column.layoutWeight(1);
                }, Column);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create(news.title);
                    Text.fontSize(15);
                    Text.fontWeight(FontWeight.Bold);
                    Text.fontColor('#333333');
                    Text.maxLines(2);
                    Text.textOverflow({ overflow: TextOverflow.Ellipsis });
                }, Text);
                Text.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Row.create();
                    Row.margin({ top: 8 });
                }, Row);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create(news.source);
                    Text.fontSize(12);
                    Text.fontColor('#999999');
                }, Text);
                Text.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create('·');
                    Text.fontSize(12);
                    Text.fontColor('#999999');
                    Text.margin({ left: 5, right: 5 });
                }, Text);
                Text.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create(news.time);
                    Text.fontSize(12);
                    Text.fontColor('#999999');
                }, Text);
                Text.pop();
                Row.pop();
                Column.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create(news.category);
                    Text.fontSize(12);
                    Text.fontColor('#FFFFFF');
                    Text.backgroundColor(this.getCategoryColor(news.category));
                    Text.borderRadius(10);
                    Text.padding({ left: 8, right: 8, top: 4, bottom: 4 });
                }, Text);
                Text.pop();
                Row.pop();
            };
            this.forEachUpdateFunction(elmtId, this.newsList, forEachItemGenFunction);
        }, ForEach);
        ForEach.pop();
        Column.pop();
    }
    buildScienceList(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.padding({ left: 20, right: 20 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Scroll.create();
            Scroll.scrollable(ScrollDirection.Horizontal);
            Scroll.scrollBar(BarState.Off);
            Scroll.width('100%');
            Scroll.padding({ bottom: 15 });
        }, Scroll);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const cat = _item;
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Row.create();
                    Row.backgroundColor(this.selectedScienceCategory === cat.id ? 'rgba(255, 255, 255, 0.3)' : 'rgba(255, 255, 255, 0.1)');
                    Row.borderRadius(15);
                    Row.padding({ left: 12, right: 12, top: 8, bottom: 8 });
                    Row.margin({ right: 10 });
                    Row.onClick(() => {
                        this.selectedScienceCategory = cat.id;
                    });
                }, Row);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create(cat.icon);
                    Text.fontSize(14);
                }, Text);
                Text.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create(cat.name);
                    Text.fontSize(13);
                    Text.fontColor(this.selectedScienceCategory === cat.id ? '#FFFFFF' : 'rgba(255, 255, 255, 0.8)');
                    Text.margin({ left: 4 });
                }, Text);
                Text.pop();
                Row.pop();
            };
            this.forEachUpdateFunction(elmtId, this.scienceCategories, forEachItemGenFunction);
        }, ForEach);
        ForEach.pop();
        Row.pop();
        Scroll.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const item = _item;
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    If.create();
                    if (this.selectedScienceCategory === 'all' || this.selectedScienceCategory === item.category) {
                        this.ifElseBranchUpdateFunction(0, () => {
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Row.create();
                                Row.width('100%');
                                Row.padding(15);
                                Row.backgroundColor('#FFFFFF');
                                Row.borderRadius(12);
                                Row.margin({ bottom: 10 });
                            }, Row);
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Column.create();
                                Column.alignItems(HorizontalAlign.Start);
                                Column.layoutWeight(1);
                            }, Column);
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Row.create();
                            }, Row);
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Text.create(this.getScienceIcon(item.category));
                                Text.fontSize(20);
                            }, Text);
                            Text.pop();
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Text.create(this.getScienceCategoryName(item.category));
                                Text.fontSize(12);
                                Text.fontColor('#999999');
                                Text.margin({ left: 5 });
                            }, Text);
                            Text.pop();
                            Row.pop();
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Text.create(item.title);
                                Text.fontSize(15);
                                Text.fontWeight(FontWeight.Bold);
                                Text.fontColor('#333333');
                                Text.margin({ top: 8 });
                                Text.maxLines(2);
                                Text.textOverflow({ overflow: TextOverflow.Ellipsis });
                            }, Text);
                            Text.pop();
                            Column.pop();
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Column.create();
                                Column.width(60);
                            }, Column);
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Text.create(item.readTime);
                                Text.fontSize(12);
                                Text.fontColor('#999999');
                            }, Text);
                            Text.pop();
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Text.create(this.collectedItems.includes(item.id) ? '❤️' : '🤍');
                                Text.fontSize(20);
                                Text.margin({ top: 10 });
                                Text.onClick(() => {
                                    if (this.collectedItems.includes(item.id)) {
                                        this.collectedItems = this.collectedItems.filter((id: string) => id !== item.id);
                                    }
                                    else {
                                        this.collectedItems.push(item.id);
                                    }
                                });
                            }, Text);
                            Text.pop();
                            Column.pop();
                            Row.pop();
                        });
                    }
                    else {
                        this.ifElseBranchUpdateFunction(1, () => {
                        });
                    }
                }, If);
                If.pop();
            };
            this.forEachUpdateFunction(elmtId, this.scienceList, forEachItemGenFunction);
        }, ForEach);
        ForEach.pop();
        Column.pop();
    }
    private getCategoryColor(category: string): string {
        if (category === '赛事')
            return '#4FC3F7';
        if (category === '选手')
            return '#FF6B6B';
        if (category === '规则')
            return '#66BB6A';
        return '#999999';
    }
    private getScienceIcon(category: string): string {
        if (category === 'tech')
            return '🔬';
        if (category === 'equip')
            return '⛸️';
        if (category === 'fitness')
            return '💪';
        if (category === 'recovery')
            return '🏥';
        return '📚';
    }
    private getScienceCategoryName(category: string): string {
        if (category === 'tech')
            return '技术解剖';
        if (category === 'equip')
            return '装备保养';
        if (category === 'fitness')
            return '陆地体能';
        if (category === 'recovery')
            return '运动康复';
        return '其他';
    }
    rerender() {
        this.updateDirtyElements();
    }
}
