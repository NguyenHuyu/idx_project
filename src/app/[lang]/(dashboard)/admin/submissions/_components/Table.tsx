'use client'

import * as React from 'react'

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable
} from '@tanstack/react-table'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { ChevronDownIcon, FlipHorizontal, FlipHorizontalIcon, Menu, SortAscIcon } from 'lucide-react'
import { User_Content_Response, User_Response } from '@/types/user.types'
import Link from 'next/link'
import Pagination from '@/components/Pagination'
import { Submission_Content_Response, Submission_Response } from '@/types/submission'
import { renderDate } from '@/lib/renderDate'
import Image from 'next/image'
import { Session } from 'next-auth'

export function DataTable({ submissions, user }: { submissions: Submission_Response; user: Session | null }) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  const columns: ColumnDef<Submission_Content_Response>[] = [
    {
      accessorKey: 'id',
      header: 'ID'
    },
    {
      accessorKey: 'content',
      header: 'Nội dung',
      cell: ({ row }) => (
        <Link href={`/admin/submissions/${row.getValue('id')}/read`}>
          <div className='truncate w-80'>{row.getValue('content')}</div>
        </Link>
      )
    },
    {
      accessorKey: 'prompt',
      header: 'Prompt',
      cell: ({ row }) => (
        <Link href={`/admin/submissions/${row.getValue('id')}/read`}>
          <div className='truncate w-80'>{row.getValue('prompt')}</div>
        </Link>
      )
    },
    {
      accessorKey: 'image',
      header: 'Ảnh',
      cell: ({ row }) => (
        <div className='capitalize w-full'>
          <div className='w-40'>
            <Link target='_blank' href={`https://api.siu.edu.vn/ai-paint-contest/media/${row.getValue('image')}`}>
              <Image
                src={`https://api.siu.edu.vn/ai-paint-contest/media/${row.getValue('image')}`}
                width={1000}
                height={1000}
                className='w-full object-contain'
                alt='Hình ảnh'
              />
            </Link>
          </div>
        </div>
      )
    },

    {
      accessorKey: 'submitTime',
      header: 'Thời gian',
      cell: ({ row }) => <div className='capitalize'>{renderDate(row.getValue('submitTime'))}</div>
    }
  ]

  const data = submissions.content.filter((item) => item.isFinal === true) || [] || []

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection
    }
  })

  return (
    <div className='w-full'>
      <div className='rounded-md border'>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className='h-24 text-center'>
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className='flex items-center justify-center space-x-2 py-4'>
        <Pagination pages={submissions.page} pageSize={submissions.totalPages} />
      </div>
    </div>
  )
}
