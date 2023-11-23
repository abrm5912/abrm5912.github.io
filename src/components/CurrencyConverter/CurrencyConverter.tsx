import React, { useEffect, useRef, useState } from 'react';
import { Flex, InputNumber, Select, Form } from 'antd';
import { Exchange } from '../../types/exchange';
import { useExchangeStore } from '../../store';
import { getUniqueOptionsByProperty } from '../../utils/getUniqueOptionsByProperty';
import { useCurrencyConverter } from '../../hooks/useCurrencyConverter';
import { ReactComponent as ReverseSVG } from '../../assets/img/reverse.svg';
import './CurrencyConverter.css';

export const CurrencyConverter = () => {
  const [isReversed, setIsReversed] = useState(false);

  const exchangeItems = useExchangeStore(state => state.items);
  const sourceOptionList = useExchangeStore(state => (
    getUniqueOptionsByProperty<Exchange, keyof Exchange>(state.items, !isReversed ? 'ccy' : 'base_ccy'))
  );
  const targetOptionList = useExchangeStore(state => (
    getUniqueOptionsByProperty<Exchange, keyof Exchange>(state.items, !isReversed ? 'base_ccy' : 'ccy'))
  );

  const sourceDefaultValue = useRef('');
  const targetDefaultValue = useRef('');

  useEffect(() => {
    sourceDefaultValue.current = sourceOptionList[0]?.value as string;
    targetDefaultValue.current = targetOptionList[0]?.value as string;
  }, [sourceOptionList, targetOptionList]);

  const {
    sourceCurrency,
    targetCurrency,
    sourceAmount,
    targetAmount,
    handleSourceCurrencyChange,
    handleSourceAmountChange,
    handleTargetCurrencyChange,
    handleTargetAmountChange,
    toggleReversed,
  } = useCurrencyConverter(exchangeItems, sourceDefaultValue.current, targetDefaultValue.current, isReversed, setIsReversed);

  return (
    <Flex
      data-testid="currency-converter"
      className="currency-converter"
      justify="center"
      align="center"
    >
      <InputNumber
        min={0}
        className="source-amount"
        placeholder="Сhange"
        data-testid="sourceAmount"
        onChange={(value) => handleSourceAmountChange(value)}
        value={sourceAmount}
      />
      <Select
        defaultValue={sourceDefaultValue.current}
        className="source-currency"
        data-testid="sourceCurrency"
        options={sourceOptionList}
        onChange={(value) => handleSourceCurrencyChange(value)}
        value={sourceCurrency}
      />
      <ReverseSVG
        data-testid="reverse"
        className="reverse-icon"
        onClick={toggleReversed}
      />
      <InputNumber
        min={0}
        className="target-amount"
        placeholder="Get"
        data-testid="targetAmount"
        onChange={(value) => handleTargetAmountChange(value)}
        value={targetAmount}
      />
      <Select
        defaultValue={targetDefaultValue.current}
        className="target-currency"
        data-testid="targetCurrency"
        options={targetOptionList}
        onChange={(value) => handleTargetCurrencyChange(value)}
        value={targetCurrency}
      />
    </Flex>
  );
};
