import { gql } from "@apollo/client";

export const GET_MISSION_NAMES = gql`
  query {
    launches {
      id
      mission_name
    }
  }
`;

export const LAUNCHES_QUERY = gql`
  query Launches($limit: Int!) {
    launches(limit: $limit) {
      id
      mission_name
      launch_date_local
      launch_success
      details
      links {
        article_link
        flickr_images
      }
    }
  }
`;

export const QUERY_LAUNCH_PROFILE = gql`
  query LaunchProfile($id: ID!) {
    launch(id: $id) {
      id
      mission_name
      launch_date_local
      launch_success
      details
      links {
        article_link
        flickr_images
      }
    }
  }
`;
