const socket = io();

const form = document.getElementById("serviceForm");
const container = document.getElementById("services");
const availableContainer = document.getElementById("availableServices");
const formMessage = document.getElementById("formMessage");

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

    formMessage.textContent = "Guardando servicio...";
    socket.emit("newService", service);
  });
}

function renderServices(target, services, emptyMessage) {
  target.innerHTML = "";

  if (services.length === 0) {
    const message = document.createElement("p");
    message.textContent = emptyMessage;
    target.appendChild(message);
    return;
  }

  for (const service of services) {
    const article = document.createElement("article");
    article.className = "service-card";

    const title = document.createElement("h3");
    title.textContent = service.name;
    article.appendChild(title);

    const details = [
      service.description,
      `Duración: ${service.duration} minutos`,
      `Precio: $${service.price}`,
      `Categoría: ${service.category}`
    ];

    for (const detail of details) {
      const paragraph = document.createElement("p");
      paragraph.textContent = detail;
      article.appendChild(paragraph);
    }

    const availability = document.createElement("p");
    availability.className = "availability";
    availability.textContent = service.available
      ? "Disponible"
      : "No disponible";

    article.appendChild(availability);
    target.appendChild(article);
  }
}

socket.on("servicesUpdated", services => {
  if (container) {
    renderServices(
      container,
      services,
      "No hay servicios cargados."
    );
  }

  if (availableContainer) {
    const availableServices = services.filter(
      service => service.available === true
    );

    renderServices(
      availableContainer,
      availableServices,
      "No hay servicios disponibles."
    );
  }
});

socket.on("serviceCreated", () => {
  if (form) {
    form.reset();
    formMessage.textContent = "Servicio creado correctamente.";
  }
});

socket.on("serviceError", message => {
  if (formMessage) {
    formMessage.textContent = message;
  }
});