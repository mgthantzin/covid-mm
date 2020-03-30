const request = require('request')
const moment = require('moment')
require('moment/locale/my')
console.log(moment.locale())

var burmeseDigits = "၀၁၂၃၄၅၆၇၈၉".split("");
  
function burmanized(input){
    return input.toString().replace(/\d/g,function(m){
        return burmeseDigits[parseInt(m)];
    });
}

var stats = (callback) => {
    var url = `https://api.covid19api.com/country/burma/status/confirmed`
    request({url, json: true}, (error, response, body) => {
            var dataC = body.reverse().slice(0,1).map(day => {        
                return {
                    date: moment(day.Date).format("LL"), // dateFormat(day.Date, 'dd mmm yyyy'),
                    total: burmanized(day.Cases)
                }
            })

            url = `https://api.covid19api.com/country/burma/status/deaths`

            request({url, json: true}, (e, r, b) => {
                var dataD = b.reverse().slice(0,1).map(day => {        
                    return {
                        date: moment(day.Date).format("LL"), // dateFormat(day.Date, 'dd mmm yyyy'),
                        total: burmanized(day.Cases)
                    }
                })

                var result = {
                    confirmed: {
                        date: dataC[0].date,
                        total: dataC[0].total
                    },
                    deaths:{
                        date: dataD[0].date,
                        total: dataD[0].total
                    }
                }
                callback(result)
            })
        })
}

module.exports = stats