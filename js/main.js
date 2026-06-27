document.addEventListener("DOMContentLoaded", () => {
    const stats = document.querySelectorAll('.stat-number');
    
    // Fonction d'animation du compteur
    const startCounter = (counterElement) => {
        const target = parseInt(counterElement.getAttribute('data-target'), 10);
        const duration = 2000; // Durée de l'animation en millisecondes (2 secondes)
        const startTime = performance.now();
        
        const updateCounter = (currentTime) => {
            const elapsedTime = currentTime - startTime;
            const progress = Math.min(elapsedTime / duration, 1); // Bloque la progression à 1 maximum
            
            // Calcul de la valeur actuelle
            const currentValue = Math.floor(progress * target);
            
            // Formatage pour ajouter le "+" ou séparateur si besoin (ex: +2 500)
            if (target >= 1000) {
                // Formate avec un espace pour les milliers
                counterElement.textContent = "+" + currentValue.toLocaleString('fr-FR');
            } else {
                counterElement.textContent = "+" + currentValue;
            }
            
            // Continue l'animation tant qu'on n'a pas atteint la durée cible
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            }
        };
        
        requestAnimationFrame(updateCounter);
    };

    // Configuration de l'Observer de défilement (Scroll)
    const observerOptions = {
        root: null, // utilise le viewport du navigateur
        threshold: 0.2 // Déclenche quand 20% de la zone des stats est visible
    };

    const statsObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            // Si la section des statistiques entre dans l'écran
            if (entry.isIntersecting) {
                stats.forEach(stat => startCounter(stat));
                // Désactive l'observer après le premier déclenchement pour éviter de relancer au ré-scroll
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // On cible le parent des stats à observer
    const statsContainer = document.querySelector('.stats-container');
    if (statsContainer) {
        statsObserver.observe(statsContainer);
    }
});

          // DARK MODE TOGGLE

const themeToggle = document.getElementById("themeToggle");
const body = document.body;

// Charger le thème sauvegardé
if (localStorage.getItem("theme") === "dark") {
  body.classList.add("dark-mode");
  themeToggle.textContent = "☀️";
}

// Toggle au clic
themeToggle.addEventListener("click", () => {
  body.classList.toggle("dark-mode");

  if (body.classList.contains("dark-mode")) {
    localStorage.setItem("theme", "dark");
    themeToggle.textContent = "☀️";
  } else {
    localStorage.setItem("theme", "light");
    themeToggle.textContent = "🌙";
  }
});

