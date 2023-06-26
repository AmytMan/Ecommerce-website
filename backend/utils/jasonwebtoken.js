import jwt from 'jsonwebtoken';

const generateToken = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.SECRET_KEY, {
    expiresIn: '1d',
  });

  res.cookie('token', token, {
    httpOnly: true,
    sameSite: 'strict', // Prevent CSRF attacks
    expires: new Date(Date.now() + 24 * 3600000)
  });
};

export default generateToken;