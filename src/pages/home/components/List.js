import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { ListItem, ListInfo, LoadMore } from '../style';
import { actionCreators } from '../store';
import { Link } from 'react-router-dom';

class List extends PureComponent{
    render(){
        const { articleList, getMoreList, pageNo } = this.props;
        return(
            <div>
                {
                    articleList.map((item,index) => {
                        return(
                            <Link key={index} to='/detail'>
                                <ListItem key={index}>
                                    <img className="list-pic" src={item.get('imgUrl')} alt=""/>
                                    <ListInfo>
                                        <h3 className="title">{item.get('title')}</h3>
                                        <p className="desc">{item.get('desc')}</p>
                                    </ListInfo>
                                </ListItem>    
                            </Link>    
                            
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