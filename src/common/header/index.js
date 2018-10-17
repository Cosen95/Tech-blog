import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
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
import { actionCreators as loginActionCreators } from '../../pages/login/store';

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
                    <SearchInfoSwitch onClick={() => handleSwitch(pageNo, totalPage, this.spinIcon)}>
                        <i ref={(icon) => {this.spinIcon = icon}} className="iconfont spin">&#xe851;</i>
                        换一批
                    </SearchInfoSwitch>
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
        const { focus, handleInputBlur, handleInputFocus, list, login, logOut } = this.props;
        return (
            <HeaderWrapper>
            <Link to='/'>
                <Logo />
            </Link>            
            <Nav>
                <NavItem className='left active'>首页</NavItem>
                <NavItem className='left'>下载APP</NavItem>
                {
                    login ? <NavItem className='right' onClick={logOut}>退出</NavItem> : 
                    <Link to='/login'><NavItem className='right'>登陆</NavItem></Link>
                }
                
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
                            onFocus={()=>handleInputFocus(list)}
                            onBlur={handleInputBlur}
                        ></NavSearch>
                    </CSSTransition>
                    <i className={focus ? 'focus iconfont zoom' : 'iconfont zoom'}>&#xe6cf;</i>
                    { this.getListArea() }
                    
                </SearchWrapper>
            </Nav>
            <Addition>
                <Link to='/write'>
                    <Button className='writting'>
                        <i className="iconfont">&#xe62b;</i>
                        写文章
                    </Button>  
                </Link>
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
        login: state.getIn(['login', 'login']),
        // focus: state.get('header').get('focus')
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        handleInputFocus(list) {
            console.log(list);
            (list.size === 0) && dispatch(actionCreators.getList());
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
        handleSwitch(pageNo, totalPage, spin) {
            let originAngle = spin.style.transform.replace(/[^0-9]/ig,'');
            if(originAngle) {
                originAngle = parseInt(originAngle, 10);
            } else {
                originAngle = 0;
            }
            spin.style.transform = 'rotate('+(originAngle+360)+'deg)'
            if (pageNo < totalPage) {
                dispatch(actionCreators.handleSwitch(pageNo + 1));
            } else {
                dispatch(actionCreators.handleSwitch(1));
            }
        },
        logOut() {
            dispatch(loginActionCreators.logout());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);