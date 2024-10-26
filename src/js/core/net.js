import { ENV } from "../env";

export default class Net {
  static curl(url, callback) {
    return fetch(url).then(response => response.text()).then((text) => {
      if (callback) return callback(text)
    })
  };

  static bef(options, callback) {
    let query = options[0];
    let dbName = options[1] || ENV.VITE_DATABASE;
    let encodeQuery = encodeURIComponent(query);

    return Net.curl(
      `/api/bef?db=${dbName}&query=${encodeQuery}`,

      (response) => {
        let data = JSON.parse(response);

        if (data.status_code === 403 || data.status_code === 405 || data.status === "SQL Error") {
          if (callback) return callback(null)
        } else if (callback) {
          return callback(data)
        }
      }
    )
  }
};

window.Net = Net