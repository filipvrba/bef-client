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

    return this._btnSubmit.addEventListener(
      "click",
      this._hBtnSubmitClick
    )
  };

  disconnectedCallback() {
    return this._btnSubmit.removeEventListener(
      "click",
      this._hBtnSubmitClick
    )
  };

  btnSubmitClick() {
    let email = this._inputEmail.value;
    let password = this._inputPassword.value;

    return Net.bef(
      "select client_token from Authorization;",
      response => console.log(response)
    )
  };

  initElm() {
    let template = `${`
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
    `}`;
    return this.innerHTML = template
  }
}