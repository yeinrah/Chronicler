import React from 'react';
import './MainNonLog.module.css';
import { Card, CardContent, Typography } from '@mui/material';
import MainStack from '../../Components/MainStack';
import MainBtn from '../../Components/MainBtn';
import CardOfBtn from '../../Components/CardOfBtn';
import { Link } from 'react-router-dom';
const MainNonLog: React.FC = () => {
  return (
    <>
      <MainStack direction={'row'}>
        <Card sx={{ marginRight: '30vw' }}>
          <CardContent
            sx={{
              width: '30vw',
              backgroundColor: 'var(--bgBase-color)',
              color: 'white',
            }}
          >
            <Typography sx={{ fontSize: '3vw' }}>
              회의에 집중하세요. 기록은 우리에게 맡기세요 .
            </Typography>
          </CardContent>
        </Card>
        <Card>
          <CardOfBtn>
            <Link
              to="/signin"
              style={{
                textDecoration: 'none',
                color: 'var(--fontBase-color)',
              }}
            >
              <MainBtn variant="contained">로그인</MainBtn>
            </Link>

            <Link
              to="/signup"
              style={{
                textDecoration: 'none',
                color: 'var(--fontBase-color)',
              }}
            >
              <MainBtn variant="contained">회원가입</MainBtn>
            </Link>
          </CardOfBtn>
        </Card>
      </MainStack>
    </>
  );
};

export default MainNonLog;
