/**
 * 冰迹花滑 - 节目赏析专区
 * 精选经典节目，按风格分类，附带解说
 */

import router from '@ohos.router';
import { IceNavBar } from '../common/components/IceNavBar';
import { IceCard } from '../common/components/IceCard';
import { IceTag } from '../common/components/IceTag';

@Entry
@Component
struct ProgramAppreciationPage {
  @State selectedStyle: string = 'all'; // all, beautiful, passionate, chinese, classical
  
  // 风格分类
  private styles: ProgramStyle[] = [
    { id: 'all', name: '全部', icon: '✨' },
    { id: 'beautiful', name: '唯美', icon: '🌸' },
    { id: 'passionate', name: '热血', icon: '🔥' },
    { id: 'chinese', name: '国风', icon: '🏮' },
    { id: 'classical', name: '古典', icon: '🎻' }
  ];
  
  // 经典节目数据
  private programs: ClassicProgram[] = [
    {
      id: 'prog_001',
      name: '阴阳师',
      skater: '羽生结弦',
      nation: 'JPN',
      season: '2018-19',
      type: 'SP',
      music: 'Onmyoji',
      style: 'classical',
      score: 106.69,
      description: '改编自日本经典电影《阴阳师》，展现了日本传统文化的神秘与优雅',
      highlights: [
        '开场独特的姿态设计，展现阴阳师的神秘感',
        '步法编排融入日本传统舞蹈元素',
        '旋转组合流畅优雅，与音乐完美契合',
        '结尾动作设计呼应阴阳师角色特征'
      ],
      difficulties: [
        '三周半跳接三周跳的高难度连跳',
        '换足旋转的流畅过渡',
        '步法序列的复杂编排'
      ],
      isMustWatch: true
    },
    {
      id: 'prog_002',
      name: '罗密欧与朱丽叶',
      skater: '羽生结弦',
      nation: 'JPN',
      season: '2011-12',
      type: 'FS',
      music: 'Romeo and Juliet',
      style: 'passionate',
      score: 178.64,
      description: '演绎莎士比亚经典悲剧，情感张力十足，展现青春与爱情的热烈',
      highlights: [
        '开场强烈的戏剧性表现',
        '跳跃编排与音乐高潮完美配合',
        '情感表达层次丰富，从热烈到悲伤',
        '服装设计呼应剧中角色'
      ],
      difficulties: [
        '后四周跳的稳定完成',
        '连跳序列的高难度编排',
        '节目内容分PCS的极致表现'
      ],
      isMustWatch: true
    },
    {
      id: 'prog_003',
      name: '图兰朵',
      skater: '羽生结弦',
      nation: 'JPN',
      season: '2017-18',
      type: 'FS',
      music: 'Turandot',
      style: 'classical',
      score: 206.17,
      description: '平昌冬奥会自由滑节目，演绎普契尼歌剧经典',
      highlights: [
        '开场气势恢宏，展现冰上歌剧',
        '跳跃难度与艺术表现完美平衡',
        '旋转速度与美感兼具',
        '成为冬奥会经典名场面'
      ],
      difficulties: [
        '后四周跳的成功率控制',
        '三周半跳的稳定性',
        '后半程体能分配'
      ],
      isMustWatch: true
    },
    {
      id: 'prog_004',
      name: '卧虎藏龙',
      skater: '陈巍',
      nation: 'USA',
      season: '2019-20',
      type: 'FS',
      music: 'Crouching Tiger, Hidden Dragon',
      style: 'chinese',
      score: 216.02,
      description: '致敬中国功夫电影，展现东方武侠精神',
      highlights: [
        '融入中国功夫元素的动作设计',
        '跳跃难度世界顶级',
        '步法编排展现武侠意境',
        '服装设计呼应电影角色'
      ],
      difficulties: [
        '后四周跳接后外点冰三周跳',
        '后内点冰四周跳的稳定完成',
        '五组四周跳的高难度配置'
      ],
      isMustWatch: true
    },
    {
      id: 'prog_005',
      name: '星夜',
      skater: '纪平梨花',
      nation: 'JPN',
      season: '2019-20',
      type: 'SP',
      music: 'Starry Night',
      style: 'beautiful',
      score: 76.56,
      description: '展现夜空繁星之美，梦幻而浪漫',
      highlights: [
        '开场姿态如星河般璀璨',
        '跳跃轻盈优雅',
        '旋转展现星空旋转的意境',
        '整体氛围梦幻浪漫'
      ],
      difficulties: [
        '三周半跳的女单高难度',
        '旋转速度与美感兼具',
        '步法序列的流畅性'
      ],
      isMustWatch: false
    },
    {
      id: 'prog_006',
      name: '十面埋伏',
      skater: '彭程/金杨',
      nation: 'CHN',
      season: '2018-19',
      type: 'FS',
      music: 'Ambush from Ten Sides',
      style: 'chinese',
      score: 136.89,
      description: '双人滑节目，演绎中国古典音乐经典',
      highlights: [
        '托举动作融入中国武术元素',
        '螺旋线展现东方美学',
        '抛跳难度与美感兼具',
        '双人配合默契无间'
      ],
      difficulties: [
        '后内结环四周抛跳',
        '托举的稳定性与高度',
        '双人旋转的同步性'
      ],
      isMustWatch: false
    }
  ];
  
