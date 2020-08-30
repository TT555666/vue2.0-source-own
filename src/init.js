import { initState } from "./state";
import { compileToFunctions } from "./ast/compileToFunctions";
import { mountComponent, renderMixin } from "./lifecycle";
import { mergeOptions ,callHook} from "./util/index";
export function initMixin(Vue) {
  Vue.prototype._init = function (options) {
    const vm = this;
    vm.$options = mergeOptions(vm.constructor.options,options);
    // 初始化状态
    callHook(vm,'beforeCreate');
    initState(vm);
    callHook(vm,'created');
    if (vm.$options.el) {
    	vm.$mount(vm.$options.el);
    }
}
  Vue.prototype.$mount = function (el) {
    const vm = this;
    const options = vm.$options;
    el = document.querySelector(el);
    if (!options.render) {
      let template = options.template;
      if (!template && el) {
        template = el.outerHTML;
      }
      const render = compileToFunctions(template);
      options.render = render;
      // renderMixin(Vue);
    }
    mountComponent(vm, el);
  };
}
