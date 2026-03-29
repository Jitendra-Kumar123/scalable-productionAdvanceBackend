import userModel from "../model/user.model.js"


async function registerUser(req, res){
    const {userName, email, password} = req.body;

}

export default {
    registerUser
}