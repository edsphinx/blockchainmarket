import React from 'react';
import { newContextComponents } from 'drizzle-react-components';
import { DrizzleContext } from 'drizzle-react';

import { Box, Flex, Card, Text, Heading, Button } from 'rimble-ui';

const { ContractData, ContractForm } = newContextComponents;

class ListAllUsers extends React.Component {

    render() {
        return (
            <DrizzleContext.Consumer>
                {drizzleContext => {
                    const { drizzle, drizzleState, initialized } = drizzleContext;
                    if (initialized) {
                        return 'Loading';
                    }

                    return (
                        <div>&nbsp;</div>
                    )
                }}
            </DrizzleContext.Consumer>
        );
    }
}

export default ListAllUsers;