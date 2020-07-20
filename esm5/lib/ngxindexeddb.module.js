/**
 * @fileoverview added by tsickle
 * Generated from: lib/ngxindexeddb.module.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxIndexedDBService } from './ngx-indexed-db.service';
import { CONFIG_TOKEN } from './ngx-indexed-db.meta';
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
export { NgxIndexedDBModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4aW5kZXhlZGRiLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1pbmRleGVkLWRiLyIsInNvdXJjZXMiOlsibGliL25neGluZGV4ZWRkYi5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUF1QyxNQUFNLGVBQWUsQ0FBQztBQUM5RSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDL0QsT0FBTyxFQUFZLFlBQVksRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBRS9EO0lBQUE7SUFXQSxDQUFDOzs7OztJQU5PLDBCQUFPOzs7O0lBQWQsVUFBZSxRQUFrQjtRQUNoQyxPQUFPO1lBQ04sUUFBUSxFQUFFLGtCQUFrQjtZQUM1QixTQUFTLEVBQUUsQ0FBQyxtQkFBbUIsRUFBRSxFQUFFLE9BQU8sRUFBRSxZQUFZLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxDQUFDO1NBQy9FLENBQUM7SUFDSCxDQUFDOztnQkFWRCxRQUFRLFNBQUM7b0JBQ1QsWUFBWSxFQUFFLEVBQUU7b0JBQ2hCLE9BQU8sRUFBRSxDQUFDLFlBQVksQ0FBQztpQkFDdkI7O0lBUUQseUJBQUM7Q0FBQSxBQVhELElBV0M7U0FQWSxrQkFBa0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSwgTW9kdWxlV2l0aFByb3ZpZGVycywgSW5qZWN0aW9uVG9rZW4gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ3hJbmRleGVkREJTZXJ2aWNlIH0gZnJvbSAnLi9uZ3gtaW5kZXhlZC1kYi5zZXJ2aWNlJztcbmltcG9ydCB7IERCQ29uZmlnLCBDT05GSUdfVE9LRU4gfSBmcm9tICcuL25neC1pbmRleGVkLWRiLm1ldGEnO1xuXG5ATmdNb2R1bGUoe1xuXHRkZWNsYXJhdGlvbnM6IFtdLFxuXHRpbXBvcnRzOiBbQ29tbW9uTW9kdWxlXVxufSlcbmV4cG9ydCBjbGFzcyBOZ3hJbmRleGVkREJNb2R1bGUge1xuXHRzdGF0aWMgZm9yUm9vdChkYkNvbmZpZzogREJDb25maWcpOiBNb2R1bGVXaXRoUHJvdmlkZXJzPE5neEluZGV4ZWREQk1vZHVsZT4ge1xuXHRcdHJldHVybiB7XG5cdFx0XHRuZ01vZHVsZTogTmd4SW5kZXhlZERCTW9kdWxlLFxuXHRcdFx0cHJvdmlkZXJzOiBbTmd4SW5kZXhlZERCU2VydmljZSwgeyBwcm92aWRlOiBDT05GSUdfVE9LRU4sIHVzZVZhbHVlOiBkYkNvbmZpZyB9XVxuXHRcdH07XG5cdH1cbn1cbiJdfQ==