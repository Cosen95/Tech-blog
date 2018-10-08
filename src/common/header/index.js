import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CSSTransition } from 'react-transition-group';
import { HeaderWrapper, 
     Logo,
     Nav,
     NavItem, 
     NavSearch, 
     Addition, 
     Button, 
     SearchWrapper, 
     SearchInfo, 
     SearchInfoTitle,
     SearchInfoSwitch,
     SearchInfoList,
     SearchInfoItem } from './style';

import { actionCreators } from './store';

class Header extends Component{
    getListArea() {
        if(this.props.focus) {
            return(
                <SearchInfo>
                    <SearchInfoTitle>热门搜索
                    <SearchInfoSwitch>换一批</SearchInfoSwitch>
                    </SearchInfoTitle>
                    <SearchInfoList>
                        {
                            this.props.list.map((item) => {
                                return  <SearchInfoItem key={item}>{item}</SearchInfoItem>
                            })
                        }
                    </SearchInfoList>
                </SearchInfo>
            )
        } else {
            return null
        }
    }
    render(){
        return (
            <HeaderWrapper>
            <Logo />
            <Nav>
                <NavItem className='left active'>首页</NavItem>
                <NavItem className='left'>下载APP</NavItem>
                <NavItem className='right'>登陆</NavItem>
                <NavItem className='right'>
                    <i className="iconfont">&#xe636;</i>
                </NavItem>
                <SearchWrapper>
                    <CSSTransition
                        in={this.props.focus}
                        timeout={200}
                        classNames="slide"
                    >
                        <NavSearch className={this.props.focus ? 'focus' : ''}
                            onFocus={this.props.handleInputFocus}
                            onBlur={this.props.handleInputBlur}
                        ></NavSearch>
                    </CSSTransition>
                    <i className={this.props.focus ? 'focus iconfont' : 'iconfont'}>&#xe6cf;</i>
                    { this.getListArea() }
                    
                </SearchWrapper>
            </Nav>
            <Addition>
                <Button className='writting'>
                    <i className="iconfont">&#xe62b;</i>
                    写文章
                </Button>  
                <Button className='reg'>注册</Button>
            </Addition>
        </HeaderWrapper>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        focus: state.getIn(['header', 'focus']),
        list: state.getIn(['header', 'list'])
        // focus: state.get('header').get('focus')
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        handleInputFocus() {
            dispatch(actionCreators.getList());
            dispatch(actionCreators.searchFocus());
        },
        handleInputBlur() {
            dispatch(actionCreators.searchBlur());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);