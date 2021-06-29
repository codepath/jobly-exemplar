import { EuiButton, EuiBadge, EuiCard, EuiFlexGroup, EuiFlexItem, EuiSpacer } from "@elastic/eui"
import { formatPrice } from "utils/format"
import "./JobCard.css"

export default function JobCard({ job, userHasAppliedForJob, applyForJob, isLoading }) {
  const title = (
    <EuiFlexGroup justifyContent="spaceBetween" alignItems="center">
      <EuiFlexItem grow={false}>{job.title}</EuiFlexItem>
      <EuiFlexItem grow={false}>
        <EuiFlexGroup>
          <EuiFlexItem>
            <EuiBadge color="secondary">Salary: {formatPrice(job.salary)}</EuiBadge>
          </EuiFlexItem>
          {job.equity ? (
            <EuiFlexItem>
              <EuiBadge color="default">Equity: {job.equity}</EuiBadge>
            </EuiFlexItem>
          ) : null}
        </EuiFlexGroup>

        <EuiSpacer size="xs" />
      </EuiFlexItem>
    </EuiFlexGroup>
  )

  const footer = (
    <>
      <EuiSpacer />
      <EuiFlexGroup justifyContent="flexEnd" alignItems="flexEnd">
        <EuiFlexItem grow={false}>
          {userHasAppliedForJob ? (
            <EuiButton fill color="secondary" isDisabled>
              APPLIED!
            </EuiButton>
          ) : (
            <EuiButton fill color="primary" onClick={() => applyForJob()} isDisabled={isLoading}>
              APPLY
            </EuiButton>
          )}
        </EuiFlexItem>
      </EuiFlexGroup>
    </>
  )

  return <EuiCard className="job-card" textAlign="left" title={title} footer={footer} />
}
