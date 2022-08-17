import React, { useRef, useState } from 'react';
import styles from './FindEmailCard.module.css';
import Copyright from '../../Components/Copyright';
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Box,
  Typography,
  Container,
  Modal,
  ThemeProvider,
} from '@mui/material';
import PolicyIcon from '@mui/icons-material/Policy';
import userInfoFindEmailApi from '../../Api/userInfoFindEmailApi';
import BoxModal from '../../Components/BoxModal';
import UserInfo from '../../Components/UserInfo';
import InputText from '../../Components/InputText';
import MypageBtn from '../../Components/MypageBtn';
import { stringify } from 'querystring';
import Swal from 'sweetalert2';
import { Navigate, useNavigate } from 'react-router-dom';
import theme from '../../Components/Theme';

const FindEmailCard = () => {
  const [isShowEmailModal, setIsShowEmailModal] = useState(false);
  // const emailShowHandleOpen = () => setIsShowEmailModal(true);
  // const emailShowHandleClose = () => setIsShowEmailModal(false);
  const inputNumber = useRef<any>();
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState<any>('');
  const styleModal = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
  };
  const findEmail = () => {
    type PhoneNumber = {
      phone: string;
    };
    userInfoFindEmailApi
      .get<PhoneNumber>('/userInfo/findEmail', {
        params: {
          phone: inputNumber.current.value,
        },
      })
      .then((res) => {
        setUserEmail(res.data);
        // emailShowHandleOpen();
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: String(res.data),
        }).then(() => {
          navigate('/signin');
        });
      })
      .catch((error) => {
        setUserEmail('유효하지 않은 번호 입니다.');
        Swal.fire({
          icon: 'error',
          title: 'fail',
          text: '유효하지 않은 번호 입니다.',
        });
      });
  };
  // const ShowEmailModal = () => {
  //   return (
  //     <Modal
  //       // open={isShowEmailModal}
  //       // onClose={emailShowHandleClose}
  //       aria-labelledby="modal-modal-title"
  //       aria-describedby="modal-modal-description"
  //     >
  //       <BoxModal sx={styleModal}>
  //         <Typography id="modal-modal-title" variant="h6" component="h2">
  //           {userEmail}
  //         </Typography>
  //         <UserInfo>
  //           <MypageBtn
  //             sx={{ height: '100%', margin: 'auto' }}
  //             onClick={emailShowHandleClose}
  //           >
  //             확인
  //           </MypageBtn>
  //         </UserInfo>
  //       </BoxModal>
  //     </Modal>
  //   );
  // };

  return (
    <>
      {/* <ShowEmailModal /> */}
      <Container
        component="main"
        maxWidth="xs"
        sx={{ bgcolor: 'var(--eleBase-color)', marginTop: '100px' }}
      >
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'var(--btnMain-color)' }}>
            <PolicyIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Find your email
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 3 }}
          >
            <ThemeProvider theme={theme}>
              <TextField
                required
                fullWidth
                id="phone"
                label="Phone(Only digits)"
                name="phone"
                autoComplete="phone"
                color="secondary"
                inputRef={inputNumber}
              />
            </ThemeProvider>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                bgcolor: 'var(--btnMain-color)',
                color: 'var(--fontBase-color)',
                '&:hover': { bgcolor: 'var(--btnMainHover-color)' },
                mt: 3,
                mb: 2,
              }}
              onClick={findEmail}
            >
              Find Your Email
            </Button>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </>
  );
};

export default FindEmailCard;
