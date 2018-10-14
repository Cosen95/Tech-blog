import React, { Component } from 'react';
import { DetailWrapper, Content, Header } from './style';

class Detail extends Component{
    render(){
        return(
            <DetailWrapper>
                <Header>让村上春树告诉你，自​律的人有多可怕</Header>
                <Content>
                    <img src="//upload-images.jianshu.io/upload_images/13350830-7b9a9e56b66d1c16?imageMogr2/auto-orient/strip%7CimageView2/2/w/500/format/webp" alt=""/>
                    <p>
                    村上春树在《当我谈跑步时，我谈些什么》中写道：“我从一九八二年的秋天开始跑步，持续跑了将近二十三年，
                几乎每天都坚持跑步，每年至少跑一次全程马拉松——算起来，迄今共跑了二十三次，还在世界各地参加过无数次长短距离的比赛。”
                    </p>
                    <p>
                    <b>二十三年来，日日坚持，年年如此。跑步，恐怕已经成为村上的一种日常习惯，习惯成自然。因此对于村上而言，这二十三年的坚持，
                仅仅是自己自律的一种行为表现。</b>
                    </p>
                </Content>
            </DetailWrapper>
        )
    }
}

export default Detail;