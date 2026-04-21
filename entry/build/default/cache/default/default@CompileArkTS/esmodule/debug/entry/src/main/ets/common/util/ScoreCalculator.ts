import { CombinationJump } from "@bundle:com.example.simplecalculator/entry/ets/viewmodel/SkatingScoreModel";
import type { SkatingScore, ProgramComponent } from "@bundle:com.example.simplecalculator/entry/ets/viewmodel/SkatingScoreModel";
/**
 * 跳跃动作解析结果接口
 */
interface JumpElementParseResult {
    rotations: number;
    type: string;
}
/**
 * 花样滑冰计分计算工具类
 */
class ScoreCalculator {
    /**
     * 计算单个动作的最终得分
     *
     * @param baseValue 基础分值
     * @param goeScores GOE评分数组
     * @return 最终得分
     */
    calculateElementScore(baseValue: number, goeScores: number[]): number {
        if (goeScores.length === 0) {
            return baseValue;
        }
        // 计算GOE平均值
        const averageGOE = this.calculateAverage(goeScores);
        // GOE转换为分数: GOE值 * 基础分值 * 0.1
        const goeValue = averageGOE * baseValue * 0.1;
        // 最终得分 = 基础分值 + GOE分数
        const finalScore = baseValue + goeValue;
        return Math.round(finalScore * 100) / 100;
    }
    /**
     * 计算数组平均值
     *
     * @param values 数值数组
     * @return 平均值
     */
    calculateAverage(values: number[]): number {
        if (values.length === 0) {
            return 0;
        }
        // 去掉最高分和最低分
        const sorted = [...values].sort((a, b) => a - b);
        const trimmed = sorted.slice(1, sorted.length - 1);
        if (trimmed.length === 0) {
            return values[0];
        }
        const sum = trimmed.reduce((acc, val) => acc + val, 0);
        return sum / trimmed.length;
    }
    /**
     * 计算技术分总分
     *
     * @param elements 所有动作评分
     * @return 技术分总分
     */
    calculateTechnicalTotal(elements: SkatingScore[]): number {
        let total = 0;
        for (const element of elements) {
            total += element.finalScore;
        }
        return Math.round(total * 100) / 100;
    }
    /**
     * 计算节目内容分
     *
     * @param component 节目内容分项
     * @return 最终节目内容分
     */
    calculateProgramComponent(component: ProgramComponent): number {
        if (component.scores.length === 0) {
            return 0;
        }
        // 计算平均分
        const average = this.calculateAverage(component.scores);
        component.averageScore = average;
        // 最终分数 = 平均分 * 系数
        const finalScore = average * component.factor;
        component.finalScore = Math.round(finalScore * 100) / 100;
        return component.finalScore;
    }
    /**
     * 计算节目内容分总分
     *
     * @param components 所有节目内容分项
     * @return 节目内容分总分
     */
    calculateComponentTotal(components: ProgramComponent[]): number {
        let total = 0;
        for (const component of components) {
            total += this.calculateProgramComponent(component);
        }
        return Math.round(total * 100) / 100;
    }
    /**
     * 计算比赛总分
     *
     * @param technicalScore 技术分
     * @param componentScore 节目内容分
     * @param deductions 扣分
     * @return 比赛总分
     */
    calculateTotalScore(technicalScore: number, componentScore: number, deductions: number = 0): number {
        const total = technicalScore + componentScore - deductions;
        return Math.round(total * 100) / 100;
    }
    /**
     * 验证GOE评分是否在有效范围内
     *
     * @param goe GOE评分
     * @return 是否有效
     */
    validateGOE(goe: number): boolean {
        return goe >= -5 && goe <= 5;
    }
    /**
     * 验证节目内容分是否在有效范围内
     *
     * @param score 节目内容分
     * @return 是否有效
     */
    validateProgramScore(score: number): boolean {
        return score >= 0.25 && score <= 10.0;
    }
    /**
     * 格式化分数显示
     *
     * @param score 分数
     * @return 格式化后的字符串
     */
    formatScore(score: number): string {
        return score.toFixed(2);
    }
    /**
     * 计算连跳组合的基础分值
     * 连跳规则：第二个及后续跳跃的基础分值乘以1.1
     *
     * @param baseValues 各跳跃的基础分值数组
     * @return 连跳总基础分值
     */
    calculateCombinationBaseValue(baseValues: number[]): number {
        if (baseValues.length === 0) {
            return 0;
        }
        let totalBaseValue = baseValues[0]; // 第一个跳跃保持原值
        // 第二个及后续跳跃基础分值乘以1.1
        for (let i = 1; i < baseValues.length; i++) {
            totalBaseValue += baseValues[i] * 1.1;
        }
        return Math.round(totalBaseValue * 100) / 100;
    }
    /**
     * 计算连跳组合的最终得分
     *
     * @param baseValues 各跳跃的基础分值数组
     * @param goeScores GOE评分数组
     * @return 最终得分
     */
    calculateCombinationScore(baseValues: number[], goeScores: number[]): number {
        if (baseValues.length === 0) {
            return 0;
        }
        // 计算连跳总基础分值
        const totalBaseValue = this.calculateCombinationBaseValue(baseValues);
        if (goeScores.length === 0) {
            return totalBaseValue;
        }
        // 计算GOE平均值
        const averageGOE = this.calculateAverage(goeScores);
        // GOE转换为分数: GOE值 * 总基础分值 * 0.1
        const goeValue = averageGOE * totalBaseValue * 0.1;
        // 最终得分 = 总基础分值 + GOE分数
        const finalScore = totalBaseValue + goeValue;
        return Math.round(finalScore * 100) / 100;
    }
    /**
     * 解析跳跃动作名称，获取周数和跳跃类型
     *
     * @param element 跳跃动作名称（如 '3T', '4Lz'）
     * @return {rotations: 周数, type: 跳跃类型}
     */
    parseJumpElement(element: string): JumpElementParseResult {
        const rotations = parseInt(element.charAt(0));
        const type = element.substring(1);
        const result: JumpElementParseResult = { rotations, type };
        return result;
    }
    /**
     * 获取降组后的跳跃动作名称
     * 降组规则：周数减1
     *
     * @param element 原跳跃动作名称
     * @return 降组后的跳跃动作名称
     */
    getUnderRotatedElement(element: string): string {
        const parsed = this.parseJumpElement(element);
        if (parsed.rotations > 1) {
            return `${parsed.rotations - 1}${parsed.type}`;
        }
        return element;
    }
    /**
     * 验证连跳组合是否有效
     * 规则：
     * 1. 连跳最多3个跳跃
     * 2. 每个跳跃必须是有效的跳跃动作
     *
     * @param elements 跳跃动作数组
     * @param validElements 有效跳跃动作列表
     * @return 是否有效
     */
    validateCombination(elements: string[], validElements: string[]): boolean {
        if (elements.length === 0 || elements.length > 3) {
            return false;
        }
        for (const element of elements) {
            if (!validElements.includes(element)) {
                return false;
            }
        }
        return true;
    }
    /**
     * 创建连跳组合对象
     *
     * @param elements 跳跃动作数组
     * @param baseValues 各跳跃基础分值数组
     * @param goeScores GOE评分数组
     * @return 连跳组合对象
     */
    createCombinationJump(elements: string[], baseValues: number[], goeScores: number[]): CombinationJump {
        const finalScore = this.calculateCombinationScore(baseValues, goeScores);
        return new CombinationJump(elements, baseValues, goeScores, finalScore);
    }
}
export default new ScoreCalculator();
