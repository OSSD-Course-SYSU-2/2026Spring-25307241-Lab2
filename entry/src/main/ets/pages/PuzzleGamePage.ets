/*
 * 花样滑冰解谜游戏 - 主界面
 * Copyright (c) 2024
 */

import router from '@ohos.router';
import { PuzzleGameEngine } from '../common/util/PuzzleGameEngine';
import {
  Medal, MedalType, ActionType, ActionCard,
  TargetPattern, GameMode, GameState, PlayerScore
} from '../viewmodel/PuzzleGameModel';

@Entry
@Component
struct PuzzleGamePage {
  private gameEngine: PuzzleGameEngine = new PuzzleGameEngine();
  
  @State gameMode: GameMode = GameMode.CLASSIC;
  @State board: Medal[] = [];
  @State handCards: ActionCard[] = [];
  @State currentTarget: TargetPattern | null = null;
  @State allTargets: TargetPattern[] = [];
  @State gameState: GameState = GameState.READY;
  @State playerScore: PlayerScore = new PlayerScore();
  @State selectedCardIndex: number = -1;
  @State selectedPosition: number = -1;
  @State elapsedTime: number = 0;
  @State showResult: boolean = false;
  @State showHelp: boolean = false;
  
  private timer: number = -1;
  
  aboutToAppear(): void {
    const params = router.getParams() as Record<string, GameMode>;
    if (params && params['mode']) {
      this.gameMode = params['mode'];
    }
    this.startNewGame();
  }
  
  aboutToDisappear(): void {
    if (this.timer !== -1) {
      clearInterval(this.timer);
    }
  }
  
  startNewGame(): void {
    this.gameEngine.initializeGame(this.gameMode);
    this.gameEngine.startGame();
    this.updateGameState();
    this.startTimer();
  }
  
  updateGameState(): void {
    this.board = this.gameEngine.getBoard();
    this.handCards = this.gameEngine.getHandCards();
    this.currentTarget = this.gameEngine.getCurrentTarget();
    this.allTargets = this.gameEngine.getAllTargets();
    this.gameState = this.gameEngine.getGameState();
    this.playerScore = this.gameEngine.getPlayerScore();
    
    if (this.gameState === GameState.COMPLETED) {
      this.stopTimer();
      this.showResult = true;
    }
  }
  
  startTimer(): void {
    this.elapsedTime = 0;
    this.timer = setInterval(() => {
      this.elapsedTime++;
    }, 1000);
  }
  
  stopTimer(): void {
    if (this.timer !== -1) {
      clearInterval(this.timer);
      this.timer = -1;
    }
  }
  
  useCard(cardIndex: number): void {
    if (this.gameState !== GameState.PLAYING) return;
    
    this.selectedCardIndex = cardIndex;
    const card = this.handCards[cardIndex];
    if (this.needsPositionSelection(card.type)) {
      return;
    }
    
    const params: ESObject = {};
    const success = this.gameEngine.executeAction(cardIndex, params);
    if (success) {
      this.updateGameState();
    } else {
      this.selectedCardIndex = -1;
    }
  }
  
  clickBoardPosition(pos: number): void {
    if (this.selectedCardIndex === -1) return;
    
    const card = this.handCards[this.selectedCardIndex];
    let params: ESObject = {};
    
    switch (card.type) {
      case ActionType.SPIN:
        params.column = pos % 3;
        break;
      case ActionType.JUMP:
        if (this.selectedPosition === -1) {
          this.selectedPosition = pos;
          return;
        }
        params.pos1 = this.selectedPosition;
        params.pos2 = pos;
        this.selectedPosition = -1;
        break;
      case ActionType.POSE:
        if (this.selectedPosition === -1) {
          this.selectedPosition = pos;
          return;
        }
        params.from = this.selectedPosition;
        params.to = pos;
        this.selectedPosition = -1;
        break;
      default:
        params.pos = pos;
        break;
    }
    
    const success = this.gameEngine.executeAction(this.selectedCardIndex, params);
    if (success) {
      this.updateGameState();
    }
    this.selectedCardIndex = -1;
  }
  
