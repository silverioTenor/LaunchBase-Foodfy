const crypto = require('crypto');
const mailer = require('../../lib/mailer');

const User = require('../models/User');

class CreateTokenToResetPasswordService {
  async execute(id, email) {
    try {
      const token = crypto.randomBytes(20).toString('hex');

      let now = new Date();
      now = now.setHours(now.getHours() + 1);

      const values = { id, column: 'id' };

      const userDB = new User();
      await userDB.update(values, {
        reset_token: token,
        reset_token_expires: now,
      });

      await mailer.sendMail({
        to: email,
        from: "no-reply@foodfy.com",
        subject: "Link de recuperação",
        html: `
          <h2>Esqueceu sua senha?</h2>
          <p>Não se preocupe! Aqui está o link para criar uma nova senha.</p>
          <p>
            <a href="http://localhost:3000/session/password-reset?token=${token}" 
            target="_blank">CRIAR NOVA SENHA</a>
          </p>
          <br>
          <h4><b>Atenção!</b></h4>
          <p>O link expira em 1 hora.</p>
        `
      });
    } catch (err) {
      throw new Error(err);
    }
  }
}

module.exports = CreateTokenToResetPasswordService;