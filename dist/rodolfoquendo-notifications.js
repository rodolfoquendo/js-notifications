/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./scss/index.scss":
/*!*************************!*\
  !*** ./scss/index.scss ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./node_modules/@rodolfoquendo/js-core/lib/EventListeners.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@rodolfoquendo/js-core/lib/EventListeners.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   _event: () => (/* binding */ _event),
/* harmony export */   _eventAdd: () => (/* binding */ _eventAdd),
/* harmony export */   _eventRemove: () => (/* binding */ _eventRemove)
/* harmony export */ });
/**
 * Adds and remove an event listener to provided element
 * Ensure the handle is an already defined function
 * 
 * @param {HTMLElement} element 
 * @param {String} type 
 * @param {Callable} handle 
 * @returns {boolean}
 */
const _eventAdd = (element, type, handle) => {
    element.addEventListener(type,handle);
    return true;
}

/**
 * Adds and remove an event listener to provided element
 * Ensure the handle is an already defined function
 * 
 * @param {HTMLElement} element 
 * @param {String} type 
 * @param {Callable} handle 
 * @returns {boolean}
 */
const _eventRemove = (element, type, handle) => {
    element.removeEventListener(type,handle);
    return true;
}

/**
 * Adds and remove an event listener to provided element
 * Ensure the handle is an already defined function
 * 
 * @param {HTMLElement} element 
 * @param {String} type 
 * @param {Callable} handle 
 * @returns {boolean}
 */
const _event = (element, type, handle) => {
    return _eventRemove(element,type, handle)
        && _eventAdd(element,type, handle);
}

/***/ }),

/***/ "./node_modules/@rodolfoquendo/js-core/lib/Helpers.js":
/*!************************************************************!*\
  !*** ./node_modules/@rodolfoquendo/js-core/lib/Helpers.js ***!
  \************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   empty: () => (/* binding */ empty),
/* harmony export */   in_array: () => (/* binding */ in_array),
/* harmony export */   is_array: () => (/* binding */ is_array),
/* harmony export */   is_null: () => (/* binding */ is_null),
/* harmony export */   is_object: () => (/* binding */ is_object),
/* harmony export */   isset: () => (/* binding */ isset),
/* harmony export */   number_format: () => (/* binding */ number_format)
/* harmony export */ });
const isset = (variable) => {
    return typeof variable !== typeof undefined;
}

const empty = (variable) => {
    return !isset(variable);
}

const is_null = (variable) => {
    return isset(variable) && variable === null;
}

const is_array = (variable) => {
    return Array.isArray(variable);
}

const is_object = (variable) => {
    return typeof variable === 'object';
}

const in_array = (needle, haystack) => {
    return is_array(haystack) ? haystack.includes(needle) : false;
}

const number_format = (number, decimals = 2, dec = '.', sep = '') => {
    // Strip all characters but numerical ones.
    number = isFinite(+number) ? (number + '').replace(/[^0-9+\-Ee.]/g, '') : number;
    let n = !isFinite(+number) ? 0 : +number,
        prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
        s = '',
        toFixedFix =  (n, prec) => {
            const k = Math.pow(10, prec);
            return '' + Math.round(n * k) / k;
        };
    // Fix for IE parseFloat(0.55).toFixed(0) = 0;
    s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
    if (s[0].length > 3) {
        s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
    }
    if ((s[1] || '').length < prec) {
        s[1] = s[1] || '';
        s[1] += new Array(prec - s[1].length + 1).join('0');
    }
    return s.join(dec);
};



/***/ }),

/***/ "./lib/notification.js":
/*!*****************************!*\
  !*** ./lib/notification.js ***!
  \*****************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Notification: () => (/* binding */ Notification),
/* harmony export */   _notify: () => (/* binding */ _notify),
/* harmony export */   _unnotify: () => (/* binding */ _unnotify)
/* harmony export */ });
/* harmony import */ var _node_modules_rodolfoquendo_js_core_lib_Helpers_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/@rodolfoquendo/js-core/lib/Helpers.js */ "./node_modules/@rodolfoquendo/js-core/lib/Helpers.js");
/* harmony import */ var _node_modules_rodolfoquendo_js_core_lib_EventListeners_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../node_modules/@rodolfoquendo/js-core/lib/EventListeners.js */ "./node_modules/@rodolfoquendo/js-core/lib/EventListeners.js");


