const router = require('express').Router()
const connection  = require('../config/mysql.js')

router.post('/', (req, res) => {
    try {
        const data = req.body
        console.log(data)
        const sql = `INSERT INTO biometric (name, age, gender, address, state, typeofgrowth) VALUES ('${data.name}', '${data.age}', '${data.gender}', '${data.address}', '${data.state}', '${data.typeofgrowth}')`
        connection.query(sql, (err, rows) => {
            if (err) {
                res.status(400).send(err)
            }
            res.status(200).send('success');
        })
    }catch (error) {
        res.status(400).send(error)
    }
})

router.get('/', (req, res) => {
    try {
        const sql = `SELECT * FROM biometric`
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

module.exports = router