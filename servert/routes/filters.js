const r = require('express').Router()
const connection = require('../config/mysql.js')


r.post('/', (req, res) => {
    try {
        console.log(req);
        const data = req.body
        console.log("dkfkfmfkefm", data)
        const sql = `SELECT * FROM biometric where ${data.filterHead} = '${data.filterValue}'`
        connection.query(sql, (err, rows) => {
            if (err) {
                res.status(400).send(err)
            }

            res.status(200).send(rows)
        })
    } catch (error) {
        res.status(400).send(error)
    }
})
 
module.exports = r