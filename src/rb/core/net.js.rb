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

  def self.bef(query, &callback)
    encode_query = encodeURIComponent(query)
    Net.curl("/api/bef?query=#{encode_query}") do |response|
      callback(JSON.parse(response)) if callback
    end
  end
end
window.Net = Net
