class UploadFile {
    constructor() {
        this.progress = null;
        this.response = null;
    }
    showUploadedItem(source) {
        let list = document.getElementById("image-list"), li = document.createElement("li");
        let img = document.createElement("img");
        img.src = source;
        li.appendChild(img);
        list.appendChild(li);
    }
    upload(evt) {
        let formdata = new FormData();
        for (let file of evt.target.files) {
            let tipo = file.type;
            if (tipo.match(/image.*/)) {
                let reader = new FileReader();
                reader.onloadend = e => {
                    this.showUploadedItem(e.target.result);
                };
                reader.readAsDataURL(file);
                formdata.append("images[]", file);
            }
        }
        let xhr = new XMLHttpRequest();
        xhr.onload = () => {
            this.progress.style.display = "none";
            this.response.display = "block";
            this.response.innerHTML = xhr.responseText;
        };
        xhr.upload.addEventListener("progress", e => {
            let perc = Math.ceil(e.loaded / e.total);
            console.log(`Loaded: ${perc}`);
            this.response.display = "none";
            this.progress.style.display = "block";
            this.progress.value = perc;
        });
        xhr.open("post", "upload");
        xhr.send(formdata);
        document.forms[0].reset();
    }
    registerEvents() {
        document.getElementById("btn").style.display = "none";
        let input = document.querySelector("input[type='file']");
        input.onchange = this.upload.bind(this);
        this.progress = document.querySelector("progress");
        this.response = document.getElementById("response");
    }
}
onload = () => {
    let u = new UploadFile();
    u.registerEvents();
};