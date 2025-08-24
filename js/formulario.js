  (function () {
     // Reemplaza con tu Public Key
  })();

  document
    .getElementById("contact-form")
    .addEventListener("submit", function (e) {
      e.preventDefault();

      emailjs.sendForm("service_53qbo5a", "template_7z0b5h9", this).then(
        function () {
          alert("✅ Mensaje enviado correctamente");
          document.getElementById("contact-form").reset();
        },
        function (error) {
          alert("❌ Error al enviar: " + JSON.stringify(error));
        }
      );
    });