import AbilityConstant from "@ohos:app.ability.AbilityConstant";
import UIAbility from "@ohos:app.ability.UIAbility";
import type Want from "@ohos:app.ability.Want";
import type { UIContext } from "@ohos:arkui.UIContext";
import type window from "@ohos:window";
import hilog from "@ohos:hilog";
const TAG = 'EntryAbility';
const DOMAIN_NUMBER = 0xFF00;
export default class EntryAbility extends UIAbility {
    // 用于存储迁移数据的LocalStorage
    storage: LocalStorage = new LocalStorage();
    onCreate(want: Want, launchParam: AbilityConstant.LaunchParam) {
        hilog.info(DOMAIN_NUMBER, TAG, '%{public}s', 'Ability onCreate');
        // 检查是否为迁移启动
        if (launchParam.launchReason === AbilityConstant.LaunchReason.CONTINUATION) {
            hilog.info(DOMAIN_NUMBER, TAG, 'Ability launched by continuation');
            // 恢复迁移数据
            this.restoreContinueData(want);
        }
        // 设置迁移状态为可迁移（保证迁移连续性）
        this.context.setMissionContinueState(AbilityConstant.ContinueState.ACTIVE, (result) => {
            hilog.info(DOMAIN_NUMBER, TAG, `setMissionContinueState result: ${JSON.stringify(result)}`);
        });
    }
    onDestroy() {
        hilog.info(DOMAIN_NUMBER, TAG, '%{public}s', 'Ability onDestroy');
    }
    onWindowStageCreate(windowStage: window.WindowStage) {
        // Main window is created, set main page for this ability
        hilog.info(DOMAIN_NUMBER, TAG, '%{public}s', 'Ability onWindowStageCreate');
        windowStage.loadContent('pages/EdgeFlowMainPage', (err, data) => {
            if (err.code) {
                hilog.error(DOMAIN_NUMBER, TAG, 'Failed to load the content. Cause: %{public}s', JSON.stringify(err) ?? '');
                return;
            }
            hilog.info(DOMAIN_NUMBER, TAG, 'Succeeded in loading the content. Data: %{public}s', JSON.stringify(data) ?? '');
            let uiContext: UIContext | undefined = windowStage.getMainWindowSync().getUIContext();
            AppStorage.setOrCreate('uiContext', uiContext);
        });
    }
    onWindowStageDestroy() {
        // Main window is destroyed, release UI related resources
        hilog.info(DOMAIN_NUMBER, TAG, '%{public}s', 'Ability onWindowStageDestroy');
    }
    onForeground() {
        // Ability has brought to foreground
        hilog.info(DOMAIN_NUMBER, TAG, '%{public}s', 'Ability onForeground');
    }
    onBackground() {
        // Ability has back to background
        hilog.info(DOMAIN_NUMBER, TAG, '%{public}s', 'Ability onBackground');
    }
    /**
     * 应用接续 - 保存迁移数据
     * 当应用触发迁移时，此接口在源端被调用
     */
    onContinue(wantParam: Record<string, Object>): AbilityConstant.OnContinueResult {
        hilog.info(DOMAIN_NUMBER, TAG, 'onContinue called');
        try {
            // 获取当前页面路径（从AppStorage中获取）
            const currentPage = AppStorage.get<string>('currentPage') || 'pages/EdgeFlowMainPage';
            hilog.info(DOMAIN_NUMBER, TAG, `Current page: ${currentPage}`);
            // 保存需要迁移的数据到wantParam
            wantParam['currentPage'] = currentPage;
            // 保存成就页面的滚动位置
            const achievementScrollOffset = AppStorage.get<number>('achievementScrollOffset');
            if (achievementScrollOffset) {
                wantParam['achievementScrollOffset'] = achievementScrollOffset;
                hilog.info(DOMAIN_NUMBER, TAG, `Saved achievement scroll offset: ${achievementScrollOffset}`);
            }
            // 如果有其他需要迁移的数据，也可以在这里保存
            // 例如：计算器的当前输入值、历史记录等
            const calculatorData = AppStorage.get<string>('calculatorData');
            if (calculatorData) {
                wantParam['calculatorData'] = calculatorData;
            }
            hilog.info(DOMAIN_NUMBER, TAG, 'onContinue data saved successfully');
            return AbilityConstant.OnContinueResult.AGREE;
        }
        catch (error) {
            hilog.error(DOMAIN_NUMBER, TAG, `onContinue error: ${JSON.stringify(error)}`);
            return AbilityConstant.OnContinueResult.REJECT;
        }
    }
    /**
     * 应用接续 - 恢复迁移数据（冷启动或多实例热启动）
     */
    private restoreContinueData(want: Want) {
        hilog.info(DOMAIN_NUMBER, TAG, 'restoreContinueData called');
        if (want.parameters) {
            // 恢复页面路径
            const currentPage = want.parameters['currentPage'] as string;
            if (currentPage) {
                AppStorage.setOrCreate('continuePage', currentPage);
                hilog.info(DOMAIN_NUMBER, TAG, `Restored page: ${currentPage}`);
            }
            // 恢复成就页面的滚动位置
            const achievementScrollOffset = want.parameters['achievementScrollOffset'] as number;
            if (achievementScrollOffset) {
                AppStorage.setOrCreate('achievementScrollOffset', achievementScrollOffset);
                hilog.info(DOMAIN_NUMBER, TAG, `Restored achievement scroll offset: ${achievementScrollOffset}`);
            }
            // 恢复其他数据
            const calculatorData = want.parameters['calculatorData'] as string;
            if (calculatorData) {
                AppStorage.setOrCreate('calculatorData', calculatorData);
                hilog.info(DOMAIN_NUMBER, TAG, 'Restored calculator data');
            }
        }
        // 触发页面恢复（必须在同步方法中执行）
        this.context.restoreWindowStage(this.storage);
    }
    /**
     * 应用接续 - 单实例热启动时调用
     */
    onNewWant(want: Want, launchParam: AbilityConstant.LaunchParam) {
        hilog.info(DOMAIN_NUMBER, TAG, 'onNewWant called');
        // 检查是否为迁移启动
        if (launchParam.launchReason === AbilityConstant.LaunchReason.CONTINUATION) {
            hilog.info(DOMAIN_NUMBER, TAG, 'onNewWant launched by continuation');
            // 设置迁移状态为可迁移
            this.context.setMissionContinueState(AbilityConstant.ContinueState.ACTIVE, (result) => {
                hilog.info(DOMAIN_NUMBER, TAG, `setMissionContinueState result: ${JSON.stringify(result)}`);
            });
            // 恢复迁移数据
            this.restoreContinueData(want);
        }
    }
    /**
     * 应用接续 - 窗口恢复
     * 迁移启动时，会触发此生命周期函数，而不是onWindowStageCreate
     */
    onWindowStageRestore(windowStage: window.WindowStage) {
        hilog.info(DOMAIN_NUMBER, TAG, 'onWindowStageRestore called');
        // 获取要恢复的页面路径
        const continuePage = AppStorage.get<string>('continuePage') || 'pages/EdgeFlowMainPage';
        hilog.info(DOMAIN_NUMBER, TAG, `Loading continue page: ${continuePage}`);
        // 加载恢复的页面
        windowStage.loadContent(continuePage, (err, data) => {
            if (err.code) {
                hilog.error(DOMAIN_NUMBER, TAG, 'Failed to load continue page. Cause: %{public}s', JSON.stringify(err) ?? '');
                // 如果加载失败，回退到主页
                windowStage.loadContent('pages/EdgeFlowMainPage', (fallbackErr) => {
                    if (fallbackErr.code) {
                        hilog.error(DOMAIN_NUMBER, TAG, 'Failed to load IceTraceHomePage. Cause: %{public}s', JSON.stringify(fallbackErr) ?? '');
                    }
                });
                return;
            }
            hilog.info(DOMAIN_NUMBER, TAG, 'Succeeded in loading continue page. Data: %{public}s', JSON.stringify(data) ?? '');
            // 获取UIContext并保存到AppStorage
            let uiContext: UIContext | undefined = windowStage.getMainWindowSync().getUIContext();
            AppStorage.setOrCreate('uiContext', uiContext);
            // 清除临时存储的迁移页面路径
            AppStorage.delete('continuePage');
        });
    }
}
