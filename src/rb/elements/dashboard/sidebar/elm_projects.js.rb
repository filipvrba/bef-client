import 'ElmDashboard', '../../elm_dashboard'

export default class ElmDashboardSidebarProjects < HTMLElement
  ENVS = {
    btn_click: 'elmDashSidProj-btnClick'
  }

  def initialize
    super

    @h_relevant_projects = lambda {|e| relevant_projects(e.detail.value)}
    
    init_elm()

    window.btn_project_click = btn_project_click
  end

  def connected_callback()
    Events.connect('#app', ElmDashboard::ENVS.relevant_projects, @h_relevant_projects)

    @project_list = self.query_selector('#projectList')
  end

  def disconnected_callback()
    Events.disconnect('#app', ElmDashboard::ENVS.relevant_projects, @h_relevant_projects)
  end

  def btn_project_click(database_name, have_reset_table = true)
    URLParams.set('project', database_name)
    URLParams.set('table', '') if have_reset_table

    current_btn = find_button(database_name)
    current_btn.scroll_into_view({ behavior: 'smooth', block: 'center' })

    obj_button = {
      db_name: database_name,
      project_name: current_btn.innerText.lstrip()
    }
    Events.emit('#app', ENVS.btn_click, obj_button)
  end

  def relevant_projects(projects)
    init_elm_update(projects)

    check_active_button() do |db_name|
      btn_project_click(db_name, false)
    end
  end

  def init_elm()
    template = """
<div id='projectList' class='list-group list-group-flush'>
</div>
    """

    self.innerHTML = template
  end

  def init_elm_update(projects)
    elements = []

    projects.each do |project|
      template = """
      <button class='list-group-item list-group-item-action' onclick='btnProjectClick(#{project['db_name']})'>
        <i class='bi bi-folder2'></i> #{project['project_name']}
      </button>
      """
      elements.push(template)
    end

    @project_list.innerHTML = elements.join('')
  end

  def find_button(database_name)
    self.query_selector("[onclick='btnProjectClick(#{database_name})']")
  end

  def check_active_button(&callback)
    db_name = URLParams.get('project')
    
    if db_name
      regex_valid_number = /\b(([1-9]|[1-5][0-9]|6[0-4])\b)/

      if db_name.match(regex_valid_number)
        callback(db_name) if callback
      else
        console.warn('The project name is not valid.')
      end
    end
  end
end