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
  <div class='position-sticky'>
    <!-- Projekty -->
    <h6>Projekty</h6>
    <elm-dashboard-sidebar-projects></elm-dashboard-sidebar-projects>

    <hr>

    <!-- Tabulky projektu -->
    <h6>Tabulky projektu</h6>
    <div id='tableList' class='list-group list-group-flush'>
      <a href='#' class='list-group-item list-group-item-action'>
        <i class='bi bi-table'></i> Tabulka 1
      </a>
      <a href='#' class='list-group-item list-group-item-action'>
        <i class='bi bi-table'></i> Tabulka 2
      </a>
      <a href='#' class='list-group-item list-group-item-action'>
        <i class='bi bi-table'></i> Tabulka 3
      </a>
      <!-- Přidání nové tabulky -->
      <a href='#' class='list-group-item list-group-item-action text-success' data-bs-toggle='modal' data-bs-target='#addTableModal'>
        <i class='bi bi-plus-circle'></i> Přidat novou tabulku
      </a>
    </div>

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