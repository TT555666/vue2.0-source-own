// 根据不同属性进行初始化操作
import { observe } from "./observe/index.js";
export function initState(vm) {
  const opts = vm.$options;
  if (opts.props) {
    initProps(vm);
  }
  if (opts.method) {
    initMethod(vm);
  }
  if (opts.data) {
    initData(vm);
  }
  if (opts.computed) {
    initComputed(vm);
  }
  if (opts.watch) {
    initWatch(vm);
  }
}
function initProps() {}
function initMethod() {}
function initData(vm) {
  let data = vm.$options.data;
  data = vm._data = typeof data === "function" ? data.call(vm) : data;
  for(let key in data){
    proxy(vm,'_data',key)
  }
  observe(data);
}
function initComputed() {}
function initWatch() {}

function proxy(vm,source,key){
 Object.defineProperty(vm,key,{
   get(){
     return vm[source][key]
   },
   set(newVal){
    vm[source][key] = newVal
   }
 }) 
}
