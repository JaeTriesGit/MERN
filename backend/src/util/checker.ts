export function Checker<T>(variable: T): asserts variable is NonNullable<T> {
    if (!variable) {
        throw Error('Expected variable to be defined, got ' + variable)
    }
}