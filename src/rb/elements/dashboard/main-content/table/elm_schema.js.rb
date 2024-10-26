import 'ElmDashboardSidebarTables', '../../sidebar/elm_tables'

export default class ElmDashboardMainContentTableSchema < HTMLElement
  def initialize
    super
    @h_sidebar_table_btn_click = lambda {|e| sidebar_table_btn_click(e.detail.value)}
    
    init_elm()
  end

  def connected_callback()
    Events.connect('#app', ElmDashboardSidebarTables::ENVS.btn_click, @h_sidebar_table_btn_click)

    @schema_header  = self.query_selector('#schemaHeader')
    @schema_columns = self.query_selector('#schemaColumns')
  end

  def disconnected_callback()
    Events.disconnect('#app', ElmDashboardSidebarTables::ENVS.btn_click, @h_sidebar_table_btn_click)
  end

  def sidebar_table_btn_click(table)
    @schema_header.inner_text = "Schéma tabulky: #{table.name}"
    update_subinit_elm(table)
  end

  def init_elm()
    template = """
<!-- Dynamic Table Schema -->
<div id='table-schema'>
  <h4 id='schemaHeader'>Schéma tabulky: Tabulka 1</h4>
  <div class='table-responsive'>
    <table class='table table-bordered'>
      <thead class='table-light'>
        <tr>
          <th>Název Sloupce</th>
          <th>Typ Dat</th>
          <th>Akce</th>
        </tr>
      </thead>
      <tbody id='schemaColumns'>
        
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
    """

    self.innerHTML = template
  end

  def update_subinit_elm(table)
    elements = []

    table.columns.each do |column|
    template = """
      <tr>
        <td>#{column.name}</td>
        <td>#{column.data_type}</td>
        <td>
          <button class='btn btn-sm btn-primary'><i class='bi bi-pencil'></i> Upravit</button>
          <button class='btn btn-sm btn-danger'><i class='bi bi-trash'></i> Smazat</button>
        </td>
      </tr>
      """

      elements.push(template)
    end

    table.others.each do |other|
      template = """
        <tr>
          <td></td>
          <td>#{other}</td>
          <td>
            <button class='btn btn-sm btn-primary'><i class='bi bi-pencil'></i> Upravit</button>
            <button class='btn btn-sm btn-danger'><i class='bi bi-trash'></i> Smazat</button>
          </td>
        </tr>
        """
  
        elements.push(template)
      end

    @schema_columns.innerHTML = elements.join('')
  end
end