  needsPositionSelection(type: ActionType): boolean {
    return [
      ActionType.SPIN, ActionType.JUMP, ActionType.POSE,
      ActionType.PIROUETTE, ActionType.AXEL, ActionType.LUTZ,
      ActionType.FLIP, ActionType.LOOP, ActionType.SALCHOW,
      ActionType.TOE_LOOP, ActionType.CAMEL, ActionType.SIT,
      ActionType.UPRIGHT, ActionType.SPIRAL, ActionType.STEP
    ].includes(type);
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
  
  formatTime(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }
  
  build() {
    Stack() {
      Column() {
        if (this.showResult) {
          this.buildResultPage()
        } else {
          this.buildGamePage()
        }
      }
      .width('100%')
      .height('100%')
      
      // 帮助弹窗
      if (this.showHelp) {
        Column() {
          this.buildHelpDialog()
        }
        .width('100%')
        .height('100%')
        .justifyContent(FlexAlign.Center)
        .alignItems(HorizontalAlign.Center)
        .backgroundColor('rgba(0,0,0,0.5)')
        .onClick(() => {
          this.showHelp = false;
        })
      }
    }
    .width('100%')
    .height('100%')
  }
  
  @Builder
  buildGamePage() {
    Column() {
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
        
        Text(this.gameMode === GameMode.CLASSIC ? '经典模式' : '每日挑战')
          .fontSize(18)
          .fontColor(Color.White)
          .fontWeight(FontWeight.Bold)
        
        Blank().layoutWeight(1)
        
        Row() {
          Button() {
            Text('?')
              .fontSize(20)
              .fontColor(Color.White)
              .fontWeight(FontWeight.Bold)
          }
          .width(40)
          .height(40)
          .backgroundColor('rgba(255,255,255,0.2)')
          .borderRadius(20)
          .onClick(() => {
            this.showHelp = true;
          })
          
          Text('⏱️')
            .fontSize(20)
            .margin({ left: 10 })
          Text(this.formatTime(this.elapsedTime))
            .fontSize(16)
            .fontColor(Color.White)
            .margin({ left: 5 })
        }
      }
      .width('100%')
      .height(60)
      .padding({ left: 20, right: 20 })
      
      Column() {
        this.buildTargetSection()
        this.buildBoard()
        this.buildHandCards()
      }
      .layoutWeight(1)
      .width('100%')
      .padding(20)
      
      Row() {
        Button('重新开始')
          .width('40%')
          .height(45)
          .backgroundColor('rgba(255,255,255,0.2)')
          .borderRadius(25)
          .fontColor(Color.White)
          .onClick(() => {
            this.stopTimer();
            this.startNewGame();
          })
        
        Blank().layoutWeight(1)
        
        Button('暂停')
          .width('40%')
          .height(45)
          .backgroundColor('rgba(255,255,255,0.2)')
          .borderRadius(25)
          .fontColor(Color.White)
          .onClick(() => {
            if (this.gameState === GameState.PLAYING) {
              this.gameEngine.pauseGame();
              this.stopTimer();
            } else if (this.gameState === GameState.PAUSED) {
              this.gameEngine.resumeGame();
              this.startTimer();
            }
            this.gameState = this.gameEngine.getGameState();
          })
      }
      .width('100%')
      .height(80)
      .padding({ left: 20, right: 20 })
    }
    .width('100%')
    .height('100%')
    .linearGradient({
      angle: 135,
      colors: [['#667eea', 0.0], ['#764ba2', 1.0]]
    })
  }
  
