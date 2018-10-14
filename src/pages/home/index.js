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
    HomeRight,
    BackTop
} from './style'

class Home extends Component{
    componentDidMount() {
        this.props.initHomeData();    
        this.bindEvents();    
    }
    componentWillUnMount() {
        window.removeEventListener('scroll', this.props.changeScrollTopShow)
    }
    bindEvents() {
        window.addEventListener('scroll', this.props.changeScrollTopShow)
    }
    handleScrollTop(){
        window.scrollTo(0,0);
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
                {
                    this.props.showScroll ?  <BackTop onClick={this.handleScrollTop}>回到顶部</BackTop> : null
                }  
            </HomeWrapper> 
        )
    }
}

const mapStateToProps = (state) => ({
    showScroll: state.getIn(['home','showScroll'])
})

const mapDispatchToProps = (dispatch) => ({
    initHomeData() {
        dispatch(actionCreators.getHomeInfo());
    },
    changeScrollTopShow() {
        if(document.documentElement.scrollTop > 200) {
            dispatch(actionCreators.toggleTopShow(true));
        } else {
            dispatch(actionCreators.toggleTopShow(false));
        }
    }
})
export default connect(mapStateToProps, mapDispatchToProps)(Home);