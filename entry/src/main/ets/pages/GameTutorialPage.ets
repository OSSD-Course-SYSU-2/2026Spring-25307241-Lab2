/*
 * 花样滑冰解谜游戏 - 新手教程
 * 自动演示游戏玩法
 */

import router from '@ohos.router';
import { PuzzleGameEngine } from '../common/util/PuzzleGameEngine';
import {
  Medal, MedalType, ActionType, ActionCard,
  TargetPattern, GameMode, GameState, PlayerScore
} from '../viewmodel/PuzzleGameModel';

@Entry
@Component
struct GameTutorialPage {
  private gameEngine: PuzzleGameEngine = new PuzzleGameEngine();
  
  @State board: Medal[] = [];
  @State handCards: ActionCard[] = [];
  @State currentTarget: TargetPattern | null = null;
  @State tutorialStep: number = 0;
  @State isPlaying: boolean = false;
  @State showTip: boolean = true;
  @State highlightPositions: number[] = [];
  @State highlightCard: number = -1;
  @State animationProgress: number = 0;
  
  private timer: number = -1;
  private animationTimer: number = -1;
  
  // 教程步骤定义
  private tutorialSteps: string[] = [
    '欢迎来到花样滑冰解谜游戏！\n让我们学习如何玩这个游戏。',
    '这是3×3的滑冰场地，每个格子上放着不同的奖牌。',
    '这是目标图案，我们需要在棋盘上凑出这个图案才能过关。',
    '这些是动作卡牌，每个卡牌代表一个花样滑冰动作。',
    '让我们使用 Spin（旋转）卡牌来翻转一列奖牌。',
    '点击卡牌后，再点击棋盘位置来执行动作。',
    '太棒了！我们成功完成了目标图案！',
    '现在你已经学会了基本操作，开始你的表演吧！'
  ];
  
  aboutToAppear(): void {
    this.initDemoGame();
  }
  
  aboutToDisappear(): void {
    this.stopAnimation();
  }
  
  initDemoGame(): void {
    // 创建一个简单的演示棋盘
    this.board = [
      new Medal(MedalType.GOLD, '0'),
      new Medal(MedalType.SILVER, '1'),
      new Medal(MedalType.BRONZE, '2'),
      new Medal(MedalType.SILVER, '3'),
      new Medal(MedalType.GOLD, '4'),
      new Medal(MedalType.BRONZE, '5'),
      new Medal(MedalType.BRONZE, '6'),
      new Medal(MedalType.SILVER, '7'),
      new Medal(MedalType.GOLD, '8')
    ];
    
    // 创建演示卡牌
    this.handCards = [
      new ActionCard(ActionType.SPIN, 'Spin', '翻转整列奖牌', 2, '🔄'),
      new ActionCard(ActionType.JUMP, 'Jump', '交换两堆奖牌', 3, '🦘'),
      new ActionCard(ActionType.POSE, 'Pose', '堆叠相邻奖牌', 2, '💃')
    ];
    
    // 创建演示目标
    this.currentTarget = new TargetPattern(
      [0, 1, 2],
      [MedalType.GOLD, MedalType.GOLD, MedalType.GOLD],
      '第一行全是金牌'
    );
  }
  
  startAutoPlay(): void {
    this.isPlaying = true;
    this.tutorialStep = 0;
    this.playNextStep();
  }
  
  playNextStep(): void {
    if (this.tutorialStep >= this.tutorialSteps.length) {
      this.isPlaying = false;
      return;
    }
    
    // 清除之前的高亮
    this.highlightPositions = [];
    this.highlightCard = -1;
    
    // 根据步骤设置演示效果
    switch (this.tutorialStep) {
      case 1: // 展示棋盘
        this.highlightPositions = [0, 1, 2, 3, 4, 5, 6, 7, 8];
        break;
      case 2: // 展示目标
        this.highlightPositions = [0, 1, 2];
        break;
      case 3: // 展示卡牌
        this.highlightCard = -2; // 所有卡牌
        break;
      case 4: // 选择Spin卡牌
        this.highlightCard = 0;
        break;
      case 5: // 执行动作
        this.highlightCard = 0;
        this.highlightPositions = [1];
        break;
      case 6: // 完成演示
        this.board = [
          new Medal(MedalType.GOLD, '0'),
          new Medal(MedalType.GOLD, '1'),
          new Medal(MedalType.GOLD, '2'),
          new Medal(MedalType.SILVER, '3'),
          new Medal(MedalType.BRONZE, '4'),
          new Medal(MedalType.BRONZE, '5'),
          new Medal(MedalType.BRONZE, '6'),
          new Medal(MedalType.SILVER, '7'),
          new Medal(MedalType.GOLD, '8')
        ];
        this.highlightPositions = [0, 1, 2];
        break;
    }
    
    // 动画进度
    this.startAnimation();
    
    // 自动进入下一步
    this.timer = setTimeout(() => {
      this.tutorialStep++;
      this.playNextStep();
    }, 3000);
  }
  
