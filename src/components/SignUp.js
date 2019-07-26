import React from 'react';
import { DrizzleContext } from "drizzle-react";
import { newContextComponents } from "drizzle-react-components";
import { Card, Button, Form, Box, Flex, Input, Heading, Text } from 'rimble-ui';

const { ContractData, ContractForm } = newContextComponents;

class SignUp extends React.Component {
    render() {
        return (
            <DrizzleContext.Consumer>
                {drizzleContext => {
                    const { drizzle, drizzleState, initialized } = drizzleContext;
                    if (!initialized) {
                        return 'Loading';
                    }
                
                    return (
                        <Box mb={20}>
                            <Card bg="#fff">
                                <Heading.h4>SignUp New Account</Heading.h4>
                                <Text.p>
                                    Plase fill the form to register new account in the Blockchain Market
                                </Text.p>
                                <Flex mt={2}>
                                    <Box>
                                        <ContractForm
                                            drizzle={drizzle}
                                            drizzleState={drizzleState}
                                            contract='BlockchainMarket'
                                            method='userSignUp'
                                            render={({
                                                inputs,
                                                inputTypes,
                                                state,
                                                handleInputChange,
                                                handleSubmit
                                            }) => (
                                                    <form onSubmit={handleSubmit}>
                                                        {inputs.map((input, index) => (
                                                        <Input
                                                            key={input.name}
                                                            type={inputTypes[index]}
                                                            name={input.name}
                                                            value={state[input.name]}
                                                            placeholder='Enter details here'
                                                            onChange={handleInputChange}
                                                            mr={10}
                                                        />
                                                        ))}
                                                        <Button icon='Send' key='submit' type='button' onClick={handleSubmit} position='relative' top={8}>Submit</Button>
                                                    </form>
                                                )}
                                        />
                                    </Box>
                                    
                                    <Box mb={20}>
                                        <Card bg='ffffff'>
                                            <Heading.h4>List of Users</Heading.h4>
                                            <Flex mt={2}>
                                                <Box>
                                                    <ContractData
                                                        drizzle={drizzle}
                                                        drizzleState={drizzleState}
                                                        contract='BlockchainMarket'
                                                        method='getAllUser'
                                                        toUtf8
                                                        render={displayData => (
                                                            {displayData}
                                                        )}
                                                    />
                                                </Box>
                                            </Flex>
                                        </Card>
                                    </Box>

                                </Flex>
                            </Card>
                        </Box>
                    );
                }}
            </DrizzleContext.Consumer>
        );
    }
}

export default SignUp;