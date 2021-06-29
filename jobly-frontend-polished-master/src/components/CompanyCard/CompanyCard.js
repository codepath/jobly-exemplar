import { EuiBadge, EuiCard, EuiFlexGroup, EuiFlexItem, EuiMarkdownFormat } from "@elastic/eui"
import { EuiCustomLink } from "components"
import config from "config"
import "./CompanyCard.css"

export default function CompanyCard({ company }) {
  const image = company.logoUrl ? (
    <div className="image-container">
      <img src={`${config.baseUrl}/static/${company.logoUrl}`} alt="Job Cover" />
    </div>
  ) : null

  const title = (
    <EuiFlexGroup justifyContent="spaceBetween" alignItems="center">
      <EuiFlexItem grow={false}>{company.name}</EuiFlexItem>
      <EuiFlexItem grow={false}>
        <EuiBadge color="secondary">{company.numEmployees} employees</EuiBadge>
      </EuiFlexItem>
    </EuiFlexGroup>
  )

  const description = (
    <div className="description">
      <EuiMarkdownFormat>{company.description}</EuiMarkdownFormat>
    </div>
  )

  return (
    <EuiCustomLink to={`/companies/${company.handle}/`}>
      <EuiCard textAlign="left" image={image} title={title}>
        {description}
      </EuiCard>
    </EuiCustomLink>
  )
}
