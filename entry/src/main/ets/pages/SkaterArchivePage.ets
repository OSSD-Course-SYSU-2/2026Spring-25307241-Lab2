/**
 * 冰迹花滑 - 选手档案库
 * 展示选手列表、筛选、详情
 */

import router from '@ohos.router';
import { IceNavBar } from '../common/components/IceNavBar';
import { IceCard } from '../common/components/IceCard';
import { IceTag } from '../common/components/IceTag';
import { IceFilterBar, FilterItem } from '../common/components/IceFilterBar';
import { IceEmpty } from '../common/components/IceEmpty';
import { SAMPLE_SKATERS } from '../viewmodel/SampleData';
import { 
  Discipline, DISCIPLINE_NAMES, getDisciplineIcon,
  calculateAge, formatScore, getMedalIcon
} from '../viewmodel/IceTraceModel';

@Entry
@Component
struct SkaterArchivePage {
  @State searchText: string = '';
  @State activeFilters: string[] = [];
  @State selectedDiscipline: Discipline = 'MEN';
  @State skaters: Skater[] = [];
  
  // 项目筛选
  private disciplineFilters: FilterItem[] = [
    { id: 'MEN', label: '男单' },
    { id: 'LADIES', label: '女单' },
    { id: 'PAIRS', label: '双人' },
    { id: 'ICE_DANCE', label: '冰舞' }
  ];
  
  // 其他筛选
  private otherFilters: FilterItem[] = [
    { id: 'ACTIVE', label: '现役' },
    { id: 'RETIRED', label: '退役' },
    { id: 'MEDALIST', label: '奖牌得主' }
  ];
  
  aboutToAppear() {
    this.loadSkaters();
  }
  
  loadSkaters() {
    // 筛选选手
    let filtered = SAMPLE_SKATERS.filter(skater => {
      // 项目筛选
      if (this.activeFilters.includes(skater.discipline)) {
        return true;
      }
      if (this.activeFilters.length === 0) {
        return skater.discipline === this.selectedDiscipline;
      }
      return false;
    });
    
    // 现役/退役筛选
    if (this.activeFilters.includes('ACTIVE')) {
      filtered = filtered.filter(s => s.isActive);
    }
    if (this.activeFilters.includes('RETIRED')) {
      filtered = filtered.filter(s => !s.isActive);
    }
    
    // 搜索筛选
    if (this.searchText) {
      const keyword = this.searchText.toLowerCase();
      filtered = filtered.filter(s => 
        s.name.toLowerCase().includes(keyword) ||
        s.nameEn.toLowerCase().includes(keyword) ||
        s.nationality.includes(keyword)
      );
    }
    
    this.skaters = filtered;
  }
  
