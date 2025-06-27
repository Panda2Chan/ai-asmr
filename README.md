# ASMR 视频生成器 - AI SAAS 平台

## 项目概述

这是一个基于 VEO3 AI 技术的 ASMR 视频生成器 SAAS 平台，用户可以轻松创建高质量的 ASMR 视频内容。

## 核心功能

### 🎬 视频生成
- **AI 驱动**: 基于 VEO3 AI 技术生成高质量 ASMR 视频
- **多种风格**: 支持多种 ASMR 风格和主题
- **自定义参数**: 可调整视频时长、风格、音效等参数
- **批量生成**: 支持批量创建多个视频

### 👤 用户系统
- **Google OAuth 登录**: 快速安全的身份验证
- **用户仪表板**: 个人视频库和生成历史
- **订阅管理**: 灵活的付费计划

### 💳 支付系统
- **Stripe 集成**: 安全的支付处理
- **多种套餐**: 按需付费和订阅模式
- **使用额度**: 基于用户套餐的视频生成配额

### 🌍 国际化
- **多语言支持**: 中文、英文等多语言界面
- **本地化体验**: 适配不同地区的用户习惯

## 技术架构

### 包管理器
- **pnpm**: 快速、节省磁盘空间的包管理器
  - 使用硬链接和符号链接，节省磁盘空间
  - 严格的依赖管理，避免幽灵依赖
  - 更快的安装速度
  - 更好的 monorepo 支持

### 前端技术栈
- **Next.js 15**: React 全栈框架
- **TypeScript**: 类型安全的 JavaScript
- **Tailwind CSS**: 现代化 UI 设计
- **NextAuth.js**: 身份验证解决方案

### 后端技术栈
- **Prisma ORM**: 数据库操作
- **MySQL**: 主数据库
- **VEO3 API**: AI 视频生成
- **Stripe API**: 支付处理

### 部署架构
- **Docker**: 容器化部署
- **Kubernetes**: 容器编排
- **CI/CD**: 自动化部署流程

## 项目结构

```
ai-amsr/
├── src/
│   ├── app/                 # Next.js App Router
│   ├── components/          # React 组件
│   ├── lib/                 # 工具函数和配置
│   ├── prisma/              # 数据库模型
│   └── types/               # TypeScript 类型定义
├── public/                  # 静态资源
├── docker/                  # Docker 配置
├── k8s/                     # Kubernetes 配置
└── docs/                    # 项目文档
```

## 快速开始

### 环境要求
- Node.js 18+
- pnpm 8+
- MySQL 8.0+
- Docker & Docker Compose

### 安装 pnpm

如果还没有安装 pnpm，请先安装：

```bash
# 使用 npm 安装 pnpm
npm install -g pnpm@8.15.0

# 或者使用其他方式安装
# macOS (使用 Homebrew)
brew install pnpm

# Windows (使用 Scoop)
scoop install pnpm

# Linux (使用 curl)
curl -fsSL https://get.pnpm.io/install.sh | sh -
```

### 安装步骤

1. **克隆项目**
```bash
git clone <repository-url>
cd ai-amsr
```

2. **快速设置（推荐）**
```bash
pnpm setup
```

3. **手动安装依赖**
```bash
pnpm install
```

4. **环境配置**
```bash
cp env.example .env.local
# 编辑 .env.local 文件，配置必要的环境变量
```

5. **数据库设置**
```bash
pnpm db:generate
pnpm db:push
```

6. **启动开发服务器**
```bash
pnpm dev
```

### 环境变量配置

