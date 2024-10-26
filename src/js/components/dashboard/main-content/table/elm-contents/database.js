export default class CDatabase {
  constructor(tableName) {
    this._dbName = URLParams.get("project");
    this._tableName = tableName
  };

  getContents(callback) {
    let sql = `SELECT * FROM ${this._tableName};`;

    return Net.bef([sql, this._dbName], (rows) => {
      if (callback) return callback(rows)
    })
  }
}