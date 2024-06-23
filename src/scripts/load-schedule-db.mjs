import { salvarNoLocalStorage } from "./utils.mjs";

(() => {
  // Verifica se o localStorage já tem a lista de agendamentos
  if (!localStorage.getItem('schedules-db')) {
    fetch('https://icei-puc-minas-pmv-ads.github.io/pmv-ads-2024-e1-proj-web-t15-veteasedata/scheduling.json')
      .then(response => response.json())
      .then(data => {
        const schedules = JSON.parse(localStorage.getItem('schedules-db')) || [];
        const newSchedules = data?.scheduling || [];

        newSchedules.forEach(newSchedule => {
          const existingSchedule = schedules.find(schedule => schedule.name === newSchedule.name && schedule.date === newSchedule.date);

          if (existingSchedule) {
            // Atualiza campos específicos se necessário
            existingSchedule.observations = newSchedule.observations;
            existingSchedule.preferences = newSchedule.preferences;
          } else {
            // Adiciona novo agendamento se não existir
            schedules.push(newSchedule);
          }
        });

        salvarNoLocalStorage('schedules-db', schedules);
      })
      .catch(error => console.error('Erro ao buscar os agendamentos:', error));
  }
})();
