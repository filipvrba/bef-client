export default class CDatabase {
  constructor() {

  };

  getSchemas(dbName, callback) {
    let sql = "SELECT sql FROM sqlite_master WHERE type = 'table' AND name NOT LIKE 'sqlite_sequence' AND substr(name, 1, 1) NOT BETWEEN 'A' AND 'Z';";

    return Net.bef([sql, dbName], (rows) => {
      let objTables;

      if (rows.length > 0) {
        objTables = rows.map(row => SQLite.tableParse(row.sql));
        if (callback) return callback(objTables)
      } else if (callback) {
        return callback([])
      }
    })
  };

  relevantProjects(userId, callback) {
    let sql = `SELECT 
    projects.project_name,
    projects.db_name
FROM 
    user_projects
JOIN 
    projects ON user_projects.project_id = projects.id
WHERE 
    user_projects.user_id = ${userId};`;

    return Net.bef([sql], (rows) => {
      if (callback) return callback(rows)
    })
  }
}