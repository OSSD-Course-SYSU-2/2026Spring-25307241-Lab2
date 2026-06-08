/**
 * 分布式数据管理服务
 * 支持跨设备数据同步和流转
 */
import { distributedData } from '@kit.ArkData';
import { hilog } from '@kit.PerformanceAnalysisKit';

const TAG = 'DistributedDataManager';
const DOMAIN_NUMBER = 0xFF00;

export class DistributedDataManager {
  private static instance: DistributedDataManager;
  private kvManager: distributedData.KVManager | null = null;
  private kvStore: distributedData.KVStore | null = null;
  private storeId: string = 'ice_trace_data_store';
  
  private constructor() {}
  
  static getInstance(): DistributedDataManager {
    if (!DistributedDataManager.instance) {
      DistributedDataManager.instance = new DistributedDataManager();
    }
    return DistributedDataManager.instance;
  }
  
  /**
   * 初始化分布式数据管理器
   */
  async initialize(context: Context): Promise<boolean> {
    try {
      // 创建KVManager
      const kvManagerConfig: distributedData.KVManagerConfig = {
        bundleName: context.applicationInfo.name,
        context: context
      };
      
      this.kvManager = distributedData.createKVManager(kvManagerConfig);
      hilog.info(DOMAIN_NUMBER, TAG, 'KVManager created successfully');
      
      // 创建KVStore
      const options: distributedData.Options = {
        createIfMissing: true,
        encrypt: false,
        backup: false,
        autoSync: true,
        kvStoreType: distributedData.KVStoreType.SINGLE_VERSION,
        securityLevel: distributedData.SecurityLevel.S1
      };
      
      this.kvStore = await this.kvManager.getKVStore(this.storeId, options);
      hilog.info(DOMAIN_NUMBER, TAG, 'KVStore created successfully');
      
      // 注册数据变化监听
      this.registerDataChangeListener();
      
      return true;
    } catch (error) {
      hilog.error(DOMAIN_NUMBER, TAG, `Failed to initialize: ${JSON.stringify(error)}`);
      return false;
    }
  }
  
  /**
   * 注册数据变化监听
   */
  private registerDataChangeListener(): void {
    if (!this.kvStore) {
      return;
    }
    
    this.kvStore.on('dataChange', distributedData.SubscribeType.SUBSCRIBE_TYPE_REMOTE, 
      (data: distributedData.ChangeNotification) => {
        hilog.info(DOMAIN_NUMBER, TAG, 'Data changed from remote device');
        // 处理远程设备的数据变化
        this.handleRemoteDataChange(data);
      });
  }
  
  /**
   * 处理远程数据变化
   */
  private handleRemoteDataChange(data: distributedData.ChangeNotification): void {
    try {
      // 更新本地数据
      data.updateEntries.forEach((entry: distributedData.Entry) => {
        const key = entry.key;
        const value = entry.value;
        hilog.info(DOMAIN_NUMBER, TAG, `Updating local data: ${key}`);
        AppStorage.setOrCreate(key, value);
      });
      
      // 删除本地数据
      data.deleteEntries.forEach((entry: distributedData.Entry) => {
        const key = entry.key;
        hilog.info(DOMAIN_NUMBER, TAG, `Deleting local data: ${key}`);
        AppStorage.delete(key);
      });
    } catch (error) {
      hilog.error(DOMAIN_NUMBER, TAG, `Failed to handle remote data change: ${JSON.stringify(error)}`);
    }
  }
  
  /**
   * 保存数据到分布式存储
   */
  async saveData(key: string, value: string): Promise<boolean> {
    if (!this.kvStore) {
      hilog.warn(DOMAIN_NUMBER, TAG, 'KVStore not initialized');
      return false;
    }
    
    try {
      await this.kvStore.put(key, value);
      hilog.info(DOMAIN_NUMBER, TAG, `Data saved: ${key}`);
      return true;
    } catch (error) {
      hilog.error(DOMAIN_NUMBER, TAG, `Failed to save data: ${JSON.stringify(error)}`);
      return false;
    }
  }
  
  /**
   * 从分布式存储读取数据
   */
  async getData(key: string): Promise<string | null> {
    if (!this.kvStore) {
      hilog.warn(DOMAIN_NUMBER, TAG, 'KVStore not initialized');
      return null;
    }
    
    try {
      const value = await this.kvStore.get(key);
      return value;
    } catch (error) {
      hilog.error(DOMAIN_NUMBER, TAG, `Failed to get data: ${JSON.stringify(error)}`);
      return null;
    }
  }
  
