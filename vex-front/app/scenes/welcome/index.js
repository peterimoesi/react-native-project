import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  Image,
  Button,
  StyleSheet,
  TextInput,
  Dimensions
} from 'react-native';
import { connect } from 'react-redux';
import Orientation from 'react-native-orientation';
import Video from 'react-native-video';
import styled from 'styled-components';

import { userLogin } from '../../actions/appInitialize';
import logo from '../../assets/dog_head/logo.png';
import video from '../../assets/video.mp4';
import * as colors from '../../utils/colors';
import { accountNavbarStyle } from '../../utils/navbarStyle';

const ButtonStyled = styled.Button`
    background-color : #246F98;
    height : 60px
`

class Welcome extends Component {
    static window() {
        return Dimensions.get('window');
    }
    constructor() {
        super();
        this.onAnonymous = this.onAnonymous.bind(this);
        this.onChangeText = this.onChangeText.bind(this);
        this.state = {
            showAnonyInput : false,
            tempUserName : ''
        }
    }

    componentDidMount() {
        Orientation.lockToPortrait();
    }

    onAnonymous() {
        // this.setState({ showAnonyInput : !this.state.showAnonyInput })
    }

    onChangeText(e) {
        this.setState({ tempUserName : e })
    }

    render(){
        return (
            <View style={styles.container}>
                <Video
                    source={video}
                    repeat={true}
                    style={styles.bgImage}
                    resizeMode="cover"
                />
                <View style={styles.textWrapper}>
                    <View style={styles.welcomeText}>
                        <Text style={styles.welcomeHead}>
                            <Image
                                source={logo}
                                style={styles.logo}
                            />
                        </Text>
                    </View>
                    <View style={styles.loginSect}>
                        <View style={styles.elemCont}>
                            <ButtonStyled
                                onPress={this.onAnonymous}
                                title="Sign in"
                                accessibilityLabel="Signin with your account"
                                onPress={() => this.props.navigator.push({
                                    screen : 'Welcome.Login',
                                    passProps : {},
                                    animated : 'true',
                                    animationType : 'slide-vertical',
                                    navigatorStyle: accountNavbarStyle
                                })}
                            />
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}

Welcome.propTypes = {
    userLogin : PropTypes.func.isRequired
};

const styles = StyleSheet.create({
    bgImage: {
        position: 'absolute',
        left : 0,
        right: 0,
        top: 0,
        bottom: 0,
        height: Welcome.window().height,
        width: Welcome.window().width
    },
    welcomeText: {
        // paddingTop : 20,
        flex : 1,
        justifyContent : 'center'
    },
    welcomeHead: {
        fontSize : 50,
        color : '#C3272B',
        fontWeight : '700',
        fontFamily: "Roboto",
        textAlign : 'right'
    },
    container: {
        position : 'relative'
    },
    loginSect: {
        position : 'relative',
        width : Welcome.window().width,
        flex : 1,
        flexDirection : 'column',
        alignItems : 'center',
    },
    signinText: {
        textAlign : 'center',
        fontSize : 15,
        marginBottom : 20,
        marginTop : 30,
        color : '#f9f9f9'
    },
    elemCont: {
        width : 300,
        maxWidth : Welcome.window().width,
        marginBottom : 20
    },
    textWrapper:{
        position : 'absolute',
        backgroundColor : 'rgba(0, 0, 0, 0.6)',
        top : 0,
        bottom : 0,
        left : 0,
        right : 0,
        flex : 1,
        alignItems : 'center',
        justifyContent : 'center',
        height: Welcome.window().height,
        width: Welcome.window().width
    },
    logo : {

    }
});

export default connect(null, { userLogin })(Welcome);

// cd android && gradlew clean