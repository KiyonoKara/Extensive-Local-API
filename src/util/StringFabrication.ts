export {};

declare global {
    interface Object {
        stringify(): string;
    }
}

Object.prototype.stringify = function() {
    try {
        return JSON.stringify(this, null, 3);
    } catch {
        return this;
    }
};
