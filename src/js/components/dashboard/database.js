export default class CDatabase {
  constructor() {

  };

  getSchemas(callback) {
    let sql = "SELECT sql FROM sqlite_master WHERE type = 'table' AND name NOT LIKE 'sqlite_sequence' AND substr(name, 1, 1) NOT BETWEEN 'A' AND 'Z';";

    return Net.bef(sql, (rows) => {
      if (rows.length > 0) {
        for (let row of rows) {
          let rowSql = row.sql;
          let tables = SQLite.tableParse(rowSql);
          if (callback) callback(tables)
        }
      }
    })
  };

  getProjects(callback) {
    return null
  }
}