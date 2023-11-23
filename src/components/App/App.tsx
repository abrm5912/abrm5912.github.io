import React, { useEffect, useState } from 'react';
import { Alert, Layout } from 'antd';
import useSWR from 'swr';
import { Header, Content, Footer } from 'antd/lib/layout/layout';
import { fakeFetchExchange, fetchExchange } from '../../api/fetchExchange';
import { ExchangeTable } from '../ExchangeTable/ExchangeTable';
import { CurrencyConverter } from '../CurrencyConverter/CurrencyConverter';
import { useExchangeStore } from '../../store';
import { ReactComponent as Logo } from '../../assets/img/logo.svg';
import './App.css';


function App() {
  const { data, isLoading } = useSWR('exchange', fetchExchange);
  const [fetchCounter, setFetchCounter] = useState<number>(+localStorage.getItem('counter')!);
  const [fetchError, setFetchError] = useState<string>();
  const setIsLoading = useExchangeStore(state => state.setIsLoading);

  useEffect(() => {
    setIsLoading(isLoading);
    if (!isLoading) {
      setFetchCounter(prevState => prevState + 1);
    }
  }, [isLoading]);

  useEffect(() => {
    if (fetchCounter === 5) {
      setFetchCounter(0);
      fakeFetchExchange().catch((error) => {
        console.error(error);
        setFetchError('Failed to load exchange data');
      });
    }
    localStorage.setItem('counter', fetchCounter.toString());
  }, [fetchCounter]);

  return (
    <Layout data-testid="layout" className="layout">
      <Header data-testid="header" className="layout-header">
        <Logo className="bitcoin-logo" data-testid="logo"/>
        React Exchange
      </Header>
      <Content data-testid="content" className="layout-content">
        {!fetchError ? (
            <>
              <ExchangeTable data-testid="exchange-table" data={data}/>
              <CurrencyConverter data-testid="currency-converter"/>
            </>
          ) :
          <Alert
            message="Error"
            className="layout-content-error"
            data-testid="alert"
            description="Internal error occurred. Try again later."
            type="error"
            showIcon
          />
        }
      </Content>
      <Footer data-testid="footer" className="layout-footer">
        &copy; 2023 all right reserved
      </Footer>
    </Layout>
  );
}

export default App;
