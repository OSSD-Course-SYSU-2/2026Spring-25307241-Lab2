/**
 * 冰迹花滑 - 赛事中心
 * 展示赛事列表、筛选、详情
 */

import router from '@ohos.router';
import { IceNavBar } from '../common/components/IceNavBar';
import { IceCard } from '../common/components/IceCard';
import { IceTag } from '../common/components/IceTag';
import { IceFilterBar, FilterItem } from '../common/components/IceFilterBar';
import { IceEmpty } from '../common/components/IceEmpty';
import { SAMPLE_COMPETITIONS } from '../viewmodel/SampleData';
import { COMPETITION_TYPE_NAMES, COMPETITION_STATUS_NAMES, CompetitionType } from '../viewmodel/IceTraceModel';

@Entry
@Component
struct CompetitionCenterPage {
  @State searchText: string = '';
  @State activeFilters: string[] = [];
  @State selectedSeason: string = '2023-24';
  @State competitions: Competition[] = [];
  
  // 筛选项
  private filterItems: FilterItem[] = [
    { id: 'WORLD', label: '世锦赛' },
    { id: 'OLYMPICS', label: '冬奥会' },
    { id: 'GP_SERIES', label: '大奖赛' },
    { id: 'EUROPEAN', label: '欧锦赛' },
    { id: 'FOUR_CONTINENTS', label: '四大洲' }
  ];
  
  // 赛季列表
  private seasons: string[] = [
    '2023-24', '2022-23', '2021-22', '2020-21', '2019-20'
  ];
  
  aboutToAppear() {
    // 加载赛事数据
    this.loadCompetitions();
  }
  
  loadCompetitions() {
    // 这里应该从数据源加载，现在使用示例数据
    this.competitions = SAMPLE_COMPETITIONS;
  }
  
  build() {
    Column() {
      // 导航栏
      IceNavBar({
        title: '赛事中心',
        showBack: true,
        navBackgroundColor: '#4FC3F7'
      });
      
      // 内容区
      Column() {
        // 搜索栏
        this.buildSearchBar();
        
        // 赛季选择
        this.buildSeasonSelector();
        
        // 筛选栏
        IceFilterBar({
          filters: this.filterItems,
          activeFilters: $activeFilters
        });
        
        // 赛事列表
        this.buildCompetitionList();
      }
      .layoutWeight(1)
    }
    .width('100%')
    .height('100%')
    .backgroundColor('#F5F5F5')
  }
  
  @Builder
  buildSearchBar() {
    Row() {
      TextInput({ placeholder: '搜索赛事...', text: this.searchText })
        .layoutWeight(1)
        .height(40)
        .backgroundColor('#FFFFFF')
        .borderRadius(20)
        .padding({ left: 16, right: 16 })
        .onChange((value: string) => {
          this.searchText = value;
        })
    }
    .width('100%')
    .padding({ left: 16, right: 16, top: 12, bottom: 12 })
  }
  
  @Builder
  buildSeasonSelector() {
    Scroll() {
      Row() {
        ForEach(this.seasons, (season: string) => {
          Button(season)
            .fontSize(14)
            .height(32)
            .padding({ left: 16, right: 16 })
            .backgroundColor(this.selectedSeason === season ? '#4FC3F7' : '#FFFFFF')
            .fontColor(this.selectedSeason === season ? '#FFFFFF' : '#666666')
            .borderRadius(16)
            .margin({ right: 8 })
            .onClick(() => {
              this.selectedSeason = season;
              this.loadCompetitions();
            })
        }, (season: string) => season)
      }
      .padding({ left: 16, right: 16 })
    }
    .width('100%')
    .height(48)
    .scrollable(ScrollDirection.Horizontal)
    .scrollBar(BarState.Off)
  }
  
  @Builder
  buildCompetitionList() {
    if (this.competitions.length === 0) {
      IceEmpty({
        icon: '🏆',
        title: '暂无赛事数据',
        description: '当前筛选条件下没有赛事'
      });
    } else {
      List() {
        ForEach(this.competitions, (competition: Competition) => {
          ListItem() {
            this.CompetitionCard(competition);
          }
          .margin({ bottom: 12 })
        }, (competition: Competition) => competition.id)
      }
      .width('100%')
      .layoutWeight(1)
      .padding({ left: 16, right: 16, top: 8, bottom: 8 })
    }
  }
  
  @Builder
  CompetitionCard(competition: Competition) {
    Column() {
      // 标题行
      Row() {
        Text(competition.name)
          .fontSize(16)
          .fontWeight(FontWeight.Bold)
          .fontColor('#333333')
          .layoutWeight(1)
        
        IceTag({ 
          text: COMPETITION_STATUS_NAMES[competition.status], 
          type: competition.status === 'LIVE' ? 'danger' : 
                competition.status === 'UPCOMING' ? 'warning' : 'default',
          tagSize: 'small'
        });
      }
      .width('100%')
      .margin({ bottom: 8 })
      
      // 信息行
      Row() {
        Text('📍 ' + competition.location)
          .fontSize(12)
          .fontColor('#666666')
        
        Text(' | ')
          .fontSize(12)
          .fontColor('#999999')
        
        Text(competition.startDate + ' ~ ' + competition.endDate)
          .fontSize(12)
          .fontColor('#666666')
      }
      .width('100%')
      .margin({ bottom: 12 })
      
      // 项目标签
      Row() {
        ForEach(competition.disciplines, (discipline: string) => {
          IceTag({ text: this.getDisciplineName(discipline), tagSize: 'small' })
            .margin({ right: 8 })
        }, (discipline: string) => discipline)
      }
      .width('100%')
    }
    .width('100%')
    .padding(16)
    .backgroundColor('#FFFFFF')
    .borderRadius(12)
    .onClick(() => {
      router.pushUrl({
        url: 'pages/CompetitionDetailPage',
        params: { competitionId: competition.id }
      });
    })
  }
  
  private getDisciplineName(discipline: string): string {
    const names: Record<string, string> = {
      'MEN': '男单',
      'LADIES': '女单',
      'PAIRS': '双人',
      'ICE_DANCE': '冰舞',
      'TEAM': '团体'
    };
    return names[discipline] || discipline;
  }
}

// 简化的赛事类型
interface Competition {
  id: string;
  name: string;
  nameEn: string;
  season: string;
  type: CompetitionType;
  location: string;
  country: string;
  startDate: string;
  endDate: string;
  disciplines: string[];
  status: string;
}
