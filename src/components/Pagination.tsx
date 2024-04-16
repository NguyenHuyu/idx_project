'use client'
import React, { useEffect } from 'react'
import classNames from 'classnames'
import { useRouter, useSearchParams } from 'next/navigation'
import { getQueryParams } from '@/lib/helper'
import { ChevronLeft, ChevronRight } from 'lucide-react'

type Props = {
  pages: number | any
  pageSize?: number | any
}

const RANGE = 2

export default function Pagination({ pageSize, pages }: Props) {
  const router = useRouter()

  const pageSearch = useSearchParams()?.get('page')

  const [page, setPage] = React.useState(pages)

  useEffect(() => {
    if (pageSearch) {
      setPage(Number(pageSearch))
    }
  }, [pageSearch])

  const renderPagination = () => {
    let dotBefore = false
    let dotAfter = false

    const renderDotBefore = (index: number) => {
      if (!dotBefore) {
        dotBefore = true
        return (
          <button key={index} className='bg-white rounded w-6 py-1 shadow-sm mx-2 text-[11px] cursor-pointer border'>
            ...
          </button>
        )
      }
      return null
    }

    const renderDotAfter = (index: number) => {
      if (!dotAfter) {
        dotAfter = true
        return (
          <button key={index} className='bg-white rounded w-6 py-1 shadow-sm mx-2 text-[11px] cursor-pointer border'>
            ...
          </button>
        )
      }
      return null
    }

    return Array(pageSize)
      .fill(0)
      .map((_, index) => {
        const pageNumber = index + 1
        if (page <= RANGE * 2 + 1 && pageNumber > page + RANGE && pageNumber < pageSize - RANGE + 1) {
          return renderDotAfter(index)
        } else if (page > RANGE * 2 + 1 && page < pageSize - RANGE * 2) {
          if (pageNumber < page - RANGE && pageNumber > RANGE) {
            return renderDotBefore(index)
          } else if (pageNumber > page + RANGE && pageNumber < pageSize - RANGE + 1) {
            return renderDotAfter(index)
          }
        } else if (page >= pageSize - RANGE * 2 && pageNumber > RANGE && pageNumber < page - RANGE) {
          return renderDotBefore(index)
        }
        return (
          <button
            key={index}
            className={classNames(
              'bg-white rounded w-6 py-1 shadow-lg hover:-translate-y-1 duration-400 mx-2 text-[11px] cursor-pointer border',
              {
                'border-cyan-500': pageNumber === page,
                'border-transparent': pageNumber !== page
              }
            )}
            onClick={() => {
              let queryParams = new URLSearchParams(window.location.search)

              queryParams = getQueryParams(queryParams, 'page', pageNumber)

              const path = window.location.pathname + '?' + queryParams.toString()

              setTimeout(() => {
                setPage(pageNumber)
              }, 40)
              router.push(path)
            }}
          >
            {pageNumber}
          </button>
        )
      })
  }

  const isFirstPage = page === 1
  const isLastPage = page === pageSize

  return (
    <div className='flex flex-wrap mt-6 justify-center '>
      {!isFirstPage ? (
        <button
          className='bg-white rounded px-1 w-6 border py-0.5 shadow-sm cursor-not-allowed'
          onClick={() => {
            const prevPage = page - 1
            let queryParams = new URLSearchParams(window.location.search)
            queryParams = getQueryParams(queryParams, 'page', prevPage)
            const path = window.location.pathname + '?' + queryParams.toString()
            setPage(prevPage)
            router.push(path)
          }}
        >
          <ChevronLeft size={16} />
        </button>
      ) : (
        <button className='bg-white rounded px-1 w-6 border py-0.5 shadow-sm cursor-not-allowed'>
          <ChevronLeft size={16} />
        </button>
      )}

      {renderPagination()}

      {!isLastPage ? (
        <button
          className='bg-white rounded px-1 w-6 border py-0.5 shadow-sm cursor-not-allowed'
          onClick={() => {
            const nextPage = page + 1
            let queryParams = new URLSearchParams(window.location.search)
            queryParams = getQueryParams(queryParams, 'page', nextPage)
            const path = window.location.pathname + '?' + queryParams.toString()
            setPage(nextPage)
            router.push(path)
          }}
        >
          <ChevronRight size={16} />
        </button>
      ) : (
        <button className='bg-white rounded px-1 w-6 border py-0.5 shadow-sm cursor-not-allowed'>
          <ChevronRight size={16} />
        </button>
      )}
    </div>
  )
}
