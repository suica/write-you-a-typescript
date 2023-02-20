export function assert(v: unknown, msg = '') {
    if (!v) {
        throw new Error(msg || 'assertion failed');
    }
}

export const isNotNil = <T>(x: T): x is NonNullable<T> => {
    return !(x == null);
};
