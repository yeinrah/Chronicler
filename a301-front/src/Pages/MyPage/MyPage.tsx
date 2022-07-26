import React, { useState } from 'react';
import styles from './MyPage.module.css';
import {
  styled,
  Stack,
  Typography,
  Button,
  Modal,
  Box,
  ImageList,
} from '@mui/material';
import MainBtn from '../../Components/MainBtn';
import { ImageTwoTone } from '@mui/icons-material';
import MeetingTable from '../../Components/MeetingTable';
import InputText from '../../Components/InputText';
import { Link } from 'react-router-dom';
import profileImages from '../../Asset/Image/profile/profileImages';
const MyPage = () => {
  const [prevMeetingList, setPrevMeetingList] = useState<
    { title: string; date: Date }[]
  >([
    { title: '회의1', date: new Date() },
    { title: '회의2', date: new Date() },
  ]);
  const [nickNameModalOpen, setNickNameModalOpen] = useState(false);
  const [phoneModalOpen, setPhoneModalOpen] = useState(false);
  const [passwordModalOpen, setPasswordModalOpen] = useState(false);
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [curImage, setCurImage] = useState(0);
  const nickNameHandleOpen = () => setNickNameModalOpen(true);
  const nickNameHandleClose = () => setNickNameModalOpen(false);
  const phoneHandleOpen = () => setPhoneModalOpen(true);
  const phoneHandleClose = () => setPhoneModalOpen(false);
  const passwordHandleOpen = () => setPasswordModalOpen(true);
  const passwordHandleClose = () => setPasswordModalOpen(false);
  const profileHandleOpen = () => setProfileModalOpen(true);
  const profileHandleClose = () => setProfileModalOpen(false);
  const updateImage = () => {
    // setCurImage(index);
  };
  const MypageStack = styled(Stack)({
    display: 'flex',
    justifyContent: 'center',
    padding: '64px 0px 0px 0px',
    height: 'auto',
  });
  const MypageLeftStack = styled(Stack)({
    display: 'flex',
    flex: '0 0 300px',
    backgroundColor: 'var(--bgBase-color)',
    height: '100vh',
  });
  const MypageRightStack = styled(Stack)({
    backgroundColor: 'var(--bgBase-color)',
    width: '1000px',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
  });
  const MypageProfileImage = styled(Stack)({
    backgroundColor: 'var(--eleBase-color)',
    borderRadius: '50%',
    width: '150px',
    height: '150px',
    cursor: 'pointer',
    // marginLeft: '5%',
    margin: '5vh auto 0 30%',
  });
  const UserInfo = styled(Stack)({
    flexDirection: 'row',
    alignItems: 'center',
    margin: '10px 0 0 20px',
  });
  const SubTitle = styled(Typography)({
    display: 'inline-block',
    fontWeight: 'bold',
    fontSize: '1rem',
    color: 'var(--fontBase-color)',
    textDecoration: 'underline',
    marginTop: '5vh',
    // borderBottom: '5px solid var(--bgBase-color)',
  });
  const SubText = styled(Typography)({
    fontSize: '2rem',
    color: 'var(--fontBase-color)',
  });
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
  const MeetingInfo = styled(Stack)({
    display: 'flex',
    flexDirection: 'column',
  });
  const styleModal = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  const BoxModal = styled(Box)({
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  });
  const ProfileChoices = styled(Stack)({
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  });
  const NickNameModal = () => {
    return (
      <Modal
        open={nickNameModalOpen}
        onClose={nickNameHandleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <BoxModal sx={styleModal}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            닉네임 변경
          </Typography>
          <UserInfo>
            <InputText sx={{ width: '100%' }} />
            <MypageBtn sx={{ height: '100%' }}>확인</MypageBtn>
          </UserInfo>
        </BoxModal>
      </Modal>
    );
  };
  const PhoneModal = () => {
    return (
      <Modal
        open={phoneModalOpen}
        onClose={phoneHandleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <BoxModal sx={styleModal}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            전화번호 변경
          </Typography>
          <UserInfo>
            <InputText sx={{ width: '100%' }} />
            <MypageBtn sx={{ height: '100%' }}>확인</MypageBtn>
          </UserInfo>
        </BoxModal>
      </Modal>
    );
  };
  const PasswordModal = () => {
    return (
      <Modal
        open={passwordModalOpen}
        onClose={passwordHandleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <BoxModal sx={styleModal}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            비밀번호 변경
          </Typography>
          <UserInfo>
            {/* <Link to="/">이메일인증</Link> */}
            <InputText sx={{ width: '100%' }} type="password" />
            <MypageBtn sx={{ height: '100%' }}>확인</MypageBtn>
          </UserInfo>
        </BoxModal>
      </Modal>
    );
  };
  const ProfileModal = () => {
    return (
      <Modal
        open={profileModalOpen}
        onClose={profileHandleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <BoxModal sx={styleModal}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            프로필 선택
          </Typography>
          <ProfileChoices>
            {profileImages.map((element, index) => (
              <img
                src={profileImages[index]}
                alt="images"
                width="60rem"
                key={element}
                className={styles.profileImg}
                onMouseEnter={() => {}}
                onClick={() => {
                  setCurImage(index);
                  profileHandleClose();
                }}
              />
            ))}
          </ProfileChoices>
        </BoxModal>
      </Modal>
    );
  };
  return (
    <>
      <NickNameModal />
      <PasswordModal />
      <ProfileModal />
      <PhoneModal />
      <MypageStack direction="row">
        <MypageLeftStack>
          <MypageProfileImage onClick={profileHandleOpen}>
            <img src={profileImages[curImage]} alt="my profile" />
          </MypageProfileImage>
        </MypageLeftStack>
        <MypageRightStack>
          <SubTitle>닉네임</SubTitle>
          <UserInfo>
            <SubText>정서</SubText>
            <MypageBtn onClick={nickNameHandleOpen}>닉네임 변경</MypageBtn>
          </UserInfo>
          <SubTitle>이메일</SubTitle>
          <UserInfo>
            <SubText>wjdtj9656@gmail.com</SubText>
          </UserInfo>
          <SubTitle>비밀번호</SubTitle>
          <UserInfo>
            <MypageBtn onClick={passwordHandleOpen}>비밀번호 변경</MypageBtn>
          </UserInfo>
          <SubTitle>전화번호</SubTitle>
          <UserInfo>
            <SubText>01038819667</SubText>
            <MypageBtn onClick={phoneHandleOpen}>전화번호 변경</MypageBtn>
          </UserInfo>
          <SubTitle>회의 기록</SubTitle>
          <MeetingInfo>
            <MeetingTable listItem={prevMeetingList} />
          </MeetingInfo>
        </MypageRightStack>
      </MypageStack>
    </>
  );
};
export default MyPage;
