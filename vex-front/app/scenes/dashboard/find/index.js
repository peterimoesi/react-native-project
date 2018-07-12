import React, { Component } from 'react';
import {
    ActivityIndicator,
    StyleSheet
} from 'react-native';
import { StyleProvider, Content, H2 } from 'native-base';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import style from 'styled-components';

import getTheme from '../../../../native-base-theme/components';
import material from '../../../../native-base-theme/variables/material';
import { getService } from './actions.js';
import TabContent from '../dashboardComponent/findAdvert';
import UserSelect from '../../../components/userPickerSelect/index';

import { navigatorStyle } from '../../../utils/navbarStyle';

// const H2 = style.Text`
//     font-size : 25px;
//     color : #494949;
//     font-weight : 400;
// `
const H2Cont = style.View`
    margin-top : 15px;
    margin-bottom : 15px;
    padding-left : 10px;
` 

class Find extends React.Component {
    constructor() {
        super();
        this.getService = this.getService.bind(this);
        this.state = {
            loaded : true
        }
    }

    componentDidMount() {
    }

    getService(name, title) {
        this.props.getService(name, this.props.token)
            .then((res) => {
                if (res === 200) {
                    console.log(navigatorStyle);
                    this.props.navigator.push({
                        screen : 'Dashboard.SearchResults',
                        title,
                        passProps : { title },
                        animated : 'true',
                        animationType : 'fade',
                        navigatorStyle: navigatorStyle
                    })
                }
            })
    }

    render() {
        return (
            <StyleProvider style={getTheme(material)}>
            <Content style={styles.wrapper}>
                <UserSelect {...this.props} />
                <H2Cont>
                    <H2>Explore</H2>
                </H2Cont>
                <TabContent
                    userType={this.props.userType}
                    getService={this.getService}
                    navigator={this.props.navigator}
                />
            </Content>
            </StyleProvider>
        );
    }
}

const styles = StyleSheet.create({
    wrapper : {
        overflow : 'visible'
    }
});

Find.propTypes = {
    getService : PropTypes.func.isRequired,
    token      : PropTypes.string,
    navigator  : PropTypes.object.isRequired,
    userType   : PropTypes.string.isRequired
};

Find.defaultProps = {
    token : null
};

function mapStateToProps({ userAuthentication, userType }) {
    return {
        token : userAuthentication.user.token,
        userType : userType.userType
    }
}

export default connect(mapStateToProps, { getService })(Find);
