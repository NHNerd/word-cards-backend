import { Router } from 'express';
// import { listNameValidation } from '../../middleware/сontent-management/cm-validations';
import ListOfListController from '../../controllers/сontent-management/cm-listOfList-controller.js';

const routerCM = new Router();

routerCM.get('/initlistoflist', ListOfListController.initializationListOfList);
routerCM.post('/addlist', ListOfListController.addList);
routerCM.get('/lists', ListOfListController.lists);
routerCM.post('/addword', ListOfListController.addWord);
routerCM.get('/words', ListOfListController.words);
routerCM.delete('/deleteword', () => {});

export default routerCM;
