const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Define paths for Express config
const public = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup Handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(public))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather HSB',
        name: 'Antares'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    } geocode(req.query.address, (error, { longitude, latitude, location } = {}) => {
      if (error) {
         return res.send('Address not found. Try again')
      } forecast(longitude, latitude, (error, forecastData) => {
        if (error) {
           return res.send('Cannot find your forecast with the information provided')
        }
        res.send({
           address: req.query.address,
           forecast: forecastData,
           location: location
        })
    })
})
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About HBS',
        name: 'Antares'
    })
})

app.get('/help',(req, res) => {
    res.render('help', {
        title: 'Help HBS',
        name: 'Antares',
        msg: 'We are at your service. How can we help you?'
    })
})

app.get('/help/*',(req, res) => {
    res.render('404', {
        title: '404',
        error: 'Help article not found!',
        name: 'Antares'
    })
})

app.get('*',(req, res) => {
    res.render('404', {
        title: '404',
        error: 'Page not found!',
        name: 'Antares'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})