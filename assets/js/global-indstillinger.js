const settings = document.getElementById('settings');

//open indstillings side ved tryk på tandhjul icon
if (settings) {
settings.addEventListener("click", () => {
    const sti1 = "pages/indstillinger.html";
    const sti2 = "indstillinger.html";

    // Tjekker om det første sti er gyldig, hvis ikke bruges den anden sti
    if (fileExists(sti1)) {
      window.location.href = sti1;
    } else {
      window.location.href = sti2;
    }
  });
  
  // Kontrollere, om en fil eksisterer
  function fileExists(url) {
    const http = new XMLHttpRequest();
    http.open('HEAD', url, false);
    http.send();
    return http.status != 404;
  }
}

// rotation af pil ved valg af region 
const regionSelect = document.getElementById('regionSelect');
const arrowIcon = document.getElementById('arrowIcon');

regionSelect.addEventListener("click", () => {
  arrowIcon.classList.toggle("rotate");
});
