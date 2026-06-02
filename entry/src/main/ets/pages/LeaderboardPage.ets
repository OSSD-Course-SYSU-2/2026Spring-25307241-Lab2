/*
 * 花样滑冰解谜游戏 - 排行榜页面
 * Copyright (c) 2024
 */

import router from '@ohos.router';
import { LeaderboardManager } from '../common/util/LeaderboardManager';
import { LeaderboardEntry, MedalType } from '../viewmodel/PuzzleGameModel';

@Entry
@Component
struct LeaderboardPage {
  @State leaderboard: LeaderboardEntry[] = [];
  @State isLoading: boolean = true;
  @State currentTab: number = 0; // 0: 全球排行, 1: 今日排行

  aboutToAppear(): void {
    this.loadLeaderboard();
  }

  async loadLeaderboard(): Promise<void> {
    this.isLoading = true;
    this.leaderboard = await LeaderboardManager.getLeaderboard();
    this.isLoading = false;
  }

  getMedalIcon(type: MedalType): string {
    switch (type) {
      case MedalType.GOLD:
        return '🥇';
      case MedalType.SILVER:
        return '🥈';
      case MedalType.BRONZE:
        return '🥉';
      default:
        return '🏅';
    }
  }

  getRankIcon(rank: number): string {
    switch (rank) {
      case 1:
        return '🥇';
      case 2:
        return '🥈';
      case 3:
        return '🥉';
      default:
        return `${rank}`;
    }
  }

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

        Text('🏆 排行榜')
          .fontSize(20)
          .fontColor(Color.White)
          .fontWeight(FontWeight.Bold)

        Blank().layoutWeight(1)

        Blank().width(40)
      }
      .width('100%')
      .height(80)
      .padding({ left: 20, right: 20 })

      // 标签切换
      Row() {
        Button('全球排行')
          .width('45%')
          .height(40)
          .backgroundColor(this.currentTab === 0 ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.1)')
          .borderRadius(20)
          .fontColor(Color.White)
          .onClick(() => {
            this.currentTab = 0;
          })

        Button('今日排行')
          .width('45%')
          .height(40)
          .backgroundColor(this.currentTab === 1 ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.1)')
          .borderRadius(20)
          .fontColor(Color.White)
          .onClick(() => {
            this.currentTab = 1;
          })
      }
      .width('90%')
      .justifyContent(FlexAlign.SpaceEvenly)
      .margin({ bottom: 20 })

      // 排行榜列表
      if (this.isLoading) {
        Column() {
          LoadingProgress()
            .width(50)
            .height(50)
            .color(Color.White)

          Text('加载中...')
            .fontSize(16)
            .fontColor('rgba(255,255,255,0.8)')
            .margin({ top: 15 })
        }
        .width('100%')
        .layoutWeight(1)
        .justifyContent(FlexAlign.Center)
      } else {
        Column() {
          // 表头
          Row() {
            Text('排名')
              .fontSize(14)
              .fontColor('rgba(255,255,255,0.7)')
              .width('15%')
              .textAlign(TextAlign.Center)

            Text('玩家')
              .fontSize(14)
              .fontColor('rgba(255,255,255,0.7)')
              .width('30%')
              .textAlign(TextAlign.Center)

            Text('分数')
              .fontSize(14)
              .fontColor('rgba(255,255,255,0.7)')
              .width('25%')
              .textAlign(TextAlign.Center)

            Text('用时')
              .fontSize(14)
              .fontColor('rgba(255,255,255,0.7)')
              .width('15%')
              .textAlign(TextAlign.Center)

            Text('奖牌')
              .fontSize(14)
              .fontColor('rgba(255,255,255,0.7)')
              .width('15%')
              .textAlign(TextAlign.Center)
          }
          .width('95%')
          .padding({ top: 10, bottom: 10 })
          .backgroundColor('rgba(255,255,255,0.1)')
          .borderRadius({ topLeft: 10, topRight: 10 })

          // 列表
          List() {
            ForEach(this.leaderboard, (entry: LeaderboardEntry, index: number) => {
              ListItem() {
                Row() {
                  // 排名
                  Column() {
                    Text(this.getRankIcon(index + 1))
                      .fontSize(index < 3 ? 24 : 16)
                  }
                  .width('15%')
                  .justifyContent(FlexAlign.Center)

                  // 玩家名
                  Text(entry.playerName)
                    .fontSize(14)
                    .fontColor(Color.White)
                    .fontWeight(index < 3 ? FontWeight.Bold : FontWeight.Normal)
                    .width('30%')
                    .textAlign(TextAlign.Center)

                  // 分数
                  Text(`${entry.score}`)
                    .fontSize(16)
                    .fontColor(Color.White)
                    .fontWeight(FontWeight.Bold)
                    .width('25%')
                    .textAlign(TextAlign.Center)

                  // 用时
                  Text(this.formatTime(entry.time))
                    .fontSize(14)
                    .fontColor('rgba(255,255,255,0.8)')
                    .width('15%')
                    .textAlign(TextAlign.Center)

                  // 奖牌
                  Text(this.getMedalIcon(entry.medal))
                    .fontSize(20)
                    .width('15%')
                    .textAlign(TextAlign.Center)
                }
                .width('95%')
                .height(60)
                .backgroundColor(index % 2 === 0 ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.05)')
                .borderRadius(index === this.leaderboard.length - 1 ? 10 : 0)
              }
            })
          }
          .width('95%')
          .layoutWeight(1)
          .divider({
            strokeWidth: 1,
            color: 'rgba(255,255,255,0.1)'
          })
        }
        .width('100%')
        .layoutWeight(1)
        .justifyContent(FlexAlign.Start)
        .padding({ top: 10 })
      }

      // 底部提示
      Column() {
        Text('💡 每日挑战完成后自动上传分数')
          .fontSize(13)
          .fontColor('rgba(255,255,255,0.7)')
      }
      .width('100%')
      .height(60)
      .justifyContent(FlexAlign.Center)
    }
    .width('100%')
    .height('100%')
    .linearGradient({
      angle: 135,
      colors: [['#667eea', 0.0], ['#764ba2', 1.0]]
    })
  }

  formatTime(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }
}
