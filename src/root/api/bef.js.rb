export default def handler(req, res)
  sql_query  = req.query.query

  query(sql_query) do |response|
    res.status(200).json(response)
  end
end

def query(query, &callback)
  is_set = set(query) do |data|
    callback(data) if callback
  end
  unless is_set
    get(query) do |data|
      callback(data) if callback
    end
  end
end

def get(query, &callback)
  query_encode = encodeURIComponent(query)
  uri = "#{process.env.URL_API}?token=#{process.env.BEF_CLIENT}" +
      "&database=#{process.env.DATABASE}&query=#{query_encode}"

  fetch(uri)
  .then(lambda do |response|
    response.json()
  end)
  .then(lambda do |data|
    if data.status_code
      console.error("GET: #{data.status_code} #{data.status}")
      callback([]) if callback
    else
      callback(data) if callback
    end
  end)
end

def set(query, &callback)
  is_active = false
  low_query = query.downcase()

  if low_query.indexOf('insert into') > -1 ||
     low_query.indexOf('create table') > -1
    
    is_active = true
    send('post', query) do |data|
      callback(data) if callback
    end
  elsif low_query.indexOf('delete') > -1

    is_active = true
    send('delete', query) do |data|
      callback(data) if callback
    end
  elsif low_query.indexOf('update') > -1

    is_active = true
    send('patch', query) do |data|
      callback(data) if callback
    end
  end

  return is_active
end

def send(method, query, &callback)
  method = method.upcase()
  
  fetch(process.env.URL_API, {
    method: method,
    headers: {
      'Token': process.env.BEF_SERVER,
      'Database': process.env.DATABASE,
      'Query': query,
    }
  })
  .then(lambda do |response|
    response.json()
  end)
  .then(lambda do |data|
    callback(data) if callback
  end)
end