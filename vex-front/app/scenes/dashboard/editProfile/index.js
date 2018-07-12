import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import style from 'styled-components';
import {
    View,
    ScrollView
} from 'react-native';
import { CheckBox, Textarea } from 'native-base';
import {
    ColWrapper,
    ColContainer,
    RowWrapper,
    ItemPress,
    Input,
    LocationText
 } from '../../../components/styledComponent';
 import { saveProfile } from './action';

const InputHeader = style.Text`
    font-size : 16px;
    margin-top : 10px;
`;

const EmailText = style.Text`
    font-size : 18px;
    margin : 30px 0 10px 10px;
    font-style : italic;
`

class EditProfile extends React.Component {
    constructor(props) {
        super(props);
        const { user } = this.props;
        this.locations = ['Helsinki', 'Espoo', 'Vantaa'];
        this.state = {
            fullName : user.fullName,
            locations : user.locations,
            description : user.description
        }
        this.onChange = this.onChange.bind(this);
        this.onSave = this.onSave.bind(this);
        this.locationCheck = this.locationCheck.bind(this);
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    }

    onSave() {
        const { locations, fullName, description } = this.state;
        this.props.saveProfile({
            locations,
            fullName : fullName || this.props.user.fullName,
            description
        }, this.props.user.id, this.props.user.token)
            .then(res => res === 200 && this.props.navigator.pop({
                animated: true,
                animationType: 'fade',
              })
            )
    }

    onNavigatorEvent(event) { // this is the onPress handler for the two buttons together
        if (event.type == 'NavBarButtonPress') { // this is the event type for button presses
            if (event.id == 'saveProfile') { // this is the same id field from the static navigatorButtons definition
                this.onSave();
            }
        }
    }

    onChange(e, name) {
        this.setState({ [name] : e.nativeEvent.text });
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
        return (
            <ScrollView>
                <ColWrapper>
                    <EmailText>{this.props.user.email}</EmailText>
                    <Input
                        value={this.state.fullName}
                        placeholder="Fullname"
                        onChange={e => this.onChange(e, 'fullName')}
                        // style={{ borderBottomWidth : 1 }}
                    />
                    <ColWrapper style={{ marginLeft : 10 }}>
                        <InputHeader>Work locations</InputHeader>
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
        )
    }
}

const mapStateToProps = ({ userAuthentication }) => ({
    user : userAuthentication.user
})

export default connect(mapStateToProps, { saveProfile })(EditProfile);
