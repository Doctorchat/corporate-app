import Card from "@/components/ui/Card";
import { NumericFormat } from "react-number-format";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "@/store";

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

  const company = useAppSelector((state) => state.auth.user);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <StatisticCard
        value={Number(company.balance)}
        valueSuffix=" MDL"
        label={t("current_balance")}
      />
      <StatisticCard
        value={company.totalExpenses}
        valueSuffix=" MDL"
        label={t("total_purchases")}
      />
      <StatisticCard value={company.employeeCount} label={t("employees")} />
    </div>
  );
};

export default Statistic;
