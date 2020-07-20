export interface ObjectStoreMeta {
    store: string;
    storeConfig: {
        keyPath: string;
        autoIncrement: boolean;
        [key: string]: any;
    };
    storeSchema: ObjectStoreSchema[];
}
export interface ObjectStoreSchema {
    name: string;
    keypath: string | string[];
    options: {
        unique: boolean;
        [key: string]: any;
    };
}
export declare type Key = string | number | Date | ArrayBufferView | ArrayBuffer | IDBArrayKey | IDBKeyRange;
export interface IndexDetails {
    indexName: string;
    order: string;
}
export interface RequestEventTarget<T> extends EventTarget {
    result: T | T[];
}
export interface RequestEvent<T> extends Event {
    target: RequestEventTarget<T>;
}
export declare function openDatabase(indexedDB: IDBFactory, dbName: string, version: number, upgradeCallback?: Function): Promise<IDBDatabase>;
export declare function CreateObjectStore(indexedDB: IDBFactory, dbName: string, version: number, storeSchemas: ObjectStoreMeta[], migrationFactory?: () => {
    [key: number]: (db: IDBDatabase, transaction: IDBTransaction) => void;
}): void;
export declare enum DBMode {
    readonly = "readonly",
    readwrite = "readwrite"
}
