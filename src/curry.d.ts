type CurriedFunction<A extends any[], R> = {
  (...args: A): R;
  <T extends A[0]>(arg1: T): CurriedFunction<
    A extends [unknown, ...infer Tail] ? Tail : [],
    R
  >;
};

export declare function curry<A extends any[], R>(
  fn: (...args: A) => R
): CurriedFunction<A, R>;


