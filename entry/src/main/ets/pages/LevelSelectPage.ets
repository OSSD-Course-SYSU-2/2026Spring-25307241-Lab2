/*
 * 花样滑冰解谜游戏 - 关卡选择页面
 * Copyright (c) 2024
 */

import router from '@ohos.router';
import { ALL_LEVELS, getLevelById } from '../viewmodel/LevelData';
import { LevelDifficulty, LevelStatus, LevelProgress, GameLevel } from '../viewmodel/LevelModel';

@Entry
@Component
struct LevelSelectPage {
  @State levelProgress: Map<number, LevelProgress> = new Map();
  @State selectedDifficulty: LevelDifficulty = LevelDifficulty.TUTORIAL;
  @State filteredLevels: GameLevel[] = [];
  
  aboutToAppear(): void {
    this.loadProgress();
    this.updateFilteredLevels();
  }
  
  loadProgress(): void {
    ALL_LEVELS.forEach((level, index) => {
      const progress = new LevelProgress(level.id);
      if (index === 0) {
        progress.status = LevelStatus.UNLOCKED;
      }
      this.levelProgress.set(level.id, progress);
    });
  }
  
  updateFilteredLevels(): void {
    this.filteredLevels = ALL_LEVELS.filter((level: GameLevel) => {
      return level.difficulty === this.selectedDifficulty;
    });
  }
  
  getDifficultyIcon(difficulty: LevelDifficulty): string {
    switch (difficulty) {
      case LevelDifficulty.TUTORIAL: return '📚';
      case LevelDifficulty.EASY: return '⭐';
      case LevelDifficulty.NORMAL: return '⭐⭐';
      case LevelDifficulty.HARD: return '⭐⭐⭐';
      case LevelDifficulty.EXPERT: return '💎';
      case LevelDifficulty.MASTER: return '👑';
      default: return '⭐';
    }
  }
  
  getDifficultyBg(difficulty: LevelDifficulty): string[] {
    switch (difficulty) {
      case LevelDifficulty.TUTORIAL: return ['#4CAF50', '#66BB6A'];
      case LevelDifficulty.EASY: return ['#8BC34A', '#9CCC65'];
      case LevelDifficulty.NORMAL: return ['#FFC107', '#FFCA28'];
      case LevelDifficulty.HARD: return ['#FF9800', '#FFA726'];
      case LevelDifficulty.EXPERT: return ['#F44336', '#EF5350'];
      case LevelDifficulty.MASTER: return ['#9C27B0', '#AB47BC'];
      default: return ['#9E9E9E', '#BDBDBD'];
    }
  }
  
  build() {
    Column() {
      // 顶部栏
      Row() {
        Button() {
          Text('←')
            .fontSize(24)
            .fontColor(Color.White)
        }
        .width(40)
        .height(40)
        .backgroundColor('rgba(255,255,255,0.2)')
        .borderRadius(20)
        .onClick(() => {
          router.back();
        })
        
        Blank().layoutWeight(1)
        
        Text('🎯 选择关卡')
          .fontSize(20)
          .fontColor(Color.White)
          .fontWeight(FontWeight.Bold)
        
        Blank().layoutWeight(1)
        
        Blank().width(40)
      }
      .width('100%')
      .height(70)
      .padding({ left: 20, right: 20 })
      
      // 难度筛选
      Scroll() {
        Row() {
          Button('教程')
            .height(36)
            .backgroundColor(this.selectedDifficulty === LevelDifficulty.TUTORIAL ? 
              'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.1)')
            .borderRadius(18)
            .fontColor(Color.White)
            .fontSize(14)
            .margin({ left: 8 })
            .onClick(() => {
              this.selectedDifficulty = LevelDifficulty.TUTORIAL;
              this.updateFilteredLevels();
            })
          
          Button('简单')
            .height(36)
            .backgroundColor(this.selectedDifficulty === LevelDifficulty.EASY ? 
              'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.1)')
            .borderRadius(18)
            .fontColor(Color.White)
            .fontSize(14)
            .margin({ left: 8 })
            .onClick(() => {
              this.selectedDifficulty = LevelDifficulty.EASY;
              this.updateFilteredLevels();
            })
          
          Button('普通')
            .height(36)
            .backgroundColor(this.selectedDifficulty === LevelDifficulty.NORMAL ? 
              'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.1)')
            .borderRadius(18)
            .fontColor(Color.White)
            .fontSize(14)
            .margin({ left: 8 })
            .onClick(() => {
              this.selectedDifficulty = LevelDifficulty.NORMAL;
              this.updateFilteredLevels();
            })
          
          Button('困难')
            .height(36)
            .backgroundColor(this.selectedDifficulty === LevelDifficulty.HARD ? 
              'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.1)')
            .borderRadius(18)
            .fontColor(Color.White)
            .fontSize(14)
            .margin({ left: 8 })
            .onClick(() => {
              this.selectedDifficulty = LevelDifficulty.HARD;
              this.updateFilteredLevels();
            })
          
          Button('专家')
            .height(36)
            .backgroundColor(this.selectedDifficulty === LevelDifficulty.EXPERT ? 
              'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.1)')
            .borderRadius(18)
            .fontColor(Color.White)
            .fontSize(14)
            .margin({ left: 8 })
            .onClick(() => {
              this.selectedDifficulty = LevelDifficulty.EXPERT;
              this.updateFilteredLevels();
            })
          
          Button('大师')
            .height(36)
            .backgroundColor(this.selectedDifficulty === LevelDifficulty.MASTER ? 
              'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.1)')
            .borderRadius(18)
            .fontColor(Color.White)
            .fontSize(14)
            .margin({ left: 8 })
            .onClick(() => {
              this.selectedDifficulty = LevelDifficulty.MASTER;
              this.updateFilteredLevels();
            })
        }
        .width('100%')
        .padding({ left: 20, right: 20 })
        .margin({ bottom: 15 })
      }
      .scrollable(ScrollDirection.Horizontal)
      .scrollBar(BarState.Off)
      .width('100%')
      
      // 关卡列表
      Scroll() {
        Column() {
          ForEach(this.filteredLevels, (level: GameLevel) => {
            this.buildLevelCard(level)
          }, (level: GameLevel) => level.id.toString())
        }
        .width('100%')
        .padding({ left: 20, right: 20 })
      }
      .layoutWeight(1)
      .scrollBar(BarState.Auto)
      .edgeEffect(EdgeEffect.Spring)
    }
    .width('100%')
    .height('100%')
    .linearGradient({
      angle: 135,
      colors: [['#667eea', 0.0], ['#764ba2', 1.0]]
    })
  }
  
