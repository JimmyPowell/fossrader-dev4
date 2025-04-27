# FOSSRADER 前端数据模型文档

本文档详细描述了FOSSRADER平台前端所使用的主要数据模型及其字段。

## 项目列表模型 (Project)

项目列表数据用于展示项目概览，主要用于项目列表页面。

```typescript
interface Project {
  id: string | number;     // 项目唯一标识符
  title: string;           // 项目名称
  owner: string;           // 项目所有者/创建者
  source: string;          // 项目来源平台(如 github, gitlab, bitbucket)
  description: string;     // 项目简短描述
  tags: string[];          // 项目标签/技术栈
  likes: number;           // 项目点赞/收藏数
}
```

## 项目详情模型 (ProjectDetail)

项目详情数据用于展示单个项目的详细信息，主要用于项目详情页面。

```typescript
interface ProjectDetail {
  id: string;                      // 项目唯一标识符
  title: string;                   // 项目名称
  description: string;             // 项目简短描述
  author: string;                  // 项目作者/所有者
  platform: string;                // 项目托管平台
  stars: number;                   // 项目星标数
  forks: number;                   // 项目分支数
  issues: number;                  // 项目问题数
  tags: string[];                  // 技术栈标签
  keywords: string[];              // 关键词
  screenshots: string[];           // 项目截图URL数组
  detailedDescription: string;     // 项目详细描述
}
```

## 数据模型关系

- **Project模型**：提供项目概览，用于项目列表展示
- **ProjectDetail模型**：提供项目详情，是对Project模型的扩展，包含更多的详细信息

## 数据使用场景

1. **项目列表页面**：
   - 展示所有项目的概览信息
   - 支持网格视图和列表视图切换
   - 每个项目卡片展示基本信息

2. **项目详情页面**：
   - 通过项目ID获取特定项目的详细信息
   - 展示项目的完整描述、截图、技术栈等
   - 展示与项目相关的统计数据（星标数、分支数、问题数）

## 备注

当前数据模型基于前端模拟数据设计，后续需要与后端API接口进行对接和统一。不同视图或功能可能会使用这些模型的不同子集或扩展字段。 