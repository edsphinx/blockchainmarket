import React, { Component } from 'react';
import { Container, Segment, Form, Button, Divider, Header, Card, Image, Icon } from 'semantic-ui-react';
import ipfsClient from 'ipfs-http-client';

const placeholder = '/img/image.png';
const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: '5001', protocol: 'https' });

class StoreDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            owner: '',
            name: '',
            balance: 0,
            totalItems: 0,
            price: '',
            quantity: '',
            items: [],
            image: '',
            loading: false,
            buying: false,
            newItem: '',
            newPrice: 0,
            newSku: 0,
            newImage: null
        }
    }

    componentDidMount = () => {
        if (!this.props.contract) {
            return;
        }
        this.getStore(this.props.storeId);
    }

    componentDidUpdate = prevProps => {
        if (!prevProps.contract) {
            this.getStore(this.props.storeId);
        }
    }

    getStore = async id => {
        let name, owner, totalItems;
        this.props.contract.methods
            .getStore(id)
            .call()
            .then(store => {
                name = store[0];
                owner = store[1]; 
                totalItems = store[2];
            })
            .catch(e => {
                console.error(e);
            })
            .finally(() => {
                this.setState({ name, owner, totalItems });
                this.getItems(id);
                if (this.props.accounts[0] === this.state.owner)
                    this.getBalance(this.props.storeId);
                else
                    console.log('Not Store Owner');
            })
    }

    getBalance = id => {
        let balance;
        this.props.contract.methods
            .getBalance(id)
            .call()
            .then(total => {
                balance = total;
            })
            .catch(e => {
                console.error(e);
            })
            .finally(() => {
                this.setState({ balance });
            })
    }

    

    newItem = async () => {
        this.setState({ loading: true, visible: false });
        
        const { contract, accounts, storeId } = this.props;

        await ipfs.add(this.state.newImage, (err, res) => {
            if (err) {
                console.log(err);
                return;
            }
            let image = res[0].hash;
            this.setState({ image });
            const { newItem, newPrice, newSku } = this.state;
            contract.methods
                .newItem(newItem, newPrice, newSku, storeId, image )
                .send({ from: accounts[0] })
                .then(() => {
                    this.setState({ loading: false, newItem: '', newPrice: 0, newSku: 0, newImage: null, image: '' });
                })
                .catch(console.error)
                .finally(() => {
                    this.getItems();
                    console.log("Item added");
                })
        })

    }

    purchaseItem = async (itemId, price, storeId) => {
        this.setState({ buying: true });

        await this.props.contract.methods
            .purchaseItem(itemId, 1, storeId)
            .send({ from: this.props.accounts[0], value: price })
            .catch(e => {
                console.error(e);
            })
            .finally(() => {
                this.setState({ buying: false });
                this.getItems();
            })
    }

    getItems = () => {
        if (!this.props.contract) {
            return;
        }
        let storeId = this.props.storeId;
        let tmpItems = [];
        let items = [];
        this.props.contract.methods
            .getStoreTotalItems(storeId)
            .call()
            .then(total => {
                for (let i = total - 1; i >= 0; i-- ) {
                    this.props.contract.methods
                        .getItem(i, storeId)
                        .call()
                        .then(item => {
                            tmpItems[i] = {
                                id: i,
                                name: item[0],
                                sku: item[1],
                                price: item[2],
                                image: item[3] === "" ? placeholder : item[3]
                            };
                        })
                        .catch(e => {
                            console.error(e);
                        })
                        .finally(() => {
                            items.push(tmpItems[i]);
                            this.setState({ items });
                        });
                }
            })
            .catch(e => {
                console.error(e);
            });
        
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
                this.getBalance(this.props.storeId);
            })
        }
        
    }

    handleNameChange = e => {
        this.setState({ newItem: e.target.value });
    }

    handlePriceChange = e => {
        this.setState({ newPrice: e.target.value });
    }

    handleSkuChange = e => {
        this.setState({ newSku: e.target.value });
    }

    handleImage = e => {
        e.stopPropagation();
        e.preventDefault();
        const image = e.target.files[0];
        const reader = new window.FileReader();
        reader.readAsArrayBuffer(image);
        reader.onloadend = () => {
            this.setState({ newImage: Buffer(reader.result) });
        };
    }

    saveToIpfs = file => {
        let ipfsId;
        ipfs.add([...file], {progress: prog => console.log(`received: ${prog}`) })
            .then(res => {
                ipfsId = res[0].hash;
                this.setState({ image: ipfsId });
            })
            .catch(e => {
                console.error(e);
            })
    }

    renderItem = () => {
        return (
            <div>items</div>
        );
    }

    handleSubmit = e =>{
        e.preventDefault();
        
        this.setState({ loading: true });
        
        this.newItem();
    }

    renderItem = item => {
        if(item.sku > 0){
            return (
                <Card className='ui raised card' key={item.id}>
                    <Image className="image" src={`https://ipfs.io/ipfs/${item.image}`} wrapped ui={false} />
                    <Card.Content className='content'>
                        <Card.Header>{`Product: ${item.name}`}</Card.Header>
                        <Card.Meta>{item.sku > 0 ? "Available Item" : "Unavailable Item"}</Card.Meta>
                        <Card.Description>
                            {`SKU: ${item.sku}`}
                        </Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                        <Icon name='ethereum' />
                        {`Price: ${item.price} ETH`}
                        <Button className='ui primary button right floated'
                                loading={this.state.buying}
                                disabled={item.sku == 0}
                                onClick={() => this.purchaseItem(item.id, item.price, this.props.storeId)}

                        >
                            <Icon name='shop' />
                            Buy Now
                        </Button>
                    </Card.Content>
                </Card>
            );
        }
    }

    renderItems = () => {
        if (!this.props.contract) {
            return;
        }
        
        if(this.state.totalItems > 0 && this.state.items !== null){
            return (
                <Card.Group> 
                    {this.state.items.map((item) => (
                            this.renderItem(item)
                        ))
                    }
                </Card.Group>
            );
        } 
    }

    renderForm = () => {
        if(this.props.accounts !== null){
            if(this.props.accounts[0] === this.state.owner) {
                return (
                    <Container>
                        <Segment>
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
                        </Segment>
                        <Segment>
                            <Header as='h2' floated='right'>
                            New Item
                            </Header>
                            <Divider clearing />
                            <Form>
                                <Form.Group widths='equal'>
                                    <Form.Input 
                                        label='Name' 
                                        placeholder='Please Enter Item Name Here'
                                        onChange={this.handleNameChange}
                                        value={this.state.newItem}
                                    />
                                    <Form.Input
                                        label='Price'
                                        placeholder='Please Enter Item Price Here'
                                        onChange={this.handlePriceChange}
                                        value={this.state.newPrice}
                                    />
                                    <Form.Input
                                        label='Sku'
                                        placeholder='Please Enter Item Sku Here'
                                        onChange={this.handleSkuChange}
                                        value={this.state.newSku}
                                    />
                                </Form.Group>
                                <Form.Input
                                        label='Photo'
                                        type='file'
                                        placeholder='Please Select A Photo For The New Item Here'
                                        onChange={this.handleImage}
                                    />
                                <Button 
                                    onClick={this.handleSubmit}
                                    loading={this.state.load}
                                >
                                    Create
                                </Button>
                            </Form>
                        </Segment>
                    </Container>
                );
            }
        }
    }

    renderWithdraw = () => {
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

    render() {
        return (
            <Container>
                <Header as='h1'>{this.state.name}</Header>
                    {this.renderForm()}
                    <Divider clearing />
                <Segment>
                    <Header as='h2' floated='right'>
                    Store Items
                    </Header>
                    <Divider clearing />
                    {this.renderItems()}
                </Segment>
            </Container>
        );
    }
}

export default StoreDetails;