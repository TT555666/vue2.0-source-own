import { initMixin } from "./init";
import {lifecycleMixin,renderMixin} from './lifecycle'
import {initGlobalAPI} from './util/index'
function Vue(option) {
  this._init(option);
}
initGlobalAPI(Vue)
initMixin(Vue);
lifecycleMixin(Vue)
renderMixin(Vue)
export default Vue;
