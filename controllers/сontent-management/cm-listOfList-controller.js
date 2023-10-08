import mongoose from 'mongoose';
import { validationResult } from 'express-validator';
import WordModel from '../../models/сontent-management/cm-wordModel.js';
import ListModel from '../../models/сontent-management/cm-listModel.js';

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
      const { user, listName, order, gameCount, words } = req.body; //? Creating few variables
      const list = await ListModel.create({
        user: user,
        listName: listName,
        order: order,
        gameCount: gameCount,
        words: words,
      });

      res.status(201).json({ message: `List ${listName} is added :)` });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: `Add L I S T: ${error.message}` });
    }
  }
  async addWord(req, res) {
    try {
      // Creatin collections:

      res.status(201).json({ message: `List ${req.body.name} is added :)` });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: `Add W O R D: ${error.message}` });
    }
  }
}

export default new ListOfListController();
