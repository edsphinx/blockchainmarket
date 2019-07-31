import React, { Component } from "react";
import { Container, Header, Divider, Segment, Form, Button, Card } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            value: '',
            loading: false,
            total: 0,
            stores: [],
            storesDet: [],
            src:'/img/image.png'
        };
    }

    componentDidMount() {
        this.getStores();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.contract) {
            this.getStores();
        }
    }

    handleSubmit = async e =>{
        e.preventDefault();
        
        this.setState({ loading: true });
        const { accounts, contract } = this.props;

        let value = this.state.value;
        
        await contract.methods
        .newStore(value, accounts[0], 0)
        .send({ from: accounts[0] },() => {

        });

        this.setState({ loading: false, value: '' });
        this.getStores();
    }

    handleChange = e => {
        this.setState({ value: e.target.value });
    }

    getStores = async () => {
        if (!this.props.contract) {
            return;
        }
        let stoObj = {}, stoDet = {};

        this.props.contract.methods
        .getStoreTotal()
        .call()
        .then(total => {
            if(total > this.state.total){
                this.setState({ total });
                for (let i = total - 1; i >= 0; i--) {
                    this.props.contract.methods
                    .getStore(i)
                    .call()
                    .then(store => {
                        stoObj[i] = store[0];
                        stoDet[i] = {
                            id: i,
                            name: store[0],
                            owner: store[1],
                            items: store[2]
                        };
                    })
                    .catch(console.error)
                    .finally(() => {
                        let stores = [], storesDet = [];
                        for (let i = total - 1; i >= 0; i--) {
                            if (i in stoObj)
                                stores.push(stoObj[i]);
                            if(i in stoDet)
                                storesDet.push(stoDet[i]);
                        }
                        this.setState({ stores, storesDet });
                    });
                }
            }
        })
        .catch(console.error);
    }

    renderStores = () => {
        
        if (!this.props.contract) {
            return;
        }
        
        if(this.state.total > 0 && this.state.storesDet.length == this.state.total){
            return (
                <Card.Group> 
                    {this.state.storesDet.map((card) => (
                        <div className="ui raised card" key={card.id}>
                            <Link to={`/stores/${card.id}`}>
                                <Card
                                    key={card.id} // Make sure you use a unique key identifier for React
                                    image={this.state.src} // This is the url of the image for the current object inside this.state.news.YOUR_CURRENT_OBJECT
                                    header={card.name}
                                    meta={card.owner.slice(0, 6)+'...'+card.owner.slice(38, 42) }
                                    description="Store"
                                />
                            </Link>
                        </div>
                        ))
                    }
                </Card.Group>
            );
        } 
    }

    renderForm = () => {
        if (!this.props.contract) {
            return;
        }
        
        return (
            <Segment>
                <Header as='h2' floated='right'>
                Create New Store
                </Header>
                <Form>
                    <Form.Input 
                        label='Name' 
                        placeholder='Please Enter Store Name Here'
                        onChange={this.handleChange}
                        value={this.state.value}
                    />
                    <Button 
                        onClick={this.handleSubmit}
                        loading={this.state.load}
                    >
                        Create
                    </Button>
                </Form>
            </Segment>
        );
    }

    render() {
        return (
            <Container>
                <Header as='h1'>Welcome to Decentralized Blockchain Market</Header>
                
                    {this.renderForm()}
                
                <Segment>
                <Divider clearing />
                    {this.renderStores()}
                </Segment>
            </Container>
        );
    }
}

export default Home;