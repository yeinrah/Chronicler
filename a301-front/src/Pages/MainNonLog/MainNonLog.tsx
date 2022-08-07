import React from 'react';
import styles from './MainNonLog.module.css';
import { Card, CardContent, Typography } from '@mui/material';
import MainStack from '../../Components/MainStack';
import MainBtn from '../../Components/MainBtn';
import CardOfBtn from '../../Components/CardOfBtn';
import { Link, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import userLoginedState from '../../recoil/atoms/userLoginedState';
import InputText from '../../Components/InputText';
const MainNonLog: React.FC = () => {
  const [nowLogined, setNowLogined] = useRecoilState<any>(userLoginedState);
  const navigate = useNavigate();
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
        {!nowLogined ? (
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
        ) : (
          <Card>
            <CardOfBtn>
              <MainBtn
                variant="contained"
                onClick={() => {
                  navigate('/MeetingRoom');
                  console.log('hihi');
                }}
              >
                새회의
              </MainBtn>
              <InputText id="outlined-basic" label={'초대링크를 입력하세요.'} />
            </CardOfBtn>
          </Card>
        )}
      </MainStack>
    </>
  );
};

export default MainNonLog;
