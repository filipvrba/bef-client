import ElmDashboardSidebarTables from "../../sidebar/elm_tables";

export default class ElmDashboardMainContentTableSchema extends HTMLElement {
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

    this._schemaHeader = this.querySelector("#schemaHeader");
    this._schemaColumns = this.querySelector("#schemaColumns");
    return this._schemaColumns
  };

  disconnectedCallback() {
    return Events.disconnect(
      "#app",
      ElmDashboardSidebarTables.ENVS.btnClick,
      this._hSidebarTableBtnClick
    )
  };

  sidebarTableBtnClick(table) {
    this._schemaHeader.innerText = `Schéma tabulky: ${table.name}`;
    return this.updateSubinitElm(table)
  };

  initElm() {
    let template = `${`
<!-- Dynamic Table Schema -->
<div id='table-schema'>
  <h4 id='schemaHeader'>Schéma tabulky: Tabulka 1</h4>
  <div class='table-responsive'>
    <table class='table table-bordered'>
      <thead class='table-light'>
        <tr>
          <th>Název Sloupce</th>
          <th>Typ Dat</th>
          <th>Akce</th>
        </tr>
      </thead>
      <tbody id='schemaColumns'>
        
        <tr>
          <td>název</td>
          <td>varchar(255)</td>
          <td>
            <button class='btn btn-sm btn-primary'><i class='bi bi-pencil'></i> Upravit</button>
            <button class='btn btn-sm btn-danger'><i class='bi bi-trash'></i> Smazat</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <button class='btn btn-success mt-3'><i class='bi bi-plus'></i> Přidat nový sloupec</button>
</div>
    `}`;
    return this.innerHTML = template
  };

  updateSubinitElm(table) {
    let elements = [];

    for (let column of table.columns) {
      let template = `${`
      <tr>
        <td>${column.name}</td>
        <td>${column.dataType}</td>
        <td>
          <button class='btn btn-sm btn-primary'><i class='bi bi-pencil'></i> Upravit</button>
          <button class='btn btn-sm btn-danger'><i class='bi bi-trash'></i> Smazat</button>
        </td>
      </tr>
      `}`;
      elements.push(template)
    };

    for (let other of table.others) {
      let template = `${`
        <tr>
          <td></td>
          <td>${other}</td>
          <td>
            <button class='btn btn-sm btn-primary'><i class='bi bi-pencil'></i> Upravit</button>
            <button class='btn btn-sm btn-danger'><i class='bi bi-trash'></i> Smazat</button>
          </td>
        </tr>
        `}`;
      elements.push(template)
    };

    return this._schemaColumns.innerHTML = elements.join("")
  }
}