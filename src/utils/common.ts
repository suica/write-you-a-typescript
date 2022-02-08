export function assert(v: unknown, msg = '') {
    if (!v) {
        throw new Error(msg || 'assertion failed');
    }
}
