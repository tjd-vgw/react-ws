import {MOCK_DATA} from "./MockData";

export interface ProductList {
    products?: ProductDTO[];
}

export interface BuyProductResponse {
    status?: BuyStatus;
}

export interface ProductDTO {
    productId?: string;
    price?: number;
    currencyCode?: string;
    name?: string;
    description?: string;
    image?: string;
    itemCategory?: string;
    category?: string;
}

export const PlayerApi = new class {
    requestProducts(onSuccess: SuccessCallback<ProductList>): Promise<void> {
        return this.mockFetchProducts().then(onSuccess)
    }
    buyProduct(onSuccess: SuccessCallback<BuyProductResponse>): Promise<void> {
        return this.mockBuyProduct().then(onSuccess)
    }
    private async mockFetchProducts(): Promise<ProductList> {
        return new Promise((res, rej) => setTimeout(() => res(MOCK_DATA), 1000));
    }
    private async mockBuyProduct(): Promise<BuyProductResponse> {
        return new Promise((res, rej) => setTimeout(() => res({ status: "OK" }), 1000));
    }
}

export type BuyStatus = "OK" | "NOT_ENOUGH_FUNDS" | "WALLET_ERROR" | "ITEM_ALREADY_EXIST";
type SuccessCallback<T> = (response: T) => void;
