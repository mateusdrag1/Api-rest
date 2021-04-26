import Aluno from '../models/Aluno';

class HomeController {
  async index(req, res) {
    const novoAluno = await Aluno.create({
      nome: 'Matthieu',
      sobrenome: 'Christian',
      email: 'matthieuceo@gmail.com',
      idade: 20,
      peso: 80,
      altura: 1.75,
    });
    res.json(novoAluno);
  }
}

export default new HomeController();
