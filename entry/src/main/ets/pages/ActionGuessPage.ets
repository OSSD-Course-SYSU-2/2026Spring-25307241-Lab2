/**
 * 冰迹花滑 - 动作猜猜看
 * 趣味互动游戏，看图猜动作
 */

import { IceNavBar } from '../common/components/IceNavBar';
import { IceCard } from '../common/components/IceCard';
import { IceTag } from '../common/components/IceTag';

@Entry
@Component
struct ActionGuessPage {
  @State currentQuestion: GuessQuestion | null = null;
  @State selectedAnswer: number = -1;
  @State showResult: boolean = false;
  @State score: number = 0;
  @State totalQuestions: number = 0;
  @State streak: number = 0; // 连续答对次数
  @State gameMode: string = 'action'; // action, difficulty
  
  // 题库
  private questions: GuessQuestion[] = [
    {
      id: '1',
      type: 'action',
      emoji: '🦘',
      hint: '这是花样滑冰中最难的一种跳跃',
      options: ['阿克塞尔跳', '鲁兹跳', '萨霍夫跳', '后外点冰跳'],
      correctAnswer: 0,
      explanation: '阿克塞尔跳(Axel)是唯一向前起跳的跳跃，难度最高，基础分值也最大。',
      difficulty: 'advanced'
    },
    {
      id: '2',
      type: 'action',
      emoji: '🔄',
      hint: '这是一种直立旋转，手臂呈特定姿势',
      options: ['弓身旋转', '贝尔曼旋转', '直立旋转', '蹲转'],
      correctAnswer: 2,
      explanation: '直立旋转(Upright Spin)是最基础的旋转类型，选手保持直立姿势旋转。',
      difficulty: 'beginner'
    },
    {
      id: '3',
      type: 'difficulty',
      emoji: '⚡',
      hint: '这个动作的基础分值是11.50',
      options: ['4T (四周后外点冰)', '4S (四周萨霍夫)', '4Lz (四周鲁兹)', '4A (四周阿克塞尔)'],
      correctAnswer: 2,
      explanation: '四周鲁兹跳(4Lz)的基础分值是11.50分，是四周跳中难度第二高的跳跃。',
      difficulty: 'intermediate'
    },
    {
      id: '4',
      type: 'action',
      emoji: '💃',
      hint: '这是冰上舞蹈特有的动作',
      options: ['托举', '螺旋线', '捻转托举', '双人联合旋转'],
      correctAnswer: 1,
      explanation: '螺旋线(Spiral Sequence)是冰上舞蹈的特色动作，女选手在冰上滑行时保持优美姿势。',
      difficulty: 'intermediate'
    },
    {
      id: '5',
      type: 'difficulty',
      emoji: '🎯',
      hint: '这个动作需要选手蹲下旋转',
      options: ['直立旋转', '蹲转', '弓身旋转', '飞旋转'],
      correctAnswer: 1,
      explanation: '蹲转(Sit Spin)要求选手在旋转时保持蹲姿，是大纲中规定的旋转类型之一。',
      difficulty: 'beginner'
    }
  ];
  
  aboutToAppear() {
    this.loadRandomQuestion();
  }
  
  loadRandomQuestion() {
    const randomIndex = Math.floor(Math.random() * this.questions.length);
    this.currentQuestion = this.questions[randomIndex];
    this.selectedAnswer = -1;
    this.showResult = false;
  }
  
  build() {
    Column() {
      // 导航栏
      IceNavBar({
        title: '动作猜猜看',
        showBack: true,
        navBackgroundColor: '#4FC3F7'
      });
      
      // 内容区
      Column() {
        // 游戏状态栏
        this.buildGameStatus();
        
        // 题目区域
        if (this.currentQuestion) {
          this.buildQuestionArea();
        }
      }
      .layoutWeight(1)
    }
    .width('100%')
    .height('100%')
    .backgroundColor('#F5F5F5')
  }
  
  // 游戏状态栏
  @Builder
  buildGameStatus() {
    Row() {
      Column() {
        Text('得分')
          .fontSize(12)
          .fontColor('#999999')
        Text(this.score.toString())
          .fontSize(20)
          .fontWeight(FontWeight.Bold)
          .fontColor('#4FC3F7')
      }
      .layoutWeight(1)
      
      Column() {
        Text('题目')
          .fontSize(12)
          .fontColor('#999999')
        Text(this.totalQuestions.toString())
          .fontSize(20)
          .fontWeight(FontWeight.Bold)
          .fontColor('#666666')
      }
      .layoutWeight(1)
      
      Column() {
        Text('连胜')
          .fontSize(12)
          .fontColor('#999999')
        Text(this.streak.toString())
          .fontSize(20)
          .fontWeight(FontWeight.Bold)
          .fontColor('#FFA726')
      }
      .layoutWeight(1)
    }
    .width('100%')
    .padding(16)
    .backgroundColor('#FFFFFF')
    .margin({ bottom: 16 })
  }
  
  // 题目区域
  @Builder
  buildQuestionArea() {
    Scroll() {
      Column() {
        // 题目卡片
        this.buildQuestionCard();
        
        // 选项列表
        this.buildOptionsList();
        
        // 结果解析
        if (this.showResult) {
          this.buildResultExplanation();
          
          // 下一题按钮
          this.buildNextButton();
        }
      }
      .width('100%')
      .padding(16)
    }
    .layoutWeight(1)
    .scrollBar(BarState.Auto)
  }
  
