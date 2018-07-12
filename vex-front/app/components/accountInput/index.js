import React from 'react';
import PropTypes from 'prop-types';
import { Item, Input, Label } from 'native-base';

const styles = {
    input : {
        height : 50,
        flex : 1,
    },
    label : {
        fontWeight : '400'
    },
}

const input = ({
    onChange,
    labelStyles,
    inputStyles,
    inputValue,
    label,
    itemStyles,
    password,
    name,
    type
}) =>(
    <Item floatingLabel style={itemStyles}>
        <Label style={label.input}>{label}</Label>
        <Input
            style={styles.input}
            onChange={e => onChange(e, name)}
            value={inputValue}
            password={password}
            name={name}
            type={type}
            keyboardType={name === "email" ? "email-address" : null}
            returnKeyType="next"
            secureTextEntry={password}
        />
    </Item>
)

input.propTypes = {
    onChange : PropTypes.func.isRequired,
    inputValue : PropTypes.string.isRequired,
    label : PropTypes.string.isRequired,
    itemStyles : PropTypes.object.isRequired,
    name : PropTypes.string.isRequired,
    type : PropTypes.string,
    password : PropTypes.bool
};

input.defaultProps = {
    password: false,
    type : null
};

export default input;
