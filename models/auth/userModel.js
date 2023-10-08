import mongoose from 'mongoose';

const UserSchema = mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Enter a email'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Enter a password'],
  },
  isActivated: {
    // Is activated an account by email?
    type: Boolean,
    default: false,
  },
  activationLink: {
    type: String,
  },
});

const UserModel = mongoose.model('User', UserSchema); //? User - the collection name

export default UserModel;

//? This is class the mongoose.Model instance that inherit all of its methods:
//? UserModel.create,
//? UserModel.find,
//? UserModel.update,
//? UserModel.delete , and so on...
