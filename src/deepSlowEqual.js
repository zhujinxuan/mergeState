function deepSlowEqual(x, y) {
  if (x === y) return true;
  if (typeof x === "object" && typeof y === "object") {
    if (Object.keys(x).length !== Object.keys(y).length) {
      return false;
    } else if (Array.isArray(x) !== Array.isArray(y)) {
      return false;
    }
  } else {
    return false;
  }

  for (const key in x) {
    if (!deepSlowEqual(x[key], y[key])) {
      return false;
    }
  }
  return true;
}

export default deepSlowEqual;
