import React, { Component } from 'react';
import {
    Picker, View
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as colors from '../../utils/colors';

import { userTypeSelect } from './action';

class UserSelect extends React.Component {
    componentWillReceiveProps(nextProps) {
        if (this.props.userType !== nextProps.userType) {
            this.props.navigator.setStyle({
                navBarBackgroundColor: nextProps.userType === 'buyer' ? colors.midBlue : colors.midGreen,
                statusBarColor : nextProps.userType === 'buyer' ? colors.midBlue : colors.midGreen,
            });
        }
    }

    render () {
        console.log(this.props);
        return (
            <View style={styles.pickerCont}>
                <Picker
                    selectedValue={this.props.userType}
                    style={styles.picker}
                    onValueChange={(itemValue, itemIndex) => this.props.userTypeSelect(itemValue)}>
                    <Picker.Item label="I need assitance" value="buyer" />
                    <Picker.Item label="I want to offer help" value="seller" />
                </Picker>
            </View>
        );
    }
}

const styles = {
    picker : {
        width : '100%',
        height : 50
    },
    pickerCont : {
        paddingHorizontal : 20,
    },
};

UserSelect.propTypes = {
    userType : PropTypes.string.isRequired,
    userTypeSelect : PropTypes.func.isRequired,
    navigator : PropTypes.object.isRequired
}


function mapStateToProps({ userType }) {
    return {
        userType : userType.userType
    }
}

export default connect(mapStateToProps, { userTypeSelect })(UserSelect);
