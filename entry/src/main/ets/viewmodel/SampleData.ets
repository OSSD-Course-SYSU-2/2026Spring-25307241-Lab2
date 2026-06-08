/**
 * 冰迹花滑 - 示例数据
 * 用于开发和测试
 */

import {
  Skater, Competition, Move, Quiz, GlossaryTerm, DailyKnowledge,
  Discipline, CompetitionType, MoveType, QuizCategory, Difficulty
} from './IceTraceModel';

// ==================== 示例选手数据 ====================

export const SAMPLE_SKATERS: Skater[] = [
  {
    id: 'skater_001',
    name: '羽生结弦',
    nameEn: 'Yuzuru Hanyu',
    nationality: '日本',
    nationalityCode: 'JPN',
    birthDate: '1994-12-07',
    gender: 'M',
    discipline: 'MEN',
    isActive: false,
    avatar: 'https://example.com/hanyu.jpg',
    biography: '日本花样滑冰运动员，两届冬奥会冠军，两届世锦赛冠军，四大洲锦标赛冠军。',
    coach: 'Brian Orser',
    trainingLocation: '加拿大 多伦多',
    careerHighlights: [
      '2014索契冬奥会金牌',
      '2018平昌冬奥会金牌',
      '2014、2015世锦赛冠军',
      '首位突破100分(SP)、200分(FS)、300分(TOTAL)的选手'
    ],
    bestScores: [
      { segment: 'SP', score: 112.72, competition: '2020四大洲锦标赛', date: '2020-02-07', season: '2019-20' },
      { segment: 'FS', score: 223.20, competition: '2019大奖赛总决赛', date: '2019-12-07', season: '2019-20' },
      { segment: 'TOTAL', score: 322.59, competition: '2019大奖赛总决赛', date: '2019-12-07', season: '2019-20' }
    ],
    medals: [
      { competition: '冬奥会', year: 2014, discipline: 'MEN', medalType: 'GOLD' },
      { competition: '冬奥会', year: 2018, discipline: 'MEN', medalType: 'GOLD' },
      { competition: '世锦赛', year: 2014, discipline: 'MEN', medalType: 'GOLD' },
      { competition: '世锦赛', year: 2015, discipline: 'MEN', medalType: 'GOLD' }
    ],
    programs: [
      {
        name: '阴阳师',
        season: '2018-19',
        type: 'SP',
        music: 'Onmyoji',
        choreographer: 'Shae-Lynn Bourne',
        score: 106.69,
        isClassic: true
      },
      {
        name: 'Origin',
        season: '2018-19',
        type: 'FS',
        music: 'Art on Ice / The Swan',
        choreographer: 'Shae-Lynn Bourne',
        score: 195.71,
        isClassic: true
      }
    ],
    rankings: [
      { season: '2019-20', worldRanking: 2, seasonBest: 291.43 },
      { season: '2018-19', worldRanking: 1, seasonBest: 310.05 }
    ],
    socialMedia: {
      twitter: '@yuzuruofficial'
    }
  },
  {
    id: 'skater_002',
    name: '陈巍',
    nameEn: 'Nathan Chen',
    nationality: '美国',
    nationalityCode: 'USA',
    birthDate: '1999-05-05',
    gender: 'M',
    discipline: 'MEN',
    isActive: true,
    avatar: 'https://example.com/chen.jpg',
    biography: '美国花样滑冰运动员，2022北京冬奥会冠军，三届世锦赛冠军。',
    coach: 'Rafael Arutyunyan',
    trainingLocation: '美国 洛杉矶',
    careerHighlights: [
      '2022北京冬奥会金牌',
      '2018、2019、2021世锦赛冠军',
      '首位在自由滑中完成五个四周跳的选手',
      '四周跳技术革新者'
    ],
    bestScores: [
      { segment: 'SP', score: 113.97, competition: '2022北京冬奥会', date: '2022-02-08', season: '2021-22' },
      { segment: 'FS', score: 226.79, competition: '2022北京冬奥会', date: '2022-02-10', season: '2021-22' },
      { segment: 'TOTAL', score: 332.60, competition: '2022北京冬奥会', date: '2022-02-10', season: '2021-22' }
    ],
    medals: [
      { competition: '冬奥会', year: 2022, discipline: 'MEN', medalType: 'GOLD' },
      { competition: '世锦赛', year: 2018, discipline: 'MEN', medalType: 'GOLD' },
      { competition: '世锦赛', year: 2019, discipline: 'MEN', medalType: 'GOLD' },
      { competition: '世锦赛', year: 2021, discipline: 'MEN', medalType: 'GOLD' }
    ],
    programs: [
      {
        name: 'La Bohème',
        season: '2021-22',
        type: 'SP',
        music: 'La Bohème by Charles Aznavour',
        choreographer: 'Lori Nichol',
        score: 113.97,
        isClassic: true
      },
      {
        name: 'Rocketman',
        season: '2021-22',
        type: 'FS',
        music: 'Rocketman Soundtrack',
        choreographer: 'Lori Nichol',
        score: 226.79,
        isClassic: true
      }
    ],
    rankings: [
      { season: '2021-22', worldRanking: 1, seasonBest: 332.60 },
      { season: '2020-21', worldRanking: 1, seasonBest: 320.88 }
    ]
  },
  {
    id: 'skater_003',
    name: '金妍儿',
    nameEn: 'Yuna Kim',
    nationality: '韩国',
    nationalityCode: 'KOR',
    birthDate: '1990-09-05',
    gender: 'F',
    discipline: 'LADIES',
    isActive: false,
    avatar: 'https://example.com/kim.jpg',
    biography: '韩国花样滑冰运动员，2010温哥华冬奥会冠军，一届世锦赛冠军，被誉为"花滑女王"。',
    careerHighlights: [
      '2010温哥华冬奥会金牌',
      '2014索契冬奥会银牌',
      '2009世锦赛冠军',
      '女子单人滑世界纪录保持者(退役时)'
    ],
    bestScores: [
      { segment: 'SP', score: 78.50, competition: '2014索契冬奥会', date: '2014-02-19', season: '2013-14' },
      { segment: 'FS', score: 150.06, competition: '2010温哥华冬奥会', date: '2010-02-25', season: '2009-10' },
      { segment: 'TOTAL', score: 228.56, competition: '2010温哥华冬奥会', date: '2010-02-25', season: '2009-10' }
    ],
    medals: [
      { competition: '冬奥会', year: 2010, discipline: 'LADIES', medalType: 'GOLD' },
      { competition: '冬奥会', year: 2014, discipline: 'LADIES', medalType: 'SILVER' },
      { competition: '世锦赛', year: 2009, discipline: 'LADIES', medalType: 'GOLD' }
    ],
    programs: [
      {
        name: 'Giselle',
        season: '2013-14',
        type: 'SP',
        music: 'Giselle',
        choreographer: 'David Wilson',
        score: 78.50,
        isClassic: true
      },
      {
        name: 'Adios Nonino',
        season: '2013-14',
        type: 'FS',
        music: 'Adios Nonino by Astor Piazzolla',
        choreographer: 'David Wilson',
        score: 144.19,
        isClassic: true
      }
    ],
    rankings: [
      { season: '2013-14', worldRanking: 2, seasonBest: 219.18 }
    ]
  }
];

