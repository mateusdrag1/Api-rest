class HomeController {
  async index(req, res) {
    res.json({ status: 'OK' });
  }
}

export default new HomeController();
