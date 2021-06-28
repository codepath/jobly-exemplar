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
import { LoginForm } from "components"
import "./LoginPage.css"

export default function LoginPage() {
  return (
    <EuiPage className="login-page">
      <EuiPageBody component="section">
        <EuiPageHeader className="login-page-header">
          <EuiPageHeaderSection>
            <EuiTitle size="l">
              <h1>Login</h1>
            </EuiTitle>
          </EuiPageHeaderSection>
        </EuiPageHeader>
        <EuiPageContent verticalPosition="center" horizontalPosition="center">
          <EuiPageContentBody>
            <LoginForm />
          </EuiPageContentBody>
        </EuiPageContent>
      </EuiPageBody>
    </EuiPage>
  )
}
