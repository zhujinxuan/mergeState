// import mergeState, { deepSlowEqual } from "../src/index.js";
import mergeState, { deepSlowEqual } from "mergeState";
import assert from "assert";

function oo() {
  let prevState = {
    oo: { a: { b: 1 }, b: { c: 1 }, c: { d: 1 } }
  };
  let diff = {
    oo: { a: { b: 100, c: 99 } }
  };
  let state = mergeState(prevState, diff);

  assert(
    deepSlowEqual(prevState, { oo: { a: { b: 1 }, b: { c: 1 }, c: { d: 1 } } })
  ); // prevState Unchanged
  assert(deepSlowEqual(state), {
    oo: { a: { b: 100, c: 99 }, b: { c: 1 }, c: { d: 1 } }
  }); // merge State by enumerable entries of diff
}
oo();

function aa() {
  let prevState = {
    aa: [[1, 1], [1, 1], [1, 1]]
  };
  let diff = {
    aa: Object.assign([], { 3: [10] }, { 2: Object.assign([], { 1: 100 }) })
  };
  let state = mergeState(prevState, diff);

  assert(deepSlowEqual(prevState, { aa: [[1, 1], [1, 1], [1, 1]] })); // prevState Unchanged
  assert(deepSlowEqual(state), { aa: [[1, 1], [1, 1], [1, 100], [10]] }); // merge State by enumerable entries of diff
}

function oa() {
  let prevState = {
    oa: { a: [1, 1], b: [1, 1], c: [1, 1] }
  };
  let diff = {
    oa: { a: Object.assign([], { 1: 100 }) }
  };
  let state = mergeState(prevState, diff);

  assert(deepSlowEqual(prevState, { oa: { a: [1, 1], b: [1, 1], c: [1, 1] } })); // prevState Unchanged
  assert(deepSlowEqual(state), { oa: { a: [1, 100], b: [1, 1], c: [1, 1] } }); // merge State by enumerable entries of diff
}
oa();
