import 'ElmDashboardSidebarProjects', './sidebar/elm_projects'
import 'ElmDashboardSidebarTables', './sidebar/elm_tables'

export default class ElmDashboardMainContent < HTMLElement
  def initialize
    super

    @h_sidebar_project_btn_click = lambda {|e| sidebar_project_btn_click(e.detail.value) }
    @h_sidebar_table_btn_click   = lambda {|_| sidebar_table_btn_click()}

    init_elm()
  end

  def connected_callback()
    @main_content        = self.query_selector('#mainContent')
    @main_content_header = self.query_selector('#mainContentHeader')
    @main_content_table  = self.query_selector('elm-dashboard-main-content-table')

    Events.connect('#app', ElmDashboardSidebarProjects::ENVS.btn_click, @h_sidebar_project_btn_click)
    Events.connect('#app', ElmDashboardSidebarTables::ENVS.btn_click, @h_sidebar_table_btn_click)

    update_main_content()
  end

  def disconnected_callback()
    Events.disconnect('#app', ElmDashboardSidebarProjects::ENVS.btn_click, @h_sidebar_project_btn_click)
    Events.disconnect('#app', ElmDashboardSidebarTables::ENVS.btn_click, @h_sidebar_table_btn_click)
  end

  def sidebar_project_btn_click(project)
    @main_content_header.inner_text = "Projekt: #{project.project_name}"
    update_main_content()
  end

  def sidebar_table_btn_click()
    update_main_content()
  end

  def init_elm()
    template = """
<main>
  <div class='d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom'>
    <h1 id='mainContentHeader' class='h2'>Projekt: Název projektu</h1>
  </div>
  <div id='mainContent'>
    <elm-dashboard-main-content-table></elm-dashboard-main-content-table>
  <div>
</main>
    """

    self.innerHTML = template
  end

  def update_main_content()
    table_name = URLParams.get('table')

    if table_name
      @main_content_table.style.display = ''
    else
      @main_content_table.style.display = :none
    end
  end
end