const longUrlInput = document.getElementById("long-url");
const shortenBtn = document.querySelector(".shorten-btn");
const modal = document.getElementById("shorten-modal");
const closeBtn = document.querySelector(".close-btn");
const resultUrlInput = document.getElementById("result-url");
const qrImage = document.getElementById("qr-image");
const copyBtn = document.getElementById("copy-btn-modal");

// 1. Hàm gọi API tới Backend
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
      // Đổ dữ liệu vào Modal
      resultUrlInput.value = data.shortUrl;

      // Hiển thị QR Code (Chuỗi Base64 từ Backend)
      if (data.qrCode) {
        qrImage.src = data.qrCode;
        qrImage.style.display = "block";
        qrImage.style.width = "150px"; // Đảm bảo ảnh có kích thước cụ thể
        qrImage.style.margin = "0 auto"; // Căn giữa ảnh
      }

      // Mở Modal
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

// 2. Sự kiện Click nút Shorten
shortenBtn.addEventListener("click", handleShorten);

// 3. Đóng Modal
closeBtn.addEventListener("click", () => {
  modal.classList.remove("show");
});

// 4. Copy Link
copyBtn.addEventListener("click", () => {
  resultUrlInput.select();
  document.execCommand("copy");
  alert("Copied to clipboard!");
});

// 5. Tải ảnh QR (Bonus UX)
document.querySelector(".download-qr").addEventListener("click", () => {
  const link = document.createElement("a");
  link.href = qrImage.src;
  link.download = "qrcode.png";
  link.click();
});
