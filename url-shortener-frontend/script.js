const longUrlInput = document.getElementById("long-url");
const shortenBtn = document.querySelector(".shorten-btn");
const modal = document.getElementById("shorten-modal");
const closeBtn = document.querySelector(".close-btn");
const resultUrlInput = document.getElementById("result-url");
const qrImage = document.getElementById("qr-image");
const copyBtn = document.getElementById("copy-btn-modal");

async function handleShorten() {
  const longUrl = longUrlInput.value;
  if (!longUrl) return alert("Please enter a URL!");

  try {
    shortenBtn.innerText = "Loading...";
    shortenBtn.disabled = true;

    const response = await fetch("http://localhost:2300/api/url", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ longUrl: longUrl }),
    });

    const data = await response.json();

    if (response.ok) {
      resultUrlInput.value = data.shortUrl;

      // QR Code
      if (data.qrCode) {
        qrImage.src = data.qrCode;
        qrImage.style.display = "block";
        qrImage.style.width = "150px";
        qrImage.style.margin = "0 auto";
      }

      // Show the modal
      modal.classList.add("show");
    } else {
      alert("Error: " + (data.errorCreateUrl || "Something went wrong"));
    }
  } catch (error) {
    console.error("Fetch error:", error);
    alert("Cannot connect to Server. Make sure Backend is running!");
  } finally {
    shortenBtn.innerText = "Shorten";
    shortenBtn.disabled = false;
  }
}

// Shorten URL
shortenBtn.addEventListener("click", handleShorten);

// Close modal
closeBtn.addEventListener("click", () => {
  modal.classList.remove("show");
});

// Copy link
copyBtn.addEventListener("click", () => {
  resultUrlInput.select();
  document.execCommand("copy");
  alert("Copied to clipboard!");
});

// Download QR Code
document.querySelector(".download-qr").addEventListener("click", () => {
  const link = document.createElement("a");
  link.href = qrImage.src;
  link.download = "qrcode.png";
  link.click();
});
