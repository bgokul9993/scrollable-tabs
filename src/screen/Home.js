import React, { Component } from 'react';
import Tab from './Tab';
import PluggableTab from './PluggableTab';
import styled from 'styled-components'


class Home extends Component {

    render() {
        return (
            <Section>
                <Header> Demo Conatiner </Header>
                <Body>
                    <PluggableTab />
                    {/* 
                        // to enable data flow through redux uncomment Tab Component and commment PluggableTab
                        <Tab /> 
                    */}
                </Body>
            </Section>
        )
    }
}

export default Home;

const Section = styled.div`
    display: flex;
    flex-direction: column;
    margin: 5% 10%;
    border: 1px solid #dadfe3;
    border-radius: 4px;
    box-shadow: 0px 0px 5px 0px #dadfe3;
`;

const Header = styled.div`
    margin: 20px 30px;
    width: 100%;
    font-size: 20px;
`;

const Body = styled.div`
    height: 600px;
    width: 100%;
`;
