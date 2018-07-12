import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import style from 'styled-components';
import {
    Dimensions,
    View,
    Touchable
} from 'react-native';
import { Form, Spinner, H1, StyleProvider, Content, Text } from 'native-base';
import AccountInput from '../../components/accountInput/index';
import getTheme from '../../../native-base-theme/components';
import material from '../../../native-base-theme/variables/material';
import { loginAction } from './action';
import {
    AbsoluteContainer,
    FlexCont,
    RelativeView,
    ItemPress,
    SubmitBtn
} from '../../components/styledComponent';
import * as colors from '../../utils/colors';
import { accountNavbarStyle } from '../../utils/navbarStyle';

const DefaultView = style.View`
    width : 100%;
    padding : 0 40px;
    margin-bottom : 30px;
`

const ErrorText = style.Text`
    fontSize : 14px;
    color : #d73300
`


class Login extends React.Component {
    static window() {
        return Dimensions.get('window');
    }
    constructor() {
        super();
        this.state = {
            email      : '',
            password   : '',
            loginError : false
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(event, name) {
        const { text } = event.nativeEvent;
        this.setState({ [name] : text })
    }

    onSubmit() {
        this.setState({ loading : true })
        this.props.loginAction(this.state.email, this.state.password)
            .then(res => res === 401 ? this.setState({ loginError : true, loading : false }) : null);
    }

    render() {
        return (
            <StyleProvider style={getTheme(material)}>
            <RelativeView
                style={styles.relativeView}
            >
                <AbsoluteContainer style={styles.loginSect}>
                    <FlexCont>
                        <DefaultView>
                            <H1 style={{ fontWeight : "600", color : colors.darkGray }}>
                                Log in
                            </H1>
                        </DefaultView>
                        <DefaultView>
                            <Form>
                                <AccountInput
                                    onChange={this.onChange}
                                    inputValue={this.state.email}
                                    label="Email"
                                    name="email"
                                    type="email"
                                    itemStyles={styles.item}
                                />
                                <AccountInput
                                    onChange={this.onChange}
                                    inputValue={this.state.password}
                                    label="Password"
                                    name="password"
                                    itemStyles={styles.item}
                                    password
                                />
                                <FlexCont style={{ marginTop : 30, marginBottom : -20 }}>
                                    { this.state.loginError && <ErrorText>Invalid credentials</ErrorText> }
                                </FlexCont>
                                <View style={styles.submitBtnCont}>
                                    {SubmitBtn({ onPress : this.onSubmit, btnText : 'Log in' })}
                                </View>
                            </Form>
                            <FlexCont style={{ marginTop : 30, marginBottom : -20, flexDirection : "row" }}>
                                <Text style={styles.signup}>New user? </Text>
                                <ItemPress
                                    style={{ height : 17 }}
                                    onPress={() => this.props.navigator.push({
                                        screen : 'Welcome.Signup',
                                        passProps : {},
                                        animated : 'true',
                                        animationType : 'slide-vertical',
                                        navigatorStyle: accountNavbarStyle
                                    })}
                                >
                                    <Text style={{ ...styles.signup, color : colors.strongBlue }}>
                                        Signup
                                    </Text>
                                </ItemPress>
                            </FlexCont>
                        </DefaultView>
                    </FlexCont>
                </AbsoluteContainer>
                {this.state.loading &&
                    <AbsoluteContainer>
                        <FlexCont style={{ height : '100%', paddingBottom : 20, zIndex : 1 }}>
                            <Spinner color="#246F98" />
                        </FlexCont>
                    </AbsoluteContainer>
                }
            </RelativeView>
            </StyleProvider>
        )
    }
}

const styles = {
    bgImage : {
        flex : 1
    },
    relativeView: {
        height : Login.window().height,
        width :  Login.window().width
    },
    loginSect : {
        backgroundColor : '#f9f9f9',
    },
    item : {
        marginLeft : 0
    },
    submitBtnCont : {
        marginTop : 60
    },
    signup : {
        fontSize : 12,
        fontWeight : '400'
    }
};

Login.propTypes = {
    loginAction : PropTypes.func.isRequired
};

export default connect(null, { loginAction })(Login);