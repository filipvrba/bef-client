export default class CDatabase {
  constructor(element) {
    this._element = element;
    this._element.setSpinnerDisplay(false)
  };

  signin(options, callback) {
    this._element.setSpinnerDisplay(true);
    let email = options.email.value;
    let hashPassword = options.password.value.encodeMd5();
    let query = `SELECT id FROM users WHERE email='${email}' AND hash_password='${hashPassword}';`;

    return Net.bef([query], (rows) => {
      let isSignin, userId;
      this._element.setSpinnerDisplay(false);
      if (rows) isSignin = rows.length > 0;

      if (isSignin) {
        userId = rows[0].id;
        if (callback) return callback(userId)
      }
    })
  };

  addToken(options, callback) {
    this._element.setSpinnerDisplay(true);
    let query = `INSERT INTO tokens (user_id, token, expires_at) VALUES (${options.id}, '${options.token}', '${options.date}');`;

    return Net.bef([query], (isWrite) => {
      this._element.setSpinnerDisplay(false);
      if (isWrite) if (callback) return callback.call()
    })
  }
}