  @Builder
  buildResultPage() {
    Column() {
      Text('🎉 表演完成！')
        .fontSize(28)
        .fontWeight(FontWeight.Bold)
        .fontColor(Color.White)
        .margin({ top: 80, bottom: 30 })
      
      Text(this.getMedalIcon(this.playerScore.medal))
        .fontSize(80)
        .margin({ bottom: 30 })
      
      Column() {
        Row() {
          Text('完成图案')
            .fontSize(16)
            .fontColor('rgba(255,255,255,0.8)')
          Blank().layoutWeight(1)
          Text(`${this.playerScore.patternsCompleted}/${this.allTargets.length}`)
            .fontSize(20)
            .fontWeight(FontWeight.Bold)
            .fontColor(Color.White)
        }
        .width('100%')
        .margin({ top: 10 })
        
        Row() {
          Text('总移动次数')
            .fontSize(16)
            .fontColor('rgba(255,255,255,0.8)')
          Blank().layoutWeight(1)
          Text(`${this.playerScore.moves}`)
            .fontSize(20)
            .fontWeight(FontWeight.Bold)
            .fontColor(Color.White)
        }
        .width('100%')
        .margin({ top: 10 })
        
        Row() {
          Text('失误次数')
            .fontSize(16)
            .fontColor('rgba(255,255,255,0.8)')
          Blank().layoutWeight(1)
          Text(`${this.playerScore.mistakes}`)
            .fontSize(20)
            .fontWeight(FontWeight.Bold)
            .fontColor(Color.White)
        }
        .width('100%')
        .margin({ top: 10 })
        
        Row() {
          Text('用时')
            .fontSize(16)
            .fontColor('rgba(255,255,255,0.8)')
          Blank().layoutWeight(1)
          Text(this.formatTime(this.playerScore.time))
            .fontSize(20)
            .fontWeight(FontWeight.Bold)
            .fontColor(Color.White)
        }
        .width('100%')
        .margin({ top: 10 })
        
        Row() {
          Text('总分')
            .fontSize(16)
            .fontColor('rgba(255,255,255,0.8)')
          Blank().layoutWeight(1)
          Text(`${this.playerScore.score}`)
            .fontSize(20)
            .fontWeight(FontWeight.Bold)
            .fontColor('#FFD700')
        }
        .width('100%')
        .margin({ top: 10 })
      }
      .width('85%')
      .padding(25)
      .backgroundColor('rgba(255,255,255,0.15)')
      .borderRadius(20)
      .margin({ bottom: 40 })
      
      Row() {
        Button('再来一局')
          .width('45%')
          .height(50)
          .backgroundColor('#667eea')
          .borderRadius(25)
          .fontColor(Color.White)
          .fontSize(18)
          .onClick(() => {
            this.showResult = false;
            this.startNewGame();
          })
        
        Button('返回')
          .width('45%')
          .height(50)
          .backgroundColor('rgba(255,255,255,0.3)')
          .borderRadius(25)
          .fontColor(Color.White)
          .fontSize(18)
          .onClick(() => {
            router.back();
          })
          .margin({ left: 10 })
      }
      .width('85%')
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
  buildTargetSection() {
    Column() {
      Text('当前目标')
        .fontSize(16)
        .fontColor(Color.White)
        .fontWeight(FontWeight.Bold)
      
      if (this.currentTarget) {
        Row() {
          Text(this.currentTarget.description)
            .fontSize(14)
            .fontColor('rgba(255,255,255,0.8)')
          
          Text('需要: ')
            .fontSize(14)
            .fontColor('rgba(255,255,255,0.8)')
            .margin({ left: 10 })
          
          ForEach(this.currentTarget.requiredMedals, (medal: MedalType, index: number) => {
            Text(this.getMedalIcon(medal))
              .fontSize(20)
          }, (medal: MedalType, index: number) => index.toString())
        }
        .margin({ top: 10 })
        
        Row() {
          Text(`进度: ${this.playerScore.patternsCompleted}/${this.allTargets.length}`)
            .fontSize(14)
            .fontColor('rgba(255,255,255,0.8)')
          
          Text(`失误: ${this.playerScore.mistakes}`)
            .fontSize(14)
            .fontColor(this.playerScore.mistakes > 0 ? '#FF6B6B' : 'rgba(255,255,255,0.8)')
            .margin({ left: 20 })
        }
        .margin({ top: 5 })
      }
    }
    .width('100%')
    .padding(15)
    .backgroundColor('rgba(255,255,255,0.1)')
    .borderRadius(15)
    .margin({ bottom: 20 })
  }
  
  @Builder
  buildBoard() {
    Column() {
      ForEach([0, 1, 2], (row: number) => {
        Row() {
          ForEach([0, 1, 2], (col: number) => {
            Column() {
              Text(this.getMedalIcon(this.board[row * 3 + col]?.type || MedalType.BRONZE))
                .fontSize(40)
            }
            .width(80)
            .height(80)
            .backgroundColor(this.getMedalColor(this.board[row * 3 + col]?.type || MedalType.BRONZE))
            .borderRadius(10)
            .justifyContent(FlexAlign.Center)
            .border({
              width: this.selectedPosition === row * 3 + col ? 3 : 1,
              color: this.selectedPosition === row * 3 + col ? '#FF6B6B' : 'rgba(255,255,255,0.3)'
            })
            .shadow({ radius: 5, color: 'rgba(0,0,0,0.3)', offsetX: 2, offsetY: 2 })
            .onClick(() => {
              this.clickBoardPosition(row * 3 + col);
            })
            .margin({ left: col === 0 ? 0 : 10 })
          }, (col: number) => col.toString())
        }
        .margin({ top: row === 0 ? 0 : 10 })
      }, (row: number) => row.toString())
    }
    .width('100%')
    .justifyContent(FlexAlign.Center)
    .padding(20)
    .backgroundColor('rgba(255,255,255,0.1)')
    .borderRadius(15)
  }
  
  @Builder
  buildHandCards() {
    Column() {
      Text('动作卡牌')
        .fontSize(16)
        .fontColor(Color.White)
        .fontWeight(FontWeight.Bold)
        .margin({ bottom: 10 })
      
      Scroll() {
        Row() {
          ForEach(this.handCards, (card: ActionCard, index: number) => {
            Column() {
              Text(card.icon)
                .fontSize(30)
              
              Text(card.name)
                .fontSize(12)
                .fontColor(Color.White)
                .margin({ top: 5 })
              
              Text(`难度: ${card.difficulty}`)
                .fontSize(10)
                .fontColor('rgba(255,255,255,0.7)')
                .margin({ top: 2 })
            }
            .width(80)
            .height(100)
            .backgroundColor(this.selectedCardIndex === index ? '#FF6B6B' : 'rgba(255,255,255,0.2)')
            .borderRadius(10)
            .justifyContent(FlexAlign.Center)
            .border({
              width: 2,
              color: this.selectedCardIndex === index ? '#FF6B6B' : 'rgba(255,255,255,0.3)'
            })
            .onClick(() => {
              this.useCard(index);
            })
            .margin({ left: index === 0 ? 0 : 10 })
          }, (card: ActionCard, index: number) => index.toString())
        }
      }
      .scrollable(ScrollDirection.Horizontal)
      .width('100%')
      .height(120)
    }
    .width('100%')
    .padding(15)
    .backgroundColor('rgba(255,255,255,0.1)')
    .borderRadius(15)
    .margin({ top: 20 })
  }
  
  // 帮助弹窗
  @Builder
  buildHelpDialog() {
    Column() {
      // 标题
      Row() {
        Text('📖 游戏玩法')
          .fontSize(22)
          .fontWeight(FontWeight.Bold)
          .fontColor(Color.White)
        
        Blank().layoutWeight(1)
        
        Button() {
          Text('✕')
            .fontSize(20)
            .fontColor(Color.White)
        }
        .width(36)
        .height(36)
        .backgroundColor('rgba(255,255,255,0.2)')
        .borderRadius(18)
        .onClick(() => {
          this.showHelp = false;
        })
      }
      .width('100%')
      .margin({ bottom: 20 })
      
      Scroll() {
        Column() {
          // 游戏目标
          this.buildHelpSection('🎯 游戏目标', [
            '在3×3棋盘上凑出指定的奖牌图案',
            '连续完成6组图案即可通关',
            '用时越短、失误越少，分数越高'
          ])
          
          // 操作方法
          this.buildHelpSection('🎮 操作方法', [
            '1. 点击下方卡牌选择要执行的动作',
            '2. 点击棋盘位置执行动作效果',
            '3. 部分卡牌需要选择两个位置',
            '4. 完成目标图案后自动进入下一关'
          ])
          
          // 核心卡牌
          Column() {
            Text('🎴 核心卡牌')
              .fontSize(18)
              .fontWeight(FontWeight.Bold)
              .fontColor(Color.White)
              .width('100%')
              .margin({ bottom: 12 })
            
            this.buildCardHelp('🔄 Spin', '翻转整列奖牌', '点击后选择列')
            this.buildCardHelp('🦘 Jump', '交换两堆奖牌', '点击后选择两个位置')
            this.buildCardHelp('💃 Pose', '堆叠相邻奖牌', '点击后选择目标位置')
            this.buildCardHelp('🎀 Pirouette', '交换侧边奖牌', '点击后选择位置')
          }
          .width('100%')
          .padding(15)
          .backgroundColor('rgba(255,255,255,0.1)')
          .borderRadius(12)
          .margin({ bottom: 15 })
          
          // 奖牌说明
          this.buildHelpSection('🏆 奖牌评分', [
            '🥇 金牌：零失误，完美表演',
            '🥈 银牌：仅1次失误',
            '🥉 铜牌：2次失误'
          ])
          
          // 提示
          Column() {
            Text('💡 小提示')
              .fontSize(16)
              .fontWeight(FontWeight.Bold)
              .fontColor('#FFD700')
              .width('100%')
              .margin({ bottom: 8 })
            
            Text('观察目标图案，规划好步骤再操作，可以减少失误次数！')
              .fontSize(14)
              .fontColor('rgba(255,255,255,0.9)')
              .lineHeight(22)
          }
          .width('100%')
          .padding(15)
          .backgroundColor('rgba(255,255,255,0.1)')
          .borderRadius(12)
        }
        .width('100%')
      }
      .layoutWeight(1)
      .scrollBar(BarState.Auto)
      .edgeEffect(EdgeEffect.Spring)
      
      // 关闭按钮
      Button('知道了')
        .width('100%')
        .height(50)
        .backgroundColor('#667eea')
        .borderRadius(25)
        .fontColor(Color.White)
        .fontSize(18)
        .margin({ top: 15 })
        .onClick(() => {
          this.showHelp = false;
        })
    }
    .width('90%')
    .constraintSize({ maxHeight: '80%' })
    .padding(20)
    .backgroundColor('rgba(102,126,234,0.95)')
    .borderRadius(20)
    .shadow({ radius: 20, color: 'rgba(0,0,0,0.3)', offsetX: 0, offsetY: 10 })
  }
  
  @Builder
  buildHelpSection(title: string, items: string[]) {
    Column() {
      Text(title)
        .fontSize(18)
        .fontWeight(FontWeight.Bold)
        .fontColor(Color.White)
        .width('100%')
        .margin({ bottom: 12 })
      
      ForEach(items, (item: string, index: number) => {
        Row() {
          Text('•')
            .fontSize(14)
            .fontColor('rgba(255,255,255,0.8)')
          
          Text(item)
            .fontSize(14)
            .fontColor('rgba(255,255,255,0.9)')
            .margin({ left: 8 })
            .layoutWeight(1)
        }
        .width('100%')
        .margin({ bottom: 6 })
      }, (item: string, index: number) => index.toString())
    }
    .width('100%')
    .padding(15)
    .backgroundColor('rgba(255,255,255,0.1)')
    .borderRadius(12)
    .margin({ bottom: 15 })
  }
  
  @Builder
  buildCardHelp(icon: string, desc: string, tip: string) {
    Row() {
      Text(icon)
        .fontSize(20)
        .width(50)
      
      Column() {
        Text(desc)
          .fontSize(14)
          .fontColor(Color.White)
        
        Text(tip)
          .fontSize(12)
          .fontColor('rgba(255,255,255,0.7)')
          .margin({ top: 2 })
      }
      .alignItems(HorizontalAlign.Start)
      .layoutWeight(1)
    }
    .width('100%')
    .padding(8)
    .margin({ bottom: 8 })
  }
}
