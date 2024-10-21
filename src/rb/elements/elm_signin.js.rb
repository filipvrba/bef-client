export default class ElmSignin < HTMLElement
  def initialize
    super
    @h_btn_submit_click = lambda { btn_submit_click() }

    init_elm()
  end

  def connected_callback()
    @input_email    = self.query_selector('#inputEmail')
    @input_password = self.query_selector('#inputPassword')
    @btn_submit     = self.query_selector('#btnSubmit')

    @btn_submit.add_event_listener('click', @h_btn_submit_click)
  end

  def disconnected_callback()
    @btn_submit.remove_event_listener('click', @h_btn_submit_click)
  end

  def btn_submit_click()
    email    = @input_email.value
    password = @input_password.value

    Net.bef("select client_token from Authorization;") do |response|
      puts response
    end
  end

  def init_elm()
    template = """
<div class='mb-3'>
    <label for='inputEmail' class='form-label'>Emailová adresa</label>
    <div class='input-group'>
      <span class='input-group-text'><i class='bi bi-envelope-fill'></i></span>
      <input type='email' class='form-control' id='inputEmail' placeholder='Zadejte email' required>
    </div>
</div>
<div class='mb-3'>
    <label for='inputPassword' class='form-label'>Heslo</label>
    <div class='input-group'>
      <span class='input-group-text'><i class='bi bi-lock-fill'></i></span>
      <input type='password' class='form-control' id='inputPassword' placeholder='Zadejte heslo' required>
    </div>
</div>
<div class='mb-3 form-check'>
  <input type='checkbox' class='form-check-input' id='rememberMe'>
  <label class='form-check-label' for='rememberMe'>Pamatovat si mě</label>
</div>
<button id='btnSubmit' class='btn btn-primary w-100'>Přihlásit se</button>
    """

    self.innerHTML = template
  end
end