import Modal from "./modal.js";
// preview images
export default function Upload(elem, props = {}) {
    this.elem = elem;
    this.preview = props.preview;
    this.minCount = props.minCount || 2;
    this.maxCount = props.maxCount || 5;
    // bind events
    this.elem.addEventListener('change', this.onChange.bind(this));
};

Upload.prototype = {
    onChange() {
        if (this.elem.files.length && this.elem.files.length >= this.minCount && this.elem.files.length <= this.maxCount) {
            this.upload();
        } else {
            this.elem.value = "";
            alert("ERROR", this.elem.value);
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

        this.preview.innerHTML = html;
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
    }
}