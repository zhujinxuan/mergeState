# mergeState change for nested Structure in React and Redux
`setState` is often nasty when you unfortunately have nested structure in your React/Redux state.  
This package makes `setState` easy with the nested Structure.  

## Install 
Just like other packages
```
  npm i --save-dev mergestate
```
The `s` is lowercased due to my mistake and I cannot change the it.  Sorry for the inconvinience.

## Functions
  * `mergeState(prevState, diff)` 
  This function return an new object with similar structure of `prevState` and with changes according to `diff`. 
  `prevState` is not changed in the function.  This function searches changes by `enumerable` entries of `diff`
  * `deepSlowEqual(state1, state2, [...comparers])` 
  This function recursively compare two objects on entries with `enumerable` property. 
  `[...comparers]` is an array of function `f(x,y)` for additional rules in
  comparing two nodes that return `true` `false` or `undefined`.  The comparers
  are called recursively when comparing each nodes in the trees.  If the
  comparer return `true` or `false`, the `deepSlowEqual` will stop comparing
  and return `true` or `false`; when the comparer return `undefined`, the
  `deepSlowEqual` will continue. `...comparers` could be used for ignoring
  certain types in comparing.


## Usage as Example
  This package search for changes recursively by the `enumerable` entries in the `diff`.

### Assign a value in a nested Object; and Appending 

```js 
import mergeState, { deepSlowEqual } from "mergeState";
import assert from "assert";

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
```

### Assign a value in a nested Array; and Appending a value in a nested Array
```js
import mergeState, { deepSlowEqual } from "mergeState";
import assert from "assert";

let prevState = {
  aa: [[1, 1], [1, 1], [1, 1]]
};
let diff = {
  aa: Object.assign([], { 3: [10] }, { 2: Object.assign([], { 1: 100 }) })
};
let state = mergeState(prevState, diff);

assert(deepSlowEqual(prevState, { aa: [[1, 1], [1, 1], [1, 1]] })); // prevState Unchanged
assert(deepSlowEqual(state), { aa: [[1, 1], [1, 1], [1, 100], [10]] }); // merge State by enumerable entries of diff
```

### Assign a value in a array nested in an object
```js
import mergeState, { deepSlowEqual } from "mergeState";
import assert from "assert";

let prevState = {
  oa: { a: [1, 1], b: [1, 1], c: [1, 1] }
};
let diff = {
  oa: { a: Object.assign([], { 1: 100 }) }
};
let state = mergeState(prevState, diff);

assert(deepSlowEqual(prevState, { oa: { a: [1, 1], b: [1, 1], c: [1, 1] } })); // prevState Unchanged
assert(deepSlowEqual(state), { oa: { a: [1, 100], b: [1, 1], c: [1, 1] } }); // merge State by enumerable entries of diff
```
