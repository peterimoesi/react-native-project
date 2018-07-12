import React from 'react';
import { Text, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import style from 'styled-components';
import ProfileIc from '../../../assets/profileIc_2.png';
import { dateFormat } from '../../../utils/general';
import { navigatorStyle } from '../../../utils/navbarStyle';
import {
    ColWrapper,
    ColContainer,
    UserImg,
    ListDetails,
    GrayView,
    WhiteView,
    JobText,
    BoldText,
    ItemPress
 } from '../../../components/styledComponent';

const UserName = style.Text`
    font-size : 18px;
`;

class JobDetails extends React.Component {
    constructor(props) {
        super(props);
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    }

    onNavigatorEvent(event) { // this is the onPress handler for the two buttons together
        if (event.type == 'NavBarButtonPress') { // this is the event type for button presses
            if (event.id === 'contactUser') {
                this.props.navigator.push({
                    screen : 'Dashboard.Chat',
                    title : this.props.job.user.fullName || this.props.job.user.email,
                    passProps : { recipentId : this.props.job.user._id },
                    animated : 'true',
                    animationType : 'fade',
                    navigatorButtons : {},
                    navigatorStyle
                });
            }
        }
    }

    render() {
        const { title, job, navigator, userId } = this.props;
        return (
            <ColWrapper>
                <ScrollView>
                <ColContainer style={{ minHeight : 350 }}>
                    <UserImg source={job.user.img || ProfileIc} />
                    <UserName>{job.user.fullName}</UserName>
                    <Text>{`${job.user.rating || 0.0} / 5.0`}</Text>
                    <ItemPress
                        onPress={() => {
                            const navigation = {
                                screen : 'Dashboard.Profile',
                                title : job.user.fullName || job.user.email,
                                passProps : { host : job, recipentId : job.user._id },
                                animated : 'true',
                                animationType : 'fade',
                                navigatorButtons : {},
                                navigatorStyle
                            };
                            
                            if (userId !== job.user._id) {
                                navigation.navigatorButtons.rightButtons = [{
                                    title: 'Contact', // for a textual button, provide the button title (label)
                                    id: 'contactUser',
                                }]
                            }

                            navigator.push(navigation)
                        }}
                    >
                        <Text style={{ marginTop : 10, color : '#246F98' }}>View profile</Text>
                    </ItemPress>
                </ColContainer>
                <ListDetails>
                    <WhiteView><JobText><BoldText>Work:</BoldText> {job.customName || title}</JobText></WhiteView>
                    <GrayView><JobText><BoldText>Price:</BoldText> {job.price}</JobText></GrayView>
                    <WhiteView><JobText><BoldText>Date:</BoldText> {dateFormat(job.timeAvailable, 'dateString')}</JobText></WhiteView>
                    <WhiteView><JobText><BoldText>Time:</BoldText> {job.from && job.to ? `${job.from} to ${job.to}` : 'All day'}</JobText></WhiteView>
                    <GrayView><JobText><BoldText>Location:</BoldText> {job.locations.join(', ')}</JobText></GrayView>
                    <WhiteView><JobText><BoldText>About:</BoldText> {job.description}</JobText></WhiteView>
                </ListDetails>
                </ScrollView>
            </ColWrapper>
        );
    }
}

JobDetails.propTypes = {
    title : PropTypes.string.isRequired,
    job : PropTypes.object.isRequired,
    navigator : PropTypes.object.isRequired
}

function mapStateToProps({ userAuthentication }) {
    return {
        userId : userAuthentication.user.id
    }
}

export default connect(mapStateToProps)(JobDetails);
