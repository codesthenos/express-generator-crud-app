import bcrypt from 'bcryptjs'

import debug from '../lib/debugFunction.js'
import User from '../models/user.model.js'
import createAccessToken from '../lib/jwebtoken.js'

export const registerController = async (req, res) => {
  const { userName, email, password } = req.body
  debug('FIELDS:', '\n', 'userName: ', userName, '\n', 'email:', email, '\n', 'password: ', password)

  // hash the password before sending to the database
  const hashedPassword = await bcrypt.hash(password, 10)

  // create js object with the user data wanted to send to the database
  const newUser = new User({
    userName,
    email,
    password: hashedPassword
  })
  // debug('newUser:', '\n', newUser)

  try {
    // throw new Error('FORCED')
    // insert user in the DATABASE
    const savedUser = await newUser.save()
    // create the token with jsonwebtoken
    const token = await createAccessToken({ id: savedUser._id })
    // send the cookie with token info
    res.cookie('token', token)
    // send the data needed to make the view
    res.status(200).json({
      id: newUser.id,
      userName: newUser.userName,
      email: newUser.email,
      createdAt: newUser.createdAt,
      updatedAt: newUser.updatedAt
    })
    debug('newUser:', '\n', newUser, '\n', 'REGISTERED')
  } catch (error) {
    res.status(500).json({ message: error.message })
    debug(error)
  }
}

export const loginController = (req, res) => {
  res.send('LOGIN')
}
