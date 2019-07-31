import React, { Component } from 'react';
import { Container, Header, Divider, Segment, Form, Button, Icon } from 'semantic-ui-react';

class Balance extends Component {
    constructor(props) {
        super(props);
        this.state = { balance: 0, loading: false, owner: '', renders: false };
    }

    componentDidMount() {
        if (!this.props.contract) {
            return;
        }
    }

    getStore = async id => {
        let owner;
        this.props.contract.methods
            .getStore(id)
            .call()
            .then(store => {
                owner = store[1]; 
            })
            .catch(e => {
                console.error(e);
            })
            .finally(() => {
                this.setState({ owner });
                if (this.props.accounts[0] === this.state.owner)
                    this.getBalance(this.props.storeId);
                else
                    console.log('Not Store Owner');
            })
    }

    getBalance = id => {
        if (!this.props.contract) {
            return;
        }
        let balance = 0;
        this.props.contract.methods
            .getBalance(this.props.storeId)
            .call()
            .then(total => {
                balance = total;
            })
            .catch(e => {
                console.error(e);
            })
            .finally(() => {
                this.setState({ balance, renders: true });
            })
    
    }

    withdrawBalance = () => {
        console.log(this.state.balance);
        if(this.state.balance > 0) {
            this.props.contract.methods
            .withdrawBalance(this.props.storeId, this.state.balance)
            .send({ from: this.props.accounts[0] })
            .catch(e => {
                console.error(e);
            })
            .finally(() => {
                console.log("Withdraw Successful!!!");
                this.getBalance();
            })
        }
        
    }

    renderWithdraw = () => {
        if (this.state.renders) {
            return (
                <Segment>
                    <Form>
                        <Button 
                            fluid
                            color='red'
                            onClick={this.withdrawBalance}
                            loading={this.state.loading}
                        >
                            Withdraw
                        </Button>
                    </Form>
                </Segment>
            );
        }
    }

    render () {
        return (
            <Container>
                <Header as='h1'>Welcome to the Store Balance</Header>
                <Divider clearing />
                <Segment>
                    <Header as='h2' floated='left'>
                        Current Balance Available:
                    </Header>
                    <Header as='h2' floated='right' color='blue'>
                        {this.state.balance} <Icon name='ethereum' />
                    </Header>
                    <Divider clearing />
                    {this.renderWithdraw()}
                </Segment>
                
                

                
            </Container>
        )
    }
}

export default Balance;