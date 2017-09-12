function deepSlowEqual(x, y, options = []) {
  // console.log(options);
  let checkPassed = Array.isArray(options);
  if (checkPassed) {
    for (const f of options) {
      if (typeof f !== "function") {
        checkPassed = false;
        break;
      }
    }
  }
  if (!checkPassed) {
    throw new Error("options must be array of functions");
  }
  let additionalComparer = compose(options);
  return compare(x, y, additionalComparer);
}

function compose(options) {
  return (x, y) => {
    for (const f of options) {
      let shortCut = f(x, y);
      if (shortCut !== undefined) {
        return !!shortCut;
      }
    }
    return undefined;
  };
}

function compare(x, y, additionalComparer) {
  if (x === y) return true;
  let shortCut = additionalComparer(x, y);
  if (shortCut === undefined) {
    if (typeof x === "object" && typeof y === "object") {
      if (Object.keys(x).length !== Object.keys(y).length) {
        return false;
      } else if (Array.isArray(x) !== Array.isArray(y)) {
        return false;
      }
    } else {
      return false;
    }
  } else {
    return !!shortCut;
  }

  for (const key in x) {
    if (!compare(x[key], y[key], additionalComparer)) {
      return false;
    }
  }
  return true;
}

export default deepSlowEqual;
