const compose = (...funcs: Function[]) => funcs.reduce((a, b) => (...args: any) => a(b(...args)));

const pipe = (...funcs: Function[]) => (args: any) => funcs.reduce((arg, fn) => fn(arg), args);
