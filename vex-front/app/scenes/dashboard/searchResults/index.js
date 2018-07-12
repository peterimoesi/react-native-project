import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import style from 'styled-components';
import{ cleanResults } from './action';
import { navigatorStyle } from '../../../utils/navbarStyle';
import { RowWrapper } from '../../../components/styledComponent';

const FlexView = style.View`
    padding : 10px 0;
    overflow : scroll;
`
const TextHead = style.Text`
    font-size : 20px;
    overflow : scroll;
`;
const SearchResultsCont = style.View`
    margin-top : 15px;
    height : 100%;
    overflow : visible;
    padding-bottom : 70px;
`;
const JobSec = style.View`
    padding : 20px 10px;
    flex : 1;
    position: relative;
    flexDirection : row;
    justify-content : space-between;
    alignItems : center;
    max-height : 200px;
`;
const JobTitle = style.Text`
    font-size : 16px;
`;
const JobDescription = style.Text`
    font-size : 14px;
    margin-bottom : 5px;
`;
const JobTime = style.Text`
    font-size : 12px;
    fontStyle : italic;
`;
const PriceView = style.View`
    position : relative;
`;
const JobPrice = style.Text`
    font-size : 20px;
    color : #246F98;
    font-weight : 600;
`;

const JobPress = style.TouchableOpacity`
    width : auto;
`

class SearchResults extends React.Component {
    componentWillUnmount() {
        this.props.cleanResults();
    }

    render() {
        const { title, results, userId, navigator } = this.props;
        const cleanResults = results.filter(res => res.user);
        return (
            <FlexView>
                <TextHead>{`${title} jobs in your area`}</TextHead>
                <SearchResultsCont>
                    <ScrollView>
                    {cleanResults.reverse().map((job, i) => (
                        <JobPress
                            key={job._id}
                            onPress={() => {
                                const navigation = {
                                    screen : 'Dashboard.JobDetails',
                                    title : job.customName || title,
                                    passProps : { title, job },
                                    animated : 'true',
                                    animationType : 'fade',
                                    navigatorButtons : {},
                                    navigatorStyle : navigatorStyle(this.props.userType)
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
                            <JobSec style={ i % 2 === 0 ? {backgroundColor : '#ededed'} : null}>
                                <View style={{ width : '70%'}}>
                                    <View>
                                        <JobTitle>
                                            {job.customName || job.user.fullName || job.user.email}
                                        </JobTitle>
                                        {
                                            job.customName &&
                                                <Text
                                                    style={{ fontSize : 12, fontStyle : 'italic', color : '#246F98', marginBottom: 16 }}
                                                > by {job.user.fullName || job.user.email}</Text>
                                        }
                                    </View>
                                    <JobDescription numberOfLines={1}>
                                        {job.description}
                                    </JobDescription>
                                    <JobTime>
                                        Time : {job.timeAvailable}
                                    </JobTime>
                                </View>
                                <PriceView>
                                    <JobPrice>{job.price} &euro;</JobPrice>
                                </PriceView>
                            </JobSec>
                        </JobPress>
                    ))}
                    </ScrollView>
                </SearchResultsCont>
            </FlexView>
        );
    }
}

SearchResults.propTypes = {
    results : PropTypes.array.isRequired,
    title   : PropTypes.string.isRequired,
    cleanResults : PropTypes.func.isRequired,
    userType : PropTypes.string.isRequired
};

function mapStateToProps({ searchResults, userAuthentication, userType }) {
    return {
        results : searchResults.results,
        userId : userAuthentication.user.id,
        userType : userType.userType
    }
};

export default connect(mapStateToProps, { cleanResults })(SearchResults);
