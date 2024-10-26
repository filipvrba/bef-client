import ElmDashboardSidebarProjects from "./sidebar/elm_projects";
import ElmDashboardSidebarTables from "./sidebar/elm_tables";

export default class ElmDashboardMainContent extends HTMLElement {
  constructor() {
    super();

    this._hSidebarProjectBtnClick = e => (
      this.sidebarProjectBtnClick(e.detail.value)
    );

    this._hSidebarTableBtnClick = (_) => {
      return this.sidebarTableBtnClick()
    };

    this.initElm()
  };

  connectedCallback() {
    this._mainContent = this.querySelector("#mainContent");
    this._mainContentHeader = this.querySelector("#mainContentHeader");
    this._mainContentTable = this.querySelector("elm-dashboard-main-content-table");

    Events.connect(
      "#app",
      ElmDashboardSidebarProjects.ENVS.btnClick,
      this._hSidebarProjectBtnClick
    );

    Events.connect(
      "#app",
      ElmDashboardSidebarTables.ENVS.btnClick,
      this._hSidebarTableBtnClick
    );

    return this.updateMainContent()
  };

  disconnectedCallback() {
    Events.disconnect(
      "#app",
      ElmDashboardSidebarProjects.ENVS.btnClick,
      this._hSidebarProjectBtnClick
    );

    return Events.disconnect(
      "#app",
      ElmDashboardSidebarTables.ENVS.btnClick,
      this._hSidebarTableBtnClick
    )
  };

  sidebarProjectBtnClick(project) {
    this._mainContentHeader.innerText = `Projekt: ${project.projectName}`;
    return this.updateMainContent()
  };

  sidebarTableBtnClick() {
    return this.updateMainContent()
  };

  initElm() {
    let template = `${`
<main>
  <div class='d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom'>
    <h1 id='mainContentHeader' class='h2'>Projekt: Název projektu</h1>
  </div>
  <div id='mainContent'>
    <elm-dashboard-main-content-table></elm-dashboard-main-content-table>
  <div>
</main>
    `}`;
    return this.innerHTML = template
  };

  updateMainContent() {
    let tableName = URLParams.get("table");
    return tableName ? this._mainContentTable.style.display = "" : this._mainContentTable.style.display = "none"
  }
}