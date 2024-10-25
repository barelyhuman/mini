export const promiseMap = async <T, V>(
  iterator: Iterable<T>,
  mapper: (X: T) => V,
  { concurrency = Infinity }
) => {
  const result: V[] = [];
  let threads = concurrency;
  const iter = iterator[Symbol.iterator]();
  await new Promise((r) => process(r));
  return result;

  function process(cb: (...args: unknown[]) => void) {
    if (threads === 0) {
      return setTimeout(() => process(cb), 0);
    }
    const next = iter.next();
    if (next.done) {
      return cb();
    }
    threads -= 1;
    Promise.resolve(mapper(next.value)).then((d) => {
      threads += 1;
      result.push(d);
      process(cb);
    });
  }
};
