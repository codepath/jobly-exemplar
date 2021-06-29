import { EuiAvatar } from "@elastic/eui"
import { getAvatarName } from "utils/format"

export default function UserAvatar({ user, size = "l", initialsLength = 1, type = "user", color }) {
  return (
    <EuiAvatar
      size={size}
      name={getAvatarName(user)}
      imageUrl={user?.profile?.image}
      initialsLength={initialsLength}
      type={type}
      color={color}
    />
  )
}