  @Builder
  buildLevelCard(level: GameLevel) {
    Column() {
      Row() {
        // 关卡编号
        Column() {
          Text(`${level.id}`)
            .fontSize(28)
            .fontWeight(FontWeight.Bold)
            .fontColor(Color.White)
        }
        .width(60)
        .height(60)
        .linearGradient({
          angle: 135,
          colors: [[this.getDifficultyBg(level.difficulty)[0], 0.0], 
                   [this.getDifficultyBg(level.difficulty)[1], 1.0]]
        })
        .borderRadius(15)
        .justifyContent(FlexAlign.Center)
        
        // 关卡信息
        Column() {
          Row() {
            Text(level.name)
              .fontSize(18)
              .fontWeight(FontWeight.Bold)
              .fontColor(Color.White)
            
            Blank().layoutWeight(1)
            
            // 星星评价
            Row() {
              Text('☆')
                .fontSize(16)
                .fontColor('rgba(255,255,255,0.5)')
              Text('☆')
                .fontSize(16)
                .fontColor('rgba(255,255,255,0.5)')
              Text('☆')
                .fontSize(16)
                .fontColor('rgba(255,255,255,0.5)')
            }
          }
          .width('100%')
          
          Text(level.description)
            .fontSize(13)
            .fontColor('rgba(255,255,255,0.8)')
            .margin({ top: 5 })
          
          Row() {
            Text(`${level.getDifficultyName()}`)
              .fontSize(12)
              .fontColor(this.getDifficultyBg(level.difficulty)[0])
              .backgroundColor('rgba(255,255,255,0.9)')
              .borderRadius(10)
              .padding({ left: 8, right: 8, top: 2, bottom: 2 })
            
            Text(`最多 ${level.maxMoves} 步`)
              .fontSize(12)
              .fontColor('rgba(255,255,255,0.7)')
              .margin({ left: 10 })
            
            if (level.timeLimit > 0) {
              Text(`${level.timeLimit}秒`)
                .fontSize(12)
                .fontColor('rgba(255,255,255,0.7)')
                .margin({ left: 10 })
            }
          }
          .width('100%')
          .margin({ top: 8 })
        }
        .layoutWeight(1)
        .alignItems(HorizontalAlign.Start)
        .margin({ left: 15 })
        
        // 状态图标
        Column() {
          Text('▶')
            .fontSize(28)
            .fontColor(Color.White)
        }
        .width(50)
        .justifyContent(FlexAlign.Center)
      }
      .width('100%')
      .padding(15)
      .backgroundColor('rgba(255,255,255,0.15)')
      .borderRadius(15)
      .border({
        width: 1,
        color: 'rgba(255,255,255,0.2)'
      })
      .onClick(() => {
        router.pushUrl({
          url: 'pages/PuzzleGamePage',
          params: { levelId: level.id }
        });
      })
    }
    .width('100%')
    .margin({ bottom: 15 })
  }
}
