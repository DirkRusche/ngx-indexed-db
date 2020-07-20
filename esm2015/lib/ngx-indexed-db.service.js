/**
 * @fileoverview added by tsickle
 * Generated from: lib/ngx-indexed-db.service.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { __awaiter } from "tslib";
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { openDatabase, DBMode, CreateObjectStore } from './ngx-indexed-db';
import { createTransaction, optionsGenerator, validateBeforeTransaction } from '../utils';
import { CONFIG_TOKEN } from './ngx-indexed-db.meta';
import { isPlatformBrowser } from '@angular/common';
export class NgxIndexedDBService {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWluZGV4ZWQtZGIuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1pbmRleGVkLWRiLyIsInNvdXJjZXMiOlsibGliL25neC1pbmRleGVkLWRiLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsV0FBVyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ2hFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxFQUFxQixpQkFBaUIsRUFBbUIsTUFBTSxrQkFBa0IsQ0FBQztBQUMvRyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsZ0JBQWdCLEVBQUUseUJBQXlCLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFDMUYsT0FBTyxFQUFFLFlBQVksRUFBWSxNQUFNLHVCQUF1QixDQUFDO0FBQy9ELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBR3BELE1BQU0sT0FBTyxtQkFBbUI7Ozs7O0lBSS9CLFlBQTBDLFFBQWtCLEVBQStCLFVBQWU7UUFBaEUsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQUErQixlQUFVLEdBQVYsVUFBVSxDQUFLO1FBQ3pHLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFO1lBQ25CLE1BQU0sSUFBSSxLQUFLLENBQUMsK0RBQStELENBQUMsQ0FBQztTQUNqRjtRQUNELElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFO1lBQ3RCLE1BQU0sSUFBSSxLQUFLLENBQUMsbUVBQW1FLENBQUMsQ0FBQztTQUNyRjtRQUNELElBQUksQ0FBQyxTQUFTLEdBQUcsaUJBQWlCLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDL0MsSUFBSSxJQUFJLENBQUMsU0FBUyxFQUFFO1lBQ25CLElBQUksQ0FBQyxTQUFTO2dCQUNiLE1BQU0sQ0FBQyxTQUFTO29CQUNoQixDQUFDLG1CQUFLLE1BQU0sRUFBQSxDQUFDLENBQUMsWUFBWTtvQkFDMUIsQ0FBQyxtQkFB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Ozs7Ozs7SUFIakYsd0NBQW9DOztJQUNwQyx3Q0FBVTs7Ozs7SUFFRSx1Q0FBZ0Q7Ozs7O0lBQUUseUNBQTRDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgSW5qZWN0LCBQTEFURk9STV9JRCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgb3BlbkRhdGFiYXNlLCBEQk1vZGUsIEtleSwgUmVxdWVzdEV2ZW50LCBDcmVhdGVPYmplY3RTdG9yZSwgT2JqZWN0U3RvcmVNZXRhIH0gZnJvbSAnLi9uZ3gtaW5kZXhlZC1kYic7XG5pbXBvcnQgeyBjcmVhdGVUcmFuc2FjdGlvbiwgb3B0aW9uc0dlbmVyYXRvciwgdmFsaWRhdGVCZWZvcmVUcmFuc2FjdGlvbiB9IGZyb20gJy4uL3V0aWxzJztcbmltcG9ydCB7IENPTkZJR19UT0tFTiwgREJDb25maWcgfSBmcm9tICcuL25neC1pbmRleGVkLWRiLm1ldGEnO1xuaW1wb3J0IHsgaXNQbGF0Zm9ybUJyb3dzZXIgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTmd4SW5kZXhlZERCU2VydmljZSB7XG5cdHByaXZhdGUgcmVhZG9ubHkgaXNCcm93c2VyOiBib29sZWFuO1xuXHRpbmRleGVkREI7XG5cblx0Y29uc3RydWN0b3IoQEluamVjdChDT05GSUdfVE9LRU4pIHByaXZhdGUgZGJDb25maWc6IERCQ29uZmlnLCBASW5qZWN0KFBMQVRGT1JNX0lEKSBwcml2YXRlIHBsYXRmb3JtSWQ6IGFueSkge1xuXHRcdGlmICghZGJDb25maWcubmFtZSkge1xuXHRcdFx0dGhyb3cgbmV3IEVycm9yKCdOZ3hJbmRleGVkREI6IFBsZWFzZSwgcHJvdmlkZSB0aGUgZGJOYW1lIGluIHRoZSBjb25maWd1cmF0aW9uJyk7XG5cdFx0fVxuXHRcdGlmICghZGJDb25maWcudmVyc2lvbikge1xuXHRcdFx0dGhyb3cgbmV3IEVycm9yKCdOZ3hJbmRleGVkREI6IFBsZWFzZSwgcHJvdmlkZSB0aGUgZGIgdmVyc2lvbiBpbiB0aGUgY29uZmlndXJhdGlvbicpO1xuXHRcdH1cblx0XHR0aGlzLmlzQnJvd3NlciA9IGlzUGxhdGZvcm1Ccm93c2VyKHBsYXRmb3JtSWQpO1xuXHRcdGlmICh0aGlzLmlzQnJvd3Nlcikge1xuXHRcdFx0dGhpcy5pbmRleGVkREIgPVxuXHRcdFx0XHR3aW5kb3cuaW5kZXhlZERCIHx8XG5cdFx0XHRcdCg8YW55PndpbmRvdykubW96SW5kZXhlZERCIHx8XG5cdFx0XHRcdCg8YW55PndpbmRvdykud2Via2l0SW5kZXhlZERCIHx8XG5cdFx0XHRcdCg8YW55PndpbmRvdykubXNJbmRleGVkREI7XG5cdFx0XHRDcmVhdGVPYmplY3RTdG9yZShcblx0XHRcdFx0dGhpcy5pbmRleGVkREIsXG5cdFx0XHRcdGRiQ29uZmlnLm5hbWUsXG5cdFx0XHRcdGRiQ29uZmlnLnZlcnNpb24sXG5cdFx0XHRcdGRiQ29uZmlnLm9iamVjdFN0b3Jlc01ldGEsXG5cdFx0XHRcdGRiQ29uZmlnLm1pZ3JhdGlvbkZhY3Rvcnlcblx0XHRcdCk7XG5cdFx0fVxuXHR9XG5cblx0Y3JlYXRlT2JqZWN0U3RvcmUoXG5cdFx0c3RvcmVTY2hlbWE6IE9iamVjdFN0b3JlTWV0YSxcblx0XHRtaWdyYXRpb25GYWN0b3J5PzogKCkgPT4geyBba2V5OiBudW1iZXJdOiAoZGI6IElEQkRhdGFiYXNlLCB0cmFuc2FjdGlvbjogSURCVHJhbnNhY3Rpb24pID0+IHZvaWQgfVxuXHQpIHtcblx0XHRsZXQgc3RvcmVTY2hlbWFzOiBPYmplY3RTdG9yZU1ldGFbXSA9IFtzdG9yZVNjaGVtYV07XG5cdFx0Q3JlYXRlT2JqZWN0U3RvcmUodGhpcy5pbmRleGVkREIsIHRoaXMuZGJDb25maWcubmFtZSwgdGhpcy5kYkNvbmZpZy52ZXJzaW9uLCBzdG9yZVNjaGVtYXMsIG1pZ3JhdGlvbkZhY3RvcnkpO1xuXHR9XG5cblx0YWRkPFQ+KHN0b3JlTmFtZTogc3RyaW5nLCB2YWx1ZTogVCwga2V5PzogYW55KSB7XG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlPG51bWJlcj4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXHRcdFx0b3BlbkRhdGFiYXNlKHRoaXMuaW5kZXhlZERCLCB0aGlzLmRiQ29uZmlnLm5hbWUsIHRoaXMuZGJDb25maWcudmVyc2lvbikudGhlbigoZGI6IElEQkRhdGFiYXNlKSA9PiB7XG5cdFx0XHRcdGxldCB0cmFuc2FjdGlvbiA9IGNyZWF0ZVRyYW5zYWN0aW9uKGRiLCBvcHRpb25zR2VuZXJhdG9yKERCTW9kZS5yZWFkd3JpdGUsIHN0b3JlTmFtZSwgcmVqZWN0LCByZXNvbHZlKSksXG5cdFx0XHRcdFx0b2JqZWN0U3RvcmUgPSB0cmFuc2FjdGlvbi5vYmplY3RTdG9yZShzdG9yZU5hbWUpO1xuXG5cdFx0XHRcdGxldCByZXF1ZXN0OiBJREJSZXF1ZXN0O1xuXHRcdFx0XHRpZiAoa2V5KSB7XG5cdFx0XHRcdFx0cmVxdWVzdCA9IG9iamVjdFN0b3JlLmFkZCh2YWx1ZSwga2V5KTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRyZXF1ZXN0ID0gb2JqZWN0U3RvcmUuYWRkKHZhbHVlKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHJlcXVlc3Qub25zdWNjZXNzID0gKGV2dDogYW55KSA9PiB7XG5cdFx0XHRcdFx0a2V5ID0gZXZ0LnRhcmdldC5yZXN1bHQ7XG5cdFx0XHRcdFx0cmVzb2x2ZShrZXkpO1xuXHRcdFx0XHR9O1xuXHRcdFx0fSkuY2F0Y2gocmVhc29uID0+IHJlamVjdChyZWFzb24pKTtcblx0XHR9KTtcblx0fVxuXG5cdGdldEJ5S2V5PFQ+KHN0b3JlTmFtZTogc3RyaW5nLCBrZXk6IGFueSkge1xuXHRcdHJldHVybiBuZXcgUHJvbWlzZTxhbnk+KChyZXNvbHZlLCByZWplY3QpID0+IHtcblx0XHRcdG9wZW5EYXRhYmFzZSh0aGlzLmluZGV4ZWREQiwgdGhpcy5kYkNvbmZpZy5uYW1lLCB0aGlzLmRiQ29uZmlnLnZlcnNpb24pLnRoZW4oKGRiOiBJREJEYXRhYmFzZSkgPT4ge1xuXHRcdFx0XHRsZXQgdHJhbnNhY3Rpb24gPSBjcmVhdGVUcmFuc2FjdGlvbihkYiwgb3B0aW9uc0dlbmVyYXRvcihEQk1vZGUucmVhZG9ubHksIHN0b3JlTmFtZSwgcmVqZWN0LCByZXNvbHZlKSksXG5cdFx0XHRcdFx0b2JqZWN0U3RvcmUgPSB0cmFuc2FjdGlvbi5vYmplY3RTdG9yZShzdG9yZU5hbWUpO1xuXHRcdFx0XHRsZXQgcmVxdWVzdCA9IG9iamVjdFN0b3JlLmdldChrZXkpO1xuXHRcdFx0XHRyZXF1ZXN0Lm9uc3VjY2VzcyA9IGZ1bmN0aW9uKGV2ZW50OiBFdmVudCkge1xuXHRcdFx0XHRcdHJlc29sdmUoKDxhbnk+ZXZlbnQudGFyZ2V0KS5yZXN1bHQpO1xuXHRcdFx0XHR9O1xuXHRcdFx0XHRyZXF1ZXN0Lm9uZXJyb3IgPSBmdW5jdGlvbihldmVudDogRXZlbnQpIHtcblx0XHRcdFx0XHRyZWplY3QoZXZlbnQpO1xuXHRcdFx0XHR9O1xuXHRcdFx0fSkuY2F0Y2gocmVhc29uID0+IHJlamVjdChyZWFzb24pKTtcblx0XHR9KTtcblx0fVxuXG5cdGdldEJ5SUQ8VD4oc3RvcmVOYW1lOiBzdHJpbmcsIGlkOiBzdHJpbmcgfCBudW1iZXIpIHtcblx0XHRyZXR1cm4gbmV3IFByb21pc2U8VD4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXHRcdFx0b3BlbkRhdGFiYXNlKHRoaXMuaW5kZXhlZERCLCB0aGlzLmRiQ29uZmlnLm5hbWUsIHRoaXMuZGJDb25maWcudmVyc2lvbikudGhlbigoZGI6IElEQkRhdGFiYXNlKSA9PiB7XG5cdFx0XHRcdHZhbGlkYXRlQmVmb3JlVHJhbnNhY3Rpb24oZGIsIHN0b3JlTmFtZSwgcmVqZWN0KTtcblx0XHRcdFx0bGV0IHRyYW5zYWN0aW9uID0gY3JlYXRlVHJhbnNhY3Rpb24oZGIsIG9wdGlvbnNHZW5lcmF0b3IoREJNb2RlLnJlYWRvbmx5LCBzdG9yZU5hbWUsIHJlamVjdCwgcmVzb2x2ZSkpLFxuXHRcdFx0XHRcdG9iamVjdFN0b3JlID0gdHJhbnNhY3Rpb24ub2JqZWN0U3RvcmUoc3RvcmVOYW1lKSxcblx0XHRcdFx0XHRyZXF1ZXN0OiBJREJSZXF1ZXN0O1xuXHRcdFx0XHRyZXF1ZXN0ID0gb2JqZWN0U3RvcmUuZ2V0KGlkKTtcblx0XHRcdFx0cmVxdWVzdC5vbnN1Y2Nlc3MgPSBmdW5jdGlvbihldmVudDogRXZlbnQpIHtcblx0XHRcdFx0XHRyZXNvbHZlKChldmVudC50YXJnZXQgYXMgYW55KS5yZXN1bHQgYXMgVCk7XG5cdFx0XHRcdH07XG5cdFx0XHR9KS5jYXRjaChyZWFzb24gPT4gcmVqZWN0KHJlYXNvbikpO1xuXHRcdH0pO1xuXHR9XG5cblx0Z2V0QWxsPFQ+KHN0b3JlTmFtZTogc3RyaW5nKSB7XG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlPFRbXT4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXHRcdFx0b3BlbkRhdGFiYXNlKHRoaXMuaW5kZXhlZERCLCB0aGlzLmRiQ29uZmlnLm5hbWUsIHRoaXMuZGJDb25maWcudmVyc2lvbikudGhlbihkYiA9PiB7XG5cdFx0XHRcdHZhbGlkYXRlQmVmb3JlVHJhbnNhY3Rpb24oZGIsIHN0b3JlTmFtZSwgcmVqZWN0KTtcblx0XHRcdFx0bGV0IHRyYW5zYWN0aW9uID0gY3JlYXRlVHJhbnNhY3Rpb24oZGIsIG9wdGlvbnNHZW5lcmF0b3IoREJNb2RlLnJlYWRvbmx5LCBzdG9yZU5hbWUsIHJlamVjdCwgcmVzb2x2ZSkpLFxuXHRcdFx0XHRcdG9iamVjdFN0b3JlID0gdHJhbnNhY3Rpb24ub2JqZWN0U3RvcmUoc3RvcmVOYW1lKSxcblx0XHRcdFx0XHRyZXN1bHQ6IEFycmF5PGFueT4gPSBbXTtcblxuXHRcdFx0XHRjb25zdCByZXF1ZXN0OiBJREJSZXF1ZXN0ID0gb2JqZWN0U3RvcmUuZ2V0QWxsKCk7XG5cblx0XHRcdFx0cmVxdWVzdC5vbmVycm9yID0gZnVuY3Rpb24oZSkge1xuXHRcdFx0XHRcdHJlamVjdChlKTtcblx0XHRcdFx0fTtcblx0XHRcdFx0cmVxdWVzdC5vbnN1Y2Nlc3MgPSBmdW5jdGlvbih7IHRhcmdldDogeyByZXN1bHQ6IFJlc3VsdEFsbCB9IH06IFJlcXVlc3RFdmVudDxUPikge1xuXHRcdFx0XHRcdHJlc29sdmUoUmVzdWx0QWxsIGFzIFRbXSk7XG5cdFx0XHRcdH07XG5cdFx0XHR9KS5jYXRjaChyZWFzb24gPT4gcmVqZWN0KHJlYXNvbikpO1xuXHRcdH0pO1xuXHR9XG5cblx0dXBkYXRlPFQ+KHN0b3JlTmFtZTogc3RyaW5nLCB2YWx1ZTogVCwga2V5PzogYW55KSB7XG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlPGFueT4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXHRcdFx0b3BlbkRhdGFiYXNlKHRoaXMuaW5kZXhlZERCLCB0aGlzLmRiQ29uZmlnLm5hbWUsIHRoaXMuZGJDb25maWcudmVyc2lvbikudGhlbihkYiA9PiB7XG5cdFx0XHRcdHZhbGlkYXRlQmVmb3JlVHJhbnNhY3Rpb24oZGIsIHN0b3JlTmFtZSwgcmVqZWN0KTtcblx0XHRcdFx0bGV0IHRyYW5zYWN0aW9uID0gY3JlYXRlVHJhbnNhY3Rpb24oZGIsIG9wdGlvbnNHZW5lcmF0b3IoREJNb2RlLnJlYWR3cml0ZSwgc3RvcmVOYW1lLCByZWplY3QsIHJlc29sdmUpKSxcblx0XHRcdFx0XHRvYmplY3RTdG9yZSA9IHRyYW5zYWN0aW9uLm9iamVjdFN0b3JlKHN0b3JlTmFtZSk7XG5cdFx0XHRcdHRyYW5zYWN0aW9uLm9uY29tcGxldGUgPSBldmVudCA9PiB7XG5cdFx0XHRcdFx0cmVzb2x2ZShldmVudCk7XG5cdFx0XHRcdH07XG5cdFx0XHRcdGlmIChrZXkpIHtcblx0XHRcdFx0XHRvYmplY3RTdG9yZS5wdXQodmFsdWUsIGtleSk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0b2JqZWN0U3RvcmUucHV0KHZhbHVlKTtcblx0XHRcdFx0fVxuXHRcdFx0fSkuY2F0Y2gocmVhc29uID0+IHJlamVjdChyZWFzb24pKTtcblx0XHR9KTtcblx0fVxuXG5cdGRlbGV0ZVJlY29yZChzdG9yZU5hbWU6IHN0cmluZywga2V5OiBLZXkpIHtcblx0XHRyZXR1cm4gbmV3IFByb21pc2U8YW55PigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cdFx0XHRvcGVuRGF0YWJhc2UodGhpcy5pbmRleGVkREIsIHRoaXMuZGJDb25maWcubmFtZSwgdGhpcy5kYkNvbmZpZy52ZXJzaW9uKS50aGVuKGRiID0+IHtcblx0XHRcdFx0dmFsaWRhdGVCZWZvcmVUcmFuc2FjdGlvbihkYiwgc3RvcmVOYW1lLCByZWplY3QpO1xuXHRcdFx0XHRsZXQgdHJhbnNhY3Rpb24gPSBjcmVhdGVUcmFuc2FjdGlvbihkYiwgb3B0aW9uc0dlbmVyYXRvcihEQk1vZGUucmVhZHdyaXRlLCBzdG9yZU5hbWUsIHJlamVjdCwgcmVzb2x2ZSkpLFxuXHRcdFx0XHRcdG9iamVjdFN0b3JlID0gdHJhbnNhY3Rpb24ub2JqZWN0U3RvcmUoc3RvcmVOYW1lKTtcblx0XHRcdFx0bGV0IHJlcXVlc3QgPSBvYmplY3RTdG9yZS5kZWxldGUoa2V5KTtcblx0XHRcdFx0cmVxdWVzdC5vbnN1Y2Nlc3MgPSBldmVudCA9PiB7XG5cdFx0XHRcdFx0cmVzb2x2ZShldmVudCk7XG5cdFx0XHRcdH07XG5cdFx0XHR9KS5jYXRjaChyZWFzb24gPT4gcmVqZWN0KHJlYXNvbikpO1xuXHRcdH0pO1xuXHR9XG5cblx0Y2xlYXIoc3RvcmVOYW1lOiBzdHJpbmcpIHtcblx0XHRyZXR1cm4gbmV3IFByb21pc2U8YW55PigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cdFx0XHRvcGVuRGF0YWJhc2UodGhpcy5pbmRleGVkREIsIHRoaXMuZGJDb25maWcubmFtZSwgdGhpcy5kYkNvbmZpZy52ZXJzaW9uKS50aGVuKGRiID0+IHtcblx0XHRcdFx0dmFsaWRhdGVCZWZvcmVUcmFuc2FjdGlvbihkYiwgc3RvcmVOYW1lLCByZWplY3QpO1xuXHRcdFx0XHRsZXQgdHJhbnNhY3Rpb24gPSBjcmVhdGVUcmFuc2FjdGlvbihkYiwgb3B0aW9uc0dlbmVyYXRvcihEQk1vZGUucmVhZHdyaXRlLCBzdG9yZU5hbWUsIHJlamVjdCwgcmVzb2x2ZSkpLFxuXHRcdFx0XHRcdG9iamVjdFN0b3JlID0gdHJhbnNhY3Rpb24ub2JqZWN0U3RvcmUoc3RvcmVOYW1lKTtcblx0XHRcdFx0b2JqZWN0U3RvcmUuY2xlYXIoKTtcblx0XHRcdFx0dHJhbnNhY3Rpb24ub25jb21wbGV0ZSA9IGV2ZW50ID0+IHtcblx0XHRcdFx0XHRyZXNvbHZlKCk7XG5cdFx0XHRcdH07XG5cdFx0XHR9KS5jYXRjaChyZWFzb24gPT4gcmVqZWN0KHJlYXNvbikpO1xuXHRcdH0pO1xuXHR9XG5cblx0ZGVsZXRlKHN0b3JlTmFtZTogc3RyaW5nLCBrZXk6IGFueSkge1xuXHRcdHJldHVybiBuZXcgUHJvbWlzZTxhbnk+KChyZXNvbHZlLCByZWplY3QpID0+IHtcblx0XHRcdG9wZW5EYXRhYmFzZSh0aGlzLmluZGV4ZWREQiwgdGhpcy5kYkNvbmZpZy5uYW1lLCB0aGlzLmRiQ29uZmlnLnZlcnNpb24pLnRoZW4oZGIgPT4ge1xuXHRcdFx0XHR2YWxpZGF0ZUJlZm9yZVRyYW5zYWN0aW9uKGRiLCBzdG9yZU5hbWUsIHJlamVjdCk7XG5cdFx0XHRcdGxldCB0cmFuc2FjdGlvbiA9IGNyZWF0ZVRyYW5zYWN0aW9uKGRiLCBvcHRpb25zR2VuZXJhdG9yKERCTW9kZS5yZWFkd3JpdGUsIHN0b3JlTmFtZSwgcmVqZWN0LCByZXNvbHZlKSksXG5cdFx0XHRcdFx0b2JqZWN0U3RvcmUgPSB0cmFuc2FjdGlvbi5vYmplY3RTdG9yZShzdG9yZU5hbWUpO1xuXHRcdFx0XHRvYmplY3RTdG9yZVsnZGVsZXRlJ10oa2V5KTtcblx0XHRcdH0pLmNhdGNoKHJlYXNvbiA9PiByZWplY3QocmVhc29uKSk7XG5cdFx0fSk7XG5cdH1cblxuXHRkZWxldGVEYXRhYmFzZSgpIHtcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoYXN5bmMgKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXHRcdFx0dHJ5IHtcblx0XHRcdFx0Y29uc3QgZGIgPSBhd2FpdCBvcGVuRGF0YWJhc2UodGhpcy5pbmRleGVkREIsIHRoaXMuZGJDb25maWcubmFtZSwgdGhpcy5kYkNvbmZpZy52ZXJzaW9uKTtcblx0XHRcdFx0YXdhaXQgZGIuY2xvc2UoKTtcblx0XHRcdFx0Y29uc3QgZGVsZXRlREJSZXF1ZXN0ID0gdGhpcy5pbmRleGVkREIuZGVsZXRlRGF0YWJhc2UodGhpcy5kYkNvbmZpZy5uYW1lKTtcblx0XHRcdFx0ZGVsZXRlREJSZXF1ZXN0Lm9uc3VjY2VzcyA9IHJlc29sdmU7XG5cdFx0XHRcdGRlbGV0ZURCUmVxdWVzdC5vbmVycm9yID0gcmVqZWN0O1xuXHRcdFx0XHRkZWxldGVEQlJlcXVlc3Qub25ibG9ja2VkID0gKCkgPT4ge1xuXHRcdFx0XHRcdHRocm93IG5ldyBFcnJvcihcIlVuYWJsZSB0byBkZWxldGUgZGF0YWJhc2UgYmVjYXVzZSBpdCdzIGJsb2NrZWRcIik7XG5cdFx0XHRcdH07XG5cdFx0XHR9IGNhdGNoIChlKSB7XG5cdFx0XHRcdHJlamVjdChlKTtcblx0XHRcdH1cblx0XHR9KTtcblx0fVxuXG5cdG9wZW5DdXJzb3Ioc3RvcmVOYW1lOiBzdHJpbmcsIGN1cnNvckNhbGxiYWNrOiAoZXZlbnQ6IEV2ZW50KSA9PiB2b2lkLCBrZXlSYW5nZT86IElEQktleVJhbmdlKSB7XG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlPHZvaWQ+KChyZXNvbHZlLCByZWplY3QpID0+IHtcblx0XHRcdG9wZW5EYXRhYmFzZSh0aGlzLmluZGV4ZWREQiwgdGhpcy5kYkNvbmZpZy5uYW1lLCB0aGlzLmRiQ29uZmlnLnZlcnNpb24pLnRoZW4oZGIgPT4ge1xuXHRcdFx0XHR2YWxpZGF0ZUJlZm9yZVRyYW5zYWN0aW9uKGRiLCBzdG9yZU5hbWUsIHJlamVjdCk7XG5cdFx0XHRcdGxldCB0cmFuc2FjdGlvbiA9IGNyZWF0ZVRyYW5zYWN0aW9uKGRiLCBvcHRpb25zR2VuZXJhdG9yKERCTW9kZS5yZWFkb25seSwgc3RvcmVOYW1lLCByZWplY3QsIHJlc29sdmUpKSxcblx0XHRcdFx0XHRvYmplY3RTdG9yZSA9IHRyYW5zYWN0aW9uLm9iamVjdFN0b3JlKHN0b3JlTmFtZSksXG5cdFx0XHRcdFx0cmVxdWVzdCA9IGtleVJhbmdlID09PSB1bmRlZmluZWQgPyBvYmplY3RTdG9yZS5vcGVuQ3Vyc29yKCkgOiBvYmplY3RTdG9yZS5vcGVuQ3Vyc29yKGtleVJhbmdlKTtcblxuXHRcdFx0XHRyZXF1ZXN0Lm9uc3VjY2VzcyA9IChldmVudDogRXZlbnQpID0+IHtcblx0XHRcdFx0XHRjdXJzb3JDYWxsYmFjayhldmVudCk7XG5cdFx0XHRcdFx0cmVzb2x2ZSgpO1xuXHRcdFx0XHR9O1xuXHRcdFx0fSkuY2F0Y2gocmVhc29uID0+IHJlamVjdChyZWFzb24pKTtcblx0XHR9KTtcblx0fVxuXG5cdC8qKlxuXHQgKiBPcGVuIGEgY3Vyc29yIGJ5IGluZGV4IGZpbHRlci5cblx0ICogQHBhcmFtIHN0b3JlTmFtZSBUaGUgbmFtZSBvZiB0aGUgc3RvcmUgdG8gcXVlcnkuXG5cdCAqIEBwYXJhbSBpbmRleE5hbWUgVGhlIGluZGV4IG5hbWUgdG8gZmlsdGVyLlxuXHQgKiBAcGFyYW0ga2V5UmFuZ2UgVGhlIHJhbmdlIHZhbHVlIGFuZCBjcml0ZXJpYSB0byBhcHBseSBvbiB0aGUgaW5kZXguXG5cdCAqIEBwYXJhbSBjdXJzb3JDYWxsYmFjayBBIGNhbGxiYWNrIGNhbGxlZCB3aGVuIGRvbmUuXG5cdCAqL1xuXHRvcGVuQ3Vyc29yQnlJbmRleChcblx0XHRzdG9yZU5hbWU6IHN0cmluZyxcblx0XHRpbmRleE5hbWU6IHN0cmluZyxcblx0XHRrZXlSYW5nZTogSURCS2V5UmFuZ2UsXG5cdFx0Y3Vyc29yQ2FsbGJhY2s6IChldmVudDogRXZlbnQpID0+IHZvaWRcblx0KSB7XG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlPHZvaWQ+KChyZXNvbHZlLCByZWplY3QpID0+IHtcblx0XHRcdG9wZW5EYXRhYmFzZSh0aGlzLmluZGV4ZWREQiwgdGhpcy5kYkNvbmZpZy5uYW1lLCB0aGlzLmRiQ29uZmlnLnZlcnNpb24pLnRoZW4oZGIgPT4ge1xuXHRcdFx0XHR2YWxpZGF0ZUJlZm9yZVRyYW5zYWN0aW9uKGRiLCBzdG9yZU5hbWUsIHJlamVjdCk7XG5cdFx0XHRcdGxldCB0cmFuc2FjdGlvbiA9IGNyZWF0ZVRyYW5zYWN0aW9uKGRiLCBvcHRpb25zR2VuZXJhdG9yKERCTW9kZS5yZWFkb25seSwgc3RvcmVOYW1lLCByZWplY3QsIHJlc29sdmUpKSxcblx0XHRcdFx0XHRvYmplY3RTdG9yZSA9IHRyYW5zYWN0aW9uLm9iamVjdFN0b3JlKHN0b3JlTmFtZSksXG5cdFx0XHRcdFx0aW5kZXggPSBvYmplY3RTdG9yZS5pbmRleChpbmRleE5hbWUpLFxuXHRcdFx0XHRcdHJlcXVlc3QgPSBpbmRleC5vcGVuQ3Vyc29yKGtleVJhbmdlKTtcblxuXHRcdFx0XHRyZXF1ZXN0Lm9uc3VjY2VzcyA9IChldmVudDogRXZlbnQpID0+IHtcblx0XHRcdFx0XHRjdXJzb3JDYWxsYmFjayhldmVudCk7XG5cdFx0XHRcdFx0cmVzb2x2ZSgpO1xuXHRcdFx0XHR9O1xuXHRcdFx0fSkuY2F0Y2gocmVhc29uID0+IHJlamVjdChyZWFzb24pKTtcblx0XHR9KTtcblx0fVxuXG5cdC8qKlxuXHQgKiBSZXR1cm5zIGFsbCBpdGVtcyBieSBhbiBpbmRleC5cblx0ICogQHBhcmFtIHN0b3JlTmFtZSBUaGUgbmFtZSBvZiB0aGUgc3RvcmUgdG8gcXVlcnlcblx0ICogQHBhcmFtIGluZGV4TmFtZSBUaGUgaW5kZXggbmFtZSB0byBmaWx0ZXJcblx0ICogQHBhcmFtIGtleVJhbmdlICBUaGUgcmFuZ2UgdmFsdWUgYW5kIGNyaXRlcmlhIHRvIGFwcGx5IG9uIHRoZSBpbmRleC5cblx0ICovXG5cdGdldEFsbEJ5SW5kZXg8VD4oc3RvcmVOYW1lOiBzdHJpbmcsIGluZGV4TmFtZTogc3RyaW5nLCBrZXlSYW5nZTogSURCS2V5UmFuZ2UpOiBQcm9taXNlPFRbXT4ge1xuXHRcdGNvbnN0IGRhdGE6IFRbXSA9IFtdO1xuXHRcdHJldHVybiBuZXcgUHJvbWlzZTxUW10+KChyZXNvbHZlLCByZWplY3QpID0+IHtcblx0XHRcdHRoaXMub3BlbkN1cnNvckJ5SW5kZXgoc3RvcmVOYW1lLCBpbmRleE5hbWUsIGtleVJhbmdlLCBldmVudCA9PiB7XG5cdFx0XHRcdGNvbnN0IGN1cnNvcjogSURCQ3Vyc29yV2l0aFZhbHVlID0gKGV2ZW50LnRhcmdldCBhcyBJREJSZXF1ZXN0PElEQkN1cnNvcldpdGhWYWx1ZT4pLnJlc3VsdDtcblx0XHRcdFx0aWYgKGN1cnNvcikge1xuXHRcdFx0XHRcdGRhdGEucHVzaChjdXJzb3IudmFsdWUpO1xuXHRcdFx0XHRcdGN1cnNvci5jb250aW51ZSgpO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHJlc29sdmUoZGF0YSk7XG5cdFx0XHRcdH1cblx0XHRcdH0pLmNhdGNoKHJlYXNvbiA9PiByZWplY3QocmVhc29uKSk7XG5cdFx0fSk7XG5cdH1cblxuXHRnZXRCeUluZGV4KHN0b3JlTmFtZTogc3RyaW5nLCBpbmRleE5hbWU6IHN0cmluZywga2V5OiBhbnkpIHtcblx0XHRyZXR1cm4gbmV3IFByb21pc2U8YW55PigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cdFx0XHRvcGVuRGF0YWJhc2UodGhpcy5pbmRleGVkREIsIHRoaXMuZGJDb25maWcubmFtZSwgdGhpcy5kYkNvbmZpZy52ZXJzaW9uKS50aGVuKGRiID0+IHtcblx0XHRcdFx0dmFsaWRhdGVCZWZvcmVUcmFuc2FjdGlvbihkYiwgc3RvcmVOYW1lLCByZWplY3QpO1xuXHRcdFx0XHRsZXQgdHJhbnNhY3Rpb24gPSBjcmVhdGVUcmFuc2FjdGlvbihkYiwgb3B0aW9uc0dlbmVyYXRvcihEQk1vZGUucmVhZG9ubHksIHN0b3JlTmFtZSwgcmVqZWN0LCByZXNvbHZlKSksXG5cdFx0XHRcdFx0b2JqZWN0U3RvcmUgPSB0cmFuc2FjdGlvbi5vYmplY3RTdG9yZShzdG9yZU5hbWUpLFxuXHRcdFx0XHRcdGluZGV4ID0gb2JqZWN0U3RvcmUuaW5kZXgoaW5kZXhOYW1lKSxcblx0XHRcdFx0XHRyZXF1ZXN0ID0gaW5kZXguZ2V0KGtleSk7XG5cdFx0XHRcdHJlcXVlc3Qub25zdWNjZXNzID0gKGV2ZW50OiBFdmVudCkgPT4ge1xuXHRcdFx0XHRcdHJlc29sdmUoKDxJREJPcGVuREJSZXF1ZXN0PmV2ZW50LnRhcmdldCkucmVzdWx0KTtcblx0XHRcdFx0fTtcblx0XHRcdH0pLmNhdGNoKHJlYXNvbiA9PiByZWplY3QocmVhc29uKSk7XG5cdFx0fSk7XG5cdH1cblxuXHRjb3VudChzdG9yZU5hbWU6IHN0cmluZywga2V5UmFuZ2U/OiBJREJWYWxpZEtleSB8IElEQktleVJhbmdlKSB7XG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlPGFueT4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXHRcdFx0b3BlbkRhdGFiYXNlKHRoaXMuaW5kZXhlZERCLCB0aGlzLmRiQ29uZmlnLm5hbWUsIHRoaXMuZGJDb25maWcudmVyc2lvbikudGhlbihkYiA9PiB7XG5cdFx0XHRcdHZhbGlkYXRlQmVmb3JlVHJhbnNhY3Rpb24oZGIsIHN0b3JlTmFtZSwgcmVqZWN0KTtcblx0XHRcdFx0bGV0IHRyYW5zYWN0aW9uID0gY3JlYXRlVHJhbnNhY3Rpb24oZGIsIG9wdGlvbnNHZW5lcmF0b3IoREJNb2RlLnJlYWRvbmx5LCBzdG9yZU5hbWUsIHJlamVjdCwgcmVzb2x2ZSkpLFxuXHRcdFx0XHRcdG9iamVjdFN0b3JlID0gdHJhbnNhY3Rpb24ub2JqZWN0U3RvcmUoc3RvcmVOYW1lKSxcblx0XHRcdFx0XHRyZXF1ZXN0OiBJREJSZXF1ZXN0O1xuXG5cdFx0XHRcdHJlcXVlc3QgPSBvYmplY3RTdG9yZS5jb3VudChrZXlSYW5nZSk7XG5cdFx0XHRcdHJlcXVlc3Qub25lcnJvciA9IGUgPT4gcmVqZWN0KGUpO1xuXHRcdFx0XHRyZXF1ZXN0Lm9uc3VjY2VzcyA9IGUgPT4gcmVzb2x2ZSgoPGFueT5lLnRhcmdldCkucmVzdWx0KTtcblx0XHRcdH0pLmNhdGNoKHJlYXNvbiA9PiByZWplY3QocmVhc29uKSk7XG5cdFx0fSk7XG5cdH1cbn1cbiJdfQ==