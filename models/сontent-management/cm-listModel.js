import mongoose from 'mongoose';
import WordModel from './cm-wordModel.js';

const ListSchema = mongoose.Schema({
  user: {
    // Is activated an account by email?
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  listName: {
    type: String,
    required: [true, 'Enter a list name'],
    unique: true,
  },
  order: Number,
  gameCount: Number,
  words: [WordModel.schema],
});

const ListModel = mongoose.model('List', ListSchema); //? User - the collection name

export default ListModel;

//? This is class the mongoose.Model instance that inherit all of its methods:
//? ListModel.create,
//? ListModel.find,
//? ListModel.update,
//? ListModel.delete , and so on...
