if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface IceEmpty_Params {
    icon?: string;
    title?: string;
    description?: string;
    buttonText?: string;
    onButtonClick?: () => void;
}
export class IceEmpty extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__icon = new SynchedPropertySimpleOneWayPU(params.icon, this, "icon");
        this.__title = new SynchedPropertySimpleOneWayPU(params.title, this, "title");
        this.__description = new SynchedPropertySimpleOneWayPU(params.description, this, "description");
        this.__buttonText = new SynchedPropertySimpleOneWayPU(params.buttonText, this, "buttonText");
        this.onButtonClick = undefined;
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: IceEmpty_Params) {
        if (params.icon === undefined) {
            this.__icon.set('📭');
        }
        if (params.title === undefined) {
            this.__title.set('暂无数据');
        }
        if (params.description === undefined) {
            this.__description.set('');
        }
        if (params.buttonText === undefined) {
            this.__buttonText.set('');
        }
        if (params.onButtonClick !== undefined) {
            this.onButtonClick = params.onButtonClick;
        }
    }
    updateStateVars(params: IceEmpty_Params) {
        this.__icon.reset(params.icon);
        this.__title.reset(params.title);
        this.__description.reset(params.description);
        this.__buttonText.reset(params.buttonText);
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__icon.purgeDependencyOnElmtId(rmElmtId);
        this.__title.purgeDependencyOnElmtId(rmElmtId);
        this.__description.purgeDependencyOnElmtId(rmElmtId);
        this.__buttonText.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__icon.aboutToBeDeleted();
        this.__title.aboutToBeDeleted();
        this.__description.aboutToBeDeleted();
        this.__buttonText.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __icon: SynchedPropertySimpleOneWayPU<string>; // 图标
    get icon() {
        return this.__icon.get();
    }
    set icon(newValue: string) {
        this.__icon.set(newValue);
    }
    private __title: SynchedPropertySimpleOneWayPU<string>; // 标题
    get title() {
        return this.__title.get();
    }
    set title(newValue: string) {
        this.__title.set(newValue);
    }
    private __description: SynchedPropertySimpleOneWayPU<string>; // 描述
    get description() {
        return this.__description.get();
    }
    set description(newValue: string) {
        this.__description.set(newValue);
    }
    private __buttonText: SynchedPropertySimpleOneWayPU<string>; // 按钮文字
    get buttonText() {
        return this.__buttonText.get();
    }
    set buttonText(newValue: string) {
        this.__buttonText.set(newValue);
    }
    private onButtonClick?: () => void; // 按钮点击事件
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.padding(32);
            Column.justifyContent(FlexAlign.Center);
            Column.alignItems(HorizontalAlign.Center);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.icon);
            Text.fontSize(64);
            Text.margin({ bottom: 16 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.title);
            Text.fontSize(16);
            Text.fontColor('#666666');
            Text.margin({ bottom: 8 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.description) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(this.description);
                        Text.fontSize(14);
                        Text.fontColor('#999999');
                        Text.textAlign(TextAlign.Center);
                        Text.margin({ bottom: 16 });
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
            if (this.buttonText) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Button.createWithLabel(this.buttonText);
                        Button.fontSize(14);
                        Button.height(40);
                        Button.backgroundColor('#4FC3F7');
                        Button.fontColor('#FFFFFF');
                        Button.borderRadius(20);
                        Button.onClick(() => {
                            if (this.onButtonClick) {
                                this.onButtonClick();
                            }
                        });
                    }, Button);
                    Button.pop();
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