  // 筛选节目
  private getFilteredPrograms(): ClassicProgram[] {
    if (this.selectedStyle === 'all') {
      return this.programs;
    }
    return this.programs.filter((p: ClassicProgram) => p.style === this.selectedStyle);
  }
  
  build() {
    Column() {
      // 导航栏
      IceNavBar({
        title: '节目赏析',
        showBack: true,
        navBackgroundColor: '#AB47BC'
      });
      
      // 内容区
      Scroll() {
        Column() {
          // 介绍横幅
          this.buildIntroBanner();
          
          // 风格筛选
          this.buildStyleFilter();
          
          // 节目列表
          this.buildProgramList();
          
          // 观看建议
          this.buildWatchingTips();
        }
        .width('100%')
        .padding(16)
      }
      .layoutWeight(1)
      .scrollBar(BarState.Auto)
    }
    .width('100%')
    .height('100%')
    .backgroundColor('#F5F5F5')
  }
  
  // 介绍横幅
  @Builder
  buildIntroBanner() {
    Column() {
      Text('🎬 经典节目赏析')
        .fontSize(24)
        .fontWeight(FontWeight.Bold)
        .fontColor('#FFFFFF')
        .margin({ bottom: 8 })
      
      Text('精选花滑历史上的经典节目，学会"看懂节目"')
        .fontSize(14)
        .fontColor('rgba(255,255,255,0.8)')
    }
    .width('100%')
    .height(150)
    .justifyContent(FlexAlign.Center)
    .linearGradient({
      angle: 135,
      colors: [['#AB47BC', 0.0], ['#7B1FA2', 1.0]]
    })
    .borderRadius(16)
    .margin({ bottom: 20 })
  }
  
  // 风格筛选
  @Builder
  buildStyleFilter() {
    Column() {
      Text('风格分类')
        .fontSize(16)
        .fontWeight(FontWeight.Bold)
        .fontColor('#333333')
        .margin({ bottom: 12 })
      
      Scroll() {
        Row() {
          ForEach(this.styles, (style: ProgramStyle) => {
            Button(style.icon + ' ' + style.name)
              .fontSize(14)
              .height(36)
              .backgroundColor(this.selectedStyle === style.id ? '#AB47BC' : '#FFFFFF')
              .fontColor(this.selectedStyle === style.id ? '#FFFFFF' : '#666666')
              .borderRadius(18)
              .margin({ right: 8 })
              .onClick(() => {
                this.selectedStyle = style.id;
              })
          }, (style: ProgramStyle) => style.id)
        }
        .width('100%')
      }
      .scrollable(ScrollDirection.Horizontal)
      .scrollBar(BarState.Off)
    }
    .width('100%')
    .alignItems(HorizontalAlign.Start)
    .margin({ bottom: 20 })
  }
  
  // 节目列表
  @Builder
  buildProgramList() {
    Column() {
      ForEach(this.getFilteredPrograms(), (program: ClassicProgram) => {
        this.ProgramCard(program);
      }, (program: ClassicProgram) => program.id)
    }
    .width('100%')
  }
  
