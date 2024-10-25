import b from "npm:bluebird";
import pmap from "npm:p-map";
import { promiseMap } from "./promise-map.ts";
import promiseFnsCreateQueue from "https://deno.land/x/promise_fns/src/queue.ts";

const arrayOfItems = Array.from({ length: 100 }).fill(1) as number[];

Deno.bench({
  name: "promiseMap",
  group: "Promise.map",
  async fn() {
    await promiseMap(arrayOfItems, async (d) => d * 2, { concurrency: 4 });
  },
});

Deno.bench({
  name: "bluebird.map",
  group: "Promise.map",
  async fn() {
    await b.map(arrayOfItems, async (d: number) => d * 2, { concurrency: 4 });
  },
});

Deno.bench({
  name: "p-map",
  group: "Promise.map",
  async fn() {
    await pmap(arrayOfItems, async (d: number) => d * 2, { concurrency: 4 });
  },
});

Deno.bench({
  name: "promise_fns.queue",
  group: "Promise.map",
  async fn() {
    const { add, queue } = promiseFnsCreateQueue<number>({ concurrency: 4 });
    for (const ms of arrayOfItems) {
      add(async () => ms * 2);
    }
    await queue;
  },
});
