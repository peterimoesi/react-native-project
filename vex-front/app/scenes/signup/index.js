import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import style from 'styled-components';
import {
    Dimensions,
    View,
    Text
} from 'react-native';
import { Form, Spinner, H1, StyleProvider } from 'native-base';
import AccountInput from '../../components/accountInput/index';
import getTheme from '../../../native-base-theme/components';
import material from '../../../native-base-theme/variables/material';
import { signupAction } from './action';
import { AbsoluteContainer, FlexCont, RelativeView, SubmitBtn } from '../../components/styledComponent';
import * as colors from '../../utils/colors';
import { validateEmail } from '../../utils/general';

const DefaultView = style.View`
    width : 100%;
    padding : 0 40px;
    margin-bottom : 30px;
`

const ButtonText = style.Text`
    fontSize : 20;
    fontWeight : 900;
    color : #ededed;
    width : 100%;
    textAlign : center;
`

const ErrorText = style.Text`
    fontSize : 14px;
    color : #d73300
`


class Signup extends React.Component {
    static window() {
        return Dimensions.get('window');
    }
    constructor() {
        super();
        this.state = {
            email      : '',
            password   : '',
            fullName : '',
            signupError : {
                error : false,
                errorMessage : ''
            }
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(event, name) {
        const { text } = event.nativeEvent;
        this.setState({ [name] : text })
    }

    onSubmit() {
        this.setState({ loading : true });
        const { signupError } = this.state;
        const {  
            email, password, fullName
        } = this.state;
        if (!this.errorCheck(password, email)) {
            this.setState({ loading : false });
            return;
        }
        this.props.signupAction(email, password, fullName)
            .then((res) => {
                if (res === 401) {
                    signupError.error = true;
                    signupError.errorMessage = 'Invalid credentials';
                    this.setState({ signupError, loading : false });
                }
            })
    }

    errorCheck(password, email) {
        const { signupError } = this.state;

        if (password.length < 6 || !validateEmail(email)) {
            signupError.error = true;
            signupError.errorMessage = !validateEmail(email) ? 'Please enter a valid email' : 'Password should contain at least six characters';
            this.setState({ signupError });
            return false;
        }
        return true;
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
                                    Sign up
                                </H1>
                            </DefaultView>
                            <DefaultView>
                                <Form>
                                    <AccountInput
                                        onChange={this.onChange}
                                        inputValue={this.state.fullName}
                                        label="Full Name"
                                        name="fullName"
                                        itemStyles={styles.item}
                                        password
                                    />
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
                                        labelStyles={styles.label}
                                        inputStyles={styles.input}
                                        inputValue={this.state.password}
                                        label="Password"
                                        name="password"
                                        itemStyles={styles.item}
                                        password
                                    />
                                    <FlexCont style={{ marginTop : 30, marginBottom : -20 }}>
                                        { this.state.signupError.error && <ErrorText>{this.state.signupError.errorMessage}</ErrorText> }
                                    </FlexCont>
                                    <View style={styles.submitBtnCont}>
                                        {SubmitBtn({ onPress : this.onSubmit, btnText : 'Sign up' })}
                                    </View>
                                </Form>
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
        height : Signup.window().height,
        width :  Signup.window().width
    },
    loginSect : {
        backgroundColor : '#f9f9f9',
    },
    item : {
        marginLeft : 0
    },
    submitBtnCont : {
        marginTop : 60
    }
};

Signup.propTypes = {
    signupAction : PropTypes.func.isRequired
};

export default connect(null, { signupAction })(Signup);