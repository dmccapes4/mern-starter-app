import mongoose from 'mongoose'

// import models
import User from '../models/user.server.model'

export const getUsers = (req, res) => {
    User.find().exec((err, users) => {
        if (err) {
            return res.json( { 'success': false, 'message': 'error' ,'error': err })
        }
        return res.json({ 'success': true, 'message': 'users fetched', users })
    })
}

export const addUser = (req, res) => {
    const newUser = new User(req.body)
    newUser.save((err, user) => {
        if (err) {
            return res.json({ 'success': false, 'message': 'error', 'error': err })
        }
        return res.json({ 'success': true, 'message': 'user added', user })
    })
}

export const updateUser = (req, res) => {
    User.findOneAndUpdate({ __id:req.body.id }, req.body, { new:true }, (err, user) => {
        if (err) {
            return res.json({ 'success': false, 'message': 'error', err })
        }

    })
}

export const getUser = (req, res) => {
    User.find({__id:req.params.id}).exec((err, user) => {
        if (err) {
            return res.json({ 'success': false, 'message': 'error'})
        } else if (user.length) {
            return res.json({ 'success':true, 'message':'user fetched', user })
        } else {
            return res.json({ 'success':false, 'message': 'user not found' })
        }
    })
}

export const deleteUser = (req, res) => {
    User.findByIdAndRemove(req.params.id, (err, user) => {
        if (err) {
            return res.json({ 'success': false, 'message': 'error' })
        }
        return res.json({ 'success': true, 'message': `${user.username} deleted`})
    })
}