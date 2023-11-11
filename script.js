const apiKey = "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";
const baseUrl = "https://api.openai.com/v1/images/generations";
const button = document.getElementById("button");
const input = document.getElementById("input_field");
const imagesWrapper = document.querySelector(".images-wrapper");
const loaderWrapper = document.querySelector(".loader-wrapper");
button.addEventListener("click", (e) => {
  e.preventDefault();
  getImages();
});

const getImages = async () => {
  loaderWrapper.style.display = "flex";
  try {
    if (!input.value) {
      alert("Please provide a value.");
      return;
    }
    if (!input.value.trim()) {
      alert("Please provide a valid prompt.");
      return;
    }
    imagesWrapper.innerHTML = "";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        n: 5,
        size: "1024x1024",
        prompt: input.value.trim(),
      }),
    };

    const response = await fetch(baseUrl, options);
    const data = await response.json();
    if (data && data.data && Array.isArray(data.data)) {
      data.data.forEach((d) => {
        const img = document.createElement("img");
        img.src = d.url;
        img.alt = "Image Generated";
        imagesWrapper.appendChild(img);
        loaderWrapper.style.display = "none";
      });
    }
    console.log(data);
    input.value = "";
  } catch (error) {
    alert("An error occurred. Please try again later.");
    console.log(error);
  } finally {
    loaderWrapper.style.display = "none";
  }
};
