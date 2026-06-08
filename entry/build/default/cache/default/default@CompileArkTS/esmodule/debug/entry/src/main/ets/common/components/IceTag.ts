if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface DifficultyTag_Params {
    difficulty?: Difficulty;
}
interface IceTag_Params {
    text?: string;
    type?: 'default' | 'primary' | 'success' | 'warning' | 'danger';
    tagSize?: 'small' | 'medium' | 'large';
    customColor?: string;
}
import { DIFFICULTY_NAMES, getDifficultyColor } from "@bundle:com.example.simplecalculator/entry/ets/viewmodel/IceTraceModel";
import type { Difficulty } from "@bundle:com.example.simplecalculator/entry/ets/viewmodel/IceTraceModel";
export class IceTag extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__text = new SynchedPropertySimpleOneWayPU(params.text, this, "text");
        this.__type = new SynchedPropertySimpleOneWayPU(params.type, this, "type");
        this.__tagSize = new SynchedPropertySimpleOneWayPU(params.tagSize, this, "tagSize");
        this.__customColor = new SynchedPropertySimpleOneWayPU(params.customColor, this, "customColor");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: IceTag_Params) {
        if (params.text === undefined) {
            this.__text.set('');
        }
        if (params.type === undefined) {
            this.__type.set('default');
        }
        if (params.tagSize === undefined) {
            this.__tagSize.set('medium');
        }
        if (params.customColor === undefined) {
            this.__customColor.set('');
        }
    }
    updateStateVars(params: IceTag_Params) {
        this.__text.reset(params.text);
        this.__type.reset(params.type);
        this.__tagSize.reset(params.tagSize);
        this.__customColor.reset(params.customColor);
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__text.purgeDependencyOnElmtId(rmElmtId);
        this.__type.purgeDependencyOnElmtId(rmElmtId);
        this.__tagSize.purgeDependencyOnElmtId(rmElmtId);
        this.__customColor.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__text.aboutToBeDeleted();
        this.__type.aboutToBeDeleted();
        this.__tagSize.aboutToBeDeleted();
        this.__customColor.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __text: SynchedPropertySimpleOneWayPU<string>; // 标签文字
    get text() {
        return this.__text.get();
    }
    set text(newValue: string) {
        this.__text.set(newValue);
    }
    private __type: SynchedPropertySimpleOneWayPU<'default' | 'primary' | 'success' | 'warning' | 'danger'>;
    get type() {
        return this.__type.get();
    }
    set type(newValue: 'default' | 'primary' | 'success' | 'warning' | 'danger') {
        this.__type.set(newValue);
    }
    private __tagSize: SynchedPropertySimpleOneWayPU<'small' | 'medium' | 'large'>;
    get tagSize() {
        return this.__tagSize.get();
    }
    set tagSize(newValue: 'small' | 'medium' | 'large') {
        this.__tagSize.set(newValue);
    }
    private __customColor: SynchedPropertySimpleOneWayPU<string>; // 自定义颜色
    get customColor() {
        return this.__customColor.get();
    }
    set customColor(newValue: string) {
        this.__customColor.set(newValue);
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.text);
            Text.fontSize(this.getFontSize());
            Text.fontColor(this.getTextColor());
            Text.padding(this.getPadding());
            Text.backgroundColor(this.getBackgroundColor());
            Text.borderRadius(this.getBorderRadius());
        }, Text);
        Text.pop();
    }
    private getFontSize(): number {
        switch (this.tagSize) {
            case 'small': return 10;
            case 'medium': return 12;
            case 'large': return 14;
            default: return 12;
        }
    }
    private getPadding(): Padding {
        switch (this.tagSize) {
            case 'small': return { left: 4, right: 4, top: 2, bottom: 2 };
            case 'medium': return { left: 8, right: 8, top: 4, bottom: 4 };
            case 'large': return { left: 12, right: 12, top: 6, bottom: 6 };
            default: return { left: 8, right: 8, top: 4, bottom: 4 };
        }
    }
    private getBorderRadius(): number {
        switch (this.tagSize) {
            case 'small': return 4;
            case 'medium': return 6;
            case 'large': return 8;
            default: return 6;
        }
    }
    private getBackgroundColor(): string {
        if (this.customColor) {
            return this.customColor + '20'; // 20% 透明度
        }
        switch (this.type) {
            case 'primary': return '#4FC3F720';
            case 'success': return '#4CAF5020';
            case 'warning': return '#FF980020';
            case 'danger': return '#F4433620';
            default: return '#99999920';
        }
    }
    private getTextColor(): string {
        if (this.customColor) {
            return this.customColor;
        }
        switch (this.type) {
            case 'primary': return '#1976D2';
            case 'success': return '#4CAF50';
            case 'warning': return '#FF9800';
            case 'danger': return '#F44336';
            default: return '#666666';
        }
    }
    rerender() {
        this.updateDirtyElements();
    }
}
export class DifficultyTag extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__difficulty = new SynchedPropertySimpleOneWayPU(params.difficulty, this, "difficulty");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: DifficultyTag_Params) {
        if (params.difficulty === undefined) {
            this.__difficulty.set('BEGINNER');
        }
    }
    updateStateVars(params: DifficultyTag_Params) {
        this.__difficulty.reset(params.difficulty);
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__difficulty.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__difficulty.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __difficulty: SynchedPropertySimpleOneWayPU<Difficulty>;
    get difficulty() {
        return this.__difficulty.get();
    }
    set difficulty(newValue: Difficulty) {
        this.__difficulty.set(newValue);
    }
    initialRender() {
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new IceTag(this, {
                        text: DIFFICULTY_NAMES[this.difficulty],
                        customColor: getDifficultyColor(this.difficulty),
                        tagSize: 'small'
                    }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/common/components/IceTag.ets", line: 88, col: 5 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            text: DIFFICULTY_NAMES[this.difficulty],
                            customColor: getDifficultyColor(this.difficulty),
                            tagSize: 'small'
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        text: DIFFICULTY_NAMES[this.difficulty],
                        customColor: getDifficultyColor(this.difficulty),
                        tagSize: 'small'
                    });
                }
            }, { name: "IceTag" });
        }
    }
    rerender() {
        this.updateDirtyElements();
    }
}
