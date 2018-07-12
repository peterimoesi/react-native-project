import React, { Component } from 'react';
import {
    View,
    ScrollView,
    Picker, Text
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import style from 'styled-components';
import { Calendar } from 'react-native-calendars';
import { CheckBox, Textarea } from 'native-base';
import { submitForm } from './action';

import {
    ColWrapper,
    ColContainer,
    RowWrapper,
    ItemPress,
    Input,
    LocationText
 } from '../../../components/styledComponent';

const PickerText = style.Text`
    font-size : 15px;
`

const PickerCont = style.View`
    width : 50%;
    padding : 0 10px;
`

class Advert extends React.Component {
    constructor(props) {
        super(props);
        this.timeArr = [];
        this.locations = ['Helsinki', 'Espoo', 'Vantaa'];
        this.state = {
            name : this.props.services.name,
            customName : this.props.services.title,
            selectDate : {},
            showCalender  : false,
            from : 0,
            to : '',
            locations : [],
            description : '',
            price : ''
        }
        this.onChange = this.onChange.bind(this);
        this.selectTime = this.selectTime.bind(this);
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
        this.onSumbitForm = this.onSumbitForm.bind(this);
        this.validate = this.validate.bind(this);
        this.locationCheck = this.locationCheck.bind(this);
    }

    componentWillMount() {
        for(let i = 0; i < 24; i++) {
            this.timeArr.push(i);
        }
        this.timeArr.push(0);
    }

    onChange(e, name) {
        this.setState({ [name] : e.nativeEvent.text });
    }

    onNavigatorEvent(event) { // this is the onPress handler for the two buttons together
        if (event.type == 'NavBarButtonPress') { // this is the event type for button presses
            if (event.id == 'submitAdvert') { // this is the same id field from the static navigatorButtons definition
                this.onSumbitForm();
            }
        }
    }

    onSumbitForm() {
        const {
            name, selectDate, from, to, locations, description, price, customName
        } = this.state;
        if (selectDate.timestamp) {
            const date = new Date(selectDate.timestamp);
            this.props.submitForm(
                this.props.id,
                {
                    name,
                    customName,
                    timeAvailable : date.toISOString(),
                    from,
                    to,
                    locations,
                    description,
                    price
                }, this.props.token
            );
        } else {
            console.log('invalid date');
            return;
        }
    }

    validate() {
        
    }

    selectTime(status, value) {
        this.setState({ [status] : value })
    }

    locationCheck(val) {
        const { locations } = this.state;
        const index = locations.indexOf(val);
        if (index > -1) {
            locations.splice(index, 1);
        } else {
            locations.push(val);
        }
        this.setState({ locations });
    }

    render() {
        const { services } = this.props;
        const toPicker = this.timeArr.map((time, i) => (
            i > this.state.from ?
                <Picker.Item key={time} label={`${time}:00`} value={time} /> : null
        ));

        return (
            <ScrollView>
                <ColWrapper>
                    <Input
                        value={this.state.customName}
                        placeholder="Work name"
                        onChange={e => this.onChange(e, 'customName')}
                    />
                    <ItemPress
                        onPress={() => this.setState({ showCalender : !this.state.showCalender })}
                    >
                        <Input
                            value={this.state.selectDate.dateString || ''}
                            placeholder="Date available"
                            editable={false}
                        />
                    </ItemPress>
                    { this.state.showCalender &&
                        <Calendar
                            current={this.state.selectDate.dateString}
                            onDayPress={(day) => this.setState({ selectDate : day })}
                            markedDates={ this.state.selectDate.dateString && {
                                [this.state.selectDate.dateString] : {selected: true, marked: true, selectedColor: '#246F98'}
                            }}
                        />
                    }
                    <RowWrapper style={{ marginTop : 20 }}>
                        <PickerCont>
                            <PickerText>From</PickerText>
                            <Picker
                                selectedValue={this.state.from}
                                style={{ width : '50%' }}
                                onValueChange={(itemValue, itemIndex) => this.selectTime('from', itemValue)}>
                                    {
                                        this.timeArr.map(time => (
                                            <Picker.Item key={time} label={`${time}:00`} value={time} />
                                        ))
                                    }
                            </Picker>
                        </PickerCont>
                        <PickerCont>
                            <PickerText>To</PickerText>
                            <Picker
                                selectedValue={this.state.to}
                                style={{ width : '50%' }}
                                onValueChange={(itemValue, itemIndex) => this.selectTime('to', itemValue)}>
                                    {
                                        toPicker.filter(x => x)
                                    }
                            </Picker>
                        </PickerCont>
                    </RowWrapper>
                    <Input
                        value={this.state.price}
                        onChange={e => this.onChange(e, 'price')}
                        placeholder="Price in euros"
                        keyboardType="numeric"
                    />
                    <ColWrapper style={{ marginLeft : 10 }}>
                        {
                            this.locations.map(loc => (
                                <RowWrapper style={{ marginTop : 20 }} key={loc}>
                                    <CheckBox
                                        style={{ height : 40, width : 40, borderRadius : 10 }}
                                        checked={this.state.locations.indexOf(loc) > -1}
                                        color="#246F98"
                                        onPress={() => this.locationCheck(loc)}
                                    />
                                    <LocationText>{loc}</LocationText>
                                </RowWrapper>
                            ))
                        }
                    </ColWrapper>
                    <Textarea
                        rowSpan={7}
                        bordered
                        onChange={e => this.onChange(e, 'description')}
                        style={{ marginTop : 30, borderBottomWidth : 0, borderTopColor : "#000" }}
                        placeholder="Enter your job description"
                        value={this.state.description}
                    />
                </ColWrapper>
            </ScrollView>
        );
    }
}

function mapStateToProps({ userAuthentication }) {
    return {
        token : userAuthentication.user.token,
        id    : userAuthentication.user.id
    };
}

Advert.propTypes = {
    token : PropTypes.string.isRequired,
    id : PropTypes.string.isRequired,
    services : PropTypes.object.isRequired,
    submitForm : PropTypes.func.isRequired
};

export default connect(mapStateToProps, { submitForm })(Advert);
