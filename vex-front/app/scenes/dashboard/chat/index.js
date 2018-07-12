import React from 'react';
import PropTypes from 'prop-types';
import SocketIOClient from 'socket.io-client';
import { connect } from 'react-redux';
import { GiftedChat } from 'react-native-gifted-chat';
import { homeRoute } from '../../../utils/parentRoute';
import {
    startNewConversation,
    getConversation,
    clearMessages,
    getConversationId,
    saveNewMessage
} from './action';

class Chat extends React.Component {
    static propTypes = {
        user : PropTypes.object.isRequired,
        startNewConversation : PropTypes.func.isRequired,
        getConversation : PropTypes.func.isRequired,
        clearMessages : PropTypes.func.isRequired,
        recipentId : PropTypes.string,
        conversationId : PropTypes.string.isRequired,
        getConversationId : PropTypes.func.isRequired,
        saveNewMessage : PropTypes.func.isRequired
    }

    static defaultProps = {
        recipentId : null
    }

    constructor(props) {
        super(props);
        this.state = {
            messages : []
        };this.socket = SocketIOClient(homeRoute); 
        this.socket = SocketIOClient(homeRoute);        
        this.onReceiveMessages = this.onReceiveMessages.bind(this);
        this.onSendMessage = this.onSendMessage.bind(this);
        this.handleMessageResponse = this.handleMessageResponse.bind(this);

    }

    componentDidMount() {
        this.socket.on('connect', (socket) => {
            console.log('...socket io client connecting')
            this.socket.emit('join', `room-${this.props.conversationId}`);
        })
        // this.socket.emit(`userJoined-${this.props.conversationId}`, this.props.conversationId);
        this.socket.on('refresh messages', (data) => {
            console.log('refreshed data', data);
            this.onReceiveMessages();
        });
        this.onReceiveMessages();
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.conversationId !== nextProps.conversationId) {
            this.props.getConversation(nextProps.conversationId, this.props.user.token);
        }
    }

    componentWillUnmount() {
        this.props.clearMessages();
        this.socket.emit('leave conversation', `room-${this.props.conversationId}`)
    }

    onReceiveMessages() {
        console.log('on receive message api id', this.props.conversationId);
        if (this.props.conversationId) {
            this.props.getConversation(this.props.conversationId, this.props.user.token);
        } else {
            this.props.getConversationId(this.props.user.id, this.props.recipentId, this.props.user.token)
        }
    }

    handleMessageResponse(message) {
        console.log(message);
        this.socket.emit('notify user', {
            room : this.props.recipentId,
            name : this.props.recipentName,
            message
        });
        this.socket.emit('new message', `room-${this.props.conversationId}`);
    }

    onSendMessage(message) {
        console.log('recipentId', this.props.recipentId, this.props.user.id);
        if (!this.props.conversationId) {
            console.log('strating new conversation')
            this.props.startNewConversation(
                message[0].text,
                this.props.user.id,
                this.props.recipentId,
                this.props.user.token
            )
                .then((res) => {
                    if (res) {
                        this.handleMessageResponse(message[0].text);
                    }
                })
        } else {
            console.log(this.props.conversationId);
            this.props.saveNewMessage({ 
                conversationId : this.props.conversationId,
                userId : this.props.user.id,
                recipentId : this.props.recipentId,
                text : message[0].text
             }, this.props.user.token)
                .then((res) => {
                    if (res) {
                        this.handleMessageResponse(message[0].text);
                    }
                })
        }

    }

    render() {
        const { user } = this.props;
        return (
            <GiftedChat
                messages={this.props.messages}
                onSend={this.onSendMessage}
                user={{
                    _id : user.id,
                    name : user.fullName || user.email 
                }}
            />
        );
    }
}

function mapStateToProps({ userAuthentication, conversations }) {
    return {
        user : userAuthentication.user,
        conversationId : conversations.conversationId,
        messages : conversations.messages
    };
}

export default connect(mapStateToProps, {
    startNewConversation,
    getConversation,
    clearMessages,
    getConversationId,
    saveNewMessage
})(Chat);
