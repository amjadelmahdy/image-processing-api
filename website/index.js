const file = document.querySelector("[type=file]");
const imgFormat = document.querySelector("#format");
const width = document.querySelector("#width");
const height = document.querySelector("#height");
const quality = document.querySelector("#quality");
const rotate = document.querySelector("#rotate");
const blr = document.querySelector("#blur");
const hue = document.querySelector("#hue");
const saturation = document.querySelector("#saturation");
const grayscale = document.querySelector("#grayscale");
const addText = document.querySelector("#text");
const tintR = document.querySelector("#red");
const tintG = document.querySelector("#green");
const tintB = document.querySelector("#blue");
const img = document.querySelector("img");
const btn = document.querySelector("button");
const fileLabel = document.querySelector(".custom-file-label");
const reqSpan = document.querySelector("#request code");
const resSpan = document.querySelector("#response code");
const statSpan = document.querySelector(".status");
const httpCode = document.querySelector(".httpCode");
const httpMsg = document.querySelector(".httpMsg");
const loader = document.querySelector(".loader");
const download = document.querySelector("#download");
let req;
let data;

const upload = async function (event) {
  event.preventDefault();

  img.classList.add("hidden");
  loader.classList.remove("hidden");

  statSpan.classList.remove("text-success");
  statSpan.classList.remove("text-danger");

  httpCode.innerHTML = "---";
  httpMsg.innerHTML = "---";

  const formData = new FormData();

  const elmArr = [
    imgFormat,
    width,
    height,
    quality,
    rotate,
    blr,
    hue,
    saturation,
    addText,
    tintR,
    tintG,
    tintB,
  ];

  if (file.files[0]) {
    formData.append("file", file.files[0]);
  }

  if (grayscale.checked == true) {
    formData.append("grayscale", true);
  }

  // If the element has value, append it to the form
  elmArr.forEach((e) => {
    if (e.value) {
      formData.append(e.name, e.value);
    }
  });

  // Extract request body
  req = JSON.stringify(Object.fromEntries(formData));

  reqSpan.innerHTML = req;

  const res = await fetch("/optimize", {
    method: "POST",
    body: formData,
  });

  data = await res.json();

  httpCode.innerHTML = res.status;
  httpMsg.innerHTML = res.statusText;
  resSpan.innerHTML = JSON.stringify(data);

  img.classList.remove("hidden");
  loader.classList.add("hidden");

  // If success
  if (res.status == 201) {
    img.src = `/image/${data.details.img_name}`;
    statSpan.classList.remove("text-danger");
    statSpan.classList.add("text-success");
    download.href = `/download/${data.details.img_name}`;
    return;
  }

  // If failed

  img.src = "./image_placeholder.jpg";
  statSpan.classList.remove("text-success");
  statSpan.classList.add("text-danger");
};

// Add file name to the UI
btn.addEventListener("click", upload);
file.onchange = function (e) {
  fileLabel.innerHTML = e.target.files[0].name;
};
