export default class Net {
  static curl(url, callback) {
    return fetch(url).then(response => response.text()).then((text) => {
      if (callback) return callback(text)
    })
  };

  static bef(query, callback) {
    let encodeQuery = encodeURIComponent(query);

    return Net.curl(`/api/bef?query=${encodeQuery}`, (response) => {
      if (callback) return callback(JSON.parse(response))
    })
  }
};

window.Net = Net