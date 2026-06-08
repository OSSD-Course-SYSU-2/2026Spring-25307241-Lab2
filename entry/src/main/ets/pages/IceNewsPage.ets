/**
 * 冰迹·EdgeFlow - 冰闻页面
 * 每日新闻与科普聚合页
 */

interface BannerItem {
  title: string;
  subtitle: string;
  tag: string;
  color: string;
}

interface NewsItem {
  title: string;
  source: string;
  time: string;
  category: string;
}

interface ScienceCategory {
  id: string;
  name: string;
  icon: string;
}

interface ScienceItem {
  title: string;
  category: string;
  readTime: string;
  id: string;
}

interface DailyKnowledge {
  question: string;
  answer: string;
}

interface TodaySchedule {
  event: string;
  time: string;
  status: string;
}

@Component
export struct IceNewsPage {
  @State selectedTab: string = 'news';
  @State currentBannerIndex: number = 0;
  @State selectedScienceCategory: string = 'all';
  @State collectedItems: string[] = [];
  @State showSearchDialog: boolean = false;
  @State searchText: string = '';
  @State searchResults: NewsItem[] = [];
  @State isSearching: boolean = false;
  
  private bannerTimer: number = -1;
  
  // Banner数据
  private banners: BannerItem[] = [
    { title: '宇野昌磨宣布新赛季曲目', subtitle: '将演绎《图兰朵》', tag: '热点', color: '#667eea' },
    { title: 'ISU发布新评分规则', subtitle: '2024-25赛季生效', tag: '官方', color: '#764ba2' },
    { title: '陈巍宣布退役', subtitle: '结束职业生涯', tag: '快讯', color: '#FF6B6B' }
  ];
  
  // 每日知识
  private dailyKnowledge: DailyKnowledge = {
    question: '为什么阿克塞尔跳是唯一向前起跳的跳跃？',
    answer: '因为阿克塞尔跳从向后滑行起跳，其他跳跃都从向后滑行起跳，所以实际的阿克塞尔跳旋转周数多半周。'
  };
  
  // 今日赛程
  private todaySchedule: TodaySchedule = {
    event: '世界花样滑冰锦标赛',
    time: '今晚 20:00',
    status: '即将开始'
  };
  
  // 新闻列表
  private newsList: NewsItem[] = [
    { title: '2024世锦参赛名单公布', source: 'ISU官网', time: '2小时前', category: '赛事' },
    { title: '羽生结弦转职职业选手后首秀', source: '日刊体育', time: '5小时前', category: '选手' },
    { title: '新规则解析：GOE调整影响分析', source: '滑冰协会', time: '1天前', category: '规则' },
    { title: '金妍儿现身平昌冬奥纪念活动', source: '韩联社', time: '1天前', category: '选手' },
    { title: '中国杯大奖赛门票开售', source: '官方公告', time: '2天前', category: '赛事' }
  ];
  
  // 科普分类
  private scienceCategories: ScienceCategory[] = [
    { id: 'all', name: '全部', icon: '📚' },
    { id: 'tech', name: '技术解剖', icon: '🔬' },
    { id: 'equip', name: '装备保养', icon: '⛸️' },
    { id: 'fitness', name: '陆地体能', icon: '💪' },
    { id: 'recovery', name: '运动康复', icon: '🏥' }
  ];
  
  // 科普列表
  private scienceList: ScienceItem[] = [
    { title: '技术解剖：三周跳的空中姿态', category: 'tech', readTime: '5分钟', id: 's1' },
    { title: '装备保养：冰刀磨刃周期指南', category: 'equip', readTime: '3分钟', id: 's2' },
    { title: '陆地体能：核心力量训练系列', category: 'fitness', readTime: '8分钟', id: 's3' },
    { title: '运动康复：常见损伤预防', category: 'recovery', readTime: '6分钟', id: 's4' },
    { title: '技术解剖：旋转速度提升技巧', category: 'tech', readTime: '4分钟', id: 's5' },
    { title: '装备保养：冰鞋热塑技术详解', category: 'equip', readTime: '5分钟', id: 's6' }
  ];
  
  aboutToAppear() {
    this.bannerTimer = setInterval(() => {
      this.currentBannerIndex = (this.currentBannerIndex + 1) % this.banners.length;
    }, 3000);
  }
  
  aboutToDisappear() {
    if (this.bannerTimer !== -1) {
      clearInterval(this.bannerTimer);
    }
  }
  
