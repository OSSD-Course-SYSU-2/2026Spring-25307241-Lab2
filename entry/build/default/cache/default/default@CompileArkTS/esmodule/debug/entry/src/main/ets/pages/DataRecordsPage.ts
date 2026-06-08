if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface DataRecordsPage_Params {
    selectedCategory?: string;
    selectedDiscipline?: string;
    scoreRecords?: RecordRecord[];
    elementRecords?: ElementRecord[];
    medalRecords?: MedalRecord[];
}
import { IceNavBar } from "@bundle:com.example.simplecalculator/entry/ets/common/components/IceNavBar";
import { IceTag } from "@bundle:com.example.simplecalculator/entry/ets/common/components/IceTag";
class DataRecordsPage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__selectedCategory = new ObservedPropertySimplePU('score', this, "selectedCategory");
        this.__selectedDiscipline = new ObservedPropertySimplePU('MEN', this, "selectedDiscipline");
        this.scoreRecords = [
            { category: '总分', discipline: 'MEN', skater: '陈巍', country: 'USA', score: 332.60, competition: '2023世锦赛', date: '2023-03-25' },
            { category: '总分', discipline: 'LADIES', skater: '谢尔巴科娃', country: 'RUS', score: 255.95, competition: '2021世锦赛', date: '2021-03-26' },
            { category: '技术分', discipline: 'MEN', skater: '陈巍', country: 'USA', score: 127.64, competition: '2023世锦赛', date: '2023-03-25' },
            { category: '内容分', discipline: 'MEN', skater: '羽生结弦', country: 'JPN', score: 98.58, competition: '2020四大洲', date: '2020-02-08' }
        ];
        this.elementRecords = [
            { element: '4Lz', name: '四周鲁兹', skater: '陈巍', country: 'USA', baseValue: 11.50, goe: '+5', finalScore: 17.25 },
            { element: '4A', name: '四周阿克塞尔', skater: '羽生结弦', country: 'JPN', baseValue: 12.50, goe: '+2', finalScore: 15.00 },
            { element: '3A', name: '三周阿克塞尔', skater: '纪平梨花', country: 'JPN', baseValue: 8.00, goe: '+4', finalScore: 12.00 }
        ];
        this.medalRecords = [
            { country: 'RUS', gold: 24, silver: 18, bronze: 12, total: 54 },
            { country: 'USA', gold: 15, silver: 20, bronze: 16, total: 51 },
            { country: 'JPN', gold: 12, silver: 15, bronze: 18, total: 45 },
            { country: 'CAN', gold: 10, silver: 12, bronze: 14, total: 36 }
        ];
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: DataRecordsPage_Params) {
        if (params.selectedCategory !== undefined) {
            this.selectedCategory = params.selectedCategory;
        }
        if (params.selectedDiscipline !== undefined) {
            this.selectedDiscipline = params.selectedDiscipline;
        }
        if (params.scoreRecords !== undefined) {
            this.scoreRecords = params.scoreRecords;
        }
        if (params.elementRecords !== undefined) {
            this.elementRecords = params.elementRecords;
        }
        if (params.medalRecords !== undefined) {
            this.medalRecords = params.medalRecords;
        }
    }
    updateStateVars(params: DataRecordsPage_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__selectedCategory.purgeDependencyOnElmtId(rmElmtId);
        this.__selectedDiscipline.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__selectedCategory.aboutToBeDeleted();
        this.__selectedDiscipline.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __selectedCategory: ObservedPropertySimplePU<string>; // score, element, medal
    get selectedCategory() {
        return this.__selectedCategory.get();
    }
    set selectedCategory(newValue: string) {
        this.__selectedCategory.set(newValue);
    }
    private __selectedDiscipline: ObservedPropertySimplePU<string>; // MEN, LADIES, PAIRS, ICE_DANCE
    get selectedDiscipline() {
        return this.__selectedDiscipline.get();
    }
    set selectedDiscipline(newValue: string) {
        this.__selectedDiscipline.set(newValue);
    }
    // 纪录数据
    private scoreRecords: RecordRecord[];
    private elementRecords: ElementRecord[];
    private medalRecords: MedalRecord[];
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
                        title: '数据纪录',
                        showBack: true,
                        navBackgroundColor: '#4FC3F7'
                    }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/DataRecordsPage.ets", line: 40, col: 7 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            title: '数据纪录',
                            showBack: true,
                            navBackgroundColor: '#4FC3F7'
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        title: '数据纪录',
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
        // 分类选择
        this.buildCategoryTabs.bind(this)();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 内容区域
            Scroll.create();
            // 内容区域
            Scroll.layoutWeight(1);
            // 内容区域
            Scroll.scrollBar(BarState.Auto);
        }, Scroll);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.padding(16);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.selectedCategory === 'score') {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.buildScoreRecords.bind(this)();
                });
            }
            else if (this.selectedCategory === 'element') {
                this.ifElseBranchUpdateFunction(1, () => {
                    this.buildElementRecords.bind(this)();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(2, () => {
                    this.buildMedalRecords.bind(this)();
                });
            }
        }, If);
        If.pop();
        Column.pop();
        // 内容区域
        Scroll.pop();
        // 内容区
        Column.pop();
        Column.pop();
    }
    // 分类标签
    buildCategoryTabs(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.padding({ left: 16, right: 16, top: 12, bottom: 12 });
            Row.justifyContent(FlexAlign.SpaceEvenly);
        }, Row);
        this.CategoryTab.bind(this)('分数纪录', 'score', '📊');
        this.CategoryTab.bind(this)('动作纪录', 'element', '⛸️');
        this.CategoryTab.bind(this)('奖牌榜', 'medal', '🏆');
        Row.pop();
    }
    CategoryTab(title: string, category: string, icon: string, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width(100);
            Column.height(70);
            Column.backgroundColor(this.selectedCategory === category ? '#E3F2FD' : '#FFFFFF');
            Column.borderRadius(12);
            Column.justifyContent(FlexAlign.Center);
            Column.onClick(() => {
                this.selectedCategory = category;
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
            Text.fontColor(this.selectedCategory === category ? '#4FC3F7' : '#666666');
            Text.margin({ top: 4 });
        }, Text);
        Text.pop();
        Column.pop();
    }
    // 分数纪录
    buildScoreRecords(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.alignItems(HorizontalAlign.Start);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('历史最高分纪录');
            Text.fontSize(18);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#333333');
            Text.margin({ bottom: 16 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const record = _item;
                this.RecordCard.bind(this)(record);
            };
            this.forEachUpdateFunction(elmtId, this.scoreRecords, forEachItemGenFunction, (record: RecordRecord) => record.category + record.discipline, false, false);
        }, ForEach);
        ForEach.pop();
        Column.pop();
    }
    RecordCard(record: RecordRecord, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.padding(16);
            Column.backgroundColor('#FFFFFF');
            Column.borderRadius(12);
            Column.margin({ bottom: 12 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.margin({ bottom: 12 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.alignItems(HorizontalAlign.Start);
            Column.layoutWeight(1);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(record.category);
            Text.fontSize(14);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#4FC3F7');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.getDisciplineName(record.discipline));
            Text.fontSize(12);
            Text.fontColor('#999999');
            Text.margin({ top: 4 });
        }, Text);
        Text.pop();
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.alignItems(HorizontalAlign.End);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(record.score.toFixed(2));
            Text.fontSize(24);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#FF6B6B');
        }, Text);
        Text.pop();
        Column.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(record.skater);
            Text.fontSize(14);
            Text.fontColor('#333333');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('(' + record.country + ')');
            Text.fontSize(12);
            Text.fontColor('#999999');
            Text.margin({ left: 4 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(record.competition);
            Text.fontSize(12);
            Text.fontColor('#666666');
        }, Text);
        Text.pop();
        Row.pop();
        Column.pop();
    }
    // 动作纪录
    buildElementRecords(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.alignItems(HorizontalAlign.Start);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('跳跃动作最高分');
            Text.fontSize(18);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#333333');
            Text.margin({ bottom: 16 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const record = _item;
                this.ElementCard.bind(this)(record);
            };
            this.forEachUpdateFunction(elmtId, this.elementRecords, forEachItemGenFunction, (record: ElementRecord) => record.element, false, false);
        }, ForEach);
        ForEach.pop();
        Column.pop();
    }
    ElementCard(record: ElementRecord, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.padding(16);
            Column.backgroundColor('#FFFFFF');
            Column.borderRadius(12);
            Column.margin({ bottom: 12 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.margin({ bottom: 12 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.alignItems(HorizontalAlign.Start);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(record.element);
            Text.fontSize(20);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#4FC3F7');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(record.name);
            Text.fontSize(12);
            Text.fontColor('#999999');
            Text.margin({ top: 4 });
        }, Text);
        Text.pop();
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.alignItems(HorizontalAlign.End);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(record.finalScore.toFixed(2));
            Text.fontSize(24);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#FF6B6B');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('基础分: ' + record.baseValue.toFixed(2));
            Text.fontSize(12);
            Text.fontColor('#999999');
            Text.margin({ top: 4 });
        }, Text);
        Text.pop();
        Column.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(record.skater);
            Text.fontSize(14);
            Text.fontColor('#333333');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('(' + record.country + ')');
            Text.fontSize(12);
            Text.fontColor('#999999');
            Text.margin({ left: 4 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
        }, Blank);
        Blank.pop();
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new IceTag(this, { text: 'GOE ' + record.goe, type: 'success', tagSize: 'small' }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/DataRecordsPage.ets", line: 245, col: 9 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            text: 'GOE ' + record.goe,
                            type: 'success',
                            tagSize: 'small'
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        text: 'GOE ' + record.goe, type: 'success', tagSize: 'small'
                    });
                }
            }, { name: "IceTag" });
        }
        Row.pop();
        Column.pop();
    }
    // 奖牌榜
    buildMedalRecords(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.alignItems(HorizontalAlign.Start);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('世锦赛奖牌榜 (历史总计)');
            Text.fontSize(18);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#333333');
            Text.margin({ bottom: 16 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = (_item, index: number) => {
                const record = _item;
                this.MedalCard.bind(this)(record, index + 1);
            };
            this.forEachUpdateFunction(elmtId, this.medalRecords, forEachItemGenFunction, (record: MedalRecord) => record.country, true, false);
        }, ForEach);
        ForEach.pop();
        Column.pop();
    }
    MedalCard(record: MedalRecord, rank: number, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.padding(16);
            Row.backgroundColor('#FFFFFF');
            Row.borderRadius(12);
            Row.margin({ bottom: 12 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(rank.toString());
            Text.fontSize(20);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#4FC3F7');
            Text.width(40);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(record.country);
            Text.fontSize(16);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#333333');
            Text.layoutWeight(1);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('🥇' + record.gold);
            Text.fontSize(14);
            Text.fontColor('#FFD700');
            Text.margin({ right: 12 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('🥈' + record.silver);
            Text.fontSize(14);
            Text.fontColor('#C0C0C0');
            Text.margin({ right: 12 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('🥉' + record.bronze);
            Text.fontSize(14);
            Text.fontColor('#CD7F32');
        }, Text);
        Text.pop();
        Row.pop();
        Row.pop();
    }
    private getDisciplineName(discipline: string): string {
        const names: Record<string, string> = {
            'MEN': '男子单人滑',
            'LADIES': '女子单人滑',
            'PAIRS': '双人滑',
            'ICE_DANCE': '冰上舞蹈'
        };
        return names[discipline] || discipline;
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "DataRecordsPage";
    }
}
// 数据类型
interface RecordRecord {
    category: string;
    discipline: string;
    skater: string;
    country: string;
    score: number;
    competition: string;
    date: string;
}
interface ElementRecord {
    element: string;
    name: string;
    skater: string;
    country: string;
    baseValue: number;
    goe: string;
    finalScore: number;
}
interface MedalRecord {
    country: string;
    gold: number;
    silver: number;
    bronze: number;
    total: number;
}
registerNamedRoute(() => new DataRecordsPage(undefined, {}), "", { bundleName: "com.example.simplecalculator", moduleName: "entry", pagePath: "pages/DataRecordsPage", pageFullPath: "entry/src/main/ets/pages/DataRecordsPage", integratedHsp: "false", moduleType: "followWithHap" });
