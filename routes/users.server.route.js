import express from 'express'

// import controller file
import * as usersController from '../controllers/users.server.controller'

// get an instance of express router
const router = express.Router()

router.route('/')
    .get(usersController.getUsers)
    .post(usersController.addUser)

router.route('/:id')
    .get(usersController.getUser)
    .delete(usersController.deleteUser)

export default router;