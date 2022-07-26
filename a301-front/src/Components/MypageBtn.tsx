import { Button, styled } from '@mui/material';

const MypageBtn = styled(Button)({
  height: '2.7rem',
  marginLeft: '1rem',
  backgroundColor: 'var(--eleActionPos-color)',
  color: 'var(--fontAccent-color)',
  ':hover': {
    backgroundColor: 'var(--eleActionPos-color)',
    color: 'var(--fontAccent-color)',
    opacity: '0.5',
  },
});
export default MypageBtn;
