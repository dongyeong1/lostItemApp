import React from 'react'
import styled from 'styled-components'
import Link  from 'next/link'
import { Popover,Badge, notification } from 'antd'
import { useSelector } from 'react-redux'

const LayoutWrapper=styled.div`
height:50px;
background-color:lightgray;
display:flex;
flex-direction:row;
justify-content: space-between;
align-items: center ;

.login{
    margin-right:20px;
}
.noti{
    margin-left:200px;
}
.home{
    margin-left:20px;
}
.post{
    margin-left:50px;
}
`


const ContentWrapper=styled.div`

`
const TopLayout = ({children}) => {

    const {user}=useSelector((state)=>state.user)

    const notificationCount=user.notification.filter((v)=>v.read!==true)
  return (
      <div>
    <LayoutWrapper>

        <Link href="/"><span className='home'>홈</span></Link>
        <Link href="/post">  <span className='post'>분실물 등록</span></Link>

       
        <Link href="/map"> <span className='map'>분실물 보기</span></Link>
        <Link href="/signup"> <span className='map'>회원가입</span></Link>
        <Badge count={notificationCount.length}>
            <Popover
                content={<div>
                    {user.notification.map((v)=>(
                    <p>{v.message}</p>

                    ))}
                </div>}
            >
        
             <span className='noti'>알림</span>
         </Popover>
    </Badge>
        <Link href="/chat"> <span className='chat'>채팅</span></Link>
        <Link href="/login"> <span className='login'>로그인</span></Link>
        

    </LayoutWrapper>
    <ContentWrapper>
        {children} 
           </ContentWrapper>
           </div>
  )
}

export default TopLayout