"use client";

import clsx from "clsx";
import { CSSProperties, ReactNode, useMemo, useState } from "react";

export default function Home() {
  const [withActions, setWithActions] = useState(false);

  const columns = useMemo<ColumnConfig[]>(() => {
    const defaultColumns: ColumnConfig[] = [
      {
        name: "name",
        render: (row) => row.name,
      },
      {
        name: "clerkStatus",
        render: (row) => row.clerkStatus,
      },
      {
        name: "providerStatus",
        render: (row) => row.providerStatus,
      },
      {
        name: "exp",
        render: (row) => <div className="w-56">{row.exp}</div>,
      },
    ];

    return withActions
      ? [
          ...defaultColumns,
          {
            name: "actions",
            render: (row) => row.actions,
          },
        ]
      : defaultColumns;
  }, [withActions]);

  return (
    <main>
      <button onClick={() => setWithActions((prev) => !prev)}>
        Toggle actions
      </button>

      <Grid
        columns={columns}
        rows={[
          {
            name: "Cert 1",
            clerkStatus: "New",
            providerStatus: "Blocked",
            exp: "20.02.20",
            actions: "Buy",
            comment1: "Comment 1",
            comment2: "Comment 2",
          },
          {
            name: "Cert 2",
            clerkStatus: "Lost",
            providerStatus: "Expired",
            exp: "21.02.20",
            actions: "Buy",
            comment1: "Comment 1",
            comment2: "Comment 2",
          },
        ]}
      />
    </main>
  );
}

function Grid({ columns, rows }: { columns: ColumnConfig[]; rows: RowData[] }) {
  return (
    <div className="h-screen flex items-center justify-center">
      <div
        className="grid"
        style={{
          gridTemplateColumns: `repeat(${columns.length},auto)`,
        }}
      >
        {columns.map((column) => (
          <HCell key={column.name}>{column.name}</HCell>
        ))}

        {rows.map((row) => (
          <Row key={row.name} columns={columns} row={row} />
        ))}
      </div>
    </div>
  );
}

function Row({ columns, row }: { columns: ColumnConfig[]; row: RowData }) {
  return (
    <>
      <div className="contents">
        {columns.map((column) => (
          <Cell
            key={column.name}
            className="first:rounded-tl-lg first:border-l last:rounded-tr-lg last:border-r"
          >
            {column.render(row)}
          </Cell>
        ))}
      </div>

      <Cell className="col-span-2 rounded-bl-lg border-l border-b mb-4">
        {row.comment1}
      </Cell>

      <Cell
        className="rounded-br-lg border-r border-b mb-4"
        style={{
          gridColumn: `span ${columns.length - 2}`,
        }}
      >
        {row.comment2}
      </Cell>
    </>
  );
}

function HCell({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={clsx("p-4 text-black whitespace-nowrap", className)}>
      {children}
    </div>
  );
}

function Cell({
  children,
  className,
  style,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <div
      className={clsx(
        "p-4 bg-white text-black whitespace-nowrap border-t",
        className
      )}
      style={style}
    >
      {children}
    </div>
  );
}

type RowData = {
  name: string;
  clerkStatus: string;
  providerStatus: string;
  exp: string;
  actions: string;
  comment1: string;
  comment2: string;
};

type ColumnConfig = {
  name: keyof RowData;
  render: (row: RowData) => ReactNode;
};
