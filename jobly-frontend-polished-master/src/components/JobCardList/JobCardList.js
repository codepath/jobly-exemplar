import { Fragment } from "react"
import { EuiSpacer, EuiLoadingSpinner } from "@elastic/eui"
import { JobCard, NotFoundMessage } from "components"
import { useApplicationsContext, selectJobIdsAppliedFor } from "context/applications"

import "./JobCardList.css"

export default function JobCardList({ jobs, isFetching, error, fetchJobs }) {
  const { applicationsState, applyForJob } = useApplicationsContext()
  const jobIdsAppliedFor = selectJobIdsAppliedFor(applicationsState)

  return (
    <div className="job-card-list-wrapper">
      {isFetching ? <EuiLoadingSpinner size="xl" /> : null}
      {error ? <NotFoundMessage fetcherFn={() => fetchJobs()} message={error.toString()} /> : null}
      {jobs.length ? (
        jobs.map((job) =>
          job ? (
            <Fragment key={job.id}>
              <JobCard
                job={job}
                userHasAppliedForJob={jobIdsAppliedFor.includes(job.id)}
                isLoading={applicationsState.isLoading}
                applyForJob={() => applyForJob(job.id)}
              />
              <EuiSpacer size="l" />
            </Fragment>
          ) : null
        )
      ) : isFetching ? null : (
        <NotFoundMessage
          fetcherFn={() => fetchJobs()}
          message="Couldn't locate any jobs with that search. Try another"
          title="No results found"
        />
      )}
    </div>
  )
}
