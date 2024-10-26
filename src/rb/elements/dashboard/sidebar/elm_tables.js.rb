import 'ElmDashboard', '../../elm_dashboard'

export default class ElmDashboardSidebarTables < HTMLElement
  ENVS = {
    btn_click: 'elmDashSideTab-btnClick'
  }

  def initialize
    super
    @h_relevant_tables = lambda {|e| update_relevant_tables(e.detail.value)}

    @relevant_tables = nil
    
    init_elm()

    window.btn_table_click = btn_table_click
  end

  def connected_callback()
    @table_list = self.query_selector('#tableList')

    Events.connect('#app', ElmDashboard::ENVS.relevant_tables, @h_relevant_tables)
  end

  def disconnected_callback()
    Events.disconnect('#app', ElmDashboard::ENVS.relevant_tables, @h_relevant_tables)
  end

  def update_relevant_tables(tables)
    @relevant_tables = tables

    name_tables = tables.map {|o| o.name}
    init_elm_update_tables(name_tables)
    check_active_button() do |table_name|
      btn_table_click(table_name)
    end
  end

  def btn_table_click(table_name)
    URLParams.set('table', table_name)
    current_btn = find_button(table_name)
    current_btn.scroll_into_view({ behavior: 'smooth', block: 'center' })

    obj_table = find_table(table_name)
    Events.emit('#app', ENVS.btn_click, obj_table)
  end

  def find_table(table_name)
    @relevant_tables.each do |table|
      if table.name == table_name
        return table
      end
    end

    return nil
  end

  def init_elm()
    template = """
<div id='tableList' class='list-group list-group-flush'>
</div>
    """

    self.innerHTML = template
  end

  def init_elm_update_tables(name_tables)
    elements = []
    name_tables.each do |name|
      template = """
      <button href='#' class='list-group-item list-group-item-action' onclick='btnTableClick(\"#{name}\")'>
        <i class='bi bi-table'></i> #{name}
      </button>
      """
      elements.push(template)
    end

    @table_list.innerHTML = elements.join('')
  end

  def find_button(table_name)
    self.query_selector("[onclick='btnTableClick(\"#{table_name}\")']")
  end

  def check_active_button(&callback)
    table_name = URLParams.get('table')
    
    if table_name
      obj_table = find_table(table_name)

      if obj_table
        callback(table_name) if callback
      else
        console.warn("The '#{table_name}' table was not found.")
      end
    end
  end
end