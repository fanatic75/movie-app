import gql from "graphql-tag";


export const GET_REVIEW_QUERY = gql`
  query getReviewQuery($id: Int!) {
    getReview(id: $id) {
      author
      content
      id
    }
  }
`;