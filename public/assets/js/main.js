import Upload from "./upload.js";

const $uploadFile = document.getElementById("uploadFile");
const $uploadPreview = document.getElementById("uploadPreview");

new Upload($uploadFile, { preview: $uploadPreview });