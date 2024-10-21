import CValidation from "../components/elm-signin/validation";
import CDatabase from "../components/elm-signin/database";
import CProtect from "../components/elm-signin/protect";

export default class ElmSignin extends HTMLElement {
  constructor() {
    super();

    this._hBtnSubmitClick = () => {
      return this.btnSubmitClick()
    };

    this.initElm()
  };

  connectedCallback() {
    this._inputEmail = this.querySelector("#inputEmail");
    this._inputPassword = this.querySelector("#inputPassword");
    this._btnSubmit = this.querySelector("#btnSubmit");
    this._spinnerOverlay = this.querySelector(".spinner-overlay");
    this._btnSubmit.addEventListener("click", this._hBtnSubmitClick);
    this._cValidation = new CValidation(this._inputEmail, this._inputPassword);
    this._cDatabase = new CDatabase(this);
    this._cProtect = new CProtect();
    return this._cProtect
  };

  disconnectedCallback() {
    return this._btnSubmit.removeEventListener(
      "click",
      this._hBtnSubmitClick
    )
  };

  btnSubmitClick() {
    return this._cValidation.validations(() => {
      let objElements = {
        email: this._inputEmail,
        password: this._inputPassword
      };

      return this._cDatabase.signin(objElements, (userId) => {
        let [token, date] = this._cProtect.writeNewToken();

        return this._cDatabase.addToken(
          {id: userId, token, date},
          () => location.hash = "dashboard"
        )
      })
    })
  };

  initElm() {
    let template = `${`
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
    `}`;
    return this.innerHTML = template
  };

  setSpinnerDisplay(isDisabled) {
    return this._spinnerOverlay.style.display = isDisabled ? "" : "none"
  }
}