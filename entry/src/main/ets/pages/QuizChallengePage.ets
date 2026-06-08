/**
 * 冰迹花滑 - 知识闯关题库
 * 趣味答题学习系统
 */

import { IceNavBar } from '../common/components/IceNavBar';
import { IceCard } from '../common/components/IceCard';
import { IceTag } from '../common/components/IceTag';

@Entry
@Component
struct QuizChallengePage {
  @State selectedMode: string = 'daily'; // daily, random, category
  @State selectedDifficulty: string = 'beginner'; // beginner, intermediate, advanced
  @State currentQuestion: QuizQuestion | null = null;
  @State selectedAnswer: number = -1;
  @State showResult: boolean = false;
  @State score: number = 0;
  @State totalQuestions: number = 0;
  
  // 题库分类
  private categories: QuizCategory[] = [
    { id: 'basics', name: '入门常识', icon: '📚', count: 50 },
    { id: 'elements', name: '动作识别', icon: '⛸️', count: 40 },
    { id: 'rules', name: '规则知识', icon: '📋', count: 35 },
    { id: 'history', name: '赛事历史', icon: '🏆', count: 30 },
    { id: 'skaters', name: '选手小知识', icon: '👤', count: 25 }
  ];
  
  // 示例题目
  private sampleQuestions: QuizQuestion[] = [
    {
      id: '1',
      category: 'basics',
      difficulty: 'beginner',
      question: '花样滑冰有几个项目？',
      options: ['3个', '4个', '5个', '6个'],
      correctAnswer: 1,
      explanation: '花样滑冰有4个正式比赛项目：男子单人滑、女子单人滑、双人滑、冰上舞蹈。'
    },
    {
      id: '2',
      category: 'elements',
      difficulty: 'beginner',
      question: '以下哪个是跳跃动作？',
      options: ['旋转', '托举', '阿克塞尔跳', '螺旋线'],
      correctAnswer: 2,
      explanation: '阿克塞尔跳(Axel)是花样滑冰的一种跳跃动作，是唯一向前起跳的跳跃。'
    },
    {
      id: '3',
      category: 'rules',
      difficulty: 'intermediate',
      question: 'GOE的取值范围是？',
      options: ['-3到+3', '-5到+5', '0到10', '-1到+1'],
      correctAnswer: 1,
      explanation: 'GOE(Grade of Execution)执行等级的取值范围是-5到+5，用于评估动作执行质量。'
    }
  ];
  
  aboutToAppear() {
    this.loadQuestion();
  }
  
  loadQuestion() {
    // 随机加载题目
    const randomIndex = Math.floor(Math.random() * this.sampleQuestions.length);
    this.currentQuestion = this.sampleQuestions[randomIndex];
    this.selectedAnswer = -1;
    this.showResult = false;
  }
  
  build() {
    Column() {
      // 导航栏
      IceNavBar({
        title: '知识闯关',
        showBack: true,
        navBackgroundColor: '#4FC3F7'
      });
      
      // 内容区
      Column() {
        // 模式选择
        this.buildModeSelector();
        
        // 题目区域
        if (this.currentQuestion) {
          this.buildQuestionArea();
        } else {
          this.buildCategoryList();
        }
      }
      .layoutWeight(1)
    }
    .width('100%')
    .height('100%')
    .backgroundColor('#F5F5F5')
  }
  
  // 模式选择器
  @Builder
  buildModeSelector() {
    Row() {
      this.ModeButton('每日闯关', 'daily', '📅');
      this.ModeButton('随机刷题', 'random', '🎲');
      this.ModeButton('专项练习', 'category', '📝');
    }
    .width('100%')
    .padding(16)
    .justifyContent(FlexAlign.SpaceEvenly)
  }
  
  @Builder
  ModeButton(title: string, mode: string, icon: string) {
    Column() {
      Text(icon)
        .fontSize(24)
      Text(title)
        .fontSize(12)
        .fontColor(this.selectedMode === mode ? '#4FC3F7' : '#666666')
        .margin({ top: 4 })
    }
    .width(90)
    .height(70)
    .backgroundColor(this.selectedMode === mode ? '#E3F2FD' : '#FFFFFF')
    .borderRadius(12)
    .justifyContent(FlexAlign.Center)
    .onClick(() => {
      this.selectedMode = mode;
      if (mode !== 'category') {
        this.loadQuestion();
      } else {
        this.currentQuestion = null;
      }
    })
  }
  
