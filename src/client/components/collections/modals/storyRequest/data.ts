

const baseParamsPath = {
  name: "Information",
  query: ""
}

export const storyRequestParamsPath = {
  owned: [
    baseParamsPath,
    {
      name: "Requests",
      query: ""
    }
  ],
  staff: [ baseParamsPath ]
}