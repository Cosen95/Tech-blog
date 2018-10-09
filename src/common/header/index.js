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
        const { focus, list, pageNo, totalPage, mouseIn, handleMouseEnter, handleMouseLeave, handleSwitch } = this.props;
        const newList = list.toJS();
        const serachList = [];
        if(newList.length) {
            for(let i = (pageNo -1) * 10;i<pageNo * 10;i++) {
                serachList.push(
                    <SearchInfoItem key={newList[i]}>{newList[i]}</SearchInfoItem>
                )
            }
        }
        
        if(focus || mouseIn) {
            return(
                <SearchInfo onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                    <SearchInfoTitle>热门搜索
                    <SearchInfoSwitch onClick={() => handleSwitch(pageNo, totalPage)}>换一批</SearchInfoSwitch>
                    </SearchInfoTitle>
                    <SearchInfoList>
                        {serachList}
                    </SearchInfoList>
                </SearchInfo>
            )
        } else {
            return null
        }
    }
    render(){
        const { focus, handleInputBlur, handleInputFocus } = this.props;
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
                        in={focus}
                        timeout={200}
                        classNames="slide"
                    >
                        <NavSearch className={focus ? 'focus' : ''}
                            onFocus={handleInputFocus}
                            onBlur={handleInputBlur}
                        ></NavSearch>
                    </CSSTransition>
                    <i className={focus ? 'focus iconfont' : 'iconfont'}>&#xe6cf;</i>
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
        list: state.getIn(['header', 'list']),
        pageNo: state.getIn(['header', 'pageNo']),
        mouseIn: state.getIn(['header', 'mouseIn']),
        totalPage: state.getIn(['header', 'totalPage']),
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
        },
        handleMouseEnter() {
            dispatch(actionCreators.handleMouseEnter());
        },
        handleMouseLeave() {
            dispatch(actionCreators.handleMouseLeave());
        },
        handleSwitch(pageNo, totalPage) {
            if (pageNo < totalPage) {
                dispatch(actionCreators.handleSwitch(pageNo + 1));
            } else {
                dispatch(actionCreators.handleSwitch(1));
            }
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);