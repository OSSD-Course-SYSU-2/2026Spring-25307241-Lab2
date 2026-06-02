/*
 * 花样滑冰解谜游戏 - 帮助页面
 * Copyright (c) 2024
 */

import router from '@ohos.router';

@Entry
@Component
struct GameHelpPage {
  @State currentSection: number = 0;

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

        Text('📖 游戏帮助')
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
          // 游戏简介
          this.buildGameIntro()
          
          // 核心玩法
          this.buildCoreGameplay()
          
          // 15种动作卡牌
          this.buildActionCards()
          
          // 评分机制
          this.buildScoring()
          
          // 游戏模式
          this.buildGameModes()
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

  // 游戏简介
  @Builder
  buildGameIntro() {
    Column() {
      Row() {
        Text('游戏简介')
          .fontSize(20)
          .fontWeight(FontWeight.Bold)
          .fontColor(Color.White)

        Blank().layoutWeight(1)

        Text(this.currentSection === 0 ? '▼' : '▶')
          .fontSize(16)
          .fontColor('rgba(255,255,255,0.7)')
      }
      .width('100%')
      .padding(15)
      .onClick(() => {
        this.currentSection = this.currentSection === 0 ? -1 : 0;
      })

      if (this.currentSection === 0) {
        Column() {
          Text('⛸️ 花样滑冰解谜游戏')
            .fontSize(22)
            .fontWeight(FontWeight.Bold)
            .fontColor(Color.White)
            .margin({ bottom: 15 })

          Text('这是一款结合花样滑冰元素的策略解谜游戏。在3×3九宫格棋盘上，使用各种花样滑冰动作卡牌移动奖牌，凑出指定图案，完成完美的滑冰表演！')
            .fontSize(15)
            .fontColor('rgba(255,255,255,0.9)')
            .lineHeight(24)
        }
        .width('100%')
        .padding({ left: 15, right: 15, bottom: 15 })
      }
    }
    .width('100%')
    .backgroundColor('rgba(255,255,255,0.1)')
    .borderRadius(15)
    .margin({ bottom: 15 })
  }

  // 核心玩法
  @Builder
  buildCoreGameplay() {
    Column() {
      Row() {
        Text('核心玩法')
          .fontSize(20)
          .fontWeight(FontWeight.Bold)
          .fontColor(Color.White)

        Blank().layoutWeight(1)

        Text(this.currentSection === 1 ? '▼' : '▶')
          .fontSize(16)
          .fontColor('rgba(255,255,255,0.7)')
      }
      .width('100%')
      .padding(15)
      .onClick(() => {
        this.currentSection = this.currentSection === 1 ? -1 : 1;
      })

      if (this.currentSection === 1) {
        Column() {
          this.buildRuleItem('🎯 目标', '在3×3棋盘上凑出指定的奖牌图案')
          this.buildRuleItem('🎴 卡牌', '使用15种花样滑冰动作卡牌移动奖牌')
          this.buildRuleItem('🏆 通关', '连续完成6组图案即通关一套滑冰节目')
          this.buildRuleItem('⏱️ 计时', '用时越短，失误越少，分数越高')
        }
        .width('100%')
        .padding({ left: 15, right: 15, bottom: 15 })
      }
    }
    .width('100%')
    .backgroundColor('rgba(255,255,255,0.1)')
    .borderRadius(15)
    .margin({ bottom: 15 })
  }

