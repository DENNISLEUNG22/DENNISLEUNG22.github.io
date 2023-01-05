export class BaseController {
  castString(object: object, name: string) {
    let input = object[name];
    if (typeof input == "string") {
      return input;
    }
    throw new TypeError(name + " should be string");
  }
}
