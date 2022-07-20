import React from 'react';
import './MainNonLog.module.css';
import {
  Stack,
  Card,
  CardContent,
  Typography,
  Button,
  styled,
} from '@mui/material';
const MainNonLog: React.FC = () => {
  const MainStack = styled(Stack)({
    marginTop: '40vh',
    justifyContent: 'center',
    alignItems: 'center',
    spacing: '25vw',
  });
  const MainBtn = styled(Button)({
    margin: '1vh',
    color: '#FFFFFF',
    backgroundColor: '#202321',
  });
  return (
    <>
      <MainStack direction={'row'}>
        <Card>
          <CardContent>
            <Typography sx={{ fontSize: '4vw' }}>회의에 집중하세요</Typography>
          </CardContent>
        </Card>
        <Card>
          <CardContent sx={{ backgroundColor: '#715C71' }}>
            <MainBtn variant="contained">로그인</MainBtn>
            <br />
            <MainBtn variant="contained">회원가입</MainBtn>
          </CardContent>
        </Card>
      </MainStack>
    </>
  );
};

export default MainNonLog;
