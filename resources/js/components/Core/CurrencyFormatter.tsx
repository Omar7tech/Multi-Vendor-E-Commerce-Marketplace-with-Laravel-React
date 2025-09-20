

interface CurrencyFormatterProps {
  amount: number;
  currencyCode?: string;
  locale?: string;
}

const CurrencyFormatter: React.FC<CurrencyFormatterProps> = ({
  amount,
  currencyCode = 'USD',
  locale = 'en-US',
}) => {
  const formattedAmount = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currencyCode,
  }).format(amount);

  return <span>{formattedAmount}</span>;
};

export default CurrencyFormatter;
