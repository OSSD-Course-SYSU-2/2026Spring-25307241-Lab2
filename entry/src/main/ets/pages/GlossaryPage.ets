/**
 * 冰迹花滑 - 术语词典
 * 专业词汇查询与解释
 */

import { IceNavBar } from '../common/components/IceNavBar';
import { IceCard } from '../common/components/IceCard';
import { IceTag } from '../common/components/IceTag';
import { SAMPLE_GLOSSARY } from '../viewmodel/SampleData';

// 分类项接口
interface CategoryItem {
  value: string;
  label: string;
}

@Entry
@Component
struct GlossaryPage {
  @State searchText: string = '';
  @State selectedCategory: string = 'ALL';
  @State terms: GlossaryTerm[] = [];
  @State expandedTerm: string | null = null;
  
  // 分类列表
  private categories: CategoryItem[] = [
    { value: 'ALL', label: '全部' },
    { value: '评分系统', label: '评分系统' },
    { value: '跳跃', label: '跳跃' },
    { value: '旋转', label: '旋转' },
    { value: '步法', label: '步法' },
    { value: '节目', label: '节目' }
  ];
  
  aboutToAppear() {
    this.loadTerms();
  }
  
  loadTerms() {
    let filtered = SAMPLE_GLOSSARY;
    
    // 分类筛选
    if (this.selectedCategory !== 'ALL') {
      filtered = filtered.filter(term => term.category === this.selectedCategory);
    }
    
    // 搜索筛选
    if (this.searchText) {
      const keyword = this.searchText.toLowerCase();
      filtered = filtered.filter(term =>
        term.term.toLowerCase().includes(keyword) ||
        term.termEn.toLowerCase().includes(keyword) ||
        (term.abbreviation && term.abbreviation.toLowerCase().includes(keyword)) ||
        term.definition.toLowerCase().includes(keyword)
      );
    }
    
    // 按字母排序
    filtered.sort((a, b) => a.term.localeCompare(b.term, 'zh'));
    
    this.terms = filtered;
  }
  
  build() {
    Column() {
      // 导航栏
      IceNavBar({
        title: '术语词典',
        showBack: true,
        navBackgroundColor: '#4FC3F7'
      });
      
      // 内容区
      Column() {
        // 搜索栏
        this.buildSearchBar();
        
        // 分类选择
        this.buildCategorySelector();
        
        // 术语列表
        this.buildTermList();
      }
      .layoutWeight(1)
    }
    .width('100%')
    .height('100%')
    .backgroundColor('#F5F5F5')
  }
  
  @Builder
  buildSearchBar() {
    Row() {
      TextInput({ placeholder: '搜索术语、缩写...', text: this.searchText })
        .layoutWeight(1)
        .height(40)
        .backgroundColor('#FFFFFF')
        .borderRadius(20)
        .padding({ left: 16, right: 16 })
        .onChange((value: string) => {
          this.searchText = value;
          this.loadTerms();
        })
    }
    .width('100%')
    .padding({ left: 16, right: 16, top: 12, bottom: 12 })
  }
  
  @Builder
  buildCategorySelector() {
    Scroll() {
      Row() {
        ForEach(this.categories, (item: CategoryItem) => {
          Button(item.label)
            .fontSize(12)
            .height(32)
            .padding({ left: 16, right: 16 })
            .backgroundColor(this.selectedCategory === item.value ? '#4FC3F7' : '#FFFFFF')
            .fontColor(this.selectedCategory === item.value ? '#FFFFFF' : '#666666')
            .borderRadius(16)
            .margin({ right: 8 })
            .onClick(() => {
              this.selectedCategory = item.value;
              this.loadTerms();
            })
        }, (item: CategoryItem) => item.value)
      }
      .padding({ left: 16, right: 16 })
    }
    .width('100%')
    .height(48)
    .scrollable(ScrollDirection.Horizontal)
    .scrollBar(BarState.Off)
  }
  
