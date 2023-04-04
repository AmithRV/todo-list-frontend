import axios from "axios";
import { sendCurrentLocation } from "./request";

const getAddress = (lat, long) => {
    
    //get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=${YOUR_API_KEY}`)
    axios.get("https://www.mapquestapi.com/geocoding/v1/reverse?key=TPWvRrsfpgGWBACqqXd94fbDcfVpy2WJ&location="+lat+"%2C"+long+"&outFormat=json&thumbMaps=false")
    .then((response)=>{
        console.log('response : ', response.data.results[0].locations[0]);
        sendCurrentLocation(response.data.results[0].locations[0]);
    })
};

export {
    getAddress
}