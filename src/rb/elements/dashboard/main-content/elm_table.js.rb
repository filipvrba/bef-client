export default class ElmDashboardMainContentTable < HTMLElement
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
<elm-dashboard-main-content-table-schema></elm-dashboard-main-content-table-schema>

<elm-dashboard-main-content-table-contents></elm-dashboard-main-content-table-contents>
    """

    self.innerHTML = template
  end
end