  build() {
    Column() {
      // 导航栏
      IceNavBar({
        title: '选手档案',
        showBack: true,
        navBackgroundColor: '#4FC3F7'
      });
      
      // 内容区
      Column() {
        // 搜索栏
        this.buildSearchBar();
        
        // 项目筛选
        IceFilterBar({
          filters: this.disciplineFilters,
          activeFilters: $activeFilters
        });
        
        // 其他筛选
        IceFilterBar({
          filters: this.otherFilters,
          activeFilters: $activeFilters
        });
        
        // 选手列表
        this.buildSkaterList();
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
      TextInput({ placeholder: '搜索选手姓名、国籍...', text: this.searchText })
        .layoutWeight(1)
        .height(40)
        .backgroundColor('#FFFFFF')
        .borderRadius(20)
        .padding({ left: 16, right: 16 })
        .onChange((value: string) => {
          this.searchText = value;
          this.loadSkaters();
        })
    }
    .width('100%')
    .padding({ left: 16, right: 16, top: 12, bottom: 12 })
  }
  
  @Builder
  buildSkaterList() {
    if (this.skaters.length === 0) {
      IceEmpty({
        icon: '👤',
        title: '未找到选手',
        description: '尝试调整筛选条件或搜索关键词'
      });
    } else {
      List() {
        ForEach(this.skaters, (skater: Skater) => {
          ListItem() {
            this.SkaterCard(skater);
          }
          .margin({ bottom: 12 })
        }, (skater: Skater) => skater.id)
      }
      .width('100%')
      .layoutWeight(1)
      .padding({ left: 16, right: 16, top: 8, bottom: 8 })
    }
  }
  
  @Builder
  SkaterCard(skater: Skater) {
    Column() {
      Row() {
        // 头像
        Column() {
          Text('👤')
            .fontSize(40)
        }
        .width(60)
        .height(60)
        .backgroundColor('#F5F5F5')
        .borderRadius(30)
        .justifyContent(FlexAlign.Center)
        
        // 基本信息
        Column() {
          Row() {
            Text(skater.name)
              .fontSize(16)
              .fontWeight(FontWeight.Bold)
              .fontColor('#333333')
            
            Text(getDisciplineIcon(skater.discipline))
              .fontSize(14)
              .margin({ left: 8 })
            
            Text(skater.nationality)
              .fontSize(12)
              .fontColor('#999999')
              .margin({ left: 4 })
            
            if (skater.isActive) {
              IceTag({ text: '现役', type: 'success', tagSize: 'small' })
                .margin({ left: 8 })
            }
          }
          .width('100%')
          
          Row() {
            Text('年龄: ' + calculateAge(skater.birthDate) + '岁')
              .fontSize(12)
              .fontColor('#666666')
            
            if (skater.coach) {
              Text(' | 教练: ' + skater.coach)
                .fontSize(12)
                .fontColor('#666666')
            }
          }
          .width('100%')
          .margin({ top: 4 })
        }
        .layoutWeight(1)
        .alignItems(HorizontalAlign.Start)
        .margin({ left: 12 })
        
        Text('›')
          .fontSize(20)
          .fontColor('#999999')
      }
      .width('100%')
      
      // 最佳成绩
      if (skater.bestScores && skater.bestScores.length > 0) {
        Row() {
          Text('最佳总分: ')
            .fontSize(12)
            .fontColor('#666666')
          
          Text(formatScore(skater.bestScores.find(s => s.segment === 'TOTAL')?.score || 0))
            .fontSize(14)
            .fontWeight(FontWeight.Bold)
            .fontColor('#1976D2')
        }
        .width('100%')
        .margin({ top: 8 })
      }
      
      // 奖牌统计
      if (skater.medals && skater.medals.length > 0) {
        Row() {
          Text('奖牌: ')
            .fontSize(12)
            .fontColor('#666666')
          
          Row() {
            Text(getMedalIcon('GOLD') + ' ' + skater.medals.filter(m => m.medalType === 'GOLD').length)
              .fontSize(12)
              .fontColor('#666666')
              .margin({ right: 12 })
            
            Text(getMedalIcon('SILVER') + ' ' + skater.medals.filter(m => m.medalType === 'SILVER').length)
              .fontSize(12)
              .fontColor('#666666')
              .margin({ right: 12 })
            
            Text(getMedalIcon('BRONZE') + ' ' + skater.medals.filter(m => m.medalType === 'BRONZE').length)
              .fontSize(12)
              .fontColor('#666666')
          }
        }
        .width('100%')
        .margin({ top: 4 })
      }
    }
    .width('100%')
    .padding(16)
    .backgroundColor('#FFFFFF')
    .borderRadius(12)
    .onClick(() => {
      router.pushUrl({
        url: 'pages/SkaterDetailPage',
        params: { skaterId: skater.id }
      });
    })
  }
}

// 简化的选手类型
interface Skater {
  id: string;
  name: string;
  nameEn: string;
  nationality: string;
  nationalityCode: string;
  birthDate: string;
  gender: 'M' | 'F';
  discipline: Discipline;
  isActive: boolean;
  avatar: string;
  biography: string;
  coach?: string;
  bestScores: BestScore[];
  medals: MedalRecord[];
}

interface BestScore {
  segment: 'SP' | 'FS' | 'TOTAL';
  score: number;
  competition: string;
  date: string;
  season: string;
}

interface MedalRecord {
  competition: string;
  year: number;
  discipline: Discipline;
  medalType: 'GOLD' | 'SILVER' | 'BRONZE';
}
