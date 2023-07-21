import axios from 'axios';
import { formatDate } from './utils';

export const getGarrapatas = (fechaInicio, fechaFin) => {
  let url = 'http://localhost:8080/api/garrapatas';

  if (fechaInicio && fechaFin) {
    url += '/startDate/' + formatDate(fechaInicio) + '/endDate/' + formatDate(fechaFin);
  }

  return axios.get(url);
};

export const createGarrapata = (newGarrapataData) => {
  return axios.post('http://localhost:8080/api/garrapatas', newGarrapataData);
};
