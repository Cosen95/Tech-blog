import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ListItem, ListInfo, LoadMore } from '../style';
import { actionCreators } from '../store'

class List extends Component{
    render(){
        const { articleList, getMoreList, pageNo } = this.props;
        return(
            <div>
                {
                    articleList.map((item,index) => {
                        return(
                            <ListItem key={index}>
                                <img className="list-pic" src={item.get('imgUrl')} alt=""/>
                                <ListInfo>
                                    <h3 className="title">{item.get('title')}</h3>
                                    <p className="desc">{item.get('desc')}</p>
                                </ListInfo>
                            </ListItem>    
                        )
                    })
                }
                <LoadMore onClick={() => getMoreList(pageNo)}>更多文章</LoadMore>
            </div> 
        )
    }
}

const mapStateToProps = (state) => {
    return {
        articleList: state.getIn(['home', 'articleList']),
        pageNo: state.getIn(['home', 'articlePage'])
    }
}

const mapDispatchToProps = (dispatch) => ({
    getMoreList(pageNo) {
        dispatch(actionCreators.getMoreList(pageNo))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(List);