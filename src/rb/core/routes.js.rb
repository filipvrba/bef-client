import 'routesObj', '../../json/routes.json'

window.ROUTES_JSON = routes_obj

import 'errorHTML', '../../html/error.html?raw'
import 'signinHTML', '../../html/signin.html?raw'
import 'dashboardHTML', '../../html/dashboard.html?raw'

window.PAGES = {
  error: errorHTML,
  signin: signinHTML,
  dashboard: dashboardHTML,
}

class Routes
  def self.priority_pages(priority = 1)
    ROUTES_JSON.pages.select {|o| o.priority == priority}
  end
end
window.Routes = Routes