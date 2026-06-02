/*
 * 花样滑冰解谜游戏 - 模式选择页面
 * Copyright (c) 2024
 */

import router from '@ohos.router';
import { GameMode } from '../viewmodel/PuzzleGameModel';

@Entry
@Component
struct GameModePage {
  build() {
    Column() {
      // 顶部导航
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

        Text('⛸️ 花样滑冰解谜')
          .fontSize(20)
          .fontColor(Color.White)
          .fontWeight(FontWeight.Bold)

        Blank().layoutWeight(1)

        Blank().width(40)
      }
      .width('100%')
      .height(80)
      .padding({ left: 20, right: 20 })

      Scroll() {
        Column() {
          // 关卡模式
          this.buildModeCard(
            '🎯 关卡模式',
            '从简单到困难，逐步挑战',
            '🎮',
            ['#00BCD4', '#4DD0E1'],
            () => {
              router.pushUrl({ url: 'pages/LevelSelectPage' });
            }
          )
          
          // 新手教程
          this.buildModeCard(
            '📖 新手教程',
            '观看游戏演示，快速上手',
            '🎓',
            ['#4CAF50', '#66BB6A'],
            () => {
              router.pushUrl({ url: 'pages/GameTutorialPage' });
            }
          )
          
          // 经典模式
          this.buildModeCard(
            '🎮 经典模式',
            '随机关卡，自由练习',
            '⭐',
            ['#667eea', '#764ba2'],
            () => {
              router.pushUrl({
                url: 'pages/PuzzleGamePage',
                params: { mode: GameMode.CLASSIC }
              });
            }
          )
          
          // 每日挑战
          this.buildModeCard(
            '🏆 每日挑战',
            '全球排行，一较高下',
            '🌍',
            ['#f093fb', '#f5576c'],
            () => {
              router.pushUrl({
                url: 'pages/PuzzleGamePage',
                params: { mode: GameMode.DAILY }
              });
            }
          )
          
          // 排行榜
          this.buildModeCard(
            '📊 排行榜',
            '查看全球排名',
            '🏅',
            ['#4facfe', '#00f2fe'],
            () => {
              router.pushUrl({ url: 'pages/LeaderboardPage' });
            }
          )
          
          // 游戏帮助
          this.buildModeCard(
            '❓ 游戏帮助',
            '详细玩法说明',
            '💡',
            ['#fa709a', '#fee140'],
            () => {
              router.pushUrl({ url: 'pages/GameHelpPage' });
            }
          )
        }
        .width('100%')
        .padding(20)
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
  buildModeCard(
    title: string,
    subtitle: string,
    icon: string,
    colors: string[],
    onClick: () => void
  ) {
    Row() {
      Column() {
        Text(icon)
          .fontSize(40)
      }
      .width(70)
      .height(70)
      .backgroundColor('rgba(255,255,255,0.2)')
      .borderRadius(15)
      .justifyContent(FlexAlign.Center)

      Column() {
        Text(title)
          .fontSize(18)
          .fontWeight(FontWeight.Bold)
          .fontColor(Color.White)

        Text(subtitle)
          .fontSize(14)
          .fontColor('rgba(255,255,255,0.8)')
          .margin({ top: 5 })
      }
      .alignItems(HorizontalAlign.Start)
      .margin({ left: 15 })
      .layoutWeight(1)

      Text('→')
        .fontSize(24)
        .fontColor('rgba(255,255,255,0.6)')
    }
    .width('100%')
    .height(100)
    .padding({ left: 20, right: 20 })
    .linearGradient({
      angle: 90,
      colors: [[colors[0], 0.0], [colors[1], 1.0]]
    })
    .borderRadius(20)
    .shadow({ radius: 10, color: 'rgba(0,0,0,0.2)', offsetX: 0, offsetY: 5 })
    .margin({ bottom: 15 })
    .onClick(onClick)
  }
}
