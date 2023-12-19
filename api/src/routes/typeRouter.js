const {Router} = require('express');
const typesGet = require('../handlers/typeHandlers');

const typeRouter = Router();

typeRouter.get('/', typesGet);

module.exports = typeRouter;