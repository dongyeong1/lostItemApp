
import Geocode from 'react-geocode'
const API_KEY='AIzaSyC7uLNsWnxCwDuA9RU1RzOsT_L58-EGrrI'

Geocode.setApiKey(API_KEY)
Geocode.setLanguage('ko')
Geocode.setRegion('kr')
Geocode.enableDebug()

const GeoCode = async (currentAddr) => {
    return Geocode.fromAddress(currentAddr)
    .then(
        (response) => {
            console.log('res',response)
          const { lat, lng } = response.results[0].geometry.location;
          console.log(lat, lng);
          return {lat,lng}
        })
        .catch(error => {
          console.error(error);
        }
      );
}

export default GeoCode 