  build() {
    Stack() {
      Column() {
        // 顶部标题和搜索
        Row() {
          Text('冰闻')
            .fontSize(24)
            .fontWeight(FontWeight.Bold)
            .fontColor('#FFFFFF')
          
          Blank()
          
          // 搜索按钮
          Row() {
            Text('🔍')
              .fontSize(18)
            Text('搜索')
              .fontSize(14)
              .fontColor('rgba(255, 255, 255, 0.9)')
              .margin({ left: 5 })
          }
          .backgroundColor('rgba(255, 255, 255, 0.2)')
          .borderRadius(15)
          .padding({ left: 12, right: 12, top: 6, bottom: 6 })
          .onClick(() => {
            this.showSearchDialog = true;
          })
        }
        .width('100%')
        .padding({ left: 20, right: 20, top: 20, bottom: 15 })
        
        Scroll() {
          Column() {
            // Banner轮播
            this.buildBanner()
            
            // 双卡槽
            this.buildCards()
            
            // Tab切换
            this.buildTabs()
            
            // 内容列表
            if (this.selectedTab === 'news') {
              this.buildNewsList()
            } else {
              this.buildScienceList()
            }
          }
          .width('100%')
        }
        .width('100%')
        .layoutWeight(1)
        .scrollBar(BarState.Off)
      }
      .width('100%')
      .height('100%')
      
      // 搜索对话框
      if (this.showSearchDialog) {
        this.buildSearchDialog()
      }
    }
    .width('100%')
    .height('100%')
    .linearGradient({
      angle: 135,
      colors: [['#667eea', 0.0], ['#764ba2', 0.5], ['#3A7BD5', 1.0]]
    })
  }
  
  @Builder
  buildBanner() {
    Stack() {
      Column() {
        Text(this.banners[this.currentBannerIndex].title)
          .fontSize(18)
          .fontWeight(FontWeight.Bold)
          .fontColor('#FFFFFF')
          .maxLines(2)
          .textOverflow({ overflow: TextOverflow.Ellipsis })
        
        Text(this.banners[this.currentBannerIndex].subtitle)
          .fontSize(14)
          .fontColor('rgba(255, 255, 255, 0.8)')
          .margin({ top: 8 })
      }
      .width('100%')
      .height(150)
      .padding(20)
      .linearGradient({
        angle: 90,
        colors: [[this.banners[this.currentBannerIndex].color, 0.0], ['#3A7BD5', 1.0]]
      })
      .borderRadius(15)
      .alignItems(HorizontalAlign.Start)
      .justifyContent(FlexAlign.End)
      
      Text(this.banners[this.currentBannerIndex].tag)
        .fontSize(12)
        .fontColor('#FFFFFF')
        .backgroundColor('#FF6B6B')
        .borderRadius(10)
        .padding({ left: 10, right: 10, top: 5, bottom: 5 })
        .position({ x: 20, y: 20 })
      
      Row() {
        ForEach([0, 1, 2], (index: number) => {
          Circle()
            .width(this.currentBannerIndex === index ? 20 : 8)
            .height(8)
            .fill(this.currentBannerIndex === index ? '#FFFFFF' : 'rgba(255, 255, 255, 0.5)')
            .margin({ right: 5 })
        })
      }
      .position({ x: '50%', y: 140 })
    }
    .width('100%')
    .height(160)
    .padding({ left: 20, right: 20 })
  }
  
  @Builder
  buildCards() {
    Row() {
      Column() {
        Text('📅')
          .fontSize(24)
        Text('今日赛程')
          .fontSize(14)
          .fontWeight(FontWeight.Bold)
          .fontColor('#333333')
          .margin({ top: 8 })
        Text(this.todaySchedule.event)
          .fontSize(11)
          .fontColor('#666666')
          .maxLines(1)
          .textOverflow({ overflow: TextOverflow.Ellipsis })
          .margin({ top: 5 })
        Text(this.todaySchedule.time)
          .fontSize(12)
          .fontColor('#FF6B6B')
          .fontWeight(FontWeight.Bold)
          .margin({ top: 3 })
      }
      .width('45%')
      .height(110)
      .backgroundColor('#FFFFFF')
      .borderRadius(15)
      .justifyContent(FlexAlign.Center)
      .padding(10)
      
      Blank()
      
      Column() {
        Text('❄️')
          .fontSize(24)
        Text('今日冷知识')
          .fontSize(14)
          .fontWeight(FontWeight.Bold)
          .fontColor('#333333')
          .margin({ top: 8 })
        Text(this.dailyKnowledge.question)
          .fontSize(10)
          .fontColor('#666666')
          .maxLines(2)
          .textOverflow({ overflow: TextOverflow.Ellipsis })
          .margin({ top: 5 })
        Row() {
          Blank()
          Text('收藏')
            .fontSize(11)
            .fontColor('#3A7BD5')
        }
        .width('100%')
      }
      .width('45%')
      .height(110)
      .backgroundColor('#FFFFFF')
      .borderRadius(15)
      .justifyContent(FlexAlign.Center)
      .padding(10)
    }
    .width('100%')
    .padding({ left: 20, right: 20, top: 15, bottom: 15 })
  }
  
