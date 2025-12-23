const __TEST__: unique symbol = Symbol();
import { classes } from 'min-dom';
import { createIcon, icons } from './icon';
import type { IconMap, IconName } from './icon';
export { createIcon, icons } from './icon';
export type { IconName, IconMap } from './icon';
import type { Injector } from 'didi';
import type EventBus from 'diagram-js/lib/core/EventBus';
import type Canvas from 'diagram-js/lib/core/Canvas';
import type BpmnJS from 'bpmn-js/lib/Modeler';
import type Selection from 'diagram-js/lib/features/selection/Selection';
import type AlignElements from 'diagram-js/lib/features/align-elements/AlignElements';
import type { Element as DiagramElement } from 'diagram-js/lib/model/Types';

export interface OperatorConfig {
  color?: string; // 按钮文本颜色
  backgroundColor?: string; // 按钮背景颜色
  disabledActions?: string[]; // 禁用指定按钮
}

export interface Options {
  text?: string; // 按钮文本
  className?: string[]; // 按钮类名
  svg?: Element; // 按钮图标
  parent?: HTMLElement | null; // 按钮父元素
  onClick?: (e: MouseEvent) => void; // 点击事件
}

export interface InputOptions extends Options {
  accept?: string; // 限制文件类型
  multiple?: boolean; // 是否多选
  onChange?: (e: Event) => void; // 文件选择事件
}

export interface SelectionChangeEvent {
  oldSelection: DiagramElement[];
  newSelection: DiagramElement[];
}

class Operator {
  // 👇 静态属性声明（TypeScript 认可）
  static $inject = [
    'config.operator',
    'injector',
    'eventBus',
    'canvas',
    'bpmnjs',
    'minimap',
    'selection',
    'alignElements',
  ] as const; // 👈 加 `as const` 可提升类型精度（可选）

  private _config: OperatorConfig;
  private _injector: Injector;
  private _eventBus: EventBus;
  private _canvas: Canvas;
  private _bpmnjs: BpmnJS;
  private _minimap: any;
  private _selection: Selection;
  private _alignElements: AlignElements;

  private _state: {
    isOpenMinimap: boolean; // 是否打开小地图
    zoomScale: number; // 缩放比例
    selectionList: DiagramElement[]; // 选中元素列表
  };
  private _parent: HTMLElement | null = null;

  constructor(
    config: OperatorConfig,
    injector: Injector,
    eventBus: EventBus,
    canvas: Canvas,
    bpmnjs: BpmnJS,
    minimap: any,
    selection: Selection,
    alignElements: AlignElements
  ) {
    this._config = {
      color: '#fff',
      backgroundColor: '#009688',
      disabledActions: [],
      ...config,
    };
    this._injector = injector;
    this._eventBus = eventBus;
    this._canvas = canvas;
    this._bpmnjs = bpmnjs;
    this._minimap = minimap;
    this._selection = selection;
    this._alignElements = alignElements;

    this._state = {
      isOpenMinimap: false, // 是否打开小地图
      zoomScale: 1, // 缩放比例
      selectionList: [], // 选中元素列表
    };

    this._init();
  }

  /**
   * 初始化
   */
  _init() {
    console.log('Operator init');
    const canvas = this._canvas;
    const container = canvas.getContainer();
    const parent = (this._parent = document.createElement('div'));
    classes(parent).add('djs-operator');
    container.appendChild(parent);

    // 监听选中元素
    this._eventBus.on<SelectionChangeEvent>('selection.changed', ({ newSelection }) => {
      console.log('selection.changed', newSelection);
      this._state.selectionList = newSelection;
    });

    // 渲染操作栏
    this._render();
  }

