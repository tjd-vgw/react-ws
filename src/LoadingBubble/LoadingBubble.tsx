import * as React from 'react';
import './LoadingBubble.css';

interface LoadingProps {
    displayInline?: boolean;
    small?: boolean;
    newUi?: boolean;
}

export class LoadingBubble extends React.Component<LoadingProps> {
    render() {
        const spinnerStyle = this.props.small ? 'spinner-small' : 'spinner';
        const newUiStyle = this.props.newUi && this.props.small ? 'balance-loading-bubble' : '';
        let loaderStyle = 'lobby-loading loading-action loading-text';
        if (this.props.displayInline) {
            loaderStyle += ' loading-display-inline';
        }
        return (
            <div className={loaderStyle}>
                <div className={`${spinnerStyle} ${newUiStyle}`}>
                    <div className='bounce1'/>
                    <div className='bounce2'/>
                    <div className='bounce3'/>
                </div>
            </div>
        );
    }
}
