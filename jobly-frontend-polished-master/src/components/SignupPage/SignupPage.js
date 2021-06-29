import React from "react"
import {
  EuiPage,
  EuiPageBody,
  EuiPageContent,
  EuiPageContentBody,
  EuiPageHeader,
  EuiPageHeaderSection,
  EuiTitle,
} from "@elastic/eui"
import { SignupForm } from "components"
import "./SignupPage.css"

export default function SignupPage() {
  return (
    <EuiPage className="signup-page">
      <EuiPageBody component="section">
        <EuiPageHeader className="signup-page-header">
          <EuiPageHeaderSection>
            <EuiTitle size="l">
              <h1>Sign Up</h1>
            </EuiTitle>
          </EuiPageHeaderSection>
        </EuiPageHeader>
        <EuiPageContent verticalPosition="center" horizontalPosition="center">
          <EuiPageContentBody>
            <SignupForm />
          </EuiPageContentBody>
        </EuiPageContent>
      </EuiPageBody>
    </EuiPage>
  )
}
