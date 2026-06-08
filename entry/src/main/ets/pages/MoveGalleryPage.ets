/**
 * 冰迹花滑 - 动作图鉴
 * 可视化学习跳跃、旋转、步法等动作
 */

import router from '@ohos.router';
import { IceNavBar } from '../common/components/IceNavBar';
import { IceCard } from '../common/components/IceCard';
import { IceTag, DifficultyTag } from '../common/components/IceTag';
import { SAMPLE_MOVES } from '../viewmodel/SampleData';
import { MoveType, MOVE_TYPE_NAMES, Difficulty } from '../viewmodel/IceTraceModel';

// 动作类型项接口
interface MoveTypeItem {
  type: MoveType;
  label: string;
  icon: string;
}

// 难度等级项接口
interface DifficultyLevelItem {
  value: Difficulty | 'ALL';
  label: string;
}

@Entry
@Component
struct MoveGalleryPage {
  @State searchText: string = '';
  @State selectedType: MoveType = 'JUMP';
  @State selectedDifficulty: Difficulty | 'ALL' = 'ALL';
  @State moves: Move[] = [];
  @State showDetail: boolean = false;
  @State selectedMove: Move | null = null;
  
  // 动作类型标签
  private moveTypes: MoveTypeItem[] = [
    { type: 'JUMP', label: '跳跃', icon: '🦘' },
    { type: 'SPIN', label: '旋转', icon: '🌀' },
    { type: 'STEP_SEQUENCE', label: '步法', icon: '👣' },
    { type: 'LIFT', label: '托举', icon: '💪' },
    { type: 'SPIRAL', label: '螺旋线', icon: '〰️' }
  ];
  
  // 难度等级
  private difficultyLevels: DifficultyLevelItem[] = [
    { value: 'ALL', label: '全部' },
    { value: 'BEGINNER', label: '入门' },
    { value: 'INTERMEDIATE', label: '进阶' },
    { value: 'ADVANCED', label: '高级' }
  ];
  
  aboutToAppear() {
    this.loadMoves();
  }
  
  loadMoves() {
    let filtered = SAMPLE_MOVES.filter(move => {
      // 类型筛选
      if (move.type !== this.selectedType) {
        return false;
      }
      
      // 难度筛选
      if (this.selectedDifficulty !== 'ALL') {
        const difficultyMap: Record<number, Difficulty> = {
          1: 'BEGINNER',
          2: 'BEGINNER',
          3: 'INTERMEDIATE',
          4: 'ADVANCED',
          5: 'ADVANCED'
        };
        if (difficultyMap[move.difficulty] !== this.selectedDifficulty) {
          return false;
        }
      }
      
      // 搜索筛选
      if (this.searchText) {
        const keyword = this.searchText.toLowerCase();
        return move.name.toLowerCase().includes(keyword) ||
               move.nameEn.toLowerCase().includes(keyword) ||
               move.abbreviation.toLowerCase().includes(keyword);
      }
      
      return true;
    });
    
    // 按难度排序
    filtered.sort((a, b) => a.difficulty - b.difficulty);
    
    this.moves = filtered;
  }
  
