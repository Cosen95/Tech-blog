import React from 'react';
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


const getListArea = (show)=> {
    if(show) {
        return(
            <SearchInfo>
                    <SearchInfoTitle>热门搜索
                    <SearchInfoSwitch>换一批</SearchInfoSwitch>
                    </SearchInfoTitle>
                    <SearchInfoList>
                        <SearchInfoItem>小程序</SearchInfoItem>
                        <SearchInfoItem>区块链</SearchInfoItem>
                        <SearchInfoItem>新零售</SearchInfoItem>
                        <SearchInfoItem>设计</SearchInfoItem>
                        <SearchInfoItem>交互</SearchInfoItem>
                        <SearchInfoItem>公众号</SearchInfoItem>
                        <SearchInfoItem>投稿</SearchInfoItem>
                    </SearchInfoList>
                </SearchInfo>
        )
    } else {
        return null
    }
}

const Header = (props)=> {
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
                    in={props.focus}
                    timeout={200}
                    classNames="slide"
                >
                    <NavSearch className={props.focus ? 'focus' : ''}
                        onFocus={props.handleInputFocus}
                        onBlur={props.handleInputBlur}
                    ></NavSearch>
                </CSSTransition>
                <i className={props.focus ? 'focus iconfont' : 'iconfont'}>&#xe6cf;</i>
                { getListArea(props.focus) }
                
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

const mapStateToProps = (state) => {
    return {
        focus: state.getIn(['header', 'focus'])
        // focus: state.get('header').get('focus')
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        handleInputFocus() {
            dispatch(actionCreators.searchFocus());
        },
        handleInputBlur() {
            dispatch(actionCreators.searchBlur());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);