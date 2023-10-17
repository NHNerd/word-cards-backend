import { Router } from 'express';
// import { listNameValidation } from '../../middleware/сontent-management/cm-validations';
import ListOfListController from '../../controllers/сontent-management/cm-listOfList-controller.js';
import checkAuth from '../../middleware/auth/auth-check-auth.js';

const routerCM = new Router();

routerCM.get('/initlistoflist', ListOfListController.initializationListOfList);
routerCM.post('/addlist', ListOfListController.addList);
routerCM.get('/lists', checkAuth, ListOfListController.lists);
routerCM.put('/replacelists', checkAuth, ListOfListController.replaceLists); //? put = update||change in HTTP request
routerCM.post('/addword', ListOfListController.addWord);
routerCM.get('/words', checkAuth, ListOfListController.words);
routerCM.delete('/deleteword:listId', ListOfListController.deleteList);

export default routerCM;
