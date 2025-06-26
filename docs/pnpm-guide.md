# pnpm 使用指南

## 什么是 pnpm？

pnpm 是一个快速、节省磁盘空间的包管理器，它是 npm 的替代品，具有以下优势：

- **节省磁盘空间**: 使用硬链接和符号链接，避免重复安装相同的包
- **更快的安装速度**: 比 npm 和 yarn 更快
- **严格的依赖管理**: 避免幽灵依赖问题
- **更好的 monorepo 支持**: 内置工作区功能
- **安全性**: 更严格的依赖解析

## 安装 pnpm

### 全局安装
```bash
# 使用 npm 安装
npm install -g pnpm@8.15.0

# 使用 Homebrew (macOS)
brew install pnpm

# 使用 Scoop (Windows)
scoop install pnpm

# 使用 curl (Linux)
curl -fsSL https://get.pnpm.io/install.sh | sh -
```

### 验证安装
```bash
pnpm --version
# 应该输出: 8.15.0
```

## 基本命令

### 安装依赖
```bash
# 安装所有依赖
pnpm install

# 安装特定包
pnpm add <package-name>

# 安装开发依赖
pnpm add -D <package-name>

# 安装全局包
pnpm add -g <package-name>
```

### 运行脚本
```bash
# 运行开发服务器
pnpm dev

# 构建项目
pnpm build

# 运行测试
pnpm test

# 运行 lint
pnpm lint
```

### 管理依赖
```bash
# 更新依赖
pnpm update

# 移除依赖
pnpm remove <package-name>

# 查看依赖树
pnpm list

# 查看过时的包
pnpm outdated
```

## 项目配置

### package.json 配置
```json
{
  "packageManager": "pnpm@8.15.0",
  "engines": {
    "node": ">=18.0.0",
    "pnpm": ">=8.0.0"
  }
}
```

### .npmrc 配置
```ini
# 自动安装对等依赖
auto-install-peers=true

# 严格的对等依赖检查
strict-peer-dependencies=false

# 保存精确版本
save-exact=true

# 使用 pnpm 的存储
store-dir=./.pnpm-store

# 启用 pnpm 的符号链接
symlink=true
```

## 工作区 (Workspace)

### 配置工作区
创建 `pnpm-workspace.yaml` 文件：
```yaml
packages:
  - '.'
  - 'packages/*'
  - 'apps/*'
```

### 工作区命令
```bash
# 在所有包中运行命令
pnpm -r run build

# 在特定包中运行命令
pnpm --filter <package-name> run dev

# 安装工作区依赖
pnpm install --recursive
```

## 缓存管理

### 查看缓存
```bash
# 查看缓存目录
pnpm store path

# 查看缓存大小
pnpm store prune
```

### 清理缓存
```bash
# 清理未使用的包
pnpm store prune

# 清理所有缓存
pnpm store prune --force
```

## 与 CI/CD 集成

### GitHub Actions
```yaml
- name: Setup pnpm
  uses: pnpm/action-setup@v2
  with:
    version: 8.15.0

- name: Install dependencies
  run: pnpm install --frozen-lockfile
```

### 缓存优化
```yaml
- name: Get pnpm store directory
  shell: bash
  run: |
    echo "STORE_PATH=$(pnpm store path --silent)" >> $GITHUB_ENV

- name: Setup pnpm cache
  uses: actions/cache@v3
  with:
    path: ${{ env.STORE_PATH }}
    key: ${{ runner.os }}-pnpm-store-${{ hashFiles('**/pnpm-lock.yaml') }}
    restore-keys: |
      ${{ runner.os }}-pnpm-store-
```

## 故障排除

### 常见问题

1. **权限问题**
```bash
# 修复权限
sudo chown -R $USER:$GROUP ~/.pnpm-store
```

2. **网络问题**
```bash
# 设置镜像
pnpm config set registry https://registry.npmmirror.com/
```

3. **依赖冲突**
```bash
# 清理并重新安装
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

### 调试命令
```bash
# 查看详细日志
pnpm install --loglevel debug

# 查看依赖树
pnpm list --depth=0

# 检查过时的包
pnpm outdated
```

## 最佳实践

1. **锁定文件**: 始终提交 `pnpm-lock.yaml` 文件
2. **精确版本**: 使用 `save-exact=true` 保存精确版本
3. **对等依赖**: 配置 `auto-install-peers=true`
4. **缓存**: 在 CI/CD 中配置缓存以提高构建速度
5. **工作区**: 对于 monorepo 项目使用工作区功能

## 迁移指南

### 从 npm 迁移
```bash
# 删除 node_modules 和 package-lock.json
rm -rf node_modules package-lock.json

# 安装 pnpm
npm install -g pnpm

# 重新安装依赖
pnpm install
```

### 从 yarn 迁移
```bash
# 删除 node_modules 和 yarn.lock
rm -rf node_modules yarn.lock

# 安装 pnpm
npm install -g pnpm

# 重新安装依赖
pnpm install
```

## 更多资源

- [pnpm 官方文档](https://pnpm.io/)
- [pnpm GitHub 仓库](https://github.com/pnpm/pnpm)
- [pnpm 最佳实践](https://pnpm.io/best-practices)
- [pnpm 工作区指南](https://pnpm.io/workspaces) 