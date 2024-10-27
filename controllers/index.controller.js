const indexController = (req, res, next) => {
  res.render('index', { title: 'Express' })
}
export default indexController
