document.addEventListener('DOMContentLoaded', () => {
  fetch('/src/data/services.json')
      .then(response => response.json())
      .then(data => {
          const services = data.services;
          const container = document.getElementById('search-container');
          const template = document.getElementById('service-template');

          services.forEach(service => {
              const clone = template.content.cloneNode(true);
              const img = clone.querySelector('img');
              const title = clone.querySelector('.service-info h3');
              const description = clone.querySelector('.service-info p');
              const doctor = clone.querySelector('.service-detail h3');
              const price = clone.querySelector('.service-detail h5');
              const button = clone.querySelector('.btn-submit');

              if (clone.querySelector('.service-detail h6') != undefined) {
                const status = clone.querySelector('.service-detail h6') 
                if (service.status == "cancelled") {
                    status.className = "cancelled"
                    status.innerText = "Cancelado"
                }
                if (service.status == "waiting") {
                    status.className = "waiting"
                    status.innerText = "Aguardando"
                }
                if (service.status == "prescription") {
                    const button = clone.querySelector('.service-detail button') 
                    button.type = "button"
                    button.innerText = "Prescrição"
                    button.className = "btn-submit"
                }
              }

              img.src = service.imgSrc;
              title.textContent = service.title;
              description.textContent = service.description;
              doctor.textContent = service.doctor;
              price.textContent = service.price;
              button.setAttribute('onclick', `showDialog('${service.title}')`);

              container.appendChild(clone);
          });
      });
});