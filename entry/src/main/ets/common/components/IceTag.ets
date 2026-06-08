/**
 * 冰迹花滑 - 标签组件
 * 用于显示分类、难度等标签
 */

import { Difficulty, DIFFICULTY_NAMES, getDifficultyColor } from '../../viewmodel/IceTraceModel';

@Component
export struct IceTag {
  @Prop text: string = '';                    // 标签文字
  @Prop type: 'default' | 'primary' | 'success' | 'warning' | 'danger' = 'default';
  @Prop tagSize: 'small' | 'medium' | 'large' = 'medium';
  @Prop customColor: string = '';             // 自定义颜色
  
  build() {
    Text(this.text)
      .fontSize(this.getFontSize())
      .fontColor(this.getTextColor())
      .padding(this.getPadding())
      .backgroundColor(this.getBackgroundColor())
      .borderRadius(this.getBorderRadius())
  }
  
  private getFontSize(): number {
    switch (this.tagSize) {
      case 'small': return 10;
      case 'medium': return 12;
      case 'large': return 14;
      default: return 12;
    }
  }
  
  private getPadding(): Padding {
    switch (this.tagSize) {
      case 'small': return { left: 4, right: 4, top: 2, bottom: 2 };
      case 'medium': return { left: 8, right: 8, top: 4, bottom: 4 };
      case 'large': return { left: 12, right: 12, top: 6, bottom: 6 };
      default: return { left: 8, right: 8, top: 4, bottom: 4 };
    }
  }
  
  private getBorderRadius(): number {
    switch (this.tagSize) {
      case 'small': return 4;
      case 'medium': return 6;
      case 'large': return 8;
      default: return 6;
    }
  }
  
  private getBackgroundColor(): string {
    if (this.customColor) {
      return this.customColor + '20'; // 20% 透明度
    }
    
    switch (this.type) {
      case 'primary': return '#4FC3F720';
      case 'success': return '#4CAF5020';
      case 'warning': return '#FF980020';
      case 'danger': return '#F4433620';
      default: return '#99999920';
    }
  }
  
  private getTextColor(): string {
    if (this.customColor) {
      return this.customColor;
    }
    
    switch (this.type) {
      case 'primary': return '#1976D2';
      case 'success': return '#4CAF50';
      case 'warning': return '#FF9800';
      case 'danger': return '#F44336';
      default: return '#666666';
    }
  }
}

/**
 * 难度标签组件
 */
@Component
export struct DifficultyTag {
  @Prop difficulty: Difficulty = 'BEGINNER';
  
  build() {
    IceTag({
      text: DIFFICULTY_NAMES[this.difficulty],
      customColor: getDifficultyColor(this.difficulty),
      tagSize: 'small'
    });
  }
}
