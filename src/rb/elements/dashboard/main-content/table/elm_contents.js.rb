import 'ElmDashboardSidebarTables', '../../sidebar/elm_tables'
import 'CDatabase', '../../../../components/dashboard/main-content/table/elm-contents/database'

export default class ElmDashboardMainContentTableContents < HTMLElement
  def initialize
    super
    @h_sidebar_table_btn_click = lambda {|e| sidebar_table_btn_click(e.detail.value)}    

    init_elm()
  end

  def connected_callback()
    Events.connect('#app', ElmDashboardSidebarTables::ENVS.btn_click, @h_sidebar_table_btn_click)

    @content_header       = self.query_selector('#contentHeader')
    @content_column_names = self.query_selector('#contentColumnNames')
    @content_rows         = self.query_selector('#contentRows')
  end

  def disconnected_callback()
    Events.disconnect('#app', ElmDashboardSidebarTables::ENVS.btn_click, @h_sidebar_table_btn_click)
  end

  def sidebar_table_btn_click(table_schema)
    @c_database = CDatabase.new(table_schema.name)

    @content_header.inner_text = "Obsah tabulky: #{table_schema.name}"
    update_column_names_init_elm(table_schema)
    update_rows_init_elm(table_schema)
  end

  def init_elm()
    template = """
<div id='table-content' class='mt-5'>
  <h4 id='contentHeader'>Obsah tabulky: Tabulka 1</h4>
  <div class='table-responsive'>
    <table class='table table-bordered'>
      <thead class='table-light'>
        <tr id='contentColumnNames'>
          <th>id</th>
          <th>název</th>
          <th>Akce</th>
        </tr>
      </thead>
      <tbody id='contentRows'>
        <tr>
          <td>1</td>
          <td>Záznam 1</td>
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

  def update_column_names_init_elm(table_schema)
    elements = []
    table_schema.columns.each do |column|
      template = "<th>#{column.name}</th>"
      elements.push(template)
    end
    elements.push('<th>Akce</th>')

    @content_column_names.innerHTML = elements.join('')
  end

  def update_rows_init_elm(table_schema)
    column_names = table_schema.columns.map {|o| o.name}
    @c_database.get_contents() do |rows|

      element_rows = []

      rows.each do |row|
        element_columns = []

        column_names.each do |column_name|
          column_value = row[column_name]

          template_column = "<td>#{column_value}</td>"
          element_columns.push(template_column)
        end

        element_columns.push("""
        <td>
          <button class='btn btn-sm btn-primary'><i class='bi bi-pencil'></i> Upravit</button>
          <button class='btn btn-sm btn-danger'><i class='bi bi-trash'></i> Smazat</button>
        </td>
        """)
        element_rows.push("<tr>#{element_columns.join('')}</tr>")
      end

      @content_rows.innerHTML = element_rows.join('')
    end
  end
end
