import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import { Navigation } from 'react-native-navigation';
import SocketIOClient from 'socket.io-client';
import style from 'styled-components';
import randomColor from 'randomcolor';
import { 
    ColWrapper,
    RowWrapper,
    FlexCont,
    InitialsText
 } from '../../../components/styledComponent';
import { clearAllMessages, getAllMessages, sendConversationId } from './action';
import { getInitials, timeSince } from '../../../utils/general';
import { navigatorStyle } from '../../../utils/navbarStyle';
import { homeRoute } from '../../../utils/parentRoute';

const colors = ['01a39b', '9500a2', 'a5881f', '7fa51e', '1da561'];

const NameText = style.Text`
    font-size : 18px;
    margin-bottom : 5px;
`
const MessageText = style.Text`
    color : #4a4a4a;
`
const TimeSince = style.Text`
    text-align : right;
`

class Inbox extends React.Component {
    static propTypes = {
        clearAllMessages : PropTypes.func.isRequired,
        getAllMessages : PropTypes.func.isRequired,
        user : PropTypes.object.isRequired,
        messages : PropTypes.array.isRequired,
        navigator : PropTypes.object.isRequired,
        sendConversationId : PropTypes.func.isRequired
    }

    constructor(props) {
        super(props);
        this.onMessagePress = this.onMessagePress.bind(this);
        this.socket = SocketIOClient(homeRoute); 
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
        this.formatRecipentName = this.formatRecipentName.bind(this);
        this.state = {
            screenFocus : false
        };
        
    }

    componentDidMount() {
        this.socket.on('connect', (socket) => {
            console.log('...socket io client connecting')
            this.socket.emit('user-online', this.props.user.id);
        });

        this.socket.on('refresh all messages', (data) => {
            if (this.state.screenFocus) {
                this.props.getAllMessages(this.props.user.id, this.props.user.token );
            } else {
                console.log('notify data', data);
                this.props.navigator.showInAppNotification({
                    screen : 'Dashboard.Notification',
                    passProps : { data },
                    autoDismissTimerSec : 10,
                    dismissWithSwipe: true,
                })
            }
        });
    }

    onNavigatorEvent(event) {
        switch(event.id) {
            case 'willAppear':{
                this.setState({ screenFocus : true });
                this.props.getAllMessages(this.props.user.id, this.props.user.token );
                break;
            }
            case 'didAppear':
                break;
            case 'willDisappear':{
                this.props.clearAllMessages();
                this.setState({ screenFocus : false })
                break;
            }
            case 'didDisappear':
                break;
            case 'willCommitPreview':
                break;
            }
      }

    onMessagePress(message, userName) {
        const { conversationId } = message;
        console.log('message', message)
        this.props.sendConversationId(conversationId);
        this.props.navigator.push({
            screen : 'Dashboard.Chat',
                    title : this.formatRecipentName(message.user, message.recipent),
                    passProps : {
                        recipentId : this.props.user.id === message.recipent._id ? message.user._id : message.recipent._id,
                        recipentName : this.formatRecipentName(message.user, message.recipent)
                    },
                    animated : 'false',
                    navigatorButtons : {},
                    navigatorStyle : navigatorStyle(this.props.userType)
        })
    }

    formatRecipentName(user, recipent) {
        let fullName;
        let email;
        if (this.props.user.fullName === recipent.fullName)  {
            fullName =  user.fullName;
        } else {
            fullName = recipent.fullName
        }
        if (this.props.user.email === recipent.email)  {
            email =  user.email
        } else {
            email = recipent.email
        }
        
        return fullName || email;
    }

    render() {
        const { messages, user } = this.props;
        const messageIds = messages.map(x => x.conversationId);
        return (
            <ScrollView>
                <ColWrapper>
                    {
                        messages.map((message, i) => (
                            <TouchableOpacity
                                key={message._id}
                                onPress={() => this.onMessagePress(message)}
                            >
                                <RowWrapper style={styles.rowWrapper}>
                                    <InitialsText style={{ backgroundColor : `${randomColor({ luminosity : 'dark', alpha : 0.2 })}`}}>
                                        {getInitials(this.formatRecipentName(message.user, message.recipent))}
                                    </InitialsText>
                                    <RowWrapper style={{ justifyContent : 'space-between' }}>
                                        <View>
                                            <NameText>{this.formatRecipentName(message.user, message.recipent)}</NameText>
                                            <MessageText>{(message.user.fullName === user.fullName) || (message.user.email === user.email) ? '(You) ' : ''}{message.text}</MessageText>
                                        </View>
                                        <View>
                                            <TimeSince>{timeSince(new Date(message.updatedAt))}</TimeSince>
                                        </View>
                                    </RowWrapper>
                                </RowWrapper>
                            </TouchableOpacity>
                        ))
                    }
                </ColWrapper>
            </ScrollView>
        )
    }
}

const styles = {
    rowWrapper : {
        paddingHorizontal : 8,
        height : 100,
    }
}

function mapStateToProps({ userAuthentication, conversations, allMessages, userType }) {
    return {
        user : userAuthentication.user,
        messages : allMessages.messages,
        participants : allMessages.participants,
        userType : userType.userType,
        conversations
    }
}

export default connect(mapStateToProps, { clearAllMessages, getAllMessages, sendConversationId })(Inbox);
