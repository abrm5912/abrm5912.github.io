export interface ExchangeDataFromAPI {
  ccy: string;
  base_ccy: string;
  buy: number;
  sale: number;
}

export interface Exchange extends ExchangeDataFromAPI {
  id: number;
}
