import AdaptableCard from "@/components/shared/AdaptableCard";
import PurchasesTable from "./components/PurchasesTable";
import { useTranslation } from "react-i18next";

const Employees = () => {
  const { t } = useTranslation();

  return (
    <AdaptableCard className="h-full" bodyClass="h-full">
      <div className="lg:flex items-center justify-between mb-4">
        <h3 className="mb-4 lg:mb-0">{t("purchases")}</h3>
      </div>
      <PurchasesTable
        data={[
          {
            id: 1,
            client: "Nguyen Van A",
            doctor: "Nguyen Van A",
            price: 200,
            created_at: "2021-08-01 12:00:00",
          },
          {
            id: 2,
            client: "Nguyen Van B",
            doctor: "Nguyen Van B",
            price: 200,
            created_at: "2021-08-01 12:00:00",
          },
          {
            id: 3,
            client: "Nguyen Van C",
            doctor: "Nguyen Van C",
            price: 200,
            created_at: "2021-08-01 12:00:00",
          },
        ]}
        loading={false}
        tableData={{
          pageIndex: 1,
          pageSize: 10,
          total: 3,
        }}
        updateTableData={() => {}}
      />
    </AdaptableCard>
  );
};

export default Employees;
