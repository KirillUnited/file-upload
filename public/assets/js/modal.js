export default function Modal(elem, props = {}) {
    this.elem = document.querySelector('[data-modal]');
    this.closeAttrName = '[data-close]';
    //bind events    
    this.elem.addEventListener('click', this.close.bind(this), false);
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
    }
}