

type Links = {
  [ key: string ]: {
    name: string,
    path: string
  }[]
}

export const linksData: Links = {
  admin: [
    {
      name: "Home",
      path: "/admin"
    }
  ],
  staff: [
    {
      name: "Requests",
      path: "/storybuilder"
    },
    {
      name: "Activities",
      path: "/storybuilder/activities"
    },
    {
      name: "Writings",
      path: "/storybuilder/writings"
    },
    // {
    //   name: "People",
    //   path: "/storybuilder/people"
    // }
  ],
  guest: [

  ]
}
