import { EuiSpacer } from "@elastic/eui"
import { JobCardList, SearchForm } from "components"
import { useOnKeyPress } from "hooks/useOnKeyPress"
import { useJobList } from "hooks/useJobList"
import "./JobList.css"

export default function JobList() {
  const { query, error, isFetching, jobs, handleOnSubmit, handleOnChange } = useJobList()
  useOnKeyPress("Enter", handleOnSubmit)

  return (
    <div className="jobs-list-wrapper">
      <SearchForm
        handleOnChange={handleOnChange}
        value={query}
        handleOnSubmit={handleOnSubmit}
        placeholder="Search jobs"
      />
      <EuiSpacer size="xxl" />
      <JobCardList jobs={jobs} error={error} isFetching={isFetching} fetchJobs={handleOnSubmit} />
    </div>
  )
}
