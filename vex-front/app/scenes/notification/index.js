import React from 'react';
import style from 'styled-components';
import PropTypes from 'prop-types';
import randomColor from 'randomcolor';
import {
    View
} from 'react-native';

import { getInitials } from '../../utils/general';
import { strongBlue as noticeColor } from '../../utils/colors'
import  { InitialsText, RowWrapper } from '../../components/styledComponent';

const NoticeCont = style.View`
    position : relative;
    height : 70px;
    width : 100%;
    backgroundColor : #f9f9f9;
    zIndex : 1;
    flex : 1'
`;
const NameText = style.Text`
    font-size : 18px;
    margin-bottom : 5px;
    color : #f9f9f9;
`
const MessageText = style.Text`
    color : #f9f9f9;
`

const Notification = ({ data }) => (
    <RowWrapper style={styles.wrapper}>
        <InitialsText style={styles.initialText}>{getInitials(data.name)}</InitialsText>
        <View>
            <NameText>{ data.name }</NameText>
            <MessageText>{ data.message }</MessageText>
        </View>
    </RowWrapper>
);

const styles = {
    wrapper : {
        maxHeight : 70,
        backgroundColor : noticeColor,
        padding : 10
    },
    initialText : {
        backgroundColor : randomColor({ luminosity : 'dark', alpha : 0.2 }),
        height : 45,
        width : 45,
        marginRight : 15,
        // padding : 0
    }
}

Notification.propTypes = {
    data : PropTypes.object.isRequired
}

export default Notification;
