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

import { SkatingScore, CombinationJump, ProgramComponent } from '../../viewmodel/SkatingScoreModel';
import Logger from './Logger';

/**
 * 导出数据接口
 */
export interface ExportData {
  programType: string;
  elements: SkatingScore[];
  combinations: CombinationJump[];
  programComponents: ProgramComponent[];
  technicalScore: number;
  componentScore: number;
  totalScore: number;
  exportTime: string;
}

/**
 * JSON数据项接口
 */
interface JsonDataItem {
  序号: number;
  类型: string;
  动作: string;
  基础分值?: string;
  GOE评分: string;
  最终得分: string;
  各基础分值?: string;
  总基础分值?: string;
}

/**
 * JSON节目内容分项接口
 */
interface JsonProgramComponent {
  项目: string;
  系数: string;
  裁判评分: string;
  平均分: string;
  最终得分: string;
}

/**
 * JSON数据接口
 */
interface JsonData {
  节目类型: string;
  导出时间: string;
  技术分: string;
  节目内容分: string;
  总分: string;
  动作列表: JsonDataItem[];
  节目内容分详情: JsonProgramComponent[];
}

/**
 * 数据导出工具类
 */
export default class DataExporter {
  private static readonly TAG: string = 'DataExporter';

  /**
   * 导出为JSON格式
   */
  static exportToJSON(data: ExportData): string {
    try {
      const actionList: JsonDataItem[] = [];

      // 添加单跳动作
      for (let i = 0; i < data.elements.length; i++) {
        const item = data.elements[i];
        const jsonItem: JsonDataItem = {
          序号: i + 1,
          类型: '单跳',
          动作: item.element,
          基础分值: item.baseValue.toFixed(2),
          GOE评分: item.goeScores.join(', '),
          最终得分: item.finalScore.toFixed(2)
        };
        actionList.push(jsonItem);
      }

      // 添加连跳组合
      for (let i = 0; i < data.combinations.length; i++) {
        const item = data.combinations[i];
        const jsonItem: JsonDataItem = {
          序号: data.elements.length + i + 1,
          类型: '连跳',
          动作: item.elements.join(' + '),
          各基础分值: item.baseValues.map((v: number): string => v.toFixed(2)).join(' + '),
          总基础分值: item.totalBaseValue.toFixed(2),
          GOE评分: item.goeScores.join(', '),
          最终得分: item.finalScore.toFixed(2)
        };
        actionList.push(jsonItem);
      }

      // 添加节目内容分详情
      const componentDetails: JsonProgramComponent[] = [];
      for (let i = 0; i < data.programComponents.length; i++) {
        const comp = data.programComponents[i];
        const component: JsonProgramComponent = {
          项目: comp.name,
          系数: comp.factor.toFixed(2),
          裁判评分: comp.scores.join(', '),
          平均分: comp.averageScore.toFixed(2),
          最终得分: comp.finalScore.toFixed(2)
        };
        componentDetails.push(component);
      }

      const jsonData: JsonData = {
        节目类型: data.programType === 'SP' ? '短节目' : '自由滑',
        导出时间: data.exportTime,
        技术分: data.technicalScore.toFixed(2),
        节目内容分: data.componentScore.toFixed(2),
        总分: data.totalScore.toFixed(2),
        动作列表: actionList,
        节目内容分详情: componentDetails
      };

      return JSON.stringify(jsonData, null, 2);
    } catch (error) {
      Logger.error(DataExporter.TAG, `Export to JSON failed: ${error}`);
      return '';
    }
  }

