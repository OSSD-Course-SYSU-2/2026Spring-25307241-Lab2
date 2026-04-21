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

import { SkatingScore, ProgramComponent } from './SkatingScoreModel';

/**
 * 花样滑冰动作数据视图模型
 */
export class SkatingViewModel {
  /**
   * 获取所有跳跃动作
   */
  getJumpElements(): Array<string> {
    return [
      '1T', '1S', '1Lo', '1F', '1Lz', '1A',
      '2T', '2S', '2Lo', '2F', '2Lz', '2A',
      '3T', '3S', '3Lo', '3F', '3Lz', '3A',
      '4T', '4S', '4Lo', '4F', '4Lz', '4A'
    ];
  }

  /**
   * 获取所有旋转动作
   */
  getSpinElements(): Array<string> {
    return [
      'USp1', 'USp2', 'USp3', 'USp4',
      'SSp1', 'SSp2', 'SSp3', 'SSp4',
      'CSp1', 'CSp2', 'CSp3', 'CSp4',
      'LSp1', 'LSp2', 'LSp3', 'LSp4'
    ];
  }

  /**
   * 获取所有步法动作
   */
  getStepSequenceElements(): Array<string> {
    return ['StSq1', 'StSq2', 'StSq3', 'StSq4'];
  }

  /**
   * 获取跳跃动作基础分值映射
   */
  getJumpBaseValues(): Map<string, number> {
    return new Map([
      ['1T', 0.4], ['1S', 0.4], ['1Lo', 0.5], ['1F', 0.8], ['1Lz', 0.6], ['1A', 1.1],
      ['2T', 1.3], ['2S', 1.3], ['2Lo', 1.7], ['2F', 2.6], ['2Lz', 2.1], ['2A', 3.3],
      ['3T', 4.2], ['3S', 4.3], ['3Lo', 4.9], ['3F', 5.3], ['3Lz', 5.9], ['3A', 8.0],
      ['4T', 9.5], ['4S', 9.7], ['4Lo', 10.5], ['4F', 11.0], ['4Lz', 11.5], ['4A', 12.5]
    ]);
  }

  /**
   * 获取旋转动作基础分值映射
   */
  getSpinBaseValues(): Map<string, number> {
    return new Map([
      ['USp1', 1.5], ['USp2', 2.0], ['USp3', 2.5], ['USp4', 3.0],
      ['SSp1', 1.7], ['SSp2', 2.3], ['SSp3', 2.9], ['SSp4', 3.5],
      ['CSp1', 1.8], ['CSp2', 2.4], ['CSp3', 3.0], ['CSp4', 3.6],
      ['LSp1', 2.0], ['LSp2', 2.7], ['LSp3', 3.4], ['LSp4', 4.1]
    ]);
  }

  /**
   * 获取步法动作基础分值映射
   */
  getStepSequenceBaseValues(): Map<string, number> {
    return new Map([
      ['StSq1', 1.8], ['StSq2', 2.6], ['StSq3', 3.4], ['StSq4', 4.2]
    ]);
  }

  /**
   * 获取节目内容分项
   */
  getProgramComponents(): Array<ProgramComponent> {
    return [
      new ProgramComponent('滑行技术', 0.8),
      new ProgramComponent('动作衔接', 0.8),
      new ProgramComponent('表演/执行', 0.8),
      new ProgramComponent('编舞/构成', 0.8),
      new ProgramComponent('音乐诠释', 0.8)
    ];
  }

  /**
   * 获取动作类型
   */
  getElementType(element: string): string {
    if (element.includes('T') || element.includes('S') || element.includes('Lo') ||
        element.includes('F') || element.includes('Lz') || element.includes('A')) {
      return '跳跃';
    } else if (element.includes('Sp')) {
      return '旋转';
    } else if (element.includes('StSq')) {
      return '步法';
    }
    return '未知';
  }

  /**
   * 获取动作描述
   */
  getElementDescription(element: string): string {
    const type = this.getElementType(element);
    const descriptions: Map<string, string> = new Map([
      ['T', 'Toe Loop (后外点冰)'],
      ['S', 'Salchow (后内结环)'],
      ['Lo', 'Loop (后外结环)'],
      ['F', 'Flip (后内点冰)'],
      ['Lz', 'Lutz (后外点冰)'],
      ['A', 'Axel (前外点冰)']
    ]);

    if (type === '跳跃') {
      const rotations = element.charAt(0);
      const jumpType = element.substring(1);
      const desc = descriptions.get(jumpType) || jumpType;
      return `${rotations}周 ${desc}`;
    }

    return element;
  }
}

let skatingViewModel = new SkatingViewModel();
export default skatingViewModel as SkatingViewModel;
