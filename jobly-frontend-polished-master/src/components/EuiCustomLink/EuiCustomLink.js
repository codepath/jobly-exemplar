import { EuiLink, EuiHeaderLink } from "@elastic/eui"
import { useNavigate } from "react-router-dom"

const isModifiedEvent = (event) => Boolean(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey)

const isLeftClickEvent = (event) => event.button === 0

const isTargetBlank = (event) => {
  const target = event.target.getAttribute("target")
  return target && target !== "_self"
}

export default function EuiCustomLink({ to, isHeader = false, ...rest }) {
  const navigate = useNavigate()

  function onClick(event) {
    if (event.defaultPrevented) {
      return
    }

    // Let the browser handle links that open new tabs/windows
    if (isModifiedEvent(event) || !isLeftClickEvent(event) || isTargetBlank(event)) {
      return
    }

    // Prevent regular link behavior, which causes a browser refresh.
    event.preventDefault()

    // Push the route to the history.
    navigate(to)
  }

  const props = { ...rest, href: to, onClick }
  return isHeader ? <EuiHeaderLink {...props} /> : <EuiLink {...props} />
}
