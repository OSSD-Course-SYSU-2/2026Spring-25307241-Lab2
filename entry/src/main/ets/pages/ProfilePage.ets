/**
 * 冰迹·EdgeFlow - 我的页面
 * 个人设置、装备管理、训练歌单
 */

import router from '@ohos.router';

interface Equipment {
  id: string;
  type: 'SKATES' | 'BLADES';
  name: string;
  brand: string;
  purchaseDate: string;
  sharpenDate?: string;
  usageHours: number;
  maxHours: number;
  status: string;
}

interface Playlist {
  id: string;
  name: string;
  programType: 'SP' | 'FS';
  songCount: number;
  totalDuration: number;
}

interface SettingItem {
  icon: string;
  title: string;
  subtitle: string;
  action: string;
}

interface UserInfo {
  name: string;
  level: string;
  avatar: string;
}

@Component
export struct ProfilePage {
  @State showEquipmentDialog: boolean = false;
  @State showPlaylistDialog: boolean = false;
  @State selectedEquipment: Equipment | null = null;
  
  // 用户信息
  private userInfo: UserInfo = {
    name: '冰上舞者',
    level: 'Lv.12',
    avatar: '⛸️'
  };
  
  // 装备数据
  @State equipments: Equipment[] = [
    { id: '1', type: 'SKATES', name: 'Edea Piano', brand: 'Edea', purchaseDate: '2023-06-15', sharpenDate: '2024-01-10', usageHours: 48.5, maxHours: 80, status: '使用中' },
    { id: '2', type: 'BLADES', name: 'Matrix Legacy', brand: 'Jackson', purchaseDate: '2023-06-15', sharpenDate: '2024-02-20', usageHours: 48.5, maxHours: 60, status: '使用中' }
  ];
  
  // 训练歌单
  @State playlists: Playlist[] = [
    { id: '1', name: '短节目训练', programType: 'SP', songCount: 3, totalDuration: 180 },
    { id: '2', name: '自由滑训练', programType: 'FS', songCount: 5, totalDuration: 240 }
  ];
  
  // 设置项
  private settings: SettingItem[] = [
    { icon: '⚙️', title: '训练设置', subtitle: '计时提醒、音乐绑定', action: 'training' },
    { icon: '🔔', title: '通知设置', subtitle: '磨刀提醒、训练提醒', action: 'notification' },
    { icon: '📊', title: '数据管理', subtitle: '导出、备份、清除', action: 'data' },
    { icon: '🎨', title: '主题设置', subtitle: '冰蓝、极光、深空', action: 'theme' }
  ];
  
  build() {
    Stack() {
      Column() {
        this.buildUserCard()
        Scroll() {
          Column() {
            this.buildEquipmentSection()
            this.buildPlaylistSection()
            this.buildSettingsList()
            this.buildOtherFeatures()
          }
          .width('100%')
        }
        .width('100%')
        .layoutWeight(1)
        .scrollBar(BarState.Off)
      }
      .width('100%')
      .height('100%')
      
      if (this.showEquipmentDialog && this.selectedEquipment) {
        this.buildEquipmentDialog()
      }
      
      if (this.showPlaylistDialog) {
        this.buildPlaylistDetail()
      }
    }
    .width('100%')
    .height('100%')
  }
  
  @Builder
  buildUserCard() {
    Column() {
      Row() {
        Text(this.userInfo.avatar)
          .fontSize(50)
        Column() {
          Text(this.userInfo.name)
            .fontSize(20)
            .fontWeight(FontWeight.Bold)
            .fontColor('#FFFFFF')
          Text(this.userInfo.level)
            .fontSize(14)
            .fontColor('rgba(255, 255, 255, 0.8)')
            .margin({ top: 5 })
        }
        .alignItems(HorizontalAlign.Start)
        .margin({ left: 20 })
        .layoutWeight(1)
        Text('编辑')
          .fontSize(14)
          .fontColor('#FFFFFF')
          .backgroundColor('rgba(255, 255, 255, 0.3)')
          .borderRadius(15)
          .padding({ left: 15, right: 15, top: 8, bottom: 8 })
      }
      .width('100%')
      .padding(20)
    }
    .width('100%')
    .margin({ top: 20, left: 20, right: 20 })
    .backgroundColor('rgba(255, 255, 255, 0.15)')
    .borderRadius(20)
    .backdropBlur(10)
  }
  
