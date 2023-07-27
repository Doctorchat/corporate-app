import { useMemo, useRef } from "react";
import DataTable from "@/components/shared/DataTable";
import cloneDeep from "lodash/cloneDeep";
import dayjs from "dayjs";
import type { DataTableResetHandle, ColumnDef } from "@/components/shared/DataTable";
import { useTranslation } from "react-i18next";
import { NumericFormat } from "react-number-format";
import { TableQueries } from "@/@types/common";
import { Purchase } from "../types";
import { Tag } from "@/components/ui";

export interface PurchasesTableProps {
  data: Purchase[];
  loading: boolean;
  tableData: TableQueries;
  updateTableData: (tableData: TableQueries) => void;
}

const PurchasesTable = ({ data, loading, tableData, updateTableData }: PurchasesTableProps) => {
  const { t } = useTranslation();

  const tableRef = useRef<DataTableResetHandle>(null);

  const columns: ColumnDef<Purchase>[] = useMemo(
    () => [
      {
        header: t("client"),
        accessorKey: "user_name",
        enableSorting: false,
      },
      {
        header: t("doctor"),
        accessorKey: "doctor_name",
        enableSorting: false,
      },
      {
        header: t("price"),
        accessorKey: "amount",
        cell: (props) => {
          return (
            <NumericFormat
              displayType="text"
              value={Number(props.row.original.amount)}
              suffix=" MDL"
              thousandSeparator={true}
            />
          );
        },
        enableSorting: false,
      },
      {
        header: t("price"),
        accessorKey: "amount",
        cell: (props) => {
          return (
            <NumericFormat
              displayType="text"
              value={Number(props.row.original.amount)}
              suffix=" MDL"
              thousandSeparator={true}
            />
          );
        },
        enableSorting: false,
      },
      {
        header: t("type"),
        accessorKey: "transaction_type",
        cell: (props) => {
          return <Tag>{t(`transaction_type.${props.row.original.transaction_type}`)}</Tag>;
        },
        enableSorting: false,
      },
      {
        header: t("created_at"),
        accessorKey: "created_at",
        cell: (props) => {
          return <span>{dayjs(props.row.original.created_at).format("DD/MM/YYYY")}</span>;
        },
        enableSorting: false,
      },
    ],
    [t]
  );

  const onPaginationChange = (page: number) => {
    const newTableData = cloneDeep(tableData);
    newTableData.pageIndex = page;
    updateTableData(newTableData);
  };

  return (
    <DataTable
      ref={tableRef}
      columns={columns}
      data={data}
      loading={loading}
      pagingData={{
        total: tableData.total as number,
        pageIndex: tableData.pageIndex as number,
        pageSize: tableData.pageSize as number,
      }}
      onPaginationChange={onPaginationChange}
    />
  );
};

export default PurchasesTable;
