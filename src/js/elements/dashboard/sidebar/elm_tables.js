import ElmDashboard from "../../elm_dashboard";

export default class ElmDashboardSidebarTables extends HTMLElement {
  constructor() {
    super();
    this._hRelevantTables = e => this.updateRelevantTables(e.detail.value);
    this._relevantTables = null;
    this.initElm();
    window.btnTableClick = this.btnTableClick.bind(this)
  };

  connectedCallback() {
    this._tableList = this.querySelector("#tableList");

    return Events.connect(
      "#app",
      ElmDashboard.ENVS.relevantTables,
      this._hRelevantTables
    )
  };

  disconnectedCallback() {
    return Events.disconnect(
      "#app",
      ElmDashboard.ENVS.relevantTables,
      this._hRelevantTables
    )
  };

  updateRelevantTables(tables) {
    this._relevantTables = tables;
    let nameTables = tables.map(o => o.name);
    this.initElmUpdateTables(nameTables);
    return this.checkActiveButton(tableName => this.btnTableClick(tableName))
  };

  btnTableClick(tableName) {
    URLParams.set("table", tableName);
    let currentBtn = this.findButton(tableName);
    currentBtn.scrollIntoView({behavior: "smooth", block: "center"});
    let objTable = this.findTable(tableName);

    return Events.emit(
      "#app",
      ElmDashboardSidebarTables.ENVS.btnClick,
      objTable
    )
  };

  findTable(tableName) {
    for (let table of this._relevantTables) {
      if (table.name === tableName) return table
    };

    return null
  };

  initElm() {
    let template = `${`\n<div id='tableList' class='list-group list-group-flush'>\n</div>\n    `}`;
    return this.innerHTML = template
  };

  initElmUpdateTables(nameTables) {
    let elements = [];

    for (let name of nameTables) {
      let template = `${`
      <button href='#' class='list-group-item list-group-item-action' onclick='btnTableClick("${name}")'>
        <i class='bi bi-table'></i> ${name}
      </button>
      `}`;
      elements.push(template)
    };

    return this._tableList.innerHTML = elements.join("")
  };

  findButton(tableName) {
    return this.querySelector(`[onclick='btnTableClick("${tableName}")']`)
  };

  checkActiveButton(callback) {
    let objTable;
    let tableName = URLParams.get("table");

    if (tableName) {
      objTable = this.findTable(tableName);

      if (objTable) {
        if (callback) return callback(tableName)
      } else {
        return console.warn(`The '${tableName}' table was not found.`)
      }
    }
  }
};

ElmDashboardSidebarTables.ENVS = {btnClick: "elmDashSideTab-btnClick"}