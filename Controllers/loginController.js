const db = require('../models'); // Asegúrate de que la ruta es correcta

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.render('welcome', { message: 'Email and password are required' });
    }

    const user = await db.User.findOne({ where: { email } });

    if (!user) {
      return res.render('welcome', { message: 'User not found' });
    }

    const isPasswordValid = password === user.password;

    if (!isPasswordValid) {
      return res.render('welcome', { message: 'Invalid password' });
    }

    // Si todo está bien, redirige al usuario o muestra un mensaje de éxito
    res.redirect('/dashboard');
  } catch (error) {
    console.error('Error during login:', error);
    res.render('welcome', { message: 'Internal server error' });
  }
};