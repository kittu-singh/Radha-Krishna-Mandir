// EDIT THE DETAILS BELOW TO ADD YOUR REAL TEMPLE INFORMATION.
const members = [
  { name: "Temple member 01", role: "Temple Member 02", initials: "M2" },
  { name: "Temple Member 03", role: "Temple Member 04", initials: "M4" },
  { name: "Temple Member 05", role: "", initials: "TM" },
  { name: "Committee Treasurer", role: "Temple Member", initials: "M5" },
  { name: "Temple Member 05", role: "Member", initials: "M5" },
  { name: "Temple Member 06", role: "Member", initials: "M6" },
  { name: "Temple Member 07", role: "Member", initials: "M7" },
  { name: "Temple Member 08", role: "Member", initials: "M8" },
  { name: "Temple Member 09", role: "Member", initials: "M9" },
  { name: "Temple Member 10", role: "Member", initials: "M10" },
  { name: "Temple Member 11", role: "Member", initials: "M11" },
  { name: "Temple Member 12", role: "Member", initials: "M12" },
  { name: "Temple Member 13", role: "Member", initials: "M13" },
  { name: "Temple Member 14", role: "Member", initials: "M14" },
  { name: "Temple Member 15", role: "Member", initials: "M15" }
];

// Replace image paths with your actual temple photographs.
// For each member, add: photo: "assets/member-01.jpg"
const photos = [
  { title: "Temple Construction – Phase 1", image: "assets/gallery-temple-construction-1.jpg" },
  { title: "Temple Construction – Phase 2", image: "assets/gallery-temple-construction-2.jpg" },
  { title: "Temple Construction – Phase 3", image: "assets/gallery-temple-construction-3.jpg" },
  { title: "Radha Krishna Aarti", image: "assets/gallery-aarti.jpg" }
];

// Add your real YouTube URL or MP4 path in the video field.
// Example YouTube: "https://www.youtube.com/embed/VIDEO_ID"
// Example MP4: "assets/temple-construction.mp4"
const videos = [
  { title: "Temple Construction – Video 1", duration: "gallery-aarti.jpg.mp4", image: "assets/gallery-temple-construction-1.jpg", video: "gallery-aarti.jpg.mp4" },
  { title: "Temple Construction – Video 2", duration: "gallery-aarti.jpg.mp4", image: "gallery-aarti.jpg.mp4", video: "gallery-aarti.jpg.mp4" },
  { title: "Temple Construction – Video 3", duration: "gallery-aarti.jpg.mp4", image: "assets/gallery-temple-construction-3.jpg", video: "gallery-aarti.jpg.mp4" },
  { title: "Daily Aarti & Temple Events", duration: "Add video", image: "assets/gallery-aarti.jpg", video: "" }
];

const membersGrid = document.getElementById("membersGrid");
members.forEach((member, index) => {
  const card = document.createElement("article");
  card.className = "member";
  const photo = member.photo
    ? `<img class="member-photo" src="${member.photo}" alt="${member.name}">`
    : `<div class="member-photo" aria-label="${member.name}">${member.initials || String(index + 1).padStart(2, "0")}</div>`;
  card.innerHTML = `${photo}<div class="member-name">${member.name}</div><span class="member-role">${member.role}</span>`;
  membersGrid.appendChild(card);
});

const photoGallery = document.getElementById("photoGallery");
photos.forEach((photo) => {
  const item = document.createElement("button");
  item.className = "gallery-item";
  item.type = "button";
  item.innerHTML = `<img src="${photo.image}" alt="${photo.title}"><span>${photo.title}</span>`;
  item.addEventListener("click", () => openImage(photo.image, photo.title));
  photoGallery.appendChild(item);
});

const videoGallery = document.getElementById("videoGallery");
videos.forEach((video) => {
  const card = document.createElement("article");
  card.className = "video-card";
  card.innerHTML = `
    <button class="video-thumb" type="button" aria-label="Play ${video.title}">
      <img src="${video.image}" alt="${video.title}">
      <span class="play-button">▶</span>
    </button>
    <div class="video-meta"><strong>${video.title}</strong><small>${video.duration}</small></div>`;
  card.querySelector("button").addEventListener("click", () => {
    if (!video.video) {
      alert("Please add your video URL in the videos array in script.js.");
      return;
    }
    openVideo(video.video, video.title);
  });
  videoGallery.appendChild(card);
});

const lightbox = document.getElementById("lightbox");
const lightboxContent = document.getElementById("lightboxContent");
function openImage(src, title) {
  lightboxContent.innerHTML = `<h3>${title}</h3><img src="${src}" alt="${title}">`;
  lightbox.classList.add("open");
  lightbox.setAttribute("aria-hidden", "false");
}
function openVideo(url, title) {
  let media = "";
  if (url.endsWith(".mp4")) {
    media = `<video src="${url}" controls autoplay playsinline></video>`;
  } else {
    const safeUrl = url.includes("?") ? `${url}&autoplay=1` : `${url}?autoplay=1`;
    media = `<iframe src="${safeUrl}" title="${title}" width="900" height="506" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>`;
  }
  lightboxContent.innerHTML = `<h3>${title}</h3>${media}`;
  lightbox.classList.add("open");
  lightbox.setAttribute("aria-hidden", "false");
}
function closeLightbox() {
  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden", "true");
  lightboxContent.innerHTML = "";
}
document.getElementById("lightboxClose").addEventListener("click", closeLightbox);
lightbox.addEventListener("click", (event) => { if (event.target === lightbox) closeLightbox(); });
document.addEventListener("keydown", (event) => { if (event.key === "Escape") closeLightbox(); });

const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");
menuToggle.addEventListener("click", () => {
  const open = mainNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(open));
});
mainNav.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
  mainNav.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
}));
document.getElementById("year").textContent = new Date().getFullYear();
