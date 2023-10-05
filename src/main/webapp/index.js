function UploadFile() {
    let progress, response;
    function showUploadedItem(source) {
        let list = document.getElementById("image-list"), li = document.createElement("li");
        let img = document.createElement("img");
        img.src = source;
        li.appendChild(img);
        list.appendChild(li);
    }
    function upload() {
        let formdata = new FormData();
        for (let file of this.files) {
            let tipo = file.type;
            if (tipo.match(/image.*/)) {
                let reader = new FileReader();
                reader.onloadend = function (e) {
                    showUploadedItem(e.target.result);
                };
                reader.readAsDataURL(file);
                formdata.append("images[]", file);
            }
        }
        let xhr = new XMLHttpRequest();
        xhr.onload = function () {
            progress.style.display = "none";
            response.display = "block";
            response.innerHTML = xhr.responseText;
        };
        xhr.upload.addEventListener("progress", function (e) {
            let perc = Math.ceil(e.loaded / e.total);
            console.log(`Loaded: ${perc}`);
            response.display = "none";
            progress.style.display = "block";
            progress.value = perc;
        });
        xhr.open("post", "upload");
        xhr.send(formdata);
        document.forms[0].reset();
    }
    function registerEvents() {
        document.getElementById("btn").style.display = "none";
        let input = document.querySelector("input[type='file']");
        input.onchange = upload;
        progress = document.querySelector("progress");
        response = document.getElementById("response");
    }
    return { registerEvents };
}
onload = () => {
    let u = new UploadFile();
    u.registerEvents();
};