  _render() {
    console.log('Operator render', this._parent);
    const parent = this._parent;
    if (!parent) return;

    // 创建input file
    if (this.isActionEnabled('importXml')) {
      this.createAndMountInputFile({
        text: '导入XML',
        className: ['djs-operator-btn', 'djs-operator-upload-btn', 'import-xml-btn'],
        parent: parent,
        accept: '.xml',
        svg: createIcon('import'),
        onChange: e => {
          // ✅ 类型守卫：确保 target 是 HTMLInputElement
          if (!(e.target instanceof HTMLInputElement)) return;
          if (!e.target || !e.target.files || e.target.files.length === 0) return;
          const file = e.target.files[0];
          const reader = new FileReader();
          reader.onload = async e => {
            if (!e.target || !e.target.result) return;
            const xml = e.target.result;
            // ✅ 确保 xml 是 string
            if (typeof xml !== 'string') {
              return;
            }
            const { warnings = [] } = (await this._bpmnjs.importXML(xml)) || {};
            if (warnings && warnings.length) {
              warnings.forEach(warn => {
                console.warn(warn);
              });
            }
            // 调整缩放比例和合适
            this._canvas.zoom('fit-viewport', { x: 0, y: 0 });
          };
          reader.readAsText(file);
        },
      });
    }

    if (this.isActionEnabled('exportXml')) {
      this.createAndMountButton({
        text: '导出XML',
        className: ['djs-operator-btn', 'export-xml-btn'],
        svg: createIcon('download'),
        parent: parent,
        onClick: async () => {
          console.log('导出XML');
          const { xml = '' } = (await this._bpmnjs.saveXML({ format: true })) || {};
          const blob = new Blob([xml], { type: 'text/xml' });
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'diagram.xml';
          a.click();
          URL.revokeObjectURL(url);
        },
      });
    }

    if (this.isActionEnabled('exportSvg')) {
      this.createAndMountButton({
        text: '导出SVG',
        className: ['djs-operator-btn', 'export-svg-btn'],
        svg: createIcon('download'),
        parent: parent,
        onClick: async () => {
          console.log('导出SVG');
          const { svg = '' } = (await this._bpmnjs.saveSVG()) || {};
          const blob = new Blob([svg], { type: 'image/svg+xml' });
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'diagram.svg';
          a.click();
          URL.revokeObjectURL(url);
        },
      });
    }
    // if (this.isActionEnabled('previewXml')) {
    //   this.createAndMountButton({
    //     text: '预览XML',
    //     className: ['djs-operator-btn', 'preview-xml-btn'],
    //     svg: createIcon('preview'),
    //     parent: parent,
    //     onClick: () => {
    //       console.log('预览XML');
    //     },
    //   });
    // }
    if (this.isActionEnabled('toggleMinimap')) {
      const isOpenMinimap = this._state.isOpenMinimap;
      this.createAndMountButton({
        text: isOpenMinimap ? '关闭小地图' : '打开小地图',
        className: [
          'djs-operator-btn',
          isOpenMinimap ? 'open-minimap-btn' : 'close-minimap-btn',
          'minimap-btn',
        ],
        svg: createIcon('switch'),
        parent: parent,
        onClick: () => {
          console.log('切换小地图');
          this._state.isOpenMinimap = !this._state.isOpenMinimap;
          this._minimap.toggle(this._state.isOpenMinimap);
          this.updateMinimapButton();
        },
      });
    }

    if (this.isActionEnabled('leftAlign')) {
      this.createAndMountButton({
        className: ['djs-operator-btn', 'left-align-btn'],
        svg: createIcon('left-align'),
        parent: parent,
        onClick: () => {
          console.log('左对齐');
          this._alignElements.trigger(this._state.selectionList, 'left');
        },
      });
    }

    if (this.isActionEnabled('centerAlign')) {
      this.createAndMountButton({
        className: ['djs-operator-btn', 'center-align-btn'],
        svg: createIcon('center-align'),
        parent: parent,
        onClick: () => {
          console.log('居中对齐');
          this._alignElements.trigger(this._state.selectionList, 'center');
        },
      });
    }

    if (this.isActionEnabled('rightAlign')) {
      this.createAndMountButton({
        className: ['djs-operator-btn', 'right-align-btn'],
        svg: createIcon('right-align'),
        parent: parent,
        onClick: () => {
          console.log('右对齐');
          this._alignElements.trigger(this._state.selectionList, 'right');
        },
      });
    }

    if (this.isActionEnabled('topAlign')) {
      this.createAndMountButton({
        className: ['djs-operator-btn', 'top-align-btn'],
        svg: createIcon('top-align'),
        parent: parent,
        onClick: () => {
          console.log('顶对齐');
          this._alignElements.trigger(this._state.selectionList, 'top');
        },
      });
    }
    if (this.isActionEnabled('middleAlign')) {
      this.createAndMountButton({
        className: ['djs-operator-btn', 'middle-align-btn'],
        svg: createIcon('middle-align'),
        parent: parent,
        onClick: () => {
          console.log('垂直居中对齐');
          this._alignElements.trigger(this._state.selectionList, 'middle');
        },
      });
    }

    if (this.isActionEnabled('bottomAlign')) {
      this.createAndMountButton({
        className: ['djs-operator-btn', 'bottom-align-btn'],
        svg: createIcon('bottom-align'),
        parent: parent,
        onClick: () => {
          console.log('底对齐');
          this._alignElements.trigger(this._state.selectionList, 'bottom');
        },
      });
    }

    if (this.isActionEnabled('zoomOut')) {
      this.createAndMountButton({
        className: ['djs-operator-btn', 'zoom-out-btn'],
        svg: createIcon('zoom-out'),
        parent: parent,
        onClick: () => {
          console.log('缩小');
          this._state.zoomScale -= 0.1;
          this._canvas.zoom(this._state.zoomScale, { x: 0, y: 0 });
          //   更新百分比
          this.updateZoomPercentButton();
        },
      });
    }

    if (this.isActionEnabled('zoomPercent')) {
      this.createAndMountButton({
        text: (this._state.zoomScale * 100).toFixed(0) + '%',
        className: ['djs-operator-btn', 'zoom-percent-btn'],
        parent: parent,
        onClick: () => {
          console.log('百分比', this._state.zoomScale);
        },
      });
    }

    if (this.isActionEnabled('zoomIn')) {
      this.createAndMountButton({
        className: ['djs-operator-btn', 'zoom-in-btn'],
        svg: createIcon('zoom-in'),
        parent: parent,
        onClick: () => {
          console.log('放大');
          this._state.zoomScale += 0.1;
          this._canvas.zoom(this._state.zoomScale, { x: 0, y: 0 });
          //   更新百分比
          this.updateZoomPercentButton();
        },
      });
    }
  }

