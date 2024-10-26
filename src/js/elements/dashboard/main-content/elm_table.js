import ElmDashboardSidebarTables from "../sidebar/elm_tables";

export default class ElmDashboardMainContentTable extends HTMLElement {
  constructor() {
    super();
    this._hSidebarTableBtnClick = e => this.sidebarTableBtnClick(e.detail.value);
    this.initElm()
  };

  connectedCallback() {
    return Events.connect(
      "#app",
      ElmDashboardSidebarTables.ENVS.btnClick,
      this._hSidebarTableBtnClick
    )
  };

  disconnectedCallback() {
    return Events.disconnect(
      "#app",
      ElmDashboardSidebarTables.ENVS.btnClick,
      this._hSidebarTableBtnClick
    )
  };

  sidebarTableBtnClick(table) {
    return console.log(table)
  };

  initElm() {
    let template = `${`
<!-- Dynamic Table Schema -->
<div id='table-schema'>
  <h4>Schéma tabulky: Tabulka 1</h4>
  <div class='table-responsive'>
    <table class='table table-bordered'>
      <thead class='table-light'>
        <tr>
          <th>Název Sloupce</th>
          <th>Typ Dat</th>
          <th>Akce</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>id</td>
          <td>integer</td>
          <td>
            <button class='btn btn-sm btn-primary'><i class='bi bi-pencil'></i> Upravit</button>
            <button class='btn btn-sm btn-danger'><i class='bi bi-trash'></i> Smazat</button>
          </td>
        </tr>
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

<!-- Dynamic Table Content -->
<div id='table-content' class='mt-5'>
  <h4>Obsah tabulky: Tabulka 1</h4>
  <div class='table-responsive'>
    <table class='table table-bordered'>
      <thead class='table-light'>
        <tr>
          <th>id</th>
          <th>název</th>
          <th>Akce</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>Záznam 1</td>
          <td>
            <button class='btn btn-sm btn-primary'><i class='bi bi-pencil'></i> Upravit</button>
            <button class='btn btn-sm btn-danger'><i class='bi bi-trash'></i> Smazat</button>
          </td>
        </tr>
        <tr>
          <td>2</td>
          <td>Záznam 2</td>
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
  }
}