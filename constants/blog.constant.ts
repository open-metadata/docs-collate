export const BLOG_API_BASE_URL = 'https://gql.hashnode.com/'

export const HASHNODE_QUERY = `
    query Publication {
      publication(host: "blog.getcollate.io") {
        posts(first: 3) {
          edges {
            node {
              url
              title
              brief
              coverImage {
                url
              }
            }
          }
        }
  }
}
`