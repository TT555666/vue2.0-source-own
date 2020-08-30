import Vue from "./index";
import {createTextNode,createElement} from './watch/vdom/create-element'

import { patch } from "./watch/observe/patch";
import Watcher from "./watch/watcher";
export function lifecycleMixin() {
  Vue.prototype._update = function (vnode) {
    const vm = this;
    vm.$el = patch(vm.$el, vnode);
  };
}

export function mountComponent(vm, el) {
    vm.$el = el;
    let updateComponent = () => {
        // 将虚拟节点 渲染到页面上
        vm._update(vm._render());
    }
    new Watcher(vm, updateComponent, () => {}, true);
}

export function renderMixin(Vue){
    Vue.prototype._v = function (text){
        return createTextNode(text)
    }
    Vue.prototype._c = function(){
        return createElement(...arguments)
    }
    Vue.prototype._s = function (val) {
        return val == null? '' : (typeof val === 'object'?JSON.stringify(val):val);
    }
    Vue.prototype._render = function(){
        const vm = this
        const {render} = vm.$options
        let vnode = render.call(vm)
       
        return vnode
    }
}