  @Builder
  buildEquipmentSection() {
    Column() {
      Row() {
        Text('⛸️ 装备管家')
          .fontSize(18)
          .fontWeight(FontWeight.Bold)
          .fontColor('#333333')
        Blank()
        Text('+ 添加')
          .fontSize(14)
          .fontColor('#3A7BD5')
      }
      .width('100%')
      .margin({ bottom: 15 })
      
      ForEach(this.equipments, (equip: Equipment) => {
        Row() {
          Column() {
            Row() {
              Text(equip.type === 'SKATES' ? '⛸️' : '🔪')
                .fontSize(24)
              Column() {
                Text(equip.name)
                  .fontSize(16)
                  .fontWeight(FontWeight.Bold)
                  .fontColor('#333333')
                Text(`${equip.brand} | ${equip.purchaseDate}`)
                  .fontSize(12)
                  .fontColor('#999999')
                  .margin({ top: 3 })
              }
              .alignItems(HorizontalAlign.Start)
              .layoutWeight(1)
              .margin({ left: 12 })
            }
            .width('100%')
            Row() {
              Text(`已使用 ${equip.usageHours}h / 建议 ${equip.maxHours}h`)
                .fontSize(11)
                .fontColor('#666666')
              Blank()
              Text(equip.status)
                .fontSize(11)
                .fontColor('#FFFFFF')
                .backgroundColor('#4CAF50')
                .borderRadius(8)
                .padding({ left: 8, right: 8, top: 3, bottom: 3 })
            }
            .width('100%')
            .margin({ top: 8 })
            Progress({ value: equip.usageHours, total: equip.maxHours, type: ProgressType.Linear })
              .width('100%')
              .height(4)
              .color(equip.usageHours > equip.maxHours * 0.8 ? '#FF6B6B' : '#4CAF50')
              .margin({ top: 5 })
          }
          .layoutWeight(1)
        }
        .width('100%')
        .padding(15)
        .backgroundColor('#F8F8F8')
        .borderRadius(15)
        .margin({ bottom: 10 })
        .onClick(() => {
          this.selectedEquipment = equip;
          this.showEquipmentDialog = true;
        })
      })
      
      Row() {
        Text('⚠️')
          .fontSize(24)
        Column() {
          Text('磨刀提醒')
            .fontSize(14)
            .fontWeight(FontWeight.Bold)
            .fontColor('#333333')
          Text('已使用48.5小时，建议磨刀')
            .fontSize(12)
            .fontColor('#FF6B6B')
            .margin({ top: 3 })
        }
        .alignItems(HorizontalAlign.Start)
        .layoutWeight(1)
        .margin({ left: 15 })
        Toggle({ type: ToggleType.Switch, isOn: true })
          .selectedColor('#3A7BD5')
      }
      .width('100%')
      .padding(15)
      .backgroundColor('#FFF9E6')
      .borderRadius(15)
      .margin({ top: 5 })
    }
    .width('100%')
    .padding(20)
    .backgroundColor('#FFFFFF')
    .borderRadius(20)
    .margin({ top: 15, left: 20, right: 20 })
  }
  
