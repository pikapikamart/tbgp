

export const requestsParams = [
  {
    name: "Open",
    query: ""
  },
  {
    name: "Assigned",
    query: "assigned"
  }
]

export const requestsParamsEditor = requestsParams.concat([
  {
    name: "Created",
    query: "created"
  }
])

export const masonryBreakpoints = [
  {
    size: 0,
    columns: 1
  },
  {
    size: 450,
    columns: 2
  },
  {
    size: 768,
    columns: 3
  },
  {
    size: 1000,
    columns: 3
  }
]