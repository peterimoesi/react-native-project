import style from 'styled-components';
import { Button, H1, Text } from 'native-base';
import React from 'react';
import * as colors from '../utils/colors';

export const ColWrapper = style.View`
    width : 100%;
    flex : 1;
    flex-direction : column;
    position : relative;
`;

export const RowWrapper = style.View`
    flex : 1;
    width : 100%;
    flex-direction : row;
    align-items : center;
`

export const ColContainer = style.View`
    width : 100%;
    flex : 1;
    flex-direction : column;
    align-items : center;
    justify-content : center;
`;

export const AbsoluteContainer = style.View`
    position : absolute;
    top : 0;
    right : 0;
    left : 0;
    bottom : 0;
    height : 100%;
    width : 100%;
`;

export const FlexCont = style.View`
    flex : 1;
    justifyContent : center;
    alignItems : center;
`;

export const RelativeView = style.View`
    position : relative;
`;

export const UserImg = style.Image`
    border-radius : 70;
    height : 110px;
    width : 110px;
    margin-bottom : 15px;
    border-width : 2px;
    padding : 10px;
    border-color : #246F98;
`
export const ListDetails = style.View`
    border-top-width : 2px;
    border-color : #9b9b9b;
`;

export const GrayView = style.View`
    background-color : #ededed;
    padding : 20px 10px;
`;

export const WhiteView = style.View`
    background-color : #f9f9f9;
    padding : 20px 10px;
`;

export const JobText = style.Text`
    font-size : 16px;
`;

export const BoldText = style.Text`
    font-weight : 600;
`;

export const ItemPress = style.TouchableOpacity`
    width : auto;
`;

export const Input = style.TextInput`
    height : 80px;
    font-size : 16px;
    width : 100%;
    padding-left : 10px;
`;

export const LocationText = style.Text`
    font-size : 16px;
    font-weight : bold;
    margin-left : 30px;
`;

export const InitialsText = style.Text`
    color : #fff;
    font-size : 20px;
    font-weight : 700;
    border-radius : 50;
    padding : 10px 15px;
    margin-right : 10px;
    width : 50px;
    height : 50px;
    text-align : center;
`;

export const SubmitBtn = ({styles, onPress, component, btnText}) => {
    const defaultStyles = {
        width : '100%',
        justifyContent : 'center',
        backgroundColor : colors.strongBlue,
        borderRadius : 6
    };

    const ButtonText = style.Text`
        fontSize : 20;
        fontWeight : 900;
        color : #ededed;
        width : 100%;
        textAlign : center;
    `;
    return (
        <Button
            style={{ ...(styles || {}),  }}
            onPress={() => onPress()}
        >
            {   component ||
                <ButtonText>
                    {btnText}
                </ButtonText>
            }
        </Button>
    );
}