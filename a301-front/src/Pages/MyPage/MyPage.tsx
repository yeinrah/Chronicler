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
import Swal from 'sweetalert2';
import userInfoDelete from '../../Api/userInfoDelete';
import { useNavigate } from 'react-router-dom';
import userLoginedState from '../../recoil/atoms/userLoginedState';
const MyPage = () => {
  const [myEmail, setMyEmail] = useState<any>('null user');
  const [myProfileNum, setMyProfileNum] = useState<any>();
  const [myPhone, setMyPhone] = useState<any>();
  const [myNickname, setMyNickname] = useState<any>();
  const [prevMeetingList, setPrevMeetingList] = useState<
    { title: any; startDate: any; endDate: any }[]
  >([
    { title: '회의1', startDate: new Date(), endDate: new Date() },
    { title: '회의2', startDate: new Date(), endDate: new Date() },
  ]);
  const navigate = useNavigate();
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
  const [nowLogined, setNowLogined] = useRecoilState<any>(userLoginedState);
  const [nowUserInfo, setNowUserInfo] = useRecoilState<any>(userInfoState);
  const [minuteList, setMinuteList] = useState([]);
  const swalWithBootstrapButtons: any = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger',
    },
  });
  useEffect(() => {
    console.log('!!!!!!!!!!!!!!!!!!!!1');
    setNowUserInfo({
      id: nowUserInfo.id,
      email: myEmail,
      nickname: myNickname,
      image: MypageProfileImage,
      phone: myPhone,
    });
  }, [myEmail, myProfileNum, myPhone, myNickname]);
  const DeleteUser = () => {
    let token = localStorage.getItem('access-token');
    Swal.fire({
      title: '탈퇴 하시겠습니까?',
      text: '되돌릴 수 없습니다.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '네!',
      cancelButtonText: '아니요!',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('탈퇴 완료', '모든 개인정보가 삭제 되었습니다.', 'success');
        if (token != null)
          userInfoDelete.delete<any>(`/userInfo/mypage/${nowUserInfo.id}`, {
            headers: {
              'access-token': token,
            },
          });
        setNowLogined(false);
        navigate('/main');
      }
    });
  };
  const updateProfileImage = (num: number) => {
    let token = localStorage.getItem('access-token');
    if (token != null)
      userInfoUpdateImage
        .patch(
          `./userInfo/updateImage/${nowUserInfo.id}`,
          { image: num },
          {
            headers: {
              'access-token': token,
            },
          }
        )
        .then(() => {
          setMyProfileNum(num);
        });
  };
  const updateNickName = () => {
    let token = localStorage.getItem('access-token');
    if (token != null)
      userInfoUpdateNickname
        .patch(
          `/userInfo/updateNickname/${nowUserInfo.id}`,
          {
            nickname: inputNickNameChange.current.value,
          },
          {
            headers: {
              'access-token': token,
            },
          }
        )
        .then(() => {
          nickNameHandleClose();
          setMyNickname(inputNickNameChange.current.value);
          Swal.fire({
            icon: 'success',
            title: 'success',
            text: '닉네임 변경 성공',
          });
        })
        .catch(() => {
          nickNameHandleClose();
          Swal.fire({
            icon: 'error',
            title: '숫자, 영어, 한글만 가능 / 1~32글자로 입력해주세요',
            text: '닉네임 변경 실패',
          });
        });
  };
  const updatePassword = () => {
    let token = localStorage.getItem('access-token');
    if (token != null)
      userInfoUpdatePassword
        .patch(
          `./userInfo/updatePassword/${nowUserInfo.id}`,
          {
            password: inputPasswordChange.current.value,
          },
          {
            headers: {
              'access-token': token,
            },
          }
        )
        .then(() => {
          passwordHandleClose();
          Swal.fire({
            icon: 'success',
            title: 'success',
            text: '비밀번호 변경 성공',
          });
        })
        .catch(() => {
          passwordHandleClose();
          Swal.fire({
            icon: 'error',
            title:
              '숫자, 영어, 특수문자가 적어도 1개 이상씩 포함 / 8~16글자여야 합니다.',
            text: '비밀번호 변경 실패',
          });
        });
  };
  const updatePhone = () => {
    let token = localStorage.getItem('access-token');
    if (token != null)
      userInfoUpdatePhone
        .patch(
          `./userInfo/updatePhone/${nowUserInfo.id}`,
          {
            phone: inputPhoneChange.current.value,
          },
          {
            headers: {
              'access-token': token,
            },
          }
        )
        .then(() => {
          phoneHandleClose();
          setMyPhone(inputPhoneChange.current.value);
          Swal.fire({
            icon: 'success',
            title: 'success',
            text: '전화번호 변경 성공',
          });
        })
        .catch(() => {
          phoneHandleClose();
          Swal.fire({
            icon: 'error',
            title: '숫자로만 / 010으로 시작하는 11글자',
            text: '전화번호 변경 실패',
          });
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
    let token = localStorage.getItem('access-token');
    if (token != null)
      userInfoSearch
        .get<any>(`userInfo/mypage/${nowUserInfo.id}`, {
          headers: {
            'access-token': token,
          },
        })
        .then((info) => {
          if (!info.data.user.image) info.data.user.image = 0;
          setMyEmail(info.data.user.email);
          setMyNickname(info.data.user.nickname);
          setMyPhone(info.data.user.phone);
          setMyProfileNum(info.data.user.image);
          let nowMinute: any = [];
          info.data.history.map((historyData: any, index: any) => {
            if (historyData.userId === nowUserInfo.id) {
              let start;
              if (historyData.action === 2 || historyData.action === 3) {
                for (let i = info.data.history.length - 1; i >= 0; i--) {
                  let data = info.data.history[i];
                  if (
                    data.cid === historyData.cid &&
                    (data.action === 0 || data.action === 1)
                  ) {
                    start = data.insertedTime;
                  }
                }
                nowMinute.push({
                  title: historyData.chId,
                  startDate: start,
                  endDate: historyData.insertedTime,
                });
                // nowData.title = historyData.chId;
                // nowData.endDate = historyData.insertedTime;
              }
              // nowMinute.push(nowData);
            }
          });
          setPrevMeetingList(nowMinute);
        })
        .catch((e) => {
          console.log(e);
        });
  };
  useEffect(() => {
    if (!nowLogined) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: '마이페이지는 로그인 후에 이용 가능합니다',
      });
      navigate('/main');
    }
    loadUserInfo();
  }, []);
  // useEffect(() => {
  //   userInfoSearch.get<any>('userInfo/mypge/${now')
  // }, [myEmail]);
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
                key={index}
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
          <MypageBtn
            sx={{
              maxWidth: 700,
              margin: '50px 0px',
              backgroundColor: 'var(--eleActionNeg-color)',
              color: 'var(--fontBase-color)',
            }}
            onClick={DeleteUser}
          >
            회원 탈퇴
          </MypageBtn>
        </MypageRightStack>
      </MypageStack>
    </>
  );
};
export default MyPage;
