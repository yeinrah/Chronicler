import React, { useEffect, useRef, useState } from 'react';
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
import MeetingTable from '../../Components/MeetingTable';
import InputText from '../../Components/InputText';
import profileImages from '../../Asset/Image/profile/profileImages';
import BoxModal from '../../Components/BoxModal';
import UserInfo from '../../Components/UserInfo';
import MypageBtn from '../../Components/MypageBtn';
import userInfoSearch from '../../Api/userInfoSearch';
import userInfoUpdatePassword from '../../Api/userInfoUpdatePassword';
import userInfoUpdateNickname from '../../Api/userInfoUpdateNickname';
import userInfoUpdateImage from '../../Api/userInfoUpdateImage';
import userInfoUpdatePhone from '../../Api/userinfoUpdatePhone';
import { useRecoilState } from 'recoil';
import userInfoState from '../../recoil/atoms/userInfoState';
const MyPage = () => {
  const [myEmail, setMyEmail] = useState<any>('null user');
  const [myProfileNum, setMyProfileNum] = useState<any>();
  const [myPhone, setMyPhone] = useState<any>();
  const [myNickname, setMyNickname] = useState<any>();
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
  const nickNameHandleOpen = () => setNickNameModalOpen(true);
  const nickNameHandleClose = () => setNickNameModalOpen(false);
  const phoneHandleOpen = () => setPhoneModalOpen(true);
  const phoneHandleClose = () => setPhoneModalOpen(false);
  const passwordHandleOpen = () => setPasswordModalOpen(true);
  const passwordHandleClose = () => setPasswordModalOpen(false);
  const profileHandleOpen = () => setProfileModalOpen(true);
  const profileHandleClose = () => setProfileModalOpen(false);
  const inputNickNameChange = useRef<any>();
  const inputPasswordChange = useRef<any>();
  const inputPhoneChange = useRef<any>();
  const [nowUserInfo, setNowUserInfo] = useRecoilState<any>(userInfoState);
  const updateProfileImage = (num: number) => {
    userInfoUpdateImage
      .patch(`./userInfo/updateImage/${nowUserInfo.id}`, { image: num })
      .then(() => {
        setMyProfileNum(num);
      });
  };
  const updateNickName = () => {
    userInfoUpdateNickname
      .patch(`/userInfo/updateNickname/${nowUserInfo.id}`, {
        nickname: inputNickNameChange.current.value,
      })
      .then(() => {
        nickNameHandleClose();
        setMyNickname(inputNickNameChange.current.value);
      });
  };
  const updatePassword = () => {
    userInfoUpdatePassword
      .patch(`./userInfo/updatePassword/${nowUserInfo.id}`, {
        password: inputPasswordChange.current.value,
      })
      .then(() => {
        passwordHandleClose();
      });
  };
  const updatePhone = () => {
    userInfoUpdatePhone
      .patch(`./userInfo/updatePhone/${nowUserInfo.id}`, {
        phone: inputPhoneChange.current.value,
      })
      .then(() => {
        phoneHandleClose();
        setMyPhone(inputPhoneChange.current.value);
      });
  };
  type userInfo = {
    id: number;
    // nickname: string;
    // email: string;
    // phone: string;
    // image: number;
  };
  const loadUserInfo = () => {
    userInfoSearch
      .get<any>(`userInfo/mypage/${nowUserInfo.id}`, {})
      .then((info) => {
        console.log(info);
        console.log('chkeck!!!');
        if (!info.data.image) info.data.image = 0;
        setMyEmail(info.data.email);
        setMyNickname(info.data.nickname);
        setMyPhone(info.data.phone);
        setMyProfileNum(info.data.image);
      });
  };
  useEffect(() => {
    loadUserInfo();
  }, []);
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
            <InputText sx={{ width: '100%' }} inputRef={inputNickNameChange} />
            <MypageBtn sx={{ height: '100%' }} onClick={updateNickName}>
              확인
            </MypageBtn>
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
            <InputText sx={{ width: '100%' }} inputRef={inputPhoneChange} />
            <MypageBtn sx={{ height: '100%' }} onClick={updatePhone}>
              확인
            </MypageBtn>
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
            <InputText
              sx={{ width: '100%' }}
              type="password"
              inputRef={inputPasswordChange}
            />
            <MypageBtn sx={{ height: '100%' }} onClick={updatePassword}>
              확인
            </MypageBtn>
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
                  updateProfileImage(index);
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
            <img src={profileImages[myProfileNum]} alt="my profile" />
          </MypageProfileImage>
        </MypageLeftStack>
        <MypageRightStack>
          <SubTitle>닉네임</SubTitle>
          <UserInfo>
            <SubText>{myNickname}</SubText>
            <MypageBtn onClick={nickNameHandleOpen}>닉네임 변경</MypageBtn>
          </UserInfo>
          <SubTitle>이메일</SubTitle>
          <UserInfo>
            <SubText>{myEmail}</SubText>
          </UserInfo>
          <SubTitle>비밀번호</SubTitle>
          <UserInfo>
            <MypageBtn onClick={passwordHandleOpen}>비밀번호 변경</MypageBtn>
          </UserInfo>
          <SubTitle>전화번호</SubTitle>
          <UserInfo>
            <SubText>{myPhone}</SubText>
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
