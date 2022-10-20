

const categories = {
  news: "News",
  editorial: "Editorial",
  opinions: "Opinion",
  features: "Features",
  literary: "Literary",
  devComm: "DevComm",
  sports: "Sports",
  education: "Education",
}

export const storyCategories = Object.entries(categories).map(category => ({
  name: category[1],
  value: category[0],
  id: category[0]
}))
