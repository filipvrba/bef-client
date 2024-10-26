export default class ElmDashboardSidebar < HTMLElement
  def initialize
    super
    
    init_elm()
  end

  def connected_callback()
  end

  def disconnected_callback()
  end

  def init_elm()
    template = """
<nav id='sidebarMenu' class='d-md-block bg-light sidebar collapse'>
  <div class='position-sticky' style='height: 100vh;'>
    <h6 class='mt-0 pt-3'>Projekty</h6>
    <elm-dashboard-sidebar-projects></elm-dashboard-sidebar-projects>
    <hr>
    <h6>Tabulky projektu</h6>
    <elm-dashboard-sidebar-tables></elm-dashboard-sidebar-tables>
    <hr>
    <!-- Nastavení -->
    <a href='#' class='list-group-item list-group-item-action'>
      <i class='bi bi-gear'></i> Nastavení
    </a>
  </div>
</nav>
    """

    self.innerHTML = template
  end
end