/**
 * @fileoverview added by tsickle
 * Generated from: utils/index.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 */
export function Options() { }
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
export function validateStoreName(db, storeName) {
    return db.objectStoreNames.contains(storeName);
}
/**
 * @param {?} db
 * @param {?} storeName
 * @param {?} reject
 * @return {?}
 */
export function validateBeforeTransaction(db, storeName, reject) {
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
export function createTransaction(db, options) {
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
export function optionsGenerator(type, storeName, reject, resolve) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtaW5kZXhlZC1kYi8iLCJzb3VyY2VzIjpbInV0aWxzL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUEsNkJBTUM7OztJQUxBLDRCQUFrQjs7SUFDbEIseUJBQTJCOztJQUMzQix3QkFBeUI7O0lBQ3pCLDJCQUE0Qjs7SUFDNUIsd0JBQVk7Ozs7Ozs7QUFHYixNQUFNLFVBQVUsaUJBQWlCLENBQUMsRUFBZSxFQUFFLFNBQWlCO0lBQ25FLE9BQU8sRUFBRSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUNoRCxDQUFDOzs7Ozs7O0FBRUQsTUFBTSxVQUFVLHlCQUF5QixDQUFDLEVBQWUsRUFBRSxTQUFpQixFQUFFLE1BQWdCO0lBQzdGLElBQUksQ0FBQyxFQUFFLEVBQUU7UUFDUixNQUFNLENBQUMscUZBQXFGLENBQUMsQ0FBQztLQUM5RjtJQUNELElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxFQUFFLEVBQUUsU0FBUyxDQUFDLEVBQUU7UUFDdEMsTUFBTSxDQUFDLGdDQUFnQyxTQUFTLEVBQUUsQ0FBQyxDQUFDO0tBQ3BEO0FBQ0YsQ0FBQzs7Ozs7O0FBRUQsTUFBTSxVQUFVLGlCQUFpQixDQUFDLEVBQWUsRUFBRSxPQUFnQjs7UUFDOUQsS0FBSyxHQUFtQixFQUFFLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsT0FBTyxDQUFDLE1BQU0sQ0FBQztJQUM3RSxLQUFLLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUM7SUFDOUIsS0FBSyxDQUFDLFVBQVUsR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDO0lBQ3BDLEtBQUssQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQztJQUM5QixPQUFPLEtBQUssQ0FBQztBQUNkLENBQUM7Ozs7Ozs7O0FBRUQsTUFBTSxVQUFVLGdCQUFnQixDQUFDLElBQVMsRUFBRSxTQUFjLEVBQUUsTUFBZ0IsRUFBRSxPQUFpQjtJQUM5RixPQUFPO1FBQ04sU0FBUyxFQUFFLFNBQVM7UUFDcEIsTUFBTSxFQUFFLElBQUk7UUFDWixLQUFLOzs7O1FBQUUsQ0FBQyxDQUFRLEVBQUUsRUFBRTtZQUNuQixNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDWCxDQUFDLENBQUE7UUFDRCxRQUFROzs7O1FBQUUsQ0FBQyxDQUFRLEVBQUUsRUFBRTtZQUN0QixPQUFPLEVBQUUsQ0FBQztRQUNYLENBQUMsQ0FBQTtRQUNELEtBQUs7Ozs7UUFBRSxDQUFDLENBQVEsRUFBRSxFQUFFO1lBQ25CLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNYLENBQUMsQ0FBQTtLQUNELENBQUM7QUFDSCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGludGVyZmFjZSBPcHRpb25zIHtcblx0c3RvcmVOYW1lOiBzdHJpbmc7XG5cdGRiTW9kZTogSURCVHJhbnNhY3Rpb25Nb2RlO1xuXHRlcnJvcjogKGU6IEV2ZW50KSA9PiBhbnk7XG5cdGNvbXBsZXRlOiAoZTogRXZlbnQpID0+IGFueTtcblx0YWJvcnQ/OiBhbnk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB2YWxpZGF0ZVN0b3JlTmFtZShkYjogSURCRGF0YWJhc2UsIHN0b3JlTmFtZTogc3RyaW5nKSB7XG5cdHJldHVybiBkYi5vYmplY3RTdG9yZU5hbWVzLmNvbnRhaW5zKHN0b3JlTmFtZSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB2YWxpZGF0ZUJlZm9yZVRyYW5zYWN0aW9uKGRiOiBJREJEYXRhYmFzZSwgc3RvcmVOYW1lOiBzdHJpbmcsIHJlamVjdDogRnVuY3Rpb24pIHtcblx0aWYgKCFkYikge1xuXHRcdHJlamVjdCgnWW91IG5lZWQgdG8gdXNlIHRoZSBvcGVuRGF0YWJhc2UgZnVuY3Rpb24gdG8gY3JlYXRlIGEgZGF0YWJhc2UgYmVmb3JlIHlvdSBxdWVyeSBpdCEnKTtcblx0fVxuXHRpZiAoIXZhbGlkYXRlU3RvcmVOYW1lKGRiLCBzdG9yZU5hbWUpKSB7XG5cdFx0cmVqZWN0KGBvYmplY3RTdG9yZSBkb2VzIG5vdCBleGlzdHM6ICR7c3RvcmVOYW1lfWApO1xuXHR9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVUcmFuc2FjdGlvbihkYjogSURCRGF0YWJhc2UsIG9wdGlvbnM6IE9wdGlvbnMpOiBJREJUcmFuc2FjdGlvbiB7XG5cdGxldCB0cmFuczogSURCVHJhbnNhY3Rpb24gPSBkYi50cmFuc2FjdGlvbihvcHRpb25zLnN0b3JlTmFtZSwgb3B0aW9ucy5kYk1vZGUpO1xuXHR0cmFucy5vbmVycm9yID0gb3B0aW9ucy5lcnJvcjtcblx0dHJhbnMub25jb21wbGV0ZSA9IG9wdGlvbnMuY29tcGxldGU7XG5cdHRyYW5zLm9uYWJvcnQgPSBvcHRpb25zLmFib3J0O1xuXHRyZXR1cm4gdHJhbnM7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBvcHRpb25zR2VuZXJhdG9yKHR5cGU6IGFueSwgc3RvcmVOYW1lOiBhbnksIHJlamVjdDogRnVuY3Rpb24sIHJlc29sdmU6IEZ1bmN0aW9uKTogT3B0aW9ucyB7XG5cdHJldHVybiB7XG5cdFx0c3RvcmVOYW1lOiBzdG9yZU5hbWUsXG5cdFx0ZGJNb2RlOiB0eXBlLFxuXHRcdGVycm9yOiAoZTogRXZlbnQpID0+IHtcblx0XHRcdHJlamVjdChlKTtcblx0XHR9LFxuXHRcdGNvbXBsZXRlOiAoZTogRXZlbnQpID0+IHtcblx0XHRcdHJlc29sdmUoKTtcblx0XHR9LFxuXHRcdGFib3J0OiAoZTogRXZlbnQpID0+IHtcblx0XHRcdHJlamVjdChlKTtcblx0XHR9XG5cdH07XG59XG4iXX0=