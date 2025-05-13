import { useState } from "react";
import { ArrowUp, ArrowDown } from "lucide-react";
import {
  ColumnDef,
  SortingState,
  ColumnFiltersState,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  useReactTable,
  HeaderGroup,
  Header,
  Row,
  Cell
} from "@tanstack/react-table";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Input } from "./ui/input";
import { ColoredTableCell } from "./ColoredTableCell"; // Import the new component

interface DataTableProps<TData> {
  data: TData[];
  header: Record<keyof TData, string>;
  isColoredTableCellFeatureEnabled: boolean;
}

export function DataTable<TData extends Record<string, any>>({ data, header, isColoredTableCellFeatureEnabled }: DataTableProps<TData>) {
  const createColumns = <T,>(header: Record<keyof T, string>): ColumnDef<T>[] => 
    Object.entries(header).map(([key, header]) => ({
      accessorKey: key as keyof T,
      header: header as string,
    }));

  const generatedColumns = createColumns<TData>(header);

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [pageSize, setPageSize] = useState(10);
  const [pageIndex, setPageIndex] = useState(0);
  
  const table = useReactTable({
    data,
    columns: generatedColumns,
    state: {
      sorting,
      columnFilters,
      globalFilter,
      pagination: {
        pageSize,
        pageIndex,
      },
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: setState => {
      if (typeof setState === 'function') {
        const newState = setState({ pageIndex, pageSize });
        setPageIndex(newState.pageIndex);
        setPageSize(newState.pageSize);
      }
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    globalFilterFn: 'includesString',
    manualPagination: false,
    pageCount: Math.ceil(data.length / pageSize),
  });

  return (
    <div className="space-y-4">
      <Input
        placeholder="Search all columns..."
        value={globalFilter}
        onChange={(e) => setGlobalFilter(e.target.value)}
        className="max-w-sm"
      />
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup: HeaderGroup<TData>) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header: Header<TData, unknown>) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder ? null : (
                      <div
                        className={
                          header.column.getCanSort()
                            ? "cursor-pointer select-none"
                            : ""
                        }
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        {String(header.column.columnDef.header)}
                        {header.column.getIsSorted() === "asc" ? (
                          <ArrowUp className="inline ml-1 h-4 w-4" />
                        ) : header.column.getIsSorted() === "desc" ? (
                          <ArrowDown className="inline ml-1 h-4 w-4" />
                        ) : null}
                      </div>
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.map((row: Row<TData>) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell: Cell<TData, unknown>, cellIndex: number) => {
                  const colKey = cell.column.id;
                  const currentValue = cell.getValue() as string | number;

                  const classificationColor = row?.original?.classification_color;
                  
                  return (
                    <ColoredTableCell
                      key={cell.id}
                      value={currentValue}
                      data={data}
                      isColoredTableCellFeatureEnabled={isColoredTableCellFeatureEnabled}
                      rowKey={row.original.api_endpoint}
                      columnKey={colKey}
                      classificationColor={classificationColor}
                    />
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <span>Rows per page:</span>
          <select
            value={pageSize}
            onChange={e => {
              const newSize = Number(e.target.value);
              table.setPageSize(newSize);
            }}
            className="rounded border p-1"
          >
            {[10, 20, 50, 100].map(size => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
          <span>
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </span>
        </div>

        <div className="space-x-2">
          <button
            className="rounded border px-2 py-1 disabled:opacity-50"
            disabled={!table.getCanPreviousPage()}
            onClick={() => table.previousPage()}
          >
            Previous
          </button>
          <button
            className="rounded border px-2 py-1 disabled:opacity-50"
            disabled={!table.getCanNextPage()}
            onClick={() => table.nextPage()}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