// ==================== 示例赛事数据 ====================

export const SAMPLE_COMPETITIONS: Competition[] = [
  {
    id: 'comp_001',
    name: '2022北京冬奥会',
    nameEn: '2022 Beijing Winter Olympics',
    season: '2021-22',
    type: 'OLYMPICS',
    location: '北京',
    country: '中国',
    startDate: '2022-02-04',
    endDate: '2022-02-20',
    disciplines: ['MEN', 'LADIES', 'PAIRS', 'ICE_DANCE', 'TEAM'],
    status: 'FINISHED',
    results: [],
    participants: []
  },
  {
    id: 'comp_002',
    name: '2023世界锦标赛',
    nameEn: '2023 World Championships',
    season: '2022-23',
    type: 'WORLD',
    location: '埼玉',
    country: '日本',
    startDate: '2023-03-20',
    endDate: '2023-03-26',
    disciplines: ['MEN', 'LADIES', 'PAIRS', 'ICE_DANCE'],
    status: 'FINISHED',
    results: [],
    participants: []
  }
];

// ==================== 示例动作数据 ====================

export const SAMPLE_MOVES: Move[] = [
  {
    id: 'move_001',
    name: '阿克塞尔跳',
    nameEn: 'Axel Jump',
    abbreviation: 'A',
    type: 'JUMP',
    difficulty: 4,
    baseValue: 1.31,
    description: '唯一向前起跳的跳跃动作，是所有跳跃中难度最大的。',
    keyPoints: [
      '向前滑行起跳',
      '起跳腿做前外刃的起跳',
      '空中完成旋转',
      '落冰腿做后外刃滑行'
    ],
    commonErrors: [
      '起跳时机不对',
      '旋转不足',
      '落冰不稳'
    ],
    imageUrl: 'https://example.com/axel.jpg',
    isBeginner: false,
    prerequisites: ['Waltz Jump'],
    relatedMoves: ['1A', '2A', '3A', '4A']
  },
  {
    id: 'move_002',
    name: '三周阿克塞尔跳',
    nameEn: 'Triple Axel',
    abbreviation: '3A',
    type: 'JUMP',
    difficulty: 5,
    baseValue: 8.00,
    description: '完成三周半旋转的阿克塞尔跳，是单人滑中难度最高的跳跃之一。',
    keyPoints: [
      '向前起跳',
      '空中完成3.5周旋转',
      '保持身体轴线稳定',
      '落冰稳定'
    ],
    commonErrors: [
      '旋转不足(降组)',
      '落冰摔倒',
      '起跳高度不够'
    ],
    imageUrl: 'https://example.com/3a.jpg',
    isBeginner: false,
    prerequisites: ['2A']
  },
  {
    id: 'move_003',
    name: '蹲转',
    nameEn: 'Sit Spin',
    abbreviation: 'SSp',
    type: 'SPIN',
    difficulty: 2,
    baseValue: 1.50,
    description: '身体下蹲，一条腿伸直向前，另一条腿承重的旋转动作。',
    keyPoints: [
      '重心在承重腿',
      '大腿与地面平行',
      '自由腿伸直向前',
      '背部挺直'
    ],
    commonErrors: [
      '蹲得不够低',
      '自由腿弯曲',
      '重心不稳'
    ],
    imageUrl: 'https://example.com/sit_spin.jpg',
    isBeginner: true
  }
];

