const express = require('express')
const path = require('path')
const hbs = require('hbs')
const chalk = require('chalk')
const weather = require('./utils/weather.js')
const qrCode = require(`./utils/qr-code.js`)
const { title } = require('process')

const app = express()

// Express cfg paths
const publicDirPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath =  path.join(__dirname, '../templates/partials')

// Hbs setup
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)


// Static dir setup
app.use(express.static(publicDirPath))

app.use(express.json())

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather & QR app',
        name: 'sCorn3l'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: `Tipa aici trebuia sa fie ceva text care sa te ajute sa te razbiresti cu site-ul ista, da hz ce sa scriu.`,
        title: 'Scoraia pomashi',
        name: 'sCorn3l'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'Despre',
        name: 'sCorn3l'
    })
})

app.get('/qr', (req, res) => {
    res.render('qr',{
        title: 'Qr Generator',
        name: 'sCorn3l'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: `vezi ca ai uitat sa pui calumea adresa ceainikule`
        })
    }
    weather(req.query.address, (error, weatherData) => {
        if (error) {
            return res.send({error})
        } else {
            res.send(weatherData)
        }
        
    })
})

app.post('/qr-api', (req, res) => {
    if (!req.body.data) {
        return res.send({
            error: `vezi ca ai uitat sa pui textul din qr`
        })
    }
    qrCode(req.body, (error, qrData) => {
        if (error) {
            return res.send({error})
        } else {
            res.send(qrData)
        }
        
    })
})

app.get('/jora', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: `we pl unde ii ?search= ????`
        })
    }
    
    console.log(req.query.search)
    res.send({
        products: []
    })
    
})

app.get('/help/*', (req,res) => {
    res.render('404',{
        title: 'ne tuda cauti pomashi',
        name: 'sCorn3l',
        errorMsg: 'nu am gasit nixuia pomashi aisi'
    })
})

app.get('*', (req, res) => {
    res.render('404',{
        title: 'Ne tuda papal',
        name: 'sCorn3l',
        errorMsg: 'ne tuda papal ciota, uite poate gasesti oleaca mai sus ce cauti'
    })
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`----------------------------------`)
    console.log(`Serveru ii zavodit pe portu ${PORT}!`)
    console.log(`----------------------------------`)
})



// app.get('', (req, res) => {

// })

