import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DetailWrapper, Content, Header } from './style';
import { actionCreators } from './store'

class Detail extends Component{
    componentDidMount() {
        this.props.getDetail(this.props.match.params.id)
    }
    render(){
        const { title, content } = this.props;
        return(
            <DetailWrapper>
                <Header>{title}</Header>
                <Content dangerouslySetInnerHTML={{__html: content}} />   
            </DetailWrapper>
        )
    }
}

const mapStateToProps = (state) => ({
    title: state.getIn(['detail','title']),
    content: state.getIn(['detail', 'content'])
})

const mapDispatchToProps = (dispatch) => ({
    getDetail(id) {
        dispatch(actionCreators.getDetail(id))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Detail);