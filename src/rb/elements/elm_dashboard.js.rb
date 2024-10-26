import 'AProtected', './abstracts/protected'
import 'CDatabase', '../components/elm-dashboard/database'
import 'ElmDashboardSidebarProjects', './dashboard/sidebar/elm_projects'

export default class ElmDashboard < AProtected
  ENVS = {
    relevant_projects: 'elmDash-relProj',
    relevant_tables: 'elmDash-relTab'
  }

  def initialize
    super

    @h_sidebar_project_btn_click = lambda {|e| sidebar_project_btn_click(e.detail.value) }

    @c_database = CDatabase.new
  end

  def protected_callback(user_id)
    init_elm()

    @c_database.relevant_projects(user_id) do |projects|
      Events.emit('#app', ENVS.relevant_projects, projects)
    end
  end

  def connected_callback()
    Events.connect('#app', ElmDashboardSidebarProjects::ENVS.btn_click, @h_sidebar_project_btn_click)
  end

  def disconnected_callback()
    Events.disconnect('#app', ElmDashboardSidebarProjects::ENVS.btn_click, @h_sidebar_project_btn_click)
  end

  def sidebar_project_btn_click(project)
    @c_database.get_schemas(project.db_name) do |tables|
      Events.emit('#app', ENVS.relevant_tables, tables)
    end
  end

  def init_elm()
    template = """
<div class='container-fluid'>
  <div class='row'>
    <elm-dashboard-sidebar class='col-md-3 col-lg-2'></elm-dashboard-sidebar>
    <elm-dashboard-main-content class='col-md-9 ms-sm-auto col-lg-10 px-md-4'></elm-dashboard-main-content>
  </div>
</div>

<elm-dashboard-sidebar-modal-table></elm-dashboard-sidebar-modal-table>
    """

    self.innerHTML = template
  end
end