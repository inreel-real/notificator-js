(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Notificator"] = factory();
	else
		root["Notificator"] = factory();
})(self, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
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
/************************************************************************/
var __webpack_exports__ = {};
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var __assign = (undefined && undefined.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var NotificatorJs = (function () {
    function NotificatorJs(apiKey, callbacks) {
        if (callbacks === void 0) { callbacks = {}; }
        this.apiKey = null;
        this.webSocketHost = '127.0.0.1:8001';
        this.socketInstance = null;
        this.channels = {};
        this.callbacks = {};
        this.apiKey = apiKey;
        this.callbacks = __assign(__assign({}, this.callbacks), callbacks);
    }
    NotificatorJs.prototype.connect = function () {
        this.initInstance();
        this.addEvents();
    };
    NotificatorJs.prototype.disconnect = function () {
        if (this.socketInstance) {
            this.socketInstance.close();
            this.removeEvents();
            this.socketInstance = null;
        }
    };
    NotificatorJs.prototype.subscribeChannel = function (channel, callback) {
        if (!this.channels[channel]) {
            this.channels[channel] = [callback];
        }
        else {
            this.channels[channel].push(callback);
        }
        this.socketInstance.send(JSON.stringify({ cmd: 'sub', name: channel }));
    };
    NotificatorJs.prototype.unsubscribeChannel = function (channel, callback) {
        if (callback === void 0) { callback = null; }
        if (!this.channels[channel]) {
            return;
        }
        if (callback) {
            this.channels[channel] =
                this.channels[channel].filter(function (item) { return item !== callback; });
        }
        if (!callback || !this.channels[channel].length) {
            delete this.channels[channel];
            this.socketInstance.send(JSON.stringify({ cmd: 'unsub', name: channel }));
        }
    };
    NotificatorJs.prototype.unsubscribeAllChannels = function () {
        this.channels = {};
    };
    NotificatorJs.prototype.initInstance = function () {
        this.socketInstance = new WebSocket("ws://".concat(this.webSocketHost, "/").concat(this.apiKey));
    };
    NotificatorJs.prototype.addEvents = function () {
        if (this.socketInstance) {
            this.socketInstance.addEventListener('open', this.eventConnected);
            this.socketInstance.addEventListener('close', this.eventDisconnected);
            this.socketInstance.addEventListener('error', this.eventError);
            this.socketInstance.addEventListener('message', this.eventReceiveMessage);
        }
    };
    NotificatorJs.prototype.removeEvents = function () {
        if (this.socketInstance) {
            this.socketInstance.removeEventListener('open', this.eventConnected);
            this.socketInstance.removeEventListener('close', this.eventDisconnected);
            this.socketInstance.removeEventListener('error', this.eventError);
            this.socketInstance.removeEventListener('message', this.eventReceiveMessage);
        }
    };
    NotificatorJs.prototype.eventConnected = function (event) {
        if (this.callbacks.onOpened) {
            this.callbacks.onOpened(event);
        }
    };
    NotificatorJs.prototype.eventDisconnected = function (event) {
        if (this.callbacks.onClosed) {
            this.callbacks.onClosed(event);
        }
    };
    NotificatorJs.prototype.eventError = function (event) {
        if (this.callbacks.onError) {
            this.callbacks.onError(event);
        }
    };
    NotificatorJs.prototype.eventReceiveMessage = function (event) {
        var _a;
        if (this.callbacks.onMessage) {
            this.callbacks.onMessage(event);
        }
        var result = JSON.parse(event.data);
        (_a = this.channels[result.channel]) === null || _a === void 0 ? void 0 : _a.forEach(function (callback) { return (callback(result.data)); });
    };
    return NotificatorJs;
}());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (NotificatorJs);

/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=notificator.js.map