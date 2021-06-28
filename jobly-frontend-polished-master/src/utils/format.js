const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})

export const formatPrice = (price) => (price ? currencyFormatter.format(price) : price)

export const capitalize = (str) => (str ? str[0].toUpperCase() + str.slice(1) : str)

export const getAvatarName = (user) => capitalize(user?.profile?.full_name) || capitalize(user?.username) || "Anonymous"
