export default class SQLite {
  static tableParse(sql) {
    let content = Array.from(
      sql.matchAll(/CREATE\s+TABLE\s+(\w+)\s*\(([\s\S]+)\)/g),
      s => s.slice(1)
    );

    if (content.length <= 0) return null;
    let [name, sShema] = content[0];
    let shemas = sShema.split(/,(?![^(]*\))/).map(item => item.trim());
    let table = {name, columns: [], others: []};

    for (let schema of shemas) {
      if (schema.indexOf("FOREIGN KEY") > -1 || schema.match(/^UNIQUE/m)) {
        table.others.push(schema)
      } else {
        let schemaSplit = schema.split(" ");
        let nameColumn = schemaSplit.slice(0, 1).join("");
        let dataType = schemaSplit.slice(1).join(" ");
        table.columns.push({name: nameColumn, dataType})
      }
    };

    return table
  }
};

window.SQLite = SQLite