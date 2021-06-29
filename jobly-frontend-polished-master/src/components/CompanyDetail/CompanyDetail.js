import { Fragment } from "react";
import { JobCardList, NotFoundMessage } from "components";
import { EuiPageHeader, EuiLoadingSpinner } from "@elastic/eui";
import { useParams } from "react-router-dom";
import { useSingleCompany } from "hooks/useSingleCompany";

import "./CompanyDetail.css";

export default function CompanyDetail() {
  const params = useParams();
  const { company, isFetching, error, fetchSingleCompany } = useSingleCompany(
    params.company
  );

  return (
    <div className="company-detail-wrapper">
      {isFetching ? <EuiLoadingSpinner size="xl" /> : null}
      {error ? (
        <NotFoundMessage
          fetcherFn={() => fetchSingleCompany()}
          message={error.toString()}
        />
      ) : null}
      {company ? (
        <Fragment>
          <EuiPageHeader
            pageTitle={company.name}
            iconType="canvasApp"
            description={company.description}
          />
          <JobCardList jobs={company.jobs} />
        </Fragment>
      ) : null}
    </div>
  );
}
