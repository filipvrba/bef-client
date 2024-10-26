import ['ENV'], '../env'

export default class Net
  def self.curl(url, &callback)
    fetch(url)
    .then(lambda do |response|
      response.text()
    end)
    .then(lambda do |text|
      callback(text) if callback
    end)
  end

  def self.bef(options, &callback)
    query   = options[0]
    db_name = options[1] || ENV::VITE_DATABASE

    encode_query = encodeURIComponent(query)
    Net.curl("/api/bef?db=#{db_name}&query=#{encode_query}") do |response|

      data = JSON.parse(response)
      if data['status_code'] == 403 || data['status_code'] == 405 ||
         data.status == 'SQL Error'
        
        callback(nil) if callback
      else
        callback(data) if callback
      end
    end
  end
end
window.Net = Net
