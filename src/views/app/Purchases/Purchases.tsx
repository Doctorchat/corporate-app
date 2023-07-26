import AdaptableCard from "@/components/shared/AdaptableCard";
import PurchasesTable from "./components/PurchasesTable";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import { Purchase } from "./types";
import { apiGetPurchases } from "@/services/PurchasesService";
import { useSessionStorage } from "usehooks-ts";

const Purchases = () => {
  const { t } = useTranslation();

  const [state, setState] = useSessionStorage("purchases-state", {
    page: 1,
  });

  const { data, isLoading } = useQuery(["purchases"], () =>
    apiGetPurchases<
      {
        data: Purchase[];
        pagination: {
          current_page: number;
          per_page: number;
          total: number;
        };
      },
      { page: number }
    >({
      page: state.page,
    })
  );

  return (
    <AdaptableCard className="h-full" bodyClass="h-full">
      <div className="lg:flex items-center justify-between mb-4">
        <h3 className="mb-4 lg:mb-0">{t("purchases")}</h3>
      </div>
      <PurchasesTable
        data={data?.data.data ?? []}
        loading={isLoading}
        tableData={{
          pageIndex: data?.data.pagination.current_page ?? 1,
          pageSize: data?.data.pagination.per_page ?? 10,
          total: data?.data.pagination.total ?? 0,
        }}
        updateTableData={({ pageIndex }) => {
          setState({ page: (pageIndex ?? 0) + 1 });
        }}
      />
    </AdaptableCard>
  );
};

export default Purchases;
