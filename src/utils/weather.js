const request = require('request')


const weather = (address, callback) => {

    const url = `http://api.weatherapi.com/v1/current.json?key=1b8a82b55d2846ba8ec141244240908&q=${encodeURIComponent(address)}&aqi=no`

    request({url, json: true}, (error, {body} = {}) => {
        if (error) {
            callback(`Nu merge sfiaziu :/`,undefined)
        } else if (body.error){
            callback(`Nu merge navigatoru :/`,undefined)
        } else {
            callback(undefined, {
                address,
                locationName: `${body.location.name}, ${body.location.country}`,
                coords: `${body.location.lat}, ${body.location.lon}`,
                temperature: body.current.temp_c,
                windSpeed: body.current.wind_kph
            })
        }
    })
}


module.exports = weather