const jwt = require('jsonwebtoken');


// Funciones JWT

const generateToken = (payload) => {
  const token = jwt.sign(payload, 'secreto', { expiresIn: '1h' });
  return token;
};

const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, 'secreto');
    return decoded;
  } catch (err) {
    return null;
  }
};

const removeBearerKeyword = (token) => {
  if( token.startsWith('Bearer') ) {
    return token.replace('Bearer ','');
  }
  if( token.startsWith('bearer') ) {
    return token.replace('bearer ','');
  }
  return token;
}

const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({ error: 'Token no proporcionado' });
  }

  const decoded = verifyToken(removeBearerKeyword(token));

  if (!decoded) {
    return res.status(401).json({ error: 'Token inválido' });
  }

  req.user = decoded;
  next();
};

module.exports = {generateToken,verifyToken,authenticateToken};