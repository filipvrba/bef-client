import ElmDashboard from "../../elm_dashboard";

export default class ElmDashboardSidebarProjects extends HTMLElement {
  constructor() {
    super();
    this._hRelevantProjects = e => this.relevantProjects(e.detail.value);
    this.initElm();
    window.btnProjectClick = this.btnProjectClick.bind(this)
  };

  connectedCallback() {
    Events.connect(
      "#app",
      ElmDashboard.ENVS.relevantProjects,
      this._hRelevantProjects
    );

    this._projectList = this.querySelector("#projectList");
    return this._projectList
  };

  disconnectedCallback() {
    return Events.disconnect(
      "#app",
      ElmDashboard.ENVS.relevantProjects,
      this._hRelevantProjects
    )
  };

  btnProjectClick(databaseName, haveResetTable=true) {
    URLParams.set("project", databaseName);
    if (haveResetTable) URLParams.set("table", "");
    let currentBtn = this.findButton(databaseName);
    currentBtn.scrollIntoView({behavior: "smooth", block: "center"});

    let objButton = {
      dbName: databaseName,
      projectName: currentBtn.innerText.trimStart()
    };

    return Events.emit(
      "#app",
      ElmDashboardSidebarProjects.ENVS.btnClick,
      objButton
    )
  };

  relevantProjects(projects) {
    this.initElmUpdate(projects);
    return this.checkActiveButton(dbName => this.btnProjectClick(dbName, false))
  };

  initElm() {
    let template = `${`\n<div id='projectList' class='list-group list-group-flush'>\n</div>\n    `}`;
    return this.innerHTML = template
  };

  initElmUpdate(projects) {
    let elements = [];

    for (let project of projects) {
      let template = `${`
      <button class='list-group-item list-group-item-action' onclick='btnProjectClick(${project.db_name})'>
        <i class='bi bi-folder2'></i> ${project.project_name}
      </button>
      `}`;
      elements.push(template)
    };

    return this._projectList.innerHTML = elements.join("")
  };

  findButton(databaseName) {
    return this.querySelector(`[onclick='btnProjectClick(${databaseName})']`)
  };

  checkActiveButton(callback) {
    let regexValidNumber;
    let dbName = URLParams.get("project");

    if (dbName) {
      regexValidNumber = /\b(([1-9]|[1-5][0-9]|6[0-4])\b)/;

      if (dbName.match(regexValidNumber)) {
        if (callback) return callback(dbName)
      } else {
        return console.warn("The project name is not valid.")
      }
    }
  }
};

ElmDashboardSidebarProjects.ENVS = {btnClick: "elmDashSidProj-btnClick"}