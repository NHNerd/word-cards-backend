import mongoose from 'mongoose';

const ListSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  listName: {
    type: String,
    required: [true, 'Enter a list name'],
  },
  order: Number,
  gameCount: Number,
});

// Создать уникальный индекс для поля listName в пределах каждого пользователя
// ListSchema.index({ user: 1, listName: 1 }, { unique: true });

const ListModel = mongoose.model('List', ListSchema); //? User - the collection name

export default ListModel;

//? This is class the mongoose.Model instance that inherit all of its methods:
//? ListModel.create,
//? ListModel.find,
//? ListModel.update,
//? ListModel.delete , and so on...
