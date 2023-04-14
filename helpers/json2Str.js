// Do not put objects in array
export function json2Str(data) {
  return parse("", data, []);
}

function parse(path, data, result) {
  for (let i in data) {
    const type = Object.prototype.toString.call(data[i]);
    if (type === "[object Object]" || type === "[object Array]") {
      parse(path + "/" + i, data[i], result);
    } else {
      result.push(path + "/" + data[i] + ".png");
    }
  }
  return result;
}