  startAnimation(): void {
    this.animationProgress = 0;
    this.animationTimer = setInterval(() => {
      this.animationProgress += 2;
      if (this.animationProgress >= 100) {
        this.animationProgress = 100;
        clearInterval(this.animationTimer);
      }
    }, 60);
  }
  
  stopAnimation(): void {
    if (this.timer !== -1) {
      clearTimeout(this.timer);
      this.timer = -1;
    }
    if (this.animationTimer !== -1) {
      clearInterval(this.animationTimer);
      this.animationTimer = -1;
    }
  }
  
  getMedalColor(type: MedalType): string {
    switch (type) {
      case MedalType.GOLD:
        return '#FFD700';
      case MedalType.SILVER:
        return '#C0C0C0';
      case MedalType.BRONZE:
        return '#CD7F32';
      default:
        return '#CCCCCC';
    }
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
  
  build() {
    Column() {
      // 顶部栏
      Row() {
        Button() {
          Text('跳过')
            .fontSize(16)
            .fontColor(Color.White)
        }
        .height(40)
        .backgroundColor('rgba(255,255,255,0.2)')
        .borderRadius(20)
        .onClick(() => {
          this.stopAnimation();
          router.replaceUrl({
            url: 'pages/PuzzleGamePage',
            params: { mode: GameMode.CLASSIC }
          });
        })
        
        Blank().layoutWeight(1)
        
        Text('📖 新手教程')
          .fontSize(20)
          .fontColor(Color.White)
          .fontWeight(FontWeight.Bold)
        
        Blank().layoutWeight(1)
        
        Blank().width(60)
      }
      .width('100%')
      .height(70)
      .padding({ left: 20, right: 20 })
      
      // 主内容区
      Column() {
        // 棋盘展示
        this.buildDemoBoard()
        
        // 目标展示
        if (this.currentTarget) {
          this.buildTargetDisplay()
        }
        
        // 卡牌展示
        this.buildDemoCards()
        
        // 提示文字
        this.buildTipText()
      }
      .layoutWeight(1)
      .width('100%')
      .padding(20)
      
      // 底部控制
      Row() {
        if (!this.isPlaying) {
          Button('开始演示')
            .width('80%')
            .height(50)
            .backgroundColor('#667eea')
            .borderRadius(25)
            .fontColor(Color.White)
            .fontSize(18)
            .onClick(() => {
              this.startAutoPlay();
            })
        } else {
          Row() {
            Text(`步骤 ${this.tutorialStep + 1}/${this.tutorialSteps.length}`)
              .fontSize(16)
              .fontColor(Color.White)
            
            // 进度条
            Row() {
              Row()
                .width(`${this.animationProgress}%`)
                .height('100%')
                .backgroundColor('#FFD700')
                .borderRadius(4)
            }
            .width(150)
            .height(8)
            .backgroundColor('rgba(255,255,255,0.3)')
            .borderRadius(4)
            .margin({ left: 15 })
          }
          .justifyContent(FlexAlign.Center)
          .width('100%')
        }
      }
      .width('100%')
      .height(80)
      .padding({ left: 20, right: 20 })
      .justifyContent(FlexAlign.Center)
    }
    .width('100%')
    .height('100%')
    .linearGradient({
      angle: 135,
      colors: [['#667eea', 0.0], ['#764ba2', 1.0]]
    })
  }
  
  @Builder
  buildDemoBoard() {
    Column() {
      Text('⛸️ 滑冰场地')
        .fontSize(16)
        .fontColor(Color.White)
        .fontWeight(FontWeight.Bold)
        .margin({ bottom: 10 })
      
      ForEach([0, 1, 2], (row: number) => {
        Row() {
          ForEach([0, 1, 2], (col: number) => {
            Column() {
              Text(this.getMedalIcon(this.board[row * 3 + col]?.type || MedalType.BRONZE))
                .fontSize(36)
            }
            .width(70)
            .height(70)
            .backgroundColor(this.getMedalColor(this.board[row * 3 + col]?.type || MedalType.BRONZE))
            .borderRadius(10)
            .justifyContent(FlexAlign.Center)
            .border({
              width: this.highlightPositions.includes(row * 3 + col) ? 3 : 1,
              color: this.highlightPositions.includes(row * 3 + col) ? '#FF6B6B' : 'rgba(255,255,255,0.3)'
            })
            .shadow({ radius: 5, color: 'rgba(0,0,0,0.3)', offsetX: 2, offsetY: 2 })
            .opacity(this.highlightPositions.length > 0 && !this.highlightPositions.includes(row * 3 + col) ? 0.5 : 1)
            .animation({
              duration: 300,
              curve: Curve.EaseInOut
            })
            .margin({ left: col === 0 ? 0 : 8 })
          }, (col: number) => col.toString())
        }
        .margin({ top: row === 0 ? 0 : 8 })
      }, (row: number) => row.toString())
    }
    .width('100%')
    .padding(15)
    .backgroundColor('rgba(255,255,255,0.1)')
    .borderRadius(15)
  }
  
  @Builder
  buildTargetDisplay() {
    Column() {
      Row() {
        Text('🎯 目标图案')
          .fontSize(16)
          .fontColor(Color.White)
          .fontWeight(FontWeight.Bold)
        
        Blank().layoutWeight(1)
        
        Text(this.currentTarget?.description || '')
          .fontSize(14)
          .fontColor('rgba(255,255,255,0.8)')
      }
      .width('100%')
      .margin({ bottom: 10 })
      
      Row() {
        ForEach(this.currentTarget?.requiredMedals || [], (medal: MedalType, index: number) => {
          Text(this.getMedalIcon(medal))
            .fontSize(30)
            .margin({ left: index === 0 ? 0 : 10 })
        }, (medal: MedalType, index: number) => index.toString())
      }
      .width('100%')
      .justifyContent(FlexAlign.Center)
    }
    .width('100%')
    .padding(15)
    .backgroundColor('rgba(255,255,255,0.1)')
    .borderRadius(15)
    .margin({ top: 15 })
  }
  
  @Builder
  buildDemoCards() {
    Column() {
      Text('🎴 动作卡牌')
        .fontSize(16)
        .fontColor(Color.White)
        .fontWeight(FontWeight.Bold)
        .margin({ bottom: 10 })
      
      Row() {
        ForEach(this.handCards, (card: ActionCard, index: number) => {
          Column() {
            Text(card.icon)
              .fontSize(28)
            
            Text(card.name)
              .fontSize(12)
              .fontColor(Color.White)
              .margin({ top: 5 })
          }
          .width(70)
          .height(80)
          .backgroundColor(this.highlightCard === index || this.highlightCard === -2 ? '#FF6B6B' : 'rgba(255,255,255,0.2)')
          .borderRadius(10)
          .justifyContent(FlexAlign.Center)
          .border({
            width: 2,
            color: this.highlightCard === index || this.highlightCard === -2 ? '#FF6B6B' : 'rgba(255,255,255,0.3)'
          })
          .opacity(this.highlightCard >= 0 && this.highlightCard !== index ? 0.5 : 1)
          .animation({
            duration: 300,
            curve: Curve.EaseInOut
          })
          .margin({ left: index === 0 ? 0 : 10 })
        }, (card: ActionCard, index: number) => index.toString())
      }
      .width('100%')
      .justifyContent(FlexAlign.Center)
    }
    .width('100%')
    .padding(15)
    .backgroundColor('rgba(255,255,255,0.1)')
    .borderRadius(15)
    .margin({ top: 15 })
  }
  
  @Builder
  buildTipText() {
    Column() {
      Text(this.tutorialSteps[this.tutorialStep] || '点击"开始演示"查看游戏玩法')
        .fontSize(16)
        .fontColor(Color.White)
        .textAlign(TextAlign.Center)
        .lineHeight(26)
        .padding(20)
    }
    .width('100%')
    .margin({ top: 20 })
    .padding(15)
    .backgroundColor('rgba(255,255,255,0.15)')
    .borderRadius(15)
  }
}