// ==================== 示例题库数据 ====================

export const SAMPLE_QUIZZES: Quiz[] = [
  {
    id: 'quiz_001',
    question: '花样滑冰中，唯一向前起跳的跳跃动作是？',
    type: 'SINGLE_CHOICE',
    category: 'MOVES',
    difficulty: 'BEGINNER',
    options: [
      { id: 'a', text: '后外点冰跳(Lutz)' },
      { id: 'b', text: '阿克塞尔跳(Axel)' },
      { id: 'c', text: '后内点冰跳(Flip)' },
      { id: 'd', text: '后外结环跳(Loop)' }
    ],
    correctAnswer: 'b',
    explanation: '阿克塞尔跳(Axel)是唯一向前起跳的跳跃动作，因此同周数的阿克塞尔跳实际旋转周数比其他跳跃多半周。',
    relatedKnowledge: ['跳跃动作', '阿克塞尔跳', '起跳方式'],
    attempts: 0,
    correctRate: 0.75
  },
  {
    id: 'quiz_002',
    question: '短节目(SP)的时长要求是？',
    type: 'SINGLE_CHOICE',
    category: 'RULES',
    difficulty: 'BEGINNER',
    options: [
      { id: 'a', text: '2分30秒±10秒' },
      { id: 'b', text: '3分30秒±10秒' },
      { id: 'c', text: '4分±10秒' },
      { id: 'd', text: '4分30秒±10秒' }
    ],
    correctAnswer: 'a',
    explanation: '短节目(Short Program)时长要求为2分30秒，允许±10秒的误差。超时或不足都会被扣分。',
    relatedKnowledge: ['节目规则', '短节目', '时间要求'],
    attempts: 0,
    correctRate: 0.68
  },
  {
    id: 'quiz_003',
    question: 'GOE的含义是？',
    type: 'SINGLE_CHOICE',
    category: 'BASICS',
    difficulty: 'INTERMEDIATE',
    options: [
      { id: 'a', text: 'Grade of Execution - 执行等级' },
      { id: 'b', text: 'Grade of Excellence - 优秀等级' },
      { id: 'c', text: 'General Overall Evaluation - 总体评估' },
      { id: 'd', text: 'Grade of Element - 元素等级' }
    ],
    correctAnswer: 'a',
    explanation: 'GOE (Grade of Execution) 即执行等级，用于评估技术动作的执行质量，范围从-5到+5。',
    relatedKnowledge: ['评分系统', 'GOE', '技术分'],
    attempts: 0,
    correctRate: 0.55
  }
];

