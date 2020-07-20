/**
 * @fileoverview added by tsickle
 * Generated from: lib/ngx-indexed-db.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 */
export function ObjectStoreMeta() { }
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
export function ObjectStoreSchema() { }
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
export function IndexDetails() { }
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
export function RequestEventTarget() { }
if (false) {
    /** @type {?} */
    RequestEventTarget.prototype.result;
}
/**
 * @record
 * @template T
 */
export function RequestEvent() { }
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
export function openDatabase(indexedDB, dbName, version, upgradeCallback) {
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
export function CreateObjectStore(indexedDB, dbName, version, storeSchemas, migrationFactory) {
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
export { DBMode };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWluZGV4ZWQtZGIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtaW5kZXhlZC1kYi8iLCJzb3VyY2VzIjpbImxpYi9uZ3gtaW5kZXhlZC1kYi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLHFDQUlDOzs7SUFIQSxnQ0FBYzs7SUFDZCxzQ0FBNkU7O0lBQzdFLHNDQUFpQzs7Ozs7QUFHbEMsdUNBSUM7OztJQUhBLGlDQUFhOztJQUNiLG9DQUEyQjs7SUFDM0Isb0NBQWlEOzs7OztBQUdsRCxrQ0FHQzs7O0lBRkEsaUNBQWtCOztJQUNsQiw2QkFBYzs7Ozs7O0FBRWYsd0NBRUM7OztJQURBLG9DQUFnQjs7Ozs7O0FBR2pCLGtDQUVDOzs7SUFEQSw4QkFBOEI7Ozs7Ozs7OztBQUcvQixNQUFNLFVBQVUsWUFBWSxDQUFDLFNBQXFCLEVBQUUsTUFBYyxFQUFFLE9BQWUsRUFBRSxlQUEwQjtJQUM5RyxPQUFPLElBQUksT0FBTzs7Ozs7SUFBYyxVQUFDLE9BQU8sRUFBRSxNQUFNO1FBQy9DLElBQUksQ0FBQyxTQUFTLEVBQUU7WUFDZixNQUFNLENBQUMseUJBQXlCLENBQUMsQ0FBQztTQUNsQzs7WUFDSyxPQUFPLEdBQUcsU0FBUyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsT0FBTyxDQUFDOztZQUMzQyxFQUFlO1FBQ25CLE9BQU8sQ0FBQyxTQUFTOzs7O1FBQUcsVUFBQyxLQUFZO1lBQ2hDLEVBQUUsR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDO1lBQ3BCLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNiLENBQUMsQ0FBQSxDQUFDO1FBQ0YsT0FBTyxDQUFDLE9BQU87Ozs7UUFBRyxVQUFDLEtBQVk7WUFDOUIsTUFBTSxDQUFDLHNCQUFvQixPQUFPLENBQUMsS0FBTyxDQUFDLENBQUM7UUFDN0MsQ0FBQyxDQUFBLENBQUM7UUFDRixJQUFJLE9BQU8sZUFBZSxLQUFLLFVBQVUsRUFBRTtZQUMxQyxPQUFPLENBQUMsZUFBZTs7OztZQUFHLFVBQUMsS0FBWTtnQkFDdEMsZUFBZSxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQztZQUM1QixDQUFDLENBQUEsQ0FBQztTQUNGO0lBQ0YsQ0FBQyxFQUFDLENBQUM7QUFDSixDQUFDOzs7Ozs7Ozs7QUFFRCxNQUFNLFVBQVUsaUJBQWlCLENBQ2hDLFNBQXFCLEVBQ3JCLE1BQWMsRUFDZCxPQUFlLEVBQ2YsWUFBK0IsRUFDL0IsZ0JBQWtHO0lBRWxHLElBQUksQ0FBQyxTQUFTLEVBQUU7UUFDZixPQUFPO0tBQ1A7O1FBQ0ssT0FBTyxHQUFxQixTQUFTLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxPQUFPLENBQUM7SUFFakUsT0FBTyxDQUFDLGVBQWU7Ozs7SUFBRyxVQUFTLEtBQTRCOztZQUN4RCxRQUFRLEdBQWdCLENBQUMsbUJBQUEsS0FBSyxDQUFDLE1BQU0sRUFBTyxDQUFDLENBQUMsTUFBTTtRQUUxRCxZQUFZLENBQUMsT0FBTzs7OztRQUFDLFVBQUMsV0FBNEI7WUFDakQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxFQUFFOztvQkFDckQsYUFBVyxHQUFHLFFBQVEsQ0FBQyxpQkFBaUIsQ0FBQyxXQUFXLENBQUMsS0FBSyxFQUFFLFdBQVcsQ0FBQyxXQUFXLENBQUM7Z0JBQzFGLFdBQVcsQ0FBQyxXQUFXLENBQUMsT0FBTzs7OztnQkFBQyxVQUFDLE1BQXlCO29CQUN6RCxhQUFXLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBQ3RFLENBQUMsRUFBQyxDQUFDO2FBQ0g7UUFDRixDQUFDLEVBQUMsQ0FBQzs7WUFFRyxlQUFlLEdBQUcsZ0JBQWdCLElBQUksZ0JBQWdCLEVBQUU7UUFDOUQsSUFBSSxlQUFlLEVBQUU7WUFDcEIsTUFBTSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUM7aUJBQzFCLEdBQUc7Ozs7WUFBQyxVQUFBLENBQUMsSUFBSSxPQUFBLFFBQVEsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQWYsQ0FBZSxFQUFDO2lCQUN6QixNQUFNOzs7O1lBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLEdBQUcsS0FBSyxDQUFDLFVBQVUsRUFBcEIsQ0FBb0IsRUFBQztpQkFDakMsSUFBSTs7Ozs7WUFBQyxVQUFDLENBQUMsRUFBRSxDQUFDLElBQUssT0FBQSxDQUFDLEdBQUcsQ0FBQyxFQUFMLENBQUssRUFBQztpQkFDckIsT0FBTzs7OztZQUFDLFVBQUEsQ0FBQztnQkFDVCxlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUNuRCxDQUFDLEVBQUMsQ0FBQztTQUNKO1FBRUQsUUFBUSxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ2xCLENBQUMsQ0FBQSxDQUFDO0lBRUYsT0FBTyxDQUFDLFNBQVM7Ozs7SUFBRyxVQUFTLENBQU07UUFDbEMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDekIsQ0FBQyxDQUFBLENBQUM7QUFDSCxDQUFDOztBQUVELElBQVksTUFBTTtJQUNqQixRQUFRLFlBQWE7SUFDckIsU0FBUyxhQUFjO0VBQ3ZCIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGludGVyZmFjZSBPYmplY3RTdG9yZU1ldGEge1xuXHRzdG9yZTogc3RyaW5nO1xuXHRzdG9yZUNvbmZpZzogeyBrZXlQYXRoOiBzdHJpbmc7IGF1dG9JbmNyZW1lbnQ6IGJvb2xlYW47IFtrZXk6IHN0cmluZ106IGFueSB9O1xuXHRzdG9yZVNjaGVtYTogT2JqZWN0U3RvcmVTY2hlbWFbXTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBPYmplY3RTdG9yZVNjaGVtYSB7XG5cdG5hbWU6IHN0cmluZztcblx0a2V5cGF0aDogc3RyaW5nIHwgc3RyaW5nW107XG5cdG9wdGlvbnM6IHsgdW5pcXVlOiBib29sZWFuOyBba2V5OiBzdHJpbmddOiBhbnkgfTtcbn1cbmV4cG9ydCB0eXBlIEtleSA9IHN0cmluZyB8IG51bWJlciB8IERhdGUgfCBBcnJheUJ1ZmZlclZpZXcgfCBBcnJheUJ1ZmZlciB8IElEQkFycmF5S2V5IHwgSURCS2V5UmFuZ2U7XG5leHBvcnQgaW50ZXJmYWNlIEluZGV4RGV0YWlscyB7XG5cdGluZGV4TmFtZTogc3RyaW5nO1xuXHRvcmRlcjogc3RyaW5nO1xufVxuZXhwb3J0IGludGVyZmFjZSBSZXF1ZXN0RXZlbnRUYXJnZXQ8VD4gZXh0ZW5kcyBFdmVudFRhcmdldCB7XG5cdHJlc3VsdDogVCB8IFRbXTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBSZXF1ZXN0RXZlbnQ8VD4gZXh0ZW5kcyBFdmVudCB7XG5cdHRhcmdldDogUmVxdWVzdEV2ZW50VGFyZ2V0PFQ+O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gb3BlbkRhdGFiYXNlKGluZGV4ZWREQjogSURCRmFjdG9yeSwgZGJOYW1lOiBzdHJpbmcsIHZlcnNpb246IG51bWJlciwgdXBncmFkZUNhbGxiYWNrPzogRnVuY3Rpb24pIHtcblx0cmV0dXJuIG5ldyBQcm9taXNlPElEQkRhdGFiYXNlPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cdFx0aWYgKCFpbmRleGVkREIpIHtcblx0XHRcdHJlamVjdCgnSW5kZXhlZERCIG5vdCBhdmFpbGFibGUnKTtcblx0XHR9XG5cdFx0Y29uc3QgcmVxdWVzdCA9IGluZGV4ZWREQi5vcGVuKGRiTmFtZSwgdmVyc2lvbik7XG5cdFx0bGV0IGRiOiBJREJEYXRhYmFzZTtcblx0XHRyZXF1ZXN0Lm9uc3VjY2VzcyA9IChldmVudDogRXZlbnQpID0+IHtcblx0XHRcdGRiID0gcmVxdWVzdC5yZXN1bHQ7XG5cdFx0XHRyZXNvbHZlKGRiKTtcblx0XHR9O1xuXHRcdHJlcXVlc3Qub25lcnJvciA9IChldmVudDogRXZlbnQpID0+IHtcblx0XHRcdHJlamVjdChgSW5kZXhlZERCIGVycm9yOiAke3JlcXVlc3QuZXJyb3J9YCk7XG5cdFx0fTtcblx0XHRpZiAodHlwZW9mIHVwZ3JhZGVDYWxsYmFjayA9PT0gJ2Z1bmN0aW9uJykge1xuXHRcdFx0cmVxdWVzdC5vbnVwZ3JhZGVuZWVkZWQgPSAoZXZlbnQ6IEV2ZW50KSA9PiB7XG5cdFx0XHRcdHVwZ3JhZGVDYWxsYmFjayhldmVudCwgZGIpO1xuXHRcdFx0fTtcblx0XHR9XG5cdH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gQ3JlYXRlT2JqZWN0U3RvcmUoXG5cdGluZGV4ZWREQjogSURCRmFjdG9yeSxcblx0ZGJOYW1lOiBzdHJpbmcsXG5cdHZlcnNpb246IG51bWJlcixcblx0c3RvcmVTY2hlbWFzOiBPYmplY3RTdG9yZU1ldGFbXSxcblx0bWlncmF0aW9uRmFjdG9yeT86ICgpID0+IHsgW2tleTogbnVtYmVyXTogKGRiOiBJREJEYXRhYmFzZSwgdHJhbnNhY3Rpb246IElEQlRyYW5zYWN0aW9uKSA9PiB2b2lkIH1cbikge1xuXHRpZiAoIWluZGV4ZWREQikge1xuXHRcdHJldHVybjtcblx0fVxuXHRjb25zdCByZXF1ZXN0OiBJREJPcGVuREJSZXF1ZXN0ID0gaW5kZXhlZERCLm9wZW4oZGJOYW1lLCB2ZXJzaW9uKTtcblxuXHRyZXF1ZXN0Lm9udXBncmFkZW5lZWRlZCA9IGZ1bmN0aW9uKGV2ZW50OiBJREJWZXJzaW9uQ2hhbmdlRXZlbnQpIHtcblx0XHRjb25zdCBkYXRhYmFzZTogSURCRGF0YWJhc2UgPSAoZXZlbnQudGFyZ2V0IGFzIGFueSkucmVzdWx0O1xuXG5cdFx0c3RvcmVTY2hlbWFzLmZvckVhY2goKHN0b3JlU2NoZW1hOiBPYmplY3RTdG9yZU1ldGEpID0+IHtcblx0XHRcdGlmICghZGF0YWJhc2Uub2JqZWN0U3RvcmVOYW1lcy5jb250YWlucyhzdG9yZVNjaGVtYS5zdG9yZSkpIHtcblx0XHRcdFx0Y29uc3Qgb2JqZWN0U3RvcmUgPSBkYXRhYmFzZS5jcmVhdGVPYmplY3RTdG9yZShzdG9yZVNjaGVtYS5zdG9yZSwgc3RvcmVTY2hlbWEuc3RvcmVDb25maWcpO1xuXHRcdFx0XHRzdG9yZVNjaGVtYS5zdG9yZVNjaGVtYS5mb3JFYWNoKChzY2hlbWE6IE9iamVjdFN0b3JlU2NoZW1hKSA9PiB7XG5cdFx0XHRcdFx0b2JqZWN0U3RvcmUuY3JlYXRlSW5kZXgoc2NoZW1hLm5hbWUsIHNjaGVtYS5rZXlwYXRoLCBzY2hlbWEub3B0aW9ucyk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXHRcdH0pO1xuXG5cdFx0Y29uc3Qgc3RvcmVNaWdyYXRpb25zID0gbWlncmF0aW9uRmFjdG9yeSAmJiBtaWdyYXRpb25GYWN0b3J5KCk7XG5cdFx0aWYgKHN0b3JlTWlncmF0aW9ucykge1xuXHRcdFx0T2JqZWN0LmtleXMoc3RvcmVNaWdyYXRpb25zKVxuXHRcdFx0XHQubWFwKGsgPT4gcGFyc2VJbnQoaywgMTApKVxuXHRcdFx0XHQuZmlsdGVyKHYgPT4gdiA+IGV2ZW50Lm9sZFZlcnNpb24pXG5cdFx0XHRcdC5zb3J0KChhLCBiKSA9PiBhIC0gYilcblx0XHRcdFx0LmZvckVhY2godiA9PiB7XG5cdFx0XHRcdFx0c3RvcmVNaWdyYXRpb25zW3ZdKGRhdGFiYXNlLCByZXF1ZXN0LnRyYW5zYWN0aW9uKTtcblx0XHRcdFx0fSk7XG5cdFx0fVxuXG5cdFx0ZGF0YWJhc2UuY2xvc2UoKTtcblx0fTtcblxuXHRyZXF1ZXN0Lm9uc3VjY2VzcyA9IGZ1bmN0aW9uKGU6IGFueSkge1xuXHRcdGUudGFyZ2V0LnJlc3VsdC5jbG9zZSgpO1xuXHR9O1xufVxuXG5leHBvcnQgZW51bSBEQk1vZGUge1xuXHRyZWFkb25seSA9ICdyZWFkb25seScsXG5cdHJlYWR3cml0ZSA9ICdyZWFkd3JpdGUnXG59XG4iXX0=