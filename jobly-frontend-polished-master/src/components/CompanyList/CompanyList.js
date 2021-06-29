import { Fragment } from "react"
import { EuiSpacer, EuiLoadingSpinner } from "@elastic/eui"
import { CompanyCard, NotFoundMessage, SearchForm } from "components"
import { useOnKeyPress } from "hooks/useOnKeyPress"
import { useCompanyList } from "hooks/useCompanyList"
import "./CompanyList.css"

export default function CompanyList() {
  const { query, error, isFetching, companies, handleOnSubmit, handleOnChange } = useCompanyList()
  useOnKeyPress("Enter", handleOnSubmit)

  return (
    <div className="companies-list-wrapper">
      <SearchForm handleOnChange={handleOnChange} value={query} handleOnSubmit={handleOnSubmit} />
      <EuiSpacer size="xxl" />
      {isFetching ? <EuiLoadingSpinner size="xl" /> : null}
      {error ? <NotFoundMessage fetcherFn={() => handleOnSubmit()} message={error.toString()} /> : null}
      {companies ? (
        companies.map((company) =>
          company ? (
            <Fragment key={company.handle}>
              <CompanyCard company={company} />
              <EuiSpacer size="l" />
            </Fragment>
          ) : null
        )
      ) : isFetching ? null : (
        <NotFoundMessage
          fetcherFn={() => handleOnSubmit()}
          message="Couldn't locate any companies with that search. Try another"
          title="No results found"
        />
      )}
    </div>
  )
}
