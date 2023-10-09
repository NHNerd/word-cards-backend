import mongoose from 'mongoose';

const WordSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  listId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'List',
  },
  word: {
    type: String,
    required: [true, 'Enter a word'],
  },
  translate: {
    type: String,
    required: [true, 'Enter a word'],
  },
  order: Number,
  gameCount: Number,
});

const WordModel = mongoose.model('Word', WordSchema); //? User - the collection name

export default WordModel;

//? This is class the mongoose.Model instance that inherit all of its methods:
//? WordModel.create,
//? WordModel.find,
//? WordModel.update,
//? WordModel.delete , and so on...
