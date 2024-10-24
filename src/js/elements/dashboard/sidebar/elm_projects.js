import CDatabase from "../../../components/dashboard/sidebar/elm-projects/database";

export default class ElmDashboardSidebarProjects extends HTMLElement {
  constructor() {
    super();
    this.initElm()
  };

  connectedCallback() {
    this._cDatabase = new CDatabase;
    return this._cDatabase.getSchemas(tables => console.log(tables))
  };

  disconnectedCallback() {
    return null
  };

  initElm() {
    let template = `${`
<div id='projectList' class='list-group list-group-flush'>
  <a href='#' class='list-group-item list-group-item-action active-item' aria-current='page'>
    <i class='bi bi-folder2'></i> Projekt 1
  </a>
  <!-- Další projekty, přidáváme mnoho položek jako příklad -->
  <a href='#' class='list-group-item list-group-item-action'>
    <i class='bi bi-folder2'></i> Projekt 2
  </a>
  <a href='#' class='list-group-item list-group-item-action'>
    <i class='bi bi-folder2'></i> Projekt 3
  </a>
</div>
    `}`;
    return this.innerHTML = template
  }
}