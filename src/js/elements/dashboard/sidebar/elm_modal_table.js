export default class ElmDashboardSidebarModalTable extends HTMLElement {
  constructor() {
    super();
    this.initElm()
  };

  connectedCallback() {
    return null
  };

  disconnectedCallback() {
    return null
  };

  initElm() {
    let template = `${`
<div class='modal fade' id='addTableModal' tabindex='-1' aria-labelledby='addTableModalLabel' aria-hidden='true'>
  <div class='modal-dialog'>
    <div class='modal-content'>
      <div class='modal-header'>
        <h5 class='modal-title' id='addTableModalLabel'>Přidat novou tabulku</h5>
        <button type='button' class='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
      </div>
      <div class='modal-body'>
        <form id='addTableForm'>
          <div class='mb-3'>
            <label for='tableName' class='form-label'>Název tabulky</label>
            <input type='text' class='form-control' id='tableName' placeholder='Název nové tabulky'>
          </div>
          <button type='submit' class='btn btn-primary'>Přidat tabulku</button>
        </form>
      </div>
    </div>
  </div>
</div>
    `}`;
    return this.innerHTML = template
  }
}