  @Builder
  buildTabs() {
    Row() {
      Text('资讯')
        .fontSize(16)
        .fontWeight(this.selectedTab === 'news' ? FontWeight.Bold : FontWeight.Normal)
        .fontColor(this.selectedTab === 'news' ? '#FFFFFF' : 'rgba(255, 255, 255, 0.7)')
        .padding({ left: 20, right: 20, top: 10, bottom: 10 })
        .backgroundColor(this.selectedTab === 'news' ? 'rgba(255, 255, 255, 0.3)' : 'transparent')
        .borderRadius(20)
        .onClick(() => {
          this.selectedTab = 'news';
        })
      
      Text('科普')
        .fontSize(16)
        .fontWeight(this.selectedTab === 'science' ? FontWeight.Bold : FontWeight.Normal)
        .fontColor(this.selectedTab === 'science' ? '#FFFFFF' : 'rgba(255, 255, 255, 0.7)')
        .padding({ left: 20, right: 20, top: 10, bottom: 10 })
        .backgroundColor(this.selectedTab === 'science' ? 'rgba(255, 255, 255, 0.3)' : 'transparent')
        .borderRadius(20)
        .margin({ left: 15 })
        .onClick(() => {
          this.selectedTab = 'science';
        })
    }
    .width('100%')
    .padding({ left: 20, right: 20, bottom: 15 })
  }
  
  @Builder
  buildNewsList() {
    Column() {
      ForEach(this.newsList, (news: NewsItem) => {
        Row() {
          Column() {
            Text(news.title)
              .fontSize(15)
              .fontWeight(FontWeight.Bold)
              .fontColor('#333333')
              .maxLines(2)
              .textOverflow({ overflow: TextOverflow.Ellipsis })
            Row() {
              Text(news.source)
                .fontSize(12)
                .fontColor('#999999')
              Text('·')
                .fontSize(12)
                .fontColor('#999999')
                .margin({ left: 5, right: 5 })
              Text(news.time)
                .fontSize(12)
                .fontColor('#999999')
            }
            .margin({ top: 8 })
          }
          .alignItems(HorizontalAlign.Start)
          .layoutWeight(1)
          Text(news.category)
            .fontSize(12)
            .fontColor('#FFFFFF')
            .backgroundColor(this.getCategoryColor(news.category))
            .borderRadius(10)
            .padding({ left: 8, right: 8, top: 4, bottom: 4 })
        }
        .width('100%')
        .padding(15)
        .backgroundColor('#FFFFFF')
        .borderRadius(12)
        .margin({ bottom: 10 })
      })
    }
    .width('100%')
    .padding({ left: 20, right: 20 })
  }
  
