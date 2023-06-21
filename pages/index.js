import { Input,Button } from 'antd'
import React, { useCallback } from 'react'
import TopLayout from '../components/TopLayout'
import styled from 'styled-components'
import { UserOutlined,SearchOutlined,CaretRightOutlined,CaretLeftOutlined  } from '@ant-design/icons';
import { useRouter } from 'next/router';
import GeoCode from '../components/GeoCode';
import { useDispatch } from 'react-redux';
import { SEARCH_LOCATION_REQUEST } from '../reducers/map';

const SearchWrapper=styled(Input)`
margin:40px auto;
border-radius:200px;
height:50px;
width:500px;
font-size:25px;
`




const index = () => {
    const router=useRouter();

    const dispatch=useDispatch();

    const handleButton = async() => {
        const currentAddr = document.getElementById("address").value;
        if (currentAddr) {
            console.log(currentAddr)
          //   return await console.log(GeoCode(currentAddr))
          const { lat, lng } = await GeoCode(currentAddr);
        dispatch({
            type:SEARCH_LOCATION_REQUEST,
            data:{lat,lng}
        })
        router.push('/map')

          return console.log(lat,lng)
          // console.log("ddd", lat, lng);
        }
      };



    // const areaSearch=useCallback(()=>{

    //     handleButton()
       
    //   },[])

  return (
    <TopLayout>
                <div>지역을 검색해보세요</div>

        <SearchWrapper
         prefix={<SearchOutlined style={{fontSize:30}}/>}
         placeholder='지역을 검색해보세요'
         size="large"
         id="address"
         onPressEnter={handleButton}
        >

        
        
        </SearchWrapper>
        {/* <Button>검색하기</Button> */}

    </TopLayout>
  )
}

export default index