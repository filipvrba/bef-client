
import './packages/template-rjs-0.1.1/elements'
#import './packages/gallery-rjs-0.1.0/elements'

import 'ElmSignin', './elements/elm_signin'
window.custom_elements.define('elm-signin', ElmSignin)

import 'ElmDashboardSidebar', './elements/dashboard/elm_sidebar'
window.custom_elements.define('elm-dashboard-sidebar', ElmDashboardSidebar)

import 'ElmDashboardSidebarProjects', './elements/dashboard/sidebar/elm_projects'
window.custom_elements.define('elm-dashboard-sidebar-projects', ElmDashboardSidebarProjects)