  @Builder
  buildScienceList() {
    Column() {
      Scroll() {
        Row() {
          ForEach(this.scienceCategories, (cat: ScienceCategory) => {
            Row() {
              Text(cat.icon)
                .fontSize(14)
              Text(cat.name)
                .fontSize(13)
                .fontColor(this.selectedScienceCategory === cat.id ? '#FFFFFF' : 'rgba(255, 255, 255, 0.8)')
                .margin({ left: 4 })
            }
            .backgroundColor(this.selectedScienceCategory === cat.id ? 'rgba(255, 255, 255, 0.3)' : 'rgba(255, 255, 255, 0.1)')
            .borderRadius(15)
            .padding({ left: 12, right: 12, top: 8, bottom: 8 })
            .margin({ right: 10 })
            .onClick(() => {
              this.selectedScienceCategory = cat.id;
            })
          })
        }
      }
      .scrollable(ScrollDirection.Horizontal)
      .scrollBar(BarState.Off)
      .width('100%')
      .padding({ bottom: 15 })
      
      ForEach(this.scienceList, (item: ScienceItem) => {
        if (this.selectedScienceCategory === 'all' || this.selectedScienceCategory === item.category) {
          Row() {
            Column() {
              Row() {
                Text(this.getScienceIcon(item.category))
                  .fontSize(20)
                Text(this.getScienceCategoryName(item.category))
                  .fontSize(12)
                  .fontColor('#999999')
                  .margin({ left: 5 })
              }
              Text(item.title)
                .fontSize(15)
                .fontWeight(FontWeight.Bold)
                .fontColor('#333333')
                .margin({ top: 8 })
                .maxLines(2)
                .textOverflow({ overflow: TextOverflow.Ellipsis })
            }
            .alignItems(HorizontalAlign.Start)
            .layoutWeight(1)
            Column() {
              Text(item.readTime)
                .fontSize(12)
                .fontColor('#999999')
              Text(this.collectedItems.includes(item.id) ? '❤️' : '🤍')
                .fontSize(20)
                .margin({ top: 10 })
                .onClick(() => {
                  if (this.collectedItems.includes(item.id)) {
                    this.collectedItems = this.collectedItems.filter((id: string) => id !== item.id);
                  } else {
                    this.collectedItems.push(item.id);
                  }
                })
            }
            .width(60)
          }
          .width('100%')
          .padding(15)
          .backgroundColor('#FFFFFF')
          .borderRadius(12)
          .margin({ bottom: 10 })
        }
      })
    }
    .width('100%')
    .padding({ left: 20, right: 20 })
  }
  
  private getCategoryColor(category: string): string {
    if (category === '赛事') return '#4FC3F7';
    if (category === '选手') return '#FF6B6B';
    if (category === '规则') return '#66BB6A';
    return '#999999';
  }
  
  private getScienceIcon(category: string): string {
    if (category === 'tech') return '🔬';
    if (category === 'equip') return '⛸️';
    if (category === 'fitness') return '💪';
    if (category === 'recovery') return '🏥';
    return '📚';
  }
  
  private getScienceCategoryName(category: string): string {
    if (category === 'tech') return '技术解剖';
    if (category === 'equip') return '装备保养';
    if (category === 'fitness') return '陆地体能';
    if (category === 'recovery') return '运动康复';
    return '其他';
  }
  
