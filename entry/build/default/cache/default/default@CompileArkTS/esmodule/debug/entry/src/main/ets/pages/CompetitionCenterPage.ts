if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface CompetitionCenterPage_Params {
    searchText?: string;
    activeFilters?: string[];
    selectedSeason?: string;
    competitions?: Competition[];
    filterItems?: FilterItem[];
    seasons?: string[];
}
import router from "@ohos:router";
import { IceNavBar } from "@bundle:com.example.simplecalculator/entry/ets/common/components/IceNavBar";
import { IceTag } from "@bundle:com.example.simplecalculator/entry/ets/common/components/IceTag";
import { IceFilterBar } from "@bundle:com.example.simplecalculator/entry/ets/common/components/IceFilterBar";
import type { FilterItem } from "@bundle:com.example.simplecalculator/entry/ets/common/components/IceFilterBar";
import { IceEmpty } from "@bundle:com.example.simplecalculator/entry/ets/common/components/IceEmpty";
import { SAMPLE_COMPETITIONS } from "@bundle:com.example.simplecalculator/entry/ets/viewmodel/SampleData";
import { COMPETITION_STATUS_NAMES } from "@bundle:com.example.simplecalculator/entry/ets/viewmodel/IceTraceModel";
import type { CompetitionType } from "@bundle:com.example.simplecalculator/entry/ets/viewmodel/IceTraceModel";
class CompetitionCenterPage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__searchText = new ObservedPropertySimplePU('', this, "searchText");
        this.__activeFilters = new ObservedPropertyObjectPU([], this, "activeFilters");
        this.__selectedSeason = new ObservedPropertySimplePU('2023-24', this, "selectedSeason");
        this.__competitions = new ObservedPropertyObjectPU([], this, "competitions");
        this.filterItems = [
            { id: 'WORLD', label: '世锦赛' },
            { id: 'OLYMPICS', label: '冬奥会' },
            { id: 'GP_SERIES', label: '大奖赛' },
            { id: 'EUROPEAN', label: '欧锦赛' },
            { id: 'FOUR_CONTINENTS', label: '四大洲' }
        ];
        this.seasons = [
            '2023-24', '2022-23', '2021-22', '2020-21', '2019-20'
        ];
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: CompetitionCenterPage_Params) {
        if (params.searchText !== undefined) {
            this.searchText = params.searchText;
        }
        if (params.activeFilters !== undefined) {
            this.activeFilters = params.activeFilters;
        }
        if (params.selectedSeason !== undefined) {
            this.selectedSeason = params.selectedSeason;
        }
        if (params.competitions !== undefined) {
            this.competitions = params.competitions;
        }
        if (params.filterItems !== undefined) {
            this.filterItems = params.filterItems;
        }
        if (params.seasons !== undefined) {
            this.seasons = params.seasons;
        }
    }
    updateStateVars(params: CompetitionCenterPage_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__searchText.purgeDependencyOnElmtId(rmElmtId);
        this.__activeFilters.purgeDependencyOnElmtId(rmElmtId);
        this.__selectedSeason.purgeDependencyOnElmtId(rmElmtId);
        this.__competitions.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__searchText.aboutToBeDeleted();
        this.__activeFilters.aboutToBeDeleted();
        this.__selectedSeason.aboutToBeDeleted();
        this.__competitions.aboutToBeDeleted();
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
    private __selectedSeason: ObservedPropertySimplePU<string>;
    get selectedSeason() {
        return this.__selectedSeason.get();
    }
    set selectedSeason(newValue: string) {
        this.__selectedSeason.set(newValue);
    }
    private __competitions: ObservedPropertyObjectPU<Competition[]>;
    get competitions() {
        return this.__competitions.get();
    }
    set competitions(newValue: Competition[]) {
        this.__competitions.set(newValue);
    }
    // 筛选项
    private filterItems: FilterItem[];
    // 赛季列表
    private seasons: string[];
    aboutToAppear() {
        // 加载赛事数据
        this.loadCompetitions();
    }
    loadCompetitions() {
        // 这里应该从数据源加载，现在使用示例数据
        this.competitions = SAMPLE_COMPETITIONS;
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
                        title: '赛事中心',
                        showBack: true,
                        navBackgroundColor: '#4FC3F7'
                    }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/CompetitionCenterPage.ets", line: 50, col: 7 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            title: '赛事中心',
                            showBack: true,
                            navBackgroundColor: '#4FC3F7'
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        title: '赛事中心',
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
        // 赛季选择
        this.buildSeasonSelector.bind(this)();
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new 
                    // 筛选栏
                    IceFilterBar(this, {
                        filters: this.filterItems,
                        activeFilters: this.__activeFilters
                    }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/CompetitionCenterPage.ets", line: 65, col: 9 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            filters: this.filterItems,
                            activeFilters: this.activeFilters
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        filters: this.filterItems
                    });
                }
            }, { name: "IceFilterBar" });
        }
        // 赛事列表
        this.buildCompetitionList.bind(this)();
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
            TextInput.create({ placeholder: '搜索赛事...', text: this.searchText });
            TextInput.layoutWeight(1);
            TextInput.height(40);
            TextInput.backgroundColor('#FFFFFF');
            TextInput.borderRadius(20);
            TextInput.padding({ left: 16, right: 16 });
            TextInput.onChange((value: string) => {
                this.searchText = value;
            });
        }, TextInput);
        Row.pop();
    }
    buildSeasonSelector(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Scroll.create();
            Scroll.width('100%');
            Scroll.height(48);
            Scroll.scrollable(ScrollDirection.Horizontal);
            Scroll.scrollBar(BarState.Off);
        }, Scroll);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.padding({ left: 16, right: 16 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const season = _item;
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Button.createWithLabel(season);
                    Button.fontSize(14);
                    Button.height(32);
                    Button.padding({ left: 16, right: 16 });
                    Button.backgroundColor(this.selectedSeason === season ? '#4FC3F7' : '#FFFFFF');
                    Button.fontColor(this.selectedSeason === season ? '#FFFFFF' : '#666666');
                    Button.borderRadius(16);
                    Button.margin({ right: 8 });
                    Button.onClick(() => {
                        this.selectedSeason = season;
                        this.loadCompetitions();
                    });
                }, Button);
                Button.pop();
            };
            this.forEachUpdateFunction(elmtId, this.seasons, forEachItemGenFunction, (season: string) => season, false, false);
        }, ForEach);
        ForEach.pop();
        Row.pop();
        Scroll.pop();
    }
    buildCompetitionList(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.competitions.length === 0) {
                this.ifElseBranchUpdateFunction(0, () => {
                    {
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            if (isInitialRender) {
                                let componentCall = new IceEmpty(this, {
                                    icon: '🏆',
                                    title: '暂无赛事数据',
                                    description: '当前筛选条件下没有赛事'
                                }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/CompetitionCenterPage.ets", line: 127, col: 7 });
                                ViewPU.create(componentCall);
                                let paramsLambda = () => {
                                    return {
                                        icon: '🏆',
                                        title: '暂无赛事数据',
                                        description: '当前筛选条件下没有赛事'
                                    };
                                };
                                componentCall.paramsGenerator_ = paramsLambda;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(elmtId, {
                                    icon: '🏆',
                                    title: '暂无赛事数据',
                                    description: '当前筛选条件下没有赛事'
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
                            const competition = _item;
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
                                    this.CompetitionCard.bind(this)(competition);
                                    ListItem.pop();
                                };
                                this.observeComponentCreation2(itemCreation2, ListItem);
                                ListItem.pop();
                            }
                        };
                        this.forEachUpdateFunction(elmtId, this.competitions, forEachItemGenFunction, (competition: Competition) => competition.id, false, false);
                    }, ForEach);
                    ForEach.pop();
                    List.pop();
                });
            }
        }, If);
        If.pop();
    }
    CompetitionCard(competition: Competition, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.padding(16);
            Column.backgroundColor('#FFFFFF');
            Column.borderRadius(12);
            Column.onClick(() => {
                router.pushUrl({
                    url: 'pages/CompetitionDetailPage',
                    params: { competitionId: competition.id }
                });
            });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 标题行
            Row.create();
            // 标题行
            Row.width('100%');
            // 标题行
            Row.margin({ bottom: 8 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(competition.name);
            Text.fontSize(16);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#333333');
            Text.layoutWeight(1);
        }, Text);
        Text.pop();
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new IceTag(this, {
                        text: COMPETITION_STATUS_NAMES[competition.status],
                        type: competition.status === 'LIVE' ? 'danger' :
                            competition.status === 'UPCOMING' ? 'warning' : 'default',
                        tagSize: 'small'
                    }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/CompetitionCenterPage.ets", line: 158, col: 9 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            text: COMPETITION_STATUS_NAMES[competition.status],
                            type: competition.status === 'LIVE' ? 'danger' :
                                competition.status === 'UPCOMING' ? 'warning' : 'default',
                            tagSize: 'small'
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        text: COMPETITION_STATUS_NAMES[competition.status],
                        type: competition.status === 'LIVE' ? 'danger' :
                            competition.status === 'UPCOMING' ? 'warning' : 'default',
                        tagSize: 'small'
                    });
                }
            }, { name: "IceTag" });
        }
        // 标题行
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 信息行
            Row.create();
            // 信息行
            Row.width('100%');
            // 信息行
            Row.margin({ bottom: 12 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('📍 ' + competition.location);
            Text.fontSize(12);
            Text.fontColor('#666666');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(' | ');
            Text.fontSize(12);
            Text.fontColor('#999999');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(competition.startDate + ' ~ ' + competition.endDate);
            Text.fontSize(12);
            Text.fontColor('#666666');
        }, Text);
        Text.pop();
        // 信息行
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 项目标签
            Row.create();
            // 项目标签
            Row.width('100%');
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const discipline = _item;
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    __Common__.create();
                    __Common__.margin({ right: 8 });
                }, __Common__);
                {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        if (isInitialRender) {
                            let componentCall = new IceTag(this, { text: this.getDisciplineName(discipline), tagSize: 'small' }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/CompetitionCenterPage.ets", line: 188, col: 11 });
                            ViewPU.create(componentCall);
                            let paramsLambda = () => {
                                return {
                                    text: this.getDisciplineName(discipline),
                                    tagSize: 'small'
                                };
                            };
                            componentCall.paramsGenerator_ = paramsLambda;
                        }
                        else {
                            this.updateStateVarsOfChildByElmtId(elmtId, {
                                text: this.getDisciplineName(discipline), tagSize: 'small'
                            });
                        }
                    }, { name: "IceTag" });
                }
                __Common__.pop();
            };
            this.forEachUpdateFunction(elmtId, competition.disciplines, forEachItemGenFunction, (discipline: string) => discipline, false, false);
        }, ForEach);
        ForEach.pop();
        // 项目标签
        Row.pop();
        Column.pop();
    }
    private getDisciplineName(discipline: string): string {
        const names: Record<string, string> = {
            'MEN': '男单',
            'LADIES': '女单',
            'PAIRS': '双人',
            'ICE_DANCE': '冰舞',
            'TEAM': '团体'
        };
        return names[discipline] || discipline;
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "CompetitionCenterPage";
    }
}
// 简化的赛事类型
interface Competition {
    id: string;
    name: string;
    nameEn: string;
    season: string;
    type: CompetitionType;
    location: string;
    country: string;
    startDate: string;
    endDate: string;
    disciplines: string[];
    status: string;
}
registerNamedRoute(() => new CompetitionCenterPage(undefined, {}), "", { bundleName: "com.example.simplecalculator", moduleName: "entry", pagePath: "pages/CompetitionCenterPage", pageFullPath: "entry/src/main/ets/pages/CompetitionCenterPage", integratedHsp: "false", moduleType: "followWithHap" });
