const express = require("express");
const { check, validationResult } = require("express-validator/check");
const router = express.Router();
const path = require("path");
const UserModel = require("../database/models/user");
// api add user 
router.post("/create", [
    check("fullname", "Please Enter a Valid name")
    .not()
    .isEmpty(),
    check("email", "Please enter a valid email").isEmail(),
    check("password", "Please enter a valid password with min length is 6").isLength({
    min: 6
  })
  ], async (req, res) => {
  try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          // errors: errors.array()
          message:"param is not valid"
        });
      }
      const { password, email,fullname,image } = req.body;
      var imageName = Buffer.from(email).toString('base64');
      pathImage= saveFile(image,imageName);
      let user = await UserModel.findOne({email});
      if(user){
        return res.status(400).json({
          message: "User already exits",
          errorCode : 1
        });
        
      }else{
      var userDoc = UserModel({
        "fullname": fullname,
        'password': password,
        'email': email,
        'image': pathImage
      });
      await userDoc.save();
      return res.json({
        message: "Register success"
      });
    }
  } catch (e) {
    return res.status(500).json({
      message: "error " + e,
      errorCode: 1000,
    });
  }
});

router.get("/read", async (req, res) => {
  try {
  var results = await UserModel.find({});
  return res.json(results);
  }catch (e) {
    res.send({ message: "Error" + e});
  }

});
/*router.post("/delete", async (req, res) => {
  try {
    console.log(req.body);
    const {email} = req.body;
    var results = await UserModel.findOneAndRemove({email});
    return res.json(results);
  }catch (e) {
    res.send({ message: "Error" + e});
  }
});
router.post("/update", async (req, res) => {
  try {
    console.log(req.body);
    const {email} = req.body;
    var results = await UserModel.findOneAndUpdate({email},req.body);
    return res.json(results);
  }catch (e) {
    res.send({ message: "Error" + e});
  }
});*/
function saveFile(base64, imageName){
  var fileName = path.resolve('./public') + "/uploads/"+imageName+".png";
  var pathImage = '/public/uploads/'+ imageName+".png";
  require("fs").writeFile(fileName, base64, 'base64', function(err) {
  });
  return pathImage;
}
module.exports = router;