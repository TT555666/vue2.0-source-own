import { arrayMethods } from "./array";
import Dep from "../dep/index";
class Observe {
  constructor(value) {
    this.dep = new Dep(); // 专门为数组设计的

    if (Array.isArray(value)) {
      value.__proto__ = arrayMethods; // 重写数组原型方法
      this.observeArray(value);
    } else {
      this.walk(value);
    }
    Object.defineProperty(value, "__ob__", {
      enumerable: false,
      configurable: false,
      value: this,
    });
  }
  walk(data) {
    let keys = Object.keys(data);
    keys.forEach((key) => {
      const value = data[key];
      defineReactive(data, key, value);
    });
  }
  observeArray(value) {
    value.forEach((v) => {
      observe(v);
    });
  }
}
function defineReactive(data, key, value) {
  let childOb = observe(value);
  let dep = new Dep();
  Object.defineProperty(data, key, {
    get() {
      if (Dep.target) {
        // 如果取值时有watcher
        dep.depend(); // 让watcher保存dep，并且让dep 保存watcher
        if (childOb) {
          childOb.dep.depend(); // 收集数组依赖
          if(Array.isArray(value)){ // 如果内部还是数组
            dependArray(value);// 不停的进行依赖收集
        }
        }
      }
      return value;
    },
    set(newValue) {
      if (newValue == value) return;
      observe(newValue);
      value = newValue;
      dep.notify(); // 通知渲染watcher去更新
    },
  });
}
function dependArray(value) {
  for (let i = 0; i < value.length; i++) {
      let current = value[i];
      current.__ob__ && current.__ob__.dep.depend();
      if (Array.isArray(current)) {
          dependArray(current)
      }
  }
}
export function observe(data) {
  if (typeof data !== "object" && data !== null) {
    return;
  }
  return new Observe(data);
}
