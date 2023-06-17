const { createUserServices } = require("../Services/User.Services");

exports.createUser = async (req, res, next) => {
    try {
      const result = await createUserServices(req.body);
      res.status(200).json({ status: "success",message:"User create successfully", data: result });
    } catch (error) {
      res.status(400).send({
        message: "some thing went wrong",
        error: error.message,
      });
    }
}


exports.getUser = async (req, res, next) => {
  try {
    const result = await getUserServices();
    res.status(200).json({ status: "success",message:"User create successfully", data: result });
  } catch (error) {
    res.status(400).send({
      message: "some thing went wrong",
      error: error.message,
    });
  }
}