// Animation pour les sections
document.addEventListener("scroll", () => {
    const sections = document.querySelectorAll("section");
    const scrollPosition = window.scrollY + window.innerHeight;
  
    sections.forEach((section) => {
      if (scrollPosition > section.offsetTop) {
        section.style.opacity = 1;
        section.style.transform = "translateY(0)";
      }
    });
  });


document.querySelectorAll('.filter button').forEach(button => {
  button.addEventListener('click', () => {
      const filter = button.dataset.filter;

      document.querySelectorAll('.project-card').forEach(card => {
          card.style.display = (filter === 'all' || card.dataset.category === filter) ? '' : 'none';
      });

      document.querySelectorAll('.filter button').forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
  });
});


function toggleSidebar() {
  const sidebar = document.getElementById("sidebar");
  const hamburger = document.querySelector(".hamburger-menu");
  sidebar.classList.toggle("active");
  hamburger.classList.toggle("active");
}


// Initialisation d'EmailJS
(function () {
  emailjs.init("iP6iXrt0fsKUx7RP0"); 
})();

// Gestion du formulaire avec EmailJS
document.getElementById("contact-form").addEventListener("submit", function (event) {
  event.preventDefault(); 

  // Sélection de l'élément pour afficher le statut
  const status = document.getElementById("form-status");

  // Récupération des données du formulaire
  const formData = {
    name: document.getElementById("name").value.trim(),
    email: document.getElementById("email").value.trim(),
    phone: document.getElementById("phone").value.trim(),
    message: document.getElementById("message").value.trim(),
  };

  // Vérification des champs obligatoires
  if (!formData.name || !formData.email || !formData.message) {
    status.textContent = "Veuillez remplir tous les champs obligatoires.";
    status.style.color = "red";
    return;
  }

  // Envoi des données via EmailJS
  emailjs
    .send("service_5ch69jb", "template_zzri904", formData)
    .then(
      function () {
        // Affichage du succès
        status.textContent = "Message envoyé avec succès ! Merci de m'avoir contacté.";
        status.style.color = "green";

        // Réinitialisation du formulaire
        document.getElementById("contact-form").reset();
      },
      function (error) {
        // Affichage de l'erreur
        console.error("Erreur lors de l'envoi du message :", error);
        status.textContent = "Erreur lors de l'envoi. Veuillez réessayer plus tard.";
        status.style.color = "red";
      }
    );
});