  /**
   * 删除分布式存储中的数据
   */
  async deleteData(key: string): Promise<boolean> {
    if (!this.kvStore) {
      hilog.warn(DOMAIN_NUMBER, TAG, 'KVStore not initialized');
      return false;
    }
    
    try {
      await this.kvStore.delete(key);
      hilog.info(DOMAIN_NUMBER, TAG, `Data deleted: ${key}`);
      return true;
    } catch (error) {
      hilog.error(DOMAIN_NUMBER, TAG, `Failed to delete data: ${JSON.stringify(error)}`);
      return false;
    }
  }
  
  /**
   * 同步数据到其他设备
   */
  async syncData(): Promise<boolean> {
    if (!this.kvStore) {
      hilog.warn(DOMAIN_NUMBER, TAG, 'KVStore not initialized');
      return false;
    }
    
    try {
      // 获取所有需要同步的数据
      const iceTraceData = AppStorage.get<string>('iceTraceData');
      if (iceTraceData) {
        await this.saveData('iceTraceData', iceTraceData);
      }
      
      hilog.info(DOMAIN_NUMBER, TAG, 'Data synced successfully');
      return true;
    } catch (error) {
      hilog.error(DOMAIN_NUMBER, TAG, `Failed to sync data: ${JSON.stringify(error)}`);
      return false;
    }
  }
  
  /**
   * 获取流转状态数据
   */
  getContinueData(): Record<string, Object> {
    const continueData: Record<string, Object> = {};
    
    // 保存当前页面
    const currentPage = AppStorage.get<string>('currentPage');
    if (currentPage) {
      continueData['currentPage'] = currentPage;
    }
    
    // 保存用户数据
    const iceTraceData = AppStorage.get<string>('iceTraceData');
    if (iceTraceData) {
      continueData['iceTraceData'] = iceTraceData;
    }
    
    // 保存训练状态
    const isTraining = AppStorage.get<boolean>('isTraining');
    if (isTraining !== undefined) {
      continueData['isTraining'] = isTraining;
    }
    
    const trainingTime = AppStorage.get<number>('trainingTime');
    if (trainingTime !== undefined) {
      continueData['trainingTime'] = trainingTime;
    }
    
    const selectedMoves = AppStorage.get<string[]>('selectedMoves');
    if (selectedMoves) {
      continueData['selectedMoves'] = JSON.stringify(selectedMoves);
    }
    
    return continueData;
  }
  
  /**
   * 恢复流转状态数据
   */
  restoreContinueData(data: Record<string, Object>): void {
    try {
      // 恢复当前页面
      const currentPage = data['currentPage'] as string;
      if (currentPage) {
        AppStorage.setOrCreate('continuePage', currentPage);
      }
      
      // 恢复用户数据
      const iceTraceData = data['iceTraceData'] as string;
      if (iceTraceData) {
        AppStorage.setOrCreate('iceTraceData', iceTraceData);
      }
      
      // 恢复训练状态
      const isTraining = data['isTraining'] as boolean;
      if (isTraining !== undefined) {
        AppStorage.setOrCreate('isTraining', isTraining);
      }
      
      const trainingTime = data['trainingTime'] as number;
      if (trainingTime !== undefined) {
        AppStorage.setOrCreate('trainingTime', trainingTime);
      }
      
      const selectedMovesStr = data['selectedMoves'] as string;
      if (selectedMovesStr) {
        const selectedMoves = JSON.parse(selectedMovesStr) as string[];
        AppStorage.setOrCreate('selectedMoves', selectedMoves);
      }
      
      hilog.info(DOMAIN_NUMBER, TAG, 'Continue data restored successfully');
    } catch (error) {
      hilog.error(DOMAIN_NUMBER, TAG, `Failed to restore continue data: ${JSON.stringify(error)}`);
    }
  }
  
  /**
   * 清理资源
   */
  async cleanup(): Promise<void> {
    try {
      if (this.kvStore) {
        this.kvStore.off('dataChange');
        if (this.kvManager) {
          await this.kvManager.closeKVStore(this.storeId);
        }
        this.kvStore = null;
      }
      
      if (this.kvManager) {
        this.kvManager = null;
      }
      
      hilog.info(DOMAIN_NUMBER, TAG, 'Cleanup completed');
    } catch (error) {
      hilog.error(DOMAIN_NUMBER, TAG, `Failed to cleanup: ${JSON.stringify(error)}`);
    }
  }
}
