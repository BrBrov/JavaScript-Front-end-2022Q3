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
        readonly status: string;
        sources: Array<DynamicObject>;
    }
    interface ModifyData {
        readonly status: string;
        totalResults: number;
        articles: Array<NewsData>;
    }

    interface SourceInNews {
        id: string;
        name: string;
    }

    interface NewsData {
        [key: string]: string;
        source: SourceInNews;
    }
}
