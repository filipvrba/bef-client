import AProtected from "./abstracts/protected";
import CDatabase from "../components/elm-dashboard/database";
import ElmDashboardSidebarProjects from "./dashboard/sidebar/elm_projects";

export default class ElmDashboard extends AProtected {
  constructor() {
    super();

    this._hSidebarProjectBtnClick = e => (
      this.sidebarProjectBtnClick(e.detail.value)
    );

    this._cDatabase = new CDatabase
  };

  protectedCallback(userId) {
    this.initElm();

    return this._cDatabase.relevantProjects(
      userId,
      projects => Events.emit("#app", ElmDashboard.ENVS.relevantProjects, projects)
    )
  };

  connectedCallback() {
    return Events.connect(
      "#app",
      ElmDashboardSidebarProjects.ENVS.btnClick,
      this._hSidebarProjectBtnClick
    )
  };

  disconnectedCallback() {
    return Events.disconnect(
      "#app",
      ElmDashboardSidebarProjects.ENVS.btnClick,
      this._hSidebarProjectBtnClick
    )
  };

  sidebarProjectBtnClick(project) {
    return this._cDatabase.getSchemas(
      project.dbName,
      tables => Events.emit("#app", ElmDashboard.ENVS.relevantTables, tables)
    )
  };

  initElm() {
    let template = `${`
<div class='container-fluid'>
  <div class='row'>
    <elm-dashboard-sidebar class='col-md-3 col-lg-2'></elm-dashboard-sidebar>
    <elm-dashboard-main-content class='col-md-9 ms-sm-auto col-lg-10 px-md-4'></elm-dashboard-main-content>
  </div>
</div>

<elm-dashboard-sidebar-modal-table></elm-dashboard-sidebar-modal-table>
    `}`;
    return this.innerHTML = template
  }
};

ElmDashboard.ENVS = {
  relevantProjects: "elmDash-relProj",
  relevantTables: "elmDash-relTab"
}