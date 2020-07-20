/**
 * @fileoverview added by tsickle
 * Generated from: lib/ngx-indexed-db.service.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { __awaiter, __generator } from "tslib";
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { openDatabase, DBMode, CreateObjectStore } from './ngx-indexed-db';
import { createTransaction, optionsGenerator, validateBeforeTransaction } from '../utils';
import { CONFIG_TOKEN } from './ngx-indexed-db.meta';
import { isPlatformBrowser } from '@angular/common';
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
        this.isBrowser = isPlatformBrowser(platformId);
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
        { type: Injectable }
    ];
    /** @nocollapse */
    NgxIndexedDBService.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Inject, args: [CONFIG_TOKEN,] }] },
        { type: undefined, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] }
    ]; };
    return NgxIndexedDBService;
}());
export { NgxIndexedDBService };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWluZGV4ZWQtZGIuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1pbmRleGVkLWRiLyIsInNvdXJjZXMiOlsibGliL25neC1pbmRleGVkLWRiLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsV0FBVyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ2hFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxFQUFxQixpQkFBaUIsRUFBbUIsTUFBTSxrQkFBa0IsQ0FBQztBQUMvRyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsZ0JBQWdCLEVBQUUseUJBQXlCLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFDMUYsT0FBTyxFQUFFLFlBQVksRUFBWSxNQUFNLHVCQUF1QixDQUFDO0FBQy9ELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRXBEO0lBS0MsNkJBQTBDLFFBQWtCLEVBQStCLFVBQWU7UUFBaEUsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQUErQixlQUFVLEdBQVYsVUFBVSxDQUFLO1FBQ3pHLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFO1lBQ25CLE1BQU0sSUFBSSxLQUFLLENBQUMsK0RBQStELENBQUMsQ0FBQztTQUNqRjtRQUNELElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFO1lBQ3RCLE1BQU0sSUFBSSxLQUFLLENBQUMsbUVBQW1FLENBQUMsQ0FBQztTQUNyRjtRQUNELElBQUksQ0FBQyxTQUFTLEdBQUcsaUJBQWlCLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDL0MsSUFBSSxJQUFJLENBQUMsU0FBUyxFQUFFO1lBQ25CLElBQUksQ0FBQyxTQUFTO2dCQUNiLE1BQU0sQ0FBQyxTQUFTO29CQUNoQixDQUFDLG1CQUFLLE1BQU0sRUFBQSxDQUFDLENBQUMsWUFBWTtvQkFDMUIsQ0FBQyxtQkFBSyxNQUFNLEVBQUEsQ0FBQyxDQUFD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LENBQUMsS0FBSzs7OztZQUFDLFVBQUEsTUFBTSxJQUFJLE9BQUEsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFkLENBQWMsRUFBQyxDQUFDO1FBQ3BDLENBQUMsRUFBQyxDQUFDO0lBQ0osQ0FBQzs7Z0JBclJELFVBQVU7Ozs7Z0RBS0csTUFBTSxTQUFDLFlBQVk7Z0RBQStCLE1BQU0sU0FBQyxXQUFXOztJQWlSbEYsMEJBQUM7Q0FBQSxBQXRSRCxJQXNSQztTQXJSWSxtQkFBbUI7Ozs7OztJQUMvQix3Q0FBb0M7O0lBQ3BDLHdDQUFVOzs7OztJQUVFLHVDQUFnRDs7Ozs7SUFBRSx5Q0FBNEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBJbmplY3QsIFBMQVRGT1JNX0lEIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBvcGVuRGF0YWJhc2UsIERCTW9kZSwgS2V5LCBSZXF1ZXN0RXZlbnQsIENyZWF0ZU9iamVjdFN0b3JlLCBPYmplY3RTdG9yZU1ldGEgfSBmcm9tICcuL25neC1pbmRleGVkLWRiJztcbmltcG9ydCB7IGNyZWF0ZVRyYW5zYWN0aW9uLCBvcHRpb25zR2VuZXJhdG9yLCB2YWxpZGF0ZUJlZm9yZVRyYW5zYWN0aW9uIH0gZnJvbSAnLi4vdXRpbHMnO1xuaW1wb3J0IHsgQ09ORklHX1RPS0VOLCBEQkNvbmZpZyB9IGZyb20gJy4vbmd4LWluZGV4ZWQtZGIubWV0YSc7XG5pbXBvcnQgeyBpc1BsYXRmb3JtQnJvd3NlciB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBOZ3hJbmRleGVkREJTZXJ2aWNlIHtcblx0cHJpdmF0ZSByZWFkb25seSBpc0Jyb3dzZXI6IGJvb2xlYW47XG5cdGluZGV4ZWREQjtcblxuXHRjb25zdHJ1Y3RvcihASW5qZWN0KENPTkZJR19UT0tFTikgcHJpdmF0ZSBkYkNvbmZpZzogREJDb25maWcsIEBJbmplY3QoUExBVEZPUk1fSUQpIHByaXZhdGUgcGxhdGZvcm1JZDogYW55KSB7XG5cdFx0aWYgKCFkYkNvbmZpZy5uYW1lKSB7XG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoJ05neEluZGV4ZWREQjogUGxlYXNlLCBwcm92aWRlIHRoZSBkYk5hbWUgaW4gdGhlIGNvbmZpZ3VyYXRpb24nKTtcblx0XHR9XG5cdFx0aWYgKCFkYkNvbmZpZy52ZXJzaW9uKSB7XG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoJ05neEluZGV4ZWREQjogUGxlYXNlLCBwcm92aWRlIHRoZSBkYiB2ZXJzaW9uIGluIHRoZSBjb25maWd1cmF0aW9uJyk7XG5cdFx0fVxuXHRcdHRoaXMuaXNCcm93c2VyID0gaXNQbGF0Zm9ybUJyb3dzZXIocGxhdGZvcm1JZCk7XG5cdFx0aWYgKHRoaXMuaXNCcm93c2VyKSB7XG5cdFx0XHR0aGlzLmluZGV4ZWREQiA9XG5cdFx0XHRcdHdpbmRvdy5pbmRleGVkREIgfHxcblx0XHRcdFx0KDxhbnk+d2luZG93KS5tb3pJbmRleGVkREIgfHxcblx0XHRcdFx0KDxhbnk+d2luZG93KS53ZWJraXRJbmRleGVkREIgfHxcblx0XHRcdFx0KDxhbnk+d2luZG93KS5tc0luZGV4ZWREQjtcblx0XHRcdENyZWF0ZU9iamVjdFN0b3JlKFxuXHRcdFx0XHR0aGlzLmluZGV4ZWREQixcblx0XHRcdFx0ZGJDb25maWcubmFtZSxcblx0XHRcdFx0ZGJDb25maWcudmVyc2lvbixcblx0XHRcdFx0ZGJDb25maWcub2JqZWN0U3RvcmVzTWV0YSxcblx0XHRcdFx0ZGJDb25maWcubWlncmF0aW9uRmFjdG9yeVxuXHRcdFx0KTtcblx0XHR9XG5cdH1cblxuXHRjcmVhdGVPYmplY3RTdG9yZShcblx0XHRzdG9yZVNjaGVtYTogT2JqZWN0U3RvcmVNZXRhLFxuXHRcdG1pZ3JhdGlvbkZhY3Rvcnk/OiAoKSA9PiB7IFtrZXk6IG51bWJlcl06IChkYjogSURCRGF0YWJhc2UsIHRyYW5zYWN0aW9uOiBJREJUcmFuc2FjdGlvbikgPT4gdm9pZCB9XG5cdCkge1xuXHRcdGxldCBzdG9yZVNjaGVtYXM6IE9iamVjdFN0b3JlTWV0YVtdID0gW3N0b3JlU2NoZW1hXTtcblx0XHRDcmVhdGVPYmplY3RTdG9yZSh0aGlzLmluZGV4ZWREQiwgdGhpcy5kYkNvbmZpZy5uYW1lLCB0aGlzLmRiQ29uZmlnLnZlcnNpb24sIHN0b3JlU2NoZW1hcywgbWlncmF0aW9uRmFjdG9yeSk7XG5cdH1cblxuXHRhZGQ8VD4oc3RvcmVOYW1lOiBzdHJpbmcsIHZhbHVlOiBULCBrZXk/OiBhbnkpIHtcblx0XHRyZXR1cm4gbmV3IFByb21pc2U8bnVtYmVyPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cdFx0XHRvcGVuRGF0YWJhc2UodGhpcy5pbmRleGVkREIsIHRoaXMuZGJDb25maWcubmFtZSwgdGhpcy5kYkNvbmZpZy52ZXJzaW9uKS50aGVuKChkYjogSURCRGF0YWJhc2UpID0+IHtcblx0XHRcdFx0bGV0IHRyYW5zYWN0aW9uID0gY3JlYXRlVHJhbnNhY3Rpb24oZGIsIG9wdGlvbnNHZW5lcmF0b3IoREJNb2RlLnJlYWR3cml0ZSwgc3RvcmVOYW1lLCByZWplY3QsIHJlc29sdmUpKSxcblx0XHRcdFx0XHRvYmplY3RTdG9yZSA9IHRyYW5zYWN0aW9uLm9iamVjdFN0b3JlKHN0b3JlTmFtZSk7XG5cblx0XHRcdFx0bGV0IHJlcXVlc3Q6IElEQlJlcXVlc3Q7XG5cdFx0XHRcdGlmIChrZXkpIHtcblx0XHRcdFx0XHRyZXF1ZXN0ID0gb2JqZWN0U3RvcmUuYWRkKHZhbHVlLCBrZXkpO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHJlcXVlc3QgPSBvYmplY3RTdG9yZS5hZGQodmFsdWUpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0cmVxdWVzdC5vbnN1Y2Nlc3MgPSAoZXZ0OiBhbnkpID0+IHtcblx0XHRcdFx0XHRrZXkgPSBldnQudGFyZ2V0LnJlc3VsdDtcblx0XHRcdFx0XHRyZXNvbHZlKGtleSk7XG5cdFx0XHRcdH07XG5cdFx0XHR9KS5jYXRjaChyZWFzb24gPT4gcmVqZWN0KHJlYXNvbikpO1xuXHRcdH0pO1xuXHR9XG5cblx0Z2V0QnlLZXk8VD4oc3RvcmVOYW1lOiBzdHJpbmcsIGtleTogYW55KSB7XG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlPGFueT4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXHRcdFx0b3BlbkRhdGFiYXNlKHRoaXMuaW5kZXhlZERCLCB0aGlzLmRiQ29uZmlnLm5hbWUsIHRoaXMuZGJDb25maWcudmVyc2lvbikudGhlbigoZGI6IElEQkRhdGFiYXNlKSA9PiB7XG5cdFx0XHRcdGxldCB0cmFuc2FjdGlvbiA9IGNyZWF0ZVRyYW5zYWN0aW9uKGRiLCBvcHRpb25zR2VuZXJhdG9yKERCTW9kZS5yZWFkb25seSwgc3RvcmVOYW1lLCByZWplY3QsIHJlc29sdmUpKSxcblx0XHRcdFx0XHRvYmplY3RTdG9yZSA9IHRyYW5zYWN0aW9uLm9iamVjdFN0b3JlKHN0b3JlTmFtZSk7XG5cdFx0XHRcdGxldCByZXF1ZXN0ID0gb2JqZWN0U3RvcmUuZ2V0KGtleSk7XG5cdFx0XHRcdHJlcXVlc3Qub25zdWNjZXNzID0gZnVuY3Rpb24oZXZlbnQ6IEV2ZW50KSB7XG5cdFx0XHRcdFx0cmVzb2x2ZSgoPGFueT5ldmVudC50YXJnZXQpLnJlc3VsdCk7XG5cdFx0XHRcdH07XG5cdFx0XHRcdHJlcXVlc3Qub25lcnJvciA9IGZ1bmN0aW9uKGV2ZW50OiBFdmVudCkge1xuXHRcdFx0XHRcdHJlamVjdChldmVudCk7XG5cdFx0XHRcdH07XG5cdFx0XHR9KS5jYXRjaChyZWFzb24gPT4gcmVqZWN0KHJlYXNvbikpO1xuXHRcdH0pO1xuXHR9XG5cblx0Z2V0QnlJRDxUPihzdG9yZU5hbWU6IHN0cmluZywgaWQ6IHN0cmluZyB8IG51bWJlcikge1xuXHRcdHJldHVybiBuZXcgUHJvbWlzZTxUPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cdFx0XHRvcGVuRGF0YWJhc2UodGhpcy5pbmRleGVkREIsIHRoaXMuZGJDb25maWcubmFtZSwgdGhpcy5kYkNvbmZpZy52ZXJzaW9uKS50aGVuKChkYjogSURCRGF0YWJhc2UpID0+IHtcblx0XHRcdFx0dmFsaWRhdGVCZWZvcmVUcmFuc2FjdGlvbihkYiwgc3RvcmVOYW1lLCByZWplY3QpO1xuXHRcdFx0XHRsZXQgdHJhbnNhY3Rpb24gPSBjcmVhdGVUcmFuc2FjdGlvbihkYiwgb3B0aW9uc0dlbmVyYXRvcihEQk1vZGUucmVhZG9ubHksIHN0b3JlTmFtZSwgcmVqZWN0LCByZXNvbHZlKSksXG5cdFx0XHRcdFx0b2JqZWN0U3RvcmUgPSB0cmFuc2FjdGlvbi5vYmplY3RTdG9yZShzdG9yZU5hbWUpLFxuXHRcdFx0XHRcdHJlcXVlc3Q6IElEQlJlcXVlc3Q7XG5cdFx0XHRcdHJlcXVlc3QgPSBvYmplY3RTdG9yZS5nZXQoaWQpO1xuXHRcdFx0XHRyZXF1ZXN0Lm9uc3VjY2VzcyA9IGZ1bmN0aW9uKGV2ZW50OiBFdmVudCkge1xuXHRcdFx0XHRcdHJlc29sdmUoKGV2ZW50LnRhcmdldCBhcyBhbnkpLnJlc3VsdCBhcyBUKTtcblx0XHRcdFx0fTtcblx0XHRcdH0pLmNhdGNoKHJlYXNvbiA9PiByZWplY3QocmVhc29uKSk7XG5cdFx0fSk7XG5cdH1cblxuXHRnZXRBbGw8VD4oc3RvcmVOYW1lOiBzdHJpbmcpIHtcblx0XHRyZXR1cm4gbmV3IFByb21pc2U8VFtdPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cdFx0XHRvcGVuRGF0YWJhc2UodGhpcy5pbmRleGVkREIsIHRoaXMuZGJDb25maWcubmFtZSwgdGhpcy5kYkNvbmZpZy52ZXJzaW9uKS50aGVuKGRiID0+IHtcblx0XHRcdFx0dmFsaWRhdGVCZWZvcmVUcmFuc2FjdGlvbihkYiwgc3RvcmVOYW1lLCByZWplY3QpO1xuXHRcdFx0XHRsZXQgdHJhbnNhY3Rpb24gPSBjcmVhdGVUcmFuc2FjdGlvbihkYiwgb3B0aW9uc0dlbmVyYXRvcihEQk1vZGUucmVhZG9ubHksIHN0b3JlTmFtZSwgcmVqZWN0LCByZXNvbHZlKSksXG5cdFx0XHRcdFx0b2JqZWN0U3RvcmUgPSB0cmFuc2FjdGlvbi5vYmplY3RTdG9yZShzdG9yZU5hbWUpLFxuXHRcdFx0XHRcdHJlc3VsdDogQXJyYXk8YW55PiA9IFtdO1xuXG5cdFx0XHRcdGNvbnN0IHJlcXVlc3Q6IElEQlJlcXVlc3QgPSBvYmplY3RTdG9yZS5nZXRBbGwoKTtcblxuXHRcdFx0XHRyZXF1ZXN0Lm9uZXJyb3IgPSBmdW5jdGlvbihlKSB7XG5cdFx0XHRcdFx0cmVqZWN0KGUpO1xuXHRcdFx0XHR9O1xuXHRcdFx0XHRyZXF1ZXN0Lm9uc3VjY2VzcyA9IGZ1bmN0aW9uKHsgdGFyZ2V0OiB7IHJlc3VsdDogUmVzdWx0QWxsIH0gfTogUmVxdWVzdEV2ZW50PFQ+KSB7XG5cdFx0XHRcdFx0cmVzb2x2ZShSZXN1bHRBbGwgYXMgVFtdKTtcblx0XHRcdFx0fTtcblx0XHRcdH0pLmNhdGNoKHJlYXNvbiA9PiByZWplY3QocmVhc29uKSk7XG5cdFx0fSk7XG5cdH1cblxuXHR1cGRhdGU8VD4oc3RvcmVOYW1lOiBzdHJpbmcsIHZhbHVlOiBULCBrZXk/OiBhbnkpIHtcblx0XHRyZXR1cm4gbmV3IFByb21pc2U8YW55PigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cdFx0XHRvcGVuRGF0YWJhc2UodGhpcy5pbmRleGVkREIsIHRoaXMuZGJDb25maWcubmFtZSwgdGhpcy5kYkNvbmZpZy52ZXJzaW9uKS50aGVuKGRiID0+IHtcblx0XHRcdFx0dmFsaWRhdGVCZWZvcmVUcmFuc2FjdGlvbihkYiwgc3RvcmVOYW1lLCByZWplY3QpO1xuXHRcdFx0XHRsZXQgdHJhbnNhY3Rpb24gPSBjcmVhdGVUcmFuc2FjdGlvbihkYiwgb3B0aW9uc0dlbmVyYXRvcihEQk1vZGUucmVhZHdyaXRlLCBzdG9yZU5hbWUsIHJlamVjdCwgcmVzb2x2ZSkpLFxuXHRcdFx0XHRcdG9iamVjdFN0b3JlID0gdHJhbnNhY3Rpb24ub2JqZWN0U3RvcmUoc3RvcmVOYW1lKTtcblx0XHRcdFx0dHJhbnNhY3Rpb24ub25jb21wbGV0ZSA9IGV2ZW50ID0+IHtcblx0XHRcdFx0XHRyZXNvbHZlKGV2ZW50KTtcblx0XHRcdFx0fTtcblx0XHRcdFx0aWYgKGtleSkge1xuXHRcdFx0XHRcdG9iamVjdFN0b3JlLnB1dCh2YWx1ZSwga2V5KTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRvYmplY3RTdG9yZS5wdXQodmFsdWUpO1xuXHRcdFx0XHR9XG5cdFx0XHR9KS5jYXRjaChyZWFzb24gPT4gcmVqZWN0KHJlYXNvbikpO1xuXHRcdH0pO1xuXHR9XG5cblx0ZGVsZXRlUmVjb3JkKHN0b3JlTmFtZTogc3RyaW5nLCBrZXk6IEtleSkge1xuXHRcdHJldHVybiBuZXcgUHJvbWlzZTxhbnk+KChyZXNvbHZlLCByZWplY3QpID0+IHtcblx0XHRcdG9wZW5EYXRhYmFzZSh0aGlzLmluZGV4ZWREQiwgdGhpcy5kYkNvbmZpZy5uYW1lLCB0aGlzLmRiQ29uZmlnLnZlcnNpb24pLnRoZW4oZGIgPT4ge1xuXHRcdFx0XHR2YWxpZGF0ZUJlZm9yZVRyYW5zYWN0aW9uKGRiLCBzdG9yZU5hbWUsIHJlamVjdCk7XG5cdFx0XHRcdGxldCB0cmFuc2FjdGlvbiA9IGNyZWF0ZVRyYW5zYWN0aW9uKGRiLCBvcHRpb25zR2VuZXJhdG9yKERCTW9kZS5yZWFkd3JpdGUsIHN0b3JlTmFtZSwgcmVqZWN0LCByZXNvbHZlKSksXG5cdFx0XHRcdFx0b2JqZWN0U3RvcmUgPSB0cmFuc2FjdGlvbi5vYmplY3RTdG9yZShzdG9yZU5hbWUpO1xuXHRcdFx0XHRsZXQgcmVxdWVzdCA9IG9iamVjdFN0b3JlLmRlbGV0ZShrZXkpO1xuXHRcdFx0XHRyZXF1ZXN0Lm9uc3VjY2VzcyA9IGV2ZW50ID0+IHtcblx0XHRcdFx0XHRyZXNvbHZlKGV2ZW50KTtcblx0XHRcdFx0fTtcblx0XHRcdH0pLmNhdGNoKHJlYXNvbiA9PiByZWplY3QocmVhc29uKSk7XG5cdFx0fSk7XG5cdH1cblxuXHRjbGVhcihzdG9yZU5hbWU6IHN0cmluZykge1xuXHRcdHJldHVybiBuZXcgUHJvbWlzZTxhbnk+KChyZXNvbHZlLCByZWplY3QpID0+IHtcblx0XHRcdG9wZW5EYXRhYmFzZSh0aGlzLmluZGV4ZWREQiwgdGhpcy5kYkNvbmZpZy5uYW1lLCB0aGlzLmRiQ29uZmlnLnZlcnNpb24pLnRoZW4oZGIgPT4ge1xuXHRcdFx0XHR2YWxpZGF0ZUJlZm9yZVRyYW5zYWN0aW9uKGRiLCBzdG9yZU5hbWUsIHJlamVjdCk7XG5cdFx0XHRcdGxldCB0cmFuc2FjdGlvbiA9IGNyZWF0ZVRyYW5zYWN0aW9uKGRiLCBvcHRpb25zR2VuZXJhdG9yKERCTW9kZS5yZWFkd3JpdGUsIHN0b3JlTmFtZSwgcmVqZWN0LCByZXNvbHZlKSksXG5cdFx0XHRcdFx0b2JqZWN0U3RvcmUgPSB0cmFuc2FjdGlvbi5vYmplY3RTdG9yZShzdG9yZU5hbWUpO1xuXHRcdFx0XHRvYmplY3RTdG9yZS5jbGVhcigpO1xuXHRcdFx0XHR0cmFuc2FjdGlvbi5vbmNvbXBsZXRlID0gZXZlbnQgPT4ge1xuXHRcdFx0XHRcdHJlc29sdmUoKTtcblx0XHRcdFx0fTtcblx0XHRcdH0pLmNhdGNoKHJlYXNvbiA9PiByZWplY3QocmVhc29uKSk7XG5cdFx0fSk7XG5cdH1cblxuXHRkZWxldGUoc3RvcmVOYW1lOiBzdHJpbmcsIGtleTogYW55KSB7XG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlPGFueT4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXHRcdFx0b3BlbkRhdGFiYXNlKHRoaXMuaW5kZXhlZERCLCB0aGlzLmRiQ29uZmlnLm5hbWUsIHRoaXMuZGJDb25maWcudmVyc2lvbikudGhlbihkYiA9PiB7XG5cdFx0XHRcdHZhbGlkYXRlQmVmb3JlVHJhbnNhY3Rpb24oZGIsIHN0b3JlTmFtZSwgcmVqZWN0KTtcblx0XHRcdFx0bGV0IHRyYW5zYWN0aW9uID0gY3JlYXRlVHJhbnNhY3Rpb24oZGIsIG9wdGlvbnNHZW5lcmF0b3IoREJNb2RlLnJlYWR3cml0ZSwgc3RvcmVOYW1lLCByZWplY3QsIHJlc29sdmUpKSxcblx0XHRcdFx0XHRvYmplY3RTdG9yZSA9IHRyYW5zYWN0aW9uLm9iamVjdFN0b3JlKHN0b3JlTmFtZSk7XG5cdFx0XHRcdG9iamVjdFN0b3JlWydkZWxldGUnXShrZXkpO1xuXHRcdFx0fSkuY2F0Y2gocmVhc29uID0+IHJlamVjdChyZWFzb24pKTtcblx0XHR9KTtcblx0fVxuXG5cdGRlbGV0ZURhdGFiYXNlKCkge1xuXHRcdHJldHVybiBuZXcgUHJvbWlzZShhc3luYyAocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cdFx0XHR0cnkge1xuXHRcdFx0XHRjb25zdCBkYiA9IGF3YWl0IG9wZW5EYXRhYmFzZSh0aGlzLmluZGV4ZWREQiwgdGhpcy5kYkNvbmZpZy5uYW1lLCB0aGlzLmRiQ29uZmlnLnZlcnNpb24pO1xuXHRcdFx0XHRhd2FpdCBkYi5jbG9zZSgpO1xuXHRcdFx0XHRjb25zdCBkZWxldGVEQlJlcXVlc3QgPSB0aGlzLmluZGV4ZWREQi5kZWxldGVEYXRhYmFzZSh0aGlzLmRiQ29uZmlnLm5hbWUpO1xuXHRcdFx0XHRkZWxldGVEQlJlcXVlc3Qub25zdWNjZXNzID0gcmVzb2x2ZTtcblx0XHRcdFx0ZGVsZXRlREJSZXF1ZXN0Lm9uZXJyb3IgPSByZWplY3Q7XG5cdFx0XHRcdGRlbGV0ZURCUmVxdWVzdC5vbmJsb2NrZWQgPSAoKSA9PiB7XG5cdFx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiVW5hYmxlIHRvIGRlbGV0ZSBkYXRhYmFzZSBiZWNhdXNlIGl0J3MgYmxvY2tlZFwiKTtcblx0XHRcdFx0fTtcblx0XHRcdH0gY2F0Y2ggKGUpIHtcblx0XHRcdFx0cmVqZWN0KGUpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9XG5cblx0b3BlbkN1cnNvcihzdG9yZU5hbWU6IHN0cmluZywgY3Vyc29yQ2FsbGJhY2s6IChldmVudDogRXZlbnQpID0+IHZvaWQsIGtleVJhbmdlPzogSURCS2V5UmFuZ2UpIHtcblx0XHRyZXR1cm4gbmV3IFByb21pc2U8dm9pZD4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXHRcdFx0b3BlbkRhdGFiYXNlKHRoaXMuaW5kZXhlZERCLCB0aGlzLmRiQ29uZmlnLm5hbWUsIHRoaXMuZGJDb25maWcudmVyc2lvbikudGhlbihkYiA9PiB7XG5cdFx0XHRcdHZhbGlkYXRlQmVmb3JlVHJhbnNhY3Rpb24oZGIsIHN0b3JlTmFtZSwgcmVqZWN0KTtcblx0XHRcdFx0bGV0IHRyYW5zYWN0aW9uID0gY3JlYXRlVHJhbnNhY3Rpb24oZGIsIG9wdGlvbnNHZW5lcmF0b3IoREJNb2RlLnJlYWRvbmx5LCBzdG9yZU5hbWUsIHJlamVjdCwgcmVzb2x2ZSkpLFxuXHRcdFx0XHRcdG9iamVjdFN0b3JlID0gdHJhbnNhY3Rpb24ub2JqZWN0U3RvcmUoc3RvcmVOYW1lKSxcblx0XHRcdFx0XHRyZXF1ZXN0ID0ga2V5UmFuZ2UgPT09IHVuZGVmaW5lZCA/IG9iamVjdFN0b3JlLm9wZW5DdXJzb3IoKSA6IG9iamVjdFN0b3JlLm9wZW5DdXJzb3Ioa2V5UmFuZ2UpO1xuXG5cdFx0XHRcdHJlcXVlc3Qub25zdWNjZXNzID0gKGV2ZW50OiBFdmVudCkgPT4ge1xuXHRcdFx0XHRcdGN1cnNvckNhbGxiYWNrKGV2ZW50KTtcblx0XHRcdFx0XHRyZXNvbHZlKCk7XG5cdFx0XHRcdH07XG5cdFx0XHR9KS5jYXRjaChyZWFzb24gPT4gcmVqZWN0KHJlYXNvbikpO1xuXHRcdH0pO1xuXHR9XG5cblx0LyoqXG5cdCAqIE9wZW4gYSBjdXJzb3IgYnkgaW5kZXggZmlsdGVyLlxuXHQgKiBAcGFyYW0gc3RvcmVOYW1lIFRoZSBuYW1lIG9mIHRoZSBzdG9yZSB0byBxdWVyeS5cblx0ICogQHBhcmFtIGluZGV4TmFtZSBUaGUgaW5kZXggbmFtZSB0byBmaWx0ZXIuXG5cdCAqIEBwYXJhbSBrZXlSYW5nZSBUaGUgcmFuZ2UgdmFsdWUgYW5kIGNyaXRlcmlhIHRvIGFwcGx5IG9uIHRoZSBpbmRleC5cblx0ICogQHBhcmFtIGN1cnNvckNhbGxiYWNrIEEgY2FsbGJhY2sgY2FsbGVkIHdoZW4gZG9uZS5cblx0ICovXG5cdG9wZW5DdXJzb3JCeUluZGV4KFxuXHRcdHN0b3JlTmFtZTogc3RyaW5nLFxuXHRcdGluZGV4TmFtZTogc3RyaW5nLFxuXHRcdGtleVJhbmdlOiBJREJLZXlSYW5nZSxcblx0XHRjdXJzb3JDYWxsYmFjazogKGV2ZW50OiBFdmVudCkgPT4gdm9pZFxuXHQpIHtcblx0XHRyZXR1cm4gbmV3IFByb21pc2U8dm9pZD4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXHRcdFx0b3BlbkRhdGFiYXNlKHRoaXMuaW5kZXhlZERCLCB0aGlzLmRiQ29uZmlnLm5hbWUsIHRoaXMuZGJDb25maWcudmVyc2lvbikudGhlbihkYiA9PiB7XG5cdFx0XHRcdHZhbGlkYXRlQmVmb3JlVHJhbnNhY3Rpb24oZGIsIHN0b3JlTmFtZSwgcmVqZWN0KTtcblx0XHRcdFx0bGV0IHRyYW5zYWN0aW9uID0gY3JlYXRlVHJhbnNhY3Rpb24oZGIsIG9wdGlvbnNHZW5lcmF0b3IoREJNb2RlLnJlYWRvbmx5LCBzdG9yZU5hbWUsIHJlamVjdCwgcmVzb2x2ZSkpLFxuXHRcdFx0XHRcdG9iamVjdFN0b3JlID0gdHJhbnNhY3Rpb24ub2JqZWN0U3RvcmUoc3RvcmVOYW1lKSxcblx0XHRcdFx0XHRpbmRleCA9IG9iamVjdFN0b3JlLmluZGV4KGluZGV4TmFtZSksXG5cdFx0XHRcdFx0cmVxdWVzdCA9IGluZGV4Lm9wZW5DdXJzb3Ioa2V5UmFuZ2UpO1xuXG5cdFx0XHRcdHJlcXVlc3Qub25zdWNjZXNzID0gKGV2ZW50OiBFdmVudCkgPT4ge1xuXHRcdFx0XHRcdGN1cnNvckNhbGxiYWNrKGV2ZW50KTtcblx0XHRcdFx0XHRyZXNvbHZlKCk7XG5cdFx0XHRcdH07XG5cdFx0XHR9KS5jYXRjaChyZWFzb24gPT4gcmVqZWN0KHJlYXNvbikpO1xuXHRcdH0pO1xuXHR9XG5cblx0LyoqXG5cdCAqIFJldHVybnMgYWxsIGl0ZW1zIGJ5IGFuIGluZGV4LlxuXHQgKiBAcGFyYW0gc3RvcmVOYW1lIFRoZSBuYW1lIG9mIHRoZSBzdG9yZSB0byBxdWVyeVxuXHQgKiBAcGFyYW0gaW5kZXhOYW1lIFRoZSBpbmRleCBuYW1lIHRvIGZpbHRlclxuXHQgKiBAcGFyYW0ga2V5UmFuZ2UgIFRoZSByYW5nZSB2YWx1ZSBhbmQgY3JpdGVyaWEgdG8gYXBwbHkgb24gdGhlIGluZGV4LlxuXHQgKi9cblx0Z2V0QWxsQnlJbmRleDxUPihzdG9yZU5hbWU6IHN0cmluZywgaW5kZXhOYW1lOiBzdHJpbmcsIGtleVJhbmdlOiBJREJLZXlSYW5nZSk6IFByb21pc2U8VFtdPiB7XG5cdFx0Y29uc3QgZGF0YTogVFtdID0gW107XG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlPFRbXT4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXHRcdFx0dGhpcy5vcGVuQ3Vyc29yQnlJbmRleChzdG9yZU5hbWUsIGluZGV4TmFtZSwga2V5UmFuZ2UsIGV2ZW50ID0+IHtcblx0XHRcdFx0Y29uc3QgY3Vyc29yOiBJREJDdXJzb3JXaXRoVmFsdWUgPSAoZXZlbnQudGFyZ2V0IGFzIElEQlJlcXVlc3Q8SURCQ3Vyc29yV2l0aFZhbHVlPikucmVzdWx0O1xuXHRcdFx0XHRpZiAoY3Vyc29yKSB7XG5cdFx0XHRcdFx0ZGF0YS5wdXNoKGN1cnNvci52YWx1ZSk7XG5cdFx0XHRcdFx0Y3Vyc29yLmNvbnRpbnVlKCk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0cmVzb2x2ZShkYXRhKTtcblx0XHRcdFx0fVxuXHRcdFx0fSkuY2F0Y2gocmVhc29uID0+IHJlamVjdChyZWFzb24pKTtcblx0XHR9KTtcblx0fVxuXG5cdGdldEJ5SW5kZXgoc3RvcmVOYW1lOiBzdHJpbmcsIGluZGV4TmFtZTogc3RyaW5nLCBrZXk6IGFueSkge1xuXHRcdHJldHVybiBuZXcgUHJvbWlzZTxhbnk+KChyZXNvbHZlLCByZWplY3QpID0+IHtcblx0XHRcdG9wZW5EYXRhYmFzZSh0aGlzLmluZGV4ZWREQiwgdGhpcy5kYkNvbmZpZy5uYW1lLCB0aGlzLmRiQ29uZmlnLnZlcnNpb24pLnRoZW4oZGIgPT4ge1xuXHRcdFx0XHR2YWxpZGF0ZUJlZm9yZVRyYW5zYWN0aW9uKGRiLCBzdG9yZU5hbWUsIHJlamVjdCk7XG5cdFx0XHRcdGxldCB0cmFuc2FjdGlvbiA9IGNyZWF0ZVRyYW5zYWN0aW9uKGRiLCBvcHRpb25zR2VuZXJhdG9yKERCTW9kZS5yZWFkb25seSwgc3RvcmVOYW1lLCByZWplY3QsIHJlc29sdmUpKSxcblx0XHRcdFx0XHRvYmplY3RTdG9yZSA9IHRyYW5zYWN0aW9uLm9iamVjdFN0b3JlKHN0b3JlTmFtZSksXG5cdFx0XHRcdFx0aW5kZXggPSBvYmplY3RTdG9yZS5pbmRleChpbmRleE5hbWUpLFxuXHRcdFx0XHRcdHJlcXVlc3QgPSBpbmRleC5nZXQoa2V5KTtcblx0XHRcdFx0cmVxdWVzdC5vbnN1Y2Nlc3MgPSAoZXZlbnQ6IEV2ZW50KSA9PiB7XG5cdFx0XHRcdFx0cmVzb2x2ZSgoPElEQk9wZW5EQlJlcXVlc3Q+ZXZlbnQudGFyZ2V0KS5yZXN1bHQpO1xuXHRcdFx0XHR9O1xuXHRcdFx0fSkuY2F0Y2gocmVhc29uID0+IHJlamVjdChyZWFzb24pKTtcblx0XHR9KTtcblx0fVxuXG5cdGNvdW50KHN0b3JlTmFtZTogc3RyaW5nLCBrZXlSYW5nZT86IElEQlZhbGlkS2V5IHwgSURCS2V5UmFuZ2UpIHtcblx0XHRyZXR1cm4gbmV3IFByb21pc2U8YW55PigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cdFx0XHRvcGVuRGF0YWJhc2UodGhpcy5pbmRleGVkREIsIHRoaXMuZGJDb25maWcubmFtZSwgdGhpcy5kYkNvbmZpZy52ZXJzaW9uKS50aGVuKGRiID0+IHtcblx0XHRcdFx0dmFsaWRhdGVCZWZvcmVUcmFuc2FjdGlvbihkYiwgc3RvcmVOYW1lLCByZWplY3QpO1xuXHRcdFx0XHRsZXQgdHJhbnNhY3Rpb24gPSBjcmVhdGVUcmFuc2FjdGlvbihkYiwgb3B0aW9uc0dlbmVyYXRvcihEQk1vZGUucmVhZG9ubHksIHN0b3JlTmFtZSwgcmVqZWN0LCByZXNvbHZlKSksXG5cdFx0XHRcdFx0b2JqZWN0U3RvcmUgPSB0cmFuc2FjdGlvbi5vYmplY3RTdG9yZShzdG9yZU5hbWUpLFxuXHRcdFx0XHRcdHJlcXVlc3Q6IElEQlJlcXVlc3Q7XG5cblx0XHRcdFx0cmVxdWVzdCA9IG9iamVjdFN0b3JlLmNvdW50KGtleVJhbmdlKTtcblx0XHRcdFx0cmVxdWVzdC5vbmVycm9yID0gZSA9PiByZWplY3QoZSk7XG5cdFx0XHRcdHJlcXVlc3Qub25zdWNjZXNzID0gZSA9PiByZXNvbHZlKCg8YW55PmUudGFyZ2V0KS5yZXN1bHQpO1xuXHRcdFx0fSkuY2F0Y2gocmVhc29uID0+IHJlamVjdChyZWFzb24pKTtcblx0XHR9KTtcblx0fVxufVxuIl19