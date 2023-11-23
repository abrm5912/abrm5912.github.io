import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { Exchange } from '../types/exchange';

export function useCurrencyConverter(
  exchangeItems: Exchange[],
  sourceDefaultValue: string,
  targetDefaultValue: string,
  isReversed: boolean,
  setIsReversed: Dispatch<SetStateAction<boolean>>
) {
  const [sourceCurrency, setSourceCurrency] = useState<string>('');
  const [targetCurrency, setTargetCurrency] = useState<string>('');
  const [buyValue, setBuyValue] = useState<number>(0);
  const [saleValue, setSaleValue] = useState<number>(0);
  const [sourceAmount, setSourceAmount] = useState<number>();
  const [targetAmount, setTargetAmount] = useState<number>();

  useEffect(() => {
    if (sourceDefaultValue && targetDefaultValue && !sourceCurrency && !targetCurrency) {
      setSourceCurrency(sourceDefaultValue);
      setTargetCurrency(targetDefaultValue);
    }
  }, [sourceDefaultValue, targetDefaultValue]);

  useEffect(() => {
    const exchangeItem = exchangeItems.find((item) => (
        isReversed
          ? item.base_ccy === sourceCurrency && item.ccy === targetCurrency
          : item.ccy === sourceCurrency && item.base_ccy === targetCurrency
      )
    );
    if (exchangeItem) {
      setBuyValue(exchangeItem.buy);
      setSaleValue(exchangeItem?.sale);
    }
  }, [sourceCurrency, targetCurrency, exchangeItems]);

  useEffect(() => {
    if (sourceAmount != null && targetAmount != null) {
      if (!isReversed) {
        setTargetAmount(sourceAmount * saleValue);
      } else {
        setTargetAmount(sourceAmount / buyValue);
      }
    }
  }, [buyValue, saleValue, isReversed]);

  const handleSourceCurrencyChange = (value: string) => {
    setSourceCurrency(value);
  };

  const handleTargetCurrencyChange = (value: string) => {
    setTargetCurrency(value);
  };

  const handleSourceAmountChange = (value: number | null) => {
    if (value != null) {
      if (!isReversed) {
        setSourceAmount(value);
        setTargetAmount(value * saleValue);
      } else {
        setSourceAmount(value);
        setTargetAmount(value / buyValue);
      }
    } else {
      resetAmount();
    }
  };

  const handleTargetAmountChange = (value: number | null) => {
    if (value != null) {
      if (!isReversed) {
        setSourceAmount(value / saleValue);
        setTargetAmount(value);
      } else {
        setSourceAmount(value * buyValue);
        setTargetAmount(value);
      }

    } else {
      resetAmount();
    }
  };

  const resetAmount = () => {
    setSourceAmount(0);
    setTargetAmount(0);
  };

  const toggleReversed = () => {
    setIsReversed(prevState => {
      setSourceAmount(targetAmount);
      setTargetAmount(sourceAmount);
      setSourceCurrency(targetCurrency);
      setTargetCurrency(sourceCurrency);
      return !prevState;
    });
  };

  return {
    sourceCurrency,
    targetCurrency,
    sourceAmount,
    targetAmount,
    handleSourceCurrencyChange,
    handleSourceAmountChange,
    handleTargetCurrencyChange,
    handleTargetAmountChange,
    toggleReversed,
    resetAmount,
  };
}
