import React, { Component } from 'react';
import {
    Text,
    View,
    Image,
    StyleSheet,
    // TouchableOpacity
} from 'react-native';
import PropTypes from 'prop-types';
import style from 'styled-components';

import { navigatorStyle } from '../../../utils/navbarStyle';
import houseClean from './assets/houseClean.png';

const ComponentPress = style.TouchableOpacity`
    flex : 1;
    justify-content : center;
    flex-direction : column;
    align-items : center;
`
const SeeMoreView = style.View`
    height : 20px;
    margin-top : -10px;
    padding-right : 20px;
`

class AdvertFind extends React.Component {
    constructor() {
        super();
        this.services = [
            {
                title : 'House cleaning',
                name : 'houseCleaning',
                icon : houseClean,
            }, {
                title : 'Kitchen',
                name : 'kitchenWork',
                icon : houseClean,
            }, {
                title : 'Baby sit',
                name  : 'childCare',
                icon : houseClean
            }, {
                title : 'Car service',
                name : 'carService',
                icon : houseClean
            }, {
                title : 'Movers',
                name : 'movers',
                icon : houseClean
            }, {
                title : 'Others',
                name : 'others',
                icon : houseClean
            }
        ];
        this.toggleViewMore = this.toggleViewMore.bind(this);
        this.navigatorPush = this.navigatorPush.bind(this);
        this.state = {
            viewMore : false
        };
    }

    toggleViewMore() {
        this.setState({ viewMore : !this.state.viewMore });
    }

    navigatorPush(services) {
        this.props.navigator.push({
            screen : 'Dashboard.AdvertForm',
            title : services.title,
            passProps : { services },
            animated : 'true',
            animationType : 'fade',
            navigatorButtons : {
                rightButtons : [{
                    title: 'Submit', // for a textual button, provide the button title (label)
                    id: 'submitAdvert',
                }]
            },
            navigatorStyle
        })
    }

    render() {
        return (
            <View>
                <View style={styles.servicesCont}>
                    { !this.state.viewMore &&
                        <View style={[styles.serviceItmCont, styles['serviceItmContBig']]}>
                            <View style={[styles.serviceItm, styles[this.props.userType === 'buyer' ? 'blueItm' : 'redItm']]}>
                                <ComponentPress onPress={() => this.props.userType === 'buyer' ?
                                    this.props.getService(this.services[0].name, this.services[0].title) :
                                    this.navigatorPush(this.services[0])
                                }>
                                    <View style={[styles.itmImg, styles['serviceBgImgCont']]}>
                                        <Image
                                            source={this.services[0].icon}
                                            style={[styles['serviceBgImg']]}
                                        />
                                    </View>
                                    <Text style={styles.itmName}>{this.services[0].title}</Text>
                                </ComponentPress>
                            </View>
                        </View>
                    }
                    <View style={styles.servicesContLeft}>
                        {
                            this.services.map((serv, i) => (
                                (i && !this.state.viewMore && i < 5) || this.state.viewMore  ?
                                <View key={serv.name} style={[styles.serviceItmCont, styles['serviceItmContSmall'], this.state.viewMore && styles.serviceItmContMid]}>
                                    <View style={[styles.serviceItm, styles[this.props.userType === 'buyer' ? 'blueItm' : 'redItm']]}>
                                        <ComponentPress onPress={() =>
                                            this.props.userType === 'buyer' ?
                                                this.props.getService(serv.name, serv.title) :
                                                this.navigatorPush(serv)
                                        }>
                                            <View style={[styles.itmImg, styles['serviceSmImgCont']]}>
                                                <Image
                                                    source={serv.icon}
                                                    style={[styles['serviceSmImg']]}
                                                />
                                            </View>
                                            <Text style={styles.itmName}>{serv.title}</Text>
                                        </ComponentPress>
                                    </View>
                                </View> : null
                            ))
                        }
                    </View>
                </View>
                <SeeMoreView>
                    <ComponentPress onPress={this.toggleViewMore} style={{ alignItems : 'flex-end' }}>
                        <Text style={{ color : '#000', fontSize : 14}}>{ this.state.viewMore ? 'View less <<' : 'View more >>'}</Text>
                    </ComponentPress>
                </SeeMoreView>
                
            </View>
        );
    }
}

const styles = StyleSheet.create({
    servicesCont : {
        width : '100%',
        flexWrap : 'wrap',
        flexDirection : 'row',
        paddingTop : 10,
        paddingBottom : 20,
        paddingHorizontal : 5,
        overflow : 'scroll'
    },
    serviceItmContMid : {
        height : 100
    },
    serviceItmContBig : {
        width : '40%',
        height : 150
    },
    serviceItmContSmall : {
        width : '50%',
        height : 75
    },
    serviceItmCont : {
        padding : 5,
    },
    serviceItm : {
        flex : 1,
        alignItems : 'center',
        justifyContent : 'center',
        borderRadius : 5,
        elevation : 1
    },
    blueItm : {
        backgroundColor : '#80d4ff',
    },
    redItm : {
        backgroundColor : '#ff9999'
    },
    itmImg : {
        marginBottom : 10
    },
    itmName : {
        fontSize : 12,
        fontWeight : '600'
    },
    serviceSmImg : {
        maxWidth : 30,
        maxHeight : 30
    },
    serviceSmImgCont : {
        marginBottom : 5
    },
    servicesContLeft : {
        flex : 1,
        flexDirection : 'row',
        alignItems : 'center',
        justifyContent : 'center',
        flexWrap :'wrap'
    }
});

AdvertFind.propTypes = {
    userType : PropTypes.string.isRequired,
    navigator : PropTypes.object.isRequired
};

export default AdvertFind;
