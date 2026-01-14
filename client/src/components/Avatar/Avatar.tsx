import { AccountCircle } from '@mui/icons-material';
import { ReactElement } from 'react';
import styled from 'styled-components';

interface AvatarProps {
  src?: string | null; // Fix this
  size?: number;
  onClick?: () => void;
}

interface StyledAvatarProps {
  size?: number;
}

const StyledAvatar = styled.img<StyledAvatarProps>`
  width: ${(props) => props.size || 128}px;
  height: ${(props) => props.size || 128}px;
  border: 0;
  border-radius: 50%;
  background: #999;
  display: flex;
  align-items: center;
  justify-content: center;
`;

function Avatar({ onClick = () => {}, src, size = 128 }: AvatarProps): ReactElement {
  if (!src) {
    return <AccountCircle onClick={onClick} />;
  }

  return <StyledAvatar onClick={onClick} src={src} size={size} />;
}

export default Avatar;
