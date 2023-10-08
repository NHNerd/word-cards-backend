import mongoose from 'mongoose';

const TokenSchema = mongoose.Schema({
  user: {
    // Is activated an account by email?
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  refreshToken: {
    type: String,
    required: true,
  },
});

const TokenModel = mongoose.model('Token', TokenSchema); //? User - the collection name

export default TokenModel;

//? This is class the mongoose.Model instance that inherit all of its methods:
//? TokenModel.create,
//? TokenModel.find,
//? TokenModel.update,
//? TokenModel.delete , and so on...
