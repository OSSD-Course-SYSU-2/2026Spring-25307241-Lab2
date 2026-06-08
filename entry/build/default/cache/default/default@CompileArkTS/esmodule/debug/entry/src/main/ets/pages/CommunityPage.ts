if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface CommunityPage_Params {
    selectedTab?: string;
    searchText?: string;
    featuredPosts?: CommunityPost[];
    posts?: CommunityPost[];
    categories?: string[];
}
import { IceNavBar } from "@bundle:com.example.simplecalculator/entry/ets/common/components/IceNavBar";
import { IceCard } from "@bundle:com.example.simplecalculator/entry/ets/common/components/IceCard";
import { IceTag } from "@bundle:com.example.simplecalculator/entry/ets/common/components/IceTag";
class CommunityPage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__selectedTab = new ObservedPropertySimplePU('hot', this, "selectedTab");
        this.__searchText = new ObservedPropertySimplePU('', this, "searchText");
        this.featuredPosts = [
            {
                id: 'post_001',
                title: '入门百问：花滑新手常见问题汇总',
                author: '管理员',
                isAnonymous: false,
                category: '精华',
                content: '汇总新手最常问的100个问题，涵盖基础知识、观赛指南、评分规则等',
                likes: 1256,
                replies: 89,
                isSolved: true,
                isFeatured: true,
                createTime: '2024-01-01'
            },
            {
                id: 'post_002',
                title: '常见误区辟谣：摔倒一定会扣分吗？',
                author: '匿名用户',
                isAnonymous: true,
                category: '科普',
                content: '详细解释摔倒的扣分规则，以及不同情况下的分数影响',
                likes: 856,
                replies: 45,
                isSolved: true,
                isFeatured: true,
                createTime: '2024-01-15'
            },
            {
                id: 'post_003',
                title: '冰舞和双人滑到底有什么区别？',
                author: '花滑达人',
                isAnonymous: false,
                category: '科普',
                content: '从规则、动作、评分等多个维度对比冰舞和双人滑的差异',
                likes: 723,
                replies: 38,
                isSolved: true,
                isFeatured: true,
                createTime: '2024-02-01'
            }
        ];
        this.posts = [
            {
                id: 'post_004',
                title: '请问三周跳和三周半跳有什么区别？',
                author: '匿名用户',
                isAnonymous: true,
                category: '动作',
                content: '刚入门花滑，看到选手做跳跃动作，想知道三周跳和三周半跳的区别',
                likes: 45,
                replies: 12,
                isSolved: true,
                isFeatured: false,
                createTime: '2024-03-10'
            },
            {
                id: 'post_005',
                title: '如何看懂技术分TES和节目内容分PCS？',
                author: '新手小明',
                isAnonymous: false,
                category: '评分',
                content: '看比赛时经常听到技术分和节目内容分，但不太理解它们的含义和评分标准',
                likes: 89,
                replies: 23,
                isSolved: true,
                isFeatured: false,
                createTime: '2024-03-12'
            },
            {
                id: 'post_006',
                title: '为什么有些选手的分数看起来很高，但排名却不高？',
                author: '匿名用户',
                isAnonymous: true,
                category: '评分',
                content: '看世锦赛发现有些选手分数很高，但最终排名不高，这是为什么？',
                likes: 67,
                replies: 18,
                isSolved: false,
                isFeatured: false,
                createTime: '2024-03-14'
            },
            {
                id: 'post_007',
                title: '推荐几个适合新手的经典节目',
                author: '花滑爱好者',
                isAnonymous: false,
                category: '节目',
                content: '刚开始看花滑，想找一些容易看懂、适合入门的经典节目',
                likes: 156,
                replies: 42,
                isSolved: true,
                isFeatured: false,
                createTime: '2024-03-15'
            },
            {
                id: 'post_008',
                title: 'GOE加分是什么意思？如何判断一个动作做得好不好？',
                author: '匿名用户',
                isAnonymous: true,
                category: '评分',
                content: '经常听到解说员说GOE加分，但不知道具体是什么意思',
                likes: 78,
                replies: 21,
                isSolved: true,
                isFeatured: false,
                createTime: '2024-03-16'
            }
        ];
        this.categories = ['全部', '动作', '评分', '节目', '规则', '历史', '其他'];
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: CommunityPage_Params) {
        if (params.selectedTab !== undefined) {
            this.selectedTab = params.selectedTab;
        }
        if (params.searchText !== undefined) {
            this.searchText = params.searchText;
        }
        if (params.featuredPosts !== undefined) {
            this.featuredPosts = params.featuredPosts;
        }
        if (params.posts !== undefined) {
            this.posts = params.posts;
        }
        if (params.categories !== undefined) {
            this.categories = params.categories;
        }
    }
    updateStateVars(params: CommunityPage_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__selectedTab.purgeDependencyOnElmtId(rmElmtId);
        this.__searchText.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__selectedTab.aboutToBeDeleted();
        this.__searchText.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __selectedTab: ObservedPropertySimplePU<string>; // hot, new, solved,精华
    get selectedTab() {
        return this.__selectedTab.get();
    }
    set selectedTab(newValue: string) {
        this.__selectedTab.set(newValue);
    }
    private __searchText: ObservedPropertySimplePU<string>;
    get searchText() {
        return this.__searchText.get();
    }
    set searchText(newValue: string) {
        this.__searchText.set(newValue);
    }
    // 精华帖
    private featuredPosts: CommunityPost[];
    // 普通帖子
    private posts: CommunityPost[];
    // 分类标签
    private categories: string[];
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
                        title: '问答社区',
                        showBack: true,
                        navBackgroundColor: '#43A047'
                    }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/CommunityPage.ets", line: 135, col: 7 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            title: '问答社区',
                            showBack: true,
                            navBackgroundColor: '#43A047'
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        title: '问答社区',
                        showBack: true,
                        navBackgroundColor: '#43A047'
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
        // 社区介绍
        this.buildIntroBanner.bind(this)();
        // 发帖按钮
        this.buildPostButton.bind(this)();
        // 精华帖
        this.buildFeaturedPosts.bind(this)();
        // 标签筛选
        this.buildTabFilter.bind(this)();
        // 帖子列表
        this.buildPostList.bind(this)();
        // 社区规则
        this.buildCommunityRules.bind(this)();
        Column.pop();
        // 内容区
        Scroll.pop();
        Column.pop();
    }
    // 社区介绍
    buildIntroBanner(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.height(150);
            Column.justifyContent(FlexAlign.Center);
            Column.linearGradient({
                angle: 135,
                colors: [['#43A047', 0.0], ['#2E7D32', 1.0]]
            });
            Column.borderRadius(16);
            Column.margin({ bottom: 20 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('💬 新手问答社区');
            Text.fontSize(24);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#FFFFFF');
            Text.margin({ bottom: 8 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('有问题？尽管问！大神们等你来撩');
            Text.fontSize(14);
            Text.fontColor('rgba(255,255,255,0.8)');
        }, Text);
        Text.pop();
        Column.pop();
    }
    // 发帖按钮
    buildPostButton(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.margin({ bottom: 20 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('✍️ 我要提问');
            Button.fontSize(16);
            Button.fontWeight(FontWeight.Bold);
            Button.height(48);
            Button.backgroundColor('#43A047');
            Button.fontColor('#FFFFFF');
            Button.borderRadius(24);
            Button.layoutWeight(1);
            Button.onClick(() => {
                // 跳转到发帖页面
            });
        }, Button);
        Button.pop();
        Row.pop();
    }
    // 精华帖
    buildFeaturedPosts(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.alignItems(HorizontalAlign.Start);
            Column.margin({ bottom: 24 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.margin({ bottom: 12 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('⭐ 精华帖');
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
            Text.create('查看全部 >');
            Text.fontSize(14);
            Text.fontColor('#43A047');
            Text.onClick(() => {
                this.selectedTab = '精华';
            });
        }, Text);
        Text.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const post = _item;
                this.PostCard.bind(this)(post, true);
            };
            this.forEachUpdateFunction(elmtId, this.featuredPosts, forEachItemGenFunction, (post: CommunityPost) => post.id, false, false);
        }, ForEach);
        ForEach.pop();
        Column.pop();
    }
    // 标签筛选
    buildTabFilter(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.alignItems(HorizontalAlign.Start);
            Column.margin({ bottom: 16 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.margin({ bottom: 12 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const tab = _item;
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Button.createWithLabel(tab);
                    Button.fontSize(14);
                    Button.height(36);
                    Button.backgroundColor(this.selectedTab === tab ? '#43A047' : '#FFFFFF');
                    Button.fontColor(this.selectedTab === tab ? '#FFFFFF' : '#666666');
                    Button.borderRadius(18);
                    Button.margin({ right: 8 });
                    Button.onClick(() => {
                        this.selectedTab = tab;
                    });
                }, Button);
                Button.pop();
            };
            this.forEachUpdateFunction(elmtId, ['热门', '最新', '已解决'], forEachItemGenFunction, (tab: string) => tab, false, false);
        }, ForEach);
        ForEach.pop();
        Row.pop();
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
                const category = _item;
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Button.createWithLabel(category);
                    Button.fontSize(12);
                    Button.height(32);
                    Button.backgroundColor('#F5F5F5');
                    Button.fontColor('#666666');
                    Button.borderRadius(16);
                    Button.margin({ right: 8 });
                    Button.onClick(() => {
                        // 筛选分类
                    });
                }, Button);
                Button.pop();
            };
            this.forEachUpdateFunction(elmtId, this.categories, forEachItemGenFunction, (category: string) => category, false, false);
        }, ForEach);
        ForEach.pop();
        Row.pop();
        Scroll.pop();
        Column.pop();
    }
    // 帖子列表
    buildPostList(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const post = _item;
                this.PostCard.bind(this)(post, false);
            };
            this.forEachUpdateFunction(elmtId, this.posts, forEachItemGenFunction, (post: CommunityPost) => post.id, false, false);
        }, ForEach);
        ForEach.pop();
        Column.pop();
    }
    PostCard(post: CommunityPost, isFeatured: boolean, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.padding(16);
            Column.backgroundColor(isFeatured ? '#E8F5E9' : '#FFFFFF');
            Column.borderRadius(12);
            Column.shadow({
                radius: 4,
                color: '#1A000000',
                offsetX: 0,
                offsetY: 2
            });
            Column.margin({ bottom: 12 });
            Column.onClick(() => {
                // 跳转到帖子详情
            });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 顶部信息
            Row.create();
            // 顶部信息
            Row.width('100%');
            // 顶部信息
            Row.margin({ bottom: 8 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(post.title);
            Text.fontSize(16);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#333333');
            Text.layoutWeight(1);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (post.isSolved) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        __Common__.create();
                        __Common__.margin({ left: 8 });
                    }, __Common__);
                    {
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            if (isInitialRender) {
                                let componentCall = new IceTag(this, { text: '已解决', type: 'success', tagSize: 'small' }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/CommunityPage.ets", line: 318, col: 11 });
                                ViewPU.create(componentCall);
                                let paramsLambda = () => {
                                    return {
                                        text: '已解决',
                                        type: 'success',
                                        tagSize: 'small'
                                    };
                                };
                                componentCall.paramsGenerator_ = paramsLambda;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(elmtId, {
                                    text: '已解决', type: 'success', tagSize: 'small'
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
        // 顶部信息
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 内容预览
            Text.create(post.content);
            // 内容预览
            Text.fontSize(14);
            // 内容预览
            Text.fontColor('#666666');
            // 内容预览
            Text.lineHeight(22);
            // 内容预览
            Text.maxLines(2);
            // 内容预览
            Text.textOverflow({ overflow: TextOverflow.Ellipsis });
            // 内容预览
            Text.margin({ bottom: 12 });
        }, Text);
        // 内容预览
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 底部信息
            Row.create();
            // 底部信息
            Row.width('100%');
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 作者
            Row.create();
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(post.isAnonymous ? '👤 匿名' : '👤 ' + post.author);
            Text.fontSize(12);
            Text.fontColor('#999999');
        }, Text);
        Text.pop();
        // 作者
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 统计
            Row.create();
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('❤️ ' + post.likes);
            Text.fontSize(12);
            Text.fontColor('#999999');
            Text.margin({ right: 16 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('💬 ' + post.replies);
            Text.fontSize(12);
            Text.fontColor('#999999');
        }, Text);
        Text.pop();
        // 统计
        Row.pop();
        // 底部信息
        Row.pop();
        Column.pop();
    }
    // 社区规则
    buildCommunityRules(parent = null) {
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new IceCard(this, {
                        title: '📋 社区规则',
                        cardBackgroundColor: '#FFF8E1',
                        content: () => {
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Column.create();
                                Column.width('100%');
                            }, Column);
                            this.RuleItem.bind(this)('🤝', '友善交流', '禁止引战、人身攻击，保持友善讨论氛围');
                            this.RuleItem.bind(this)('📚', '专注知识', '只讨论花滑相关知识，禁止无关话题');
                            this.RuleItem.bind(this)('❓', '提问技巧', '提问前先搜索，描述清楚问题背景');
                            this.RuleItem.bind(this)('✅', '认真回答', '回答要准确、详细，避免误导新手');
                            this.RuleItem.bind(this)('🔒', '匿名保护', '尊重匿名用户，禁止追问身份');
                            Column.pop();
                        }
                    }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/CommunityPage.ets", line: 378, col: 5 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            title: '📋 社区规则',
                            cardBackgroundColor: '#FFF8E1',
                            content: () => {
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    Column.create();
                                    Column.width('100%');
                                }, Column);
                                this.RuleItem.bind(this)('🤝', '友善交流', '禁止引战、人身攻击，保持友善讨论氛围');
                                this.RuleItem.bind(this)('📚', '专注知识', '只讨论花滑相关知识，禁止无关话题');
                                this.RuleItem.bind(this)('❓', '提问技巧', '提问前先搜索，描述清楚问题背景');
                                this.RuleItem.bind(this)('✅', '认真回答', '回答要准确、详细，避免误导新手');
                                this.RuleItem.bind(this)('🔒', '匿名保护', '尊重匿名用户，禁止追问身份');
                                Column.pop();
                            }
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        title: '📋 社区规则',
                        cardBackgroundColor: '#FFF8E1'
                    });
                }
            }, { name: "IceCard" });
        }
    }
    RuleItem(icon: string, title: string, description: string, parent = null) {
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
        return "CommunityPage";
    }
}
// 数据类型定义
interface CommunityPost {
    id: string;
    title: string;
    author: string;
    isAnonymous: boolean;
    category: string;
    content: string;
    likes: number;
    replies: number;
    isSolved: boolean;
    isFeatured: boolean;
    createTime: string;
}
registerNamedRoute(() => new CommunityPage(undefined, {}), "", { bundleName: "com.example.simplecalculator", moduleName: "entry", pagePath: "pages/CommunityPage", pageFullPath: "entry/src/main/ets/pages/CommunityPage", integratedHsp: "false", moduleType: "followWithHap" });
