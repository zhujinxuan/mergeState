import mergeState, { deepSlowEqual } from "../src/index.js";
import assert from "assert";

describe("Try One Nested Layer", () => {
  let prevState = {
    a: [1, 1, 1, 1],
    b: { c: "cat", u: "cute" },
    c: 1
  };

  let checkState = {
    a: [1, 1, 1, 1],
    b: { c: "cat", u: "cute" },
    c: 1
  };

  let addTo = {
    a: Object.assign([], { 2: 100 }),
    b: { i: "is", u: "very cute" },
    c: 2,
    msg: "cat is very cute"
  };
  let checkNewState = {
    a: [1, 1, 100, 1],
    b: { c: "cat", i: "is", u: "very cute" },
    c: 2,
    msg: "cat is very cute"
  };

  let state;

  // console.log(deepSlowEqual(prevState, checkState));
  it("try to merge thenm", () => {
    state = mergeState(prevState, addTo);
  });
  it("prevState unchanged", () => {
    assert(deepSlowEqual(prevState, checkState) === true);
  });
  it("test merged result", () => {
    assert(deepSlowEqual(state, checkNewState) === true);
  });
});

describe("Try Twice nested", () => {
  let prevState = {
    aa: [[1, 1], [1, 1], [1, 1]],
    ao: [{ a: 1 }, { a: 1 }, { a: 1 }],
    oa: { a: [1, 1], b: [1, 1], c: [1, 1] },
    oo: { a: { b: 1 }, b: { c: 1 }, c: { d: 1 } }
  };
  let checkState = {
    aa: [[1, 1], [1, 1], [1, 1]],
    ao: [{ a: 1 }, { a: 1 }, { a: 1 }],
    oa: { a: [1, 1], b: [1, 1], c: [1, 1] },
    oo: { a: { b: 1 }, b: { c: 1 }, c: { d: 1 } }
  };
  let addTo = {
    aa: Object.assign([], { 3: [10] }, { 2: Object.assign([], { 1: 100 }) }),
    ao: Object.assign([], { 1: { a: 100, c: 101 } }),
    oa: { a: Object.assign([], { 1: 100 }) },
    oo: { a: { b: 100, c: 99 } }
  };
  let checkNewState = {
    aa: [[1, 1], [1, 1], [1, 100], [10]],
    ao: [{ a: 1 }, { a: 100, c: 101 }, { a: 1 }],
    oa: { a: [1, 100], b: [1, 1], c: [1, 1] },
    oo: { a: { b: 100, c: 99 }, b: { c: 1 }, c: { d: 1 } }
  };
  let state;
  // console.log(deepSlowEqual(prevState, checkState));
  it("try to merge thenm", () => {
    state = mergeState(prevState, addTo);
  });
  it("prevState unchanged", () => {
    assert(deepSlowEqual(prevState, checkState) === true);
  });
  it("test merged result", () => {
    assert(deepSlowEqual(state, checkNewState) === true);
  });
});

describe("Test DeepSlowEqual", () => {
  it("when true", () => {
    assert(deepSlowEqual({ a: 1 }, { a: 1 }) === true);
  });
  it("when false", () => {
    assert(deepSlowEqual({ a: 2 }, { a: 1 }) === false);
  });
  it("additional rules", () => {
    let rule = x => (x === 2 ? true : undefined);
    assert(deepSlowEqual({ a: 2 }, { a: 1 }, [rule]) === true);
  });
});


