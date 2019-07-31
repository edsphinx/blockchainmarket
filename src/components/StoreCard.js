import React, { Component } from "react";
import { Card, Image } from 'semantic-ui-react';

class StoreCard extends Component {
    constructor(props) {
        super(props);
        this.state = { src:'/img/image.png' };
    }

    componentDidMount() {
        console.log(this.props);
        this.renderStores();
    }

    componentDidUpdate(prevProps) {
        if (!prevProps.contract) {
            this.renderStores();
        }
    }

    renderStores = () => {
        if (!this.props.contract) {
            return;
        }
        let children = [];
        const { stores } = this.props;
        console.log(stores);
      //Inner loop to create children
        for (let j = 0; j < stores.length; j++) {
            console.log(stores[j]);
            children.push(
            <Card>
                <Image src={this.state.src} wrapped ui={false} />
                <Card.Content>
                    <Card.Header>{stores[j]}</Card.Header>
                    <Card.Meta>Created in</Card.Meta>
                    <Card.Description>
                        Store
                    </Card.Description>
                </Card.Content>
            </Card>
            );
        }
        return children;
    }

    render() {
        return(
            <Card.Group>
                {this.renderStores()}
            </Card.Group>
        );
    }
}

export default StoreCard;
// import {connect} from "react-redux";

// import {
//     KitSlidingWell,
//     KitWell,
//     FlexChild,
//     FlexRow,
//     KitFooter
// } from "./theme";
// import SignUpForm from "./SignUpForm";
// import { createNewUser, nameChanged } from "../store/user/UserActions";

// class Store extends Component {

//     renderSplashContent = () => {
//         return <FlexChild>
//             <h1>Welcome to Blockchain Market</h1>

//             <p>
//                 Some store
//             </p>
//         </FlexChild>;
//     };

//     renderNoAccountContent = () => {
//         const {initialized} = this.props;
//         return <FlexChild>
//             {initialized
//                 ? <KitSlidingWell>
//                     <h2>Connect an Ethereum Account</h2>
//                     <p>In order to use this Dapp, you must use a browser plugin (e.g., Metamask) or an Ethereum-aware browser (e.g., Trust)</p>
//                     <p>You'll need to configure your plugin or browser with one or more accounts that you'll use to maintain Shops, withdraw balances, and make test purchases.</p>
//                     <p>If you have an appropriate browser / plugin with configured accounts, be sure you're signed in.</p>
//                   </KitSlidingWell>
//                 : <KitWell>
//                     <h2>Connect&nbsp;to&nbsp;Ether&nbsp;...&nbsp;</h2>
//                   </KitWell>
//             }
//         </FlexChild>;
//     };

//     render() {

//         const {selectedAccount} = this.props;

//         return  <>
//             <FlexRow>
//                 {this.renderSplashContent()}
//                 {!selectedAccount
//                     ? this.renderNoAccountContent()
//                     : <SignUpForm {...this.props}/>
//                 }
//             </FlexRow>
//             <KitFooter>
//                 Copyright © 2019 &nbsp; <img alt="Luminode Logo" width="60" src="https://luminode.com/img/logo_web.png"/>
//             </KitFooter>
//         </>

//     }
// }

// const mapStateToProps = (state) => ({
//     accounts: state.accountState.accounts,
//     selectedAccount: state.accountState.selectedAccount,
//     username: state.userState.newUser.username,
//     creatingUser: state.userState.creatingUser
// });

// const mapDispatchToProps = (dispatch) => ({
//     createNewUser: (contract, owner, username) => dispatch(createNewUser(contract, owner, username)),
//     nameChanged: username => {dispatch(nameChanged(username))}
// });

// export default connect(mapStateToProps, mapDispatchToProps)(Store);