export default class CDatabase
  def initialize(element)
    @element = element

    @element.set_spinner_display(false)
  end

  def signin(options, &callback)
    @element.set_spinner_display(true)

    email         = options.email.value
    hash_password = options.password.value.encode_md5()

    query = "SELECT id FROM users WHERE email='#{email}' " +
            "AND hash_password='#{hash_password}';"

    Net.bef(query) do |rows|
      @element.set_spinner_display(false)
      is_signin = rows.length > 0 if rows

      if is_signin
        user_id = rows[0].id
        callback(user_id) if callback
      end
    end
  end

  def add_token(options, &callback)
    @element.set_spinner_display(true)

    query = "INSERT INTO tokens (user_id, token, expires_at) " +
            "VALUES (#{options.id}, '#{options.token}', '#{options.date}');"
      
    Net.bef(query) do |is_write|
      @element.set_spinner_display(false)
      
      if is_write
        callback.call() if callback
      end
    end
  end
end