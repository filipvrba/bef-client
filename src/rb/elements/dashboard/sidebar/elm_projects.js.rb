import 'CDatabase', '../../../components/dashboard/sidebar/elm-projects/database'

export default class ElmDashboardSidebarProjects < HTMLElement
  def initialize
    super
    
    init_elm()
  end

  def connected_callback()
    @c_database = CDatabase.new

    @c_database.get_schemas() do |tables|
      puts tables
    end
  end

  def disconnected_callback()
  end

  def init_elm()
    template = """
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
    """

    self.innerHTML = template
  end
end