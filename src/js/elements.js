import "./packages/template-rjs-0.1.1/elements";

//import './packages/gallery-rjs-0.1.0/elements'
import ElmSignin from "./elements/elm_signin";
window.customElements.define("elm-signin", ElmSignin);
import ElmDashboardSidebar from "./elements/dashboard/elm_sidebar";

window.customElements.define(
  "elm-dashboard-sidebar",
  ElmDashboardSidebar
);

import ElmDashboardSidebarProjects from "./elements/dashboard/sidebar/elm_projects";

window.customElements.define(
  "elm-dashboard-sidebar-projects",
  ElmDashboardSidebarProjects
)