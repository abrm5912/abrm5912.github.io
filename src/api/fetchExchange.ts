const BASE_URL = 'https://api.privatbank.ua';
const PROXY_URL = 'https://api.allorigins.win';

export const fetchExchange = async () => {
  const url = `${BASE_URL}/p24api/pubinfo?json&exchange&coursid=4`;
  const response = await fetch(`${PROXY_URL}/raw?url=${encodeURIComponent(url)}`);
  return await response.json();
};

export const fakeFetchExchange = () => {
  return Promise.reject(new Error('Internal server error'));
};
