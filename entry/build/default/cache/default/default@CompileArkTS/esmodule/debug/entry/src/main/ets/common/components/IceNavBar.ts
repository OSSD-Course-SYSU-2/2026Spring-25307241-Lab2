if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface IceNavBar_Params {
    title?: string;
    showBack?: boolean;
    backText?: string;
    rightIcon?: string;
    rightText?: string;
    navBackgroundColor?: string;
    textColor?: string;
    onRightClick?: () => void;
    onBackClick?: () => void;
}
import router from "@ohos:router";
export class IceNavBar extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__title = new SynchedPropertySimpleOneWayPU(params.title, this, "title");
        this.__showBack = new SynchedPropertySimpleOneWayPU(params.showBack, this, "showBack");
        this.__backText = new SynchedPropertySimpleOneWayPU(params.backText, this, "backText");
        this.__rightIcon = new SynchedPropertySimpleOneWayPU(params.rightIcon, this, "rightIcon");
        this.__rightText = new SynchedPropertySimpleOneWayPU(params.rightText, this, "rightText");
        this.__navBackgroundColor = new SynchedPropertySimpleOneWayPU(params.navBackgroundColor, this, "navBackgroundColor");
        this.__textColor = new SynchedPropertySimpleOneWayPU(params.textColor, this, "textColor");
        this.onRightClick = undefined;
        this.onBackClick = undefined;
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: IceNavBar_Params) {
        if (params.title === undefined) {
            this.__title.set('');
        }
        if (params.showBack === undefined) {
            this.__showBack.set(true);
        }
        if (params.backText === undefined) {
            this.__backText.set('');
        }
        if (params.rightIcon === undefined) {
            this.__rightIcon.set('');
        }
        if (params.rightText === undefined) {
            this.__rightText.set('');
        }
        if (params.navBackgroundColor === undefined) {
            this.__navBackgroundColor.set('#4FC3F7');
        }
        if (params.textColor === undefined) {
            this.__textColor.set('#FFFFFF');
        }
        if (params.onRightClick !== undefined) {
            this.onRightClick = params.onRightClick;
        }
        if (params.onBackClick !== undefined) {
            this.onBackClick = params.onBackClick;
        }
    }
    updateStateVars(params: IceNavBar_Params) {
        this.__title.reset(params.title);
        this.__showBack.reset(params.showBack);
        this.__backText.reset(params.backText);
        this.__rightIcon.reset(params.rightIcon);
        this.__rightText.reset(params.rightText);
        this.__navBackgroundColor.reset(params.navBackgroundColor);
        this.__textColor.reset(params.textColor);
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__title.purgeDependencyOnElmtId(rmElmtId);
        this.__showBack.purgeDependencyOnElmtId(rmElmtId);
        this.__backText.purgeDependencyOnElmtId(rmElmtId);
        this.__rightIcon.purgeDependencyOnElmtId(rmElmtId);
        this.__rightText.purgeDependencyOnElmtId(rmElmtId);
        this.__navBackgroundColor.purgeDependencyOnElmtId(rmElmtId);
        this.__textColor.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__title.aboutToBeDeleted();
        this.__showBack.aboutToBeDeleted();
        this.__backText.aboutToBeDeleted();
        this.__rightIcon.aboutToBeDeleted();
        this.__rightText.aboutToBeDeleted();
        this.__navBackgroundColor.aboutToBeDeleted();
        this.__textColor.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __title: SynchedPropertySimpleOneWayPU<string>; // 标题
    get title() {
        return this.__title.get();
    }
    set title(newValue: string) {
        this.__title.set(newValue);
    }
    private __showBack: SynchedPropertySimpleOneWayPU<boolean>; // 是否显示返回按钮
    get showBack() {
        return this.__showBack.get();
    }
    set showBack(newValue: boolean) {
        this.__showBack.set(newValue);
    }
    private __backText: SynchedPropertySimpleOneWayPU<string>; // 返回按钮文字(可选)
    get backText() {
        return this.__backText.get();
    }
    set backText(newValue: string) {
        this.__backText.set(newValue);
    }
    private __rightIcon: SynchedPropertySimpleOneWayPU<string>; // 右侧图标
    get rightIcon() {
        return this.__rightIcon.get();
    }
    set rightIcon(newValue: string) {
        this.__rightIcon.set(newValue);
    }
    private __rightText: SynchedPropertySimpleOneWayPU<string>; // 右侧文字
    get rightText() {
        return this.__rightText.get();
    }
    set rightText(newValue: string) {
        this.__rightText.set(newValue);
    }
    private __navBackgroundColor: SynchedPropertySimpleOneWayPU<string>; // 背景色
    get navBackgroundColor() {
        return this.__navBackgroundColor.get();
    }
    set navBackgroundColor(newValue: string) {
        this.__navBackgroundColor.set(newValue);
    }
    private __textColor: SynchedPropertySimpleOneWayPU<string>; // 文字颜色
    get textColor() {
        return this.__textColor.get();
    }
    set textColor(newValue: string) {
        this.__textColor.set(newValue);
    }
    private onRightClick?: () => void; // 右侧按钮点击事件
    private onBackClick?: () => void; // 返回按钮点击事件(可选)
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.height(56);
            Row.padding({ left: 8, right: 8 });
            Row.backgroundColor(this.navBackgroundColor);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            // 左侧返回按钮
            if (this.showBack) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Button.createWithChild();
                        Button.width(this.backText ? 60 : 40);
                        Button.height(40);
                        Button.backgroundColor(Color.Transparent);
                        Button.onClick(() => {
                            if (this.onBackClick) {
                                this.onBackClick();
                            }
                            else {
                                router.back();
                            }
                        });
                    }, Button);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Row.create();
                    }, Row);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('←');
                        Text.fontSize(20);
                        Text.fontColor(this.textColor);
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        If.create();
                        if (this.backText) {
                            this.ifElseBranchUpdateFunction(0, () => {
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    Text.create(this.backText);
                                    Text.fontSize(16);
                                    Text.fontColor(this.textColor);
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
                    Button.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Blank.create();
                        Blank.width(40);
                    }, Blank);
                    Blank.pop();
                });
            }
        }, If);
        If.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 中间标题
            Text.create(this.title);
            // 中间标题
            Text.fontSize(18);
            // 中间标题
            Text.fontColor(this.textColor);
            // 中间标题
            Text.fontWeight(FontWeight.Bold);
            // 中间标题
            Text.layoutWeight(1);
            // 中间标题
            Text.textAlign(TextAlign.Center);
        }, Text);
        // 中间标题
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            // 右侧操作按钮
            if (this.rightIcon || this.rightText) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Button.createWithChild();
                        Button.width(this.rightText ? 60 : 40);
                        Button.height(40);
                        Button.backgroundColor(Color.Transparent);
                        Button.onClick(() => {
                            if (this.onRightClick) {
                                this.onRightClick();
                            }
                        });
                    }, Button);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Row.create();
                    }, Row);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        If.create();
                        if (this.rightIcon) {
                            this.ifElseBranchUpdateFunction(0, () => {
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    Text.create(this.rightIcon);
                                    Text.fontSize(20);
                                    Text.fontColor(this.textColor);
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
                        If.create();
                        if (this.rightText) {
                            this.ifElseBranchUpdateFunction(0, () => {
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    Text.create(this.rightText);
                                    Text.fontSize(16);
                                    Text.fontColor(this.textColor);
                                    Text.margin({ left: this.rightIcon ? 4 : 0 });
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
                    Button.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Blank.create();
                        Blank.width(40);
                    }, Blank);
                    Blank.pop();
                });
            }
        }, If);
        If.pop();
        Row.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