  @Builder
  buildPlaylistSection() {
    Column() {
      Row() {
        Text('🎵 训练歌单')
          .fontSize(18)
          .fontWeight(FontWeight.Bold)
          .fontColor('#333333')
        Blank()
        Text('+ 新建')
          .fontSize(14)
          .fontColor('#3A7BD5')
      }
      .width('100%')
      .margin({ bottom: 15 })
      
      ForEach(this.playlists, (playlist: Playlist) => {
        Row() {
          Column() {
            Row() {
              Text('🎶')
                .fontSize(24)
              Column() {
                Text(playlist.name)
                  .fontSize(16)
                  .fontWeight(FontWeight.Bold)
                  .fontColor('#333333')
                Text(`${playlist.programType === 'SP' ? '短节目' : '自由滑'} | ${playlist.songCount}首`)
                  .fontSize(12)
                  .fontColor('#999999')
                  .margin({ top: 3 })
              }
              .alignItems(HorizontalAlign.Start)
              .layoutWeight(1)
              .margin({ left: 12 })
            }
            .width('100%')
          }
          .layoutWeight(1)
          Text(`${Math.floor(playlist.totalDuration / 60)}分钟`)
            .fontSize(14)
            .fontColor('#3A7BD5')
        }
        .width('100%')
        .padding(15)
        .backgroundColor('#F8F8F8')
        .borderRadius(15)
        .margin({ bottom: 10 })
        .onClick(() => {
          this.showPlaylistDialog = true;
        })
      })
    }
    .width('100%')
    .padding(20)
    .backgroundColor('#FFFFFF')
    .borderRadius(20)
    .margin({ top: 15, left: 20, right: 20 })
  }
  
  @Builder
  buildSettingsList() {
    Column() {
      Text('⚙️ 设置')
        .fontSize(18)
        .fontWeight(FontWeight.Bold)
        .fontColor('#333333')
        .width('100%')
        .margin({ bottom: 15 })
      
      ForEach(this.settings, (setting: SettingItem) => {
        Row() {
          Text(setting.icon)
            .fontSize(24)
          Column() {
            Text(setting.title)
              .fontSize(15)
              .fontWeight(FontWeight.Bold)
              .fontColor('#333333')
            Text(setting.subtitle)
              .fontSize(12)
              .fontColor('#999999')
              .margin({ top: 3 })
          }
          .alignItems(HorizontalAlign.Start)
          .layoutWeight(1)
          .margin({ left: 15 })
          Text('›')
            .fontSize(20)
            .fontColor('#CCCCCC')
        }
        .width('100%')
        .padding(12)
        .backgroundColor('#F8F8F8')
        .borderRadius(12)
        .margin({ bottom: 8 })
      })
    }
    .width('100%')
    .padding(20)
    .backgroundColor('#FFFFFF')
    .borderRadius(20)
    .margin({ top: 15, left: 20, right: 20 })
  }
  
  @Builder
  buildOtherFeatures() {
    Column() {
      Row() {
        this.featureButton('❓', '帮助中心')
        this.featureButton('📝', '意见反馈')
        this.featureButton('ℹ️', '关于我们')
      }
      .width('100%')
      .justifyContent(FlexAlign.SpaceEvenly)
    }
    .width('100%')
    .padding(20)
    .margin({ top: 15, left: 20, right: 20, bottom: 20 })
  }
  
  @Builder
  featureButton(icon: string, label: string) {
    Column() {
      Text(icon)
        .fontSize(24)
      Text(label)
        .fontSize(12)
        .fontColor('#666666')
        .margin({ top: 5 })
    }
    .width(80)
    .height(70)
    .backgroundColor('#FFFFFF')
    .borderRadius(15)
    .justifyContent(FlexAlign.Center)
  }
  
