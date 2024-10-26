export default class ElmDashboardMainContentTable extends HTMLElement {
  constructor() {
    super();
    this.initElm()
  };

  connectedCallback() {
    return null
  };

  disconnectedCallback() {
    return null
  };

  initElm() {
    let template = `${`
<elm-dashboard-main-content-table-schema></elm-dashboard-main-content-table-schema>

<elm-dashboard-main-content-table-contents></elm-dashboard-main-content-table-contents>
    `}`;
    return this.innerHTML = template
  }
}