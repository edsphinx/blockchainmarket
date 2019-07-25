import React from "react";
import { newContextComponents } from "drizzle-react-components";
import { DrizzleContext } from "drizzle-react";

import { Card, Box, PublicAddress, Text, Heading } from "rimble-ui";

const { AccountData } = newContextComponents;

const ActiveAccount = () => {
    return (
        <DrizzleContext.Consumer>
            {drizzleContext => {
                const { drizzle, drizzleState, initialized } = drizzleContext;
                if (!initialized) {
                    return 'Loading...';
                }

                return (
                    <Box mb={20}>
                        <Card bg='ffffff'>
                            <Heading.h4>Active Account</Heading.h4>
                            <AccountData
                                drizzle={drizzle}
                                drizzleState={drizzleState}
                                accountIndex={0}
                                units='ether'
                                precision={10}
                                render={({ address, balance, units }) => (
                                    <Box mt={3} width={[1,1,0.5]}>
                                        <PublicAddress color='red' address={address} />
                                        <Text bold fontWeight='600' ml={1}>
                                            Balance:
                                            <Text.span bold fontWeight='600' color='red'>&nbsp;{balance}</Text.span> {units}
                                        </Text>
                                    </Box>
                                )}
                            />
                        </Card>
                    </Box>
                )
            }}
        </DrizzleContext.Consumer>
    );
};

export default ActiveAccount;