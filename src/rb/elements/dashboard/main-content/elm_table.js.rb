import 'ElmDashboardSidebarTables', '../sidebar/elm_tables'

export default class ElmDashboardMainContentTable < HTMLElement
  def initialize
    super
    
    @h_sidebar_table_btn_click   = lambda {|e| sidebar_table_btn_click(e.detail.value)}

    init_elm()
  end

  def connected_callback()
    Events.connect('#app', ElmDashboardSidebarTables::ENVS.btn_click, @h_sidebar_table_btn_click)
  end

  def disconnected_callback()
    Events.disconnect('#app', ElmDashboardSidebarTables::ENVS.btn_click, @h_sidebar_table_btn_click)
  end

  def sidebar_table_btn_click(table)
    puts table
  end

  def init_elm()
    template = """
<!-- Dynamic Table Schema -->
<div id='table-schema'>
  <h4>Schéma tabulky: Tabulka 1</h4>
  <div class='table-responsive'>
    <table class='table table-bordered'>
      <thead class='table-light'>
        <tr>
          <th>Název Sloupce</th>
          <th>Typ Dat</th>
          <th>Akce</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>id</td>
          <td>integer</td>
          <td>
            <button class='btn btn-sm btn-primary'><i class='bi bi-pencil'></i> Upravit</button>
            <button class='btn btn-sm btn-danger'><i class='bi bi-trash'></i> Smazat</button>
          </td>
        </tr>
        <tr>
          <td>název</td>
          <td>varchar(255)</td>
          <td>
            <button class='btn btn-sm btn-primary'><i class='bi bi-pencil'></i> Upravit</button>
            <button class='btn btn-sm btn-danger'><i class='bi bi-trash'></i> Smazat</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <button class='btn btn-success mt-3'><i class='bi bi-plus'></i> Přidat nový sloupec</button>
</div>

<!-- Dynamic Table Content -->
<div id='table-content' class='mt-5'>
  <h4>Obsah tabulky: Tabulka 1</h4>
  <div class='table-responsive'>
    <table class='table table-bordered'>
      <thead class='table-light'>
        <tr>
          <th>id</th>
          <th>název</th>
          <th>Akce</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>Záznam 1</td>
          <td>
            <button class='btn btn-sm btn-primary'><i class='bi bi-pencil'></i> Upravit</button>
            <button class='btn btn-sm btn-danger'><i class='bi bi-trash'></i> Smazat</button>
          </td>
        </tr>
        <tr>
          <td>2</td>
          <td>Záznam 2</td>
          <td>
            <button class='btn btn-sm btn-primary'><i class='bi bi-pencil'></i> Upravit</button>
            <button class='btn btn-sm btn-danger'><i class='bi bi-trash'></i> Smazat</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <button class='btn btn-success mt-3'><i class='bi bi-plus'></i> Přidat nový záznam</button>
</div>
    """

    self.innerHTML = template
  end
end