  // 动作卡牌
  @Builder
  buildActionCards() {
    Column() {
      Row() {
        Text('动作卡牌')
          .fontSize(20)
          .fontWeight(FontWeight.Bold)
          .fontColor(Color.White)

        Blank().layoutWeight(1)

        Text(this.currentSection === 2 ? '▼' : '▶')
          .fontSize(16)
          .fontColor('rgba(255,255,255,0.7)')
      }
      .width('100%')
      .padding(15)
      .onClick(() => {
        this.currentSection = this.currentSection === 2 ? -1 : 2;
      })

      if (this.currentSection === 2) {
        Column() {
          Text('核心动作（必记）')
            .fontSize(18)
            .fontWeight(FontWeight.Bold)
            .fontColor(Color.White)
            .margin({ bottom: 15 })

          this.buildCardItem('🔄 Spin', '翻转整列/整堆奖牌', 2)
          this.buildCardItem('🦘 Jump', '交换棋盘上两堆奖牌', 3)
          this.buildCardItem('💃 Pose', '把相邻奖牌堆叠到目标格', 2)
          this.buildCardItem('🎀 Pirouette', '交换侧边和匹配奖牌', 4)

          Text('其他动作')
            .fontSize(18)
            .fontWeight(FontWeight.Bold)
            .fontColor(Color.White)
            .margin({ top: 20, bottom: 15 })

          this.buildCardItem('⭐ Axel', '高级跳跃动作', 5)
          this.buildCardItem('🌟 Lutz', '难度跳跃动作', 4)
          this.buildCardItem('✨ Flip', '点冰跳跃动作', 3)
          this.buildCardItem('💫 Loop', '结环跳跃动作', 3)
          this.buildCardItem('🔥 Salchow', '内结环跳跃', 3)
          this.buildCardItem('❄️ ToeLoop', '点冰跳跃基础', 2)
          this.buildCardItem('🐪 Camel', '蹲旋转动作', 2)
          this.buildCardItem('🦵 Sit', '蹲姿旋转动作', 2)
          this.buildCardItem('🧍 Upright', '直立旋转动作', 1)
          this.buildCardItem('🌀 Spiral', '螺旋线动作', 3)
          this.buildCardItem('👣 Step', '步伐连接动作', 1)
        }
        .width('100%')
        .padding({ left: 15, right: 15, bottom: 15 })
      }
    }
    .width('100%')
    .backgroundColor('rgba(255,255,255,0.1)')
    .borderRadius(15)
    .margin({ bottom: 15 })
  }

  // 评分机制
  @Builder
  buildScoring() {
    Column() {
      Row() {
        Text('评分机制')
          .fontSize(20)
          .fontWeight(FontWeight.Bold)
          .fontColor(Color.White)

        Blank().layoutWeight(1)

        Text(this.currentSection === 3 ? '▼' : '▶')
          .fontSize(16)
          .fontColor('rgba(255,255,255,0.7)')
      }
      .width('100%')
      .padding(15)
      .onClick(() => {
        this.currentSection = this.currentSection === 3 ? -1 : 3;
      })

      if (this.currentSection === 3) {
        Column() {
          this.buildMedalItem('🥇 金牌', '零失误，全程无补救操作，完美完成表演')
          this.buildMedalItem('🥈 银牌', '仅1次失误，用1次补救操作')
          this.buildMedalItem('🥉 铜牌', '2次失误，基础合格表演')

          Text('评分公式')
            .fontSize(18)
            .fontWeight(FontWeight.Bold)
            .fontColor(Color.White)
            .margin({ top: 20, bottom: 10 })

          Column() {
            Text('总分 = 基础分 + 时间奖励 - 失误惩罚 + 效率奖励')
              .fontSize(14)
              .fontColor('rgba(255,255,255,0.9)')
              .margin({ bottom: 8 })

            Text('• 基础分 = 完成图案数 × 100')
              .fontSize(13)
              .fontColor('rgba(255,255,255,0.8)')

            Text('• 时间奖励 = max(0, 300 - 用时)')
              .fontSize(13)
              .fontColor('rgba(255,255,255,0.8)')

            Text('• 失误惩罚 = 失误次数 × 20')
              .fontSize(13)
              .fontColor('rgba(255,255,255,0.8)')

            Text('• 效率奖励 = (完成图案数 / 总移动数) × 50')
              .fontSize(13)
              .fontColor('rgba(255,255,255,0.8)')
          }
          .width('100%')
          .padding(15)
          .backgroundColor('rgba(255,255,255,0.1)')
          .borderRadius(10)
        }
        .width('100%')
        .padding({ left: 15, right: 15, bottom: 15 })
      }
    }
    .width('100%')
    .backgroundColor('rgba(255,255,255,0.1)')
    .borderRadius(15)
    .margin({ bottom: 15 })
  }

