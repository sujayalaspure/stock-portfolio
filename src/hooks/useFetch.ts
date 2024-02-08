import {useEffect, useState} from 'react';

type Stock = {
  symbol: string;
  quantity: number;
  avgPrice: number;
  ltp: number;
  close: number;
};

export const useFetchStockList = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<Stock[]>([]);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    fetchStockList();
  }, []);

  const fetchStockList = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        'https://run.mocky.io/v3/bde7230e-bc91-43bc-901d-c79d008bddc8',
      );
      const jsonResponse = await response.json();
      setData(jsonResponse?.userHolding || []);
    } catch (catchError) {
      setError(catchError);
    } finally {
      setIsLoading(false);
    }
  };

  return {data, isLoading, error, fetchStockList};
};
