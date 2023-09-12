export function replaceAll(toBeReplacedValue, withValue, text, title = false) {
  var replaced_val = "";
  for (let i = 0; i < text.length; i++) {
    let el = text[i];

    if (el === toBeReplacedValue) {
      el = withValue;
    }
    if (title === true) {
      let lastEl = replaced_val[replaced_val.length - 1];
      if (lastEl === withValue || i ==0 ) {
        el = el.toUpperCase();
      }
      
    }

    replaced_val += el;
  }

  return replaced_val;
}
