'use client'

import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'
import { Nav } from './nav'

export function Wrapper({ children, links }: { children: React.ReactNode; links: any }) {
  return (
    <ResizablePanelGroup direction='horizontal' className='h-full rounded-lg border'>
      <ResizablePanel defaultSize={14}>
        <div className='h-full p-2'>
          <Nav links={links} />
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={86}>
        <div className='flex h-full items-center justify-center p-6'>{children}</div>
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}
