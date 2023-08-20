import User from "../models/User.js";

//update user
export const updateUser=async (req, res,next) => {

    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id,
            { $set: req.body }, { new: true });
        res.status(200).json("Updated successfully")
    } catch (error) {
        next(err)
    }
}

//delte user

export const deleteUser=async (req, res,next) => {

    try {
      await User.findByIdAndDelete(req.params.id);
        res.status(200).json("User will deleted ")
    } catch (error) {
        next(err)
    }
}

//get user
export const getUser=async (req, res,next) => {
    try {
        const user = new User.findById(req.params.body);
        res.status(200).json(user)
    } catch (error) {
        next(err)
    }
}

//get user all
export const getUsers=async (req, res,next) => {

    // const failed =true;
    // if(failed) return next(createError(401,"You are not Authenticated"))
   
    try {
        const users = await User.find({});
        res.status(200).json(users)
    } catch (error) {
        next(err)
    }
}