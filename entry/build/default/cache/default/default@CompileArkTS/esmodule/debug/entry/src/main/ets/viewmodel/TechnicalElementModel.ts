/*
 * 花样滑冰技术元素数据模型
 * Copyright (c) 2024
 */
// 技术元素类型
export enum ElementType {
    JUMP = "JUMP",
    SPIN = "SPIN",
    STEP = "STEP" // 步法
}
// 跳跃类型
export enum JumpType {
    T = "T",
    S = "S",
    LO = "Lo",
    F = "F",
    LZ = "Lz",
    A = "A" // Axel (前外点冰)
}
// 旋转类型
export enum SpinType {
    USP = "USp",
    SSP = "SSp",
    CSP = "CSp",
    LSP = "LSp",
    CSSP = "CSp",
    LUSP = "LUSp",
    SSSP = "SSSp" // Sit Spin Change
}
// 步法类型
export enum StepType {
    STSQ = "StSq" // Step Sequence
}
// 技术元素数据类
export class TechnicalElement {
    name: string = ''; // 元素名称，如 "3Lz"
    baseValue: number = 0; // 基础分值
    goe: number = 0; // GOE评分 (-5 到 +5)
    finalScore: number = 0; // 最终得分
    type: ElementType = ElementType.JUMP;
    constructor(name: string, baseValue: number, type: ElementType) {
        this.name = name;
        this.baseValue = baseValue;
        this.type = type;
        this.goe = 0;
        this.finalScore = baseValue;
    }
    // 计算最终得分
    calculateFinalScore(): number {
        // GOE调整分 = GOE × 基础分值 × 0.1
        const goeAdjustment = this.goe * this.baseValue * 0.1;
        this.finalScore = this.baseValue + goeAdjustment;
        return this.finalScore;
    }
}
// 跳跃基础分值表 (ISU 2022-2023)
export const JUMP_BASE_VALUES: Map<string, number> = new Map([
    // Toe Loop
    ['1T', 0.40], ['2T', 1.30], ['3T', 3.00], ['4T', 5.40],
    // Salchow
    ['1S', 0.40], ['2S', 1.30], ['3S', 3.00], ['4S', 5.40],
    // Loop
    ['1Lo', 0.50], ['2Lo', 1.70], ['3Lo', 4.00], ['4Lo', 6.00],
    // Flip
    ['1F', 0.50], ['2F', 1.80], ['3F', 4.00], ['4F', 6.00],
    // Lutz
    ['1Lz', 0.60], ['2Lz', 2.10], ['3Lz', 5.00], ['4Lz', 6.60],
    // Axel
    ['1A', 1.10], ['2A', 3.30], ['3A', 6.40], ['4A', 8.50]
]);
// 旋转基础分值表
export const SPIN_BASE_VALUES: Map<string, number> = new Map([
    // Upright Spin
    ['USp1', 1.50], ['USp2', 2.00], ['USp3', 2.50], ['USp4', 3.00],
    // Sit Spin
    ['SSp1', 1.70], ['SSp2', 2.50], ['SSp3', 3.00], ['SSp4', 3.50],
    // Camel Spin
    ['CSp1', 1.80], ['CSp2', 2.50], ['CSp3', 3.00], ['CSp4', 3.50],
    // Layback Spin
    ['LSp1', 1.70], ['LSp2', 2.50], ['LSp3', 3.00], ['LSp4', 3.50],
    // Combination Spins
    ['CSSp1', 2.00], ['CSSp2', 3.00], ['CSSp3', 3.50], ['CSSp4', 4.00],
    ['LUSp1', 1.70], ['LUSp2', 2.50], ['LUSp3', 3.00], ['LUSp4', 3.50],
    ['SSSp1', 1.70], ['SSSp2', 2.50], ['SSSp3', 3.00], ['SSSp4', 3.50]
]);
// 步法基础分值表
export const STEP_BASE_VALUES: Map<string, number> = new Map([
    ['StSq1', 1.50], ['StSq2', 2.00], ['StSq3', 2.50], ['StSq4', 3.00]
]);
// 获取所有跳跃元素
export function getAllJumps(): string[] {
    return Array.from(JUMP_BASE_VALUES.keys());
}
// 获取所有旋转元素
export function getAllSpins(): string[] {
    return Array.from(SPIN_BASE_VALUES.keys());
}
// 获取所有步法元素
export function getAllSteps(): string[] {
    return Array.from(STEP_BASE_VALUES.keys());
}
// 获取元素基础分值
export function getBaseValue(elementName: string): number {
    return JUMP_BASE_VALUES.get(elementName) ||
        SPIN_BASE_VALUES.get(elementName) ||
        STEP_BASE_VALUES.get(elementName) || 0;
}
// 获取元素类型
export function getElementType(elementName: string): ElementType {
    if (JUMP_BASE_VALUES.has(elementName)) {
        return ElementType.JUMP;
    }
    if (SPIN_BASE_VALUES.has(elementName)) {
        return ElementType.SPIN;
    }
    if (STEP_BASE_VALUES.has(elementName)) {
        return ElementType.STEP;
    }
    return ElementType.JUMP;
}
// 创建技术元素
export function createTechnicalElement(elementName: string): TechnicalElement | null {
    const baseValue = getBaseValue(elementName);
    if (baseValue === 0) {
        return null;
    }
    const type = getElementType(elementName);
    return new TechnicalElement(elementName, baseValue, type);
}
// GOE范围
export const GOE_RANGE: number[] = [-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5];
// 获取元素中文名称
export function getElementChineseName(elementName: string): string {
    const jumpNames: Record<string, string> = {
        'T': '后外点冰',
        'S': '后内结环',
        'Lo': '后外结环',
        'F': '后内点冰',
        'Lz': '后外点冰',
        'A': '前外点冰'
    };
    const spinNames: Record<string, string> = {
        'USp': '直立旋转',
        'SSp': '蹲转',
        'CSp': '驼转',
        'LSp': '弓身旋转',
        'CSSp': '换足驼转',
        'LUSp': '弓身直立转',
        'SSSp': '换足蹲转'
    };
    // 判断是否是跳跃
    if (JUMP_BASE_VALUES.has(elementName)) {
        const rotations = elementName.charAt(0);
        const jumpType = elementName.substring(1);
        const jumpName = jumpNames[jumpType] || jumpType;
        return `${rotations}周${jumpName}`;
    }
    // 判断是否是旋转
    if (SPIN_BASE_VALUES.has(elementName)) {
        const level = elementName.charAt(elementName.length - 1);
        const spinType = elementName.substring(0, elementName.length - 1);
        const spinName = spinNames[spinType] || spinType;
        return `${spinName}(Level ${level})`;
    }
    // 判断是否是步法
    if (STEP_BASE_VALUES.has(elementName)) {
        const level = elementName.charAt(elementName.length - 1);
        return `步法序列(Level ${level})`;
    }
    return elementName;
}