// ==================== 示例术语数据 ====================

export const SAMPLE_GLOSSARY: GlossaryTerm[] = [
  {
    id: 'term_001',
    term: 'GOE',
    termEn: 'Grade of Execution',
    definition: '执行等级，用于评估技术动作执行质量的分数，范围从-5到+5。正值表示执行质量好，负值表示有失误。',
    examples: ['一个完美的三周跳可能获得+5的GOE', '摔倒的动作会获得负GOE'],
    relatedTerms: ['TES', 'PCS'],
    category: '评分系统'
  },
  {
    id: 'term_002',
    term: 'TES',
    termEn: 'Technical Element Score',
    definition: '技术分，由所有技术元素(跳跃、旋转、步法等)的得分总和构成。',
    examples: ['跳跃的基础分值 + GOE = 该跳跃的得分', '所有技术元素得分之和 = TES'],
    relatedTerms: ['GOE', 'PCS', '总分'],
    category: '评分系统'
  },
  {
    id: 'term_003',
    term: 'PCS',
    termEn: 'Program Component Score',
    definition: '节目内容分，评估选手表演的艺术性和完整性，包含五个方面：滑行技术、动作衔接、表演、编舞、音乐诠释。',
    examples: ['五个方面各打分0-10分', '总分 = 五项平均分 × 系数'],
    relatedTerms: ['TES', 'GOE'],
    category: '评分系统'
  },
  {
    id: 'term_004',
    term: '连跳',
    termEn: 'Jump Combination',
    definition: '两个或多个跳跃连续完成，中间不能有步法或转体，落冰脚直接起跳下一个跳跃。',
    examples: ['3Lz+3T', '2A+1Eu+3S'],
    relatedTerms: ['连跳限制', '跳跃序列'],
    category: '跳跃'
  }
];

// ==================== 每日知识数据 ====================

export const DAILY_KNOWLEDGE: DailyKnowledge[] = [
  {
    id: 'daily_001',
    title: '为什么阿克塞尔跳最难？',
    content: '阿克塞尔跳是唯一向前起跳的跳跃，因此同周数的阿克塞尔跳实际旋转周数比其他跳跃多半周。例如，三周阿克塞尔跳实际要完成3.5周旋转。',
    category: '跳跃知识',
    date: '2024-01-01'
  },
  {
    id: 'daily_002',
    title: '花样滑冰的起源',
    content: '花样滑冰起源于18世纪的英国，最初是在冰面上刻画图案。国际滑联(ISU)成立于1892年，是花样滑冰的国际管理机构。',
    category: '历史知识',
    date: '2024-01-02'
  }
];
