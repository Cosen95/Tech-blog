import React, { Component } from 'react';
import { HeaderWrapper, Logo, Nav, NavItem, NavSearch, Addition, Button, SearchWrapper } from './style';
class Header extends Component{
    render(){
        return(<HeaderWrapper>
            <Logo />
            <Nav>
                <NavItem className='left active'>首页</NavItem>
                <NavItem className='left'>下载APP</NavItem>
                <NavItem className='right'>登录</NavItem>
                <NavItem className='right'>
                    <i class="iconfont">&#xe636;</i>
                </NavItem>
                <SearchWrapper>
                    <NavSearch></NavSearch>
                    <i className="iconfont">&#xe6cf;</i>
                </SearchWrapper>
            </Nav>
            <Addition>
                <Button className='writting'>
                    <i class="iconfont">&#xe62b;</i>
                    写文章
                </Button>  
                <Button className='reg'>注册</Button>
            </Addition>
        </HeaderWrapper>)
    }
}

export default Header;