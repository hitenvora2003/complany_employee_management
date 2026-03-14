// token
// token true , false
// user verify

const USER = require("../model/signup");
const jwt = require("jsonwebtoken");

exports.authCheck = async (req, res, next) => {
  console.log("Hello your time start now");
  try {
    const token = req.headers.authorization;
    console.log(token);
    if (!token) throw new Error('Attach token')

    const tokenverify = jwt.verify(token, "ten")
    console.log(tokenverify);

    if (!tokenverify) throw new Error('Invalid token')



    const userVerify = await USER.findById(tokenverify.id);
    // console.log(userVerify);

    if (!userVerify) throw new Error('Invalid User')

    next()

  }
  catch (error) {
    res.status(404).json({
      status: "Failed",
      message: error.message
    });
  }

};
