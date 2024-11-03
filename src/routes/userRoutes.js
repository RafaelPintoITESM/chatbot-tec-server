const express = require('express');
const { insertUser, updateUser, getUsers, getUserById, deleteUser } = require('../controllers/userController');
const verifyToken = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/',  getUsers); 
router.get('/:id', getUserById); 
router.post('/', insertUser); 
router.put('/:id',  updateUser); 
router.delete('/:id', deleteUser); 

module.exports = router;
