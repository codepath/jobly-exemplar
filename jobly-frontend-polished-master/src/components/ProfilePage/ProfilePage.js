import { useState } from "react";
import {
  EuiHorizontalRule,
  EuiIcon,
  EuiPage,
  EuiPageBody,
  EuiPageContent,
  EuiPageContentBody,
  EuiPageHeader,
  EuiPageHeaderSection,
  EuiTitle,
  EuiText,
  EuiFlexGroup,
  EuiFlexItem,
  EuiButtonIcon
} from "@elastic/eui";
import { useAuthContext, selectUserFromAuthState } from "context/auth";
import { ProfileForm, UserAvatar } from "components";
import "./ProfilePage.css";

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const { authState } = useAuthContext();
  const user = selectUserFromAuthState(authState);

  return (
    <EuiPage className="profile-page">
      <EuiPageBody component="section">
        <EuiPageHeader className="profile-page-header">
          <EuiPageHeaderSection>
            <EuiTitle size="l">
              <h1>{isEditing ? "Edit Profile" : "Profile"}</h1>
            </EuiTitle>
          </EuiPageHeaderSection>
        </EuiPageHeader>
        <EuiPageContent verticalPosition="center" horizontalPosition="center">
          <EuiPageContentBody className="profile-page-content-body">
            {isEditing ? (
              <ProfileForm setIsEditing={setIsEditing} />
            ) : (
              <>
                <EuiFlexGroup
                  justifyContent="flexEnd"
                  className="profile-page-edit-icon-container"
                >
                  <EuiFlexItem className="profile-page-edit-icon">
                    <EuiButtonIcon
                      iconType="documentEdit"
                      aria-label="edit"
                      onClick={() => setIsEditing(true)}
                    />
                  </EuiFlexItem>
                </EuiFlexGroup>
                <UserAvatar size="xl" user={user} initialsLength={2} />
                <EuiTitle size="l">
                  <h2>@{user.username}</h2>
                </EuiTitle>
                <EuiText>
                  <p>
                    <EuiIcon type="email" /> {user.email}
                  </p>
                  <p>
                    <EuiIcon type="user" />{" "}
                    {user.firstName
                      ? user.firstName
                      : "First name not specified"}{" "}
                    {user.lastName ? user.lastName : "Last name not specified"}
                  </p>

                  <EuiHorizontalRule />
                  <p>Applications: {user.applications?.length}</p>
                </EuiText>
              </>
            )}
          </EuiPageContentBody>
        </EuiPageContent>
      </EuiPageBody>
    </EuiPage>
  );
}
