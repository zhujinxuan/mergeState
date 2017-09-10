import deepSlowEqual from "./deepSlowEqual.js";

function mergeState(prevState, addTo) {
  if (typeof addTo !== "object") {
    throw new Error("addTo must be objects with similiar keys to prevState");
  }
  let state = Object.assign({}, prevState);
  for (const key in addTo) {
    if (state[key] === undefined) {
      state[key] = addTo[key];
    } else {
      mergeAssign(state, key, addTo[key]);
    }
  }
  if (Array.isArray(state)) {
    return state;
  }
  return Object.assign({}, state);
}

function mergeAssign(state, key, addTo) {
  let elem = state[key];
  if (Array.isArray(elem) && Array.isArray(addTo)) {
    state[key] = Object.assign([], elem);
  } else if (typeof elem === "object" && typeof addTo === "object") {
    state[key] = Object.assign({}, elem);
  } else {
    state[key] = addTo;
    return true;
  }

  for (const ind in addTo) {
    if (state[key][ind] === undefined) {
      state[key][ind] = addTo[ind];
    } else {
      mergeAssign(state[key], ind, addTo[ind]);
    }
  }

  if (!Array.isArray(state[key]) && typeof state[key] === "object") {
    state[key] = Object.assign({}, state[key]);
  }
}

export default mergeState;
export { deepSlowEqual };
