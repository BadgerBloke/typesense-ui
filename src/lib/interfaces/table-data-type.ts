export interface SynonymsDataType {
    id: string;
    root?: string;
    synonyms: string[];
    locale?: string;
    symbols_to_index?: string[];
}

export interface OverridesDataType {
    id: string;
    root?: string;
    locale?: string;
    symbols_to_index?: string[];
}

export interface DocumentsDataType {
    document: {
        id: string;
        price: string | number;
        product_id: string;
        product_name: string;
        shop_id: string;
        shop_name: string;
    };
}
