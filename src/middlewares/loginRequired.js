import jwt from 'jsonwebtoken';

export default (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({
      errors: ['Está faltando um TOKEN'],
    });
  }

  const [, token] = authorization.split(' ');

  try {
    const dados = jwt.verify(token, process.env.TOKEN_SECRET);
    const { id, email } = dados;
    req.userId = id;
    req.userEmail = email;
    return next;
  } catch (err) {
    return res.status(401).json({
      errors: ['Token expirado ou inválido'],
    });
  }
};
