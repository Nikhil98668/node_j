const UserModel = require("../model/usersModel");
const bcrypt = require("bcrypt");

function isNotValidInput(string){
  if(string==undefined || string.length==0){
      return true;
  }
  else{
      return false;
  }
}

const createNewUserController = async (req, res) => {
    try {
      const { name, email, password } = req.body;
      if(isNotValidInput(name)&&isNotValidInput(email)&&isNotValidInput(password)) {
        return res.status(400).json({ message: "All fields are mandatory" });
      } else {
        const hashedPswd = await bcrypt.hash(password, 10);
        console.log("hi");
        await UserModel.create({
          name,
          email,
          password:hashedPswd
        });
        return res.status(201).json({ UserAddedResponse: "Successfuly created new user.!" });
      }
    } catch (err) {
      if (err.name === "SequelizeUniqueConstraintError") {
        return res.status(409).json({message:"Email id already exists. Please Login or change the Email id."});
      }
      return res.status(500).json({ message: err });
    }
  };
  module.exports = {createNewUserController};
  