  @Builder
  ProgramCard(program: ClassicProgram) {
    Column() {
      // 顶部信息
      Row() {
        Column() {
          Row() {
            Text(program.name)
              .fontSize(18)
              .fontWeight(FontWeight.Bold)
              .fontColor('#333333')
            
            if (program.isMustWatch) {
              IceTag({ text: '必看', type: 'danger', tagSize: 'small' })
                .margin({ left: 8 })
            }
          }
          .width('100%')
          
          Row() {
            Text(program.skater)
              .fontSize(14)
              .fontColor('#666666')
            
            Text('(' + program.nation + ')')
              .fontSize(12)
              .fontColor('#999999')
              .margin({ left: 4 })
            
            Text('·')
              .fontSize(12)
              .fontColor('#999999')
              .margin({ left: 8, right: 8 })
            
            Text(program.season)
              .fontSize(12)
              .fontColor('#999999')
            
            Text(program.type === 'SP' ? '短节目' : '自由滑')
              .fontSize(12)
              .fontColor('#999999')
              .margin({ left: 8 })
          }
          .width('100%')
          .margin({ top: 4 })
        }
        .alignItems(HorizontalAlign.Start)
        .layoutWeight(1)
        
        Column() {
          Text(program.score.toFixed(2))
            .fontSize(20)
            .fontWeight(FontWeight.Bold)
            .fontColor('#AB47BC')
          
          Text('分')
            .fontSize(12)
            .fontColor('#999999')
        }
        .alignItems(HorizontalAlign.End)
      }
      .width('100%')
      .margin({ bottom: 12 })
      
      // 音乐信息
      Row() {
        Text('🎵 ')
          .fontSize(14)
        
        Text(program.music)
          .fontSize(14)
          .fontColor('#666666')
      }
      .width('100%')
      .margin({ bottom: 12 })
      
      // 节目简介
      Text(program.description)
        .fontSize(14)
        .fontColor('#666666')
        .lineHeight(22)
        .margin({ bottom: 16 })
      
      // 编排亮点
      Column() {
        Text('编排亮点')
          .fontSize(14)
          .fontWeight(FontWeight.Bold)
          .fontColor('#333333')
          .margin({ bottom: 8 })
        
        ForEach(program.highlights, (highlight: string, index: number) => {
          Row() {
            Text((index + 1) + '.')
              .fontSize(13)
              .fontColor('#AB47BC')
              .margin({ right: 8 })
            
            Text(highlight)
              .fontSize(13)
              .fontColor('#666666')
              .layoutWeight(1)
          }
          .width('100%')
          .margin({ bottom: 4 })
        }, (highlight: string) => highlight)
      }
      .width('100%')
      .alignItems(HorizontalAlign.Start)
      .padding(12)
      .backgroundColor('#F9F9F9')
      .borderRadius(8)
      .margin({ bottom: 12 })
      
      // 动作难点
      Column() {
        Text('动作难点')
          .fontSize(14)
          .fontWeight(FontWeight.Bold)
          .fontColor('#333333')
          .margin({ bottom: 8 })
        
        ForEach(program.difficulties, (difficulty: string, index: number) => {
          Row() {
            Text('⚡')
              .fontSize(13)
              .fontColor('#FF9800')
              .margin({ right: 8 })
            
            Text(difficulty)
              .fontSize(13)
              .fontColor('#666666')
              .layoutWeight(1)
          }
          .width('100%')
          .margin({ bottom: 4 })
        }, (difficulty: string) => difficulty)
      }
      .width('100%')
      .alignItems(HorizontalAlign.Start)
      .padding(12)
      .backgroundColor('#FFF3E0')
      .borderRadius(8)
    }
    .width('100%')
    .padding(20)
    .backgroundColor('#FFFFFF')
    .borderRadius(12)
    .shadow({
      radius: 8,
      color: '#1A000000',
      offsetX: 0,
      offsetY: 2
    })
    .margin({ bottom: 16 })
  }
  
  // 观看建议
  @Builder
  buildWatchingTips() {
    IceCard({
      title: '💡 如何欣赏花滑节目',
      cardBackgroundColor: '#F3E5F5'
    }) {
      Column() {
        this.TipItem('👀', '观察跳跃', '注意起跳、空中姿态、落冰的流畅度');
        this.TipItem('🔄', '欣赏旋转', '关注旋转速度、中心稳定性、姿态变化');
        this.TipItem('💃', '感受步法', '体会步法的节奏感、方向变化、难度衔接');
        this.TipItem('🎭', '理解表达', '感受选手对音乐的理解和情感表达');
        this.TipItem('📊', '学习评分', '了解技术分TES和节目内容分PCS的评分标准');
      }
      .width('100%')
    }
  }
  
  @Builder
  TipItem(icon: string, title: string, description: string) {
    Row() {
      Text(icon)
        .fontSize(20)
        .margin({ right: 12 })
      
      Column() {
        Text(title)
          .fontSize(14)
          .fontWeight(FontWeight.Bold)
          .fontColor('#333333')
        
        Text(description)
          .fontSize(12)
          .fontColor('#666666')
          .margin({ top: 4 })
      }
      .alignItems(HorizontalAlign.Start)
      .layoutWeight(1)
    }
    .width('100%')
    .padding({ top: 8, bottom: 8 })
  }
}

// 数据类型定义
interface ProgramStyle {
  id: string;
  name: string;
  icon: string;
}

interface ClassicProgram {
  id: string;
  name: string;
  skater: string;
  nation: string;
  season: string;
  type: 'SP' | 'FS';
  music: string;
  style: string;
  score: number;
  description: string;
  highlights: string[];
  difficulties: string[];
  isMustWatch: boolean;
}
