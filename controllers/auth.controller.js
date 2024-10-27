import bcrypt from 'bcryptjs'

import debug from '../debugFunction.js'
import User from '../models/user.model.js'

export const registerController = async (req, res) => {
  const { userName, email, password } = req.body
  // debug('FIELDS:', '\n', 'username: ', userName, '\n', 'email:', email, '\n', 'password: ', password)

  const hashedPassword = await bcrypt.hash(password, 10)

  const newUser = new User({
    userName,
    email,
    password: hashedPassword
  })
  // debug('newUser:', '\n', newUser)

  try {
    // throw new Error('FORZADO')
    await newUser.save()
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
