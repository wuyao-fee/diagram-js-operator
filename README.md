# diagram-js-operator

#### 介绍

基于diagram-js/bpmn-js的BPMN操作栏插件
![image](https://gitee.com/wuyao-fee/img/raw/master/operator.png)

#### 架构

Nodejs18.17.0 + Rollup + Typescript + Sass

#### 安装

```js
npm i diagram-js-operator
```

#### 使用

使用operator插件扩展您的应用程序。我们将使用bpmn-js作为示例：

```js
import BpmnModeler from 'bpmn-js/lib/Modeler';
import OperatorModule from 'diagram-js-operator';

const bpmnModeler = new BpmnModeler({
  container: '#canvas',
  additionalModules: [OperatorModule],
  // 配置项
  operator: {},
});
```

为了正确地设置样式，请手动引入样式文件：

```
import 'diagram-js-operator/dist/diagram-js-operator.css';
```

#### operator配置

| 配置项          | 作用             | 参数                                                                                                                                                                          |
| :-------------- | ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| color           | 设置按钮文本颜色 | 默认#fff                                                                                                                                                                      |
| backgroundColor | 设置按钮背景颜色 | 默认#009688                                                                                                                                                                   |
| disabledActions | 禁用指定操作按钮 | importXml / exportXml / exportSvg / previewXml / toggleMinimap / leftAlign / centerAlign / rightAlign / topAlign / middleAlign / bottomAlign / zoomOut / zoomPercent / zoomIn |

#### 参与贡献

1.  Fork 本仓库
2.  新建 Feat_xxx 分支
3.  提交代码
4.  新建 Pull Request

#### 特技

1.  使用 Readme_XXX.md 来支持不同的语言，例如 Readme_en.md, Readme_zh.md
2.  Gitee 官方博客 [blog.gitee.com](https://blog.gitee.com)
3.  你可以 [https://gitee.com/explore](https://gitee.com/explore) 这个地址来了解 Gitee 上的优秀开源项目
4.  [GVP](https://gitee.com/gvp) 全称是 Gitee 最有价值开源项目，是综合评定出的优秀开源项目
5.  Gitee 官方提供的使用手册 [https://gitee.com/help](https://gitee.com/help)
6.  Gitee 封面人物是一档用来展示 Gitee 会员风采的栏目 [https://gitee.com/gitee-stars/](https://gitee.com/gitee-stars/)
