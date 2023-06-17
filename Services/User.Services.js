const User = require("../Models/User")

exports.createUserServices = async (userInfo) => {
    const user = await User.create(userInfo)
    return user
}

exports.getUserServices = async () => {
    const user = await User.find()
    return user
}