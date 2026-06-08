if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface ProgramAppreciationPage_Params {
    selectedStyle?: string;
    styles?: ProgramStyle[];
    programs?: ClassicProgram[];
}
import { IceNavBar } from "@bundle:com.example.simplecalculator/entry/ets/common/components/IceNavBar";
import { IceCard } from "@bundle:com.example.simplecalculator/entry/ets/common/components/IceCard";
import { IceTag } from "@bundle:com.example.simplecalculator/entry/ets/common/components/IceTag";
class ProgramAppreciationPage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__selectedStyle = new ObservedPropertySimplePU('all', this, "selectedStyle");
        this.styles = [
            { id: 'all', name: '全部', icon: '✨' },
            { id: 'beautiful', name: '唯美', icon: '🌸' },
            { id: 'passionate', name: '热血', icon: '🔥' },
            { id: 'chinese', name: '国风', icon: '🏮' },
            { id: 'classical', name: '古典', icon: '🎻' }
        ];
        this.programs = [
            {
                id: 'prog_001',
                name: '阴阳师',
                skater: '羽生结弦',
                nation: 'JPN',
                season: '2018-19',
                type: 'SP',
                music: 'Onmyoji',
                style: 'classical',
                score: 106.69,
                description: '改编自日本经典电影《阴阳师》，展现了日本传统文化的神秘与优雅',
                highlights: [
                    '开场独特的姿态设计，展现阴阳师的神秘感',
                    '步法编排融入日本传统舞蹈元素',
                    '旋转组合流畅优雅，与音乐完美契合',
                    '结尾动作设计呼应阴阳师角色特征'
                ],
                difficulties: [
                    '三周半跳接三周跳的高难度连跳',
                    '换足旋转的流畅过渡',
                    '步法序列的复杂编排'
                ],
                isMustWatch: true
            },
            {
                id: 'prog_002',
                name: '罗密欧与朱丽叶',
                skater: '羽生结弦',
                nation: 'JPN',
                season: '2011-12',
                type: 'FS',
                music: 'Romeo and Juliet',
                style: 'passionate',
                score: 178.64,
                description: '演绎莎士比亚经典悲剧，情感张力十足，展现青春与爱情的热烈',
                highlights: [
                    '开场强烈的戏剧性表现',
                    '跳跃编排与音乐高潮完美配合',
                    '情感表达层次丰富，从热烈到悲伤',
                    '服装设计呼应剧中角色'
                ],
                difficulties: [
                    '后四周跳的稳定完成',
                    '连跳序列的高难度编排',
                    '节目内容分PCS的极致表现'
                ],
                isMustWatch: true
            },
            {
                id: 'prog_003',
                name: '图兰朵',
                skater: '羽生结弦',
                nation: 'JPN',
                season: '2017-18',
                type: 'FS',
                music: 'Turandot',
                style: 'classical',
                score: 206.17,
                description: '平昌冬奥会自由滑节目，演绎普契尼歌剧经典',
                highlights: [
                    '开场气势恢宏，展现冰上歌剧',
                    '跳跃难度与艺术表现完美平衡',
                    '旋转速度与美感兼具',
                    '成为冬奥会经典名场面'
                ],
                difficulties: [
                    '后四周跳的成功率控制',
                    '三周半跳的稳定性',
                    '后半程体能分配'
                ],
                isMustWatch: true
            },
            {
                id: 'prog_004',
                name: '卧虎藏龙',
                skater: '陈巍',
                nation: 'USA',
                season: '2019-20',
                type: 'FS',
                music: 'Crouching Tiger, Hidden Dragon',
                style: 'chinese',
                score: 216.02,
                description: '致敬中国功夫电影，展现东方武侠精神',
                highlights: [
                    '融入中国功夫元素的动作设计',
                    '跳跃难度世界顶级',
                    '步法编排展现武侠意境',
                    '服装设计呼应电影角色'
                ],
                difficulties: [
                    '后四周跳接后外点冰三周跳',
                    '后内点冰四周跳的稳定完成',
                    '五组四周跳的高难度配置'
                ],
                isMustWatch: true
            },
            {
                id: 'prog_005',
                name: '星夜',
                skater: '纪平梨花',
                nation: 'JPN',
                season: '2019-20',
                type: 'SP',
                music: 'Starry Night',
                style: 'beautiful',
                score: 76.56,
                description: '展现夜空繁星之美，梦幻而浪漫',
                highlights: [
                    '开场姿态如星河般璀璨',
                    '跳跃轻盈优雅',
                    '旋转展现星空旋转的意境',
                    '整体氛围梦幻浪漫'
                ],
                difficulties: [
                    '三周半跳的女单高难度',
                    '旋转速度与美感兼具',
                    '步法序列的流畅性'
                ],
                isMustWatch: false
            },
            {
                id: 'prog_006',
                name: '十面埋伏',
                skater: '彭程/金杨',
                nation: 'CHN',
                season: '2018-19',
                type: 'FS',
                music: 'Ambush from Ten Sides',
                style: 'chinese',
                score: 136.89,
                description: '双人滑节目，演绎中国古典音乐经典',
                highlights: [
                    '托举动作融入中国武术元素',
                    '螺旋线展现东方美学',
                    '抛跳难度与美感兼具',
                    '双人配合默契无间'
                ],
                difficulties: [
                    '后内结环四周抛跳',
                    '托举的稳定性与高度',
                    '双人旋转的同步性'
                ],
                isMustWatch: false
            }
        ];
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: ProgramAppreciationPage_Params) {
        if (params.selectedStyle !== undefined) {
            this.selectedStyle = params.selectedStyle;
        }
        if (params.styles !== undefined) {
            this.styles = params.styles;
        }
        if (params.programs !== undefined) {
            this.programs = params.programs;
        }
    }
    updateStateVars(params: ProgramAppreciationPage_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__selectedStyle.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__selectedStyle.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __selectedStyle: ObservedPropertySimplePU<string>; // all, beautiful, passionate, chinese, classical
    get selectedStyle() {
        return this.__selectedStyle.get();
    }
    set selectedStyle(newValue: string) {
        this.__selectedStyle.set(newValue);
    }
    // 风格分类
    private styles: ProgramStyle[];
    // 经典节目数据
    private programs: ClassicProgram[];
    // 筛选节目
    private getFilteredPrograms(): ClassicProgram[] {
        if (this.selectedStyle === 'all') {
            return this.programs;
        }
        return this.programs.filter((p: ClassicProgram) => p.style === this.selectedStyle);
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
                        title: '节目赏析',
                        showBack: true,
                        navBackgroundColor: '#AB47BC'
                    }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/ProgramAppreciationPage.ets", line: 184, col: 7 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            title: '节目赏析',
                            showBack: true,
                            navBackgroundColor: '#AB47BC'
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        title: '节目赏析',
                        showBack: true,
                        navBackgroundColor: '#AB47BC'
                    });
                }
            }, { name: "IceNavBar" });
        }
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 内容区
            Scroll.create();
            // 内容区
            Scroll.layoutWeight(1);
            // 内容区
            Scroll.scrollBar(BarState.Auto);
        }, Scroll);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.padding(16);
        }, Column);
        // 介绍横幅
        this.buildIntroBanner.bind(this)();
        // 风格筛选
        this.buildStyleFilter.bind(this)();
        // 节目列表
        this.buildProgramList.bind(this)();
        // 观看建议
        this.buildWatchingTips.bind(this)();
        Column.pop();
        // 内容区
        Scroll.pop();
        Column.pop();
    }
    // 介绍横幅
    buildIntroBanner(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.height(150);
            Column.justifyContent(FlexAlign.Center);
            Column.linearGradient({
                angle: 135,
                colors: [['#AB47BC', 0.0], ['#7B1FA2', 1.0]]
            });
            Column.borderRadius(16);
            Column.margin({ bottom: 20 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('🎬 经典节目赏析');
            Text.fontSize(24);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#FFFFFF');
            Text.margin({ bottom: 8 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('精选花滑历史上的经典节目，学会"看懂节目"');
            Text.fontSize(14);
            Text.fontColor('rgba(255,255,255,0.8)');
        }, Text);
        Text.pop();
        Column.pop();
    }
    // 风格筛选
    buildStyleFilter(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.alignItems(HorizontalAlign.Start);
            Column.margin({ bottom: 20 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('风格分类');
            Text.fontSize(16);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#333333');
            Text.margin({ bottom: 12 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Scroll.create();
            Scroll.scrollable(ScrollDirection.Horizontal);
            Scroll.scrollBar(BarState.Off);
        }, Scroll);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const style = _item;
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Button.createWithLabel(style.icon + ' ' + style.name);
                    Button.fontSize(14);
                    Button.height(36);
                    Button.backgroundColor(this.selectedStyle === style.id ? '#AB47BC' : '#FFFFFF');
                    Button.fontColor(this.selectedStyle === style.id ? '#FFFFFF' : '#666666');
                    Button.borderRadius(18);
                    Button.margin({ right: 8 });
                    Button.onClick(() => {
                        this.selectedStyle = style.id;
                    });
                }, Button);
                Button.pop();
            };
            this.forEachUpdateFunction(elmtId, this.styles, forEachItemGenFunction, (style: ProgramStyle) => style.id, false, false);
        }, ForEach);
        ForEach.pop();
        Row.pop();
        Scroll.pop();
        Column.pop();
    }
    // 节目列表
    buildProgramList(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const program = _item;
                this.ProgramCard.bind(this)(program);
            };
            this.forEachUpdateFunction(elmtId, this.getFilteredPrograms(), forEachItemGenFunction, (program: ClassicProgram) => program.id, false, false);
        }, ForEach);
        ForEach.pop();
        Column.pop();
    }
    ProgramCard(program: ClassicProgram, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.padding(20);
            Column.backgroundColor('#FFFFFF');
            Column.borderRadius(12);
            Column.shadow({
                radius: 8,
                color: '#1A000000',
                offsetX: 0,
                offsetY: 2
            });
            Column.margin({ bottom: 16 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 顶部信息
            Row.create();
            // 顶部信息
            Row.width('100%');
            // 顶部信息
            Row.margin({ bottom: 12 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.alignItems(HorizontalAlign.Start);
            Column.layoutWeight(1);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(program.name);
            Text.fontSize(18);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#333333');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (program.isMustWatch) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        __Common__.create();
                        __Common__.margin({ left: 8 });
                    }, __Common__);
                    {
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            if (isInitialRender) {
                                let componentCall = new IceTag(this, { text: '必看', type: 'danger', tagSize: 'small' }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/ProgramAppreciationPage.ets", line: 300, col: 15 });
                                ViewPU.create(componentCall);
                                let paramsLambda = () => {
                                    return {
                                        text: '必看',
                                        type: 'danger',
                                        tagSize: 'small'
                                    };
                                };
                                componentCall.paramsGenerator_ = paramsLambda;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(elmtId, {
                                    text: '必看', type: 'danger', tagSize: 'small'
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
            Text.create(program.skater);
            Text.fontSize(14);
            Text.fontColor('#666666');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('(' + program.nation + ')');
            Text.fontSize(12);
            Text.fontColor('#999999');
            Text.margin({ left: 4 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('·');
            Text.fontSize(12);
            Text.fontColor('#999999');
            Text.margin({ left: 8, right: 8 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(program.season);
            Text.fontSize(12);
            Text.fontColor('#999999');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(program.type === 'SP' ? '短节目' : '自由滑');
            Text.fontSize(12);
            Text.fontColor('#999999');
            Text.margin({ left: 8 });
        }, Text);
        Text.pop();
        Row.pop();
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.alignItems(HorizontalAlign.End);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(program.score.toFixed(2));
            Text.fontSize(20);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#AB47BC');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('分');
            Text.fontSize(12);
            Text.fontColor('#999999');
        }, Text);
        Text.pop();
        Column.pop();
        // 顶部信息
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 音乐信息
            Row.create();
            // 音乐信息
            Row.width('100%');
            // 音乐信息
            Row.margin({ bottom: 12 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('🎵 ');
            Text.fontSize(14);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(program.music);
            Text.fontSize(14);
            Text.fontColor('#666666');
        }, Text);
        Text.pop();
        // 音乐信息
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 节目简介
            Text.create(program.description);
            // 节目简介
            Text.fontSize(14);
            // 节目简介
            Text.fontColor('#666666');
            // 节目简介
            Text.lineHeight(22);
            // 节目简介
            Text.margin({ bottom: 16 });
        }, Text);
        // 节目简介
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 编排亮点
            Column.create();
            // 编排亮点
            Column.width('100%');
            // 编排亮点
            Column.alignItems(HorizontalAlign.Start);
            // 编排亮点
            Column.padding(12);
            // 编排亮点
            Column.backgroundColor('#F9F9F9');
            // 编排亮点
            Column.borderRadius(8);
            // 编排亮点
            Column.margin({ bottom: 12 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('编排亮点');
            Text.fontSize(14);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#333333');
            Text.margin({ bottom: 8 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = (_item, index: number) => {
                const highlight = _item;
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Row.create();
                    Row.width('100%');
                    Row.margin({ bottom: 4 });
                }, Row);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create((index + 1) + '.');
                    Text.fontSize(13);
                    Text.fontColor('#AB47BC');
                    Text.margin({ right: 8 });
                }, Text);
                Text.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create(highlight);
                    Text.fontSize(13);
                    Text.fontColor('#666666');
                    Text.layoutWeight(1);
                }, Text);
                Text.pop();
                Row.pop();
            };
            this.forEachUpdateFunction(elmtId, program.highlights, forEachItemGenFunction, (highlight: string) => highlight, true, false);
        }, ForEach);
        ForEach.pop();
        // 编排亮点
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 动作难点
            Column.create();
            // 动作难点
            Column.width('100%');
            // 动作难点
            Column.alignItems(HorizontalAlign.Start);
            // 动作难点
            Column.padding(12);
            // 动作难点
            Column.backgroundColor('#FFF3E0');
            // 动作难点
            Column.borderRadius(8);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('动作难点');
            Text.fontSize(14);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#333333');
            Text.margin({ bottom: 8 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = (_item, index: number) => {
                const difficulty = _item;
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Row.create();
                    Row.width('100%');
                    Row.margin({ bottom: 4 });
                }, Row);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create('⚡');
                    Text.fontSize(13);
                    Text.fontColor('#FF9800');
                    Text.margin({ right: 8 });
                }, Text);
                Text.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create(difficulty);
                    Text.fontSize(13);
                    Text.fontColor('#666666');
                    Text.layoutWeight(1);
                }, Text);
                Text.pop();
                Row.pop();
            };
            this.forEachUpdateFunction(elmtId, program.difficulties, forEachItemGenFunction, (difficulty: string) => difficulty, true, false);
        }, ForEach);
        ForEach.pop();
        // 动作难点
        Column.pop();
        Column.pop();
    }
    // 观看建议
    buildWatchingTips(parent = null) {
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new IceCard(this, {
                        title: '💡 如何欣赏花滑节目',
                        cardBackgroundColor: '#F3E5F5',
                        content: () => {
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Column.create();
                                Column.width('100%');
                            }, Column);
                            this.TipItem.bind(this)('👀', '观察跳跃', '注意起跳、空中姿态、落冰的流畅度');
                            this.TipItem.bind(this)('🔄', '欣赏旋转', '关注旋转速度、中心稳定性、姿态变化');
                            this.TipItem.bind(this)('💃', '感受步法', '体会步法的节奏感、方向变化、难度衔接');
                            this.TipItem.bind(this)('🎭', '理解表达', '感受选手对音乐的理解和情感表达');
                            this.TipItem.bind(this)('📊', '学习评分', '了解技术分TES和节目内容分PCS的评分标准');
                            Column.pop();
                        }
                    }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/ProgramAppreciationPage.ets", line: 447, col: 5 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            title: '💡 如何欣赏花滑节目',
                            cardBackgroundColor: '#F3E5F5',
                            content: () => {
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    Column.create();
                                    Column.width('100%');
                                }, Column);
                                this.TipItem.bind(this)('👀', '观察跳跃', '注意起跳、空中姿态、落冰的流畅度');
                                this.TipItem.bind(this)('🔄', '欣赏旋转', '关注旋转速度、中心稳定性、姿态变化');
                                this.TipItem.bind(this)('💃', '感受步法', '体会步法的节奏感、方向变化、难度衔接');
                                this.TipItem.bind(this)('🎭', '理解表达', '感受选手对音乐的理解和情感表达');
                                this.TipItem.bind(this)('📊', '学习评分', '了解技术分TES和节目内容分PCS的评分标准');
                                Column.pop();
                            }
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        title: '💡 如何欣赏花滑节目',
                        cardBackgroundColor: '#F3E5F5'
                    });
                }
            }, { name: "IceCard" });
        }
    }
    TipItem(icon: string, title: string, description: string, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.padding({ top: 8, bottom: 8 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(icon);
            Text.fontSize(20);
            Text.margin({ right: 12 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.alignItems(HorizontalAlign.Start);
            Column.layoutWeight(1);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(title);
            Text.fontSize(14);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#333333');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(description);
            Text.fontSize(12);
            Text.fontColor('#666666');
            Text.margin({ top: 4 });
        }, Text);
        Text.pop();
        Column.pop();
        Row.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "ProgramAppreciationPage";
    }
}
// 数据类型定义
interface ProgramStyle {
    id: string;
    name: string;
    icon: string;
}
interface ClassicProgram {
    id: string;
    name: string;
    skater: string;
    nation: string;
    season: string;
    type: 'SP' | 'FS';
    music: string;
    style: string;
    score: number;
    description: string;
    highlights: string[];
    difficulties: string[];
    isMustWatch: boolean;
}
registerNamedRoute(() => new ProgramAppreciationPage(undefined, {}), "", { bundleName: "com.example.simplecalculator", moduleName: "entry", pagePath: "pages/ProgramAppreciationPage", pageFullPath: "entry/src/main/ets/pages/ProgramAppreciationPage", integratedHsp: "false", moduleType: "followWithHap" });
