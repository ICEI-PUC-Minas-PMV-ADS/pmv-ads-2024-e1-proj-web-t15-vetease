import { lerDoLocalStorage, salvarNoLocalStorage, lerCookie } from './utils.mjs';


export function cancelSchedule(title) {
  const schedules = lerDoLocalStorage('schedules-db') || [];
  const email = lerCookie('user::email');

  const schedule = schedules.find(schedule => schedule.tutor_email === email);

  schedule.status = 'cancelled';

  salvarNoLocalStorage('schedules-db', schedules);
}

export function confirmSchedule(title) {
  const schedules = lerDoLocalStorage('schedules-db') || [];
  const email = lerCookie('user::email');

  const schedule = schedules.find(schedule => schedule.tutor_email === email);

  schedule.status = 'confirmed';

  salvarNoLocalStorage('schedules-db', schedules);
}

window.cancelSchedule = cancelSchedule;
window.confirmSchedule = confirmSchedule;