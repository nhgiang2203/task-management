module.exports.createPost = (req, res, next) => {
  if(!req.body.title){
    res.json({
      code: 400,
      message: "Tiêu đề trống !"
    })
    return;
  }
  next();
}