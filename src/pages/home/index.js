import React, { Component } from 'react';
import { connect } from 'react-redux';
import Topic from './components/Topic';
import List from './components/List';
import Recommend from './components/Recommend';
import Writer from './components/Writer';
import { actionCreators } from './store'
import {
    HomeWrapper,
    HomeLeft,
    HomeRight
} from './style'

class Home extends Component{
    componentDidMount(){
        this.props.initHomeData();        
    }
    render(){
        return(
            <HomeWrapper>
                <HomeLeft>
                    <img className="branner-img" src="//upload.jianshu.io/admin_banners/web_images/4501/572782ecf027e81f518edce85f98036e88beb290.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/1250/h/540" alt=""/>
                    <Topic />
                    <List />
                </HomeLeft>
                <HomeRight>
                    <Recommend />
                    <Writer />
                </HomeRight>
            </HomeWrapper> 
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    initHomeData() {
        const action = actionCreators.getHomeInfo();
        dispatch(action);
    }
})
export default connect(null, mapDispatchToProps)(Home);