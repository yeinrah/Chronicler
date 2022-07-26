import React from 'react';
import styles from './MainLogined.module.css';
import {
  Stack,
  Card,
  CardContent,
  Typography,
  Button,
  styled,
} from '@mui/material';
import MainStack from '../../Components/MainStack';
import MainBtn from '../../Components/MainBtn';
import CardOfBtn from '../../Components/CardOfBtn';
import InputText from '../../Components/InputText';
const MainLogined: React.FC = () => {
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
            <MainBtn variant="contained">새회의</MainBtn>
            <InputText id="outlined-basic" label={'초대링크를 입력하세요.'} />
          </CardOfBtn>
        </Card>
      </MainStack>
    </>
  );
};

export default MainLogined;
