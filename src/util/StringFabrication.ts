export {};

declare global {
    interface Object {
        stringify(): string;
    }
}

Object.prototype.stringify = function(): string {
    try {
        return JSON.stringify(this, null, 3);
    } catch {
        return <string>this;
    }
};
