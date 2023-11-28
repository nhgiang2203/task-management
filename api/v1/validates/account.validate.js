module.exports.account = (req, res, next) => {
  if(!req.body.fullName){
    res.json({
      code: 400,
      message: "Tên trống !"
    })
    return;
  }
  if(!req.body.email){
    res.json({
      code: 400,
      message: "Email trống !"
    })
    return;
  }
  if(!req.body.password){
    res.json({
      code: 400,
      message: "Mật khẩu trống !"
    })
    return;
  }
  next();
}