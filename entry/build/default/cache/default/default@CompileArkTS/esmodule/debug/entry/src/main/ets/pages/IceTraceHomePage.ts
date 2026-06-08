if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface IceTraceHomePage_Params {
    currentBannerIndex?: number;
    dailyKnowledgeIndex?: number;
    banners?: BannerItem[];
    quickEntries?: QuickEntry[];
    navMenus?: NavMenu[];
}
import router from "@ohos:router";
import { IceCard } from "@bundle:com.example.simplecalculator/entry/ets/common/components/IceCard";
import { IceTag } from "@bundle:com.example.simplecalculator/entry/ets/common/components/IceTag";
import { SAMPLE_SKATERS, DAILY_KNOWLEDGE } from "@bundle:com.example.simplecalculator/entry/ets/viewmodel/SampleData";
import { getDisciplineIcon } from "@bundle:com.example.simplecalculator/entry/ets/viewmodel/IceTraceModel";
import type { Skater } from "@bundle:com.example.simplecalculator/entry/ets/viewmodel/IceTraceModel";
class IceTraceHomePage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__currentBannerIndex = new ObservedPropertySimplePU(0, this, "currentBannerIndex");
        this.__dailyKnowledgeIndex = new ObservedPropertySimplePU(0, this, "dailyKnowledgeIndex");
        this.banners = [
            { title: '2024世界锦标赛', subtitle: '蒙特利尔 3月18-24日', type: 'competition' },
            { title: '花滑科普专题', subtitle: '从零开始了解花样滑冰', type: 'wiki' },
            { title: '动作图鉴上线', subtitle: '可视化学习跳跃、旋转', type: 'feature' }
        ];
        this.quickEntries = [
            { icon: '⛸️', title: '动作图鉴', subtitle: '学习跳跃旋转', route: 'pages/MoveGalleryPage' },
            { icon: '📝', title: '知识闯关', subtitle: '答题学知识', route: 'pages/QuizChallengePage' },
            { icon: '🧮', title: '计分工具', subtitle: '模拟计算分数', route: 'pages/ScoringSimulatorPage' },
            { icon: '📖', title: '术语词典', subtitle: '专业词汇查询', route: 'pages/GlossaryPage' }
        ];
        this.navMenus = [
            { title: '赛事中心', icon: '🏆', route: 'pages/CompetitionCenterPage' },
            { title: '选手档案', icon: '👤', route: 'pages/SkaterArchivePage' },
            { title: '数据纪录', icon: '📊', route: 'pages/DataRecordsPage' },
            { title: '花滑科普', icon: '📚', route: 'pages/WikiHomePage' },
            { title: '互动乐园', icon: '🎮', route: 'pages/QuizChallengePage' },
            { title: '计分工具', icon: '🧮', route: 'pages/ScoringSimulatorPage' }
        ];
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: IceTraceHomePage_Params) {
        if (params.currentBannerIndex !== undefined) {
            this.currentBannerIndex = params.currentBannerIndex;
        }
        if (params.dailyKnowledgeIndex !== undefined) {
            this.dailyKnowledgeIndex = params.dailyKnowledgeIndex;
        }
        if (params.banners !== undefined) {
            this.banners = params.banners;
        }
        if (params.quickEntries !== undefined) {
            this.quickEntries = params.quickEntries;
        }
        if (params.navMenus !== undefined) {
            this.navMenus = params.navMenus;
        }
    }
    updateStateVars(params: IceTraceHomePage_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__currentBannerIndex.purgeDependencyOnElmtId(rmElmtId);
        this.__dailyKnowledgeIndex.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__currentBannerIndex.aboutToBeDeleted();
        this.__dailyKnowledgeIndex.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __currentBannerIndex: ObservedPropertySimplePU<number>; // 当前轮播索引
    get currentBannerIndex() {
        return this.__currentBannerIndex.get();
    }
    set currentBannerIndex(newValue: number) {
        this.__currentBannerIndex.set(newValue);
    }
    private __dailyKnowledgeIndex: ObservedPropertySimplePU<number>; // 每日知识索引
    get dailyKnowledgeIndex() {
        return this.__dailyKnowledgeIndex.get();
    }
    set dailyKnowledgeIndex(newValue: number) {
        this.__dailyKnowledgeIndex.set(newValue);
    }
    // 轮播数据
    private banners: BannerItem[];
    // 快速入口
    private quickEntries: QuickEntry[];
    // 导航菜单
    private navMenus: NavMenu[];
    aboutToAppear() {
        // 随机选择每日知识
        this.dailyKnowledgeIndex = Math.floor(Math.random() * DAILY_KNOWLEDGE.length);
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.height('100%');
            Column.backgroundColor('#F5F5F5');
        }, Column);
        // 顶部导航栏
        this.buildNavBar.bind(this)();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 滚动内容区
            Scroll.create();
            // 滚动内容区
            Scroll.layoutWeight(1);
            // 滚动内容区
            Scroll.scrollBar(BarState.Auto);
            // 滚动内容区
            Scroll.edgeEffect(EdgeEffect.Spring);
        }, Scroll);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.padding({ bottom: 20 });
        }, Column);
        // 轮播横幅
        this.buildBanner.bind(this)();
        // 导航菜单
        this.buildNavMenus.bind(this)();
        // 实时赛况
        this.buildLiveCompetition.bind(this)();
        // 热门选手
        this.buildPopularSkaters.bind(this)();
        // 每日一识
        this.buildDailyKnowledge.bind(this)();
        // 近期赛事日历
        this.buildCompetitionCalendar.bind(this)();
        // 快速入口
        this.buildQuickEntries.bind(this)();
        Column.pop();
        // 滚动内容区
        Scroll.pop();
        Column.pop();
    }
    // 构建导航栏
    buildNavBar(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.height(56);
            Row.padding({ left: 20, right: 20 });
            Row.linearGradient({
                angle: 135,
                colors: [['#4FC3F7', 0.0], ['#1976D2', 1.0]]
            });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('⛸️ 冰迹花滑');
            Text.fontSize(20);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#FFFFFF');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 语言切换
            Button.createWithLabel('EN');
            // 语言切换
            Button.fontSize(12);
            // 语言切换
            Button.height(28);
            // 语言切换
            Button.width(40);
            // 语言切换
            Button.backgroundColor('rgba(255,255,255,0.2)');
            // 语言切换
            Button.fontColor('#FFFFFF');
            // 语言切换
            Button.borderRadius(14);
        }, Button);
        // 语言切换
        Button.pop();
        Row.pop();
    }
    // 构建轮播横幅
    buildBanner(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Swiper.create();
            Swiper.width('100%');
            Swiper.height(180);
            Swiper.autoPlay(true);
            Swiper.interval(3000);
            Swiper.indicator(true);
            Swiper.onChange((index: number) => {
                this.currentBannerIndex = index;
            });
            Swiper.margin({ bottom: 16 });
        }, Swiper);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = (_item, index: number) => {
                const banner = _item;
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Column.create();
                    Column.width('100%');
                    Column.height(180);
                    Column.justifyContent(FlexAlign.Center);
                    Column.linearGradient({
                        angle: 135,
                        colors: [['#667eea', 0.0], ['#764ba2', 1.0]]
                    });
                    Column.onClick(() => {
                        // 点击轮播
                    });
                }, Column);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create(banner.title);
                    Text.fontSize(24);
                    Text.fontWeight(FontWeight.Bold);
                    Text.fontColor('#FFFFFF');
                    Text.margin({ bottom: 8 });
                }, Text);
                Text.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create(banner.subtitle);
                    Text.fontSize(14);
                    Text.fontColor('rgba(255,255,255,0.8)');
                }, Text);
                Text.pop();
                Column.pop();
            };
            this.forEachUpdateFunction(elmtId, this.banners, forEachItemGenFunction, (banner: BannerItem) => banner.title, true, false);
        }, ForEach);
        ForEach.pop();
        Swiper.pop();
    }
    // 构建导航菜单
    buildNavMenus(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.padding(16);
            Column.backgroundColor('#FFFFFF');
            Column.margin({ bottom: 16 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('功能导航');
            Text.fontSize(16);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#333333');
            Text.margin({ bottom: 12 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            GridRow.create({
                columns: { sm: 3, md: 6, lg: 6 },
                gutter: 12
            });
        }, GridRow);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const menu = _item;
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    GridCol.create({ span: 1 });
                }, GridCol);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Column.create();
                    Column.width('100%');
                    Column.height(80);
                    Column.backgroundColor('#FFFFFF');
                    Column.borderRadius(8);
                    Column.justifyContent(FlexAlign.Center);
                    Column.onClick(() => {
                        router.pushUrl({ url: menu.route });
                    });
                }, Column);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create(menu.icon);
                    Text.fontSize(32);
                    Text.margin({ bottom: 8 });
                }, Text);
                Text.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create(menu.title);
                    Text.fontSize(12);
                    Text.fontColor('#666666');
                }, Text);
                Text.pop();
                Column.pop();
                GridCol.pop();
            };
            this.forEachUpdateFunction(elmtId, this.navMenus, forEachItemGenFunction, (menu: NavMenu) => menu.title, false, false);
        }, ForEach);
        ForEach.pop();
        GridRow.pop();
        Column.pop();
    }
    // 构建实时赛况
    buildLiveCompetition(parent = null) {
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new IceCard(this, {
                        title: '🏆 实时赛况',
                        subtitle: '正在进行',
                        onCardClick: () => {
                            router.pushUrl({ url: 'pages/CompetitionCenterPage' });
                        },
                        content: () => {
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Column.create();
                                Column.width('100%');
                            }, Column);
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Row.create();
                                Row.width('100%');
                                Row.margin({ bottom: 8 });
                            }, Row);
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Text.create('2024世界锦标赛');
                                Text.fontSize(14);
                                Text.fontWeight(FontWeight.Bold);
                                Text.fontColor('#333333');
                            }, Text);
                            Text.pop();
                            {
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    if (isInitialRender) {
                                        let componentCall = new IceTag(this, { text: '进行中', type: 'primary', tagSize: 'small' }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/IceTraceHomePage.ets", line: 218, col: 11 });
                                        ViewPU.create(componentCall);
                                        let paramsLambda = () => {
                                            return {
                                                text: '进行中',
                                                type: 'primary',
                                                tagSize: 'small'
                                            };
                                        };
                                        componentCall.paramsGenerator_ = paramsLambda;
                                    }
                                    else {
                                        this.updateStateVarsOfChildByElmtId(elmtId, {
                                            text: '进行中', type: 'primary', tagSize: 'small'
                                        });
                                    }
                                }, { name: "IceTag" });
                            }
                            Row.pop();
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Text.create('男子单人滑 自由滑');
                                Text.fontSize(12);
                                Text.fontColor('#666666');
                                Text.margin({ bottom: 12 });
                            }, Text);
                            Text.pop();
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Row.create();
                                Row.width('100%');
                            }, Row);
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Text.create('🥇 陈巍 (USA)');
                                Text.fontSize(14);
                                Text.fontColor('#333333');
                                Text.layoutWeight(1);
                            }, Text);
                            Text.pop();
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Text.create('332.60');
                                Text.fontSize(14);
                                Text.fontWeight(FontWeight.Bold);
                                Text.fontColor('#1976D2');
                            }, Text);
                            Text.pop();
                            Row.pop();
                            Column.pop();
                        }
                    }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/IceTraceHomePage.ets", line: 204, col: 5 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            title: '🏆 实时赛况',
                            subtitle: '正在进行',
                            onCardClick: () => {
                                router.pushUrl({ url: 'pages/CompetitionCenterPage' });
                            },
                            content: () => {
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    Column.create();
                                    Column.width('100%');
                                }, Column);
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    Row.create();
                                    Row.width('100%');
                                    Row.margin({ bottom: 8 });
                                }, Row);
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    Text.create('2024世界锦标赛');
                                    Text.fontSize(14);
                                    Text.fontWeight(FontWeight.Bold);
                                    Text.fontColor('#333333');
                                }, Text);
                                Text.pop();
                                {
                                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                                        if (isInitialRender) {
                                            let componentCall = new IceTag(this, { text: '进行中', type: 'primary', tagSize: 'small' }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/IceTraceHomePage.ets", line: 218, col: 11 });
                                            ViewPU.create(componentCall);
                                            let paramsLambda = () => {
                                                return {
                                                    text: '进行中',
                                                    type: 'primary',
                                                    tagSize: 'small'
                                                };
                                            };
                                            componentCall.paramsGenerator_ = paramsLambda;
                                        }
                                        else {
                                            this.updateStateVarsOfChildByElmtId(elmtId, {
                                                text: '进行中', type: 'primary', tagSize: 'small'
                                            });
                                        }
                                    }, { name: "IceTag" });
                                }
                                Row.pop();
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    Text.create('男子单人滑 自由滑');
                                    Text.fontSize(12);
                                    Text.fontColor('#666666');
                                    Text.margin({ bottom: 12 });
                                }, Text);
                                Text.pop();
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    Row.create();
                                    Row.width('100%');
                                }, Row);
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    Text.create('🥇 陈巍 (USA)');
                                    Text.fontSize(14);
                                    Text.fontColor('#333333');
                                    Text.layoutWeight(1);
                                }, Text);
                                Text.pop();
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    Text.create('332.60');
                                    Text.fontSize(14);
                                    Text.fontWeight(FontWeight.Bold);
                                    Text.fontColor('#1976D2');
                                }, Text);
                                Text.pop();
                                Row.pop();
                                Column.pop();
                            }
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        title: '🏆 实时赛况',
                        subtitle: '正在进行'
                    });
                }
            }, { name: "IceCard" });
        }
    }
    // 构建热门选手
    buildPopularSkaters(parent = null) {
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new IceCard(this, {
                        title: '⭐ 热门选手',
                        onCardClick: () => {
                            router.pushUrl({ url: 'pages/SkaterArchivePage' });
                        },
                        content: () => {
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Column.create();
                                Column.width('100%');
                            }, Column);
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                ForEach.create();
                                const forEachItemGenFunction = _item => {
                                    const skater = _item;
                                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                                        Row.create();
                                        Row.width('100%');
                                        Row.padding({ top: 8, bottom: 8 });
                                        Row.onClick(() => {
                                            router.pushUrl({
                                                url: 'pages/SkaterDetailPage',
                                                params: { skaterId: skater.id }
                                            });
                                        });
                                    }, Row);
                                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                                        // 头像
                                        Column.create();
                                        // 头像
                                        Column.width(48);
                                        // 头像
                                        Column.height(48);
                                        // 头像
                                        Column.backgroundColor('#F5F5F5');
                                        // 头像
                                        Column.borderRadius(24);
                                        // 头像
                                        Column.justifyContent(FlexAlign.Center);
                                    }, Column);
                                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                                        Text.create('👤');
                                        Text.fontSize(32);
                                    }, Text);
                                    Text.pop();
                                    // 头像
                                    Column.pop();
                                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                                        // 信息
                                        Column.create();
                                        // 信息
                                        Column.layoutWeight(1);
                                        // 信息
                                        Column.alignItems(HorizontalAlign.Start);
                                        // 信息
                                        Column.margin({ left: 12 });
                                    }, Column);
                                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                                        Row.create();
                                        Row.width('100%');
                                    }, Row);
                                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                                        Text.create(skater.name);
                                        Text.fontSize(14);
                                        Text.fontWeight(FontWeight.Bold);
                                        Text.fontColor('#333333');
                                    }, Text);
                                    Text.pop();
                                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                                        Text.create(getDisciplineIcon(skater.discipline));
                                        Text.fontSize(12);
                                        Text.margin({ left: 8 });
                                    }, Text);
                                    Text.pop();
                                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                                        Text.create(skater.nationality);
                                        Text.fontSize(12);
                                        Text.fontColor('#999999');
                                        Text.margin({ left: 4 });
                                    }, Text);
                                    Text.pop();
                                    Row.pop();
                                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                                        Text.create(skater.biography.substring(0, 30) + '...');
                                        Text.fontSize(12);
                                        Text.fontColor('#666666');
                                        Text.margin({ top: 4 });
                                    }, Text);
                                    Text.pop();
                                    // 信息
                                    Column.pop();
                                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                                        Text.create('›');
                                        Text.fontSize(20);
                                        Text.fontColor('#999999');
                                    }, Text);
                                    Text.pop();
                                    Row.pop();
                                };
                                this.forEachUpdateFunction(elmtId, SAMPLE_SKATERS.slice(0, 3), forEachItemGenFunction, (skater: Skater) => skater.id, false, false);
                            }, ForEach);
                            ForEach.pop();
                            Column.pop();
                        }
                    }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/IceTraceHomePage.ets", line: 248, col: 5 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            title: '⭐ 热门选手',
                            onCardClick: () => {
                                router.pushUrl({ url: 'pages/SkaterArchivePage' });
                            },
                            content: () => {
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    Column.create();
                                    Column.width('100%');
                                }, Column);
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    ForEach.create();
                                    const forEachItemGenFunction = _item => {
                                        const skater = _item;
                                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                                            Row.create();
                                            Row.width('100%');
                                            Row.padding({ top: 8, bottom: 8 });
                                            Row.onClick(() => {
                                                router.pushUrl({
                                                    url: 'pages/SkaterDetailPage',
                                                    params: { skaterId: skater.id }
                                                });
                                            });
                                        }, Row);
                                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                                            // 头像
                                            Column.create();
                                            // 头像
                                            Column.width(48);
                                            // 头像
                                            Column.height(48);
                                            // 头像
                                            Column.backgroundColor('#F5F5F5');
                                            // 头像
                                            Column.borderRadius(24);
                                            // 头像
                                            Column.justifyContent(FlexAlign.Center);
                                        }, Column);
                                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                                            Text.create('👤');
                                            Text.fontSize(32);
                                        }, Text);
                                        Text.pop();
                                        // 头像
                                        Column.pop();
                                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                                            // 信息
                                            Column.create();
                                            // 信息
                                            Column.layoutWeight(1);
                                            // 信息
                                            Column.alignItems(HorizontalAlign.Start);
                                            // 信息
                                            Column.margin({ left: 12 });
                                        }, Column);
                                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                                            Row.create();
                                            Row.width('100%');
                                        }, Row);
                                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                                            Text.create(skater.name);
                                            Text.fontSize(14);
                                            Text.fontWeight(FontWeight.Bold);
                                            Text.fontColor('#333333');
                                        }, Text);
                                        Text.pop();
                                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                                            Text.create(getDisciplineIcon(skater.discipline));
                                            Text.fontSize(12);
                                            Text.margin({ left: 8 });
                                        }, Text);
                                        Text.pop();
                                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                                            Text.create(skater.nationality);
                                            Text.fontSize(12);
                                            Text.fontColor('#999999');
                                            Text.margin({ left: 4 });
                                        }, Text);
                                        Text.pop();
                                        Row.pop();
                                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                                            Text.create(skater.biography.substring(0, 30) + '...');
                                            Text.fontSize(12);
                                            Text.fontColor('#666666');
                                            Text.margin({ top: 4 });
                                        }, Text);
                                        Text.pop();
                                        // 信息
                                        Column.pop();
                                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                                            Text.create('›');
                                            Text.fontSize(20);
                                            Text.fontColor('#999999');
                                        }, Text);
                                        Text.pop();
                                        Row.pop();
                                    };
                                    this.forEachUpdateFunction(elmtId, SAMPLE_SKATERS.slice(0, 3), forEachItemGenFunction, (skater: Skater) => skater.id, false, false);
                                }, ForEach);
                                ForEach.pop();
                                Column.pop();
                            }
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        title: '⭐ 热门选手'
                    });
                }
            }, { name: "IceCard" });
        }
    }
    // 构建每日一识
    buildDailyKnowledge(parent = null) {
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new IceCard(this, {
                        title: '💡 每日一识',
                        cardBackgroundColor: '#E3F2FD',
                        content: () => {
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Column.create();
                                Column.width('100%');
                                Column.alignItems(HorizontalAlign.Start);
                            }, Column);
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Text.create(DAILY_KNOWLEDGE[this.dailyKnowledgeIndex].title);
                                Text.fontSize(16);
                                Text.fontWeight(FontWeight.Bold);
                                Text.fontColor('#1976D2');
                                Text.margin({ bottom: 8 });
                            }, Text);
                            Text.pop();
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Text.create(DAILY_KNOWLEDGE[this.dailyKnowledgeIndex].content);
                                Text.fontSize(14);
                                Text.fontColor('#333333');
                                Text.lineHeight(22);
                            }, Text);
                            Text.pop();
                            Column.pop();
                        }
                    }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/IceTraceHomePage.ets", line: 317, col: 5 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            title: '💡 每日一识',
                            cardBackgroundColor: '#E3F2FD',
                            content: () => {
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    Column.create();
                                    Column.width('100%');
                                    Column.alignItems(HorizontalAlign.Start);
                                }, Column);
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    Text.create(DAILY_KNOWLEDGE[this.dailyKnowledgeIndex].title);
                                    Text.fontSize(16);
                                    Text.fontWeight(FontWeight.Bold);
                                    Text.fontColor('#1976D2');
                                    Text.margin({ bottom: 8 });
                                }, Text);
                                Text.pop();
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    Text.create(DAILY_KNOWLEDGE[this.dailyKnowledgeIndex].content);
                                    Text.fontSize(14);
                                    Text.fontColor('#333333');
                                    Text.lineHeight(22);
                                }, Text);
                                Text.pop();
                                Column.pop();
                            }
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        title: '💡 每日一识',
                        cardBackgroundColor: '#E3F2FD'
                    });
                }
            }, { name: "IceCard" });
        }
    }
    // 构建赛事日历
    buildCompetitionCalendar(parent = null) {
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new IceCard(this, {
                        title: '📅 近期赛事',
                        onCardClick: () => {
                            router.pushUrl({ url: 'pages/CompetitionCenterPage' });
                        },
                        content: () => {
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Column.create();
                                Column.width('100%');
                            }, Column);
                            this.CalendarItem.bind(this)('3月18日', '世界锦标赛', '蒙特利尔', '即将开始');
                            this.CalendarItem.bind(this)('4月12日', '世界团体杯', '东京', '即将开始');
                            this.CalendarItem.bind(this)('10月20日', '大奖赛美国站', '普莱西德湖', '预告');
                            Column.pop();
                        }
                    }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/IceTraceHomePage.ets", line: 341, col: 5 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            title: '📅 近期赛事',
                            onCardClick: () => {
                                router.pushUrl({ url: 'pages/CompetitionCenterPage' });
                            },
                            content: () => {
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    Column.create();
                                    Column.width('100%');
                                }, Column);
                                this.CalendarItem.bind(this)('3月18日', '世界锦标赛', '蒙特利尔', '即将开始');
                                this.CalendarItem.bind(this)('4月12日', '世界团体杯', '东京', '即将开始');
                                this.CalendarItem.bind(this)('10月20日', '大奖赛美国站', '普莱西德湖', '预告');
                                Column.pop();
                            }
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        title: '📅 近期赛事'
                    });
                }
            }, { name: "IceCard" });
        }
    }
    CalendarItem(date: string, name: string, location: string, status: string, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.padding({ top: 8, bottom: 8 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width(50);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(date.split('月')[1].replace('日', ''));
            Text.fontSize(20);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#1976D2');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(date.split('月')[0] + '月');
            Text.fontSize(12);
            Text.fontColor('#666666');
        }, Text);
        Text.pop();
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.layoutWeight(1);
            Column.alignItems(HorizontalAlign.Start);
            Column.margin({ left: 12 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(name);
            Text.fontSize(14);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#333333');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(location);
            Text.fontSize(12);
            Text.fontColor('#999999');
            Text.margin({ top: 4 });
        }, Text);
        Text.pop();
        Column.pop();
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new IceTag(this, { text: status, type: status === '即将开始' ? 'warning' : 'default', tagSize: 'small' }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/IceTraceHomePage.ets", line: 386, col: 7 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            text: status,
                            type: status === '即将开始' ? 'warning' : 'default',
                            tagSize: 'small'
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        text: status, type: status === '即将开始' ? 'warning' : 'default', tagSize: 'small'
                    });
                }
            }, { name: "IceTag" });
        }
        Row.pop();
    }
    // 构建快速入口
    buildQuickEntries(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.padding(16);
            Column.margin({ top: 16 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('快速入口');
            Text.fontSize(16);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#333333');
            Text.margin({ bottom: 12 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            GridRow.create({
                columns: { sm: 2, md: 4, lg: 4 },
                gutter: 12
            });
        }, GridRow);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const entry = _item;
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    GridCol.create({ span: 1 });
                }, GridCol);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Column.create();
                    Column.width('100%');
                    Column.height(120);
                    Column.backgroundColor('#FFFFFF');
                    Column.borderRadius(12);
                    Column.justifyContent(FlexAlign.Center);
                    Column.shadow({
                        radius: 8,
                        color: '#1A000000',
                        offsetX: 0,
                        offsetY: 2
                    });
                    Column.onClick(() => {
                        router.pushUrl({ url: entry.route });
                    });
                }, Column);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create(entry.icon);
                    Text.fontSize(40);
                    Text.margin({ bottom: 8 });
                }, Text);
                Text.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create(entry.title);
                    Text.fontSize(14);
                    Text.fontWeight(FontWeight.Bold);
                    Text.fontColor('#333333');
                }, Text);
                Text.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create(entry.subtitle);
                    Text.fontSize(12);
                    Text.fontColor('#999999');
                    Text.margin({ top: 4 });
                }, Text);
                Text.pop();
                Column.pop();
                GridCol.pop();
            };
            this.forEachUpdateFunction(elmtId, this.quickEntries, forEachItemGenFunction, (entry: QuickEntry) => entry.title, false, false);
        }, ForEach);
        ForEach.pop();
        GridRow.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "IceTraceHomePage";
    }
}
// 数据类型定义
interface BannerItem {
    title: string;
    subtitle: string;
    type: string;
}
interface QuickEntry {
    icon: string;
    title: string;
    subtitle: string;
    route: string;
}
interface NavMenu {
    title: string;
    icon: string;
    route: string;
}
registerNamedRoute(() => new IceTraceHomePage(undefined, {}), "", { bundleName: "com.example.simplecalculator", moduleName: "entry", pagePath: "pages/IceTraceHomePage", pageFullPath: "entry/src/main/ets/pages/IceTraceHomePage", integratedHsp: "false", moduleType: "followWithHap" });
