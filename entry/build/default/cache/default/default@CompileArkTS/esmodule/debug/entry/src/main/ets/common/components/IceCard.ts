if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface IceCard_Params {
    title?: string;
    subtitle?: string;
    showBorder?: boolean;
    cardPadding?: number;
    cardMargin?: number;
    cardBorderRadius?: number;
    cardBackgroundColor?: string;
    onCardClick?: () => void;
    content?: () => void;
}
export class IceCard extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__title = new SynchedPropertySimpleOneWayPU(params.title, this, "title");
        this.__subtitle = new SynchedPropertySimpleOneWayPU(params.subtitle, this, "subtitle");
        this.__showBorder = new SynchedPropertySimpleOneWayPU(params.showBorder, this, "showBorder");
        this.__cardPadding = new SynchedPropertySimpleOneWayPU(params.cardPadding, this, "cardPadding");
        this.__cardMargin = new SynchedPropertySimpleOneWayPU(params.cardMargin, this, "cardMargin");
        this.__cardBorderRadius = new SynchedPropertySimpleOneWayPU(params.cardBorderRadius, this, "cardBorderRadius");
        this.__cardBackgroundColor = new SynchedPropertySimpleOneWayPU(params.cardBackgroundColor, this, "cardBackgroundColor");
        this.onCardClick = undefined;
        this.content = undefined;
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: IceCard_Params) {
        if (params.title === undefined) {
            this.__title.set('');
        }
        if (params.subtitle === undefined) {
            this.__subtitle.set('');
        }
        if (params.showBorder === undefined) {
            this.__showBorder.set(true);
        }
        if (params.cardPadding === undefined) {
            this.__cardPadding.set(16);
        }
        if (params.cardMargin === undefined) {
            this.__cardMargin.set(8);
        }
        if (params.cardBorderRadius === undefined) {
            this.__cardBorderRadius.set(12);
        }
        if (params.cardBackgroundColor === undefined) {
            this.__cardBackgroundColor.set('#FFFFFF');
        }
        if (params.onCardClick !== undefined) {
            this.onCardClick = params.onCardClick;
        }
        if (params.content !== undefined) {
            this.content = params.content;
        }
    }
    updateStateVars(params: IceCard_Params) {
        this.__title.reset(params.title);
        this.__subtitle.reset(params.subtitle);
        this.__showBorder.reset(params.showBorder);
        this.__cardPadding.reset(params.cardPadding);
        this.__cardMargin.reset(params.cardMargin);
        this.__cardBorderRadius.reset(params.cardBorderRadius);
        this.__cardBackgroundColor.reset(params.cardBackgroundColor);
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__title.purgeDependencyOnElmtId(rmElmtId);
        this.__subtitle.purgeDependencyOnElmtId(rmElmtId);
        this.__showBorder.purgeDependencyOnElmtId(rmElmtId);
        this.__cardPadding.purgeDependencyOnElmtId(rmElmtId);
        this.__cardMargin.purgeDependencyOnElmtId(rmElmtId);
        this.__cardBorderRadius.purgeDependencyOnElmtId(rmElmtId);
        this.__cardBackgroundColor.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__title.aboutToBeDeleted();
        this.__subtitle.aboutToBeDeleted();
        this.__showBorder.aboutToBeDeleted();
        this.__cardPadding.aboutToBeDeleted();
        this.__cardMargin.aboutToBeDeleted();
        this.__cardBorderRadius.aboutToBeDeleted();
        this.__cardBackgroundColor.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __title: SynchedPropertySimpleOneWayPU<string>; // 卡片标题
    get title() {
        return this.__title.get();
    }
    set title(newValue: string) {
        this.__title.set(newValue);
    }
    private __subtitle: SynchedPropertySimpleOneWayPU<string>; // 副标题
    get subtitle() {
        return this.__subtitle.get();
    }
    set subtitle(newValue: string) {
        this.__subtitle.set(newValue);
    }
    private __showBorder: SynchedPropertySimpleOneWayPU<boolean>; // 是否显示边框
    get showBorder() {
        return this.__showBorder.get();
    }
    set showBorder(newValue: boolean) {
        this.__showBorder.set(newValue);
    }
    private __cardPadding: SynchedPropertySimpleOneWayPU<number>; // 内边距
    get cardPadding() {
        return this.__cardPadding.get();
    }
    set cardPadding(newValue: number) {
        this.__cardPadding.set(newValue);
    }
    private __cardMargin: SynchedPropertySimpleOneWayPU<number>; // 外边距
    get cardMargin() {
        return this.__cardMargin.get();
    }
    set cardMargin(newValue: number) {
        this.__cardMargin.set(newValue);
    }
    private __cardBorderRadius: SynchedPropertySimpleOneWayPU<number>; // 圆角
    get cardBorderRadius() {
        return this.__cardBorderRadius.get();
    }
    set cardBorderRadius(newValue: number) {
        this.__cardBorderRadius.set(newValue);
    }
    private __cardBackgroundColor: SynchedPropertySimpleOneWayPU<string>; // 背景色
    get cardBackgroundColor() {
        return this.__cardBackgroundColor.get();
    }
    set cardBackgroundColor(newValue: string) {
        this.__cardBackgroundColor.set(newValue);
    }
    private onCardClick?: () => void; // 卡片点击事件
    private __content; // 卡片内容
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.padding(this.cardPadding);
            Column.margin(this.cardMargin);
            Column.backgroundColor(this.cardBackgroundColor);
            Column.borderRadius(this.cardBorderRadius);
            Column.shadow({
                radius: this.showBorder ? 8 : 0,
                color: '#1A000000',
                offsetX: 0,
                offsetY: 2
            });
            Column.onClick(() => {
                if (this.onCardClick) {
                    this.onCardClick();
                }
            });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            // 标题区域
            if (this.title) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Row.create();
                        Row.width('100%');
                        Row.margin({ bottom: 12 });
                    }, Row);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(this.title);
                        Text.fontSize(16);
                        Text.fontWeight(FontWeight.Bold);
                        Text.fontColor('#333333');
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        If.create();
                        if (this.subtitle) {
                            this.ifElseBranchUpdateFunction(0, () => {
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    Text.create(this.subtitle);
                                    Text.fontSize(12);
                                    Text.fontColor('#999999');
                                    Text.margin({ left: 8 });
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
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Blank.create();
                    }, Blank);
                    Blank.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        If.create();
                        if (this.onCardClick) {
                            this.ifElseBranchUpdateFunction(0, () => {
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    Text.create('›');
                                    Text.fontSize(20);
                                    Text.fontColor('#999999');
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
                });
            }
            // 内容区域
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            // 内容区域
            if (this.content) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.content.bind(this)();
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
}
