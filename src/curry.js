export function curry(fn) {
  const arity = fn.length;
  const curried = (...args) => {
    if (args.length >= arity) {
      return fn(...args);
    } else {
      return (...nextArgs) => curried(...args, ...nextArgs);
    }
  };
  return curried;
}
