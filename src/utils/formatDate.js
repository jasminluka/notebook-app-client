export const formatDate = datetime => {
  if (
    new Intl.DateTimeFormat("en-US").format(new Date()) ===
    new Intl.DateTimeFormat("en-US").format(new Date(datetime))
  ) {
    return new Intl.DateTimeFormat("en-US", {
      hour: "2-digit",
      minute: "2-digit"
    }).format(new Date(datetime))
  } else {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit"
    }).format(new Date(datetime))
  }
}

export const getAllDate = (datetime = new Date()) => {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: 'long',
    day: "2-digit"
  }).format(new Date(datetime))
}

export const getTime = (datetime = new Date()) => {
  return new Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    minute: "2-digit"
  }).format(new Date(datetime))
}