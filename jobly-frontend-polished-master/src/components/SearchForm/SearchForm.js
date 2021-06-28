import { EuiButton, EuiFieldSearch, EuiFlexGroup, EuiFlexItem } from "@elastic/eui"

export default function SearchForm({ value, handleOnChange, handleOnSubmit, placeholder = "Search companies" }) {
  return (
    <EuiFlexGroup>
      <EuiFlexItem>
        <EuiFieldSearch
          placeholder={placeholder}
          value={value}
          fullWidth
          onChange={(e) => handleOnChange(e.target.value)}
          isClearable={true}
          aria-label={placeholder}
        />
      </EuiFlexItem>
      <EuiFlexItem grow={false}>
        <EuiButton onClick={() => handleOnSubmit()}>Search</EuiButton>
      </EuiFlexItem>
    </EuiFlexGroup>
  )
}
