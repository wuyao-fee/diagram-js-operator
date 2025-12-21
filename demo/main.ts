import Diagram from 'diagram-js';
import MyOperatorModule from '../dist/diagram-js-operator.esm.js'; // ← 直接引用 dist

// 创建画布
const diagram = new Diagram({
  container: '#canvas',
  modules: [
    // 注册你的模块
    MyOperatorModule,
  ],
});

// 加载一个空图
diagram.invoke(function (canvas: any) {
  canvas.setRootElement({ id: 'root' });
});

// 示例：添加一个矩形节点
diagram.invoke(function (elementFactory: any, canvas: any) {
  const shape = elementFactory.createShape({
    type: 'my-operator-node',
    x: 100,
    y: 100,
    width: 100,
    height: 60,
  });

  canvas.addShape(shape);
});
