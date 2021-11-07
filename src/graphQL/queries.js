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
      mission_name
      launch_date_local
      launch_success
    }
  }
`;

export const QUERY_LAUNCH_PROFILE = gql`
  query LaunchProfile($id: String!) {
    launch(id: $id) {
      id
      flight_number
      mission_name
      launch_year
      launch_success
      details
      launch_site {
        site_name
      }
      rocket {
        rocket_name
        rocket_type
      }
      links {
        flickr_images
      }
    }
  }
`;
