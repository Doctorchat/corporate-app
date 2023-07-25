import Card from "@/components/ui/Card";
import { NumericFormat } from "react-number-format";
import { useTranslation } from "react-i18next";

type StatisticCardProps = {
  value: number;
  label: string;
  valueSuffix?: string;
};

const StatisticCard = ({ value, label, valueSuffix }: StatisticCardProps) => {
  return (
    <Card>
      <h6 className="font-semibold mb-4 text-sm">{label}</h6>
      <div className="flex justify-between items-center">
        <div>
          <h3 className="font-bold">
            <NumericFormat
              thousandSeparator
              displayType="text"
              value={value}
              suffix={valueSuffix}
            />
          </h3>
        </div>
      </div>
    </Card>
  );
};

const Statistic = () => {
  const { t } = useTranslation();

  const startDate = {
    revenue: 21827.13,
    orders: 1758,
    purchases: 7249.31,
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <StatisticCard value={startDate.revenue} valueSuffix=" MDL" label={t("current_balance")} />
      <StatisticCard value={startDate.purchases} valueSuffix=" MDL" label={t("total_purchases")} />
      <StatisticCard value={startDate.orders} label={t("employees")} />
    </div>
  );
};

export default Statistic;
