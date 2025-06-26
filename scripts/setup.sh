#!/bin/bash

# AI AMSR 项目设置脚本
echo "🚀 开始设置 AI AMSR 项目..."

# 检查 Node.js 版本
echo "📋 检查 Node.js 版本..."
if ! command -v node &> /dev/null; then
    echo "❌ Node.js 未安装，请先安装 Node.js 18+"
    exit 1
fi

NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js 版本过低，需要 18+ 版本"
    exit 1
fi

echo "✅ Node.js 版本检查通过: $(node -v)"

# 检查 pnpm 是否安装
echo "📋 检查 pnpm..."
if ! command -v pnpm &> /dev/null; then
    echo "📦 安装 pnpm..."
    npm install -g pnpm@8.15.0
else
    echo "✅ pnpm 已安装: $(pnpm --version)"
fi

# 安装依赖
echo "📦 安装项目依赖..."
pnpm install

# 生成 Prisma 客户端
echo "🗄️ 生成 Prisma 客户端..."
pnpm db:generate

# 检查环境变量文件
if [ ! -f ".env.local" ]; then
    echo "📝 创建环境变量文件..."
    cp env.example .env.local
    echo "⚠️  请编辑 .env.local 文件，配置必要的环境变量"
else
    echo "✅ 环境变量文件已存在"
fi

# 检查数据库连接
echo "🔍 检查数据库连接..."
if command -v mysql &> /dev/null; then
    echo "✅ MySQL 客户端已安装"
else
    echo "⚠️  MySQL 客户端未安装，请确保数据库服务可用"
fi

# 运行类型检查
echo "🔍 运行 TypeScript 类型检查..."
pnpm type-check

# 运行代码格式化
echo "🎨 格式化代码..."
pnpm format

# 运行 lint 检查
echo "🔍 运行代码检查..."
pnpm lint

echo ""
echo "🎉 项目设置完成！"
echo ""
echo "📋 下一步操作："
echo "1. 编辑 .env.local 文件，配置环境变量"
echo "2. 启动数据库服务"
echo "3. 运行 'pnpm db:push' 创建数据库表"
echo "4. 运行 'pnpm dev' 启动开发服务器"
echo ""
echo "📚 更多信息请查看 README.md 文件" 