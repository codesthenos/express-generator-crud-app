import debug from '../debugFunction.js'
import User from '../models/user.model.js'

export const registerController = async (req, res) => {
  const { userName, email, password } = req.body
  // debug('FIELDS:', '\n', 'username: ', userName, '\n', 'email:', email, '\n', 'password: ', password)

  const newUser = new User({
    userName,
    email,
    password
  })
  // debug('newUser:', '\n', newUser)

  try {
    await newUser.save()
    res.send(`${newUser}\n\nREGISTERED`)
    debug('newUser:', '\n', newUser, '\n', 'REGISTERED')
  } catch (error) {
    debug(error)
  }
}

export const loginController = (req, res) => {
  res.send('LOGIN')
}
