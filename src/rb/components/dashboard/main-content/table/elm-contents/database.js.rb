export default class CDatabase
  def initialize(table_name)
    @db_name    = URLParams.get('project')
    @table_name = table_name
  end

  def get_contents(&callback)
    sql = "SELECT * FROM #{@table_name};"

    Net.bef [sql, @db_name] do |rows|
      callback(rows) if callback
    end
  end
end