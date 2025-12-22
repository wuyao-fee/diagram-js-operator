/**
 * 解析svg字符串
 * @param {*} svgString
 * @returns
 */
export function parseSvg(svgString: string): Element {
  const parser = new DOMParser();
  const doc = parser.parseFromString(svgString, 'image/svg+xml');
  return document.importNode(doc.documentElement, true) as Element;
}

// 自动推导所有合法的图标名称
export type IconName = keyof typeof icons;
export interface IconMap {
  'left-align': string;
  'center-align': string;
  'right-align': string;
  'top-align': string;
  'middle-align': string;
  'bottom-align': string;
  'zoom-in': string;
  'zoom-out': string;
  import: string;
  download: string;
  preview: string;
  switch: string;
}

/**
 * 创建自定义图标
 * @param {*} name
 * @returns
 */
export function createIcon(name: IconName) {
  return parseSvg(icons[name]);
}

/**
 * 自定义图标
 */
export const icons: IconMap = {
  // 左对齐
  'left-align': `<svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16 6H32V12H16V6Z" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M6 42L6 6" stroke="currentColor" stroke-width="4" stroke-linecap="round"/><path d="M16 21H36V27H16V21Z" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M16 36H42V42H16V36Z" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  // 水平居中对齐
  'center-align': `<svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="7" y="12" width="6" height="24" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
      <rect x="21" y="8" width="6" height="32" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
      <rect x="35" y="15" width="6" height="18" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`,
  // 右对齐
  'right-align': `<svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M42 42V6" stroke="currentColor" stroke-width="4" stroke-linecap="round"/>
      <path d="M16 6H32V12H16V6Z" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M12 21H32V27H12V21Z" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M6 36H32V42H6V36Z" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    `,
  //   顶对齐
  'top-align': `<svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="7" y="8" width="6" height="24" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><rect x="21" y="8" width="6" height="32" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><rect x="35" y="8" width="6" height="18" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  //   垂直居中对齐
  'middle-align': `<svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="12" y="7" width="24" height="6" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><rect x="8" y="21" width="32" height="6" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><rect x="15" y="35" width="18" height="6" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  //   底对齐
  'bottom-align': `<svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="7" y="16" width="6" height="24" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><rect x="21" y="8" width="6" height="32" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><rect x="35" y="22" width="6" height="18" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  //   放大
  'zoom-in': `<svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21 38C30.3888 38 38 30.3888 38 21C38 11.6112 30.3888 4 21 4C11.6112 4 4 11.6112 4 21C4 30.3888 11.6112 38 21 38Z" fill="none" stroke="currentColor" stroke-width="4" stroke-linejoin="round"/><path d="M21 15L21 27" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M15.0156 21.0156L27 21" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M33.2216 33.2217L41.7069 41.707" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  //   缩小
  'zoom-out': `<svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21 38C30.3888 38 38 30.3888 38 21C38 11.6112 30.3888 4 21 4C11.6112 4 4 11.6112 4 21C4 30.3888 11.6112 38 21 38Z" fill="none" stroke="currentColor" stroke-width="4" stroke-linejoin="round"/><path d="M15 21L27 21" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M33.2216 33.2217L41.7069 41.707" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  //   上传、导入
  import: `<svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><mask id="icon-5dbef5267f10b972" maskUnits="userSpaceOnUse" x="0" y="0" width="48" height="48" style="mask-type: alpha"><path d="M48 0H0V48H48V0Z" fill="currentColor"/></mask><g mask="url(#icon-5dbef5267f10b972)"><path d="M6 24.0083V42H42V24" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M33 15L24 6L15 15" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M23.9917 32V6" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></g></svg>`,
  // 导出、下载
  download: `<svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 24.0083V42H42V24" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M33 23L24 32L15 23" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M23.9917 6V32" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  //   预览、查看
  preview: `<svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M24 41C33.9411 41 42 32.678 42 27C42 21.322 33.9411 13 24 13C14.0589 13 6 21.3278 6 27C6 32.6722 14.0589 41 24 41Z" fill="none" stroke="currentColor" stroke-width="4" stroke-linejoin="round"/><path d="M24 33C27.3137 33 30 30.3137 30 27C30 23.6863 27.3137 21 24 21C20.6863 21 18 23.6863 18 27C18 30.3137 20.6863 33 24 33Z" fill="none" stroke="currentColor" stroke-width="4" stroke-linejoin="round"/><path d="M13.2637 11.2661L15.8582 14.8863" stroke="currentColor" stroke-width="4" stroke-linecap="round"/><path d="M35.625 11.7104L33.0304 15.3307" stroke="currentColor" stroke-width="4" stroke-linecap="round"/><path d="M24.0088 7V13" stroke="currentColor" stroke-width="4" stroke-linecap="round"/></svg>`,
  //  开关
  switch: `<svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14.5 8C13.8406 8.37652 13.2062 8.79103 12.6 9.24051C11.5625 10.0097 10.6074 10.8814 9.75 11.8402C6.79377 15.1463 5 19.4891 5 24.2455C5 34.6033 13.5066 43 24 43C34.4934 43 43 34.6033 43 24.2455C43 19.4891 41.2062 15.1463 38.25 11.8402C37.3926 10.8814 36.4375 10.0097 35.4 9.24051C34.7938 8.79103 34.1594 8.37652 33.5 8" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M24 4V24" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
};
