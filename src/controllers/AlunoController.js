import Aluno from '../models/Aluno';
import Foto from '../models/Foto';

class AlunoController {
  // Index - Mostrar todos os alunos
  async index(req, res) {
    try {
      const alunos = await Aluno.findAll({
        attributes: ['id', 'nome', 'sobrenome', 'email', 'idade', 'peso', 'altura'],
        order: [['id', 'DESC'], [Foto, 'id', 'DESC']],
        include: {
          model: Foto,
          attributes: ['url', 'filename'],
        },
      });
      return res.json(alunos);
    } catch (err) {
      return res.status(400).json({ errors: err.errors.map((error) => error.message) });
    }
  }

  // Store - Adicionar um novo aluno
  async store(req, res) {
    try {
      const novoAluno = await Aluno.create(req.body);
      return res.json(novoAluno);
    } catch (err) {
      return res.status(400).json({ errors: err.errors.map((error) => error.message) });
    }
  }

  // Show - Mostrar apenas um aluno
  async show(req, res) {
    try {
      const { id } = req.params;

      if (!id) return res.status(400).json({ errors: ['Faltando ID'] });

      const aluno = await Aluno.findByPk(id, {
        attributes: ['id', 'nome', 'sobrenome', 'email', 'idade', 'peso', 'altura'],
        order: [['id', 'DESC'], [Foto, 'id', 'DESC']],
        include: {
          model: Foto,
          attributes: ['url', 'filename'],
        },
      });

      if (!aluno) return res.status(400).json({ errors: ['O Aluno não existe!'] });

      return res.json(aluno);
    } catch (err) {
      return res.status(400).json({ errors: err.errors.map((error) => error.message) });
    }
  }

  // Update - Alterar o aluno
  async update(req, res) {
    try {
      const { id } = req.params;

      if (!id) return res.status(400).json({ errors: ['Faltando ID'] });

      const aluno = await Aluno.findByPk(id);

      if (!aluno) return res.status(400).json({ errors: ['O Aluno não existe!'] });

      const novosDados = await aluno.update(req.body);
      return res.json(novosDados);
    } catch (err) {
      return res.status(400).json({ errors: err.errors.map((error) => error.message) });
    }
  }

  // Delete - Apagar o aluno
  async delete(req, res) {
    try {
      const { id } = req.params;

      if (!id) return res.status(400).json({ errors: ['Faltando ID'] });

      const aluno = await Aluno.findByPk(id);

      if (!aluno) return res.status(400).json({ errors: ['O Aluno não existe!'] });

      await aluno.destroy();
      return res.status(200).json({ msg: 'Usuário apagado com sucesso!' });
    } catch (err) {
      return res.status(400).json({ errors: err.errors.map((error) => error.message) });
    }
  }
}

export default new AlunoController();
