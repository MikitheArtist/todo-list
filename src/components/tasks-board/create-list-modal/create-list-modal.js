import { Modal } from 'ui-modal';


export class CreateListModal extends Modal {
  constructor (options) {
    super(options);
    
    this.bindEvents();
    console.log(this);
  }

  bindEvents() {
    document.addEventListener("submit", (event) => {
      event.preventDefault();

      const modalID = +event.target.closest("[data-modal]").dataset.modal;
      console.log(modalID);
      if (modalID === this.id) {
        const input = event.target.querySelector("[name=name]");
        console.log(input);
        if (input?.value) {
          this.resolveModal({
            name: input.value,
          });
        }
      }
    });
  }

  getHTML() {
    return `
    <div data-modal=${this.id} class='modal'>
      <div class='modal-overlay'></div>
      <form class='modal-content'>
        <div class='modal-content__header'>
          <h2>Добавить список</h2>
          <span data-modal-close class='close'>&times;</span>
        </div>
        <div class='modal-form'>
          <input
            class='form-input'
            name='name'
            placeholder='Имя списка...'
          />
        </div>
        <div class='modal-content__footer'>
          <button data-add-list-button class='btn btn-info' title='Добавить список'>
            Добавить
          </button>
          <button data-modal-close class='btn btn-warning' title='Отмена'>
            Отмена
          </button>
        </div>
      </form> 
    </div>
    `;
  }
}


