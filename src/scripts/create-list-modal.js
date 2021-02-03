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
            <span data-action='cancel' class='close'>&times;</span>
          </div>
          <form class='modal-form'>
            <input
              class='modal-form__input'
              name='name'
              placeholder='Имя списка...'
            />

            <div class='modal-content__footer'>
            <button class='button' title=''>
            Добавить
            </button>
            <button data-action='cancel' class='button' title='Отмена'>
              Отмена
            </button>
            </div>
          </form>
        </div> 
      </div> 
    `;
  }
}


