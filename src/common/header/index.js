import React, { Component } from 'react';
import { CSSTransition } from 'react-transition-group';
import { HeaderWrapper, Logo, Nav, NavItem, NavSearch, Addition, Button, SearchWrapper } from './style';


class Header extends Component{
    constructor(props) {
        super(props);
        this.state = {
            focus: false
        }
    }
    handleInputFocus = ()=> {
        this.setState({
            focus: true
        })
    };
    handleInputBlur = ()=> {
        this.setState({
            focus: false
        })
    }
    render(){
        return(<HeaderWrapper>
            <Logo />
            <Nav>
                <NavItem className='left active'>首页</NavItem>
                <NavItem className='left'>下载APP</NavItem>
                <NavItem className='right'>登录</NavItem>
                <NavItem className='right'>
                    <i className="iconfont">&#xe636;</i>
                </NavItem>
                <SearchWrapper>
                    <CSSTransition
                        in={this.state.focus}
                        timeout={200}
                        className="slide"
                    >
                        <NavSearch className={this.state.focus ? 'focus' : ''}
                            onFocus={this.handleInputFocus}
                            onBlur={this.handleInputBlur}
                        ></NavSearch>
                    </CSSTransition>
                    <i className={this.state.focus ? 'focus iconfont' : 'iconfont'}>&#xe6cf;</i>
                </SearchWrapper>
            </Nav>
            <Addition>
                <Button className='writting'>
                    <i className="iconfont">&#xe62b;</i>
                    写文章
                </Button>  
                <Button className='reg'>注册</Button>
            </Addition>
        </HeaderWrapper>)
    }
}

export default Header;