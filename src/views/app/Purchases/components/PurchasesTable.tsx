import { useMemo, useRef } from "react";
import DataTable from "@/components/shared/DataTable";
import cloneDeep from "lodash/cloneDeep";
import dayjs from "dayjs";
import type { DataTableResetHandle, OnSortParam, ColumnDef } from "@/components/shared/DataTable";
import { useTranslation } from "react-i18next";
import { NumericFormat } from "react-number-format";
import { TableQueries } from "@/@types/common";
import { Purchase } from "../types";

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
        accessorKey: "client",
      },
      {
        header: t("doctor"),
        accessorKey: "doctor",
      },
      {
        header: t("price"),
        accessorKey: "price",
        cell: (props) => {
          return (
            <NumericFormat
              displayType="text"
              value={props.row.original.price}
              suffix=" MDL"
              thousandSeparator={true}
            />
          );
        },
      },
      {
        header: t("created_at"),
        accessorKey: "created_at",
        cell: (props) => {
          return <span>{dayjs(props.row.original.created_at).format("DD/MM/YYYY")}</span>;
        },
      },
    ],
    [t]
  );

  const onPaginationChange = (page: number) => {
    const newTableData = cloneDeep(tableData);
    newTableData.pageIndex = page;
    updateTableData(newTableData);
  };

  const onSort = (sort: OnSortParam) => {
    const newTableData = cloneDeep(tableData);
    newTableData.sort = sort;
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
      onSort={onSort}
    />
  );
};

export default PurchasesTable;
