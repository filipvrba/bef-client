export default function handler(req, res) {
  // is_verbose = req.query.verbose.downcase == 'true'
  let isVerbose = true;
  let sqlQuery = req.query.query;

  return query(
    sqlQuery,
    isVerbose,
    response => res.status(200).json(response)
  )
};

function query(query, isVerbose, callback) {
  let isSet = set(query, (data) => {
    if (callback) return callback(data)
  });

  if (!isSet) return get(query, (data) => {if (callback) return callback(data)})
};

function get(query, callback) {
  let queryEncode = encodeURIComponent(query);
  let uri = `${process.env.URL_API}?token=${process.env.BEF_CLIENT}&database=${process.env.DATABASE}&query=${queryEncode}`;

  return fetch(uri).then(response => response.json()).then((data) => {
    if (data.statusCode) {
      console.error(`GET: ${data.statusCode} ${data.status}`);
      if (callback) return callback([])
    } else if (callback) {
      return callback(data)
    }
  })
};

function set(query, isVerbose, callback) {
  let isActive = false;
  let lowQuery = query.toLowerCase();

  if (lowQuery.indexOf("insert into") > -1 || lowQuery.indexOf("create table") > -1) {
    isActive = true;

    send("post", query, isVerbose, (data) => {
      if (callback) return callback(data)
    })
  } else if (lowQuery.indexOf("delete") > -1) {
    isActive = true;

    send("delete", query, isVerbose, (data) => {
      if (callback) return callback(data)
    })
  } else if (lowQuery.indexOf("update") > -1) {
    isActive = true;

    send("patch", query, isVerbose, (data) => {
      if (callback) return callback(data)
    })
  };

  return isActive
};

function send(method, query, isVerbose=true, callback) {
  method = method.toUpperCase();

  return fetch(process.env.URL_API, {method, headers: {
    Token: process.env.BEF_SERVER,
    Database: process.env.DATABASE,
    Query: query
  }}).then(response => response.json()).then((data) => {
    if (data.status_code === 403 || data.status_code === 405 || data.status === "SQL Error") {
      if (isVerbose) console.error(`${method}: ${data.status_code} ${data.status}`);
      if (callback) return callback(false)
    } else if (callback) {
      return callback(true)
    }
  })
}