  build() {
    Column() {
      // 导航栏
      IceNavBar({
        title: '动作图鉴',
        showBack: true,
        navBackgroundColor: '#4FC3F7'
      });
      
      // 内容区
      Column() {
        // 搜索栏
        this.buildSearchBar();
        
        // 动作类型选择
        this.buildTypeSelector();
        
        // 难度筛选
        this.buildDifficultyFilter();
        
        // 动作网格
        this.buildMoveGrid();
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
      TextInput({ placeholder: '搜索动作名称、缩写...', text: this.searchText })
        .layoutWeight(1)
        .height(40)
        .backgroundColor('#FFFFFF')
        .borderRadius(20)
        .padding({ left: 16, right: 16 })
        .onChange((value: string) => {
          this.searchText = value;
          this.loadMoves();
        })
    }
    .width('100%')
    .padding({ left: 16, right: 16, top: 12, bottom: 12 })
  }
  
  @Builder
  buildTypeSelector() {
    Scroll() {
      Row() {
        ForEach(this.moveTypes, (item: MoveTypeItem) => {
          Column() {
            Text(item.icon)
              .fontSize(24)
            
            Text(item.label)
              .fontSize(12)
              .fontColor(this.selectedType === item.type ? '#1976D2' : '#666666')
              .margin({ top: 4 })
          }
          .width(60)
          .height(70)
          .backgroundColor(this.selectedType === item.type ? '#E3F2FD' : '#FFFFFF')
          .borderRadius(8)
          .justifyContent(FlexAlign.Center)
          .onClick(() => {
            this.selectedType = item.type;
            this.loadMoves();
          })
          .margin({ right: 8 })
        }, (item: MoveTypeItem) => item.type)
      }
      .padding({ left: 16, right: 16 })
    }
    .width('100%')
    .height(80)
    .scrollable(ScrollDirection.Horizontal)
    .scrollBar(BarState.Off)
  }
  
  @Builder
  buildDifficultyFilter() {
    Row() {
      ForEach(this.difficultyLevels, (item: DifficultyLevelItem) => {
        Button(item.label)
          .fontSize(12)
          .height(32)
          .padding({ left: 12, right: 12 })
          .backgroundColor(this.selectedDifficulty === item.value ? '#4FC3F7' : '#FFFFFF')
          .fontColor(this.selectedDifficulty === item.value ? '#FFFFFF' : '#666666')
          .borderRadius(16)
          .margin({ right: 8 })
          .onClick(() => {
            this.selectedDifficulty = item.value;
            this.loadMoves();
          })
      }, (item: DifficultyLevelItem) => item.value)
    }
    .width('100%')
    .padding({ left: 16, right: 16, top: 8, bottom: 8 })
  }
  
  @Builder
  buildMoveGrid() {
    if (this.moves.length === 0) {
      Column() {
        Text('📭')
          .fontSize(64)
          .margin({ bottom: 16 })
        
        Text('暂无动作数据')
          .fontSize(16)
          .fontColor('#666666')
      }
      .width('100%')
      .layoutWeight(1)
      .justifyContent(FlexAlign.Center)
    } else {
      Grid() {
        ForEach(this.moves, (move: Move) => {
          GridItem() {
            this.MoveCard(move);
          }
        }, (move: Move) => move.id)
      }
      .width('100%')
      .layoutWeight(1)
      .padding({ left: 16, right: 16, top: 8, bottom: 8 })
      .columnsTemplate('1fr 1fr')
      .rowsGap(12)
      .columnsGap(12)
    }
  }
  
  @Builder
  MoveCard(move: Move) {
    Column() {
      // 动作图示
      Column() {
        Text('⛸️')
          .fontSize(48)
      }
      .width('100%')
      .height(100)
      .backgroundColor('#F5F5F5')
      .justifyContent(FlexAlign.Center)
      
      // 动作信息
      Column() {
        Row() {
          Text(move.abbreviation)
            .fontSize(18)
            .fontWeight(FontWeight.Bold)
            .fontColor('#333333')
          
          if (move.isBeginner) {
            IceTag({ text: '入门', type: 'success', tagSize: 'small' })
              .margin({ left: 8 })
          }
        }
        .width('100%')
        
        Text(move.name)
          .fontSize(12)
          .fontColor('#666666')
          .margin({ top: 4 })
        
        Row() {
          Text('基础分: ' + move.baseValue.toFixed(2))
            .fontSize(12)
            .fontColor('#1976D2')
            .fontWeight(FontWeight.Bold)
          
          Text('难度: ' + move.difficulty)
            .fontSize(12)
            .fontColor('#999999')
            .margin({ left: 8 })
        }
        .width('100%')
        .margin({ top: 4 })
      }
      .width('100%')
      .padding(8)
      .alignItems(HorizontalAlign.Start)
    }
    .width('100%')
    .backgroundColor('#FFFFFF')
    .borderRadius(12)
    .onClick(() => {
      this.selectedMove = move;
      this.showDetail = true;
    })
  }
}

// 简化的动作类型
interface Move {
  id: string;
  name: string;
  nameEn: string;
  abbreviation: string;
  type: MoveType;
  difficulty: number;
  baseValue: number;
  description: string;
  keyPoints: string[];
  commonErrors: string[];
  imageUrl: string;
  isBeginner: boolean;
}
