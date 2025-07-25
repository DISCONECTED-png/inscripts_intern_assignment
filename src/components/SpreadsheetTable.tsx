import React, { useState, useMemo, useEffect, useCallback } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper,
} from "@tanstack/react-table";
import type { JobRow } from "../types/types";
import { mockData } from "../data/mockData";
import { HiOutlineDotsHorizontal } from "react-icons/hi";

const columnHelper = createColumnHelper<JobRow>();

const StatusBadge = ({ status }: { status: string }) => {
  const colorMap: Record<string, string> = {
    "In-process": "bg-yellow-100 text-yellow-700",
    "Complete": "bg-green-100 text-green-700",
    "Blocked": "bg-red-100 text-red-700",
    "Need to start": "bg-gray-200 text-gray-700",
  };
  return status ? (
    <span
      className={`text-xs font-medium px-2 py-1 rounded-full ${colorMap[status]}`}
    >
      {status}
    </span>
  ) : (
    ""
  );
};

const EditableCell = ({
  value: initialValue,
  rowIndex,
  columnId,
  onChange,
}: {
  value: string;
  rowIndex: number;
  columnId: string;
  onChange: (rowIndex: number, columnId: string, value: string) => void;
}) => {
  const [value, setValue] = useState(initialValue || "");

  useEffect(() => {
    setValue(initialValue || "");
  }, [initialValue]);

  const onBlur = () => {
    onChange(rowIndex, columnId, value);
  };

  return (
    <input
      className="w-full outline-none bg-transparent truncate"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onBlur={onBlur}
    />
  );
};

