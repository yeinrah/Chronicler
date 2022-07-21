import React from 'react';
import './MainNonLog.module.css';
import { Card, CardContent, Typography } from '@mui/material';
import MainStack from '../../Components/MainStack';
import MainBtn from '../../Components/MainBtn';
import CardOfBtn from '../../Components/CardOfBtn';
const MainNonLog: React.FC = () => {
  return (
    <>
      <MainStack direction={'row'}>
        <Card sx={{ marginRight: '30vw' }}>
          <CardContent sx={{ width: '30vw' }}>
            <Typography sx={{ fontSize: '3vw' }}>
              회의에 집중하세요. 기록은 우리에게 맡기세요 .
            </Typography>
          </CardContent>
        </Card>
        <Card>
          <CardOfBtn>
            <MainBtn variant="contained">새 회의</MainBtn>
            <br />
            <MainBtn variant="contained">회원가입</MainBtn>
          </CardOfBtn>
        </Card>
      </MainStack>
    </>
  );
};

export default MainNonLog;
