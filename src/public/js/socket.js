const socket = io();

const form = document.getElementById("serviceForm");
const container = document.getElementById("services");

if (form) {
  form.addEventListener("submit", event => {
    event.preventDefault();

    const service = {
      name: document.getElementById("name").value,
      description: document.getElementById("description").value,
      duration: Number(document.getElementById("duration").value),
      price: Number(document.getElementById("price").value),
      category: document.getElementById("category").value,
      available: document.getElementById("available").checked
    };

    socket.emit("newService", service);
    form.reset();
  });
}

socket.on("servicesUpdated", services => {
  if (!container) return;

  container.innerHTML = "";

  for (const service of services) {
    container.innerHTML += `
      <article>
        <h3>${service.name}</h3>
        <p>${service.description}</p>
        <p>Duración: ${service.duration}</p>
        <p>Precio: ${service.price}</p>
        <p>Categoría: ${service.category}</p>
        <p>Disponible: ${service.available}</p>
      </article>
    `;
  }
});
