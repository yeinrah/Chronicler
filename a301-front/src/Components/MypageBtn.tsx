import { Button, styled } from '@mui/material';

const MypageBtn = styled(Button)({
  height: '2.7rem',
  marginLeft: '1rem',
  backgroundColor: 'var(--btnMain-color)',
  color: 'var(--fontBase-color)',
  ':hover': {
    backgroundColor: 'var(--btnMain-color)',
    color: 'var(--fontAccent-color)',
    opacity: '0.5',
  },
});
export default MypageBtn;
