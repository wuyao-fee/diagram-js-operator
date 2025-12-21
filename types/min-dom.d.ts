// types/min-dom.d.ts
declare module "min-dom" {
    export function query(selector: string, node?: Element): Element | null;
    export function queryAll(selector: string, node?: Element): Element[];
    export function classes(node: Element): {
        has(className: string): boolean;
        add(...classNames: string[]): void;
        remove(...classNames: string[]): void;
        toggle(className: string, force?: boolean): void;
    };
    export function attr(node: Element, name: string): string | null;
    export function attr(node: Element, name: string, value: string | null): void;
    export function remove(node: Element): void;
    export function clear(node: Element): void;
    export function append(parent: Element, child: Element | string): void;
    export function prepend(parent: Element, child: Element | string): void;
    export function create(tagName: string, attrs?: Record<string, string>): Element;
}