  // 题目区域
  @Builder
  buildQuestionArea() {
    Scroll() {
      Column() {
        // 进度信息
        this.buildProgressInfo();
        
        // 题目卡片
        this.buildQuestionCard();
        
        // 选项列表
        this.buildOptionsList();
        
        // 结果解析
        if (this.showResult) {
          this.buildResultExplanation();
        }
        
        // 下一题按钮
        if (this.showResult) {
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
  buildProgressInfo() {
    Row() {
      Text(`第 ${this.totalQuestions + 1} 题`)
        .fontSize(14)
        .fontColor('#666666')
      
      Blank()
      
      Text(`得分: ${this.score}`)
        .fontSize(14)
        .fontWeight(FontWeight.Bold)
        .fontColor('#4FC3F7')
    }
    .width('100%')
    .padding({ bottom: 16 })
  }
  
  @Builder
  buildQuestionCard() {
    Column() {
      Row() {
        IceTag({ 
          text: this.getDifficultyName(this.currentQuestion!.difficulty), 
          type: this.currentQuestion!.difficulty === 'beginner' ? 'success' : 
                this.currentQuestion!.difficulty === 'intermediate' ? 'warning' : 'danger',
          tagSize: 'small'
        })
        
        Blank()
        
        Text(this.getCategoryName(this.currentQuestion!.category))
          .fontSize(12)
          .fontColor('#999999')
      }
      .width('100%')
      .margin({ bottom: 16 })
      
      Text(this.currentQuestion!.question)
        .fontSize(18)
        .fontWeight(FontWeight.Bold)
        .fontColor('#333333')
        .lineHeight(28)
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
        }
      }
    })
  }
  
  @Builder
  buildResultExplanation() {
    Column() {
      Row() {
        Text(this.selectedAnswer === this.currentQuestion!.correctAnswer ? '✅ 回答正确！' : '❌ 回答错误')
          .fontSize(16)
          .fontWeight(FontWeight.Bold)
          .fontColor(this.selectedAnswer === this.currentQuestion!.correctAnswer ? '#4CAF50' : '#F44336')
      }
      .width('100%')
      .margin({ bottom: 12 })
      
      Text('解析：')
        .fontSize(14)
        .fontWeight(FontWeight.Bold)
        .fontColor('#333333')
        .margin({ bottom: 8 })
      
      Text(this.currentQuestion!.explanation)
        .fontSize(14)
        .fontColor('#666666')
        .lineHeight(22)
    }
    .width('100%')
    .padding(16)
    .backgroundColor('#F5F5F5')
    .borderRadius(12)
    .margin({ bottom: 16 })
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
        this.loadQuestion();
      })
  }
  
  // 分类列表
  @Builder
  buildCategoryList() {
    Scroll() {
      Column() {
        Text('选择题目分类')
          .fontSize(18)
          .fontWeight(FontWeight.Bold)
          .fontColor('#333333')
          .margin({ bottom: 16 })
        
        ForEach(this.categories, (category: QuizCategory) => {
          this.CategoryCard(category);
        }, (category: QuizCategory) => category.id)
      }
      .width('100%')
      .padding(16)
    }
    .layoutWeight(1)
    .scrollBar(BarState.Auto)
  }
  
  @Builder
  CategoryCard(category: QuizCategory) {
    Row() {
      Text(category.icon)
        .fontSize(40)
        .margin({ right: 16 })
      
      Column() {
        Text(category.name)
          .fontSize(16)
          .fontWeight(FontWeight.Bold)
          .fontColor('#333333')
        
        Text(`${category.count} 道题目`)
          .fontSize(12)
          .fontColor('#999999')
          .margin({ top: 4 })
      }
      .alignItems(HorizontalAlign.Start)
      .layoutWeight(1)
      
      Text('›')
        .fontSize(20)
        .fontColor('#999999')
    }
    .width('100%')
    .padding(16)
    .backgroundColor('#FFFFFF')
    .borderRadius(12)
    .margin({ bottom: 12 })
    .onClick(() => {
      this.loadQuestion();
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
      'beginner': '萌新',
      'intermediate': '进阶',
      'advanced': '资深'
    };
    return names[difficulty] || difficulty;
  }
  
  private getCategoryName(category: string): string {
    const names: Record<string, string> = {
      'basics': '入门常识',
      'elements': '动作识别',
      'rules': '规则知识',
      'history': '赛事历史',
      'skaters': '选手小知识'
    };
    return names[category] || category;
  }
}

// 数据类型
interface QuizCategory {
  id: string;
  name: string;
  icon: string;
  count: number;
}

interface QuizQuestion {
  id: string;
  category: string;
  difficulty: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}
