import { Router } from 'express';
import userController from '../controllers/UserController';

import loginRequired from '../middlewares/loginRequired';

const router = new Router();

// Não existe em aplicações reais
router.get('/', userController.index); // Lista usuários
router.get('/:id', userController.show); // Mostrar um usuário

router.post('/', userController.store); // Adicionar usuário
router.put('/', loginRequired, userController.update); // Altera um usuário
router.delete('/', loginRequired, userController.delete); // Deletar um usuário

export default router;
