## 后端工程
基于 GIN + GORM + WIRE 实现的web脚手架[gin-gorm-admin](https://github.com/dot123/gin-gorm-admin)

## Build Setup

```bash
# 安装nodejs v12.22.12
https://nodejs.org/dist/v12.22.12/node-v12.22.12-win-x64.7z

# 进入项目目录
cd vue-admin

# 安装依赖
npm install

# 建议不要直接使用 cnpm 安装以来，会有各种诡异的 bug。可以通过如下操作解决 npm 下载速度慢的问题
npm install --registry=https://registry.npmmirror.com

# 启动服务
npm run dev
```

浏览器访问 [http://localhost:9528](http://localhost:9528)

## 发布

```bash
# 构建测试环境
npm run build:stage

# 构建生产环境
npm run build:prod
```

## 其它

```bash
# 预览发布环境效果
npm run preview

# 预览发布环境效果 + 静态资源分析
npm run preview -- --report

# 代码格式检查
npm run lint

# 代码格式检查并自动修复
npm run lint -- --fix
```

## Browsers support

Modern browsers and Internet Explorer 10+.
