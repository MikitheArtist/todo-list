import { Modal } from 'ui-modal';


export class CreateListModal extends Modal {
  constructor (options) {
    super(options);
    
    this.bindEvents();
  }

  bindEvents() {
    document.addEventListener("submit", (event) => {
      event.preventDefault();

      const modalID = event.target.closest("[data-modal]").dataset.modal;
      console.log(modalID);
      if (modalID === this.id) {
        const input = event.target.querySelector("[name=name]");

        if (input?.value) {
          this.addList({
            name: input.value,
          });
        }
      }
    });
  }

  getHTML() {
    return `
      <div data-modal=${this.id} class='modal-overlay'>
        <div class='modal-content'>
          <div class='modal-content__header'>
            <h2>Добавить список</h2>
            <span data-modal-close class='close'>&times;</span>
          </div>
          <form>
            <input
              class='form-input'
              name='name'
              placeholder='Имя списка...'
            />
          </form>
          <div class='modal-content__footer'>
              <button data-action='ok' class='btn btn-info' title=''>
              Добавить
              </button>
              <button data-modal-close class='btn btn-warning' title='Отмена'>
                Отмена
              </button>
            </div>
        </div> 
      </div> 
    `;
  }
}