class Notification {
  NOTIFICATION_TYPE_SUCCESS = 'success';
  NOTIFICATION_TYPE_ERROR = 'error';
  NOTIFICATION_HOLDER_ID = 'notifications';
  #type = null;
  #report_url = null;
  #click_url = null;
  #method = null;
  #content = null;
  #timeout = 5;
  #sent = false;
  static items = [];
  setHolder() {
    if ((0,_node_modules_rodolfoquendo_js_core_lib_Helpers_js__WEBPACK_IMPORTED_MODULE_0__.is_null)(document.getElementById(this.NOTIFICATION_HOLDER_ID))) {
      document.body.innerHTML += `<div id="${this.NOTIFICATION_HOLDER_ID}"></div>`;
    }
  }
  holder() {
    this.setHolder();
    return document.getElementById(this.NOTIFICATION_HOLDER_ID);
  }
  id() {
    return Notification.items.length;
  }
  getElementId() {
    return `${this.NOTIFICATION_HOLDER_ID}-${this.id()}`;
  }
  element() {
    return document.getElementById(this.getElementId());
  }
  setTimeout(timeout) {
    this.#timeout = timeout * 1000;
  }
  getTimeout() {
    return this.#timeout;
  }
  setType(type) {
    this.#type = type;
  }
  getType() {
    return this.#type;
  }
  setContent(content) {
    this.#content = content;
  }
  getContent() {
    return this.#content;
  }
  setReportUrl(url = null) {
    const holder_data = this.holder().getAttribute('data-report-url'),
      body_data = document.querySelector('body').getAttribute('data-report-url');
    this.#report_url = !(0,_node_modules_rodolfoquendo_js_core_lib_Helpers_js__WEBPACK_IMPORTED_MODULE_0__.is_null)(body_data) ? body_data : this.#report_url;
    this.#report_url = !(0,_node_modules_rodolfoquendo_js_core_lib_Helpers_js__WEBPACK_IMPORTED_MODULE_0__.is_null)(holder_data) ? holder_data : this.#report_url;
    this.#report_url = !(0,_node_modules_rodolfoquendo_js_core_lib_Helpers_js__WEBPACK_IMPORTED_MODULE_0__.is_null)(url) ? url : this.#report_url;
    if (!(0,_node_modules_rodolfoquendo_js_core_lib_Helpers_js__WEBPACK_IMPORTED_MODULE_0__.is_null)(this.#report_url)) {
      this.holder().setAttribute('data-report-url', this.#report_url);
      document.querySelector('body').setAttribute('data-report-url', this.#report_url);
    }
  }
  getReportUrl() {
    this.setReportUrl();
    return this.#report_url;
  }
  setClickUrl(url = null) {
    this.#click_url = !(0,_node_modules_rodolfoquendo_js_core_lib_Helpers_js__WEBPACK_IMPORTED_MODULE_0__.is_null)(url) ? url : this.#click_url;
  }
  getClickUrl() {
    this.setClickUrl();
    return this.#click_url;
  }
  setMethod(method = null) {
    const holder_data = this.holder().getAttribute('data-report-method'),
      body_data = document.querySelector('body').getAttribute('data-report-method');
    this.#method = !(0,_node_modules_rodolfoquendo_js_core_lib_Helpers_js__WEBPACK_IMPORTED_MODULE_0__.is_null)(body_data) ? body_data : this.#method;
    this.#method = !(0,_node_modules_rodolfoquendo_js_core_lib_Helpers_js__WEBPACK_IMPORTED_MODULE_0__.is_null)(holder_data) ? holder_data : this.#method;
    this.#method = !(0,_node_modules_rodolfoquendo_js_core_lib_Helpers_js__WEBPACK_IMPORTED_MODULE_0__.is_null)(method) ? method : this.#method;
    this.#method = !(0,_node_modules_rodolfoquendo_js_core_lib_Helpers_js__WEBPACK_IMPORTED_MODULE_0__.is_null)(this.#method) ? this.#method : "POST";
    this.holder().setAttribute('data-report-method', this.#method);
    document.querySelector('body').setAttribute('data-report-method', this.#method);
  }
  getMethod() {
    this.setMethod();
    return this.#method;
  }
  html() {
    return `<a class="notification d-block" data-type="${this.getType()}" id="${this.getElementId()}"${!(0,_node_modules_rodolfoquendo_js_core_lib_Helpers_js__WEBPACK_IMPORTED_MODULE_0__.is_null)(this.getClickUrl()) ? ` href="${this.getClickUrl()}"` : ''}>
            ${this.getContent()}
        </a>`;
  }
  addHtml() {
    if ((0,_node_modules_rodolfoquendo_js_core_lib_Helpers_js__WEBPACK_IMPORTED_MODULE_0__.is_null)(this.element())) {
      const holder = this.holder();
      holder.innerHTML += this.html();
    }
    return !(0,_node_modules_rodolfoquendo_js_core_lib_Helpers_js__WEBPACK_IMPORTED_MODULE_0__.is_null)(this.element());
  }
  addTimeout() {
    if (typeof window.timeouts === typeof undefined) {
      window.timeouts = {};
    }
    if (typeof window.timeouts.notifications === typeof undefined) {
      window.timeouts.notifications = {};
    }
    const element = this.element();
    window.timeouts.notifications[element.id] = setTimeout(() => {
      _unnotify(element.id);
    }, this.#timeout);
    return (0,_node_modules_rodolfoquendo_js_core_lib_Helpers_js__WEBPACK_IMPORTED_MODULE_0__.isset)(window.timeouts.notifications[element.id]);
  }
  addEventListener() {
    const element = this.element();
    return (0,_node_modules_rodolfoquendo_js_core_lib_EventListeners_js__WEBPACK_IMPORTED_MODULE_1__._event)(element, 'click', _notificationClose);
  }
  async reportToServer() {
    if ((0,_node_modules_rodolfoquendo_js_core_lib_Helpers_js__WEBPACK_IMPORTED_MODULE_0__.is_null)(this.getReportUrl()) || (0,_node_modules_rodolfoquendo_js_core_lib_Helpers_js__WEBPACK_IMPORTED_MODULE_0__.is_null)(this.getMethod()) || this.#sent) {
      return this.#sent;
    }
    const request = await fetch(this.getReportUrl(), {
      method: this.getMethod(),
      body: JSON.stringify(this.dto())
    });
    this.#sent = JSON.parse(request);
    return this.#sent;
  }
  dto() {
    return {
      type: this.getType(),
      content: this.getContent()
    };
  }
  getItems() {
    return Notification.items;
  }
  async add() {
    const html = this.addHtml(),
      timeout = this.addTimeout(),
      listeners = this.addEventListener(),
      server = await this.reportToServer(),
      notification = {
        id: this.getElementId(),
        data: this.dto(),
        sent: server !== false,
        html,
        listeners: listeners,
        response: server,
        timeout: timeout
      };
    if (!(0,_node_modules_rodolfoquendo_js_core_lib_Helpers_js__WEBPACK_IMPORTED_MODULE_0__.is_null)(this.#click_url)) {
      this.element().setAttribute('data-click-url', this.#click_url);
    }
    Notification.items.push(notification);
    return notification;
  }
}
const _unnotify = element_id => {
  const element = document.getElementById(element_id);
  clearTimeout(window.timeouts.notifications[element_id]);
  window.timeouts.notifications[element_id] = false;
  if (!(0,_node_modules_rodolfoquendo_js_core_lib_Helpers_js__WEBPACK_IMPORTED_MODULE_0__.is_null)(element)) {
    if (!(0,_node_modules_rodolfoquendo_js_core_lib_Helpers_js__WEBPACK_IMPORTED_MODULE_0__.is_null)(element.getAttribute('data-click-url'))) {
      window.location.href = element.getAttribute('data-click-url');
    }
    element.remove();
  }
};
const _notificationClose = event => _unnotify(event.target.id);
const _notify = async (content, type = 'success', timeout = 5, report_url = null, method = "POST", click_url = null) => {
  const notification = new Notification();
  notification.setContent(content);
  notification.setType(type);
  notification.setTimeout(timeout);
  notification.setReportUrl(report_url);
  notification.setMethod(method);
  notification.setClickUrl(click_url);
  return notification.add();
};

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"/rodolfoquendo-notifications": 0,
/******/ 			"index": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunk_rodolfoquendo_js_notifications"] = self["webpackChunk_rodolfoquendo_js_notifications"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	__webpack_require__.O(undefined, ["index"], () => (__webpack_require__("./lib/notification.js")))
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["index"], () => (__webpack_require__("./scss/index.scss")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;