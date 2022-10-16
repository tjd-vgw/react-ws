import * as React from 'react';

import './product/Product.css';
import './Store.css';
import { PlayerApi, ProductDTO } from "./StubPlayerApi";
import {Product} from "./product/Product";
import {LoadingBubble} from "./LoadingBubble/LoadingBubble";
import {PokerMap} from "./Map";

const NO_CATEGORY = 'Uncategorized';

interface State {
    products: ProductDTO[];
    loading: boolean;
}

export class Store extends React.Component<{}, State> {
    state: State = {
        loading: true,
        products: [],
    };

    private _isMounted = false;

    componentDidMount(): void {
        this._isMounted = true;
        PlayerApi.requestProducts(({products}) => {
            if (products === undefined) return;

            if (this._isMounted) {
                this.setState({products, loading: false});
            }
        });
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    getMapProducts(): PokerMap<JSX.Element[]> {
        const categoryMap = new PokerMap<JSX.Element[]>();

        this.state.products.forEach(p => {
            const category = p.category || NO_CATEGORY;
            const products = categoryMap.get(category) || [];
            products.push(<Product product={p} key={p.productId}/>);
            categoryMap.put(category, products);
        });

        return categoryMap;
    }

    getHeader(name: string): JSX.Element {
        return (name !== NO_CATEGORY
                ? <div className={`category-header`}>{name}</div>
                : undefined
        ) as JSX.Element;
    }

    getProducts(): JSX.Element[] {
        if (!this.state.products.length) return [];

        const categories = this.getMapProducts();
        const keys = categories.keys();
        keys.sort();

        return keys.map(key => {
            return (
                <div className={`category-container`} key={key}>
                    {this.getHeader(key)}
                    <div className={`container`}>
                        {categories.get(key)}
                    </div>
                </div>
            );
        });
    }

    render() {
        return (
            <div className={`main-grid`}>
                {this.state.loading ? <LoadingBubble /> : this.getProducts()}
            </div>
        );
    }
}
