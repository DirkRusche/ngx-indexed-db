import { InjectionToken, Injectable, Inject, PLATFORM_ID, NgModule } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { __awaiter, __generator } from 'tslib';

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
var CONFIG_TOKEN = new InjectionToken(null);

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
        { type: NgModule, args: [{
                    declarations: [],
                    imports: [CommonModule]
                },] }
    ];
    return NgxIndexedDBModule;
}());

/**
 * @fileoverview added by tsickle
 * Generated from: public_api.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * Generated from: ngx-indexed-db.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { CONFIG_TOKEN, NgxIndexedDBModule, NgxIndexedDBService };
//# sourceMappingURL=ngx-indexed-db.js.map
