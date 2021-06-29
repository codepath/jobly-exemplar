import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  EuiHeader,
  EuiHeaderSection,
  EuiHeaderSectionItem,
  EuiHeaderLinks,
  EuiHeaderSectionItemButton,
  EuiPopover,
  EuiFlexGroup,
  EuiFlexItem
} from "@elastic/eui";
import { EuiCustomLink, UserAvatar } from "components";
import { useAuthContext, selectUserFromAuthState } from "context/auth";
import "./Navigation.css";

export default function Navbar() {
  const [avatarMenuOpen, setAvatarMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { authState, logoutUser } = useAuthContext();

  const user = selectUserFromAuthState(authState);
  if (!authState.hasAttemptedAuthentication) return null;

  const toggleAvatarMenu = () => setAvatarMenuOpen(!avatarMenuOpen);

  const closeAvatarMenu = () => setAvatarMenuOpen(false);

  const handleLogout = () => {
    closeAvatarMenu();
    logoutUser();
    navigate("/");
  };

  // const navigate = useNavigate()

  const renderAvatarButton = () => (
    <EuiHeaderSectionItemButton
      aria-label="User avatar"
      onClick={() => Boolean(user) && toggleAvatarMenu()}
      // notification={20}
    >
      {Boolean(user) ? (
        <EuiHeaderLinks>
          <UserAvatar size="l" user={user} initialsLength={2} />
        </EuiHeaderLinks>
      ) : (
        <EuiHeaderLinks>
          <EuiCustomLink isHeader iconType="importAction" to="/login">
            Login
          </EuiCustomLink>
          <EuiCustomLink isHeader iconType="reporter" to="/signup">
            Signup
          </EuiCustomLink>
        </EuiHeaderLinks>
      )}
    </EuiHeaderSectionItemButton>
  );

  const renderAvatarMenu = () =>
    user ? (
      <div className="avatar-menu">
        <UserAvatar size="xl" user={user} initialsLength={2} />
        <EuiFlexGroup direction="column" className="avatar-actions">
          <EuiFlexItem grow={1}>
            <p>
              {user.email} - {user.username}
            </p>
          </EuiFlexItem>

          <EuiFlexItem grow={1}>
            <EuiFlexGroup justifyContent="spaceBetween">
              <EuiFlexItem grow={1}>
                {/* <Link to="/profile">Profile</Link>*/}
                <EuiCustomLink to="/profile">Profile</EuiCustomLink>
              </EuiFlexItem>
              <EuiFlexItem grow={1}>
                <Link to="#" onClick={() => handleLogout()}>
                  Log out
                </Link>
              </EuiFlexItem>
            </EuiFlexGroup>
          </EuiFlexItem>
        </EuiFlexGroup>
      </div>
    ) : null;

  return (
    <EuiHeader>
      <EuiHeaderSection>
        <EuiHeaderSectionItem border="right">
          <EuiHeaderLinks>
            <EuiCustomLink iconType="canvasApp" isHeader to="/">
              Jobly
            </EuiCustomLink>
          </EuiHeaderLinks>
        </EuiHeaderSectionItem>
        <EuiHeaderSectionItem border="right">
          <EuiHeaderLinks aria-label="app navigation links">
            <EuiCustomLink isHeader iconType="tear" to="/companies/">
              See Companies
            </EuiCustomLink>

            <EuiCustomLink isHeader iconType="tag" to="/jobs/">
              Find Jobs
            </EuiCustomLink>
          </EuiHeaderLinks>
        </EuiHeaderSectionItem>
      </EuiHeaderSection>

      <EuiHeaderSection>
        <EuiPopover
          id="avatar-menu"
          isOpen={avatarMenuOpen}
          closePopover={closeAvatarMenu}
          anchorPosition="downRight"
          button={renderAvatarButton()}
          panelPaddingSize="l"
        >
          {renderAvatarMenu()}
        </EuiPopover>
      </EuiHeaderSection>
    </EuiHeader>
  );
}
