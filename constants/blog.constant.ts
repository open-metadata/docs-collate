export const BLOG_API_BASE_URL = 'https://gql.hashnode.com/'

export const HASHNODE_QUERY = `
    query Publication {
      publication(host: "blog.getcollate.io") {
        posts(first: 3) {
          totalDocuments
          pageInfo {
            hasNextPage
            endCursor
          }
          edges {
            node {
              url
              title
              brief
              slug
              publishedAt
              coverImage {
                url
              }
              reactionCount
              replyCount
            }
          }
        }
  }
}
`