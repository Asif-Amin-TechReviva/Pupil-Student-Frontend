import { styled, keyframes } from '@mui/material/styles';
import LinearProgress from '@mui/material/LinearProgress';
import logo from '../assets/images/logo.png';

const pulse = keyframes`
  0%, 100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.3);
    opacity: 0.8;
  }
`;

const LoaderWrapper = styled('div')({
  position: 'absolute',
  top: 0,
  left: 0,
  zIndex: 1,
  width: '100%',
  height: '100%',
  maxHeight: '100%',
  backgroundColor: 'rgba(255, 255, 255, 0.8)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backdropFilter: 'blur(5px)'
});

const LogoContainer = styled('div')({
  position: 'relative',
  width: 200,
  height: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column'
});

const CenterImage = styled('img')({
  width: 100,
  height: 60,
  objectFit: 'contain',
  animation: `${pulse} 2s ease-in-out infinite`,
  filter: 'drop-shadow(0 0 8px rgba(0, 183, 255, 0.8))'
});

export default function LogoImageLoader() {
  return (
    <LoaderWrapper>
      <LogoContainer>
        <CenterImage src={logo} alt="Loading..." />
        <LinearProgress
          color="primary"
          sx={{
            width: '80%',
            borderRadius: 5,
            height: 6,
            marginTop: 4 
          }}
        />
      </LogoContainer>
    </LoaderWrapper>
  );
}