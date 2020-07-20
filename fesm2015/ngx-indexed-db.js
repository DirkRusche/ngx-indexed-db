import { InjectionToken, Injectable, Inject, PLATFORM_ID, NgModule } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { __awaiter } from 'tslib';

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
    (resolve, reject) => {
        if (!indexedDB) {
            reject('IndexedDB not available');
        }
        /** @type {?} */
        const request = indexedDB.open(dbName, version);
        /** @type {?} */
        let db;
        request.onsuccess = (/**
         * @param {?} event
         * @return {?}
         */
        (event) => {
            db = request.result;
            resolve(db);
        });
        request.onerror = (/**
         * @param {?} event
         * @return {?}
         */
        (event) => {
            reject(`IndexedDB error: ${request.error}`);
        });
        if (typeof upgradeCallback === 'function') {
            request.onupgradeneeded = (/**
             * @param {?} event
             * @return {?}
             */
            (event) => {
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
    const request = indexedDB.open(dbName, version);
    request.onupgradeneeded = (/**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        /** @type {?} */
        const database = ((/** @type {?} */ (event.target))).result;
        storeSchemas.forEach((/**
         * @param {?} storeSchema
         * @return {?}
         */
        (storeSchema) => {
            if (!database.objectStoreNames.contains(storeSchema.store)) {
                /** @type {?} */
                const objectStore = database.createObjectStore(storeSchema.store, storeSchema.storeConfig);
                storeSchema.storeSchema.forEach((/**
                 * @param {?} schema
                 * @return {?}
                 */
                (schema) => {
                    objectStore.createIndex(schema.name, schema.keypath, schema.options);
                }));
            }
        }));
        /** @type {?} */
        const storeMigrations = migrationFactory && migrationFactory();
        if (storeMigrations) {
            Object.keys(storeMigrations)
                .map((/**
             * @param {?} k
             * @return {?}
             */
            k => parseInt(k, 10)))
                .filter((/**
             * @param {?} v
             * @return {?}
             */
            v => v > event.oldVersion))
                .sort((/**
             * @param {?} a
             * @param {?} b
             * @return {?}
             */
            (a, b) => a - b))
                .forEach((/**
             * @param {?} v
             * @return {?}
             */
            v => {
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
const DBMode = {
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
        reject(`objectStore does not exists: ${storeName}`);
    }
}
/**
 * @param {?} db
 * @param {?} options
 * @return {?}
 */
function createTransaction(db, options) {
    /** @type {?} */
    let trans = db.transaction(options.storeName, options.dbMode);
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
        (e) => {
            reject(e);
        }),
        complete: (/**
         * @param {?} e
         * @return {?}
         */
        (e) => {
            resolve();
        }),
        abort: (/**
         * @param {?} e
         * @return {?}
         */
        (e) => {
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
const CONFIG_TOKEN = new InjectionToken(null);

/**
 * @fileoverview added by tsickle
 * Generated from: lib/ngx-indexed-db.service.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class NgxIndexedDBService {
    /**
     * @param {?} dbConfig
     * @param {?} platformId
     */
    constructor(dbConfig, platformId) {
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
    createObjectStore(storeSchema, migrationFactory) {
        /** @type {?} */
        let storeSchemas = [storeSchema];
        CreateObjectStore(this.indexedDB, this.dbConfig.name, this.dbConfig.version, storeSchemas, migrationFactory);
    }
    /**
     * @template T
     * @param {?} storeName
     * @param {?} value
     * @param {?=} key
     * @return {?}
     */
    add(storeName, value, key) {
        return new Promise((/**
         * @param {?} resolve
         * @param {?} reject
         * @return {?}
         */
        (resolve, reject) => {
            openDatabase(this.indexedDB, this.dbConfig.name, this.dbConfig.version).then((/**
             * @param {?} db
             * @return {?}
             */
            (db) => {
                /** @type {?} */
                let transaction = createTransaction(db, optionsGenerator(DBMode.readwrite, storeName, reject, resolve));
                /** @type {?} */
                let objectStore = transaction.objectStore(storeName);
                /** @type {?} */
                let request;
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
                (evt) => {
                    key = evt.target.result;
                    resolve(key);
                });
            })).catch((/**
             * @param {?} reason
             * @return {?}
             */
            reason => reject(reason)));
        }));
    }
    /**
     * @template T
     * @param {?} storeName
     * @param {?} key
     * @return {?}
     */
    getByKey(storeName, key) {
        return new Promise((/**
         * @param {?} resolve
         * @param {?} reject
         * @return {?}
         */
        (resolve, reject) => {
            openDatabase(this.indexedDB, this.dbConfig.name, this.dbConfig.version).then((/**
             * @param {?} db
             * @return {?}
             */
            (db) => {
                /** @type {?} */
                let transaction = createTransaction(db, optionsGenerator(DBMode.readonly, storeName, reject, resolve));
                /** @type {?} */
                let objectStore = transaction.objectStore(storeName);
                /** @type {?} */
                let request = objectStore.get(key);
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
            reason => reject(reason)));
        }));
    }
    /**
     * @template T
     * @param {?} storeName
     * @param {?} id
     * @return {?}
     */
    getByID(storeName, id) {
        return new Promise((/**
         * @param {?} resolve
         * @param {?} reject
         * @return {?}
         */
        (resolve, reject) => {
            openDatabase(this.indexedDB, this.dbConfig.name, this.dbConfig.version).then((/**
             * @param {?} db
             * @return {?}
             */
            (db) => {
                validateBeforeTransaction(db, storeName, reject);
                /** @type {?} */
                let transaction = createTransaction(db, optionsGenerator(DBMode.readonly, storeName, reject, resolve));
                /** @type {?} */
                let objectStore = transaction.objectStore(storeName);
                /** @type {?} */
                let request;
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
            reason => reject(reason)));
        }));
    }
    /**
     * @template T
     * @param {?} storeName
     * @return {?}
     */
    getAll(storeName) {
        return new Promise((/**
         * @param {?} resolve
         * @param {?} reject
         * @return {?}
         */
        (resolve, reject) => {
            openDatabase(this.indexedDB, this.dbConfig.name, this.dbConfig.version).then((/**
             * @param {?} db
             * @return {?}
             */
            db => {
                validateBeforeTransaction(db, storeName, reject);
                /** @type {?} */
                let transaction = createTransaction(db, optionsGenerator(DBMode.readonly, storeName, reject, resolve));
                /** @type {?} */
                let objectStore = transaction.objectStore(storeName);
                /** @type {?} */
                let result = [];
                /** @type {?} */
                const request = objectStore.getAll();
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
                function ({ target: { result: ResultAll } }) {
                    resolve((/** @type {?} */ (ResultAll)));
                });
            })).catch((/**
             * @param {?} reason
             * @return {?}
             */
            reason => reject(reason)));
        }));
    }
    /**
     * @template T
     * @param {?} storeName
     * @param {?} value
     * @param {?=} key
     * @return {?}
     */
    update(storeName, value, key) {
        return new Promise((/**
         * @param {?} resolve
         * @param {?} reject
         * @return {?}
         */
        (resolve, reject) => {
            openDatabase(this.indexedDB, this.dbConfig.name, this.dbConfig.version).then((/**
             * @param {?} db
             * @return {?}
             */
            db => {
                validateBeforeTransaction(db, storeName, reject);
                /** @type {?} */
                let transaction = createTransaction(db, optionsGenerator(DBMode.readwrite, storeName, reject, resolve));
                /** @type {?} */
                let objectStore = transaction.objectStore(storeName);
                transaction.oncomplete = (/**
                 * @param {?} event
                 * @return {?}
                 */
                event => {
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
            reason => reject(reason)));
        }));
    }
    /**
     * @param {?} storeName
     * @param {?} key
     * @return {?}
     */
    deleteRecord(storeName, key) {
        return new Promise((/**
         * @param {?} resolve
         * @param {?} reject
         * @return {?}
         */
        (resolve, reject) => {
            openDatabase(this.indexedDB, this.dbConfig.name, this.dbConfig.version).then((/**
             * @param {?} db
             * @return {?}
             */
            db => {
                validateBeforeTransaction(db, storeName, reject);
                /** @type {?} */
                let transaction = createTransaction(db, optionsGenerator(DBMode.readwrite, storeName, reject, resolve));
                /** @type {?} */
                let objectStore = transaction.objectStore(storeName);
                /** @type {?} */
                let request = objectStore.delete(key);
                request.onsuccess = (/**
                 * @param {?} event
                 * @return {?}
                 */
                event => {
                    resolve(event);
                });
            })).catch((/**
             * @param {?} reason
             * @return {?}
             */
            reason => reject(reason)));
        }));
    }
    /**
     * @param {?} storeName
     * @return {?}
     */
    clear(storeName) {
        return new Promise((/**
         * @param {?} resolve
         * @param {?} reject
         * @return {?}
         */
        (resolve, reject) => {
            openDatabase(this.indexedDB, this.dbConfig.name, this.dbConfig.version).then((/**
             * @param {?} db
             * @return {?}
             */
            db => {
                validateBeforeTransaction(db, storeName, reject);
                /** @type {?} */
                let transaction = createTransaction(db, optionsGenerator(DBMode.readwrite, storeName, reject, resolve));
                /** @type {?} */
                let objectStore = transaction.objectStore(storeName);
                objectStore.clear();
                transaction.oncomplete = (/**
                 * @param {?} event
                 * @return {?}
                 */
                event => {
                    resolve();
                });
            })).catch((/**
             * @param {?} reason
             * @return {?}
             */
            reason => reject(reason)));
        }));
    }
    /**
     * @param {?} storeName
     * @param {?} key
     * @return {?}
     */
    delete(storeName, key) {
        return new Promise((/**
         * @param {?} resolve
         * @param {?} reject
         * @return {?}
         */
        (resolve, reject) => {
            openDatabase(this.indexedDB, this.dbConfig.name, this.dbConfig.version).then((/**
             * @param {?} db
             * @return {?}
             */
            db => {
                validateBeforeTransaction(db, storeName, reject);
                /** @type {?} */
                let transaction = createTransaction(db, optionsGenerator(DBMode.readwrite, storeName, reject, resolve));
                /** @type {?} */
                let objectStore = transaction.objectStore(storeName);
                objectStore['delete'](key);
            })).catch((/**
             * @param {?} reason
             * @return {?}
             */
            reason => reject(reason)));
        }));
    }
    /**
     * @return {?}
     */
    deleteDatabase() {
        return new Promise((/**
         * @param {?} resolve
         * @param {?} reject
         * @return {?}
         */
        (resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                /** @type {?} */
                const db = yield openDatabase(this.indexedDB, this.dbConfig.name, this.dbConfig.version);
                yield db.close();
                /** @type {?} */
                const deleteDBRequest = this.indexedDB.deleteDatabase(this.dbConfig.name);
                deleteDBRequest.onsuccess = resolve;
                deleteDBRequest.onerror = reject;
                deleteDBRequest.onblocked = (/**
                 * @return {?}
                 */
                () => {
                    throw new Error("Unable to delete database because it's blocked");
                });
            }
            catch (e) {
                reject(e);
            }
        })));
    }
    /**
     * @param {?} storeName
     * @param {?} cursorCallback
     * @param {?=} keyRange
     * @return {?}
     */
    openCursor(storeName, cursorCallback, keyRange) {
        return new Promise((/**
         * @param {?} resolve
         * @param {?} reject
         * @return {?}
         */
        (resolve, reject) => {
            openDatabase(this.indexedDB, this.dbConfig.name, this.dbConfig.version).then((/**
             * @param {?} db
             * @return {?}
             */
            db => {
                validateBeforeTransaction(db, storeName, reject);
                /** @type {?} */
                let transaction = createTransaction(db, optionsGenerator(DBMode.readonly, storeName, reject, resolve));
                /** @type {?} */
                let objectStore = transaction.objectStore(storeName);
                /** @type {?} */
                let request = keyRange === undefined ? objectStore.openCursor() : objectStore.openCursor(keyRange);
                request.onsuccess = (/**
                 * @param {?} event
                 * @return {?}
                 */
                (event) => {
                    cursorCallback(event);
                    resolve();
                });
            })).catch((/**
             * @param {?} reason
             * @return {?}
             */
            reason => reject(reason)));
        }));
    }
    /**
     * Open a cursor by index filter.
     * @param {?} storeName The name of the store to query.
     * @param {?} indexName The index name to filter.
     * @param {?} keyRange The range value and criteria to apply on the index.
     * @param {?} cursorCallback A callback called when done.
     * @return {?}
     */
    openCursorByIndex(storeName, indexName, keyRange, cursorCallback) {
        return new Promise((/**
         * @param {?} resolve
         * @param {?} reject
         * @return {?}
         */
        (resolve, reject) => {
            openDatabase(this.indexedDB, this.dbConfig.name, this.dbConfig.version).then((/**
             * @param {?} db
             * @return {?}
             */
            db => {
                validateBeforeTransaction(db, storeName, reject);
                /** @type {?} */
                let transaction = createTransaction(db, optionsGenerator(DBMode.readonly, storeName, reject, resolve));
                /** @type {?} */
                let objectStore = transaction.objectStore(storeName);
                /** @type {?} */
                let index = objectStore.index(indexName);
                /** @type {?} */
                let request = index.openCursor(keyRange);
                request.onsuccess = (/**
                 * @param {?} event
                 * @return {?}
                 */
                (event) => {
                    cursorCallback(event);
                    resolve();
                });
            })).catch((/**
             * @param {?} reason
             * @return {?}
             */
            reason => reject(reason)));
        }));
    }
    /**
     * Returns all items by an index.
     * @template T
     * @param {?} storeName The name of the store to query
     * @param {?} indexName The index name to filter
     * @param {?} keyRange  The range value and criteria to apply on the index.
     * @return {?}
     */
    getAllByIndex(storeName, indexName, keyRange) {
        /** @type {?} */
        const data = [];
        return new Promise((/**
         * @param {?} resolve
         * @param {?} reject
         * @return {?}
         */
        (resolve, reject) => {
            this.openCursorByIndex(storeName, indexName, keyRange, (/**
             * @param {?} event
             * @return {?}
             */
            event => {
                /** @type {?} */
                const cursor = ((/** @type {?} */ (event.target))).result;
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
            reason => reject(reason)));
        }));
    }
    /**
     * @param {?} storeName
     * @param {?} indexName
     * @param {?} key
     * @return {?}
     */
    getByIndex(storeName, indexName, key) {
        return new Promise((/**
         * @param {?} resolve
         * @param {?} reject
         * @return {?}
         */
        (resolve, reject) => {
            openDatabase(this.indexedDB, this.dbConfig.name, this.dbConfig.version).then((/**
             * @param {?} db
             * @return {?}
             */
            db => {
                validateBeforeTransaction(db, storeName, reject);
                /** @type {?} */
                let transaction = createTransaction(db, optionsGenerator(DBMode.readonly, storeName, reject, resolve));
                /** @type {?} */
                let objectStore = transaction.objectStore(storeName);
                /** @type {?} */
                let index = objectStore.index(indexName);
                /** @type {?} */
                let request = index.get(key);
                request.onsuccess = (/**
                 * @param {?} event
                 * @return {?}
                 */
                (event) => {
                    resolve(((/** @type {?} */ (event.target))).result);
                });
            })).catch((/**
             * @param {?} reason
             * @return {?}
             */
            reason => reject(reason)));
        }));
    }
    /**
     * @param {?} storeName
     * @param {?=} keyRange
     * @return {?}
     */
    count(storeName, keyRange) {
        return new Promise((/**
         * @param {?} resolve
         * @param {?} reject
         * @return {?}
         */
        (resolve, reject) => {
            openDatabase(this.indexedDB, this.dbConfig.name, this.dbConfig.version).then((/**
             * @param {?} db
             * @return {?}
             */
            db => {
                validateBeforeTransaction(db, storeName, reject);
                /** @type {?} */
                let transaction = createTransaction(db, optionsGenerator(DBMode.readonly, storeName, reject, resolve));
                /** @type {?} */
                let objectStore = transaction.objectStore(storeName);
                /** @type {?} */
                let request;
                request = objectStore.count(keyRange);
                request.onerror = (/**
                 * @param {?} e
                 * @return {?}
                 */
                e => reject(e));
                request.onsuccess = (/**
                 * @param {?} e
                 * @return {?}
                 */
                e => resolve(((/** @type {?} */ (e.target))).result));
            })).catch((/**
             * @param {?} reason
             * @return {?}
             */
            reason => reject(reason)));
        }));
    }
}
NgxIndexedDBService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
NgxIndexedDBService.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [CONFIG_TOKEN,] }] },
    { type: undefined, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] }
];
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
class NgxIndexedDBModule {
    /**
     * @param {?} dbConfig
     * @return {?}
     */
    static forRoot(dbConfig) {
        return {
            ngModule: NgxIndexedDBModule,
            providers: [NgxIndexedDBService, { provide: CONFIG_TOKEN, useValue: dbConfig }]
        };
    }
}
NgxIndexedDBModule.decorators = [
    { type: NgModule, args: [{
                declarations: [],
                imports: [CommonModule]
            },] }
];

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
