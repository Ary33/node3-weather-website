const request = require('request')

const forecast = (longitude, latitude, callback) => {
    const url = 'https://api.darksky.net/forecast/4a57318670ed4adb3d6536b3fb86b2e8/' + latitude + ',' + longitude

    request({url, json: true}, (error, {body}) => {
    if (error) {
        callback('Unable to connect to weather services!', undefined)
    } else if (body.error) {
        callback('Cannot find the weather for that location. Please choose another.', undefined) 
    } else {
           callback(undefined, body.daily.data[0].summary + ' It is currently '+ body.currently.temperature + ' degrees out and there is a ' + body.currently.precipProbability + '% chance of percipitation. <br> The high today is ' + body.daily.data[0].temperatureHigh + ' and the low is going to be ' + temperatureLow + '.')
               }
    })
        
}
module.exports = forecast