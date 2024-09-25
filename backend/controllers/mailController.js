const emailService = require('../services/mailService');

const sendWelcomeEmail = async (req, res) => {
  try {
    const { email, name } = req.body;
    if (!email) {
      return res.status(400).send('Email and name are required');
    }

    await emailService.sendEmail(
      email,
      'Welcome to Our Service',
      'register',
      {name}
    );
    
    res.status(200).send('Email đã được gửi thành công');
  } catch (error) {
    res.status(500).send('Có lỗi khi gửi email: ' + error.message);
  }
};

module.exports = {
  sendWelcomeEmail
};