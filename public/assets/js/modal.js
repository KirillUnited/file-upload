let model = {
    $toggleModal: document.querySelectorAll('[data-toggle="modal"]'),
    $modal: document.querySelector('[data-modal]'),
    closeAttrName: '[data-close]'
}

function init(props) {
    model = Object.assign({}, model, props);
    if (!model.$modal)
        return;

    bindEvents();
}

function bindEvents() {
    model.$modal.addEventListener('click', function (e) {
        if (e.target === this || e.target.closest(model.closeAttrName)) {
            e.preventDefault();

            toggle(this);
        }
    }, false);

    model.$toggleModal.forEach(element => {
        const MODAL_ID = element.getAttribute('data-target');
        const $modal = document.querySelector(`${MODAL_ID}`);

        element.addEventListener('click', function (e) {
            e.preventDefault();

            if ($modal) {
                toggle($modal);
            }
        }, false);
    });
}

function toggle(modal) {
    let html = document.documentElement;

    html.classList.toggle("modal-is-active");
    modal.hidden = !modal.hidden;
}

export default init;