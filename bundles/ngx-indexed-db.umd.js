(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define('ngx-indexed-db', ['exports', '@angular/core', '@angular/common'], factory) :
    (global = global || self, factory(global['ngx-indexed-db'] = {}, global.ng.core, global.ng.common));
}(this, (function (exports, core, common) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    function __rest(s, e) {
        var t = {};
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
            t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    }

    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }

    function __param(paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    }

    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
    }

    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    }

    var __createBinding = Object.create ? (function(o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
    }) : (function(o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        o[k2] = m[k];
    });

    function __exportStar(m, exports) {
        for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);
    }

    function __values(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m) return m.call(o);
        if (o && typeof o.length === "number") return {
            next: function () {
                if (o && i >= o.length) o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    }

    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        }
        catch (error) { e = { error: error }; }
        finally {
            try {
                if (r && !r.done && (m = i["return"])) m.call(i);
            }
            finally { if (e) throw e.error; }
        }
        return ar;
    }

    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }

    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    };

    function __await(v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
    }

    function __asyncGenerator(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
        function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
        function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
        function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
        function fulfill(value) { resume("next", value); }
        function reject(value) { resume("throw", value); }
        function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
    }

    function __asyncDelegator(o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
        function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
    }

    function __asyncValues(o) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
    }

    function __makeTemplateObject(cooked, raw) {
        if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
        return cooked;
    };

    var __setModuleDefault = Object.create ? (function(o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
    }) : function(o, v) {
        o["default"] = v;
    };

    function __importStar(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
        __setModuleDefault(result, mod);
        return result;
    }

    function __importDefault(mod) {
        return (mod && mod.__esModule) ? mod : { default: mod };
    }

    function __classPrivateFieldGet(receiver, privateMap) {
        if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to get private field on non-instance");
        }
        return privateMap.get(receiver);
    }

    function __classPrivateFieldSet(receiver, privateMap, value) {
        if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to set private field on non-instance");
        }
        privateMap.set(receiver, value);
        return value;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/ngx-indexed-db.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @record
     */
    function ObjectStoreMeta() { }
    if (false) {
        /** @type {?} */
        ObjectStoreMeta.prototype.store;
        /** @type {?} */
        ObjectStoreMeta.prototype.storeConfig;
        /** @type {?} */
        ObjectStoreMeta.prototype.storeSchema;
    }
    /**
     * @record
     */
    function ObjectStoreSchema() { }
    if (false) {
        /** @type {?} */
        ObjectStoreSchema.prototype.name;
        /** @type {?} */
        ObjectStoreSchema.prototype.keypath;
        /** @type {?} */
        ObjectStoreSchema.prototype.options;
    }
    /**
     * @record
     */
    function IndexDetails() { }
    if (false) {
        /** @type {?} */
        IndexDetails.prototype.indexName;
        /** @type {?} */
        IndexDetails.prototype.order;
    }
    /**
     * @record
     * @template T
     */
    function RequestEventTarget() { }
    if (false) {
        /** @type {?} */
        RequestEventTarget.prototype.result;
    }
    /**
     * @record
     * @template T
     */
    function RequestEvent() { }
    if (false) {
        /** @type {?} */
        RequestEvent.prototype.target;
    }
    /**
     * @param {?} indexedDB
     * @param {?} dbName
     * @param {?} version
     * @param {?=} upgradeCallback
     * @return {?}
     */
    function openDatabase(indexedDB, dbName, version, upgradeCallback) {
        return new Promise((/**
         * @param {?} resolve
         * @param {?} reject
         * @return {?}
         */
        function (resolve, reject) {
            if (!indexedDB) {
                reject('IndexedDB not available');
            }
            /** @type {?} */
            var request = indexedDB.open(dbName, version);
            /** @type {?} */
            var db;
            request.onsuccess = (/**
             * @param {?} event
             * @return {?}
             */
            function (event) {
                db = request.result;
                resolve(db);
            });
            request.onerror = (/**
             * @param {?} event
             * @return {?}
             */
            function (event) {
                reject("IndexedDB error: " + request.error);
            });
            if (typeof upgradeCallback === 'function') {
                request.onupgradeneeded = (/**
                 * @param {?} event
                 * @return {?}
                 */
                function (event) {
                    upgradeCallback(event, db);
                });
            }
        }));
    }
    /**
     * @param {?} indexedDB
     * @param {?} dbName
     * @param {?} version
     * @param {?} storeSchemas
     * @param {?=} migrationFactory
     * @return {?}
     */
    function CreateObjectStore(indexedDB, dbName, version, storeSchemas, migrationFactory) {
        if (!indexedDB) {
            return;
        }
        /** @type {?} */
        var request = indexedDB.open(dbName, version);
        request.onupgradeneeded = (/**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            /** @type {?} */
            var database = ((/** @type {?} */ (event.target))).result;
            storeSchemas.forEach((/**
             * @param {?} storeSchema
             * @return {?}
             */
            function (storeSchema) {
                if (!database.objectStoreNames.contains(storeSchema.store)) {
                    /** @type {?} */
                    var objectStore_1 = database.createObjectStore(storeSchema.store, storeSchema.storeConfig);
                    storeSchema.storeSchema.forEach((/**
                     * @param {?} schema
                     * @return {?}
                     */
                    function (schema) {
                        objectStore_1.createIndex(schema.name, schema.keypath, schema.options);
                    }));
                }
            }));
            /** @type {?} */
            var storeMigrations = migrationFactory && migrationFactory();
            if (storeMigrations) {
                Object.keys(storeMigrations)
                    .map((/**
                 * @param {?} k
                 * @return {?}
                 */
                function (k) { return parseInt(k, 10); }))
                    .filter((/**
                 * @param {?} v
                 * @return {?}
                 */
                function (v) { return v > event.oldVersion; }))
                    .sort((/**
                 * @param {?} a
                 * @param {?} b
                 * @return {?}
                 */
                function (a, b) { return a - b; }))
                    .forEach((/**
                 * @param {?} v
                 * @return {?}
                 */
                function (v) {
                    storeMigrations[v](database, request.transaction);
                }));
            }
            database.close();
        });
        request.onsuccess = (/**
         * @param {?} e
         * @return {?}
         */
        function (e) {
            e.target.result.close();
        });
    }
    /** @enum {string} */
    var DBMode = {
        readonly: "readonly",
        readwrite: "readwrite",
    };

    /**
     * @fileoverview added by tsickle
     * Generated from: utils/index.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @record
     */
    function Options() { }
    if (false) {
        /** @type {?} */
        Options.prototype.storeName;
        /** @type {?} */
        Options.prototype.dbMode;
        /** @type {?} */
        Options.prototype.error;
        /** @type {?} */
        Options.prototype.complete;
        /** @type {?|undefined} */
        Options.prototype.abort;
    }
    /**
     * @param {?} db
     * @param {?} storeName
     * @return {?}
     */
    function validateStoreName(db, storeName) {
        return db.objectStoreNames.contains(storeName);
    }
    /**
     * @param {?} db
     * @param {?} storeName
     * @param {?} reject
     * @return {?}
     */
    function validateBeforeTransaction(db, storeName, reject) {
        if (!db) {
            reject('You need to use the openDatabase function to create a database before you query it!');
        }
        if (!validateStoreName(db, storeName)) {
            reject("objectStore does not exists: " + storeName);
        }
    }
    /**
     * @param {?} db
     * @param {?} options
     * @return {?}
     */
    function createTransaction(db, options) {
        /** @type {?} */
        var trans = db.transaction(options.storeName, options.dbMode);
        trans.onerror = options.error;
        trans.oncomplete = options.complete;
        trans.onabort = options.abort;
        return trans;
    }
    /**
     * @param {?} type
     * @param {?} storeName
     * @param {?} reject
     * @param {?} resolve
     * @return {?}
     */
    function optionsGenerator(type, storeName, reject, resolve) {
        return {
            storeName: storeName,
            dbMode: type,
            error: (/**
             * @param {?} e
             * @return {?}
             */
            function (e) {
                reject(e);
            }),
            complete: (/**
             * @param {?} e
             * @return {?}
             */
            function (e) {
                resolve();
            }),
            abort: (/**
             * @param {?} e
             * @return {?}
             */
            function (e) {
                reject(e);
            })
        };
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/ngx-indexed-db.meta.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @record
     */
    function DBConfig() { }
    if (false) {
        /** @type {?} */
        DBConfig.prototype.name;
        /** @type {?} */
        DBConfig.prototype.version;
        /** @type {?} */
        DBConfig.prototype.objectStoresMeta;
        /** @type {?|undefined} */
        DBConfig.prototype.migrationFactory;
    }
    /**
     * @record
     */
    function ObjectStoreMeta$1() { }
    if (false) {
        /** @type {?} */
        ObjectStoreMeta$1.prototype.store;
        /** @type {?} */
        ObjectStoreMeta$1.prototype.storeConfig;
        /** @type {?} */
        ObjectStoreMeta$1.prototype.storeSchema;
    }
    /**
     * @record
     */
    function ObjectStoreSchema$1() { }
    if (false) {
        /** @type {?} */
        ObjectStoreSchema$1.prototype.name;
        /** @type {?} */
        ObjectStoreSchema$1.prototype.keypath;
        /** @type {?} */
        ObjectStoreSchema$1.prototype.options;
    }
    /** @type {?} */
    var CONFIG_TOKEN = new core.InjectionToken(null);

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/ngx-indexed-db.service.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var NgxIndexedDBService = /** @class */ (function () {
        function NgxIndexedDBService(dbConfig, platformId) {
            this.dbConfig = dbConfig;
            this.platformId = platformId;
            if (!dbConfig.name) {
                throw new Error('NgxIndexedDB: Please, provide the dbName in the configuration');
            }
            if (!dbConfig.version) {
                throw new Error('NgxIndexedDB: Please, provide the db version in the configuration');
            }
            this.isBrowser = common.isPlatformBrowser(platformId);
            if (this.isBrowser) {
                this.indexedDB =
                    window.indexedDB ||
                        ((/** @type {?} */ (window))).mozIndexedDB ||
                        ((/** @type {?} */ (window))).webkitIndexedDB ||
                        ((/** @type {?} */ (window))).msIndexedDB;
                CreateObjectStore(this.indexedDB, dbConfig.name, dbConfig.version, dbConfig.objectStoresMeta, dbConfig.migrationFactory);
            }
        }
        /**
         * @param {?} storeSchema
         * @param {?=} migrationFactory
         * @return {?}
         */
        NgxIndexedDBService.prototype.createObjectStore = /**
         * @param {?} storeSchema
         * @param {?=} migrationFactory
         * @return {?}
         */
        function (storeSchema, migrationFactory) {
            /** @type {?} */
            var storeSchemas = [storeSchema];
            CreateObjectStore(this.indexedDB, this.dbConfig.name, this.dbConfig.version, storeSchemas, migrationFactory);
        };
        /**
         * @template T
         * @param {?} storeName
         * @param {?} value
         * @param {?=} key
         * @return {?}
         */
        NgxIndexedDBService.prototype.add = /**
         * @template T
         * @param {?} storeName
         * @param {?} value
         * @param {?=} key
         * @return {?}
         */
        function (storeName, value, key) {
            var _this = this;
            return new Promise((/**
             * @param {?} resolve
             * @param {?} reject
             * @return {?}
             */
            function (resolve, reject) {
                openDatabase(_this.indexedDB, _this.dbConfig.name, _this.dbConfig.version).then((/**
                 * @param {?} db
                 * @return {?}
                 */
                function (db) {
                    /** @type {?} */
                    var transaction = createTransaction(db, optionsGenerator(DBMode.readwrite, storeName, reject, resolve));
                    /** @type {?} */
                    var objectStore = transaction.objectStore(storeName);
                    /** @type {?} */
                    var request;
                    if (key) {
                        request = objectStore.add(value, key);
                    }
                    else {
                        request = objectStore.add(value);
                    }
                    request.onsuccess = (/**
                     * @param {?} evt
                     * @return {?}
                     */
                    function (evt) {
                        key = evt.target.result;
                        resolve(key);
                    });
                })).catch((/**
                 * @param {?} reason
                 * @return {?}
                 */
                function (reason) { return reject(reason); }));
            }));
        };
        /**
         * @template T
         * @param {?} storeName
         * @param {?} key
         * @return {?}
         */
        NgxIndexedDBService.prototype.getByKey = /**
         * @template T
         * @param {?} storeName
         * @param {?} key
         * @return {?}
         */
        function (storeName, key) {
            var _this = this;
            return new Promise((/**
             * @param {?} resolve
             * @param {?} reject
             * @return {?}
             */
            function (resolve, reject) {
                openDatabase(_this.indexedDB, _this.dbConfig.name, _this.dbConfig.version).then((/**
                 * @param {?} db
                 * @return {?}
                 */
                function (db) {
                    /** @type {?} */
                    var transaction = createTransaction(db, optionsGenerator(DBMode.readonly, storeName, reject, resolve));
                    /** @type {?} */
                    var objectStore = transaction.objectStore(storeName);
                    /** @type {?} */
                    var request = objectStore.get(key);
                    request.onsuccess = (/**
                     * @param {?} event
                     * @return {?}
                     */
                    function (event) {
                        resolve(((/** @type {?} */ (event.target))).result);
                    });
                    request.onerror = (/**
                     * @param {?} event
                     * @return {?}
                     */
                    function (event) {
                        reject(event);
                    });
                })).catch((/**
                 * @param {?} reason
                 * @return {?}
                 */
                function (reason) { return reject(reason); }));
            }));
        };
        /**
         * @template T
         * @param {?} storeName
         * @param {?} id
         * @return {?}
         */
        NgxIndexedDBService.prototype.getByID = /**
         * @template T
         * @param {?} storeName
         * @param {?} id
         * @return {?}
         */
        function (storeName, id) {
            var _this = this;
            return new Promise((/**
             * @param {?} resolve
             * @param {?} reject
             * @return {?}
             */
            function (resolve, reject) {
                openDatabase(_this.indexedDB, _this.dbConfig.name, _this.dbConfig.version).then((/**
                 * @param {?} db
                 * @return {?}
                 */
                function (db) {
                    validateBeforeTransaction(db, storeName, reject);
                    /** @type {?} */
                    var transaction = createTransaction(db, optionsGenerator(DBMode.readonly, storeName, reject, resolve));
                    /** @type {?} */
                    var objectStore = transaction.objectStore(storeName);
                    /** @type {?} */
                    var request;
                    request = objectStore.get(id);
                    request.onsuccess = (/**
                     * @param {?} event
                     * @return {?}
                     */
                    function (event) {
                        resolve((/** @type {?} */ (((/** @type {?} */ (event.target))).result)));
                    });
                })).catch((/**
                 * @param {?} reason
                 * @return {?}
                 */
                function (reason) { return reject(reason); }));
            }));
        };
        /**
         * @template T
         * @param {?} storeName
         * @return {?}
         */
        NgxIndexedDBService.prototype.getAll = /**
         * @template T
         * @param {?} storeName
         * @return {?}
         */
        function (storeName) {
            var _this = this;
            return new Promise((/**
             * @param {?} resolve
             * @param {?} reject
             * @return {?}
             */
            function (resolve, reject) {
                openDatabase(_this.indexedDB, _this.dbConfig.name, _this.dbConfig.version).then((/**
                 * @param {?} db
                 * @return {?}
                 */
                function (db) {
                    validateBeforeTransaction(db, storeName, reject);
                    /** @type {?} */
                    var transaction = createTransaction(db, optionsGenerator(DBMode.readonly, storeName, reject, resolve));
                    /** @type {?} */
                    var objectStore = transaction.objectStore(storeName);
                    /** @type {?} */
                    var result = [];
                    /** @type {?} */
                    var request = objectStore.getAll();
                    request.onerror = (/**
                     * @param {?} e
                     * @return {?}
                     */
                    function (e) {
                        reject(e);
                    });
                    request.onsuccess = (/**
                     * @param {?} __0
                     * @return {?}
                     */
                    function (_a) {
                        var ResultAll = _a.target.result;
                        resolve((/** @type {?} */ (ResultAll)));
                    });
                })).catch((/**
                 * @param {?} reason
                 * @return {?}
                 */
                function (reason) { return reject(reason); }));
            }));
        };
        /**
         * @template T
         * @param {?} storeName
         * @param {?} value
         * @param {?=} key
         * @return {?}
         */
        NgxIndexedDBService.prototype.update = /**
         * @template T
         * @param {?} storeName
         * @param {?} value
         * @param {?=} key
         * @return {?}
         */
        function (storeName, value, key) {
            var _this = this;
            return new Promise((/**
             * @param {?} resolve
             * @param {?} reject
             * @return {?}
             */
            function (resolve, reject) {
                openDatabase(_this.indexedDB, _this.dbConfig.name, _this.dbConfig.version).then((/**
                 * @param {?} db
                 * @return {?}
                 */
                function (db) {
                    validateBeforeTransaction(db, storeName, reject);
                    /** @type {?} */
                    var transaction = createTransaction(db, optionsGenerator(DBMode.readwrite, storeName, reject, resolve));
                    /** @type {?} */
                    var objectStore = transaction.objectStore(storeName);
                    transaction.oncomplete = (/**
                     * @param {?} event
                     * @return {?}
                     */
                    function (event) {
                        resolve(event);
                    });
                    if (key) {
                        objectStore.put(value, key);
                    }
                    else {
                        objectStore.put(value);
                    }
                })).catch((/**
                 * @param {?} reason
                 * @return {?}
                 */
                function (reason) { return reject(reason); }));
            }));
        };
        /**
         * @param {?} storeName
         * @param {?} key
         * @return {?}
         */
        NgxIndexedDBService.prototype.deleteRecord = /**
         * @param {?} storeName
         * @param {?} key
         * @return {?}
         */
        function (storeName, key) {
            var _this = this;
            return new Promise((/**
             * @param {?} resolve
             * @param {?} reject
             * @return {?}
             */
            function (resolve, reject) {
                openDatabase(_this.indexedDB, _this.dbConfig.name, _this.dbConfig.version).then((/**
                 * @param {?} db
                 * @return {?}
                 */
                function (db) {
                    validateBeforeTransaction(db, storeName, reject);
                    /** @type {?} */
                    var transaction = createTransaction(db, optionsGenerator(DBMode.readwrite, storeName, reject, resolve));
                    /** @type {?} */
                    var objectStore = transaction.objectStore(storeName);
                    /** @type {?} */
                    var request = objectStore.delete(key);
                    request.onsuccess = (/**
                     * @param {?} event
                     * @return {?}
                     */
                    function (event) {
                        resolve(event);
                    });
                })).catch((/**
                 * @param {?} reason
                 * @return {?}
                 */
                function (reason) { return reject(reason); }));
            }));
        };
        /**
         * @param {?} storeName
         * @return {?}
         */
        NgxIndexedDBService.prototype.clear = /**
         * @param {?} storeName
         * @return {?}
         */
        function (storeName) {
            var _this = this;
            return new Promise((/**
             * @param {?} resolve
             * @param {?} reject
             * @return {?}
             */
            function (resolve, reject) {
                openDatabase(_this.indexedDB, _this.dbConfig.name, _this.dbConfig.version).then((/**
                 * @param {?} db
                 * @return {?}
                 */
                function (db) {
                    validateBeforeTransaction(db, storeName, reject);
                    /** @type {?} */
                    var transaction = createTransaction(db, optionsGenerator(DBMode.readwrite, storeName, reject, resolve));
                    /** @type {?} */
                    var objectStore = transaction.objectStore(storeName);
                    objectStore.clear();
                    transaction.oncomplete = (/**
                     * @param {?} event
                     * @return {?}
                     */
                    function (event) {
                        resolve();
                    });
                })).catch((/**
                 * @param {?} reason
                 * @return {?}
                 */
                function (reason) { return reject(reason); }));
            }));
        };
        /**
         * @param {?} storeName
         * @param {?} key
         * @return {?}
         */
        NgxIndexedDBService.prototype.delete = /**
         * @param {?} storeName
         * @param {?} key
         * @return {?}
         */
        function (storeName, key) {
            var _this = this;
            return new Promise((/**
             * @param {?} resolve
             * @param {?} reject
             * @return {?}
             */
            function (resolve, reject) {
                openDatabase(_this.indexedDB, _this.dbConfig.name, _this.dbConfig.version).then((/**
                 * @param {?} db
                 * @return {?}
                 */
                function (db) {
                    validateBeforeTransaction(db, storeName, reject);
                    /** @type {?} */
                    var transaction = createTransaction(db, optionsGenerator(DBMode.readwrite, storeName, reject, resolve));
                    /** @type {?} */
                    var objectStore = transaction.objectStore(storeName);
                    objectStore['delete'](key);
                })).catch((/**
                 * @param {?} reason
                 * @return {?}
                 */
                function (reason) { return reject(reason); }));
            }));
        };
        /**
         * @return {?}
         */
        NgxIndexedDBService.prototype.deleteDatabase = /**
         * @return {?}
         */
        function () {
            var _this = this;
            return new Promise((/**
             * @param {?} resolve
             * @param {?} reject
             * @return {?}
             */
            function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                var db, deleteDBRequest, e_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 3, , 4]);
                            return [4 /*yield*/, openDatabase(this.indexedDB, this.dbConfig.name, this.dbConfig.version)];
                        case 1:
                            db = _a.sent();
                            return [4 /*yield*/, db.close()];
                        case 2:
                            _a.sent();
                            deleteDBRequest = this.indexedDB.deleteDatabase(this.dbConfig.name);
                            deleteDBRequest.onsuccess = resolve;
                            deleteDBRequest.onerror = reject;
                            deleteDBRequest.onblocked = (/**
                             * @return {?}
                             */
                            function () {
                                throw new Error("Unable to delete database because it's blocked");
                            });
                            return [3 /*break*/, 4];
                        case 3:
                            e_1 = _a.sent();
                            reject(e_1);
                            return [3 /*break*/, 4];
                        case 4: return [2 /*return*/];
                    }
                });
            }); }));
        };
        /**
         * @param {?} storeName
         * @param {?} cursorCallback
         * @param {?=} keyRange
         * @return {?}
         */
        NgxIndexedDBService.prototype.openCursor = /**
         * @param {?} storeName
         * @param {?} cursorCallback
         * @param {?=} keyRange
         * @return {?}
         */
        function (storeName, cursorCallback, keyRange) {
            var _this = this;
            return new Promise((/**
             * @param {?} resolve
             * @param {?} reject
             * @return {?}
             */
            function (resolve, reject) {
                openDatabase(_this.indexedDB, _this.dbConfig.name, _this.dbConfig.version).then((/**
                 * @param {?} db
                 * @return {?}
                 */
                function (db) {
                    validateBeforeTransaction(db, storeName, reject);
                    /** @type {?} */
                    var transaction = createTransaction(db, optionsGenerator(DBMode.readonly, storeName, reject, resolve));
                    /** @type {?} */
                    var objectStore = transaction.objectStore(storeName);
                    /** @type {?} */
                    var request = keyRange === undefined ? objectStore.openCursor() : objectStore.openCursor(keyRange);
                    request.onsuccess = (/**
                     * @param {?} event
                     * @return {?}
                     */
                    function (event) {
                        cursorCallback(event);
                        resolve();
                    });
                })).catch((/**
                 * @param {?} reason
                 * @return {?}
                 */
                function (reason) { return reject(reason); }));
            }));
        };
        /**
         * Open a cursor by index filter.
         * @param storeName The name of the store to query.
         * @param indexName The index name to filter.
         * @param keyRange The range value and criteria to apply on the index.
         * @param cursorCallback A callback called when done.
         */
        /**
         * Open a cursor by index filter.
         * @param {?} storeName The name of the store to query.
         * @param {?} indexName The index name to filter.
         * @param {?} keyRange The range value and criteria to apply on the index.
         * @param {?} cursorCallback A callback called when done.
         * @return {?}
         */
        NgxIndexedDBService.prototype.openCursorByIndex = /**
         * Open a cursor by index filter.
         * @param {?} storeName The name of the store to query.
         * @param {?} indexName The index name to filter.
         * @param {?} keyRange The range value and criteria to apply on the index.
         * @param {?} cursorCallback A callback called when done.
         * @return {?}
         */
        function (storeName, indexName, keyRange, cursorCallback) {
            var _this = this;
            return new Promise((/**
             * @param {?} resolve
             * @param {?} reject
             * @return {?}
             */
            function (resolve, reject) {
                openDatabase(_this.indexedDB, _this.dbConfig.name, _this.dbConfig.version).then((/**
                 * @param {?} db
                 * @return {?}
                 */
                function (db) {
                    validateBeforeTransaction(db, storeName, reject);
                    /** @type {?} */
                    var transaction = createTransaction(db, optionsGenerator(DBMode.readonly, storeName, reject, resolve));
                    /** @type {?} */
                    var objectStore = transaction.objectStore(storeName);
                    /** @type {?} */
                    var index = objectStore.index(indexName);
                    /** @type {?} */
                    var request = index.openCursor(keyRange);
                    request.onsuccess = (/**
                     * @param {?} event
                     * @return {?}
                     */
                    function (event) {
                        cursorCallback(event);
                        resolve();
                    });
                })).catch((/**
                 * @param {?} reason
                 * @return {?}
                 */
                function (reason) { return reject(reason); }));
            }));
        };
        /**
         * Returns all items by an index.
         * @param storeName The name of the store to query
         * @param indexName The index name to filter
         * @param keyRange  The range value and criteria to apply on the index.
         */
        /**
         * Returns all items by an index.
         * @template T
         * @param {?} storeName The name of the store to query
         * @param {?} indexName The index name to filter
         * @param {?} keyRange  The range value and criteria to apply on the index.
         * @return {?}
         */
        NgxIndexedDBService.prototype.getAllByIndex = /**
         * Returns all items by an index.
         * @template T
         * @param {?} storeName The name of the store to query
         * @param {?} indexName The index name to filter
         * @param {?} keyRange  The range value and criteria to apply on the index.
         * @return {?}
         */
        function (storeName, indexName, keyRange) {
            var _this = this;
            /** @type {?} */
            var data = [];
            return new Promise((/**
             * @param {?} resolve
             * @param {?} reject
             * @return {?}
             */
            function (resolve, reject) {
                _this.openCursorByIndex(storeName, indexName, keyRange, (/**
                 * @param {?} event
                 * @return {?}
                 */
                function (event) {
                    /** @type {?} */
                    var cursor = ((/** @type {?} */ (event.target))).result;
                    if (cursor) {
                        data.push(cursor.value);
                        cursor.continue();
                    }
                    else {
                        resolve(data);
                    }
                })).catch((/**
                 * @param {?} reason
                 * @return {?}
                 */
                function (reason) { return reject(reason); }));
            }));
        };
        /**
         * @param {?} storeName
         * @param {?} indexName
         * @param {?} key
         * @return {?}
         */
        NgxIndexedDBService.prototype.getByIndex = /**
         * @param {?} storeName
         * @param {?} indexName
         * @param {?} key
         * @return {?}
         */
        function (storeName, indexName, key) {
            var _this = this;
            return new Promise((/**
             * @param {?} resolve
             * @param {?} reject
             * @return {?}
             */
            function (resolve, reject) {
                openDatabase(_this.indexedDB, _this.dbConfig.name, _this.dbConfig.version).then((/**
                 * @param {?} db
                 * @return {?}
                 */
                function (db) {
                    validateBeforeTransaction(db, storeName, reject);
                    /** @type {?} */
                    var transaction = createTransaction(db, optionsGenerator(DBMode.readonly, storeName, reject, resolve));
                    /** @type {?} */
                    var objectStore = transaction.objectStore(storeName);
                    /** @type {?} */
                    var index = objectStore.index(indexName);
                    /** @type {?} */
                    var request = index.get(key);
                    request.onsuccess = (/**
                     * @param {?} event
                     * @return {?}
                     */
                    function (event) {
                        resolve(((/** @type {?} */ (event.target))).result);
                    });
                })).catch((/**
                 * @param {?} reason
                 * @return {?}
                 */
                function (reason) { return reject(reason); }));
            }));
        };
        /**
         * @param {?} storeName
         * @param {?=} keyRange
         * @return {?}
         */
        NgxIndexedDBService.prototype.count = /**
         * @param {?} storeName
         * @param {?=} keyRange
         * @return {?}
         */
        function (storeName, keyRange) {
            var _this = this;
            return new Promise((/**
             * @param {?} resolve
             * @param {?} reject
             * @return {?}
             */
            function (resolve, reject) {
                openDatabase(_this.indexedDB, _this.dbConfig.name, _this.dbConfig.version).then((/**
                 * @param {?} db
                 * @return {?}
                 */
                function (db) {
                    validateBeforeTransaction(db, storeName, reject);
                    /** @type {?} */
                    var transaction = createTransaction(db, optionsGenerator(DBMode.readonly, storeName, reject, resolve));
                    /** @type {?} */
                    var objectStore = transaction.objectStore(storeName);
                    /** @type {?} */
                    var request;
                    request = objectStore.count(keyRange);
                    request.onerror = (/**
                     * @param {?} e
                     * @return {?}
                     */
                    function (e) { return reject(e); });
                    request.onsuccess = (/**
                     * @param {?} e
                     * @return {?}
                     */
                    function (e) { return resolve(((/** @type {?} */ (e.target))).result); });
                })).catch((/**
                 * @param {?} reason
                 * @return {?}
                 */
                function (reason) { return reject(reason); }));
            }));
        };
        NgxIndexedDBService.decorators = [
            { type: core.Injectable }
        ];
        /** @nocollapse */
        NgxIndexedDBService.ctorParameters = function () { return [
            { type: undefined, decorators: [{ type: core.Inject, args: [CONFIG_TOKEN,] }] },
            { type: undefined, decorators: [{ type: core.Inject, args: [core.PLATFORM_ID,] }] }
        ]; };
        return NgxIndexedDBService;
    }());
    if (false) {
        /**
         * @type {?}
         * @private
         */
        NgxIndexedDBService.prototype.isBrowser;
        /** @type {?} */
        NgxIndexedDBService.prototype.indexedDB;
        /**
         * @type {?}
         * @private
         */
        NgxIndexedDBService.prototype.dbConfig;
        /**
         * @type {?}
         * @private
         */
        NgxIndexedDBService.prototype.platformId;
    }

    /**
     * @fileoverview added by tsickle
     * Generated from: lib/ngxindexeddb.module.ts
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var NgxIndexedDBModule = /** @class */ (function () {
        function NgxIndexedDBModule() {
        }
        /**
         * @param {?} dbConfig
         * @return {?}
         */
        NgxIndexedDBModule.forRoot = /**
         * @param {?} dbConfig
         * @return {?}
         */
        function (dbConfig) {
            return {
                ngModule: NgxIndexedDBModule,
                providers: [NgxIndexedDBService, { provide: CONFIG_TOKEN, useValue: dbConfig }]
            };
        };
        NgxIndexedDBModule.decorators = [
            { type: core.NgModule, args: [{
                        declarations: [],
                        imports: [common.CommonModule]
                    },] }
        ];
        return NgxIndexedDBModule;
    }());

    exports.CONFIG_TOKEN = CONFIG_TOKEN;
    exports.NgxIndexedDBModule = NgxIndexedDBModule;
    exports.NgxIndexedDBService = NgxIndexedDBService;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ngx-indexed-db.umd.js.map
