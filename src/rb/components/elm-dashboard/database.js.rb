export default class CDatabase
  def initialize

  end

  def get_schemas(db_name, &callback)
    sql = "SELECT sql FROM sqlite_master WHERE type = 'table' " +
          "AND name NOT LIKE 'sqlite_sequence' AND " +
          "substr(name, 1, 1) NOT BETWEEN 'A' AND 'Z';"

    Net.bef [sql, db_name] do |rows|
      if rows.length > 0
        obj_tables = rows.map {|row| SQLite.table_parse(row.sql)}
        callback(obj_tables) if callback
      else
        callback([]) if callback
      end
    end
  end

  def relevant_projects(user_id, &callback)
    sql = "SELECT 
    projects.project_name,
    projects.db_name
FROM 
    user_projects
JOIN 
    projects ON user_projects.project_id = projects.id
WHERE 
    user_projects.user_id = #{user_id};"

    Net.bef [sql] do |rows|
      callback(rows) if callback
    end
  end
end