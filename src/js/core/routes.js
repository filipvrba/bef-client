import routesObj from "../../json/routes.json";
window.ROUTES_JSON = routesObj;
import errorHTML from "../../html/error.html?raw";
import signinHTML from "../../html/signin.html?raw";
window.PAGES = {error: errorHTML, signin: signinHTML};

class Routes {
  static priorityPages(priority=1) {
    return ROUTES_JSON.pages.filter(o => o.priority === priority)
  }
};

window.Routes = Routes