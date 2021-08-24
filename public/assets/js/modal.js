export default function Modal(elem, props = {}) {
    this.elem = elem || document.querySelector('[data-modal]');
    this.closeAttrName = '[data-close]';
    this.content = props.content || '';
    //bind events    
    this.elem.addEventListener('click', this.close.bind(this), false);

    this.content ? this.renderContent() : null;
};

Modal.prototype = {
    open() {
        let html = document.documentElement;

        html.classList.add("modal-is-active");
        this.elem.hidden = false;
    },
    close(e) {
        if (e.target === this.elem || e.target.closest(this.closeAttrName)) {
            e.preventDefault();

            let html = document.documentElement;

            html.classList.remove("modal-is-active");
            this.elem.hidden = true;
        }
    },
    renderContent() {
        const content = this.elem.querySelector('[data-modal-content]');

        content.innerHTML = this.content;
    }
}