import React from 'react';
import style from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ScrollView, Text, Dimensions } from 'react-native';

import { appInitialized } from '../../../actions/appInitialize';
import ProfileIc from '../../../assets/profileIc_2.png';
import { navigatorStyle } from '../../../utils/navbarStyle';
import {
    ColWrapper,
    ColContainer,
    AbsoluteContainer,
    UserImg,
    ListDetails,
    GrayView,
    WhiteView,
    JobText,
    BoldText,
    ItemPress
} from '../../../components/styledComponent';
import editImgIc from '../../../assets/editIc.png';

const Imgback = style.Image`
    position : absolute;
    top : 0;
    left : 0;
    right : 0;
    bottom : 0;
    height : 100%;
    width : 100%;
`;

const PencilPress = style.TouchableOpacity`
    position : absolute;
    bottom : 10px;
    right : 10px;
    height : 40px;
    width : 40px;
`;

const EditImg = style.Image`
    height : 100%;
    width : 100%;
`
// ,
const UserName = style.Text`
    font-size : 25px;
`

class Profile extends React.Component {
    static window() {
        return Dimensions.get('window');
    }
    constructor (props) {
        super(props);
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
        this.navigatorPush = this.navigatorPush.bind(this);
    }
    
    onNavigatorEvent(event) { // this is the onPress handler for the two buttons together
        if (event.type == 'NavBarButtonPress') { // this is the event type for button presses
            if (event.id == 'userLogout') { // this is the same id field from the static navigatorButtons definition
                this.props.appInitialized();
            } else if (event.id === 'contactUser') {
                this.props.navigator.push({
                    screen : 'Dashboard.Chat',
                    title : this.props.host.user.fullName || this.props.host.user.email,
                    passProps : { },
                    animated : 'true',
                    animationType : 'fade',
                    navigatorButtons : {},
                    navigatorStyle
                });
            }
        }
    }

    navigatorPush() {
        this.props.navigator.push({
            screen : 'Dashboard.EditProfile',
            title : 'Edit profile',
            passProps : { },
            animated : 'true',
            animationType : 'fade',
            navigatorButtons : {
                rightButtons : [{
                    title: 'Save', // for a textual button, provide the button title (label)
                    id: 'saveProfile',
                }]
            },
            navigatorStyle
        });
    }

    render() {
        // host because user is visiting a user profile that isn't theirs
        const { user } = this.props.host || this.props;
        return (
            <ColWrapper>
                <Imgback source={ProfileIc} />
                <AbsoluteContainer style={{ backgroundColor : 'rgba(0, 0, 0, 0.96)' }}>
                {/* <ColWrapper> */}
                    <ScrollView>
                    <ColWrapper style={styles.colWrapper}>
                    <ColContainer style={{ minHeight : 350 }}>
                        <UserImg source={user.img || ProfileIc} />
                        <UserName style={{ color : '#ededed' }}>{user.fullName || user.email}</UserName>
                        <Text style={{ color : '#ededed' }}>{`${user.rating  || 0.0} / 5.0`}</Text>
                        <PencilPress
                            onPress={this.navigatorPush}
                        >
                            <EditImg source={editImgIc} />
                        </PencilPress>
                    </ColContainer>
                    <ListDetails style={styles.listDetails}>
                        <WhiteView><JobText><BoldText>Email:</BoldText> {user.email}</JobText></WhiteView>
                        <GrayView><JobText><BoldText>Member since:</BoldText> {user.memberSince}</JobText></GrayView>
                        <WhiteView><JobText><BoldText>Locations:</BoldText> {/*user.locations.join(', ')*/}</JobText></WhiteView>
                        <GrayView><JobText><BoldText>About:</BoldText> {user.description}</JobText></GrayView>
                    </ListDetails>
                    </ColWrapper>
                    </ScrollView>
                {/*  */}
                </AbsoluteContainer>
            </ColWrapper>
        );
    }
}

const styles = {
    colWrapper : {
        minHeight : Profile.window().height,
        justifyContent : 'space-between'
    },
    listDetails : {
        backgroundColor : '#ededed',
        minHeight : Profile.window().height - 350
    }
}

function mapStateToProps ({ userAuthentication }) {
    return {
        user : userAuthentication.user
    }
}

Profile.propTypes = {
    user : PropTypes.object.isRequired,
    appInitialized : PropTypes.func.isRequired
};

export default connect(mapStateToProps, { appInitialized })(Profile);
