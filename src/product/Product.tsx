import * as React from "react";

import './Product.css';
import {BuyProductResponse, PlayerApi, ProductDTO} from "../StubPlayerApi";
import {LoadingBubble} from "../LoadingBubble/LoadingBubble";

interface Props {
    product: ProductDTO;
}

interface State {
    loading: boolean;
}

export class Product extends React.Component<Props, State> {
    constructor({props}: { props: any }) {
        super(props);
        this.buyNow = this.buyNow.bind(this);
        this.state = {loading: false};
    }


    buyNow(): void {
        this.setState({loading: true});
        PlayerApi.buyProduct( (response: BuyProductResponse) => {
            if (response.status === "OK") {
                alert("Product bought!");
            }
            this.setState({loading: false});
        })
    }

    getBuyNowButton(): JSX.Element {
        return this.state.loading
            ? <LoadingBubble/>
            : (
                <div className={`button purchase-button`}
                     onClick={this.buyNow}>
                    {"Buy now"}
                </div>
            );
    }

    render() {
        const p = this.props.product;
        const imageStyles = {backgroundImage: "url(" + p.image + ")"};
        const categoryClass = "";

        return (
            <div className={`main-product-container skin__cell`}>
                <div className={`product-container skin__product`}>
                    <div className={`product-image ${categoryClass}`} style={imageStyles}/>
                    <div>{p.name}</div>
                    <div className={"buy-container"}>
                        <div className={`price`}>{`SC ${p.price}`}</div>
                        <div className={"action-buttons"}>
                            {this.getBuyNowButton()}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
