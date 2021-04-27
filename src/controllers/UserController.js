import User from '../models/User';

class UserController {
  async store(req, res) {
    try {
      const novoUser = await User.create(req.body);
      return res.json(novoUser);
    } catch (err) {
      return res.status(400).json({ erros: err.errors.map((error) => error.message) });
    }
  }

  // Index
  async index(req, res) {
    try {
      const users = await User.findAll();
      return res.json(users);
    } catch (err) {
      return res.status(400).json({ erros: err.errors.map((error) => error.message) });
    }
  }

  // Show
  async show(req, res) {
    try {
      const user = await User.findByPk(req.params.id);
      return res.json(user);
    } catch (err) {
      return res.status(400).json({ erros: err.errors.map((error) => error.message) });
    }
  }

  // Update
  async update(req, res) {
    try {
      if (!req.params.id) {
        return res.status(400).json({
          errors: ['ID não enviado'],
        });
      }
      const user = await User.findByPk(req.params.id);
      if (!user) {
        return res.status(400).json({
          errors: ['Usuário não existe'],
        });
      }
      const novosDados = await user.update(req.body);
      return res.json(novosDados);
    } catch (err) {
      return res.status(400).json({ erros: err.errors.map((error) => error.message) });
    }
  }

  // Delete
  async delete(req, res) {
    try {
      if (!req.params.id) {
        return res.status(400).json({
          errors: ['ID não enviado'],
        });
      }
      const user = await User.findByPk(req.params.id);
      if (!user) {
        return res.status(400).json({
          errors: ['Usuário não existe'],
        });
      }
      await user.destroy();
      return res.status(200).json({ msg: 'Usuário apagado com sucesso!' });
    } catch (err) {
      return res.status(400).json({ erros: err.errors.map((error) => error.message) });
    }
  }
}

export default new UserController();
