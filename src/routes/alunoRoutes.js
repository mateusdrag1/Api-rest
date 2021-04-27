import { Router } from 'express';
import alunoController from '../controllers/AlunoController';

import loginRequired from '../middlewares/loginRequired';

const router = new Router();

// Não existe em aplicações reais
router.get('/', alunoController.index); // Lista usuários
router.get('/:id', alunoController.show); // Mostrar um usuário

router.post('/', alunoController.store); // Adicionar usuário
router.put('/:id', loginRequired, alunoController.update); // Altera um usuário
router.delete('/:id', loginRequired, alunoController.delete); // Deletar um usuário

export default router;