  // 搜索对话框
  @Builder
  buildSearchDialog() {
    Column() {
      // 遮罩层
      Column() {
        // 对话框内容
        Column() {
          // 标题栏
          Row() {
            Text('搜索资讯')
              .fontSize(18)
              .fontWeight(FontWeight.Bold)
              .fontColor('#333333')
            
            Blank()
            
            Text('✕')
              .fontSize(20)
              .fontColor('#999999')
              .onClick(() => {
                this.showSearchDialog = false;
                this.searchText = '';
                this.searchResults = [];
              })
          }
          .width('100%')
          .padding({ bottom: 15 })
          
          // 搜索输入框
          Row() {
            TextInput({ placeholder: '输入关键词搜索...', text: this.searchText })
              .fontSize(15)
              .fontColor('#333333')
              .placeholderColor('#999999')
              .backgroundColor('#F5F5F5')
              .borderRadius(10)
              .layoutWeight(1)
              .height(40)
              .onChange((value: string) => {
                this.searchText = value;
              })
              .onSubmit(() => {
                this.performSearch();
              })
            
            Text('搜索')
              .fontSize(15)
              .fontColor('#FFFFFF')
              .backgroundColor('#667eea')
              .borderRadius(10)
              .padding({ left: 15, right: 15, top: 8, bottom: 8 })
              .margin({ left: 10 })
              .onClick(() => {
                this.performSearch();
              })
          }
          .width('100%')
          .margin({ bottom: 15 })
          
          // 热门搜索
          if (this.searchText === '' && this.searchResults.length === 0) {
            Column() {
              Text('热门搜索')
                .fontSize(14)
                .fontColor('#666666')
                .width('100%')
                .margin({ bottom: 10 })
              
              Flex({ wrap: FlexWrap.Wrap }) {
                ForEach(['世锦赛', '羽生结弦', '陈巍', '新规则', 'GOE', '阿克塞尔'], (keyword: string) => {
                  Text(keyword)
                    .fontSize(13)
                    .fontColor('#667eea')
                    .backgroundColor('rgba(102, 126, 234, 0.1)')
                    .borderRadius(15)
                    .padding({ left: 12, right: 12, top: 6, bottom: 6 })
                    .margin({ right: 8, bottom: 8 })
                    .onClick(() => {
                      this.searchText = keyword;
                      this.performSearch();
                    })
                })
              }
              .width('100%')
            }
            .width('100%')
            .margin({ bottom: 20 })
          }
          
          // 搜索结果
          if (this.searchResults.length > 0) {
            Column() {
              Text(`找到 ${this.searchResults.length} 条结果`)
                .fontSize(14)
                .fontColor('#666666')
                .width('100%')
                .margin({ bottom: 10 })
              
              Scroll() {
                Column() {
                  ForEach(this.searchResults, (news: NewsItem) => {
                    Row() {
                      Column() {
                        Text(news.title)
                          .fontSize(15)
                          .fontWeight(FontWeight.Bold)
                          .fontColor('#333333')
                          .maxLines(2)
                          .textOverflow({ overflow: TextOverflow.Ellipsis })
                        Row() {
                          Text(news.source)
                            .fontSize(12)
                            .fontColor('#999999')
                          Text('·')
                            .fontSize(12)
                            .fontColor('#999999')
                            .margin({ left: 5, right: 5 })
                          Text(news.time)
                            .fontSize(12)
                            .fontColor('#999999')
                        }
                        .margin({ top: 8 })
                      }
                      .alignItems(HorizontalAlign.Start)
                      .layoutWeight(1)
                      Text(news.category)
                        .fontSize(12)
                        .fontColor('#FFFFFF')
                        .backgroundColor(this.getCategoryColor(news.category))
                        .borderRadius(10)
                        .padding({ left: 8, right: 8, top: 4, bottom: 4 })
                    }
                    .width('100%')
                    .padding(15)
                    .backgroundColor('#F8F8F8')
                    .borderRadius(12)
                    .margin({ bottom: 10 })
                  })
                }
                .width('100%')
              }
              .width('100%')
              .height(300)
              .scrollBar(BarState.Auto)
            }
            .width('100%')
          }
          
          // 搜索中提示
          if (this.isSearching) {
            Column() {
              LoadingProgress()
                .width(40)
                .height(40)
                .color('#667eea')
              Text('搜索中...')
                .fontSize(14)
                .fontColor('#999999')
                .margin({ top: 10 })
            }
            .width('100%')
            .height(200)
            .justifyContent(FlexAlign.Center)
          }
          
          // 无结果提示
          if (this.searchText !== '' && this.searchResults.length === 0 && !this.isSearching) {
            Column() {
              Text('🔍')
                .fontSize(40)
              Text('未找到相关内容')
                .fontSize(14)
                .fontColor('#999999')
                .margin({ top: 10 })
              Text('换个关键词试试')
                .fontSize(12)
                .fontColor('#CCCCCC')
                .margin({ top: 5 })
            }
            .width('100%')
            .height(200)
            .justifyContent(FlexAlign.Center)
          }
        }
        .width('90%')
        .backgroundColor('#FFFFFF')
        .borderRadius(20)
        .padding(20)
      }
      .width('100%')
      .height('100%')
      .justifyContent(FlexAlign.Center)
      .backgroundColor('rgba(0, 0, 0, 0.5)')
      .onClick(() => {
        this.showSearchDialog = false;
        this.searchText = '';
        this.searchResults = [];
      })
    }
    .width('100%')
    .height('100%')
    .position({ x: 0, y: 0 })
  }
  
  // 执行搜索
  private performSearch() {
    if (this.searchText.trim() === '') {
      return;
    }
    
    this.isSearching = true;
    this.searchResults = [];
    
    // 模拟搜索延迟
    setTimeout(() => {
      // 在新闻列表中搜索
      const results = this.newsList.filter((news: NewsItem) => {
        return news.title.includes(this.searchText) ||
               news.source.includes(this.searchText) ||
               news.category.includes(this.searchText);
      });
      
      // 如果本地没有结果，模拟联网搜索结果
      if (results.length === 0) {
        // 模拟网络搜索结果
        this.searchResults = [
          {
            title: `关于"${this.searchText}"的最新资讯`,
            source: '网络搜索',
            time: '刚刚',
            category: '热点'
          },
          {
            title: `${this.searchText}相关技术解析`,
            source: '专业分析',
            time: '1小时前',
            category: '技术'
          },
          {
            title: `${this.searchText}选手动态`,
            source: '官方公告',
            time: '2小时前',
            category: '选手'
          }
        ];
      } else {
        this.searchResults = results;
      }
      
      this.isSearching = false;
    }, 500);
  }
}
