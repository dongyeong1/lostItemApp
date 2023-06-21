import { Button, Input } from 'antd'
import styled from 'styled-components'
import TopLayout from '../components/TopLayout';
import { UserOutlined,LogoutOutlined} from '@ant-design/icons';
import { useCallback ,useState} from 'react';
import Link from 'next/link';



const InputWrapper = styled.div`
margin:auto;
width:340px;
margin-top:180px;
  .ant-input{
      margin-top:40px;
    display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center ;
  border-radius:100px;
  width:340px;
    


 
`;

const Buttons=styled(Button)`
width:100px;
height:40px;
border-radius:100px;
margin-top:50px;
margin-left:120px;
`


const signup = () => {

    const [email,setEmail]=useState('');
    const [nickname,setNickname]=useState('')
    const [password,setPassword]=useState('')
    // const [checkPassword,setCheckPassword]=useState('')
    const [passwordError,setPasswordError]=useState(false)

    const onChangeEmail=useCallback((e)=>{
        setEmail(e.target.value)
    },[email])
    const onChangeNickname=useCallback((e)=>{
        setNickname(e.target.value)
    },[nickname])
    const onChangePassword=useCallback((e)=>{
        setPassword(e.target.value)
    },[password])
    const onChangeCheckPassword=useCallback((e)=>{
        setPasswordError(e.target.value!==password)
    },[password])
  return (
      
      <TopLayout>
          <InputWrapper>
        <Input type='email' name="user-email" value={email} onChange={onChangeEmail} size='large' placeholder='이메일을 입력해주세요' />
        <Input  value={nickname} onChange={onChangeNickname} size='large'placeholder='닉네임을 입력해주세요'/>

        <Input type='password' value={password} onChange={onChangePassword} size='large'placeholder='비밀번호를 입력해주세요'/>
        <Input type='password'  onChange={onChangeCheckPassword} size='large'placeholder='비밀번호를 한번더 입력해주세요'/>
        {passwordError&&<div style={{color:'red'}}>비밀번호가 맞지않습니다</div>}
        <Buttons type='primary' className='btn'>회원가입</Buttons>
        </InputWrapper>
        <div style={{width:140 ,margin:'auto',marginTop:30}}> 이미회원이라면? <Link href='/login'><span>로그인</span></Link></div>
    </TopLayout>
    
  )
}

export default signup