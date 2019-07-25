import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Card, Heading } from 'rimble-ui';

const Header = () => {
    return (
        <Box my={3}>
            <Card bg='#4E3FCE' color='white'>
                <div className="ui secondary pointing menu">
                    <Link to="/" className="item">
                        <Heading.h1 color='ffffff'>
                            BlockchainMarket
                        </Heading.h1>
                    </Link>
                    <div className="right menu">
                        <Link to="/" className="item">
                            <Heading.h4>
                                All Items
                            </Heading.h4>
                        </Link>
                    </div>
                </div>
            </Card>
        </Box>
    );
};

export default Header;