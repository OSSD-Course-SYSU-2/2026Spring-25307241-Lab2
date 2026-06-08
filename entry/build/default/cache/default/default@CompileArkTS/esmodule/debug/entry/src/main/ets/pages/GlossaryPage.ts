if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface GlossaryPage_Params {
    searchText?: string;
    selectedCategory?: string;
    terms?: GlossaryTerm[];
    expandedTerm?: string | null;
    categories?: CategoryItem[];
}
import { IceNavBar } from "@bundle:com.example.simplecalculator/entry/ets/common/components/IceNavBar";
import { IceTag } from "@bundle:com.example.simplecalculator/entry/ets/common/components/IceTag";
import { SAMPLE_GLOSSARY } from "@bundle:com.example.simplecalculator/entry/ets/viewmodel/SampleData";
// 分类项接口
interface CategoryItem {
    value: string;
    label: string;
}
class GlossaryPage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__searchText = new ObservedPropertySimplePU('', this, "searchText");
        this.__selectedCategory = new ObservedPropertySimplePU('ALL', this, "selectedCategory");
        this.__terms = new ObservedPropertyObjectPU([], this, "terms");
        this.__expandedTerm = new ObservedPropertyObjectPU(null, this, "expandedTerm");
        this.categories = [
            { value: 'ALL', label: '全部' },
            { value: '评分系统', label: '评分系统' },
            { value: '跳跃', label: '跳跃' },
            { value: '旋转', label: '旋转' },
            { value: '步法', label: '步法' },
            { value: '节目', label: '节目' }
        ];
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: GlossaryPage_Params) {
        if (params.searchText !== undefined) {
            this.searchText = params.searchText;
        }
        if (params.selectedCategory !== undefined) {
            this.selectedCategory = params.selectedCategory;
        }
        if (params.terms !== undefined) {
            this.terms = params.terms;
        }
        if (params.expandedTerm !== undefined) {
            this.expandedTerm = params.expandedTerm;
        }
        if (params.categories !== undefined) {
            this.categories = params.categories;
        }
    }
    updateStateVars(params: GlossaryPage_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__searchText.purgeDependencyOnElmtId(rmElmtId);
        this.__selectedCategory.purgeDependencyOnElmtId(rmElmtId);
        this.__terms.purgeDependencyOnElmtId(rmElmtId);
        this.__expandedTerm.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__searchText.aboutToBeDeleted();
        this.__selectedCategory.aboutToBeDeleted();
        this.__terms.aboutToBeDeleted();
        this.__expandedTerm.aboutToBeDeleted();
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
    private __selectedCategory: ObservedPropertySimplePU<string>;
    get selectedCategory() {
        return this.__selectedCategory.get();
    }
    set selectedCategory(newValue: string) {
        this.__selectedCategory.set(newValue);
    }
    private __terms: ObservedPropertyObjectPU<GlossaryTerm[]>;
    get terms() {
        return this.__terms.get();
    }
    set terms(newValue: GlossaryTerm[]) {
        this.__terms.set(newValue);
    }
    private __expandedTerm: ObservedPropertyObjectPU<string | null>;
    get expandedTerm() {
        return this.__expandedTerm.get();
    }
    set expandedTerm(newValue: string | null) {
        this.__expandedTerm.set(newValue);
    }
    // 分类列表
    private categories: CategoryItem[];
    aboutToAppear() {
        this.loadTerms();
    }
    loadTerms() {
        let filtered = SAMPLE_GLOSSARY;
        // 分类筛选
        if (this.selectedCategory !== 'ALL') {
            filtered = filtered.filter(term => term.category === this.selectedCategory);
        }
        // 搜索筛选
        if (this.searchText) {
            const keyword = this.searchText.toLowerCase();
            filtered = filtered.filter(term => term.term.toLowerCase().includes(keyword) ||
                term.termEn.toLowerCase().includes(keyword) ||
                (term.abbreviation && term.abbreviation.toLowerCase().includes(keyword)) ||
                term.definition.toLowerCase().includes(keyword));
        }
        // 按字母排序
        filtered.sort((a, b) => a.term.localeCompare(b.term, 'zh'));
        this.terms = filtered;
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
                        title: '术语词典',
                        showBack: true,
                        navBackgroundColor: '#4FC3F7'
                    }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/GlossaryPage.ets", line: 67, col: 7 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            title: '术语词典',
                            showBack: true,
                            navBackgroundColor: '#4FC3F7'
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        title: '术语词典',
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
        // 分类选择
        this.buildCategorySelector.bind(this)();
        // 术语列表
        this.buildTermList.bind(this)();
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
            TextInput.create({ placeholder: '搜索术语、缩写...', text: this.searchText });
            TextInput.layoutWeight(1);
            TextInput.height(40);
            TextInput.backgroundColor('#FFFFFF');
            TextInput.borderRadius(20);
            TextInput.padding({ left: 16, right: 16 });
            TextInput.onChange((value: string) => {
                this.searchText = value;
                this.loadTerms();
            });
        }, TextInput);
        Row.pop();
    }
    buildCategorySelector(parent = null) {
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
                const item = _item;
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Button.createWithLabel(item.label);
                    Button.fontSize(12);
                    Button.height(32);
                    Button.padding({ left: 16, right: 16 });
                    Button.backgroundColor(this.selectedCategory === item.value ? '#4FC3F7' : '#FFFFFF');
                    Button.fontColor(this.selectedCategory === item.value ? '#FFFFFF' : '#666666');
                    Button.borderRadius(16);
                    Button.margin({ right: 8 });
                    Button.onClick(() => {
                        this.selectedCategory = item.value;
                        this.loadTerms();
                    });
                }, Button);
                Button.pop();
            };
            this.forEachUpdateFunction(elmtId, this.categories, forEachItemGenFunction, (item: CategoryItem) => item.value, false, false);
        }, ForEach);
        ForEach.pop();
        Row.pop();
        Scroll.pop();
    }
    buildTermList(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.terms.length === 0) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Column.create();
                        Column.width('100%');
                        Column.layoutWeight(1);
                        Column.justifyContent(FlexAlign.Center);
                    }, Column);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('📖');
                        Text.fontSize(64);
                        Text.margin({ bottom: 16 });
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('未找到相关术语');
                        Text.fontSize(16);
                        Text.fontColor('#666666');
                    }, Text);
                    Text.pop();
                    Column.pop();
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
                            const term = _item;
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
                                    ListItem.margin({ bottom: 8 });
                                };
                                const deepRenderFunction = (elmtId, isInitialRender) => {
                                    itemCreation(elmtId, isInitialRender);
                                    this.TermCard.bind(this)(term);
                                    ListItem.pop();
                                };
                                this.observeComponentCreation2(itemCreation2, ListItem);
                                ListItem.pop();
                            }
                        };
                        this.forEachUpdateFunction(elmtId, this.terms, forEachItemGenFunction, (term: GlossaryTerm) => term.id, false, false);
                    }, ForEach);
                    ForEach.pop();
                    List.pop();
                });
            }
        }, If);
        If.pop();
    }
    TermCard(term: GlossaryTerm, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.padding(16);
            Column.backgroundColor('#FFFFFF');
            Column.borderRadius(12);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 标题行
            Row.create();
            // 标题行
            Row.width('100%');
            // 标题行
            Row.onClick(() => {
                this.expandedTerm = this.expandedTerm === term.id ? null : term.id;
            });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.layoutWeight(1);
            Column.alignItems(HorizontalAlign.Start);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(term.term);
            Text.fontSize(16);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#333333');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (term.abbreviation) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('(' + term.abbreviation + ')');
                        Text.fontSize(14);
                        Text.fontColor('#666666');
                        Text.margin({ left: 4 });
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
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(term.termEn);
            Text.fontSize(12);
            Text.fontColor('#999999');
            Text.margin({ top: 2 });
        }, Text);
        Text.pop();
        Column.pop();
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new IceTag(this, { text: term.category, tagSize: 'small' }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/GlossaryPage.ets", line: 195, col: 9 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            text: term.category,
                            tagSize: 'small'
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        text: term.category, tagSize: 'small'
                    });
                }
            }, { name: "IceTag" });
        }
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.expandedTerm === term.id ? '▲' : '▼');
            Text.fontSize(12);
            Text.fontColor('#999999');
            Text.margin({ left: 8 });
        }, Text);
        Text.pop();
        // 标题行
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            // 展开内容
            if (this.expandedTerm === term.id) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Column.create();
                        Column.width('100%');
                        Column.padding({ top: 8 });
                        Column.alignItems(HorizontalAlign.Start);
                    }, Column);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        // 定义
                        Text.create('定义');
                        // 定义
                        Text.fontSize(12);
                        // 定义
                        Text.fontWeight(FontWeight.Bold);
                        // 定义
                        Text.fontColor('#1976D2');
                        // 定义
                        Text.margin({ top: 12, bottom: 4 });
                    }, Text);
                    // 定义
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(term.definition);
                        Text.fontSize(14);
                        Text.fontColor('#333333');
                        Text.lineHeight(22);
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        If.create();
                        // 示例
                        if (term.examples && term.examples.length > 0) {
                            this.ifElseBranchUpdateFunction(0, () => {
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    Text.create('示例');
                                    Text.fontSize(12);
                                    Text.fontWeight(FontWeight.Bold);
                                    Text.fontColor('#1976D2');
                                    Text.margin({ top: 12, bottom: 4 });
                                }, Text);
                                Text.pop();
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    ForEach.create();
                                    const forEachItemGenFunction = _item => {
                                        const example = _item;
                                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                                            Row.create();
                                            Row.width('100%');
                                            Row.margin({ top: 4 });
                                        }, Row);
                                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                                            Text.create('•');
                                            Text.fontSize(12);
                                            Text.fontColor('#666666');
                                            Text.margin({ right: 8 });
                                        }, Text);
                                        Text.pop();
                                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                                            Text.create(example);
                                            Text.fontSize(12);
                                            Text.fontColor('#666666');
                                            Text.layoutWeight(1);
                                        }, Text);
                                        Text.pop();
                                        Row.pop();
                                    };
                                    this.forEachUpdateFunction(elmtId, term.examples, forEachItemGenFunction, (example: string) => example, false, false);
                                }, ForEach);
                                ForEach.pop();
                            });
                        }
                        // 相关术语
                        else {
                            this.ifElseBranchUpdateFunction(1, () => {
                            });
                        }
                    }, If);
                    If.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        If.create();
                        // 相关术语
                        if (term.relatedTerms && term.relatedTerms.length > 0) {
                            this.ifElseBranchUpdateFunction(0, () => {
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    Text.create('相关术语');
                                    Text.fontSize(12);
                                    Text.fontWeight(FontWeight.Bold);
                                    Text.fontColor('#1976D2');
                                    Text.margin({ top: 12, bottom: 4 });
                                }, Text);
                                Text.pop();
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    Scroll.create();
                                    Scroll.width('100%');
                                    Scroll.scrollable(ScrollDirection.Horizontal);
                                    Scroll.scrollBar(BarState.Off);
                                }, Scroll);
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    Row.create();
                                }, Row);
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    ForEach.create();
                                    const forEachItemGenFunction = _item => {
                                        const related = _item;
                                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                                            __Common__.create();
                                            __Common__.margin({ right: 8, bottom: 4 });
                                        }, __Common__);
                                        {
                                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                                if (isInitialRender) {
                                                    let componentCall = new IceTag(this, { text: related, tagSize: 'small' }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/GlossaryPage.ets", line: 258, col: 19 });
                                                    ViewPU.create(componentCall);
                                                    let paramsLambda = () => {
                                                        return {
                                                            text: related,
                                                            tagSize: 'small'
                                                        };
                                                    };
                                                    componentCall.paramsGenerator_ = paramsLambda;
                                                }
                                                else {
                                                    this.updateStateVarsOfChildByElmtId(elmtId, {
                                                        text: related, tagSize: 'small'
                                                    });
                                                }
                                            }, { name: "IceTag" });
                                        }
                                        __Common__.pop();
                                    };
                                    this.forEachUpdateFunction(elmtId, term.relatedTerms, forEachItemGenFunction, (related: string) => related, false, false);
                                }, ForEach);
                                ForEach.pop();
                                Row.pop();
                                Scroll.pop();
                            });
                        }
                        else {
                            this.ifElseBranchUpdateFunction(1, () => {
                            });
                        }
                    }, If);
                    If.pop();
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
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "GlossaryPage";
    }
}
// 简化的术语类型
interface GlossaryTerm {
    id: string;
    term: string;
    termEn: string;
    abbreviation?: string;
    definition: string;
    examples?: string[];
    relatedTerms?: string[];
    category: string;
}
registerNamedRoute(() => new GlossaryPage(undefined, {}), "", { bundleName: "com.example.simplecalculator", moduleName: "entry", pagePath: "pages/GlossaryPage", pageFullPath: "entry/src/main/ets/pages/GlossaryPage", integratedHsp: "false", moduleType: "followWithHap" });
