import { Fragment } from "react"

import { EuiEmptyPrompt, EuiButton } from "@elastic/eui"

export default function NotFoundMessage({ fetcherFn, message, title = "Something went wrong" }) {
  return (
    <EuiEmptyPrompt
      iconType="editorStrike"
      title={<h2>{title}</h2>}
      body={
        <Fragment>
          <p>{message}</p>
        </Fragment>
      }
      actions={
        fetcherFn ? (
          <EuiButton color="primary" fill onClick={() => fetcherFn()}>
            Try Again
          </EuiButton>
        ) : null
      }
    />
  )
}
