import Card from "@/components/ui/Card";
import { NumericFormat } from "react-number-format";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "@/store";
import { useState } from "react";
import { Button, Dialog, Input } from "@/components/ui";
import { apiAddSoldCurrent } from "@/services/EmployeesService";
import { HiPhone } from "react-icons/hi";

type StatisticCardProps = {
  value: number;
  label: string;
  valueSuffix?: string;
  buttonName?: string;
};
interface ApiResponse {
  data: {
    redirect?: string;
  };
}
const SOLD_MINIM = 100;
const StatisticCard = ({ value, label, valueSuffix, buttonName }: StatisticCardProps) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [sold, setSold] = useState<number | string>();
  const [loading, setLoading] = useState(false);
  const [isValid, setIsValid] = useState(true);
  const { t } = useTranslation();

  const addSoldCurrent = async () => {
    setLoading(true);
    const inputSum = Number(sold);

    try {
      const response: ApiResponse = await apiAddSoldCurrent({
        amount: inputSum,
      });

      if (response.data.redirect) {
        setLoading(false);
        setIsOpenModal(false);
        window.location.href = response.data.redirect;
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setSold(inputValue);
    setIsValid(Number(inputValue) >= 100);
  };

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
        {buttonName && (
          <button
            onClick={() => setIsOpenModal(true)}
            className="button bg-white border border-gray-300 dark:bg-gray-700 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 active:bg-gray-100 dark:active:bg-gray-500 dark:active:border-gray-500 text-gray-600 dark:text-gray-100 radius-round h-9 px-3 py-2 text-sm"
          >
            {buttonName}
          </button>
        )}
      </div>
      <Dialog
        isOpen={isOpenModal}
        shouldCloseOnOverlayClick={false}
        shouldCloseOnEsc={false}
        width={370}
        onClose={() => setIsOpenModal(false)}
        onRequestClose={() => setIsOpenModal(false)}
      >
        <h5>{t("sold_current")}</h5>
        <p className="py-3">{t("sold_minim", { SOLD_MINIM })}</p>
        <Input placeholder={t("sold_sum")} type={"number"} onChange={handleInputChange} />
        {!isValid && <p style={{ color: "red" }}>{t("valid_sold")}</p>}
        <div className="text-right mt-6">
          <Button
            className="ltr:mr-2 rtl:ml-2"
            variant="plain"
            size="sm"
            onClick={() => setIsOpenModal(false)}
          >
            {t("cancel")}
          </Button>

          {loading ? (
            <Button variant="solid" size="sm" shape="circle" loading icon={<HiPhone />} />
          ) : (
            <Button variant="solid" size="sm" disabled={!isValid} onClick={addSoldCurrent}>
              {t("accept")}
            </Button>
          )}
        </div>
      </Dialog>
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
        buttonName={t("sold_current")}
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
