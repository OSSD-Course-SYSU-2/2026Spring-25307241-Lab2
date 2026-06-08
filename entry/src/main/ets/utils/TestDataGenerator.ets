/**
 * 冰迹·EdgeFlow - 测试数据生成工具
 * 用于生成演示数据
 */

import { DataStore } from '../services/DataStore';
import { PracticeRecord } from '../models/IceTraceData';

export class TestDataGenerator {
  private static instance: TestDataGenerator;
  private dataStore: DataStore = DataStore.getInstance();
  
  static getInstance(): TestDataGenerator {
    if (!TestDataGenerator.instance) {
      TestDataGenerator.instance = new TestDataGenerator();
    }
    return TestDataGenerator.instance;
  }
  
  // 生成测试数据
  generateTestData() {
    const userData = this.dataStore.getUserData();
    
    // 如果已有数据，不重复生成
    if (userData.totalPractices > 0) {
      return;
    }
    
    // 生成最近30天的练习记录
    const now = new Date();
    const moves = ['1A', '2A', '2Lz', '3Lz', '2F', '3F', '2Lo', '2S', '2T', 'USp', 'SSp', 'CSp', 'StSq', 'CiSt'];
    
    for (let i = 0; i < 30; i++) {
      const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
      const dateStr = date.toISOString().split('T')[0];
      
      // 每天随机练习2-5次
      const practiceCount = Math.floor(Math.random() * 4) + 2;
      
      for (let j = 0; j < practiceCount; j++) {
        const hour = Math.floor(Math.random() * 12) + 8; // 8:00 - 20:00
        const minute = Math.floor(Math.random() * 60);
        const timeStr = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        
        // 随机选择动作
        const moveIndex = Math.floor(Math.random() * moves.length);
        const move = moves[moveIndex];
        
        // 随机时长 15-45分钟
        const duration = (Math.floor(Math.random() * 31) + 15) * 60; // 转换为秒
        
        // 计算疲劳度
        let fatigue = 1;
        if (move.includes('A') || move.includes('Lz') || move.includes('F') || move.includes('Lo') || move.includes('S') || move.includes('T')) {
          fatigue = 7; // 跳跃
        } else if (move.includes('Sp')) {
          fatigue = 3; // 旋转
        }
        
        // 随机备注
        const notes = this.getRandomNote();
        
        const record: PracticeRecord = {
          id: `${dateStr}-${timeStr}-${move}`,
          moveName: move,
          date: dateStr,
          time: timeStr,
          duration: duration,
          fatigue: fatigue,
          notes: notes
        };
        
        this.dataStore.addPracticeRecord(record);
      }
    }
    
    // 为一些动作添加要点
    this.dataStore.updateMoveTips('2A', '起跳时重心要靠前，双臂要充分打开，落冰时膝盖要弯曲缓冲');
    this.dataStore.updateMoveTips('3Lz', '勾手起跳要用力，空中转体要快，落冰要稳');
    this.dataStore.updateMoveTips('SSp', '蹲转时重心要低，背部要挺直，手臂要收紧');
    this.dataStore.updateMoveTips('StSq', '步法要流畅，用刃要清晰，上身要保持优美姿态');
  }
  
  private getRandomNote(): string {
    const notes = [
      '状态不错',
      '成功率提高',
      '需要加强核心力量',
      '落冰不够稳',
      '起跳角度需要调整',
      '旋转速度有待提高',
      '步法流畅度有进步',
      '今天感觉很好',
      '疲劳度较高',
      '技术细节需要打磨'
    ];
    return notes[Math.floor(Math.random() * notes.length)];
  }
}
