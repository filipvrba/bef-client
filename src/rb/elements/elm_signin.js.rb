import 'CValidation', '../components/elm-signin/validation'
import 'CDatabase', '../components/elm-signin/database'
import 'CProtect', '../components/elm-signin/protect'

export default class ElmSignin < HTMLElement
  def initialize
    super
    @h_btn_submit_click        = lambda { btn_submit_click() }
    @h_input_email_keypress    = lambda { input_email_keypress() }
    @h_input_password_keypress = lambda { input_password_keypress() }

    init_elm()
  end

  def connected_callback()
    @input_email     = self.query_selector('#inputEmail')
    @input_password  = self.query_selector('#inputPassword')
    @btn_submit      = self.query_selector('#btnSubmit')
    @spinner_overlay = self.query_selector('.spinner-overlay')

    @btn_submit.add_event_listener('click', @h_btn_submit_click)

    @input_email.add_event_listener('keypress', @h_input_email_keypress)
    @input_password.add_event_listener('keypress', @h_input_password_keypress)

    @c_validation = CValidation.new(@input_email, @input_password)
    @c_database   = CDatabase.new(self)
    @c_protect    = CProtect.new()
  end

  def disconnected_callback()
    @btn_submit.remove_event_listener('click', @h_btn_submit_click)
  end

  def btn_submit_click()

    @c_validation.validations do
      obj_elements = { email: @input_email, password: @input_password }
      @c_database.signin(obj_elements) do |user_id|

        token, date = @c_protect.write_new_token()

        @c_database.add_token({id: user_id, token: token, date: date}) do
          location.hash = "dashboard"
        end
      end
    end
  end

  def input_email_keypress()
    unless event.key == 'Enter'
      return
    end

    @input_password.focus()
  end

  def input_password_keypress()
    unless event.key == 'Enter'
      return
    end

    @btn_submit.click()
  end

  def init_elm()
    template = """
<elm-spinner class='spinner-overlay'></elm-spinner>

<div class='mb-3'>
    <label for='inputEmail' class='form-label'>Emailová adresa</label>
    <div class='input-group'>
      <span class='input-group-text'><i class='bi bi-envelope-fill'></i></span>
      <input type='email' class='form-control' id='inputEmail' placeholder='Zadejte email' required>
      <div id='signinValidationEmailFeedback' class='invalid-feedback'>
        Zadejte prosím platnou emailovou adresu.
      </div>
    </div>
</div>
<div class='mb-3'>
    <label for='inputPassword' class='form-label'>Heslo</label>
    <div class='input-group'>
      <span class='input-group-text'><i class='bi bi-lock-fill'></i></span>
      <input type='password' class='form-control' id='inputPassword' placeholder='Zadejte heslo' required>
      <div id='signinValidationPasswordFeedback' class='invalid-feedback'>
        Zadejte prosím heslo.
      </div>
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

  def set_spinner_display(is_disabled)
    @spinner_overlay.style.display = is_disabled ? '' : :none
  end
end