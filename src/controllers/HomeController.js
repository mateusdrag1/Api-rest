import Aluno from '../models/Aluno';

class HomeController {
  async index(req, res) {
    const novoAluno = await Aluno.create(req.body);
    res.json(novoAluno);
  }
}

export default new HomeController();
