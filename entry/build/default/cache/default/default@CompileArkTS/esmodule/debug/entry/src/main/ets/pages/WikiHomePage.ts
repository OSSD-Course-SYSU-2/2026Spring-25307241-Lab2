if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface WikiHomePage_Params {
    selectedCategory?: string;
    wikiModules?: WikiModule[];
    guides?: Guide[];
}
import router from "@ohos:router";
import { IceNavBar } from "@bundle:com.example.simplecalculator/entry/ets/common/components/IceNavBar";
class WikiHomePage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__selectedCategory = new ObservedPropertySimplePU('basics', this, "selectedCategory");
        this.wikiModules = [
            {
                id: 'discipline',
                icon: '⛸️',
                title: '项目分类',
                subtitle: '了解四大项目区别',
                description: '男单、女单、双人滑、冰舞的区别与特点',
                route: 'pages/WikiDisciplinePage',
                color: '#4FC3F7'
            },
            {
                id: 'elements',
                icon: '🔄',
                title: '动作图鉴',
                subtitle: '可视化学习动作',
                description: '跳跃、旋转、步法、托举全解析',
                route: 'pages/MoveGalleryPage',
                color: '#66BB6A'
            },
            {
                id: 'glossary',
                icon: '📖',
                title: '术语词典',
                subtitle: '专业词汇查询',
                description: 'GOE、PCS、TES等术语详解',
                route: 'pages/GlossaryPage',
                color: '#FFA726'
            },
            {
                id: 'program',
                icon: '🎵',
                title: '节目科普',
                subtitle: '短节目与自由滑',
                description: '节目规则、时长、编排要求',
                route: 'pages/WikiProgramPage',
                color: '#AB47BC'
            }
        ];
        this.guides = [
            { title: '新手观赛指南', icon: '👀', description: '如何看懂一场比赛' },
            { title: '评分系统入门', icon: '📊', description: 'ISU评分规则详解' },
            { title: '装备与礼仪', icon: '👔', description: '服装、冰刀、观赛礼仪' },
            { title: '赛事等级说明', icon: '🏆', description: '各大赛事级别划分' }
        ];
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: WikiHomePage_Params) {
        if (params.selectedCategory !== undefined) {
            this.selectedCategory = params.selectedCategory;
        }
        if (params.wikiModules !== undefined) {
            this.wikiModules = params.wikiModules;
        }
        if (params.guides !== undefined) {
            this.guides = params.guides;
        }
    }
    updateStateVars(params: WikiHomePage_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__selectedCategory.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__selectedCategory.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __selectedCategory: ObservedPropertySimplePU<string>; // basics, elements, rules, history
    get selectedCategory() {
        return this.__selectedCategory.get();
    }
    set selectedCategory(newValue: string) {
        this.__selectedCategory.set(newValue);
    }
    // 科普模块
    private wikiModules: WikiModule[];
    // 入门指南
    private guides: Guide[];
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
                        title: '花滑科普',
                        showBack: true,
                        navBackgroundColor: '#4FC3F7'
                    }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/WikiHomePage.ets", line: 66, col: 7 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            title: '花滑科普',
                            showBack: true,
                            navBackgroundColor: '#4FC3F7'
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        title: '花滑科普',
                        showBack: true,
                        navBackgroundColor: '#4FC3F7'
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
        // 欢迎横幅
        this.buildWelcomeBanner.bind(this)();
        // 核心科普模块
        this.buildWikiModules.bind(this)();
        // 入门指南
        this.buildGuides.bind(this)();
        // 推荐学习路径
        this.buildLearningPath.bind(this)();
        Column.pop();
        // 内容区
        Scroll.pop();
        Column.pop();
    }
    // 欢迎横幅
    buildWelcomeBanner(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.height(150);
            Column.justifyContent(FlexAlign.Center);
            Column.linearGradient({
                angle: 135,
                colors: [['#4FC3F7', 0.0], ['#1976D2', 1.0]]
            });
            Column.borderRadius(16);
            Column.margin({ bottom: 20 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('欢迎来到花滑世界');
            Text.fontSize(24);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#FFFFFF');
            Text.margin({ bottom: 8 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('从零开始，轻松入门花样滑冰');
            Text.fontSize(14);
            Text.fontColor('rgba(255,255,255,0.8)');
        }, Text);
        Text.pop();
        Column.pop();
    }
    // 核心科普模块
    buildWikiModules(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.alignItems(HorizontalAlign.Start);
            Column.margin({ bottom: 24 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('核心科普模块');
            Text.fontSize(18);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#333333');
            Text.margin({ bottom: 16 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            GridRow.create({
                columns: { sm: 1, md: 2, lg: 2 },
                gutter: 16
            });
        }, GridRow);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const module = _item;
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    GridCol.create({ span: 1 });
                }, GridCol);
                this.WikiModuleCard.bind(this)(module);
                GridCol.pop();
            };
            this.forEachUpdateFunction(elmtId, this.wikiModules, forEachItemGenFunction, (module: WikiModule) => module.id, false, false);
        }, ForEach);
        ForEach.pop();
        GridRow.pop();
        Column.pop();
    }
    WikiModuleCard(module: WikiModule, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.padding(20);
            Column.backgroundColor('#FFFFFF');
            Column.borderRadius(12);
            Column.shadow({
                radius: 8,
                color: '#1A000000',
                offsetX: 0,
                offsetY: 2
            });
            Column.onClick(() => {
                router.pushUrl({ url: module.route });
            });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.margin({ bottom: 12 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(module.icon);
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
            Text.create(module.title);
            Text.fontSize(16);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#333333');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(module.subtitle);
            Text.fontSize(12);
            Text.fontColor('#999999');
            Text.margin({ top: 4 });
        }, Text);
        Text.pop();
        Column.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(module.description);
            Text.fontSize(14);
            Text.fontColor('#666666');
            Text.lineHeight(22);
        }, Text);
        Text.pop();
        Column.pop();
    }
    // 入门指南
    buildGuides(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.alignItems(HorizontalAlign.Start);
            Column.margin({ bottom: 24 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('入门指南');
            Text.fontSize(18);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#333333');
            Text.margin({ bottom: 16 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const guide = _item;
                this.GuideItem.bind(this)(guide);
            };
            this.forEachUpdateFunction(elmtId, this.guides, forEachItemGenFunction, (guide: Guide) => guide.title, false, false);
        }, ForEach);
        ForEach.pop();
        Column.pop();
        Column.pop();
    }
    GuideItem(guide: Guide, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.padding(16);
            Row.backgroundColor('#FFFFFF');
            Row.borderRadius(12);
            Row.margin({ bottom: 12 });
            Row.onClick(() => {
                // 导航到具体指南页面
            });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(guide.icon);
            Text.fontSize(32);
            Text.margin({ right: 16 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.alignItems(HorizontalAlign.Start);
            Column.layoutWeight(1);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(guide.title);
            Text.fontSize(16);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#333333');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(guide.description);
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
    // 推荐学习路径
    buildLearningPath(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.alignItems(HorizontalAlign.Start);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('推荐学习路径');
            Text.fontSize(18);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#333333');
            Text.margin({ bottom: 16 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
        }, Column);
        this.PathStep.bind(this)('1', '了解项目分类', '认识四大项目的区别');
        this.PathStep.bind(this)('2', '学习基础动作', '掌握跳跃、旋转等基本概念');
        this.PathStep.bind(this)('3', '理解评分系统', '学习ISU评分规则');
        this.PathStep.bind(this)('4', '观看经典节目', '在实践中巩固知识');
        Column.pop();
        Column.pop();
    }
    PathStep(step: string, title: string, description: string, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.padding({ top: 8, bottom: 8 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width(40);
            Column.height(40);
            Column.backgroundColor('#4FC3F7');
            Column.borderRadius(20);
            Column.justifyContent(FlexAlign.Center);
            Column.margin({ right: 16 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(step);
            Text.fontSize(18);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#FFFFFF');
        }, Text);
        Text.pop();
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.alignItems(HorizontalAlign.Start);
            Column.layoutWeight(1);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(title);
            Text.fontSize(16);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#333333');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(description);
            Text.fontSize(12);
            Text.fontColor('#999999');
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
        return "WikiHomePage";
    }
}
// 数据类型
interface WikiModule {
    id: string;
    icon: string;
    title: string;
    subtitle: string;
    description: string;
    route: string;
    color: string;
}
interface Guide {
    title: string;
    icon: string;
    description: string;
}
registerNamedRoute(() => new WikiHomePage(undefined, {}), "", { bundleName: "com.example.simplecalculator", moduleName: "entry", pagePath: "pages/WikiHomePage", pageFullPath: "entry/src/main/ets/pages/WikiHomePage", integratedHsp: "false", moduleType: "followWithHap" });
