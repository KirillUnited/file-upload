import Modal from "./modal.js";
// preview images
export default function Upload(elem, props = {}) {
    this.elem = elem;
    this.preview = props.preview;
    this.previewList = this.preview.querySelector('.upload-preview-list');
    this.minCount = props.minCount || 2;
    this.maxCount = props.maxCount || 5;
    this.draggable = props.draggable || false;
    // bind events
    this.elem.addEventListener('change', this.onChange.bind(this));
};

Upload.prototype = {
    onChange() {
        if (this.elem.files.length && this.elem.files.length >= this.minCount && this.elem.files.length <= this.maxCount) {
            this.upload();
        } else {
            const modalContent = `
                <h2 class="modal-title">Error</h2>
                <p class="modal-text">Please add not less than ${this.minCount} and not more than ${this.maxCount} files.</p>`;

            this.elem.value = "";
            new Modal(null, {content: modalContent}).open();
        }
    },
    upload() {
        if (!this.preview) return;

        let files = this.elem.files;
        let html = '';

        for (let index = 0; index < files.length; index++) {
            const file = files[index];
            const sizeInMB = this.getSizeToMB(file.size) + 'MB';
            const previewItem = this.renderPreview(file.name.trim(), sizeInMB);

            html += previewItem;
        }

        this.previewList.innerHTML = html;
        this.preview.hidden = false;
        this.elem.form.hidden = true;

        if (this.draggable) {
            this.handleDragMode();
        }
    },
    renderPreview(name, size) {
        return `
            <li class="upload-preview-item text-center">
                <img src="./assets/img/file.svg" alt="file icon">
                <h4 class="text-truncate">${name}</h4>
                <p class="text-truncate">${size}</p>
            </li>
            `;
    },
    getSizeToMB(sizeInBytes) {
        return (sizeInBytes / (1024 * 1024)).toFixed(2);
    },
    handleDragMode() {
        const previewList = this.previewList;
        const previewListItems = previewList.querySelectorAll('.upload-preview-item');

        for (const preview of previewListItems) {
            preview.draggable = true;
            preview.classList.add('draggable');
        }
        previewList.addEventListener(`dragstart`, (evt) => {
            evt.target.classList.add(`selected`);
        });
        previewList.addEventListener(`dragend`, (evt) => {
            evt.target.classList.remove(`selected`);
        });
        previewList.addEventListener(`dragover`, (evt) => {
            evt.preventDefault();

            const activeElement = previewList.querySelector(`.selected`);
            const currentElement = evt.target;
            const isMoveable = activeElement !== currentElement &&
                currentElement.classList.contains(`upload-preview-item`);
            const getNextElement = (cursorPosition, currentElement) => {
                const currentElementCoord = currentElement.getBoundingClientRect();
                const currentElementCenter = currentElementCoord.y + currentElementCoord.height / 2;
                const nextElement = (cursorPosition < currentElementCenter) ?
                    currentElement :
                    currentElement.nextElementSibling;

                return nextElement;
            };

            if (!isMoveable) {
                return;
            }

            const nextElement = getNextElement(evt.clientY, currentElement);

            if (
                nextElement &&
                activeElement === nextElement.previousElementSibling ||
                activeElement === nextElement
            ) {
                return;
            }

            previewList.insertBefore(activeElement, nextElement);
        });
    }
}