
import './packages/template-rjs-0.1.1/elements'
#import './packages/gallery-rjs-0.1.0/elements'

import 'ElmSignin', './elements/elm_signin'
window.custom_elements.define('elm-signin', ElmSignin)

import 'ElmDashboardSidebar', './elements/dashboard/elm_sidebar'
window.custom_elements.define('elm-dashboard-sidebar', ElmDashboardSidebar)

import 'ElmDashboardSidebarProjects', './elements/dashboard/sidebar/elm_projects'
window.custom_elements.define('elm-dashboard-sidebar-projects', ElmDashboardSidebarProjects)

import 'ElmDashboardMainContent', './elements/dashboard/elm_main_content'
window.custom_elements.define('elm-dashboard-main-content', ElmDashboardMainContent)

import 'ElmDashboardMainContentTable', './elements/dashboard/main-content/elm_table'
window.custom_elements.define('elm-dashboard-main-content-table', ElmDashboardMainContentTable)

import 'ElmDashboardSidebarModalTable', './elements/dashboard/sidebar/elm_modal_table'
window.custom_elements.define('elm-dashboard-sidebar-modal-table', ElmDashboardSidebarModalTable)

import 'ElmDashboard', './elements/elm_dashboard'
window.custom_elements.define('elm-dashboard', ElmDashboard)

import 'ElmDashboardSidebarTables', './elements/dashboard/sidebar/elm_tables'
window.custom_elements.define('elm-dashboard-sidebar-tables', ElmDashboardSidebarTables)

import 'ElmDashboardMainContentTableSchema', './elements/dashboard/main-content/table/elm_schema'
window.custom_elements.define('elm-dashboard-main-content-table-schema', ElmDashboardMainContentTableSchema)

import 'ElmDashboardMainContentTableContents', './elements/dashboard/main-content/table/elm_contents'
window.custom_elements.define('elm-dashboard-main-content-table-contents', ElmDashboardMainContentTableContents)
