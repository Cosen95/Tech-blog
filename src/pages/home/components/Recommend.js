import React, { Component } from 'react';
import { connect } from 'react-redux';

import { RecommendWrapper, RecommendItem } from '../style';

class Recommend extends Component{
    render(){
        return(
            <RecommendWrapper>
                {
                    this.props.recommendList.map((item) => {
                        return(
                            <RecommendItem imgUrl={item.get('imgUrl')} key={item.get('id')}></RecommendItem>
                        )
                    })
                }
            </RecommendWrapper>    
        )
    }
}

const mapStateToProps = (state) => {
    return{
        recommendList: state.getIn(['home', 'recommendList'])
    }
}

export default connect(mapStateToProps, null)(Recommend);