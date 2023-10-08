import mongoose from 'mongoose';

const WordSchema = mongoose.Schema({
  word: {
    type: String,
    required: [true, 'Enter a word'],
    unique: true,
  },
  translate: {
    type: String,
    required: [true, 'Enter a word'],
    unique: true,
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
