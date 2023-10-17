import mongoose from 'mongoose';
import { validationResult } from 'express-validator';
import WordModel from '../../models/сontent-management/cm-wordModel.js';
import ListModel from '../../models/сontent-management/cm-listModel.js';
import { ApiError, customResponse } from '../service/errorHandler.js';

// import dotenv from 'dotenv';
// dotenv.config();

class ListOfListController {
  async initializationListOfList(req, res) {
    try {
      // Creatin collections:
      mongoose.model('Word', WordModel.schema);
      mongoose.model('List', ListModel.schema);

      res
        .status(201)
        .json({ message: `collections: \n * List Of List \n * List \n * Word \n successfuly init :)` });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: `init L O L: ${error.message}` });
    }
  }

  async addList(req, res) {
    try {
      // Creatin collections:
      const { userId, listName, order, gameCount } = req.body; //? Creating few variables
      const list = await ListModel.create({
        userId: userId,
        listName: listName,
        order: order,
        gameCount: gameCount,
      });

      res.status(201).json({ message: `L I S T: ${listName} is added :)` });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: `Add L I S T: ${error.message}` });
    }
  }
  async replaceLists(req, res) {
    try {
      // Creatin collections:

      const lists = req.body; //?
      const userId = lists[0].userId;

      const filter = { userId: userId };

      await ListModel.deleteMany(filter);

      await ListModel.insertMany(lists);

      res.status(201).json({ message: `REPLACE L I S T: success :)` });
    } catch (error) {
      console.log('E R R O R: ' + error);
      res.status(500).json({ message: `ERROR: REPLACE L I S T: ${error.message}` });
    }
  }
  async addWord(req, res) {
    try {
      // Creatin collections:

      const { userId, listId, word, translate, order, gameCount } = req.body; //? Creating few variables
      const list = await WordModel.create({
        userId: userId,
        listId: listId,
        word: word,
        translate: translate,
        order: order,
        gameCount: gameCount,
      });

      res.status(201).json({ message: `W O R D: ${word} is added :)` });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: `Add W O R D: ${error.message}` });
    }
  }
  async lists(req, res) {
    try {
      const userId = req.query.userid;

      let lists = await ListModel.find({ userId: userId });

      if (lists.length === 0) {
        lists = false;
      }
      res.status(201).json(lists);
    } catch (error) {
      console.log(error);

      res.status(500).json({ message: `get L I S T S: ${error.message}` });
    }
  }
  async words(req, res) {
    try {
      const { userid, listid } = req.query;

      const words = await WordModel.find({ userId: userid, listId: listid });

      res.status(201).json(words);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: `get W O R D S: ${error.message}` });
    }
  }
  async deleteList(req, res) {
    try {
      const listId = req.params.listId;

      await ListModel.deleteOne({ _id: listId });

      res.status(201).json({ message: `List - successfully deleted` });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: `delete L I S T: ${error.message}` });
    }
  }
}

export default new ListOfListController();
