import React, { useState } from 'react';
import './MainNonLog.module.css';
import { Card, CardContent, Typography } from '@mui/material';
import MainStack from '../../Components/MainStack';
import MainBtn from '../../Components/MainBtn';
import CardOfBtn from '../../Components/CardOfBtn';
import { Link, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import userLoginedState from '../../recoil/atoms/userLoginedState';
import InputText from '../../Components/InputText';
import userInfoState from '../../recoil/atoms/userInfoState';
import { MoonLoader } from 'react-spinners';
import Loading from '../../Components/Loading';
import { Navbar } from '../../Containers';
const MainNonLog: React.FC = () => {
  const [nowLogined, setNowLogined] = useRecoilState<any>(userLoginedState);
  const [nowUserInfo, setNowUserInfo] = useRecoilState<any>(userInfoState);
  const [inputCode, setInputCode] = useState<any>();
  const navigate = useNavigate();
  return (
    <>
      {nowLogined && <Navbar />}
      <MainStack direction={'row'}>
        <Card sx={{ marginRight: '30vw', boxShadow: '0 0 0 0' }}>
          <CardContent
            sx={{
              width: '30vw',
              backgroundColor: 'var(--bgBase-color)',
              color: 'white',
            }}
          >
            <Typography
              sx={{
                fontSize: '3vw',
                wordBreak: 'keep-all',
                lineHeight: '130%',
                fontFamily: 'Song Myung',
              }}
            >
              회의에 집중하세요 기록은 맡겨주세요
            </Typography>
          </CardContent>
        </Card>
        {!nowLogined || !nowUserInfo.nickname ? (
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
                }}
              >
                새 회의
              </MainBtn>
              <InputText
                id="outlined-basic"
                label={'초대코드를 입력하세요.(Enter)'}
                onChange={(e) => {
                  setInputCode(e.target.value);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    console.log(e);
                    navigate('/MeetingRoom', { state: inputCode });
                  }
                }}
              />
            </CardOfBtn>
          </Card>
        )}
      </MainStack>
    </>
  );
};

export default MainNonLog;
