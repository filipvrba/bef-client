export default class AProtected < HTMLElement
  def initialize
    super

    token_check() do |user_id|
      if user_id
        protected_callback(user_id.to_i)
      else
        goto_signin()
      end
    end

    Net.token_check = token_check
  end

  def token_check(&callback)
    login_token = Cookie.get('l-token')
    if login_token
      sql = "SELECT user_id FROM tokens WHERE token='#{login_token}' " +
            "AND expires_at > CURRENT_TIMESTAMP;"
      Net.bef [sql] do |rows|
        is_active = rows.length > 0
        if is_active
          callback(rows[0]['user_id'].to_s) if callback
        else
          callback(nil) if callback
        end
      end
    else
      callback(nil) if callback
    end
  end

  def goto_signin()
    location.hash = "signin"
  end

  def protected_callback()
    raise Error, "The function is abstract."
    return nil
  end
end