  // 游戏模式
  @Builder
  buildGameModes() {
    Column() {
      Row() {
        Text('游戏模式')
          .fontSize(20)
          .fontWeight(FontWeight.Bold)
          .fontColor(Color.White)

        Blank().layoutWeight(1)

        Text(this.currentSection === 4 ? '▼' : '▶')
          .fontSize(16)
          .fontColor('rgba(255,255,255,0.7)')
      }
      .width('100%')
      .padding(15)
      .onClick(() => {
        this.currentSection = this.currentSection === 4 ? -1 : 4;
      })

      if (this.currentSection === 4) {
        Column() {
          this.buildModeItem('🎮 经典模式', [
            '随时开启随机生成的解谜关卡',
            '自由练习，无每日限制',
            '刷高分，冲金牌',
            '适合新手熟悉游戏'
          ])

          this.buildModeItem('🏆 每日挑战', [
            '每天全球玩家共用同一道谜题',
            '完成后自动上传分数到全球排行榜',
            '和全世界玩家比拼排名',
            '看谁的滑冰表演更完美'
          ])
        }
        .width('100%')
        .padding({ left: 15, right: 15, bottom: 15 })
      }
    }
    .width('100%')
    .backgroundColor('rgba(255,255,255,0.1)')
    .borderRadius(15)
    .margin({ bottom: 15 })
  }

  @Builder
  buildRuleItem(icon: string, desc: string) {
    Row() {
      Text(icon)
        .fontSize(24)

      Text(desc)
        .fontSize(14)
        .fontColor('rgba(255,255,255,0.9)')
        .margin({ left: 15 })
        .layoutWeight(1)
    }
    .width('100%')
    .padding(10)
  }

  @Builder
  buildCardItem(name: string, desc: string, difficulty: number) {
    Row() {
      Column() {
        Text(name)
          .fontSize(15)
          .fontWeight(FontWeight.Bold)
          .fontColor(Color.White)

        Text(desc)
          .fontSize(13)
          .fontColor('rgba(255,255,255,0.8)')
          .margin({ top: 3 })
      }
      .alignItems(HorizontalAlign.Start)
      .layoutWeight(1)

      Text(`难度${difficulty}`)
        .fontSize(12)
        .fontColor('rgba(255,255,255,0.7)')
        .padding({ left: 8, right: 8, top: 4, bottom: 4 })
        .backgroundColor('rgba(255,255,255,0.2)')
        .borderRadius(10)
    }
    .width('100%')
    .padding(10)
    .backgroundColor('rgba(255,255,255,0.05)')
    .borderRadius(8)
    .margin({ bottom: 8 })
  }

  @Builder
  buildMedalItem(medal: string, desc: string) {
    Row() {
      Text(medal)
        .fontSize(24)

      Text(desc)
        .fontSize(14)
        .fontColor('rgba(255,255,255,0.9)')
        .margin({ left: 15 })
        .layoutWeight(1)
    }
    .width('100%')
    .padding(12)
    .backgroundColor('rgba(255,255,255,0.1)')
    .borderRadius(10)
    .margin({ bottom: 10 })
  }

  @Builder
  buildModeItem(title: string, features: string[]) {
    Column() {
      Text(title)
        .fontSize(18)
        .fontWeight(FontWeight.Bold)
        .fontColor(Color.White)
        .margin({ bottom: 10 })

      Column() {
        ForEach(features, (feature: string, index: number) => {
          Row() {
            Text('✓')
              .fontSize(14)
              .fontColor('#4CAF50')

            Text(feature)
              .fontSize(14)
              .fontColor('rgba(255,255,255,0.9)')
              .margin({ left: 8 })
          }
          .width('100%')
          .margin({ bottom: 5 })
        }, (feature: string, index: number) => `${title}_${index}`)
      }
      .width('100%')
    }
    .width('100%')
    .padding(15)
    .backgroundColor('rgba(255,255,255,0.1)')
    .borderRadius(10)
    .margin({ bottom: 15 })
    .alignItems(HorizontalAlign.Start)
  }
}
