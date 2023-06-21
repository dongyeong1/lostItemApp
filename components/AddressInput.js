
import GeoCode from "./GeoCode";
import { Input,Button } from "antd";


function AddressInput({setCenter}) {

const handleButton = async() => {
    const currentAddr = document.getElementById("address").value;
    if (currentAddr) {
        console.log(currentAddr)
      //   return await console.log(GeoCode(currentAddr))
      const { lat, lng } = await GeoCode(currentAddr);
      setCenter({
          lat,lng
      })
      return console.log(lat,lng)
      // console.log("ddd", lat, lng);
    }
  };
  return (
    <div>
      <Input.Search  enterButton="검색" onSearch={handleButton}
 style={{width:400}} placeholder="주소를 입력하세요" id="address" />
      {/* <Button type="primary" onClick={handleButton}>클릭</Button> */}
    </div>
  );
}

export default AddressInput;
