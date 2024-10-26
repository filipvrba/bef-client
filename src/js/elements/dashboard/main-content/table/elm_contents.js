import ElmDashboardSidebarTables from "../../sidebar/elm_tables";
import CDatabase from "../../../../components/dashboard/main-content/table/elm-contents/database";

export default class ElmDashboardMainContentTableContents extends HTMLElement {
  constructor() {
    super();
    this._hSidebarTableBtnClick = e => this.sidebarTableBtnClick(e.detail.value);
    this.initElm()
  };

  connectedCallback() {
    Events.connect(
      "#app",
      ElmDashboardSidebarTables.ENVS.btnClick,
      this._hSidebarTableBtnClick
    );

    this._contentHeader = this.querySelector("#contentHeader");
    this._contentColumnNames = this.querySelector("#contentColumnNames");
    this._contentRows = this.querySelector("#contentRows");
    return this._contentRows
  };

  disconnectedCallback() {
    return Events.disconnect(
      "#app",
      ElmDashboardSidebarTables.ENVS.btnClick,
      this._hSidebarTableBtnClick
    )
  };

  sidebarTableBtnClick(tableSchema) {
    this._cDatabase = new CDatabase(tableSchema.name);
    this._contentHeader.innerText = `Obsah tabulky: ${tableSchema.name}`;
    this.updateColumnNamesInitElm(tableSchema);
    return this.updateRowsInitElm(tableSchema)
  };

  initElm() {
    let template = `${`
<div id='table-content' class='mt-5'>
  <h4 id='contentHeader'>Obsah tabulky: Tabulka 1</h4>
  <div class='table-responsive'>
    <table class='table table-bordered'>
      <thead class='table-light'>
        <tr id='contentColumnNames'>
          <th>id</th>
          <th>název</th>
          <th>Akce</th>
        </tr>
      </thead>
      <tbody id='contentRows'>
        <tr>
          <td>1</td>
          <td>Záznam 1</td>
          <td>
            <button class='btn btn-sm btn-primary'><i class='bi bi-pencil'></i> Upravit</button>
            <button class='btn btn-sm btn-danger'><i class='bi bi-trash'></i> Smazat</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <button class='btn btn-success mt-3'><i class='bi bi-plus'></i> Přidat nový záznam</button>
</div>
    `}`;
    return this.innerHTML = template
  };

  updateColumnNamesInitElm(tableSchema) {
    let elements = [];

    for (let column of tableSchema.columns) {
      let template = `<th>${column.name}</th>`;
      elements.push(template)
    };

    elements.push("<th>Akce</th>");
    return this._contentColumnNames.innerHTML = elements.join("")
  };

  updateRowsInitElm(tableSchema) {
    let columnNames = tableSchema.columns.map(o => o.name);

    return this._cDatabase.getContents((rows) => {
      let elementRows = [];

      for (let row of rows) {
        let elementColumns = [];

        for (let columnName of columnNames) {
          let columnValue = row[columnName];
          let templateColumn = `<td>${columnValue}</td>`;
          elementColumns.push(templateColumn)
        };

        elementColumns.push(`${`
        <td>
          <button class='btn btn-sm btn-primary'><i class='bi bi-pencil'></i> Upravit</button>
          <button class='btn btn-sm btn-danger'><i class='bi bi-trash'></i> Smazat</button>
        </td>
        `}`);
        elementRows.push(`<tr>${elementColumns.join("")}</tr>`)
      };

      return this._contentRows.innerHTML = elementRows.join("")
    })
  }
}