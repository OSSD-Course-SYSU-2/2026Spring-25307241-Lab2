/**
 * 冰迹·EdgeFlow - 动作库页面
 * 技战术档案、笔记沉淀
 */

import router from '@ohos.router';
import { DataStore } from '../services/DataStore';
import { MoveDetail, PracticeRecord } from '../models/IceTraceData';

interface TypeFilter {
  id: string;
  name: string;
}

interface MasteryFilter {
  id: string;
  name: string;
  color: string;
}

interface CustomMove {
  name: string;
  notes: string;
  createDate: string;
}

@Component
export struct MoveLibraryPage {
  @State searchText: string = '';
  @State selectedType: string = 'all';
  @State selectedMastery: string = 'all';
  @State showAddDialog: boolean = false;
  @State customMoveName: string = '';
  @State customMoveNotes: string = '';
  @State moveList: MoveDetail[] = [];
  @State filteredMoves: MoveDetail[] = [];
  
  // 自定义动作列表
  @State customMoves: CustomMove[] = [];
  
  private dataStore: DataStore = DataStore.getInstance();
  
  // 动作类型筛选
  private typeFilters: TypeFilter[] = [
    { id: 'all', name: '全部' },
    { id: 'jump', name: '跳跃' },
    { id: 'spin', name: '旋转' },
    { id: 'step', name: '步法' }
  ];
  
  // 掌握度筛选
  private masteryFilters: MasteryFilter[] = [
    { id: 'all', name: '全部', color: '#999999' },
    { id: 'S', name: 'S级', color: '#FF6B6B' },
    { id: 'A', name: 'A级', color: '#FFA500' },
    { id: 'B', name: 'B级', color: '#4CAF50' },
    { id: 'C', name: 'C级', color: '#2196F3' }
  ];
  
  aboutToAppear() {
    this.loadMoves();
  }
  
  loadMoves() {
    this.moveList = this.dataStore.getMoveList();
    this.applyFilters();
  }
  
  applyFilters() {
    let filtered = this.moveList;
    
    // 类型筛选
    if (this.selectedType !== 'all') {
      filtered = filtered.filter(m => m.type === this.selectedType);
    }
    
    // 掌握度筛选
    if (this.selectedMastery !== 'all') {
      filtered = filtered.filter(m => m.level === this.selectedMastery);
    }
    
    // 搜索筛选
    if (this.searchText) {
      filtered = filtered.filter(m => 
        m.name.includes(this.searchText) || 
        m.abbr.includes(this.searchText)
      );
    }
    
    this.filteredMoves = filtered;
  }
  
  build() {
    Stack() {
      Column() {
        // 顶部搜索栏
        Row() {
          TextInput({ placeholder: '搜索动作...', text: this.searchText })
            .fontSize(14)
            .backgroundColor('rgba(255, 255, 255, 0.9)')
            .borderRadius(20)
            .height(40)
            .layoutWeight(1)
            .onChange((value: string) => {
              this.searchText = value;
              this.applyFilters();
            })
          
          Button('+')
            .fontSize(20)
            .fontColor('#FFFFFF')
            .backgroundColor('rgba(255, 255, 255, 0.3)')
            .borderRadius(20)
            .width(40)
            .height(40)
            .margin({ left: 10 })
            .onClick(() => {
              this.showAddDialog = true;
            })
        }
        .width('100%')
        .padding({ left: 20, right: 20, top: 20, bottom: 10 })
        
        // 筛选栏
        Column() {
          // 类型筛选
          Scroll() {
            Row() {
              ForEach(this.typeFilters, (filter: TypeFilter) => {
                Text(filter.name)
                  .fontSize(14)
                  .fontColor(this.selectedType === filter.id ? '#FFFFFF' : 'rgba(255, 255, 255, 0.7)')
                  .backgroundColor(this.selectedType === filter.id ? 'rgba(255, 255, 255, 0.3)' : 'transparent')
                  .borderRadius(15)
                  .padding({ left: 15, right: 15, top: 8, bottom: 8 })
                  .margin({ right: 10 })
                  .onClick(() => {
                    this.selectedType = filter.id;
                    this.applyFilters();
                  })
              })
            }
          }
          .scrollable(ScrollDirection.Horizontal)
          .scrollBar(BarState.Off)
          .width('100%')
          .padding({ left: 20, right: 20 })
          
          // 掌握度筛选
          Scroll() {
            Row() {
              ForEach(this.masteryFilters, (filter: MasteryFilter) => {
                Text(filter.name)
                  .fontSize(14)
                  .fontColor(this.selectedMastery === filter.id ? '#FFFFFF' : 'rgba(255, 255, 255, 0.7)')
                  .backgroundColor(this.selectedMastery === filter.id ? 'rgba(255, 255, 255, 0.3)' : 'transparent')
                  .borderRadius(15)
                  .padding({ left: 15, right: 15, top: 8, bottom: 8 })
                  .margin({ right: 10 })
                  .onClick(() => {
                    this.selectedMastery = filter.id;
                    this.applyFilters();
                  })
              })
            }
          }
          .scrollable(ScrollDirection.Horizontal)
          .scrollBar(BarState.Off)
          .width('100%')
          .padding({ left: 20, right: 20, top: 10 })
        }
        
        // 动作列表
        List() {
          ForEach(this.filteredMoves, (move: MoveDetail) => {
            ListItem() {
              this.MoveCard(move)
            }
            .margin({ bottom: 15 })
          })
          
          // 自定义动作
          ForEach(this.customMoves, (move: CustomMove) => {
            ListItem() {
              this.CustomMoveCard(move)
            }
            .margin({ bottom: 15 })
          })
        }
        .width('100%')
        .layoutWeight(1)
        .padding({ left: 20, right: 20, top: 15 })
        .scrollBar(BarState.Off)
      }
      .width('100%')
      .height('100%')
      .linearGradient({
        angle: 135,
        colors: [['#00D2FF', 0.0], ['#3A7BD5', 1.0]]
      })
      
      // 添加自定义动作弹窗
      if (this.showAddDialog) {
        this.buildAddCustomMove()
      }
    }
    .width('100%')
    .height('100%')
  }
  
