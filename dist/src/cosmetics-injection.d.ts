declare global {
    interface Window {
        MutationObserver?: typeof MutationObserver;
    }
}
interface IMessageFromBackground {
    active: boolean;
    scripts: string[];
    blockedScripts: string[];
    styles: string[];
}
export declare function overrideUserAgent(): void;
export default class CosmeticInjection {
    private window;
    private backgroundAction;
    private injectedRules;
    private injectedScripts;
    private blockedScripts;
    private observedNodes;
    private mutationObserver;
    constructor(window: Window, backgroundAction: (action: string, ...args: any[]) => Promise<void>);
    unload(): void;
    handleResponseFromBackground({ active, scripts, blockedScripts, styles }: IMessageFromBackground): void;
    private handleRules;
    private onMutation;
    private startObserving;
}
export {};
