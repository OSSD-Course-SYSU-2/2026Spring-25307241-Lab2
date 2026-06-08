/**
 * 冰迹花滑 - 新手问答社区
 * 萌新提问、大神解答、精华帖
 */

import router from '@ohos.router';
import { IceNavBar } from '../common/components/IceNavBar';
import { IceCard } from '../common/components/IceCard';
import { IceTag } from '../common/components/IceTag';

@Entry
@Component
struct CommunityPage {
  @State selectedTab: string = 'hot'; // hot, new, solved,精华
  @State searchText: string = '';
  
  // 精华帖
  private featuredPosts: CommunityPost[] = [
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
  
  // 普通帖子
  private posts: CommunityPost[] = [
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
  
  // 分类标签
  private categories: string[] = ['全部', '动作', '评分', '节目', '规则', '历史', '其他'];
  
  build() {
    Column() {
      // 导航栏
      IceNavBar({
        title: '问答社区',
        showBack: true,
        navBackgroundColor: '#43A047'
      });
      
      // 内容区
      Scroll() {
        Column() {
          // 社区介绍
          this.buildIntroBanner();
          
          // 发帖按钮
          this.buildPostButton();
          
          // 精华帖
          this.buildFeaturedPosts();
          
          // 标签筛选
          this.buildTabFilter();
          
          // 帖子列表
          this.buildPostList();
          
          // 社区规则
          this.buildCommunityRules();
        }
        .width('100%')
        .padding(16)
      }
      .layoutWeight(1)
      .scrollBar(BarState.Auto)
    }
    .width('100%')
    .height('100%')
    .backgroundColor('#F5F5F5')
  }
  
  // 社区介绍
  @Builder
  buildIntroBanner() {
    Column() {
      Text('💬 新手问答社区')
        .fontSize(24)
        .fontWeight(FontWeight.Bold)
        .fontColor('#FFFFFF')
        .margin({ bottom: 8 })
      
      Text('有问题？尽管问！大神们等你来撩')
        .fontSize(14)
        .fontColor('rgba(255,255,255,0.8)')
    }
    .width('100%')
    .height(150)
    .justifyContent(FlexAlign.Center)
    .linearGradient({
      angle: 135,
      colors: [['#43A047', 0.0], ['#2E7D32', 1.0]]
    })
    .borderRadius(16)
    .margin({ bottom: 20 })
  }
  
  // 发帖按钮
  @Builder
  buildPostButton() {
    Row() {
      Button('✍️ 我要提问')
        .fontSize(16)
        .fontWeight(FontWeight.Bold)
        .height(48)
        .backgroundColor('#43A047')
        .fontColor('#FFFFFF')
        .borderRadius(24)
        .layoutWeight(1)
        .onClick(() => {
          // 跳转到发帖页面
        })
    }
    .width('100%')
    .margin({ bottom: 20 })
  }
  
  // 精华帖
  @Builder
  buildFeaturedPosts() {
    Column() {
      Row() {
        Text('⭐ 精华帖')
          .fontSize(18)
          .fontWeight(FontWeight.Bold)
          .fontColor('#333333')
        
        Blank()
        
        Text('查看全部 >')
          .fontSize(14)
          .fontColor('#43A047')
          .onClick(() => {
            this.selectedTab = '精华';
          })
      }
      .width('100%')
      .margin({ bottom: 12 })
      
      ForEach(this.featuredPosts, (post: CommunityPost) => {
        this.PostCard(post, true);
      }, (post: CommunityPost) => post.id)
    }
    .width('100%')
    .alignItems(HorizontalAlign.Start)
    .margin({ bottom: 24 })
  }
  
  // 标签筛选
  @Builder
  buildTabFilter() {
    Column() {
      Row() {
        ForEach(['热门', '最新', '已解决'], (tab: string) => {
          Button(tab)
            .fontSize(14)
            .height(36)
            .backgroundColor(this.selectedTab === tab ? '#43A047' : '#FFFFFF')
            .fontColor(this.selectedTab === tab ? '#FFFFFF' : '#666666')
            .borderRadius(18)
            .margin({ right: 8 })
            .onClick(() => {
              this.selectedTab = tab;
            })
        }, (tab: string) => tab)
      }
      .width('100%')
      .margin({ bottom: 12 })
      
      Scroll() {
        Row() {
          ForEach(this.categories, (category: string) => {
            Button(category)
              .fontSize(12)
              .height(32)
              .backgroundColor('#F5F5F5')
              .fontColor('#666666')
              .borderRadius(16)
              .margin({ right: 8 })
              .onClick(() => {
                // 筛选分类
              })
          }, (category: string) => category)
        }
        .width('100%')
      }
      .scrollable(ScrollDirection.Horizontal)
      .scrollBar(BarState.Off)
    }
    .width('100%')
    .alignItems(HorizontalAlign.Start)
    .margin({ bottom: 16 })
  }
  
  // 帖子列表
  @Builder
  buildPostList() {
    Column() {
      ForEach(this.posts, (post: CommunityPost) => {
        this.PostCard(post, false);
      }, (post: CommunityPost) => post.id)
    }
    .width('100%')
  }
  
  @Builder
  PostCard(post: CommunityPost, isFeatured: boolean) {
    Column() {
      // 顶部信息
      Row() {
        Text(post.title)
          .fontSize(16)
          .fontWeight(FontWeight.Bold)
          .fontColor('#333333')
          .layoutWeight(1)
        
        if (post.isSolved) {
          IceTag({ text: '已解决', type: 'success', tagSize: 'small' })
            .margin({ left: 8 })
        }
      }
      .width('100%')
      .margin({ bottom: 8 })
      
      // 内容预览
      Text(post.content)
        .fontSize(14)
        .fontColor('#666666')
        .lineHeight(22)
        .maxLines(2)
        .textOverflow({ overflow: TextOverflow.Ellipsis })
        .margin({ bottom: 12 })
      
      // 底部信息
      Row() {
        // 作者
        Row() {
          Text(post.isAnonymous ? '👤 匿名' : '👤 ' + post.author)
            .fontSize(12)
            .fontColor('#999999')
        }
        
        Blank()
        
        // 统计
        Row() {
          Text('❤️ ' + post.likes)
            .fontSize(12)
            .fontColor('#999999')
            .margin({ right: 16 })
          
          Text('💬 ' + post.replies)
            .fontSize(12)
            .fontColor('#999999')
        }
      }
      .width('100%')
    }
    .width('100%')
    .padding(16)
    .backgroundColor(isFeatured ? '#E8F5E9' : '#FFFFFF')
    .borderRadius(12)
    .shadow({
      radius: 4,
      color: '#1A000000',
      offsetX: 0,
      offsetY: 2
    })
    .margin({ bottom: 12 })
    .onClick(() => {
      // 跳转到帖子详情
    })
  }
  
  // 社区规则
  @Builder
  buildCommunityRules() {
    IceCard({
      title: '📋 社区规则',
      cardBackgroundColor: '#FFF8E1'
    }) {
      Column() {
        this.RuleItem('🤝', '友善交流', '禁止引战、人身攻击，保持友善讨论氛围');
        this.RuleItem('📚', '专注知识', '只讨论花滑相关知识，禁止无关话题');
        this.RuleItem('❓', '提问技巧', '提问前先搜索，描述清楚问题背景');
        this.RuleItem('✅', '认真回答', '回答要准确、详细，避免误导新手');
        this.RuleItem('🔒', '匿名保护', '尊重匿名用户，禁止追问身份');
      }
      .width('100%')
    }
  }
  
  @Builder
  RuleItem(icon: string, title: string, description: string) {
    Row() {
      Text(icon)
        .fontSize(20)
        .margin({ right: 12 })
      
      Column() {
        Text(title)
          .fontSize(14)
          .fontWeight(FontWeight.Bold)
          .fontColor('#333333')
        
        Text(description)
          .fontSize(12)
          .fontColor('#666666')
          .margin({ top: 4 })
      }
      .alignItems(HorizontalAlign.Start)
      .layoutWeight(1)
    }
    .width('100%')
    .padding({ top: 8, bottom: 8 })
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