const SpreadsheetTable: React.FC = () => {
  const [data, setData] = useState<JobRow[]>(mockData);

  const handleChange = useCallback(
    (rowIndex: number, columnId: string, value: string) => {
      setData((prev) => {
        const updated = [...prev];
        (updated[rowIndex] as any)[columnId] = value;
        return updated;
      });
    },
    []
  );
  

  const columns = useMemo(
    () => [
      columnHelper.display({
        id: "row",
        header: () => (
          <div className="flex items-center gap-1">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-[#AFAFAF]"
            >
              <path
                d="M7.32461 1.92627C7.37593 1.65494 7.19758 1.39338 6.92625 1.34205C6.65492 1.29073 6.39336 1.46908 6.34203 1.74041L5.66264 5.33202L2.49977 5.3335C2.22362 5.33362 1.99987 5.55759 2 5.83373C2.00013 6.10987 2.22409 6.33362 2.50023 6.3335L5.47347 6.33211L4.84297 9.66526L1.8331 9.66667C1.55696 9.6668 1.33321 9.89076 1.33333 10.1669C1.33346 10.443 1.55743 10.6668 1.83357 10.6667L4.65379 10.6653L4.00868 14.0757C3.95736 14.3471 4.13571 14.6086 4.40704 14.66C4.67837 14.7113 4.93993 14.5329 4.99126 14.2616L5.67161 10.6649L9.32091 10.6632L8.67539 14.0757C8.62406 14.3471 8.80241 14.6086 9.07374 14.66C9.34508 14.7113 9.60664 14.5329 9.65796 14.2616L10.3387 10.6627L13.5002 10.6612C13.7764 10.6611 14.0001 10.4371 14 10.161C13.9999 9.88484 13.7759 9.66109 13.4998 9.66121L10.5279 9.6626L11.1584 6.32945L14.1669 6.32804C14.443 6.32792 14.6668 6.10395 14.6667 5.82781C14.6665 5.55167 14.4426 5.32791 14.1664 5.32804L11.3476 5.32936L11.9913 1.92627C12.0426 1.65494 11.8643 1.39338 11.593 1.34205C11.3216 1.29073 11.0601 1.46908 11.0087 1.74041L10.3298 5.32984L6.68047 5.33154L7.32461 1.92627ZM6.49129 6.33163L10.1406 6.32993L9.51009 9.66308L5.86079 9.66478L6.49129 6.33163Z"
                fill="#AFAFAF"
              />
            </svg>

          </div>
        ),
        cell: (info) => info.row.index + 1,
        size: 36,
      }),
      columnHelper.accessor("jobRequest", {
        header: () => (
          <div className="flex items-center gap-1">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-[#AFAFAF]"
            >
              <path
                d="M6.83333 2.33333H9.16667C9.44281 2.33333 9.66667 2.55719 9.66667 2.83333V3.99999H6.33333V2.83333C6.33333 2.55719 6.55719 2.33333 6.83333 2.33333ZM5.33333 2.83333V3.99999H4.16667C2.97005 3.99999 2 4.97004 2 6.16666V7.16666C2 7.81099 2.52233 8.33333 3.16667 8.33333H6.66667V8C6.66667 7.63181 6.96514 7.33333 7.33333 7.33333H8.66667C9.03486 7.33333 9.33333 7.6318 9.33333 8V8.33333H12.8333C13.4777 8.33333 14 7.81099 14 7.16666V6.16666C14 4.97004 13.03 3.99999 11.8333 3.99999H10.6667V2.83333C10.6667 2.0049 9.99509 1.33333 9.16667 1.33333H6.83333C6.00491 1.33333 5.33333 2.0049 5.33333 2.83333ZM14 8.99272C13.6632 9.20833 13.2629 9.33333 12.8333 9.33333H9.33333C9.33333 9.70152 9.03486 10 8.66667 10H7.33333C6.96514 10 6.66667 9.70152 6.66667 9.33333H3.16667C2.73712 9.33333 2.33677 9.20833 2 8.99272V11.1667C2 12.3633 2.97005 13.3333 4.16667 13.3333H11.8333C13.03 13.3333 14 12.3633 14 11.1667V8.99272Z"
                fill="#AFAFAF"
              />
            </svg>

            Job Request
          </div>
        ),
        cell: (info) => (
          <EditableCell
            value={String(info.getValue() ?? "")}

            rowIndex={info.row.index}
            columnId={info.column.id}
            onChange={handleChange}
          />
        ),
      }),
      columnHelper.accessor("submitted", {
        header: () => (
          <div className="flex items-center gap-1">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.00001 1.33333C11.6819 1.33333 14.6667 4.3181 14.6667 8C14.6667 11.6819 11.6819 14.6667 8.00001 14.6667C4.31811 14.6667 1.33334 11.6819 1.33334 8C1.33334 4.3181 4.31811 1.33333 8.00001 1.33333ZM4.97979 6.64644C4.78453 6.8417 4.78453 7.15829 4.97979 7.35355L7.64646 10.0202C7.84172 10.2155 8.1583 10.2155 8.35356 10.0202L11.0202 7.35355C11.2155 7.15829 11.2155 6.8417 11.0202 6.64644C10.825 6.45118 10.5084 6.45118 10.3131 6.64644L8.00001 8.95955L5.6869 6.64644C5.49163 6.45118 5.17505 6.45118 4.97979 6.64644Z"
                fill="#AFAFAF"
              />
            </svg>

            Submitted
          </div>
        ),
        cell: (info) => (
          <EditableCell
            value={String(info.getValue() ?? "")}

            rowIndex={info.row.index}
            columnId={info.column.id}
            onChange={handleChange}
          />
        ),
      }),
      columnHelper.accessor("submitter", {
        header: () => (
          <div className="flex items-center gap-1">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.8361 9.33327C12.6641 9.33327 13.3353 10.0045 13.3353 10.8325V11.4448C13.3353 11.8271 13.2159 12.1998 12.9936 12.5108C11.963 13.9529 10.2802 14.6674 7.99998 14.6674C5.71933 14.6674 4.03736 13.9526 3.00925 12.5097C2.78794 12.1991 2.66901 11.8272 2.66901 11.4458V10.8325C2.66901 10.0045 3.34024 9.33327 4.16826 9.33327H11.8361ZM7.99998 1.33641C9.84093 1.33641 11.3333 2.82879 11.3333 4.66974C11.3333 6.51069 9.84093 8.00308 7.99998 8.00308C6.15903 8.00308 4.66665 6.51069 4.66665 4.66974C4.66665 2.82879 6.15903 1.33641 7.99998 1.33641Z"
                fill="#AFAFAF"
              />
            </svg>

            Submitter
          </div>
        ),
        cell: (info) => (
          <EditableCell
            value={String(info.getValue() ?? "")}

            rowIndex={info.row.index}
            columnId={info.column.id}
            onChange={handleChange}
          />
        ),
      }),
      columnHelper.accessor("status", {
        header: () => (
          <div className="flex items-center gap-1">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.00001 1.33333C11.6819 1.33333 14.6667 4.3181 14.6667 8C14.6667 11.6819 11.6819 14.6667 8.00001 14.6667C4.31811 14.6667 1.33334 11.6819 1.33334 8C1.33334 4.3181 4.31811 1.33333 8.00001 1.33333ZM4.97979 6.64644C4.78453 6.8417 4.78453 7.15829 4.97979 7.35355L7.64646 10.0202C7.84172 10.2155 8.1583 10.2155 8.35356 10.0202L11.0202 7.35355C11.2155 7.15829 11.2155 6.8417 11.0202 6.64644C10.825 6.45118 10.5084 6.45118 10.3131 6.64644L8.00001 8.95955L5.6869 6.64644C5.49163 6.45118 5.17505 6.45118 4.97979 6.64644Z"
                fill="#AFAFAF"
              />
            </svg>

            Status
          </div>
        ),
        cell: (info) => {
          const val = info.getValue();
          return val ? <StatusBadge status={val} /> : (
            <EditableCell
            value={String(val ?? "")}
              rowIndex={info.row.index}
              columnId={info.column.id}
              onChange={handleChange}
            />
          );
        },
      }),
      columnHelper.accessor("url", {
        header: () => (
          <div className="flex items-center gap-1">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.93615 11.0006H10.0638C9.65051 13.1815 8.82291 14.666 7.99998 14.666C7.20198 14.666 6.39959 13.2701 5.97485 11.1969L5.93615 11.0006ZM2.04385 11.0007L4.91427 11.0005C5.15745 12.3887 5.56964 13.5697 6.10906 14.3962C4.40051 13.8916 2.97807 12.7217 2.14141 11.1866L2.04385 11.0007ZM11.0857 11.0005L13.9561 11.0007C13.1352 12.6271 11.6678 13.8714 9.89157 14.3959C10.3946 13.6242 10.7871 12.5442 11.0348 11.2753L11.0857 11.0005ZM11.2876 6.66723L14.5343 6.66682C14.6218 7.0977 14.6677 7.54366 14.6677 8.00035C14.6677 8.69723 14.5608 9.36914 14.3625 10.0006H11.2274C11.2976 9.36221 11.3343 8.69149 11.3343 8.00035C11.3343 7.69747 11.3273 7.39851 11.3134 7.10447L11.2876 6.66723ZM1.46565 6.66682L4.71233 6.66723C4.6815 7.10053 4.66561 7.54603 4.66561 8.00035C4.66561 8.55326 4.68915 9.0931 4.73451 9.61379L4.77259 10.0006H1.6375C1.43919 9.36914 1.33228 8.69723 1.33228 8.00035C1.33228 7.54366 1.37819 7.0977 1.46565 6.66682ZM5.71697 6.66685H10.283C10.3165 7.09727 10.3343 7.54317 10.3343 8.00035C10.3343 8.55878 10.3077 9.10037 10.2584 9.6175L10.2173 10.0006H5.78261C5.70725 9.37011 5.66561 8.69839 5.66561 8.00035C5.66561 7.65746 5.67566 7.32093 5.69481 6.9925L5.71697 6.66685ZM9.96282 1.71806C11.9031 2.19856 13.5191 3.7163 14.2479 5.66679H11.1873C10.977 4.05571 10.5497 2.67192 9.96282 1.71806ZM6.02782 1.62912C4.40051 2.23959 2.97807 3.74262 2.14141 5.66679H4.81262C5.08543 3.82402 5.52184 2.50428 6.02782 1.62912ZM7.99998 1.33466C8.87917 1.33466 9.7637 3.02916 10.1426 5.45695H5.8261C6.1857 3.12737 7.09566 1.33466 7.99998 1.33466Z"
                fill="#AFAFAF"
              />
            </svg>

            URL
          </div>
        ),
        cell: (info) => (
          <EditableCell
            value={String(info.getValue() ?? "")}

            rowIndex={info.row.index}
            columnId={info.column.id}
            onChange={handleChange}
          />
        ),
      }),
      columnHelper.accessor("assigned", {
        header: () => (
          <div className=" flex items-center gap-1">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5 5V1.16667C5 0.890529 5.22386 0.666672 5.5 0.666672C5.77614 0.666672 6 0.890529 6 1.16667V5C6 5.18409 6.14924 5.33333 6.33333 5.33333C6.51743 5.33333 6.66667 5.18409 6.66667 5V1.66667C6.66667 1.39053 6.89053 1.16667 7.16667 1.16667C7.44281 1.16667 7.66667 1.39053 7.66667 1.66667V5.5C7.66667 5.51414 7.66607 5.52814 7.66493 5.54199C7.95308 5.43311 8.31391 5.33079 8.66667 5.33079C8.99989 5.33079 9.28489 5.41401 9.49615 5.52041C9.60044 5.57295 9.69745 5.63651 9.7767 5.70859C9.81565 5.74401 9.86061 5.79081 9.89971 5.84897C9.93043 5.89468 10 6.00873 10 6.16667C10 6.33907 9.91121 6.49929 9.76502 6.59067L8.49411 7.38497L7.38889 8.64563L6.47069 9.91037C6.12579 10.3855 5.5742 10.6667 4.98712 10.6667H4.22809C3.60745 10.6667 3.01234 10.3514 2.6915 9.79257C2.49007 9.44173 2.24071 8.98076 2.04022 8.52452C1.8495 8.09048 1.66667 7.58261 1.66667 7.16667V2.5C1.66667 2.22386 1.89053 2 2.16667 2C2.44281 2 2.66667 2.22386 2.66667 2.5V5.33194C2.66667 5.51604 2.81591 5.66527 3 5.66527C3.18409 5.66527 3.33333 5.51604 3.33333 5.33194V1.66667C3.33333 1.39053 3.55719 1.16667 3.83333 1.16667C4.10947 1.16667 4.33333 1.39053 4.33333 1.66667V5C4.33333 5.18409 4.48257 5.33333 4.66667 5.33333C4.85076 5.33333 5 5.18409 5 5ZM10 14.6667C7.86579 14.6667 6.06617 13.234 5.51047 11.278C6.10768 11.1501 6.64424 10.8061 7.01018 10.3021L7.91037 9.0621L8.93069 7.8983L10.1183 7.15601C10.4595 6.94281 10.6667 6.56894 10.6667 6.16667C10.6667 5.81246 10.5114 5.56404 10.453 5.47708C10.4203 5.42849 10.3864 5.385 10.3532 5.3465C12.7655 5.52705 14.6667 7.54152 14.6667 10C14.6667 12.5773 12.5773 14.6667 10 14.6667ZM12 9.33333C12 8.96514 11.7015 8.66667 11.3333 8.66667C10.9651 8.66667 10.6667 8.96514 10.6667 9.33333C10.6667 9.70152 10.9651 10 11.3333 10C11.7015 10 12 9.70152 12 9.33333ZM8.0915 11.1415C7.89248 11.3329 7.88633 11.6494 8.07776 11.8484C8.56232 12.3522 9.24478 12.6667 9.99983 12.6667C10.7549 12.6667 11.4374 12.3522 11.9219 11.8484C12.1133 11.6494 12.1072 11.3329 11.9082 11.1415C11.7092 10.95 11.3926 10.9562 11.2012 11.1552C10.8974 11.4711 10.4719 11.6667 9.99983 11.6667C9.52781 11.6667 9.10231 11.4711 8.79847 11.1552C8.60704 10.9562 8.29051 10.95 8.0915 11.1415ZM9.33333 9.33333C9.33333 8.96514 9.03486 8.66667 8.66667 8.66667C8.29848 8.66667 8 8.96514 8 9.33333C8 9.70152 8.29848 10 8.66667 10C9.03486 10 9.33333 9.70152 9.33333 9.33333Z"
                fill="#83A588"
              />
            </svg>

            Assigned
          </div>
        ),
        cell: (info) => (

          <EditableCell
            value={String(info.getValue() ?? "")}

            rowIndex={info.row.index}
            columnId={info.column.id}
            onChange={handleChange}
          />
        ),
      }),
      columnHelper.accessor("priority", {
        header: "Priority",
        cell: (info) => {
          const val = info.getValue();
          if (val) {
            const color =
              val === "High"
                ? "bg-red-100 text-red-700"
                : val === "Medium"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-blue-100 text-blue-700";
            return (
              <span className={`text-xs font-medium px-2 py-1 rounded-full ${color}`}>
                {val}
              </span>
            );
          }
          return (
            <EditableCell
            value={String(val ?? "")}
              rowIndex={info.row.index}
              columnId={info.column.id}
              onChange={handleChange}
            />
          );
        },
      }),
      columnHelper.accessor("dueDate", {
        header: "Due Date",
        cell: (info) => (
          <EditableCell
            value={String(info.getValue() ?? "")}

            rowIndex={info.row.index}
            columnId={info.column.id}
            onChange={handleChange}
          />
        ),
      }),
      columnHelper.accessor("estValue", {
        header: "Est. Value",
        cell: (info) => (
          <EditableCell
            value={String(info.getValue() ?? "")}

            rowIndex={info.row.index}
            columnId={info.column.id}
            onChange={handleChange}
          />
        ),
      }),
      columnHelper.accessor("empty", {
        header: "",
        cell: () => <div className="px-2 py-1" />,
      }),
    ],
    [handleChange]
  );


  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    columnResizeMode: "onChange",
    enableColumnResizing: true,
    debugTable: true,
  });

  return (
    <div className="w-full max-h-[640px] overflow-auto border-none bg-white rounded text-xs">
      <table className="table-fixed w-full border-none relative" style={{ width: table.getTotalSize() }}>
        <thead className="sticky top-0 z-10">
          <tr className="h-10">
            <th style={{ width: "36px" }} className="bg-white text-left px-2 py-2"></th>

            <th colSpan={4} className="bg-gray-200 text-left px-2 py-2 font-medium text-[#8a8a8a] text-sm">
              <div className="flex items-center gap-1">
                <div className="flex items-center gap-1 bg-gray-100 p-0.5">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6.16667 4.66666C6.44281 4.66666 6.66667 4.89052 6.66667 5.16666C6.66667 5.4177 6.48166 5.62553 6.24055 5.66124L6.16667 5.66666H4.66667C3.378 5.66666 2.33333 6.71133 2.33333 8C2.33333 9.24264 3.30471 10.2584 4.52956 10.3294L4.66667 10.3333H6.16667C6.44281 10.3333 6.66667 10.5572 6.66667 10.8333C6.66667 11.0844 6.48166 11.2922 6.24055 11.3279L6.16667 11.3333H4.66667C2.82572 11.3333 1.33333 9.84095 1.33333 8C1.33333 6.21483 2.73664 4.75743 4.5003 4.67074L4.66667 4.66666H6.16667ZM11.3333 4.66666C13.1743 4.66666 14.6667 6.15905 14.6667 8C14.6667 9.78516 13.2634 11.2426 11.4997 11.3293L11.3333 11.3333H9.83333C9.55719 11.3333 9.33333 11.1095 9.33333 10.8333C9.33333 10.5823 9.51834 10.3745 9.75945 10.3388L9.83333 10.3333H11.3333C12.622 10.3333 13.6667 9.28866 13.6667 8C13.6667 6.75736 12.6953 5.74159 11.4704 5.67062L11.3333 5.66666H9.83333C9.55719 5.66666 9.33333 5.44281 9.33333 5.16666C9.33333 4.91563 9.51834 4.7078 9.75945 4.67209L9.83333 4.66666H11.3333ZM4.66667 7.5H11.3333C11.6095 7.5 11.8333 7.72385 11.8333 8C11.8333 8.25313 11.6452 8.46232 11.4012 8.49543L11.3333 8.5H4.66667C4.39052 8.5 4.16667 8.27614 4.16667 8C4.16667 7.74687 4.35477 7.53767 4.59882 7.50456L4.66667 7.5H11.3333H4.66667Z" fill="#1A8CFF" />
                  </svg>
                  Q3 Financial Overview
                </div>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10.8337 3.45341C10.6663 3.67298 10.7085 3.98673 10.9281 4.15419C12.1203 5.06343 12.8333 6.47214 12.8333 8C12.8333 10.4907 10.9494 12.5413 8.52888 12.8047L8.97978 12.3536C9.17505 12.1583 9.17505 11.8417 8.97978 11.6464C8.80227 11.4689 8.5245 11.4528 8.32876 11.598L8.27268 11.6464L6.93934 12.9798C6.76183 13.1573 6.7457 13.4351 6.89093 13.6308L6.93934 13.6869L8.27268 15.0202C8.46794 15.2155 8.78452 15.2155 8.97978 15.0202C9.1573 14.8427 9.17343 14.5649 9.0282 14.3692L8.97978 14.3131L8.47963 13.8139C11.4769 13.57 13.8333 11.0602 13.8333 8C13.8333 6.15685 12.9721 4.45548 11.5345 3.35905C11.3149 3.19159 11.0012 3.23384 10.8337 3.45341ZM7.02022 0.979782C6.82496 1.17504 6.82496 1.49163 7.02022 1.68689L7.51972 2.18616C4.52273 2.4304 2.16667 4.94006 2.16667 8C2.16667 9.76297 2.95418 11.3983 4.28721 12.4994C4.50011 12.6753 4.81527 12.6452 4.99113 12.4323C5.16699 12.2194 5.13697 11.9043 4.92407 11.7284C3.81863 10.8153 3.16667 9.46147 3.16667 8C3.16667 5.50958 5.05022 3.45908 7.47047 3.19535L7.02022 3.64645C6.82496 3.84171 6.82496 4.15829 7.02022 4.35356C7.21549 4.54882 7.53207 4.54882 7.72733 4.35356L9.06066 3.02022C9.25593 2.82496 9.25593 2.50838 9.06066 2.31312L7.72733 0.979782C7.53207 0.78452 7.21549 0.78452 7.02022 0.979782Z" fill="#FA6736" />
                </svg>
              </div>
            </th>

            <th className="bg-gray-100 text-left px-2 py-2 font-medium text-gray-100 text-sm">URL</th>
            <th className="bg-[#D2E0D4] text-left px-2 py-2 font-medium text-[#505450] text-sm">
              <div className="flex items-center gap-1 justify-center">
                <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8.50001 2C8.77616 2 9.00001 2.22386 9.00001 2.5V6.33333H10.6636C11.6762 6.33333 12.497 7.15414 12.497 8.16667V12.2944L13.6467 11.1462C13.8421 10.9511 14.1587 10.9513 14.3538 11.1467C14.5489 11.3421 14.5487 11.6587 14.3533 11.8538L12.3503 13.8541C12.155 14.0492 11.8386 14.0491 11.6434 13.8539L9.64308 11.8536C9.44782 11.6583 9.44782 11.3417 9.64308 11.1464C9.83834 10.9512 10.1549 10.9512 10.3502 11.1464L11.497 12.2932V8.16667C11.497 7.70643 11.1239 7.33333 10.6636 7.33333H6.33328C5.87304 7.33333 5.49995 7.70643 5.49995 8.16667V12.2932L6.64673 11.1464C6.84199 10.9512 7.15858 10.9512 7.35384 11.1464C7.5491 11.3417 7.5491 11.6583 7.35384 11.8536L5.3535 13.8539C5.15824 14.0492 4.84166 14.0492 4.6464 13.8539L2.64602 11.8536C2.45076 11.6583 2.45076 11.3417 2.64602 11.1465C2.84128 10.9512 3.15786 10.9512 3.35312 11.1464L4.49995 12.2932V8.16667C4.49995 7.15414 5.32076 6.33333 6.33328 6.33333H8.00001V2.5C8.00001 2.22386 8.22387 2 8.50001 2Z" fill="#A3ACA3" />
                </svg>

                ABC <HiOutlineDotsHorizontal className="inline text-xs ml-1" />
              </div>
            </th>
            <th colSpan={2} className="bg-[#DCCFFC] text-left px-2 py-2 font-medium text-[#505450] text-sm">
              <div className="flex items-center gap-1 justify-center">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8.00001 2C8.27616 2 8.50001 2.22386 8.50001 2.5V6.33333H10.1636C11.1762 6.33333 11.997 7.15414 11.997 8.16667V12.2944L13.1467 11.1462C13.3421 10.9511 13.6587 10.9513 13.8538 11.1467C14.0489 11.3421 14.0487 11.6587 13.8533 11.8538L11.8503 13.8541C11.655 14.0492 11.3386 14.0491 11.1434 13.8539L9.14308 11.8536C8.94782 11.6583 8.94782 11.3417 9.14308 11.1464C9.33834 10.9512 9.65492 10.9512 9.85018 11.1464L10.997 12.2932V8.16667C10.997 7.70643 10.6239 7.33333 10.1636 7.33333H5.83328C5.37304 7.33333 4.99995 7.70643 4.99995 8.16667V12.2932L6.14673 11.1464C6.34199 10.9512 6.65858 10.9512 6.85384 11.1464C7.0491 11.3417 7.0491 11.6583 6.85384 11.8536L4.8535 13.8539C4.65824 14.0492 4.34166 14.0492 4.1464 13.8539L2.14602 11.8536C1.95076 11.6583 1.95076 11.3417 2.14602 11.1465C2.34128 10.9512 2.65786 10.9512 2.85312 11.1464L3.99995 12.2932V8.16667C3.99995 7.15414 4.82076 6.33333 5.83328 6.33333H7.50001V2.5C7.50001 2.22386 7.72387 2 8.00001 2Z" fill="white" />
                </svg>

                Answer a question <HiOutlineDotsHorizontal className="inline text-xs ml-1" />
              </div>

            </th>
            <th className="bg-[#FAC2AF] text-left px-2 py-2 font-medium text-[#505450] text-sm">
              <div className="flex items-center gap-1 justify-center">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7.99995 2C8.2761 2 8.49995 2.22386 8.49995 2.5V6.33333H10.1636C11.1761 6.33333 11.9969 7.15414 11.9969 8.16667V12.2944L13.1466 11.1462C13.342 10.9511 13.6586 10.9513 13.8537 11.1467C14.0489 11.3421 14.0487 11.6587 13.8533 11.8538L11.8502 13.8541C11.6549 14.0492 11.3385 14.0491 11.1434 13.8539L9.14302 11.8536C8.94775 11.6583 8.94775 11.3417 9.14302 11.1464C9.33828 10.9512 9.65486 10.9512 9.85012 11.1464L10.9969 12.2932V8.16667C10.9969 7.70643 10.6238 7.33333 10.1636 7.33333H5.83322C5.37298 7.33333 4.99989 7.70643 4.99989 8.16667V12.2932L6.14667 11.1464C6.34193 10.9512 6.65852 10.9512 6.85378 11.1464C7.04904 11.3417 7.04904 11.6583 6.85378 11.8536L4.85344 13.8539C4.65818 14.0492 4.3416 14.0492 4.14634 13.8539L2.14596 11.8536C1.9507 11.6583 1.95069 11.3417 2.14595 11.1465C2.34122 10.9512 2.6578 10.9512 2.85306 11.1464L3.99989 12.2932V8.16667C3.99989 7.15414 4.8207 6.33333 5.83322 6.33333H7.49995V2.5C7.49995 2.22386 7.72381 2 7.99995 2Z" fill="white" />
                </svg>

                Extract <HiOutlineDotsHorizontal className="inline text-xs ml-1" />
              </div>
            </th>
            <th className="bg-[#EEEEEE] text-center ml-2 text-xl font-bold">
              +
            </th>
          </tr>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                key={header.id}
                colSpan={header.colSpan}
                className={`
                  border border-gray-200 text-left font-semibold text-gray-700 truncate px-2 py-1 relative
                  ${header.id === "assigned" ? "bg-[#D2E0D4]" : ""}
                  ${header.id === "priority" ? "bg-[#EBD8FF]" : ""}
                  ${header.id === "dueDate" ? "bg-[#EBD8FF]" : ""}
                  ${header.id === "estValue" ? "bg-[#ffebd8]" : ""}
                  ${!["assigned", "priority", "dueDate", "estValue"].includes(header.id) ? "bg-gray-100" : ""}
                `}
                style={{ width: header.getSize(), position: 'relative' }}
              >
                <div className="flex justify-between items-center">
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </div>
                {header.column.getCanResize() && (
                  <div
                    onMouseDown={header.getResizeHandler()}
                    onTouchStart={header.getResizeHandler()}
                    className={`absolute right-0 top-0 h-full w-2 cursor-col-resize select-none ${
                      header.column.getIsResizing() ? "bg-blue-500" : ""
                    }`}
                  />
                )}
              </th>
              
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="hover:bg-gray-50 transition">
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className="border px-2 py-1 whitespace-nowrap truncate"
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SpreadsheetTable;
