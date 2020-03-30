const path = require('path')
const express = require('express')
const stats = require('./stats')

const app = express()

app.set('view engine', 'hbs')
app.use(express.static(path.join(__dirname, '../public')))

app.get('', (req, res) => {
    //res.render('index')
    stats((data) => {
        console.log(data)
        res.render('index', {
            cTotal: data.confirmed.total,
            cDate: data.confirmed.date,
            dTotal: data.deaths.total,
            dDate: data.deaths.date
        })
    })
})

app.get('/stats', (req, res) => {
    stats((data) => res.json(data))
})

app.listen(process.env.PORT || 3000, () => {  
    console.log("server is up on port 3000")
})

