import styled from 'styled-components';
import { Link } from 'react-router-dom';

const UnstyledLink = styled(Link)`
  text-decoration: none;

  > * {
    text-decoration: none;
    color: inherit;
  }
`;

export default UnstyledLink;
