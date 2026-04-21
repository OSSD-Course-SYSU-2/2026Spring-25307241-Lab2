/*
 * Copyright (c) 2023 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * 裁判评分数据模型
 */
export class JudgeScore {
  judgeNumber: number;
  goeScore: number;

  constructor(judgeNumber: number, goeScore: number) {
    this.judgeNumber = judgeNumber;
    this.goeScore = goeScore;
  }
}

/**
 * 花样滑冰动作评分数据模型
 */
export class SkatingScore {
  element: string;
  baseValue: number;
  goeScores: number[];
  finalScore: number;

  constructor(element: string, baseValue: number, goeScores: number[], finalScore: number) {
    this.element = element;
    this.baseValue = baseValue;
    this.goeScores = goeScores;
    this.finalScore = finalScore;
  }
}

/**
 * 完整比赛成绩数据模型
 */
export class CompetitionResult {
  elements: SkatingScore[];
  totalTechnicalScore: number;
  programComponents: ProgramComponent[];
  totalComponentScore: number;
  totalScore: number;

  constructor() {
    this.elements = [];
    this.totalTechnicalScore = 0;
    this.programComponents = [];
    this.totalComponentScore = 0;
    this.totalScore = 0;
  }
}

/**
 * 节目内容分项
 */
export class ProgramComponent {
  name: string;
  factor: number;
  scores: number[];
  averageScore: number;
  finalScore: number;

  constructor(name: string, factor: number) {
    this.name = name;
    this.factor = factor;
    this.scores = [];
    this.averageScore = 0;
    this.finalScore = 0;
  }
}

/**
 * 连跳组合数据模型
 */
export class CombinationJump {
  elements: string[];           // 连跳中的各个跳跃动作
  baseValues: number[];         // 各跳跃的基础分值
  totalBaseValue: number;       // 连跳总基础分值
  goeScores: number[];          // GOE评分数组
  finalScore: number;           // 最终得分
  isSecondJumpUnderRotated: boolean;  // 第二跳是否降组

  constructor(elements: string[], baseValues: number[], goeScores: number[], finalScore: number) {
    this.elements = elements;
    this.baseValues = baseValues;
    this.totalBaseValue = baseValues.reduce((sum, val) => sum + val, 0);
    this.goeScores = goeScores;
    this.finalScore = finalScore;
    this.isSecondJumpUnderRotated = false;
  }
}

/**
 * 连跳类型枚举
 */
export enum CombinationType {
  TWO_JUMP = 2,    // 两连跳
  THREE_JUMP = 3   // 三连跳
}