  @Builder
  MoveCard(move: MoveDetail) {
    Column() {
      Row() {
        Text(this.getMoveIcon(move.type))
          .fontSize(32)
        
        Column() {
          Text(move.name)
            .fontSize(16)
            .fontWeight(FontWeight.Bold)
            .fontColor('#333333')
          
          Row() {
            Text(move.abbr)
              .fontSize(14)
              .fontColor('#666666')
            
            if (move.practiceCount > 0) {
              Text(` · 已练习${move.practiceCount}次`)
                .fontSize(12)
                .fontColor('#3A7BD5')
            }
          }
          .margin({ top: 5 })
        }
        .alignItems(HorizontalAlign.Start)
        .layoutWeight(1)
        .margin({ left: 15 })
        
        // 掌握度标签
        Text(move.level + '级')
          .fontSize(12)
          .fontColor('#FFFFFF')
          .backgroundColor(this.getMasteryColor(move.level))
          .borderRadius(10)
          .padding({ left: 10, right: 10, top: 5, bottom: 5 })
      }
      .width('100%')
      .padding(15)
    }
    .width('100%')
    .backgroundColor('#FFFFFF')
    .borderRadius(15)
    .shadow({ radius: 10, color: 'rgba(0, 0, 0, 0.1)', offsetX: 0, offsetY: 5 })
    .onClick(() => {
      // 跳转到动作详情页
      router.pushUrl({
        url: 'pages/MoveDetailPage',
        params: { abbr: move.abbr }
      });
    })
  }
  
  @Builder
  CustomMoveCard(move: CustomMove) {
    Column() {
      Row() {
        Text('✨')
          .fontSize(32)
        
        Column() {
          Text(move.name)
            .fontSize(16)
            .fontWeight(FontWeight.Bold)
            .fontColor('#333333')
          
          Text('自定义动作')
            .fontSize(14)
            .fontColor('#FF6B6B')
            .margin({ top: 5 })
        }
        .alignItems(HorizontalAlign.Start)
        .layoutWeight(1)
        .margin({ left: 15 })
        
        Text('自定义')
          .fontSize(12)
          .fontColor('#FFFFFF')
          .backgroundColor('#FF6B6B')
          .borderRadius(10)
          .padding({ left: 10, right: 10, top: 5, bottom: 5 })
      }
      .width('100%')
      .padding(15)
    }
    .width('100%')
    .backgroundColor('#FFFFFF')
    .borderRadius(15)
    .shadow({ radius: 10, color: 'rgba(0, 0, 0, 0.1)', offsetX: 0, offsetY: 5 })
  }
  
  @Builder
  buildAddCustomMove() {
    Column() {
      Column() {
        Text('✨ 添加自定义动作')
          .fontSize(18)
          .fontWeight(FontWeight.Bold)
          .fontColor('#333333')
          .margin({ bottom: 20 })
        
        TextInput({ placeholder: '动作名称', text: this.customMoveName })
          .fontSize(14)
          .backgroundColor('#F0F0F0')
          .borderRadius(10)
          .height(45)
          .width('100%')
          .margin({ bottom: 15 })
          .onChange((value: string) => {
            this.customMoveName = value;
          })
        
        TextArea({ placeholder: '添加文字笔记（如：落冰时重心靠前一点）...', text: this.customMoveNotes })
          .fontSize(14)
          .backgroundColor('#F0F0F0')
          .borderRadius(10)
          .height(100)
          .width('100%')
          .margin({ bottom: 15 })
          .onChange((value: string) => {
            this.customMoveNotes = value;
          })
        
        Row() {
          Button('取消')
            .fontSize(16)
            .fontColor('#666666')
            .backgroundColor('#F0F0F0')
            .borderRadius(20)
            .width(100)
            .onClick(() => {
              this.showAddDialog = false;
              this.customMoveName = '';
              this.customMoveNotes = '';
            })
          
          Button('添加')
            .fontSize(16)
            .fontColor('#FFFFFF')
            .backgroundColor('#4CAF50')
            .borderRadius(20)
            .width(100)
            .margin({ left: 20 })
            .onClick(() => {
              if (this.customMoveName) {
                this.customMoves.push({
                  name: this.customMoveName,
                  notes: this.customMoveNotes,
                  createDate: new Date().toLocaleDateString()
                });
                this.showAddDialog = false;
                this.customMoveName = '';
                this.customMoveNotes = '';
              }
            })
        }
      }
      .width('85%')
      .padding(25)
      .backgroundColor('#FFFFFF')
      .borderRadius(20)
    }
    .width('100%')
    .height('100%')
    .backgroundColor('rgba(0, 0, 0, 0.5)')
    .justifyContent(FlexAlign.Center)
  }
  
  private getMoveIcon(type: string): string {
    switch (type) {
      case 'jump': return '🦶';
      case 'spin': return '🌀';
      case 'step': return '👣';
      default: return '⛸️';
    }
  }
  
  private getMasteryColor(level: string): string {
    const colors: Record<string, string> = {
      'S': '#FF6B6B',
      'A': '#FFA500',
      'B': '#4CAF50',
      'C': '#2196F3',
      'D': '#9E9E9E'
    };
    return colors[level] || '#9E9E9E';
  }
}