  @Builder
  buildEquipmentDialog() {
    Column() {
      Column() {
        Text(this.selectedEquipment!.type === 'SKATES' ? '⛸️' : '🔪')
          .fontSize(50)
        Text(this.selectedEquipment!.name)
          .fontSize(20)
          .fontWeight(FontWeight.Bold)
          .fontColor('#333333')
          .margin({ top: 15 })
        Column() {
          Row() {
            Text('品牌: ')
              .fontSize(14)
              .fontColor('#666666')
            Text(this.selectedEquipment!.brand)
              .fontSize(14)
              .fontColor('#333333')
          }
          .width('100%')
          .margin({ bottom: 8 })
          Row() {
            Text('购买日期: ')
              .fontSize(14)
              .fontColor('#666666')
            Text(this.selectedEquipment!.purchaseDate)
              .fontSize(14)
              .fontColor('#333333')
          }
          .width('100%')
          .margin({ bottom: 8 })
          Row() {
            Text('开刃日期: ')
              .fontSize(14)
              .fontColor('#666666')
            Text(this.selectedEquipment!.sharpenDate || '未记录')
              .fontSize(14)
              .fontColor('#333333')
          }
          .width('100%')
          .margin({ bottom: 8 })
          Row() {
            Text('使用时长: ')
              .fontSize(14)
              .fontColor('#666666')
            Text(`${this.selectedEquipment!.usageHours}h / ${this.selectedEquipment!.maxHours}h`)
              .fontSize(14)
              .fontColor('#333333')
          }
          .width('100%')
        }
        .width('100%')
        .padding(15)
        .backgroundColor('#F8F8F8')
        .borderRadius(12)
        .margin({ top: 20 })
        Row() {
          Button('编辑')
            .fontSize(14)
            .fontColor('#FFFFFF')
            .backgroundColor('#3A7BD5')
            .borderRadius(20)
            .width(100)
          Button('关闭')
            .fontSize(14)
            .fontColor('#666666')
            .backgroundColor('#F0F0F0')
            .borderRadius(20)
            .width(100)
            .margin({ left: 15 })
            .onClick(() => {
              this.showEquipmentDialog = false;
            })
        }
        .margin({ top: 20 })
      }
      .width('85%')
      .padding(25)
      .backgroundColor('#FFFFFF')
      .borderRadius(20)
    }
    .width('100%')
    .height('100%')
    .backgroundColor('rgba(0, 0, 0, 0.5)')
    .justifyContent(FlexAlign.Center)
  }
  
  @Builder
  buildPlaylistDetail() {
    Column() {
      Column() {
        Text('🎵 歌单详情')
          .fontSize(18)
          .fontWeight(FontWeight.Bold)
          .fontColor('#333333')
          .margin({ bottom: 20 })
        Column() {
          this.SongItem('Ballade No.1', 'Chopin', 72, '2A, 3T')
          this.SongItem('Clair de Lune', 'Debussy', 60, 'USp, StSq')
          this.SongItem('Swan Lake', 'Tchaikovsky', 80, '3S, SSp')
        }
        .width('100%')
        Button('关闭')
          .fontSize(16)
          .fontColor('#FFFFFF')
          .backgroundColor('#3A7BD5')
          .borderRadius(20)
          .width(120)
          .margin({ top: 20 })
          .onClick(() => {
            this.showPlaylistDialog = false;
          })
      }
      .width('85%')
      .padding(25)
      .backgroundColor('#FFFFFF')
      .borderRadius(20)
    }
    .width('100%')
    .height('100%')
    .backgroundColor('rgba(0, 0, 0, 0.5)')
    .justifyContent(FlexAlign.Center)
  }
  
  @Builder
  SongItem(name: string, artist: string, bpm: number, moves: string) {
    Row() {
      Column() {
        Text(name)
          .fontSize(15)
          .fontWeight(FontWeight.Bold)
          .fontColor('#333333')
        Text(`${artist} | BPM: ${bpm}`)
          .fontSize(12)
          .fontColor('#999999')
          .margin({ top: 3 })
        Text(`关联: ${moves}`)
          .fontSize(11)
          .fontColor('#3A7BD5')
          .margin({ top: 3 })
      }
      .alignItems(HorizontalAlign.Start)
      .layoutWeight(1)
      Text('▶️')
        .fontSize(24)
    }
    .width('100%')
    .padding(12)
    .backgroundColor('#F8F8F8')
    .borderRadius(10)
    .margin({ bottom: 8 })
  }
}
