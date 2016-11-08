'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//var XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest; # Uncomment this for NODE.JS
/**
 * XmlHttpRequest for you es6 project. Required features only.
 * Create xhr instance:
 * var xhr = new Xhr(opts);
 * xhr.post('http://url.com',{data:123}).then(function(response){...},function(err){...});
 * Options:
 *    withCredentials - Adds cookie and auth data to request. CORS fetures.
 *    contentType - content type header,
 *    json - Handle response as JSON.
 */

var Xhr = function () {
    function Xhr(opts) {
        _classCallCheck(this, Xhr);

        this.events = {
            READY_STATE_CHANGE: 'readystatechange',
            LOAD_START: 'loadstart',
            PROGRESS: 'progress',
            ABORT: 'abort',
            ERROR: 'error',
            LOAD: 'load',
            TIMEOUT: 'timeout',
            LOAD_END: 'loadend'
        };
        this.opts = opts;
    }
    /**
     * Send
     * @param url - URL to request
     * @param callback
     * @param method
     * @param data
     * @param sync
     */


    _createClass(Xhr, [{
        key: 'send',
        value: function send(url, method, data) {
            var _this = this;

            return new Promise(function (resolve, reject) {
                var xhr = new XMLHttpRequest();
                var m = method || 'GET';
                xhr.open(m, url);
                // Set headers
                xhr.setRequestHeader('Content-Type', _this.opts.contentType || 'application/json');
                // Custom
                if (_this.opts.headers) {
                    for (var name in _this.opts.headers) {
                        var value = _this.opts.headers[name];
                        xhr.setRequestHeader(name, value);
                    }
                }
                // Transmit credentials
                if (_this.opts.withCredentials) xhr.withCredentials = true;
                data = data ? _this.parseData(data) : null;

                xhr.addEventListener(_this.events.LOAD, function () {
                    // ==0 for files.
                    if (xhr.status >= 200 && xhr.status < 300 || xhr.status == 0) {
                        var responseText = '';
                        if (xhr.responseText) {
                            responseText = _this.opts.json ? JSON.parse(xhr.responseText) : xhr.responseText;
                        }
                        resolve(responseText, xhr);
                    } else {
                        reject(_this.reject(xhr));
                    }
                });
                // Handle basic events
                xhr.addEventListener(_this.events.ABORT, function () {
                    return reject(_this.reject(xhr));
                });
                xhr.addEventListener(_this.events.ERROR, function () {
                    return reject(_this.reject(xhr));
                });
                xhr.addEventListener(_this.events.TIMEOUT, function () {
                    return reject(_this.reject(xhr));
                });

                data ? xhr.send(data) : xhr.send();
            });
        }

        /**
         * Reject handler.
         * @param xhr
         * @returns {string}
         */

    }, {
        key: 'reject',
        value: function reject(xhr) {
            var responseText = '';
            if (xhr.responseText) {
                responseText = this.opts.json ? JSON.parse(xhr.responseText) : xhr.responseText;
            }
            return responseText;
        }

        /**
         * Create query string
         * @param data
         * @returns {Array}
         */

    }, {
        key: 'parseData',
        value: function parseData(data) {
            // JSON
            if (this.opts.contentType == 'application/json') return JSON.stringify(data);
            // Query string
            var query = [];
            if ((typeof data === 'undefined' ? 'undefined' : _typeof(data)).toLowerCase() == 'string' || (typeof data === 'undefined' ? 'undefined' : _typeof(data)).toLowerCase() == 'number') {
                query.push(data);
            } else {
                for (var key in data) {
                    query.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
                }
            }

            return query.join('&');
        }
        /**
         * GET Wrapper
         * @param url
         * @returns {*}
         */

    }, {
        key: 'get',
        value: function get(url) {
            return this.send(url);
        }
        /**
         * POST Wrapper
         * @param url
         * @param data
         * @returns {*}
         */

    }, {
        key: 'post',
        value: function post(url, data) {
            return this.send(url, 'POST', data);
        }
        /**
         * DELETE Wrapper
         * @param url
         * @returns {*}
         */

    }, {
        key: 'delete',
        value: function _delete(url) {
            return this.send(url, 'DELETE');
        }
        /**
         * PUT Wrapper
         * @param url
         * @param data
         * @returns {*}
         */

    }, {
        key: 'put',
        value: function put(url, data) {
            return this.send(url, 'PUT', data);
        }
    }]);

    return Xhr;
}();

exports.default = Xhr;
