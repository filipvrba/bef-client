export default class SQLite
  def self.table_parse(sql)
    content = sql.scan(/CREATE\s+TABLE\s+(\w+)\s*\(([\s\S]+)\)/)
    unless content.length > 0
      return nil
    end

    name, s_shema = content[0]
    shemas = s_shema.split(',').map(&:strip)

    table = {
      name: name,
      columns: [],
      foreign_keys: []
    }

    shemas.each do |shema|
      if shema.index('FOREIGN KEY') > -1
        table.foreign_keys.push(shema)
      else
        shema_split = shema.split(' ')
        name_column = shema_split.slice(0, 1).join('')
        data_type = shema_split.slice(1).join(' ')

        table[:columns].push({
          name: name_column,
          data_type: data_type
        })
      end
    end

    return table
  end
end
window.SQLite = SQLite