  @Builder
  buildQuestionCard() {
    Column() {
      // Emoji图标
      Column() {
        Text(this.currentQuestion!.emoji)
          .fontSize(80)
      }
      .width('100%')
      .height(150)
      .justifyContent(FlexAlign.Center)
      .backgroundColor('#E3F2FD')
      .borderRadius(12)
      .margin({ bottom: 16 })
      
      // 题目类型标签
      Row() {
        IceTag({ 
          text: this.currentQuestion!.type === 'action' ? '猜动作' : '猜难度', 
          type: 'primary',
          tagSize: 'small'
        })
        
        Blank()
        
        IceTag({ 
          text: this.getDifficultyName(this.currentQuestion!.difficulty), 
          type: this.currentQuestion!.difficulty === 'beginner' ? 'success' : 
                this.currentQuestion!.difficulty === 'intermediate' ? 'warning' : 'danger',
          tagSize: 'small'
        })
      }
      .width('100%')
      .margin({ bottom: 12 })
      
      // 提示文字
      Text('💡 提示：' + this.currentQuestion!.hint)
        .fontSize(16)
        .fontColor('#333333')
        .lineHeight(24)
        .textAlign(TextAlign.Center)
    }
    .width('100%')
    .padding(20)
    .backgroundColor('#FFFFFF')
    .borderRadius(12)
    .margin({ bottom: 16 })
  }
  
  @Builder
  buildOptionsList() {
    Column() {
      ForEach(this.currentQuestion!.options, (option: string, index: number) => {
        this.OptionItem(option, index);
      }, (option: string, index: number) => index.toString())
    }
    .width('100%')
  }
  
  @Builder
  OptionItem(option: string, index: number) {
    Row() {
      Text(String.fromCharCode(65 + index))
        .fontSize(16)
        .fontWeight(FontWeight.Bold)
        .fontColor(this.getOptionTextColor(index))
        .width(30)
      
      Text(option)
        .fontSize(16)
        .fontColor(this.getOptionTextColor(index))
        .layoutWeight(1)
    }
    .width('100%')
    .padding(16)
    .backgroundColor(this.getOptionBackgroundColor(index))
    .borderRadius(12)
    .margin({ bottom: 12 })
    .onClick(() => {
      if (!this.showResult) {
        this.selectedAnswer = index;
        this.showResult = true;
        this.totalQuestions++;
        
        if (index === this.currentQuestion!.correctAnswer) {
          this.score += 10;
          this.streak++;
        } else {
          this.streak = 0;
        }
      }
    })
  }
  
  @Builder
  buildResultExplanation() {
    Column() {
      Row() {
        if (this.selectedAnswer === this.currentQuestion!.correctAnswer) {
          Text('✅ 回答正确！')
            .fontSize(16)
            .fontWeight(FontWeight.Bold)
            .fontColor('#4CAF50')
          
          if (this.streak > 1) {
            Text(` 连胜 ${this.streak} 题！`)
              .fontSize(14)
              .fontColor('#FFA726')
          }
        } else {
          Text('❌ 回答错误')
            .fontSize(16)
            .fontWeight(FontWeight.Bold)
            .fontColor('#F44336')
        }
      }
      .width('100%')
      .margin({ bottom: 12 })
      
      Text('正确答案：' + this.currentQuestion!.options[this.currentQuestion!.correctAnswer])
        .fontSize(14)
        .fontWeight(FontWeight.Bold)
        .fontColor('#333333')
        .margin({ bottom: 8 })
      
      Text('解析：' + this.currentQuestion!.explanation)
        .fontSize(14)
        .fontColor('#666666')
        .lineHeight(22)
    }
    .width('100%')
    .padding(16)
    .backgroundColor('#F5F5F5')
    .borderRadius(12)
    .margin({ bottom: 16 })
    .alignItems(HorizontalAlign.Start)
  }
  
  @Builder
  buildNextButton() {
    Button('下一题')
      .width('100%')
      .height(50)
      .backgroundColor('#4FC3F7')
      .fontColor('#FFFFFF')
      .fontSize(16)
      .fontWeight(FontWeight.Bold)
      .borderRadius(25)
      .onClick(() => {
        this.loadRandomQuestion();
      })
  }
  
  // 辅助方法
  private getOptionBackgroundColor(index: number): string {
    if (!this.showResult) {
      return this.selectedAnswer === index ? '#E3F2FD' : '#FFFFFF';
    } else {
      if (index === this.currentQuestion!.correctAnswer) {
        return '#E8F5E9';
      } else if (index === this.selectedAnswer) {
        return '#FFEBEE';
      } else {
        return '#FFFFFF';
      }
    }
  }
  
  private getOptionTextColor(index: number): string {
    if (!this.showResult) {
      return this.selectedAnswer === index ? '#1976D2' : '#333333';
    } else {
      if (index === this.currentQuestion!.correctAnswer) {
        return '#4CAF50';
      } else if (index === this.selectedAnswer) {
        return '#F44336';
      } else {
        return '#333333';
      }
    }
  }
  
  private getDifficultyName(difficulty: string): string {
    const names: Record<string, string> = {
      'beginner': '简单',
      'intermediate': '中等',
      'advanced': '困难'
    };
    return names[difficulty] || difficulty;
  }
}

// 数据类型
interface GuessQuestion {
  id: string;
  type: string; // action, difficulty
  emoji: string;
  hint: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: string;
}
