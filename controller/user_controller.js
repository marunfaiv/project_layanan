const user_model = require('../model/user_model')
const response = require('../config/response_config')
const bcrypt = require('bcrypt')

exports.registration = (data) =>
    new Promise((resolve, reject) => {
        // console.log(data)
        user_model.findOne({ userName: data.userName })
            .then(user => {
                if (user) {
                    resolve(response.commonErrorMsg('username is already taken'))
                } else {
                    bcrypt.hash(data.password, 10, (err, hash) => {
                        if (err) {
                            reject(response.commonErrorMsg)
                        } else {
                            data.password = hash
                            user_model.create(data)
                                .then(() => resolve(response.commonSuccessMsg('registration success!')))
                                .catch(() => reject(response.commonErrorMsg('registration failed')))
                        }
                    })
                }
            }).catch(() => reject(response.commonError))
    })


exports.login = (data) =>
    new Promise((resolve, reject) => {
        user_model.findOne({
            userName: data.userName
        }).then(user => {
            if (user) {
                if (bcrypt.compareSync(data.password, user.password)) {
                    resolve(response.commonResult(user))
                } else {
                    reject(response.commonErrorMsg('Wrong password'))
                }
            } else {
                reject(response.commonErrorMsg('Username not found'))
            }
        })
    })