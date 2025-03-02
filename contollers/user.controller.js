import User from "../models/user.model.js";

export const getUsers = async (req,res, next) => {

    try{

        const users = await User.find();

        res.status(200).json({success: true, data: users});

    }catch(error){
        next(error);
    }
};

export const getUser = async (req,res, next) => {

    try{

        const user = await User.findById(req.params.id).select("-password");

        if (!user){
            const error = new Error("User not found");
            error.statusCode = 404;
            throw error;
        }

        res.status(200).json({success: true, data: user});

    }catch(error){
        next(error);
    }
};

export const createUser = async (req,res,next) => {

    try{
        const {name, email, password} = req.body;

        const existingUser = await User.findOne({ email });

        if(existingUser){
            const error = new Error("user already exists");
            error.statusCode = 409;
            throw error;
        }
        const user = new User({name, email, password});
        await user.save();
        res.status(201).json({success: true, data: user});

    }catch(error){
        next(error);
    }
};

export const updateUser = async(req, res, next) => {
    try{

        const {name, email} = req.body;

        const user = await User.findByIdAndUpdate(req.params.id, {name, email}, {new: true, runValidators: true});

        if(!user){
            const error = new Error("user not found");
            error.statusCode = 404;
            throw error;
        }

        res.status(200).json({success: true, data: user});

    }catch(error){
        next(error);
    }
}

export const deleteUser = async(req, res, next) => {
    try{

        const user = await User.findByIdAndDelete(req.params.id);
        if(!user){
            const error = new Error("user not found");
            error.statusCode = 404;
            throw error;
        }

        res.status(200).json({success: true, message: "user deleted successfully"});

    }catch(error){
        next(error);
    }
}