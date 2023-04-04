import axios from "axios";

const getAddress = (lat, long) => {
    let YOUR_API_KEY = "AIzaSyDPV99Wcs3FGPixaYNVx2ZNEs_TzyapkVs";
    axios.
    //get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=${YOUR_API_KEY}`)
    get("https://www.mapquestapi.com/geocoding/v1/reverse?key=TPWvRrsfpgGWBACqqXd94fbDcfVpy2WJ&location="+lat+"%2C"+long+"&outFormat=json&thumbMaps=false")
    .then((response)=>{
        console.log('response : ', response.data.results[0].locations[0]);
    })
    // setAddress(response.data.results[0].formatted_address);
    // console.log('address : ', response.data.results[0].formatted_address)
};

export {
    getAddress
}