  /**
   * 导出为CSV格式
   */
  static exportToCSV(data: ExportData): string {
    try {
      const lines: string[] = [];

      lines.push(`花样滑冰评分数据导出`);
      lines.push(`节目类型,${data.programType === 'SP' ? '短节目' : '自由滑'}`);
      lines.push(`导出时间,${data.exportTime}`);
      lines.push(`技术分,${data.technicalScore.toFixed(2)}`);
      lines.push(`节目内容分,${data.componentScore.toFixed(2)}`);
      lines.push(`总分,${data.totalScore.toFixed(2)}`);
      lines.push('');

      lines.push('=== 动作列表 ===');
      lines.push('序号,类型,动作,基础分值,GOE评分,最终得分');

      for (let i = 0; i < data.elements.length; i++) {
        const item = data.elements[i];
        lines.push(`${i + 1},单跳,${item.element},${item.baseValue.toFixed(2)},"${item.goeScores.join(', ')}",${item.finalScore.toFixed(2)}`);
      }

      for (let i = 0; i < data.combinations.length; i++) {
        const item = data.combinations[i];
        const actionStr = item.elements.join(' + ');
        const baseValuesStr = item.baseValues.map((v: number): string => v.toFixed(2)).join(' + ');
        lines.push(`${data.elements.length + i + 1},连跳,"${actionStr}","${baseValuesStr} (总: ${item.totalBaseValue.toFixed(2)})","${item.goeScores.join(', ')}",${item.finalScore.toFixed(2)}`);
      }

      lines.push('');

      lines.push('=== 节目内容分详情 ===');
      lines.push('项目,系数,裁判评分,平均分,最终得分');

      for (let i = 0; i < data.programComponents.length; i++) {
        const comp = data.programComponents[i];
        lines.push(`${comp.name},${comp.factor.toFixed(2)},"${comp.scores.join(', ')}",${comp.averageScore.toFixed(2)},${comp.finalScore.toFixed(2)}`);
      }

      return lines.join('\n');
    } catch (error) {
      Logger.error(DataExporter.TAG, `Export to CSV failed: ${error}`);
      return '';
    }
  }

  /**
   * 导出为详细文本格式
   */
  static exportToText(data: ExportData): string {
    try {
      const lines: string[] = [];

      lines.push('╔════════════════════════════════════════╗');
      lines.push('║     花样滑冰评分报告                    ║');
      lines.push('╚════════════════════════════════════════╝');
      lines.push('');
      lines.push(`节目类型: ${data.programType === 'SP' ? '短节目 (SP)' : '自由滑 (FS)'}`);
      lines.push(`导出时间: ${data.exportTime}`);
      lines.push('');
      lines.push('──────────── 总分概览 ────────────');
      lines.push(`技术分 (TES):      ${data.technicalScore.toFixed(2)}`);
      lines.push(`节目内容分 (PCS):  ${data.componentScore.toFixed(2)}`);
      lines.push(`总分:              ${data.totalScore.toFixed(2)}`);
      lines.push('');

      lines.push('──────────── 动作列表 ────────────');
      let actionIndex = 1;

      for (let i = 0; i < data.elements.length; i++) {
        const item = data.elements[i];
        lines.push(`${actionIndex}. ${item.element}`);
        lines.push(`   基础分值: ${item.baseValue.toFixed(2)}`);
        lines.push(`   GOE评分: [${item.goeScores.join(', ')}]`);
        lines.push(`   最终得分: ${item.finalScore.toFixed(2)}`);
        lines.push('');
        actionIndex++;
      }

      for (let i = 0; i < data.combinations.length; i++) {
        const item = data.combinations[i];
        lines.push(`${actionIndex}. ${item.elements.join(' + ')} (连跳)`);
        lines.push(`   各基础分值: ${item.baseValues.map((v: number): string => v.toFixed(2)).join(' + ')}`);
        lines.push(`   总基础分值: ${item.totalBaseValue.toFixed(2)}`);
        lines.push(`   GOE评分: [${item.goeScores.join(', ')}]`);
        lines.push(`   最终得分: ${item.finalScore.toFixed(2)}`);
        lines.push('');
        actionIndex++;
      }

      lines.push('──────────── 节目内容分详情 ────────────');
      for (let i = 0; i < data.programComponents.length; i++) {
        const comp = data.programComponents[i];
        lines.push(`${comp.name}`);
        lines.push(`  系数: ${comp.factor.toFixed(2)}`);
        lines.push(`  裁判评分: [${comp.scores.join(', ')}]`);
        lines.push(`  平均分: ${comp.averageScore.toFixed(2)}`);
        lines.push(`  最终得分: ${comp.finalScore.toFixed(2)}`);
        lines.push('');
      }

      lines.push('════════════════════════════════════════');

      return lines.join('\n');
    } catch (error) {
      Logger.error(DataExporter.TAG, `Export to text failed: ${error}`);
      return '';
    }
  }

  /**
   * 获取当前时间字符串
   */
  static getCurrentTime(): string {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hour = String(now.getHours()).padStart(2, '0');
    const minute = String(now.getMinutes()).padStart(2, '0');
    const second = String(now.getSeconds()).padStart(2, '0');
    return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
  }
}
