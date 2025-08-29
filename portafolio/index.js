
// Formulario de contacto
document.getElementById("formContacto").addEventListener("submit", function(e){
  e.preventDefault();
  document.getElementById("mensajeEnviado").innerText = "🌸 Tu mensaje fue enviado con éxito (simulado)";
  this.reset();
});
