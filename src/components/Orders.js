import React, { Component } from 'react';

class Orders extends Component {

    constructor(props) {
        super(props);
        this.state = { loading: false, items: [] };
    }

    componentDidMount = () => {
        if (!this.props.contract) {
            return;
        }
        this.getOrders();
    }

    componentDidUpdate(prevProps) {
        if (!prevProps.contract) {
            this.getOrders();
        }
    }

    getOrders = async () => {
        if(this.props.accounts !== null) {
            if(this.props.accounts[0]) {
                if (!this.props.contract) {
                    return;
                }
                console.log(this.props.accounts[0]);
            }
        }
    }

    render() {
        return (
            <div>
                I Got Headache!!!
            </div>
        );
    }
}

export default Orders;