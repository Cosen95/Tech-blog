import React, { Component } from 'react';
import { connect } from 'react-redux';
import Topic from './components/Topic';
import List from './components/List';
import Recommend from './components/Recommend';
import Writer from './components/Writer';
import axios from '../../util/request';
import {
    HomeWrapper,
    HomeLeft,
    HomeRight
} from './style'

class Home extends Component{
    componentDidMount(){
        axios.ajax({
            url: '/home_list',
            method: 'get',
            data: {
                params:{ id:333}
            }
       }).then((res) => {
           console.log(res);
           const result = res.data;
           const action = {
               type: 'init_home_data',
               topicList: result.topicList,
               articleList: result.articleList,
               recommendList: result.recommendList
           }
           this.props.initHomeData(action);
       })
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
    initHomeData(action) {
        dispatch(action);
    }
})
export default connect(null, mapDispatchToProps)(Home);