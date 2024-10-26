export default class AProtected extends HTMLElement {
  constructor() {
    super();

    this.tokenCheck(userId => (
      userId ? this.protectedCallback(parseInt(userId)) : this.gotoSignin()
    ));

    Net.tokenCheck = this.tokenCheck.bind(this)
  };

  tokenCheck(callback) {
    let sql;
    let loginToken = Cookie.get("l-token");

    if (loginToken) {
      sql = `SELECT user_id FROM tokens WHERE token='${loginToken}' AND expires_at > CURRENT_TIMESTAMP;`;

      return Net.bef([sql], (rows) => {
        let isActive = rows.length > 0;

        if (isActive) {
          if (callback) return callback(rows[0].user_id.toString())
        } else if (callback) {
          return callback(null)
        }
      })
    } else if (callback) {
      return callback(null)
    }
  };

  gotoSignin() {
    return location.hash = "signin"
  };

  protectedCallback() {
    throw new Error("The function is abstract.");
    return null
  }
}