export default class SQLite {
  static tableParse(sql) {
    let content = Array.from(
      sql.matchAll(/CREATE\s+TABLE\s+(\w+)\s*\(([\s\S]+)\)/g),
      s => s.slice(1)
    );

    if (content.length <= 0) return null;
    let [name, sShema] = content[0];
    let shemas = sShema.split(",").map(item => item.trim());
    let table = {name, columns: [], foreingKeys: []};

    for (let shema of shemas) {
      if (shema.indexOf("FOREIGN KEY") > -1) {
        table.foreingKeys.push(shema)
      } else {
        let shemaSplit = shema.split(" ");
        let nameColumn = shemaSplit.slice(0, 1).join("");
        let dataType = shemaSplit.slice(1).join(" ");
        table.columns.push({name: nameColumn, dataType})
      }
    };

    return table
  }
};

window.SQLite = SQLite