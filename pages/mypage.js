import { Row,Card ,Col,Avatar} from 'antd'
import React from 'react'
import { UserOutlined } from '@ant-design/icons';

import TopLayout from '../components/TopLayout'
import { useSelector } from 'react-redux';

const mypage = () => {
    const {user}=useSelector((state)=>state.user)
  return (
      <TopLayout>    
          <Row>
              <Col xs={24} md={8}  >

                <Card style={{marginTop:50,marginRight:50,marginBottom:50,marginLeft:100,height:610,borderRadius:20}}>
                <Avatar style={{marginLeft:40,marginTop:50}} size={200} icon={<UserOutlined />} />
                    <div style={{marginLeft:10,marginTop:50 }}>
                        <h1>이메일</h1>
                        <p>{user.email}</p>
                        <h1>닉네임</h1>
                        <p>{user.nickname}</p>
                    </div>
                
                </Card>

              </Col>
              <Col xs={24} md={16} >

                <Card style={{marginTop:50,marginRight:100,marginBottom:50,marginLeft:50, height:280,borderRadius:20}}>
                   <div><h2>등록한 분실물</h2> </div>
                </Card>
                <Card  style={{marginTop:50,marginRight:100,marginBottom:50,marginLeft:50,height:280,borderRadius:20}}>
                    <div><h2>찾아준 분실물</h2> </div>      
                </Card>    

              </Col>
          </Row>
      </TopLayout>
  )
}

export default mypage