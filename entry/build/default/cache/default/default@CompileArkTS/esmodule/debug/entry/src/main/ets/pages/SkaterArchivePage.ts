if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface SkaterArchivePage_Params {
    searchText?: string;
    activeFilters?: string[];
    selectedDiscipline?: Discipline;
    skaters?: Skater[];
    disciplineFilters?: FilterItem[];
    otherFilters?: FilterItem[];
}
import router from "@ohos:router";
import { IceNavBar } from "@bundle:com.example.simplecalculator/entry/ets/common/components/IceNavBar";
import { IceTag } from "@bundle:com.example.simplecalculator/entry/ets/common/components/IceTag";
import { IceFilterBar } from "@bundle:com.example.simplecalculator/entry/ets/common/components/IceFilterBar";
import type { FilterItem } from "@bundle:com.example.simplecalculator/entry/ets/common/components/IceFilterBar";
import { IceEmpty } from "@bundle:com.example.simplecalculator/entry/ets/common/components/IceEmpty";
import { SAMPLE_SKATERS } from "@bundle:com.example.simplecalculator/entry/ets/viewmodel/SampleData";
import { getDisciplineIcon, calculateAge, formatScore, getMedalIcon } from "@bundle:com.example.simplecalculator/entry/ets/viewmodel/IceTraceModel";
import type { Discipline } from "@bundle:com.example.simplecalculator/entry/ets/viewmodel/IceTraceModel";
class SkaterArchivePage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__searchText = new ObservedPropertySimplePU('', this, "searchText");
        this.__activeFilters = new ObservedPropertyObjectPU([], this, "activeFilters");
        this.__selectedDiscipline = new ObservedPropertySimplePU('MEN', this, "selectedDiscipline");
        this.__skaters = new ObservedPropertyObjectPU([], this, "skaters");
        this.disciplineFilters = [
            { id: 'MEN', label: '男单' },
            { id: 'LADIES', label: '女单' },
            { id: 'PAIRS', label: '双人' },
            { id: 'ICE_DANCE', label: '冰舞' }
        ];
        this.otherFilters = [
            { id: 'ACTIVE', label: '现役' },
            { id: 'RETIRED', label: '退役' },
            { id: 'MEDALIST', label: '奖牌得主' }
        ];
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: SkaterArchivePage_Params) {
        if (params.searchText !== undefined) {
            this.searchText = params.searchText;
        }
        if (params.activeFilters !== undefined) {
            this.activeFilters = params.activeFilters;
        }
        if (params.selectedDiscipline !== undefined) {
            this.selectedDiscipline = params.selectedDiscipline;
        }
        if (params.skaters !== undefined) {
            this.skaters = params.skaters;
        }
        if (params.disciplineFilters !== undefined) {
            this.disciplineFilters = params.disciplineFilters;
        }
        if (params.otherFilters !== undefined) {
            this.otherFilters = params.otherFilters;
        }
    }
    updateStateVars(params: SkaterArchivePage_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__searchText.purgeDependencyOnElmtId(rmElmtId);
        this.__activeFilters.purgeDependencyOnElmtId(rmElmtId);
        this.__selectedDiscipline.purgeDependencyOnElmtId(rmElmtId);
        this.__skaters.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__searchText.aboutToBeDeleted();
        this.__activeFilters.aboutToBeDeleted();
        this.__selectedDiscipline.aboutToBeDeleted();
        this.__skaters.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __searchText: ObservedPropertySimplePU<string>;
    get searchText() {
        return this.__searchText.get();
    }
    set searchText(newValue: string) {
        this.__searchText.set(newValue);
    }
    private __activeFilters: ObservedPropertyObjectPU<string[]>;
    get activeFilters() {
        return this.__activeFilters.get();
    }
    set activeFilters(newValue: string[]) {
        this.__activeFilters.set(newValue);
    }
    private __selectedDiscipline: ObservedPropertySimplePU<Discipline>;
    get selectedDiscipline() {
        return this.__selectedDiscipline.get();
    }
    set selectedDiscipline(newValue: Discipline) {
        this.__selectedDiscipline.set(newValue);
    }
    private __skaters: ObservedPropertyObjectPU<Skater[]>;
    get skaters() {
        return this.__skaters.get();
    }
    set skaters(newValue: Skater[]) {
        this.__skaters.set(newValue);
    }
    // 项目筛选
    private disciplineFilters: FilterItem[];
    // 其他筛选
    private otherFilters: FilterItem[];
    aboutToAppear() {
        this.loadSkaters();
    }
    loadSkaters() {
        // 筛选选手
        let filtered = SAMPLE_SKATERS.filter(skater => {
            // 项目筛选
            if (this.activeFilters.includes(skater.discipline)) {
                return true;
            }
            if (this.activeFilters.length === 0) {
                return skater.discipline === this.selectedDiscipline;
            }
            return false;
        });
        // 现役/退役筛选
        if (this.activeFilters.includes('ACTIVE')) {
            filtered = filtered.filter(s => s.isActive);
        }
        if (this.activeFilters.includes('RETIRED')) {
            filtered = filtered.filter(s => !s.isActive);
        }
        // 搜索筛选
        if (this.searchText) {
            const keyword = this.searchText.toLowerCase();
            filtered = filtered.filter(s => s.name.toLowerCase().includes(keyword) ||
                s.nameEn.toLowerCase().includes(keyword) ||
                s.nationality.includes(keyword));
        }
        this.skaters = filtered;
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
                        title: '选手档案',
                        showBack: true,
                        navBackgroundColor: '#4FC3F7'
                    }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/SkaterArchivePage.ets", line: 82, col: 7 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            title: '选手档案',
                            showBack: true,
                            navBackgroundColor: '#4FC3F7'
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        title: '选手档案',
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
        // 搜索栏
        this.buildSearchBar.bind(this)();
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new 
                    // 项目筛选
                    IceFilterBar(this, {
                        filters: this.disciplineFilters,
                        activeFilters: this.__activeFilters
                    }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/SkaterArchivePage.ets", line: 94, col: 9 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            filters: this.disciplineFilters,
                            activeFilters: this.activeFilters
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        filters: this.disciplineFilters
                    });
                }
            }, { name: "IceFilterBar" });
        }
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new 
                    // 其他筛选
                    IceFilterBar(this, {
                        filters: this.otherFilters,
                        activeFilters: this.__activeFilters
                    }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/SkaterArchivePage.ets", line: 100, col: 9 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            filters: this.otherFilters,
                            activeFilters: this.activeFilters
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        filters: this.otherFilters
                    });
                }
            }, { name: "IceFilterBar" });
        }
        // 选手列表
        this.buildSkaterList.bind(this)();
        // 内容区
        Column.pop();
        Column.pop();
    }
    buildSearchBar(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.padding({ left: 16, right: 16, top: 12, bottom: 12 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            TextInput.create({ placeholder: '搜索选手姓名、国籍...', text: this.searchText });
            TextInput.layoutWeight(1);
            TextInput.height(40);
            TextInput.backgroundColor('#FFFFFF');
            TextInput.borderRadius(20);
            TextInput.padding({ left: 16, right: 16 });
            TextInput.onChange((value: string) => {
                this.searchText = value;
                this.loadSkaters();
            });
        }, TextInput);
        Row.pop();
    }
    buildSkaterList(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.skaters.length === 0) {
                this.ifElseBranchUpdateFunction(0, () => {
                    {
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            if (isInitialRender) {
                                let componentCall = new IceEmpty(this, {
                                    icon: '👤',
                                    title: '未找到选手',
                                    description: '尝试调整筛选条件或搜索关键词'
                                }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/SkaterArchivePage.ets", line: 136, col: 7 });
                                ViewPU.create(componentCall);
                                let paramsLambda = () => {
                                    return {
                                        icon: '👤',
                                        title: '未找到选手',
                                        description: '尝试调整筛选条件或搜索关键词'
                                    };
                                };
                                componentCall.paramsGenerator_ = paramsLambda;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(elmtId, {
                                    icon: '👤',
                                    title: '未找到选手',
                                    description: '尝试调整筛选条件或搜索关键词'
                                });
                            }
                        }, { name: "IceEmpty" });
                    }
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        List.create();
                        List.width('100%');
                        List.layoutWeight(1);
                        List.padding({ left: 16, right: 16, top: 8, bottom: 8 });
                    }, List);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        ForEach.create();
                        const forEachItemGenFunction = _item => {
                            const skater = _item;
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
                                    ListItem.margin({ bottom: 12 });
                                };
                                const deepRenderFunction = (elmtId, isInitialRender) => {
                                    itemCreation(elmtId, isInitialRender);
                                    this.SkaterCard.bind(this)(skater);
                                    ListItem.pop();
                                };
                                this.observeComponentCreation2(itemCreation2, ListItem);
                                ListItem.pop();
                            }
                        };
                        this.forEachUpdateFunction(elmtId, this.skaters, forEachItemGenFunction, (skater: Skater) => skater.id, false, false);
                    }, ForEach);
                    ForEach.pop();
                    List.pop();
                });
            }
        }, If);
        If.pop();
    }
    SkaterCard(skater: Skater, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.padding(16);
            Column.backgroundColor('#FFFFFF');
            Column.borderRadius(12);
            Column.onClick(() => {
                router.pushUrl({
                    url: 'pages/SkaterDetailPage',
                    params: { skaterId: skater.id }
                });
            });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 头像
            Column.create();
            // 头像
            Column.width(60);
            // 头像
            Column.height(60);
            // 头像
            Column.backgroundColor('#F5F5F5');
            // 头像
            Column.borderRadius(30);
            // 头像
            Column.justifyContent(FlexAlign.Center);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('👤');
            Text.fontSize(40);
        }, Text);
        Text.pop();
        // 头像
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 基本信息
            Column.create();
            // 基本信息
            Column.layoutWeight(1);
            // 基本信息
            Column.alignItems(HorizontalAlign.Start);
            // 基本信息
            Column.margin({ left: 12 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(skater.name);
            Text.fontSize(16);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#333333');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(getDisciplineIcon(skater.discipline));
            Text.fontSize(14);
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
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (skater.isActive) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        __Common__.create();
                        __Common__.margin({ left: 8 });
                    }, __Common__);
                    {
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            if (isInitialRender) {
                                let componentCall = new IceTag(this, { text: '现役', type: 'success', tagSize: 'small' }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/SkaterArchivePage.ets", line: 189, col: 15 });
                                ViewPU.create(componentCall);
                                let paramsLambda = () => {
                                    return {
                                        text: '现役',
                                        type: 'success',
                                        tagSize: 'small'
                                    };
                                };
                                componentCall.paramsGenerator_ = paramsLambda;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(elmtId, {
                                    text: '现役', type: 'success', tagSize: 'small'
                                });
                            }
                        }, { name: "IceTag" });
                    }
                    __Common__.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.margin({ top: 4 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('年龄: ' + calculateAge(skater.birthDate) + '岁');
            Text.fontSize(12);
            Text.fontColor('#666666');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (skater.coach) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(' | 教练: ' + skater.coach);
                        Text.fontSize(12);
                        Text.fontColor('#666666');
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
        Row.pop();
        // 基本信息
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('›');
            Text.fontSize(20);
            Text.fontColor('#999999');
        }, Text);
        Text.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            // 最佳成绩
            if (skater.bestScores && skater.bestScores.length > 0) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Row.create();
                        Row.width('100%');
                        Row.margin({ top: 8 });
                    }, Row);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('最佳总分: ');
                        Text.fontSize(12);
                        Text.fontColor('#666666');
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(formatScore(skater.bestScores.find(s => s.segment === 'TOTAL')?.score || 0));
                        Text.fontSize(14);
                        Text.fontWeight(FontWeight.Bold);
                        Text.fontColor('#1976D2');
                    }, Text);
                    Text.pop();
                    Row.pop();
                });
            }
            // 奖牌统计
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            // 奖牌统计
            if (skater.medals && skater.medals.length > 0) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Row.create();
                        Row.width('100%');
                        Row.margin({ top: 4 });
                    }, Row);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('奖牌: ');
                        Text.fontSize(12);
                        Text.fontColor('#666666');
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Row.create();
                    }, Row);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(getMedalIcon('GOLD') + ' ' + skater.medals.filter(m => m.medalType === 'GOLD').length);
                        Text.fontSize(12);
                        Text.fontColor('#666666');
                        Text.margin({ right: 12 });
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(getMedalIcon('SILVER') + ' ' + skater.medals.filter(m => m.medalType === 'SILVER').length);
                        Text.fontSize(12);
                        Text.fontColor('#666666');
                        Text.margin({ right: 12 });
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(getMedalIcon('BRONZE') + ' ' + skater.medals.filter(m => m.medalType === 'BRONZE').length);
                        Text.fontSize(12);
                        Text.fontColor('#666666');
                    }, Text);
                    Text.pop();
                    Row.pop();
                    Row.pop();
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
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "SkaterArchivePage";
    }
}
// 简化的选手类型
interface Skater {
    id: string;
    name: string;
    nameEn: string;
    nationality: string;
    nationalityCode: string;
    birthDate: string;
    gender: 'M' | 'F';
    discipline: Discipline;
    isActive: boolean;
    avatar: string;
    biography: string;
    coach?: string;
    bestScores: BestScore[];
    medals: MedalRecord[];
}
interface BestScore {
    segment: 'SP' | 'FS' | 'TOTAL';
    score: number;
    competition: string;
    date: string;
    season: string;
}
interface MedalRecord {
    competition: string;
    year: number;
    discipline: Discipline;
    medalType: 'GOLD' | 'SILVER' | 'BRONZE';
}
registerNamedRoute(() => new SkaterArchivePage(undefined, {}), "", { bundleName: "com.example.simplecalculator", moduleName: "entry", pagePath: "pages/SkaterArchivePage", pageFullPath: "entry/src/main/ets/pages/SkaterArchivePage", integratedHsp: "false", moduleType: "followWithHap" });