  isActionEnabled(action: string): boolean {
    // 判断_config有没有disabledActions属性
    if (this._config.disabledActions && this._config.disabledActions.length > 0) {
      return !this._config.disabledActions.includes(action);
    }
    return true;
  }

  /**
   * 创建 input 文件并挂载到指定父元素
   * @param {*} options
   */
  createAndMountInputFile(options: InputOptions): HTMLElement {
    const {
      text = '',
      accept = '',
      multiple = false,
      className = [],
      svg = null,
      parent = null,
      onChange = null,
    } = options;
    // 1. 创建 input 元素
    const fileInput = document.createElement('input');

    // 2. 设置类型为 file
    fileInput.type = 'file';

    // 3. （可选）设置其他属性
    fileInput.accept = accept; // 限制文件类型
    fileInput.multiple = multiple; // 是否允许多选（默认 false）
    const id = 'import-xml-input' + Math.random().toString(36).substr(2, 9);
    fileInput.id = id; // 设置 ID（便于关联 label）
    fileInput.style.display = 'none'; // 通常隐藏，通过按钮触发

    // 创建 label 元素作为按钮
    const label = document.createElement('label');
    label.setAttribute('for', id);

    // 设置颜色、背景
    if (this._config.color) label.style.setProperty('--btn-text-color', this._config.color);
    if (this._config.backgroundColor)
      label.style.setProperty('--btn-bg-color', this._config.backgroundColor);

    if (svg) label.appendChild(svg);
    if (text) {
      const span = document.createElement('span');
      span.appendChild(document.createTextNode(text));
      label.appendChild(span);
    }

    // 4. 添加 CSS 类名
    if (className && className.length > 0) {
      className.forEach(name => {
        if (name) classes(label).add(name);
      });
    }

    // 4. 添加 change 事件监听
    if (onChange) {
      fileInput.addEventListener('change', onChange);
    }

    // 5. 将 input和label 元素添加到父容器中
    if (parent) {
      parent.appendChild(fileInput);
      parent.appendChild(label);
    }
    return label;
  }

  /**
   * 创建按钮并挂载到指定父元素
   * @param {string} text - 按钮文本
   * @param {string[]} className - CSS 类名数组
   * @param {HTMLElement} svg - SVG 图标
   * @param {HTMLElement} parent - 父容器
   * @param {Function} onClick - 点击回调
   * @returns {HTMLButtonElement}
   */
  createAndMountButton(options: Options): HTMLElement {
    const { text = '', className = [], svg = null, parent = null, onClick = null } = options;
    const btn = document.createElement('button');
    // 设置颜色、背景
    if (this._config.color) btn.style.setProperty('--btn-text-color', this._config.color);
    if (this._config.backgroundColor)
      btn.style.setProperty('--btn-bg-color', this._config.backgroundColor);
    if (svg) btn.appendChild(svg);
    if (text) {
      const span = document.createElement('span');
      span.appendChild(document.createTextNode(text));
      btn.appendChild(span);
    }
    if (className && className.length > 0) {
      className.forEach(name => {
        if (name) classes(btn).add(name);
      });
    }
    if (onClick) btn.addEventListener('click', onClick);
    if (parent) parent.appendChild(btn);
    return btn;
  }

  /**
   * 更新小地图按钮的文本和类名
   * @returns
   */
  updateMinimapButton(): void {
    if (!this._parent) return;
    const btn = this._parent.querySelector('.djs-operator-btn.minimap-btn');
    if (!btn) return;

    // 更新文本
    const textNode = btn.querySelector('span');
    if (textNode) {
      textNode.textContent = this._state.isOpenMinimap ? '关闭小地图' : '打开小地图';
    }

    // 更新类名（先清理旧的，再加新的）
    classes(btn).remove('open-minimap-btn', 'close-minimap-btn');
    classes(btn).add(this._state.isOpenMinimap ? 'open-minimap-btn' : 'close-minimap-btn');
  }

  /**
   * 更新缩放百分比按钮的文本和类名
   */
  updateZoomPercentButton(): void {
    if (!this._parent) return;
    const btn = this._parent.querySelector('.djs-operator-btn.zoom-percent-btn');
    if (!btn) return;
    // 更新文本
    const textNode = btn.querySelector('span');
    if (textNode) {
      textNode.textContent = (this._state.zoomScale * 100).toFixed(0) + '%';
    }
  }
}

Operator.$inject = [
  'config.operator',
  'injector',
  'eventBus',
  'canvas',
  'bpmnjs',
  'minimap',
  'selection',
  'alignElements',
];

export default {
  __init__: ['operator'],
  operator: ['type', Operator],
};
