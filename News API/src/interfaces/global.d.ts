export {};

declare global {
    //callback type
    type Callback = <T>(data?: T) => T | void;

    interface DynamicObject {
        [key: string]: string | number | DynamicObject;
    }
    // loader interfaces
    type Urls = Record<string, string>;

    interface Endpoint {
        endpoint: string;
        options?: object;
    }
    //response data
    interface ResponseData {
        status: string;
        source: Array<DynamicObject>;
    }
}
