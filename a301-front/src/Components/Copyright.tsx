import { Link, Typography } from '@mui/material';

function Copyright(props: any) {
  return (
    <Typography variant="body2" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="#">
        Chronicler.com
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
      <br />
      <br />
      <br />
    </Typography>
  );
}

export default Copyright;
