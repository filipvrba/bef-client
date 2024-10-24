export default class CDatabase
  def initialize

  end

  def get_schemas(&callback)
    sql = "SELECT sql FROM sqlite_master WHERE type = 'table' " +
          "AND name NOT LIKE 'sqlite_sequence' AND " +
          "substr(name, 1, 1) NOT BETWEEN 'A' AND 'Z';"

    Net.bef(sql) do |rows|
      if rows.length > 0
        rows.each do |row|
          row_sql = row.sql
          tables = SQLite.table_parse(row_sql)
          callback(tables) if callback
        end
      end
    end
  end
end