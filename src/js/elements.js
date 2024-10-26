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
);

import ElmDashboardMainContent from "./elements/dashboard/elm_main_content";

window.customElements.define(
  "elm-dashboard-main-content",
  ElmDashboardMainContent
);

import ElmDashboardMainContentTable from "./elements/dashboard/main-content/elm_table";

window.customElements.define(
  "elm-dashboard-main-content-table",
  ElmDashboardMainContentTable
);

import ElmDashboardSidebarModalTable from "./elements/dashboard/sidebar/elm_modal_table";

window.customElements.define(
  "elm-dashboard-sidebar-modal-table",
  ElmDashboardSidebarModalTable
);

import ElmDashboard from "./elements/elm_dashboard";
window.customElements.define("elm-dashboard", ElmDashboard);
import ElmDashboardSidebarTables from "./elements/dashboard/sidebar/elm_tables";

window.customElements.define(
  "elm-dashboard-sidebar-tables",
  ElmDashboardSidebarTables
);

import ElmDashboardMainContentTableSchema from "./elements/dashboard/main-content/table/elm_schema";

window.customElements.define(
  "elm-dashboard-main-content-table-schema",
  ElmDashboardMainContentTableSchema
);

import ElmDashboardMainContentTableContents from "./elements/dashboard/main-content/table/elm_contents";

window.customElements.define(
  "elm-dashboard-main-content-table-contents",
  ElmDashboardMainContentTableContents
)