import User from '../models/User';

class UserController {
  async store(req, res) {
    try {
      const novoUser = await User.create(req.body);
      const { id, nome, email } = novoUser;
      return res.json({ id, nome, email });
    } catch (err) {
      return res.status(400).json({ erros: err.errors.map((error) => error.message) });
    }
  }

  // Index
  async index(req, res) {
    try {
      const users = await User.findAll({ attributes: ['id', 'nome', 'email'] });
      return res.json(users);
    } catch (err) {
      return res.status(400).json({ erros: err.errors.map((error) => error.message) });
    }
  }

  // Show
  async show(req, res) {
    try {
      const user = await User.findByPk(req.userId);

      const { id, nome, email } = user;
      return res.json({ id, nome, email });
    } catch (err) {
      return res.status(400).json({ erros: err.errors.map((error) => error.message) });
    }
  }

  // Update
  async update(req, res) {
    try {
      const user = await User.findByPk(req.userId);

      if (!user) {
        return res.status(400).json({
          errors: ['Usuário não existe'],
        });
      }
      const novosDados = await user.update(req.body);
      const { id, nome, email } = novosDados;
      return res.json({ id, nome, email });
    } catch (err) {
      return res.status(400).json({ erros: err.errors.map((error) => error.message) });
    }
  }

  // Delete
  async delete(req, res) {
    try {
      const user = await User.findByPk(req.userId);

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
