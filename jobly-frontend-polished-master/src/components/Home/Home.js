import { useAuthContext, selectUserFromAuthState } from "context/auth"
import { EuiPageHeader, EuiPageTemplate } from "@elastic/eui"
import "./Home.css"

export default function Home() {
  const { authState } = useAuthContext()
  const user = selectUserFromAuthState(authState)

  const description = (
    <>
      <span className="home-tag-line">All the jobs in one convenient place</span>
      {user ? <span className="welcome-back-authed-user">Welcome Back, {user.firstName}</span> : null}
    </>
  )
  return (
    <EuiPageTemplate template="centeredBody" pageSideBar={null}>
      <>
        <EuiPageHeader pageTitle="Jobly" iconType="canvasApp" description={description} />
      </>
    </EuiPageTemplate>
  )
}
