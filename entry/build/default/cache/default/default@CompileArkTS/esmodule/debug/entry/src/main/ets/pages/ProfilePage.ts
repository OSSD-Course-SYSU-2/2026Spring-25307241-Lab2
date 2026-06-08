if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface ProfilePage_Params {
    showEquipmentDialog?: boolean;
    showPlaylistDialog?: boolean;
    selectedEquipment?: Equipment | null;
    userInfo?: UserInfo;
    equipments?: Equipment[];
    playlists?: Playlist[];
    settings?: SettingItem[];
}
interface Equipment {
    id: string;
    type: 'SKATES' | 'BLADES';
    name: string;
    brand: string;
    purchaseDate: string;
    sharpenDate?: string;
    usageHours: number;
    maxHours: number;
    status: string;
}
interface Playlist {
    id: string;
    name: string;
    programType: 'SP' | 'FS';
    songCount: number;
    totalDuration: number;
}
interface SettingItem {
    icon: string;
    title: string;
    subtitle: string;
    action: string;
}
interface UserInfo {
    name: string;
    level: string;
    avatar: string;
}
export class ProfilePage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__showEquipmentDialog = new ObservedPropertySimplePU(false, this, "showEquipmentDialog");
        this.__showPlaylistDialog = new ObservedPropertySimplePU(false, this, "showPlaylistDialog");
        this.__selectedEquipment = new ObservedPropertyObjectPU(null, this, "selectedEquipment");
        this.userInfo = {
            name: '冰上舞者',
            level: 'Lv.12',
            avatar: '⛸️'
        };
        this.__equipments = new ObservedPropertyObjectPU([
            { id: '1', type: 'SKATES', name: 'Edea Piano', brand: 'Edea', purchaseDate: '2023-06-15', sharpenDate: '2024-01-10', usageHours: 48.5, maxHours: 80, status: '使用中' },
            { id: '2', type: 'BLADES', name: 'Matrix Legacy', brand: 'Jackson', purchaseDate: '2023-06-15', sharpenDate: '2024-02-20', usageHours: 48.5, maxHours: 60, status: '使用中' }
        ], this, "equipments");
        this.__playlists = new ObservedPropertyObjectPU([
            { id: '1', name: '短节目训练', programType: 'SP', songCount: 3, totalDuration: 180 },
            { id: '2', name: '自由滑训练', programType: 'FS', songCount: 5, totalDuration: 240 }
        ], this, "playlists");
        this.settings = [
            { icon: '⚙️', title: '训练设置', subtitle: '计时提醒、音乐绑定', action: 'training' },
            { icon: '🔔', title: '通知设置', subtitle: '磨刀提醒、训练提醒', action: 'notification' },
            { icon: '📊', title: '数据管理', subtitle: '导出、备份、清除', action: 'data' },
            { icon: '🎨', title: '主题设置', subtitle: '冰蓝、极光、深空', action: 'theme' }
        ];
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: ProfilePage_Params) {
        if (params.showEquipmentDialog !== undefined) {
            this.showEquipmentDialog = params.showEquipmentDialog;
        }
        if (params.showPlaylistDialog !== undefined) {
            this.showPlaylistDialog = params.showPlaylistDialog;
        }
        if (params.selectedEquipment !== undefined) {
            this.selectedEquipment = params.selectedEquipment;
        }
        if (params.userInfo !== undefined) {
            this.userInfo = params.userInfo;
        }
        if (params.equipments !== undefined) {
            this.equipments = params.equipments;
        }
        if (params.playlists !== undefined) {
            this.playlists = params.playlists;
        }
        if (params.settings !== undefined) {
            this.settings = params.settings;
        }
    }
    updateStateVars(params: ProfilePage_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__showEquipmentDialog.purgeDependencyOnElmtId(rmElmtId);
        this.__showPlaylistDialog.purgeDependencyOnElmtId(rmElmtId);
        this.__selectedEquipment.purgeDependencyOnElmtId(rmElmtId);
        this.__equipments.purgeDependencyOnElmtId(rmElmtId);
        this.__playlists.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__showEquipmentDialog.aboutToBeDeleted();
        this.__showPlaylistDialog.aboutToBeDeleted();
        this.__selectedEquipment.aboutToBeDeleted();
        this.__equipments.aboutToBeDeleted();
        this.__playlists.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __showEquipmentDialog: ObservedPropertySimplePU<boolean>;
    get showEquipmentDialog() {
        return this.__showEquipmentDialog.get();
    }
    set showEquipmentDialog(newValue: boolean) {
        this.__showEquipmentDialog.set(newValue);
    }
    private __showPlaylistDialog: ObservedPropertySimplePU<boolean>;
    get showPlaylistDialog() {
        return this.__showPlaylistDialog.get();
    }
    set showPlaylistDialog(newValue: boolean) {
        this.__showPlaylistDialog.set(newValue);
    }
    private __selectedEquipment: ObservedPropertyObjectPU<Equipment | null>;
    get selectedEquipment() {
        return this.__selectedEquipment.get();
    }
    set selectedEquipment(newValue: Equipment | null) {
        this.__selectedEquipment.set(newValue);
    }
    // 用户信息
    private userInfo: UserInfo;
    // 装备数据
    private __equipments: ObservedPropertyObjectPU<Equipment[]>;
    get equipments() {
        return this.__equipments.get();
    }
    set equipments(newValue: Equipment[]) {
        this.__equipments.set(newValue);
    }
    // 训练歌单
    private __playlists: ObservedPropertyObjectPU<Playlist[]>;
    get playlists() {
        return this.__playlists.get();
    }
    set playlists(newValue: Playlist[]) {
        this.__playlists.set(newValue);
    }
    // 设置项
    private settings: SettingItem[];
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Stack.create();
            Stack.width('100%');
            Stack.height('100%');
        }, Stack);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.height('100%');
        }, Column);
        this.buildUserCard.bind(this)();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Scroll.create();
            Scroll.width('100%');
            Scroll.layoutWeight(1);
            Scroll.scrollBar(BarState.Off);
        }, Scroll);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
        }, Column);
        this.buildEquipmentSection.bind(this)();
        this.buildPlaylistSection.bind(this)();
        this.buildSettingsList.bind(this)();
        this.buildOtherFeatures.bind(this)();
        Column.pop();
        Scroll.pop();
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.showEquipmentDialog && this.selectedEquipment) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.buildEquipmentDialog.bind(this)();
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
            if (this.showPlaylistDialog) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.buildPlaylistDetail.bind(this)();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        Stack.pop();
    }
    buildUserCard(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.margin({ top: 20, left: 20, right: 20 });
            Column.backgroundColor('rgba(255, 255, 255, 0.15)');
            Column.borderRadius(20);
            Column.backdropBlur(10);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.padding(20);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.userInfo.avatar);
            Text.fontSize(50);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.alignItems(HorizontalAlign.Start);
            Column.margin({ left: 20 });
            Column.layoutWeight(1);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.userInfo.name);
            Text.fontSize(20);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#FFFFFF');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.userInfo.level);
            Text.fontSize(14);
            Text.fontColor('rgba(255, 255, 255, 0.8)');
            Text.margin({ top: 5 });
        }, Text);
        Text.pop();
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('编辑');
            Text.fontSize(14);
            Text.fontColor('#FFFFFF');
            Text.backgroundColor('rgba(255, 255, 255, 0.3)');
            Text.borderRadius(15);
            Text.padding({ left: 15, right: 15, top: 8, bottom: 8 });
        }, Text);
        Text.pop();
        Row.pop();
        Column.pop();
    }
    buildEquipmentSection(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.padding(20);
            Column.backgroundColor('#FFFFFF');
            Column.borderRadius(20);
            Column.margin({ top: 15, left: 20, right: 20 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.margin({ bottom: 15 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('⛸️ 装备管家');
            Text.fontSize(18);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#333333');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('+ 添加');
            Text.fontSize(14);
            Text.fontColor('#3A7BD5');
        }, Text);
        Text.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const equip = _item;
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Row.create();
                    Row.width('100%');
                    Row.padding(15);
                    Row.backgroundColor('#F8F8F8');
                    Row.borderRadius(15);
                    Row.margin({ bottom: 10 });
                    Row.onClick(() => {
                        this.selectedEquipment = equip;
                        this.showEquipmentDialog = true;
                    });
                }, Row);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Column.create();
                    Column.layoutWeight(1);
                }, Column);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Row.create();
                    Row.width('100%');
                }, Row);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create(equip.type === 'SKATES' ? '⛸️' : '🔪');
                    Text.fontSize(24);
                }, Text);
                Text.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Column.create();
                    Column.alignItems(HorizontalAlign.Start);
                    Column.layoutWeight(1);
                    Column.margin({ left: 12 });
                }, Column);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create(equip.name);
                    Text.fontSize(16);
                    Text.fontWeight(FontWeight.Bold);
                    Text.fontColor('#333333');
                }, Text);
                Text.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create(`${equip.brand} | ${equip.purchaseDate}`);
                    Text.fontSize(12);
                    Text.fontColor('#999999');
                    Text.margin({ top: 3 });
                }, Text);
                Text.pop();
                Column.pop();
                Row.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Row.create();
                    Row.width('100%');
                    Row.margin({ top: 8 });
                }, Row);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create(`已使用 ${equip.usageHours}h / 建议 ${equip.maxHours}h`);
                    Text.fontSize(11);
                    Text.fontColor('#666666');
                }, Text);
                Text.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Blank.create();
                }, Blank);
                Blank.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create(equip.status);
                    Text.fontSize(11);
                    Text.fontColor('#FFFFFF');
                    Text.backgroundColor('#4CAF50');
                    Text.borderRadius(8);
                    Text.padding({ left: 8, right: 8, top: 3, bottom: 3 });
                }, Text);
                Text.pop();
                Row.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Progress.create({ value: equip.usageHours, total: equip.maxHours, type: ProgressType.Linear });
                    Progress.width('100%');
                    Progress.height(4);
                    Progress.color(equip.usageHours > equip.maxHours * 0.8 ? '#FF6B6B' : '#4CAF50');
                    Progress.margin({ top: 5 });
                }, Progress);
                Column.pop();
                Row.pop();
            };
            this.forEachUpdateFunction(elmtId, this.equipments, forEachItemGenFunction);
        }, ForEach);
        ForEach.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.padding(15);
            Row.backgroundColor('#FFF9E6');
            Row.borderRadius(15);
            Row.margin({ top: 5 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('⚠️');
            Text.fontSize(24);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.alignItems(HorizontalAlign.Start);
            Column.layoutWeight(1);
            Column.margin({ left: 15 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('磨刀提醒');
            Text.fontSize(14);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#333333');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('已使用48.5小时，建议磨刀');
            Text.fontSize(12);
            Text.fontColor('#FF6B6B');
            Text.margin({ top: 3 });
        }, Text);
        Text.pop();
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Toggle.create({ type: ToggleType.Switch, isOn: true });
            Toggle.selectedColor('#3A7BD5');
        }, Toggle);
        Toggle.pop();
        Row.pop();
        Column.pop();
    }
    buildPlaylistSection(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.padding(20);
            Column.backgroundColor('#FFFFFF');
            Column.borderRadius(20);
            Column.margin({ top: 15, left: 20, right: 20 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.margin({ bottom: 15 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('🎵 训练歌单');
            Text.fontSize(18);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#333333');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('+ 新建');
            Text.fontSize(14);
            Text.fontColor('#3A7BD5');
        }, Text);
        Text.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const playlist = _item;
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Row.create();
                    Row.width('100%');
                    Row.padding(15);
                    Row.backgroundColor('#F8F8F8');
                    Row.borderRadius(15);
                    Row.margin({ bottom: 10 });
                    Row.onClick(() => {
                        this.showPlaylistDialog = true;
                    });
                }, Row);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Column.create();
                    Column.layoutWeight(1);
                }, Column);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Row.create();
                    Row.width('100%');
                }, Row);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create('🎶');
                    Text.fontSize(24);
                }, Text);
                Text.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Column.create();
                    Column.alignItems(HorizontalAlign.Start);
                    Column.layoutWeight(1);
                    Column.margin({ left: 12 });
                }, Column);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create(playlist.name);
                    Text.fontSize(16);
                    Text.fontWeight(FontWeight.Bold);
                    Text.fontColor('#333333');
                }, Text);
                Text.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create(`${playlist.programType === 'SP' ? '短节目' : '自由滑'} | ${playlist.songCount}首`);
                    Text.fontSize(12);
                    Text.fontColor('#999999');
                    Text.margin({ top: 3 });
                }, Text);
                Text.pop();
                Column.pop();
                Row.pop();
                Column.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create(`${Math.floor(playlist.totalDuration / 60)}分钟`);
                    Text.fontSize(14);
                    Text.fontColor('#3A7BD5');
                }, Text);
                Text.pop();
                Row.pop();
            };
            this.forEachUpdateFunction(elmtId, this.playlists, forEachItemGenFunction);
        }, ForEach);
        ForEach.pop();
        Column.pop();
    }
    buildSettingsList(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.padding(20);
            Column.backgroundColor('#FFFFFF');
            Column.borderRadius(20);
            Column.margin({ top: 15, left: 20, right: 20 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('⚙️ 设置');
            Text.fontSize(18);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#333333');
            Text.width('100%');
            Text.margin({ bottom: 15 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const setting = _item;
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Row.create();
                    Row.width('100%');
                    Row.padding(12);
                    Row.backgroundColor('#F8F8F8');
                    Row.borderRadius(12);
                    Row.margin({ bottom: 8 });
                }, Row);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create(setting.icon);
                    Text.fontSize(24);
                }, Text);
                Text.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Column.create();
                    Column.alignItems(HorizontalAlign.Start);
                    Column.layoutWeight(1);
                    Column.margin({ left: 15 });
                }, Column);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create(setting.title);
                    Text.fontSize(15);
                    Text.fontWeight(FontWeight.Bold);
                    Text.fontColor('#333333');
                }, Text);
                Text.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create(setting.subtitle);
                    Text.fontSize(12);
                    Text.fontColor('#999999');
                    Text.margin({ top: 3 });
                }, Text);
                Text.pop();
                Column.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create('›');
                    Text.fontSize(20);
                    Text.fontColor('#CCCCCC');
                }, Text);
                Text.pop();
                Row.pop();
            };
            this.forEachUpdateFunction(elmtId, this.settings, forEachItemGenFunction);
        }, ForEach);
        ForEach.pop();
        Column.pop();
    }
    buildOtherFeatures(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.padding(20);
            Column.margin({ top: 15, left: 20, right: 20, bottom: 20 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.justifyContent(FlexAlign.SpaceEvenly);
        }, Row);
        this.featureButton.bind(this)('❓', '帮助中心');
        this.featureButton.bind(this)('📝', '意见反馈');
        this.featureButton.bind(this)('ℹ️', '关于我们');
        Row.pop();
        Column.pop();
    }
    featureButton(icon: string, label: string, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width(80);
            Column.height(70);
            Column.backgroundColor('#FFFFFF');
            Column.borderRadius(15);
            Column.justifyContent(FlexAlign.Center);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(icon);
            Text.fontSize(24);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(label);
            Text.fontSize(12);
            Text.fontColor('#666666');
            Text.margin({ top: 5 });
        }, Text);
        Text.pop();
        Column.pop();
    }
    buildEquipmentDialog(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.height('100%');
            Column.backgroundColor('rgba(0, 0, 0, 0.5)');
            Column.justifyContent(FlexAlign.Center);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('85%');
            Column.padding(25);
            Column.backgroundColor('#FFFFFF');
            Column.borderRadius(20);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.selectedEquipment!.type === 'SKATES' ? '⛸️' : '🔪');
            Text.fontSize(50);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.selectedEquipment!.name);
            Text.fontSize(20);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#333333');
            Text.margin({ top: 15 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.padding(15);
            Column.backgroundColor('#F8F8F8');
            Column.borderRadius(12);
            Column.margin({ top: 20 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.margin({ bottom: 8 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('品牌: ');
            Text.fontSize(14);
            Text.fontColor('#666666');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.selectedEquipment!.brand);
            Text.fontSize(14);
            Text.fontColor('#333333');
        }, Text);
        Text.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.margin({ bottom: 8 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('购买日期: ');
            Text.fontSize(14);
            Text.fontColor('#666666');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.selectedEquipment!.purchaseDate);
            Text.fontSize(14);
            Text.fontColor('#333333');
        }, Text);
        Text.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.margin({ bottom: 8 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('开刃日期: ');
            Text.fontSize(14);
            Text.fontColor('#666666');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.selectedEquipment!.sharpenDate || '未记录');
            Text.fontSize(14);
            Text.fontColor('#333333');
        }, Text);
        Text.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('使用时长: ');
            Text.fontSize(14);
            Text.fontColor('#666666');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(`${this.selectedEquipment!.usageHours}h / ${this.selectedEquipment!.maxHours}h`);
            Text.fontSize(14);
            Text.fontColor('#333333');
        }, Text);
        Text.pop();
        Row.pop();
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.margin({ top: 20 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('编辑');
            Button.fontSize(14);
            Button.fontColor('#FFFFFF');
            Button.backgroundColor('#3A7BD5');
            Button.borderRadius(20);
            Button.width(100);
        }, Button);
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('关闭');
            Button.fontSize(14);
            Button.fontColor('#666666');
            Button.backgroundColor('#F0F0F0');
            Button.borderRadius(20);
            Button.width(100);
            Button.margin({ left: 15 });
            Button.onClick(() => {
                this.showEquipmentDialog = false;
            });
        }, Button);
        Button.pop();
        Row.pop();
        Column.pop();
        Column.pop();
    }
    buildPlaylistDetail(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.height('100%');
            Column.backgroundColor('rgba(0, 0, 0, 0.5)');
            Column.justifyContent(FlexAlign.Center);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('85%');
            Column.padding(25);
            Column.backgroundColor('#FFFFFF');
            Column.borderRadius(20);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('🎵 歌单详情');
            Text.fontSize(18);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#333333');
            Text.margin({ bottom: 20 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
        }, Column);
        this.SongItem.bind(this)('Ballade No.1', 'Chopin', 72, '2A, 3T');
        this.SongItem.bind(this)('Clair de Lune', 'Debussy', 60, 'USp, StSq');
        this.SongItem.bind(this)('Swan Lake', 'Tchaikovsky', 80, '3S, SSp');
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('关闭');
            Button.fontSize(16);
            Button.fontColor('#FFFFFF');
            Button.backgroundColor('#3A7BD5');
            Button.borderRadius(20);
            Button.width(120);
            Button.margin({ top: 20 });
            Button.onClick(() => {
                this.showPlaylistDialog = false;
            });
        }, Button);
        Button.pop();
        Column.pop();
        Column.pop();
    }
    SongItem(name: string, artist: string, bpm: number, moves: string, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.padding(12);
            Row.backgroundColor('#F8F8F8');
            Row.borderRadius(10);
            Row.margin({ bottom: 8 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.alignItems(HorizontalAlign.Start);
            Column.layoutWeight(1);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(name);
            Text.fontSize(15);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#333333');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(`${artist} | BPM: ${bpm}`);
            Text.fontSize(12);
            Text.fontColor('#999999');
            Text.margin({ top: 3 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(`关联: ${moves}`);
            Text.fontSize(11);
            Text.fontColor('#3A7BD5');
            Text.margin({ top: 3 });
        }, Text);
        Text.pop();
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('▶️');
            Text.fontSize(24);
        }, Text);
        Text.pop();
        Row.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
