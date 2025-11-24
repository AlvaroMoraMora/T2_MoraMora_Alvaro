document.addEventListener("DOMContentLoaded", function () {
  const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]');

  const popoverList = [...popoverTriggerList].map(
      (popoverTriggerEl) => new bootstrap.Popover(popoverTriggerEl)
  );

  const instagram = document.querySelector('[data-bs-custom-class="tooltip-instagram"]');
  const tooltipInstagram = new bootstrap.Tooltip(instagram);

  const twitter = document.querySelector('[data-bs-custom-class="tooltip-twitter"]');
  const tooltipTwitter = new bootstrap.Tooltip(twitter);
  
  const tiktok = document.querySelector('[data-bs-custom-class="tooltip-tiktok"]');
  const tooltipTiktok = new bootstrap.Tooltip(tiktok);
});