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
export function CreateObjectStore(indexedDB, dbName, version, storeSchemas, migrationFactory) {
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
export { DBMode };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWluZGV4ZWQtZGIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtaW5kZXhlZC1kYi8iLCJzb3VyY2VzIjpbImxpYi9uZ3gtaW5kZXhlZC1kYi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLHFDQUlDOzs7SUFIQSxnQ0FBYzs7SUFDZCxzQ0FBNkU7O0lBQzdFLHNDQUFpQzs7Ozs7QUFHbEMsdUNBSUM7OztJQUhBLGlDQUFhOztJQUNiLG9DQUEyQjs7SUFDM0Isb0NBQWlEOzs7OztBQUdsRCxrQ0FHQzs7O0lBRkEsaUNBQWtCOztJQUNsQiw2QkFBYzs7Ozs7O0FBRWYsd0NBRUM7OztJQURBLG9DQUFnQjs7Ozs7O0FBR2pCLGtDQUVDOzs7SUFEQSw4QkFBOEI7Ozs7Ozs7OztBQUcvQixNQUFNLFVBQVUsWUFBWSxDQUFDLFNBQXFCLEVBQUUsTUFBYyxFQUFFLE9BQWUsRUFBRSxlQUEwQjtJQUM5RyxPQUFPLElBQUksT0FBTzs7Ozs7SUFBYyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtRQUNuRCxJQUFJLENBQUMsU0FBUyxFQUFFO1lBQ2YsTUFBTSxDQUFDLHlCQUF5QixDQUFDLENBQUM7U0FDbEM7O2NBQ0ssT0FBTyxHQUFHLFNBQVMsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLE9BQU8sQ0FBQzs7WUFDM0MsRUFBZTtRQUNuQixPQUFPLENBQUMsU0FBUzs7OztRQUFHLENBQUMsS0FBWSxFQUFFLEVBQUU7WUFDcEMsRUFBRSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUM7WUFDcEIsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ2IsQ0FBQyxDQUFBLENBQUM7UUFDRixPQUFPLENBQUMsT0FBTzs7OztRQUFHLENBQUMsS0FBWSxFQUFFLEVBQUU7WUFDbEMsTUFBTSxDQUFDLG9CQUFvQixPQUFPLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQztRQUM3QyxDQUFDLENBQUEsQ0FBQztRQUNGLElBQUksT0FBTyxlQUFlLEtBQUssVUFBVSxFQUFFO1lBQzFDLE9BQU8sQ0FBQyxlQUFlOzs7O1lBQUcsQ0FBQyxLQUFZLEVBQUUsRUFBRTtnQkFDMUMsZUFBZSxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQztZQUM1QixDQUFDLENBQUEsQ0FBQztTQUNGO0lBQ0YsQ0FBQyxFQUFDLENBQUM7QUFDSixDQUFDOzs7Ozs7Ozs7QUFFRCxNQUFNLFVBQVUsaUJBQWlCLENBQ2hDLFNBQXFCLEVBQ3JCLE1BQWMsRUFDZCxPQUFlLEVBQ2YsWUFBK0IsRUFDL0IsZ0JBQWtHO0lBRWxHLElBQUksQ0FBQyxTQUFTLEVBQUU7UUFDZixPQUFPO0tBQ1A7O1VBQ0ssT0FBTyxHQUFxQixTQUFTLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxPQUFPLENBQUM7SUFFakUsT0FBTyxDQUFDLGVBQWU7Ozs7SUFBRyxVQUFTLEtBQTRCOztjQUN4RCxRQUFRLEdBQWdCLENBQUMsbUJBQUEsS0FBSyxDQUFDLE1BQU0sRUFBTyxDQUFDLENBQUMsTUFBTTtRQUUxRCxZQUFZLENBQUMsT0FBTzs7OztRQUFDLENBQUMsV0FBNEIsRUFBRSxFQUFFO1lBQ3JELElBQUksQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsRUFBRTs7c0JBQ3JELFdBQVcsR0FBRyxRQUFRLENBQUMsaUJBQWlCLENBQUMsV0FBVyxDQUFDLEtBQUssRUFBRSxXQUFXLENBQUMsV0FBVyxDQUFDO2dCQUMxRixXQUFXLENBQUMsV0FBVyxDQUFDLE9BQU87Ozs7Z0JBQUMsQ0FBQyxNQUF5QixFQUFFLEVBQUU7b0JBQzdELFdBQVcsQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDdEUsQ0FBQyxFQUFDLENBQUM7YUFDSDtRQUNGLENBQUMsRUFBQyxDQUFDOztjQUVHLGVBQWUsR0FBRyxnQkFBZ0IsSUFBSSxnQkFBZ0IsRUFBRTtRQUM5RCxJQUFJLGVBQWUsRUFBRTtZQUNwQixNQUFNLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQztpQkFDMUIsR0FBRzs7OztZQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBQztpQkFDekIsTUFBTTs7OztZQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxVQUFVLEVBQUM7aUJBQ2pDLElBQUk7Ozs7O1lBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFDO2lCQUNyQixPQUFPOzs7O1lBQUMsQ0FBQyxDQUFDLEVBQUU7Z0JBQ1osZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsRUFBRSxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDbkQsQ0FBQyxFQUFDLENBQUM7U0FDSjtRQUVELFFBQVEsQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUNsQixDQUFDLENBQUEsQ0FBQztJQUVGLE9BQU8sQ0FBQyxTQUFTOzs7O0lBQUcsVUFBUyxDQUFNO1FBQ2xDLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ3pCLENBQUMsQ0FBQSxDQUFDO0FBQ0gsQ0FBQzs7QUFFRCxNQUFZLE1BQU07SUFDakIsUUFBUSxZQUFhO0lBQ3JCLFNBQVMsYUFBYztFQUN2QiIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBpbnRlcmZhY2UgT2JqZWN0U3RvcmVNZXRhIHtcblx0c3RvcmU6IHN0cmluZztcblx0c3RvcmVDb25maWc6IHsga2V5UGF0aDogc3RyaW5nOyBhdXRvSW5jcmVtZW50OiBib29sZWFuOyBba2V5OiBzdHJpbmddOiBhbnkgfTtcblx0c3RvcmVTY2hlbWE6IE9iamVjdFN0b3JlU2NoZW1hW107XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgT2JqZWN0U3RvcmVTY2hlbWEge1xuXHRuYW1lOiBzdHJpbmc7XG5cdGtleXBhdGg6IHN0cmluZyB8IHN0cmluZ1tdO1xuXHRvcHRpb25zOiB7IHVuaXF1ZTogYm9vbGVhbjsgW2tleTogc3RyaW5nXTogYW55IH07XG59XG5leHBvcnQgdHlwZSBLZXkgPSBzdHJpbmcgfCBudW1iZXIgfCBEYXRlIHwgQXJyYXlCdWZmZXJWaWV3IHwgQXJyYXlCdWZmZXIgfCBJREJBcnJheUtleSB8IElEQktleVJhbmdlO1xuZXhwb3J0IGludGVyZmFjZSBJbmRleERldGFpbHMge1xuXHRpbmRleE5hbWU6IHN0cmluZztcblx0b3JkZXI6IHN0cmluZztcbn1cbmV4cG9ydCBpbnRlcmZhY2UgUmVxdWVzdEV2ZW50VGFyZ2V0PFQ+IGV4dGVuZHMgRXZlbnRUYXJnZXQge1xuXHRyZXN1bHQ6IFQgfCBUW107XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUmVxdWVzdEV2ZW50PFQ+IGV4dGVuZHMgRXZlbnQge1xuXHR0YXJnZXQ6IFJlcXVlc3RFdmVudFRhcmdldDxUPjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG9wZW5EYXRhYmFzZShpbmRleGVkREI6IElEQkZhY3RvcnksIGRiTmFtZTogc3RyaW5nLCB2ZXJzaW9uOiBudW1iZXIsIHVwZ3JhZGVDYWxsYmFjaz86IEZ1bmN0aW9uKSB7XG5cdHJldHVybiBuZXcgUHJvbWlzZTxJREJEYXRhYmFzZT4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXHRcdGlmICghaW5kZXhlZERCKSB7XG5cdFx0XHRyZWplY3QoJ0luZGV4ZWREQiBub3QgYXZhaWxhYmxlJyk7XG5cdFx0fVxuXHRcdGNvbnN0IHJlcXVlc3QgPSBpbmRleGVkREIub3BlbihkYk5hbWUsIHZlcnNpb24pO1xuXHRcdGxldCBkYjogSURCRGF0YWJhc2U7XG5cdFx0cmVxdWVzdC5vbnN1Y2Nlc3MgPSAoZXZlbnQ6IEV2ZW50KSA9PiB7XG5cdFx0XHRkYiA9IHJlcXVlc3QucmVzdWx0O1xuXHRcdFx0cmVzb2x2ZShkYik7XG5cdFx0fTtcblx0XHRyZXF1ZXN0Lm9uZXJyb3IgPSAoZXZlbnQ6IEV2ZW50KSA9PiB7XG5cdFx0XHRyZWplY3QoYEluZGV4ZWREQiBlcnJvcjogJHtyZXF1ZXN0LmVycm9yfWApO1xuXHRcdH07XG5cdFx0aWYgKHR5cGVvZiB1cGdyYWRlQ2FsbGJhY2sgPT09ICdmdW5jdGlvbicpIHtcblx0XHRcdHJlcXVlc3Qub251cGdyYWRlbmVlZGVkID0gKGV2ZW50OiBFdmVudCkgPT4ge1xuXHRcdFx0XHR1cGdyYWRlQ2FsbGJhY2soZXZlbnQsIGRiKTtcblx0XHRcdH07XG5cdFx0fVxuXHR9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIENyZWF0ZU9iamVjdFN0b3JlKFxuXHRpbmRleGVkREI6IElEQkZhY3RvcnksXG5cdGRiTmFtZTogc3RyaW5nLFxuXHR2ZXJzaW9uOiBudW1iZXIsXG5cdHN0b3JlU2NoZW1hczogT2JqZWN0U3RvcmVNZXRhW10sXG5cdG1pZ3JhdGlvbkZhY3Rvcnk/OiAoKSA9PiB7IFtrZXk6IG51bWJlcl06IChkYjogSURCRGF0YWJhc2UsIHRyYW5zYWN0aW9uOiBJREJUcmFuc2FjdGlvbikgPT4gdm9pZCB9XG4pIHtcblx0aWYgKCFpbmRleGVkREIpIHtcblx0XHRyZXR1cm47XG5cdH1cblx0Y29uc3QgcmVxdWVzdDogSURCT3BlbkRCUmVxdWVzdCA9IGluZGV4ZWREQi5vcGVuKGRiTmFtZSwgdmVyc2lvbik7XG5cblx0cmVxdWVzdC5vbnVwZ3JhZGVuZWVkZWQgPSBmdW5jdGlvbihldmVudDogSURCVmVyc2lvbkNoYW5nZUV2ZW50KSB7XG5cdFx0Y29uc3QgZGF0YWJhc2U6IElEQkRhdGFiYXNlID0gKGV2ZW50LnRhcmdldCBhcyBhbnkpLnJlc3VsdDtcblxuXHRcdHN0b3JlU2NoZW1hcy5mb3JFYWNoKChzdG9yZVNjaGVtYTogT2JqZWN0U3RvcmVNZXRhKSA9PiB7XG5cdFx0XHRpZiAoIWRhdGFiYXNlLm9iamVjdFN0b3JlTmFtZXMuY29udGFpbnMoc3RvcmVTY2hlbWEuc3RvcmUpKSB7XG5cdFx0XHRcdGNvbnN0IG9iamVjdFN0b3JlID0gZGF0YWJhc2UuY3JlYXRlT2JqZWN0U3RvcmUoc3RvcmVTY2hlbWEuc3RvcmUsIHN0b3JlU2NoZW1hLnN0b3JlQ29uZmlnKTtcblx0XHRcdFx0c3RvcmVTY2hlbWEuc3RvcmVTY2hlbWEuZm9yRWFjaCgoc2NoZW1hOiBPYmplY3RTdG9yZVNjaGVtYSkgPT4ge1xuXHRcdFx0XHRcdG9iamVjdFN0b3JlLmNyZWF0ZUluZGV4KHNjaGVtYS5uYW1lLCBzY2hlbWEua2V5cGF0aCwgc2NoZW1hLm9wdGlvbnMpO1xuXHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHR9KTtcblxuXHRcdGNvbnN0IHN0b3JlTWlncmF0aW9ucyA9IG1pZ3JhdGlvbkZhY3RvcnkgJiYgbWlncmF0aW9uRmFjdG9yeSgpO1xuXHRcdGlmIChzdG9yZU1pZ3JhdGlvbnMpIHtcblx0XHRcdE9iamVjdC5rZXlzKHN0b3JlTWlncmF0aW9ucylcblx0XHRcdFx0Lm1hcChrID0+IHBhcnNlSW50KGssIDEwKSlcblx0XHRcdFx0LmZpbHRlcih2ID0+IHYgPiBldmVudC5vbGRWZXJzaW9uKVxuXHRcdFx0XHQuc29ydCgoYSwgYikgPT4gYSAtIGIpXG5cdFx0XHRcdC5mb3JFYWNoKHYgPT4ge1xuXHRcdFx0XHRcdHN0b3JlTWlncmF0aW9uc1t2XShkYXRhYmFzZSwgcmVxdWVzdC50cmFuc2FjdGlvbik7XG5cdFx0XHRcdH0pO1xuXHRcdH1cblxuXHRcdGRhdGFiYXNlLmNsb3NlKCk7XG5cdH07XG5cblx0cmVxdWVzdC5vbnN1Y2Nlc3MgPSBmdW5jdGlvbihlOiBhbnkpIHtcblx0XHRlLnRhcmdldC5yZXN1bHQuY2xvc2UoKTtcblx0fTtcbn1cblxuZXhwb3J0IGVudW0gREJNb2RlIHtcblx0cmVhZG9ubHkgPSAncmVhZG9ubHknLFxuXHRyZWFkd3JpdGUgPSAncmVhZHdyaXRlJ1xufVxuIl19