/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unsafe-optional-chaining */
'use client'

import React, { useState } from 'react'
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
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Menu } from 'lucide-react'
import { User_Content_Response } from '@/types/user.types'
import Link from 'next/link'
import Pagination from '@/components/Pagination'
import { Submission_Content_Response } from '@/types/submission'
import Image from 'next/image'
import { updateSubmissionByCheckBox } from '@/actions/submission'
import { Button } from '@/components/ui/button'

export function DataTable({ users }: { users: User_Content_Response }) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  const data = (users.submissions as Submission_Content_Response[]) || []

  const columns: ColumnDef<Submission_Content_Response>[] = [
    {
      accessorKey: 'submitNumber',
      header: 'Số lần nộp',
      cell: ({ row }) => <div className=''>{row.getValue('submitNumber')}</div>
    },
    {
      accessorKey: 'image',
      header: 'Tệp đã tải lên',
      cell: ({ row }) => {
        return (
          <Link target='_blank' href={`https://api.siu.edu.vn/ai-paint-contest/media/${row.getValue('image')}`}>
            <Image
              width={100}
              height={100}
              alt={row.getValue('content')}
              src={`https://api.siu.edu.vn/ai-paint-contest/media/${row.getValue('image')}`}
            />
          </Link>
        )
      }
    },
    {
      accessorKey: 'content',
      header: 'Nội dung',
      cell: ({ row }) => (
        <Link href={`/contest/submission/${row.getValue('id')}/read`}>
          <div className='truncate w-80'>{row.getValue('content')}</div>
        </Link>
      )
    },
    {
      accessorKey: 'prompt',
      header: 'Prompt',
      cell: ({ row }) => (
        <Link href={`/contest/submission/${row.getValue('id')}/read`}>
          <div className='truncate w-80'>{row.getValue('prompt')}</div>
        </Link>
      )
    },
    {
      accessorKey: 'isFinal',
      header: 'Bài cuối cùng',
      cell: ({ row }) => {
        const [submissionSelection, setSubmissionSelection] = useState<boolean>(row.getValue('isFinal'))

        const handleCheckboxChange = async () => {
          setSubmissionSelection(!submissionSelection)
          const index = row.index

          if (users?.submissions) {
            await updateSubmissionByCheckBox({
              ...users?.submissions[index],
              isFinal: !submissionSelection,
              user: {
                id: users.id
              }
            })
          }
        }
        return (
          <div className='flex items-center space-x-2'>
            <input
              type='checkbox'
              className='w-4 h-4  '
              disabled={submissionSelection === true}
              checked={submissionSelection}
              onChange={handleCheckboxChange}
            />
          </div>
        )
      }
    },
    {
      accessorKey: 'id',
      header: 'Tùy chọn',
      cell: ({ row }) => {
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='ghost' className='h-8 w-8 p-0'>
                <Menu />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='center'>
              <DropdownMenuLabel>Tùy chọn</DropdownMenuLabel>
              <DropdownMenuItem>
                <Link href={`/contest/submission/${row.getValue('id')}/read`}>Xem chi tiết</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link href={`/contest/submission/${row.getValue('id')}`}>Chỉnh sửa</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              {/* <DropdownMenuItem onClick={() => handleDeleteTeamMember(row.getValue('id'))}>Xóa</DropdownMenuItem> */}
            </DropdownMenuContent>
          </DropdownMenu>
        )
      }
    }
  ]

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
                    <TableCell key={cell.id} className='w-60'>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
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
    </div>
  )
}
