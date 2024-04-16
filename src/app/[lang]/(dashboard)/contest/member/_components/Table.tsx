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
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { ChevronDownIcon, FlipHorizontal, FlipHorizontalIcon, Menu, SortAscIcon } from 'lucide-react'
import { User_Content_Response, User_Response } from '@/types/user.types'
import Link from 'next/link'
import Pagination from '@/components/Pagination'
import { Team_Member_Content_Response } from '@/types/team-member.types'
import { Submission_Content_Response } from '@/types/submission'
import { deleteTeamMember } from '@/actions/team-member'
import { showErrorNotification, showSuccessNotification } from '@/lib/notification'
import { redirect } from 'next/navigation'

export const columns: ColumnDef<Team_Member_Content_Response>[] = [
  {
    accessorKey: 'fullName',
    header: 'Họ tên',
    cell: ({ row }) => <div className=''>{row.getValue('fullName')}</div>
  },

  {
    accessorKey: 'school',
    header: 'Trường',
    cell: ({ row }) => <div className=''>{row.getValue('school')}</div>
  },
  {
    accessorKey: 'className',
    header: 'Lớp',
    cell: ({ row }) => <div className=''>{row.getValue('className')}</div>
  },
  {
    accessorKey: 'id',
    header: 'Tùy chọn',
    cell: ({ row }) => {
      const handleDeleteTeamMember = async (id: string) => {
        const result = await deleteTeamMember(id)
        if (result.status === 200) {
          showSuccessNotification(result.message)
        } else {
          showErrorNotification(result.message)
        }
      }

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
              <Link href={`/contest/member/${row.getValue('id')}`}>Chỉnh sửa</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />

            <DropdownMenuItem onClick={() => handleDeleteTeamMember(row.getValue('id'))}>Xóa</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
  }
]

export function DataTable({ user }: { user: User_Content_Response }) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  const data = (user?.teamMembers as Team_Member_Content_Response[]) || []

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
    <div className='w-full py-4'>
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
    </div>
  )
}
