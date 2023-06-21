import { Button,Input ,Form,DatePicker,Select,Radio} from 'antd'
import { useRef, useCallback, useState } from 'react'
import TopLayout from '../components/TopLayout'
import styled from 'styled-components'
import { GoogleMap,OverlayView, LoadScript,MarkerClusterer, InfoWindow,MarkerClustererF, MarkerF ,InfoBox, Marker, InfoBoxF} from '@react-google-maps/api';

import DaumPostcode from 'react-daum-postcode';
import Modal from 'react-modal'
import { useDispatch } from 'react-redux';
import { ITEM_ADD_REQUEST } from '../reducers/map';
import AddressInput from '../components/AddressInput';
const InputWrapper=styled.div`
width:500px;

margin:50px auto 0 auto;
.ant-input{
    width:500px;
    border-radius:100px;
}
` 





const post = () => {


    const [markerPosition,setMarkerPosition]=useState({
        lat:'',
        lng:''
    })

    const containerStyle = {
        width: 300,
        height: 300,  // zIndex:-1,
      
      };

      const [center,setCenter]=useState({
        lat: -3.745,
        lng: -38.523
      })

      const mapClickHandle=useCallback((e)=>{
            setMarkerPosition({
                lat:e.latLng.lat(),
                lng:e.latLng.lng()
            })
      },[markerPosition])
    

    const options = [{value:'신발',},{value:'전자기기'},{value:'음식'}];

    const dispatch=useDispatch()

    const [itemName,setItemName]=useState('')//분실물이름
    //이미지
    const [content,setContent]=useState('')//분실물내용
    const [reward,setReward]=useState(0)//사례금
    const [date,setDate]=useState()//날짜
    const [address,setAddress]=useState('')//분실주소
    const [category,setCategory]=useState('')
    const [directValue,setDirectValue]=useState('')
    const [deliveryValue,setDeliveryValue]=useState('')

    const imageInput = useRef();

    const [showModal,setShowModal]=useState(false)

  const onClickImageUpload = useCallback(() => {
    imageInput.current.click();
  }, [imageInput.current]);



  const onChangeImages=useCallback((e)=>{
    console.log('images',e.target.files)
    // const imageFormData=new FormData();
    // [].forEach.call(e.target.files,(f)=>{
    //   imageFormData.append('image',f)
    // })
    // dispatch({
    //   type:UPLOAD_IMAGES_REQUEST,
    //   data:imageFormData
    // })

  },[])

const onChangeItemName=useCallback((e)=>{
    setItemName(e.target.value)
},[itemName])

const onChangeContent=useCallback((e)=>{
    setContent(e.target.value)
},[content])

const onChangeReward=useCallback((e)=>{
    setReward(e.target.value)
},[reward])

const onChangeDate=useCallback((date,dateString)=>{
   console.log(date)
   console.log(dateString)
   
    setDate(dateString)
},[date])

// const onChangeAddress=useCallback((e)=>{
//     console.log(e.target.value)
//     },[address])

const onChangeCategory=useCallback((e)=>{
    console.log(e)
    setCategory(e)
},[category])


   
    const directOnChange=useCallback((e)=>{
        setDirectValue(e.target.value)
    },[directValue])


    const deliveryOnChange=useCallback((e)=>{
        setDeliveryValue(e.target.value)
    },[deliveryValue])

    const onComplete=useCallback((data)=>{
        console.log(data)
        setAddress(data.address)
        setShowModal(false)
    },[address])

    const showModalHandle=useCallback(()=>{
        setShowModal(true)
    },[showModal])

    const closeModal=useCallback(()=>{
        setShowModal(false)
    },[showModal])

    const onSubmit=useCallback(()=>{
        console.log(itemName,content,date,address,category,directValue,deliveryValue)
        dispatch({
            type:ITEM_ADD_REQUEST,
            data:{
                id:Math.floor(Math.random() * 101),
                name:itemName,
                content,
                image:[{
                    id:Math.floor(Math.random() * 101),
                    url:'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMzA0MjZfMTY1%2FMDAxNjgyNTIxMTI1NzEz.4aBRLNug9Kzv0BYB7uPLkykxW1pDfVSfJbvGFcizdgAg.CdgvAL-PpYhz6WimFoEj4QW8QUtkfMb1aXopy-iHFvcg.PNG.leehs0560%2Fimage.png&type=a340', 
                }],
                reward,
                createdAt:date,
                category:category[0],
                tradetype:{
                    direct:directValue,
                    delivery:deliveryValue,
                },
                address:{
                    lat:markerPosition.lat,
                    lng:markerPosition.lng
                }
            }
        })
    },[itemName,content,date,address,category,directValue,deliveryValue,markerPosition])


    // const [itemName,setItemName]=useState('')//분실물이름
    // //이미지
    // const [content,setContent]=useState('')//분실물내용
    // const [reward,setReward]=useState(0)//사례금
    // const [date,setDate]=useState('')//날짜
    // const [address,setAddress]=useState('')//분실주소
    // const [category,setCategory]=useState('')
    // const [directValue,setDirectValue]=useState('')
    // const [deliveryValue,setDeliveryValue]=useState('')
  return (
    <TopLayout>
        <InputWrapper>
        <Form onFinish={onSubmit}>
            <Form.Item
             label="제목"
            >
            <Input value={itemName} onChange={onChangeItemName} required placeholder='분실물 이름'></Input>
            </Form.Item>

            <Form.Item
             label="이미지"
            >
                {/* 1.onchange 함수가발동될때마다 이미지를 서버에 저장시키고 경로를 받아와서 리듀서에 저장후 화면에뿌린다
                    2.폼 등록 버튼을 누를때 그 이미지경로를 가져와서 디비에 저장시킨다
                */}
                <input type='file' multiple  hidden ref={imageInput} onChange={onChangeImages} ></input>
                <Button onClick={onClickImageUpload}>이미지 업로드</Button>

            </Form.Item>

            <Form.Item
             label="내용"
            >
            <Input.TextArea value={content} onChange={onChangeContent} required placeholder='내용'></Input.TextArea>
            </Form.Item>
            <Form.Item
             label="사례금"
            >
            <Input type='number' value={reward} onChange={onChangeReward} required placeholder='사례금'></Input>
            </Form.Item>
            <Form.Item
            valuePropName={'date'}
             label="분실날짜"
            >
            <DatePicker onChange={onChangeDate}></DatePicker>
            </Form.Item>
            <Form.Item
             label="추정분실주소"
            >
                <Input
                 addonBefore={<span style={{cursor:'pointer'}} onClick={showModalHandle}> 주소검색</span>}
                  value={address} 
                  
                ></Input>

                <Modal isOpen={showModal} onRequestClose={closeModal}>
                    <DaumPostcode
                    onComplete={onComplete}>
                    </DaumPostcode>
                </Modal>
                <AddressInput setCenter={setCenter} ></AddressInput>

                <LoadScript
                googleMapsApiKey="AIzaSyC7uLNsWnxCwDuA9RU1RzOsT_L58-EGrrI"
                >
                    <GoogleMap
                    onRightClick={mapClickHandle}
                        mapContainerStyle={containerStyle}
                        center={center}
                        zoom={12}
                    >
                        <MarkerF
                        position={markerPosition}></MarkerF>
                    </GoogleMap>
                </LoadScript>


            </Form.Item>
            <Form.Item
             label="카테고리"
            >
             <Select
                mode="multiple"
                size='large'
                placeholder="Please select"
                // defaultValue={['1', '2']}
                onChange={onChangeCategory}
                style={{ width: 500 }}
                options={options}
                />
            </Form.Item>
            <Form.Item
             label="배송"
            >
                <Radio.Group onChange={deliveryOnChange} value={deliveryValue}>
                    <Radio value={true}>가능</Radio>
                    <Radio value={false}>불가능</Radio>
        
                </Radio.Group>
            </Form.Item>
            <Form.Item
             label="직거래"
            >
                <Radio.Group onChange={directOnChange} value={directValue}>
                    <Radio value={true}>가능</Radio>
                    <Radio value={false}>불가능</Radio>
                    
                </Radio.Group>
            </Form.Item>
            <Button type='primary' htmlType='submit' style={{marginLeft:200}}>분실물 등록하기</Button>

        </Form>
        </InputWrapper>
    </TopLayout>
  )
}

export default post