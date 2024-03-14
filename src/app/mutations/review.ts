import gql from "graphql-tag";

export const INSERT_REVIEW_MUTATION = gql`
  mutation InsertReviewMutation($review: NewReview!) {
    createReview(input: $review) {
      author
      content
      id
    }
  }
`;

export const EDIT_REVIEW_MUTATION = gql`
  mutation EditReviewMutation($id: Int!, $content: String!) {
    editReview(id: $id, content: $content) {
      author
      content
      id
    }
  }
`;