```env
# 数据库
DATABASE_URL="mysql://user:password@localhost:3306/ai_amsr"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key"
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# VEO3 API
VEO3_API_KEY="your-veo3-api-key"
VEO3_API_URL="https://api.veo3.ai"

# Stripe
STRIPE_SECRET_KEY="your-stripe-secret-key"
STRIPE_PUBLISHABLE_KEY="your-stripe-publishable-key"
STRIPE_WEBHOOK_SECRET="your-stripe-webhook-secret"

# 应用配置
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

## 功能模块说明

### 1. 用户认证模块
- **文件位置**: `src/app/auth/`
- **功能**: Google OAuth 登录、用户会话管理
- **API 端点**: `/api/auth/*`

### 2. Dashboard 模块
- **文件位置**: `src/app/dashboard/`
- **功能**: 用户仪表板、统计信息、快速操作、最近视频
- **主要组件**:
  - `DashboardHeader`: 顶部导航栏，包含用户菜单和搜索
  - `DashboardSidebar`: 侧边导航栏，包含功能菜单
  - `DashboardStats`: 统计卡片，显示用户使用情况
  - `QuickActions`: 快速操作面板
  - `RecentVideos`: 最近生成的视频列表
- **API 端点**: `/api/user/profile`, `/api/videos/recent`

### 3. 视频生成模块
- **文件位置**: `src/app/generate/`
- **功能**: VEO3 API 集成、视频生成队列
- **API 端点**: `/api/generate/*`

### 4. 用户仪表板
- **文件位置**: `src/app/dashboard/`
- **功能**: 视频管理、使用统计、订阅信息
- **API 端点**: `/api/dashboard/*`

### 5. 支付系统
- **文件位置**: `src/app/payment/`
- **功能**: Stripe 支付集成、订阅管理
- **API 端点**: `/api/payment/*`

### 6. 国际化
- **文件位置**: `src/lib/i18n/`
- **功能**: 多语言支持、本地化配置

## API 文档

### 视频生成 API

#### POST /api/generate/video
生成新的 ASMR 视频

**请求参数**:
```json
{
  "prompt": "放松的雨声 ASMR",
  "duration": 60,
  "style": "nature",
  "audioType": "rain"
}
```

**响应**:
```json
{
  "id": "video_123",
  "status": "processing",
  "estimatedTime": 300
}
```

#### GET /api/generate/video/[id]
获取视频生成状态

**响应**:
```json
{
  "id": "video_123",
  "status": "completed",
  "videoUrl": "https://cdn.example.com/video.mp4",
  "thumbnailUrl": "https://cdn.example.com/thumbnail.jpg"
}
```

### 用户 API

#### GET /api/user/profile
获取用户信息

#### PUT /api/user/profile
更新用户信息

### 支付 API

#### POST /api/payment/create-checkout
创建支付会话

#### POST /api/payment/webhook
Stripe 支付回调

## 部署指南

### Docker 部署

1. **构建镜像**
```bash
pnpm docker:build
```

2. **运行容器**
```bash
docker-compose up -d
```

### Kubernetes 部署

1. **应用配置**
```bash
kubectl apply -f k8s/
```

2. **检查状态**
```bash
kubectl get pods -n ai-amsr
```

## 开发指南

### 包管理器
本项目使用 **pnpm** 作为包管理器，详细使用指南请查看 [pnpm 使用指南](docs/pnpm-guide.md)。

### 代码规范
- 使用 TypeScript 严格模式
- 遵循 ESLint 和 Prettier 配置
- 组件使用函数式组件和 Hooks
- API 路由使用 Next.js App Router

### 测试
```bash
# 运行单元测试
pnpm test

# 运行 E2E 测试
pnpm test:e2e

# 检查代码覆盖率
pnpm test:coverage
```

### 数据库迁移
```bash
# 创建迁移
pnpm db:migrate

# 应用迁移
pnpm db:push
```

### 代码格式化
```bash
# 格式化代码
pnpm format

# 检查代码格式
pnpm format:check
```

## 监控和日志

### 应用监控
- 使用 Next.js 内置的性能监控
- 集成 Sentry 错误追踪
- 数据库查询性能监控

### 日志系统
- 结构化日志记录
- 不同环境的日志级别配置
- 日志聚合和分析

## 安全考虑

- 所有 API 端点都需要身份验证
- 使用 HTTPS 加密传输
- 数据库连接使用 SSL
- 定期更新依赖包
- 实施速率限制防止滥用

## 性能优化

- 图片和视频 CDN 加速
- 数据库查询优化
- 前端代码分割
- 缓存策略实施

## 故障排除

### 常见问题

1. **数据库连接失败**
   - 检查 DATABASE_URL 配置
   - 确认 MySQL 服务运行状态

2. **VEO3 API 调用失败**
   - 验证 API 密钥有效性
   - 检查网络连接和防火墙设置

3. **支付回调失败**
   - 确认 Stripe Webhook 配置
   - 检查服务器可访问性

## 更新日志

### v1.0.0 (计划中)
- 初始版本发布
- 基础视频生成功能
- 用户认证系统
- 支付集成

## 贡献指南

1. Fork 项目
2. 创建功能分支
3. 提交更改
4. 创建 Pull Request

## 许可证

MIT License

## 联系方式

- 项目维护者: [PanChan]
- 邮箱: [a13281260713@gmail.com]
- 项目地址: [https://github.com/Panda2Chan/ai-asmr]

---

**注意**: 这是一个正在开发中的项目，功能可能会有所变化。请关注更新日志了解最新变化。 
