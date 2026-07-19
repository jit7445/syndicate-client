import { useEffect, useMemo, useState } from "react"
import { useSearchParams } from "react-router-dom"

import { useTranscripts } from "../hooks/useTranscripts"
import TranscriptCard from "../components/cards/TranscriptCard"
import FilterSidebar from "../components/filter-sidebar/FilterSidebar"
import Button from "../../../components/button/Button"
import Header from "../../../components/header/Header"
import Footer from "../../../components/footer/Footer"
import PaginationComponent from "../../../components/pagination/Pagination"
import RequestTopicDialog from "../components/request-topic-dialog"
import WarningDialog from "../../../components/form-close-warning/WarningDialog"
import { useBoolean } from "../../../utils/hooks/useBoolean"
import { matchesPrice, matchesPublishedDate } from "../utils/filterMatchers"
import { DEFAULT_SIDEBAR_FILTERS } from "../components/filter-sidebar/constants"
import { PAGE_SIZE, PAGE_SIZE_OPTIONS } from "./transcriptsListConstants"
import type { SidebarFilterPayload } from "../types"

export default function TranscriptsList() {
  const { transcripts, isLoading, error, loadTranscripts } = useTranscripts()
  const [searchParams] = useSearchParams()
  const [search, setSearch] = useState(searchParams.get("q") ?? "")
  const [sidebarFilters, setSidebarFilters] = useState<SidebarFilterPayload>(DEFAULT_SIDEBAR_FILTERS)
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(PAGE_SIZE)
  const { value: isRequestTopicOpen, setTrue: openRequestTopic, setFalse: closeRequestTopic } = useBoolean()
  const { value: isRequestTopicChanged, setTrue: setRequestTopicChanged, setFalse: resetRequestTopicChanged } = useBoolean()
  const { value: isWarningOpen, setTrue: openWarning, setFalse: closeWarning } = useBoolean()

  const handleRequestTopicClose = () => {
    if (isRequestTopicChanged) {
      openWarning()
    } else {
      closeRequestTopic()
    }
  }

  const handleDiscardChanges = () => {
    closeWarning()
    resetRequestTopicChanged()
    closeRequestTopic()
  }

  const handleRequestTopicSubmitted = () => {
    resetRequestTopicChanged()
    closeRequestTopic()
  }

  useEffect(() => {
    loadTranscripts()
  }, [])

  const filteredTranscripts = useMemo(() => {
    return transcripts
      .filter((transcript) =>
        `${transcript.title} ${transcript.tags.join(" ")}`.toLowerCase().includes(search.toLowerCase()),
      )
      .filter(
        (transcript) => sidebarFilters.domains.length === 0 || sidebarFilters.domains.includes(transcript.domain),
      )
      .filter((transcript) => matchesPrice(transcript.price, sidebarFilters.price))
      .filter((transcript) => matchesPublishedDate(transcript.date, sidebarFilters.publishedDate))
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  }, [transcripts, search, sidebarFilters])

  const totalPages = Math.max(1, Math.ceil(filteredTranscripts.length / pageSize))
  const paginatedTranscripts = filteredTranscripts.slice((page - 1) * pageSize, page * pageSize)

  return (
    <div className="flex min-h-screen flex-col">
      <Header
        isSearch
        searchPlaceholder="Search transcripts or topics"
        searchValue={search}
        onSearchChange={setSearch}
        onSearch={setSearch}
        isExtraComponent
        component={<Button variant="outlined" label="Request a topic" onClick={openRequestTopic} />}
      />

      <div className="flex-1">
        <div className="mx-auto max-w-[1400px] px-6 py-10">
          <div className="flex gap-8">
            <FilterSidebar
              filters={sidebarFilters}
              setFilters={(filters) => {
                setSidebarFilters(filters)
                setPage(1)
              }}
            />

            <div className="flex-1">
              <h1 className="text-3xl font-bold text-text-primary">All transcripts</h1>


              {isLoading && <p className="mt-4">Loading transcripts...</p>}
              {error && <p className="mt-4">{error}</p>}

              <div className="mt-4 flex max-h-[960px] flex-col gap-4 overflow-y-scroll pr-2">
                {paginatedTranscripts.map((transcript) => (
                  <TranscriptCard key={transcript.id} transcript={transcript} />
                ))}
              </div>

              <div className="mt-8">
                <PaginationComponent
                  page={page}
                  totalPages={totalPages}
                  totalResult={filteredTranscripts.length}
                  paginationHandler={(_e, value) => setPage(value)}
                  dropdownFilterProps={{
                    setFilterPayload: (value) => {
                      setPageSize(Number(value))
                      setPage(1)
                    },
                    dropDownItems: PAGE_SIZE_OPTIONS.map((size) => ({ label: size, value: size.toString() })),
                    filterValue: pageSize.toString(),
                  }}
                />
              </div>
            </div>
          </div>

          <RequestTopicDialog
            isOpen={isRequestTopicOpen}
            handleClose={handleRequestTopicClose}
            handleFormChange={setRequestTopicChanged}
            handleSubmitClose={handleRequestTopicSubmitted}
          />
          <WarningDialog open={isWarningOpen} handleClose={closeWarning} handleYesClick={handleDiscardChanges} />
        </div>
      </div>
      <Footer />
    </div>
  )
}
