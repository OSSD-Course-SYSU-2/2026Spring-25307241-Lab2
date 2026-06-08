if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface IceFilterBar_Params {
    filters?: FilterItem[];
    activeFilters?: string[];
    onFilterChange?: (filters: string[]) => void;
}
export class IceFilterBar extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__filters = new SynchedPropertyObjectOneWayPU(params.filters, this, "filters");
        this.__activeFilters = new SynchedPropertyObjectTwoWayPU(params.activeFilters, this, "activeFilters");
        this.onFilterChange = undefined;
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: IceFilterBar_Params) {
        if (params.filters === undefined) {
            this.__filters.set([]);
        }
        if (params.onFilterChange !== undefined) {
            this.onFilterChange = params.onFilterChange;
        }
    }
    updateStateVars(params: IceFilterBar_Params) {
        this.__filters.reset(params.filters);
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__filters.purgeDependencyOnElmtId(rmElmtId);
        this.__activeFilters.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__filters.aboutToBeDeleted();
        this.__activeFilters.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __filters: SynchedPropertySimpleOneWayPU<FilterItem[]>; // 筛选项列表
    get filters() {
        return this.__filters.get();
    }
    set filters(newValue: FilterItem[]) {
        this.__filters.set(newValue);
    }
    private __activeFilters: SynchedPropertySimpleOneWayPU<string[]>; // 当前激活的筛选条件
    get activeFilters() {
        return this.__activeFilters.get();
    }
    set activeFilters(newValue: string[]) {
        this.__activeFilters.set(newValue);
    }
    private onFilterChange?: (filters: string[]) => void; // 筛选变化事件
    initialRender() {
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
                const filter = _item;
                this.FilterButton.bind(this)(filter);
            };
            this.forEachUpdateFunction(elmtId, this.filters, forEachItemGenFunction, (filter: FilterItem) => filter.id, false, false);
        }, ForEach);
        ForEach.pop();
        Row.pop();
        Scroll.pop();
    }
    FilterButton(filter: FilterItem, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel(filter.label);
            Button.fontSize(14);
            Button.height(32);
            Button.padding({ left: 16, right: 16 });
            Button.backgroundColor(this.isActive(filter.id) ? '#4FC3F7' : '#F5F5F5');
            Button.fontColor(this.isActive(filter.id) ? '#FFFFFF' : '#666666');
            Button.borderRadius(16);
            Button.margin({ right: 8 });
            Button.onClick(() => {
                this.toggleFilter(filter.id);
            });
        }, Button);
        Button.pop();
    }
    private isActive(filterId: string): boolean {
        return this.activeFilters.includes(filterId);
    }
    private toggleFilter(filterId: string): void {
        const index = this.activeFilters.indexOf(filterId);
        if (index > -1) {
            // 移除筛选
            this.activeFilters.splice(index, 1);
        }
        else {
            // 添加筛选
            this.activeFilters.push(filterId);
        }
        if (this.onFilterChange) {
            this.onFilterChange(this.activeFilters);
        }
    }
    rerender() {
        this.updateDirtyElements();
    }
}
/**
 * 筛选项定义
 */
export interface FilterItem {
    id: string; // 筛选项ID
    label: string; // 显示文本
    value?: string; // 筛选值
}
