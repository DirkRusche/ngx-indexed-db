import { Key, ObjectStoreMeta } from './ngx-indexed-db';
import { DBConfig } from './ngx-indexed-db.meta';
export declare class NgxIndexedDBService {
    private dbConfig;
    private platformId;
    private readonly isBrowser;
    indexedDB: any;
    constructor(dbConfig: DBConfig, platformId: any);
    createObjectStore(storeSchema: ObjectStoreMeta, migrationFactory?: () => {
        [key: number]: (db: IDBDatabase, transaction: IDBTransaction) => void;
    }): void;
    add<T>(storeName: string, value: T, key?: any): Promise<number>;
    getByKey<T>(storeName: string, key: any): Promise<any>;
    getByID<T>(storeName: string, id: string | number): Promise<T>;
    getAll<T>(storeName: string): Promise<T[]>;
    update<T>(storeName: string, value: T, key?: any): Promise<any>;
    deleteRecord(storeName: string, key: Key): Promise<any>;
    clear(storeName: string): Promise<any>;
    delete(storeName: string, key: any): Promise<any>;
    deleteDatabase(): Promise<unknown>;
    openCursor(storeName: string, cursorCallback: (event: Event) => void, keyRange?: IDBKeyRange): Promise<void>;
    /**
     * Open a cursor by index filter.
     * @param storeName The name of the store to query.
     * @param indexName The index name to filter.
     * @param keyRange The range value and criteria to apply on the index.
     * @param cursorCallback A callback called when done.
     */
    openCursorByIndex(storeName: string, indexName: string, keyRange: IDBKeyRange, cursorCallback: (event: Event) => void): Promise<void>;
    /**
     * Returns all items by an index.
     * @param storeName The name of the store to query
     * @param indexName The index name to filter
     * @param keyRange  The range value and criteria to apply on the index.
     */
    getAllByIndex<T>(storeName: string, indexName: string, keyRange: IDBKeyRange): Promise<T[]>;
    getByIndex(storeName: string, indexName: string, key: any): Promise<any>;
    count(storeName: string, keyRange?: IDBValidKey | IDBKeyRange): Promise<any>;
}
