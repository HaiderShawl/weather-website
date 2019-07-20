const express = require('express')
const path = require('path')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

//defining paths
const viewsPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')
const publicPath = path.join(__dirname, '../public')


const app = express()
const port = process.env.PORT || 3000


//setting handlebars and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialPath)


app.use(express.static(publicPath))


app.get('', (req, res) => {
    res.render('index', {
        title: 'Homepage',
        name: 'Haider'
    })
});


// app.get('/weather', (req, res) => {
//     res.render('weather', {
//         title: 'Weather',
//         name: 'Haider',
//         location: 'Srinagar',
//         weather: 'Sunny'
//     })
// });


app.get('/weather', (req, res) => {
    address = req.query.address
    if (!address) {
        return res.send({
            error: 'You must provide an address',
        })
    }

    geocode(address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({error})
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({error})
            }
            return res.send({
                location,
                forecast: forecastData,
            })
            
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('error', {
        title: 'Error Page',
        errorMessage: 'Help article not found',
        name: 'Haider'
    })
})

app.get('*', (req, res) => {
    res.render('error', {
        title: 'Error Page',
        errorMessage: 'Page not found',
        name: 'Haider'
    })
})


app.listen(port, () => {
    console.log('The server is running on port ' + port);
});