  @Builder
  buildTermList() {
    if (this.terms.length === 0) {
      Column() {
        Text('📖')
          .fontSize(64)
          .margin({ bottom: 16 })
        
        Text('未找到相关术语')
          .fontSize(16)
          .fontColor('#666666')
      }
      .width('100%')
      .layoutWeight(1)
      .justifyContent(FlexAlign.Center)
    } else {
      List() {
        ForEach(this.terms, (term: GlossaryTerm) => {
          ListItem() {
            this.TermCard(term);
          }
          .margin({ bottom: 8 })
        }, (term: GlossaryTerm) => term.id)
      }
      .width('100%')
      .layoutWeight(1)
      .padding({ left: 16, right: 16, top: 8, bottom: 8 })
    }
  }
  
  @Builder
  TermCard(term: GlossaryTerm) {
    Column() {
      // 标题行
      Row() {
        Column() {
          Row() {
            Text(term.term)
              .fontSize(16)
              .fontWeight(FontWeight.Bold)
              .fontColor('#333333')
            
            if (term.abbreviation) {
              Text('(' + term.abbreviation + ')')
                .fontSize(14)
                .fontColor('#666666')
                .margin({ left: 4 })
            }
          }
          .width('100%')
          
          Text(term.termEn)
            .fontSize(12)
            .fontColor('#999999')
            .margin({ top: 2 })
        }
        .layoutWeight(1)
        .alignItems(HorizontalAlign.Start)
        
        IceTag({ text: term.category, tagSize: 'small' })
        
        Text(this.expandedTerm === term.id ? '▲' : '▼')
          .fontSize(12)
          .fontColor('#999999')
          .margin({ left: 8 })
      }
      .width('100%')
      .onClick(() => {
        this.expandedTerm = this.expandedTerm === term.id ? null : term.id;
      })
      
      // 展开内容
      if (this.expandedTerm === term.id) {
        Column() {
          // 定义
          Text('定义')
            .fontSize(12)
            .fontWeight(FontWeight.Bold)
            .fontColor('#1976D2')
            .margin({ top: 12, bottom: 4 })
          
          Text(term.definition)
            .fontSize(14)
            .fontColor('#333333')
            .lineHeight(22)
          
          // 示例
          if (term.examples && term.examples.length > 0) {
            Text('示例')
              .fontSize(12)
              .fontWeight(FontWeight.Bold)
              .fontColor('#1976D2')
              .margin({ top: 12, bottom: 4 })
            
            ForEach(term.examples, (example: string) => {
              Row() {
                Text('•')
                  .fontSize(12)
                  .fontColor('#666666')
                  .margin({ right: 8 })
                
                Text(example)
                  .fontSize(12)
                  .fontColor('#666666')
                  .layoutWeight(1)
              }
              .width('100%')
              .margin({ top: 4 })
            }, (example: string) => example)
          }
          
          // 相关术语
          if (term.relatedTerms && term.relatedTerms.length > 0) {
            Text('相关术语')
              .fontSize(12)
              .fontWeight(FontWeight.Bold)
              .fontColor('#1976D2')
              .margin({ top: 12, bottom: 4 })
            
            Scroll() {
              Row() {
                ForEach(term.relatedTerms, (related: string) => {
                  IceTag({ text: related, tagSize: 'small' })
                    .margin({ right: 8, bottom: 4 })
                }, (related: string) => related)
              }
            }
            .width('100%')
            .scrollable(ScrollDirection.Horizontal)
            .scrollBar(BarState.Off)
          }
        }
        .width('100%')
        .padding({ top: 8 })
        .alignItems(HorizontalAlign.Start)
      }
    }
    .width('100%')
    .padding(16)
    .backgroundColor('#FFFFFF')
    .borderRadius(12)
  }
}

// 简化的术语类型
interface GlossaryTerm {
  id: string;
  term: string;
  termEn: string;
  abbreviation?: string;
  definition: string;
  examples?: string[];
  relatedTerms?: string[];
  category: string;
}
