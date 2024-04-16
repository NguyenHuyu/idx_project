'use client'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'
import { DataTable } from '@/app/[lang]/(dashboard)/admin/members/_components/Table'
import { User_Response } from '@/types/user.types'

export function WrapperByID({ children, users }: { children: React.ReactNode; users: User_Response }) {
  return (
    <>
      <h1 className='text-red-500 md:text-3xl font-bold'>Thành viên</h1>
      <ResizablePanelGroup direction='horizontal' className='h-full rounded-lg border'>
        <ResizablePanel defaultSize={60}>
          <DataTable users={users} />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={40}>
          <div className='h-full p-3'>{children}</div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </>
  )
}
