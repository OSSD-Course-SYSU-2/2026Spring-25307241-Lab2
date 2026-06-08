if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface HistoryTimelinePage_Params {
    timelineEvents?: TimelineEvent[];
}
import { IceNavBar } from "@bundle:com.example.simplecalculator/entry/ets/common/components/IceNavBar";
class HistoryTimelinePage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.timelineEvents = [
            {
                year: '1908',
                title: '花样滑冰首次进入奥运会',
                description: '在伦敦奥运会上，花样滑冰成为奥运会正式比赛项目，这是冬季项目首次进入奥运会。',
                icon: '🏆',
                type: 'milestone'
            },
            {
                year: '1924',
                title: '首届冬奥会举办',
                description: '法国夏蒙尼举办首届冬季奥运会，花样滑冰成为核心项目。',
                icon: '❄️',
                type: 'milestone'
            },
            {
                year: '1952',
                title: '迪克·按钮时代',
                description: '美国选手迪克·按钮完成首个三周跳，开创现代花样滑冰技术时代。',
                icon: '⛸️',
                type: 'technical'
            },
            {
                year: '1976',
                title: '冰上舞蹈成为正式项目',
                description: '因斯布鲁克冬奥会上，冰上舞蹈首次成为正式比赛项目。',
                icon: '💃',
                type: 'milestone'
            },
            {
                year: '1988',
                title: '卡特琳娜·维特传奇',
                description: '德国选手维特连续两届冬奥会夺冠，成为花滑史上最伟大的女选手之一。',
                icon: '👑',
                type: 'legend'
            },
            {
                year: '2002',
                title: '双人滑争议与改革',
                description: '盐湖城冬奥会双人滑争议事件，促使ISU进行评分系统改革。',
                icon: '⚖️',
                type: 'reform'
            },
            {
                year: '2004',
                title: '新评分系统启用',
                description: 'ISU正式启用新的评分系统(COP)，取代传统的6.0分制。',
                icon: '📊',
                type: 'reform'
            },
            {
                year: '2014',
                title: '羽生结弦亚洲首金',
                description: '索契冬奥会上，日本选手羽生结弦成为首位亚洲男子单人滑奥运冠军。',
                icon: '🥇',
                type: 'legend'
            },
            {
                year: '2018',
                title: '团体赛正式设立',
                description: '平昌冬奥会上，花样滑冰团体赛首次成为正式比赛项目。',
                icon: '👥',
                type: 'milestone'
            },
            {
                year: '2022',
                title: '北京冬奥会',
                description: '北京成功举办冬奥会，花样滑冰赛事精彩纷呈，陈巍夺冠。',
                icon: '🇨🇳',
                type: 'milestone'
            }
        ];
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: HistoryTimelinePage_Params) {
        if (params.timelineEvents !== undefined) {
            this.timelineEvents = params.timelineEvents;
        }
    }
    updateStateVars(params: HistoryTimelinePage_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private timelineEvents: TimelineEvent[];
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
                        title: '花滑历史长廊',
                        showBack: true,
                        navBackgroundColor: '#4FC3F7'
                    }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/HistoryTimelinePage.ets", line: 88, col: 7 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            title: '花滑历史长廊',
                            showBack: true,
                            navBackgroundColor: '#4FC3F7'
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        title: '花滑历史长廊',
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
        // 介绍横幅
        this.buildIntroBanner.bind(this)();
        // 时间轴
        this.buildTimeline.bind(this)();
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
                colors: [['#667eea', 0.0], ['#764ba2', 1.0]]
            });
            Column.borderRadius(16);
            Column.margin({ bottom: 24 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('花样滑冰发展史');
            Text.fontSize(24);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#FFFFFF');
            Text.margin({ bottom: 8 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('从冰上舞蹈到现代竞技体育');
            Text.fontSize(14);
            Text.fontColor('rgba(255,255,255,0.8)');
        }, Text);
        Text.pop();
        Column.pop();
    }
    // 时间轴
    buildTimeline(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = (_item, index: number) => {
                const event = _item;
                this.TimelineItem.bind(this)(event, index);
            };
            this.forEachUpdateFunction(elmtId, this.timelineEvents, forEachItemGenFunction, (event: TimelineEvent) => event.year, true, false);
        }, ForEach);
        ForEach.pop();
        Column.pop();
    }
    TimelineItem(event: TimelineEvent, index: number, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.alignItems(VerticalAlign.Top);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 时间轴线条
            Column.create();
            // 时间轴线条
            Column.width(60);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 圆点
            Column.create();
            // 圆点
            Column.width(40);
            // 圆点
            Column.height(40);
            // 圆点
            Column.backgroundColor(this.getEventColor(event.type));
            // 圆点
            Column.borderRadius(20);
            // 圆点
            Column.justifyContent(FlexAlign.Center);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(event.icon);
            Text.fontSize(20);
        }, Text);
        Text.pop();
        // 圆点
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            // 连接线
            if (index < this.timelineEvents.length - 1) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Column.create();
                        Column.width(2);
                        Column.height(60);
                        Column.backgroundColor('#E0E0E0');
                        Column.margin({ top: 8 });
                    }, Column);
                    Column.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        // 时间轴线条
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 内容卡片
            Column.create();
            // 内容卡片
            Column.layoutWeight(1);
            // 内容卡片
            Column.padding(16);
            // 内容卡片
            Column.backgroundColor('#FFFFFF');
            // 内容卡片
            Column.borderRadius(12);
            // 内容卡片
            Column.margin({ left: 16, bottom: 16 });
            // 内容卡片
            Column.alignItems(HorizontalAlign.Start);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.margin({ bottom: 8 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(event.year);
            Text.fontSize(20);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor(this.getEventColor(event.type));
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(event.title);
            Text.fontSize(16);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#333333');
            Text.margin({ left: 12 });
            Text.layoutWeight(1);
        }, Text);
        Text.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(event.description);
            Text.fontSize(14);
            Text.fontColor('#666666');
            Text.lineHeight(22);
        }, Text);
        Text.pop();
        // 内容卡片
        Column.pop();
        Row.pop();
    }
    private getEventColor(type: string): string {
        const colors: Record<string, string> = {
            'milestone': '#4FC3F7',
            'technical': '#66BB6A',
            'legend': '#FFA726',
            'reform': '#AB47BC'
        };
        return colors[type] || '#4FC3F7';
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "HistoryTimelinePage";
    }
}
// 数据类型
interface TimelineEvent {
    year: string;
    title: string;
    description: string;
    icon: string;
    type: string;
}
registerNamedRoute(() => new HistoryTimelinePage(undefined, {}), "", { bundleName: "com.example.simplecalculator", moduleName: "entry", pagePath: "pages/HistoryTimelinePage", pageFullPath: "entry/src/main/ets/pages/HistoryTimelinePage", integratedHsp: "false", moduleType: "followWithHap" });
