<div align="center">
  <h1>Arco Design Pro for Nuxt3</h1>
</div>

<div align="center">

基于 [Arco Design](https://arco.design/) Vue 组件库的开箱即用的中后台前端解决方案。

Admin 中后台管理页面，创新的多架构方案。

[![license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/arco-design/arco-design-pro/blob/main/LICENSE)

</div>

<div align="center">

[English](./README.md) | 简体中文

</div>

## ✨ Features

- **TypeScript** - 代码完全使用 TypeScript 书写。
- **Vue3** - 面向未来，拥抱 Vue3。
- **Pinia** - 紧跟潮流，美味可口。
- **Arco Design** - 由 [ArcoDesign Vue](https://github.com/arco-design/arco-design-vue) 组件库强力驱动。
- **Templates** - 16+ 页面模版，覆盖表格、列表、表单、工作台、可视化等场景。
- **Themes** - 基于「[风格配置平台](https://arco.design/themes)」丰富的主题市场，让你的项目千变万化。
- **Dark Theme** - 一键丝滑切换暗黑风格。
- **Mock** - 内置 api 模拟方案，代码即注释，更加仿真线上环境。
- **I18n** - 内置国际化多语言解决方案。
- **Config** - 灵活配置页面配色、布局等。
- **Nuxt3** - 采用Nuxt3作为底层框架，更加灵活、高效。
- **Auth** - 内置 Auth 模块，支持JWT登录方式，满足专业场景的需求。

## 变更说明

### auth模块

本来按照Nuxt 3的推荐方式，引入了Sidebase的Auth模块，也能满足一般工作场景的需求。Auth模块的设计理念为了配合Nuxt 3的SSR功能，采用Cookie方式存储和使用令牌，而且无法通过配置来自定义和修改。Cookie方式很方便，但存在安全风险，与其它后端系统集成时也可能要求更高的技术耦合度。
因此本项目对Auth模块进行了重构（在modeles/jwt目录下），同样采用JWT的方式产生令牌，但采用SessionStorage的方式存储令牌。所有与后端交互全部采用JWT的标准方式进行登录验证。这样管理平台可以更加方便的与其它后端系统整合，基本只需要使用相同的密钥，各种后端框架对于JWT的支持都可以直接使用。

## 🌈 使用方式

采用下面的命令启动开发服务。其它命令请参考node文档。

```bash
$ npm install

$ npm run dev
```

资深的开发人员，推荐采用bunjs作为node平台的替代方案。在以上命令中用bun代替npm即可。

## 🔗 Link

- [Arco Design Pro 官网](https://pro.arco.design)
- [蚂蚁大神的Vitesse for Nuxt3](https://github.com/antfu/vitesse-nuxt3)
- [Sidebase的Auth模块](https://github.com/sidebase/nuxt-auth)

## LICENSE

[MIT](./LICENSE)
