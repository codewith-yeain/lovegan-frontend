import React, { useEffect, useState } from 'react';
import logo from './icons/lovegan_logo 1.svg';
import kakao from './icons/kakao.svg';
import naver from './icons/naver.svg';
import google from './icons/google.svg';
import attention from './icons/attention.svg';
import right from './icons/right.svg';
import S from './style';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { setSignUpUser } from '../../../modules/user';
import { useDispatch } from 'react-redux';



const SignUp = () => {

    // react-hook-form
    const { register, handleSubmit, watch, getValues, formState: {errors, isSubmitted}, trigger} = useForm({mode : "onchange"});

    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[!@#])[\da-zA-Z!@#]{8,}$/;

    const resendCode = () => {

    }
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const clickToLogin = () => {
        navigate('/login')
    }
    const clickToMain = () => {
        navigate('/')
    }
    const onInvalid = () => {
        console.log("유효성 검사 실패");
        trigger();
    }

    const phoneNumber = watch("phone", "");
    const [code, setCode] = useState("");
    const [isCodeSent, setIsCodeSent] = useState(false);
    const [isVerified, setIsVerified] = useState(false);
    const [timer, setTimer] = useState(180);

    const formatTimer = () => {
        const minutes = Math.floor(timer / 60);
        const seconds = timer % 60;
        return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
    };

    const [allChecked, setAllChecked] = useState(false);
    const [isChecked, setIsChecked] = useState({
        age : false,
        terms : false,
        privacy : false,
        marketing : false,
        sms : false
    })
    const handleAllChecked = () => {
        setAllChecked(!allChecked);
        setIsChecked({
            age : !allChecked,
            terms : !allChecked,
            privacy : !allChecked,
            marketing : !allChecked,
            sms : !allChecked
        })
    }
    const handleEachChecked = (key) => {
        const updatedChecked = { ...isChecked, [key]: !isChecked[key] };
        setIsChecked(updatedChecked); 
        setAllChecked(Object.values(updatedChecked).every((value) => value));
    };

    const onSubmit = async (data) => {
        if (!isChecked.age || !isChecked.terms || !isChecked.privacy) {
            console.log("필수 항목 동의")
            window.alert("필수 항목을 동의해주세요");
            return;
        }
        await fetch("http://localhost:8000/user/register", {
            method : "POST",
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify({
                email : data.email + data.emailDrop,
                password : data.password,
                phone : data.phone,
                nickname : data.nickname
            })
        })
        .then((res) => res.json())
        .then((res) => {
            console.log(res)
            if(res.registerSuccess){
                let {registerSuccess, message} = res;
                dispatch(setSignUpUser({
                    nickname : data.nickname
                }))
                alert(res.message)
                navigate('/signIn');
                console.log(res)
            }
            else{
                alert(res.message)
            }
        })
        
    }

    const requestCode = async () => {
        console.log("전화번호", phoneNumber)
        try {
            const response = await fetch("http://localhost:8000/user/send-verification", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ phoneNumber })
            });

            const data = await response.json();
            if (data.success) {
                alert("인증번호가 전송되었습니다.");
                setIsCodeSent(true);
            } else {
                alert("인증번호 전송 실패: " + data.message);
            }
        } catch (error) {
            console.error("인증번호 요청 오류:", error);
            alert("서버 오류 발생");
        }
    }
    const verifyCode = async () => {
        console.log("전송할 데이터 : ", {phoneNumber, code})
        try {
            const response = await fetch("http://localhost:8000/user/signup-verify-code", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ phoneNumber, code: code.toString().trim() })
            });

            const data = await response.json();
            if (data.success) {
                alert("인증 성공!");
                setIsVerified(true);
            } else {
                alert("인증 실패: " + data.message);
            }
        } catch (error) {
            console.error("인증번호 검증 오류:", error);
            alert("서버 오류 발생");
        }
    }
    
    return (
        <div>
            <S.Form onSubmit={handleSubmit(onSubmit, onInvalid)} >
                <S.Wrapper>
                    <S.Logo src={logo} alt="로고" onClick={clickToMain}/>
                    <S.SignUp>회원가입</S.SignUp>
                    <div>
                        <S.Divider></S.Divider>
                        <S.DividerFont>간편 회원가입</S.DividerFont>
                    </div>
                    <S.Button>
                        <S.Kakao>
                            <div>
                                <img src={kakao} />카카오로 시작하기
                            </div>
                        </S.Kakao>
                        <S.Naver>
                            <div>
                                <img src={naver} />네이버로 시작하기 
                            </div>
                        </S.Naver>
                        <S.Google>
                            <div>
                                <img src={google} />구글로 시작하기
                            </div>
                        </S.Google>
                    </S.Button>
                    <S.EmailDivider></S.EmailDivider>
                    <S.Email>이메일</S.Email>
                    <S.EmailContainer>
                        <S.EmailInput placeholder='이메일' id='email' name='email' type='text'
                            {...register("email", {
                                required : true,
                            })}
                        />
                        @
                        <S.EmailDropDown defaultValue="" id='emailDrop'
                            {...register("emailDrop", {
                                required : true,
                                validate : (value) => value != ""
                            })}
                        >
                            <option value="" disabled hidden>선택해주세요</option>
                            <option value="@naver.com">naver.com</option>
                            <option value="@gmail.com">gmail.com</option>
                            <option value="@kakao.com">kakao.com</option>
                        </S.EmailDropDown>
                        
                    </S.EmailContainer>
                    {isSubmitted&&errors?.email?.type === 'required' && (
                        <S.ConfirmMessage>이메일을 입력해주세요.</S.ConfirmMessage>
                    )}
                    {isSubmitted&&errors?.emailDrop?.type === 'required' && (
                        <S.ConfirmMessage>이메일 형식을 입력해주세요.</S.ConfirmMessage>
                    )}
                    <S.EmailButton>이메일 인증하기</S.EmailButton>
                    <S.EmailCertifyBox>
                        <div>이메일로 받은 인증코드를 입력해주세요.</div>
                        <S.CertifyCodeContainer>
                            <S.CertifyCode placeholder='인증코드 6자리'></S.CertifyCode>
                            <S.EmailConfirm>확인</S.EmailConfirm>
                        </S.CertifyCodeContainer>
                        <S.ReCertifyCode>
                            <img src={attention}/>
                            <S.NoEmail>이메일을 받지 못하셨나요?</S.NoEmail>
                            <S.ResendCode onClick={resendCode}>이메일 재전송하기</S.ResendCode>
                        </S.ReCertifyCode>

                    </S.EmailCertifyBox>
                    <S.Email>전화번호</S.Email>
                    <S.EmailContainer>
                        <S.PhoneInput placeholder='전화번호' id='phone' 
                            {...register("phone", {
                                required : true,
                                pattern : {
                                    value : /^\d{10,11}$/
                                }
                            })}
                        />
                    </S.EmailContainer>
                    {isSubmitted&&errors?.phone?.type === 'required' && (
                        <S.ConfirmMessage>전화번호를 입력해주세요.</S.ConfirmMessage>
                            
                    )}
                    {isSubmitted&&errors?.phone?.type === 'pattern' && (
                        <S.ConfirmMessage>올바를 전화번호 형식을 입력해주세요.</S.ConfirmMessage>
                    )}
                    <S.EmailButton onClick={requestCode} disabled={isCodeSent}>전화번호 인증하기</S.EmailButton>
                    <S.EmailCertifyBox>
                        <div>문자로 받은 인증코드를 입력해주세요.</div>
                        <S.CertifyCodeContainer>
                            <S.CertifyCode placeholder='인증코드 6자리' value={code} onChange={(e) => setCode(e.target.value)}></S.CertifyCode>
                            <span style={{ position: 'absolute', right: '56px', color: '#F25050', top: '21px'}}>{formatTimer()}</span>
                            <S.EmailConfirm onClick={verifyCode}>확인</S.EmailConfirm>
                        </S.CertifyCodeContainer>
                        <S.ReCertifyCode>
                            <img src={attention}/>
                            <S.NoEmail>문자를 받지 못하셨나요?</S.NoEmail>
                            <S.ResendCode onClick={resendCode}>문자 재전송하기</S.ResendCode>
                        </S.ReCertifyCode>
                    </S.EmailCertifyBox>
                    <S.Password>비밀번호</S.Password>
                    <S.PasswordInputContainer>
                        영문, 숫자, 기호(*!@#)를 포함한 8자 이상의 비밀번호를 입력해주세요.
                        <S.PasswordInput placeholder='비밀번호' type='password' id='password' name='password' 
                            {...register("password", {
                                required : true,
                                pattern : {
                                  value : passwordRegex,
                                }
                              })}
                        />
                        {isSubmitted&&errors?.password?.type === 'required' && (
                            <S.ConfirmMessage>비밀번호를 입력해주세요.</S.ConfirmMessage>
                        )}
                        {isSubmitted&&errors?.password?.type === 'pattern' && (
                            <S.ConfirmMessage>소문자, 숫자, 특수문자 각 하나씩 포함한 8자리 이상이여야 합니다. *!@#만 사용가능</S.ConfirmMessage>
                        )}
                    </S.PasswordInputContainer>

                    <S.Password>비밀번호 확인</S.Password>
                    <S.PasswordInput placeholder='비밀번호' type='password'
                        {...register("passwordConfirm", {
                            required : true,
                            validate : {
                              matchPassword : (value) => {
                                  const { password } = getValues();
                                  let isMatch = password == value;
                                  console.log(value, password, isMatch);
                                  return isMatch;
                              }
                            }
                          })}
                    />
                    {isSubmitted&&errors?.passwordConfirm && (
                        <S.ConfirmMessage>비밀번호를 확인해주세요.</S.ConfirmMessage>
                    )}

                    <S.Nickname>닉네임</S.Nickname>
                    <S.NicknameInputContainer>
                        다른 유저와 겹치지 않도록 입력해주세요. (2~20자)
                        <S.NicknameInput placeholder='별명 (2~20자)' id='nickname'
                            {...register("nickname", {
                                required: true,
                                minLength : 2,
                                maxLength : 20
                            })}
                        />
                        {isSubmitted && errors.nickname && errors?.nickname.type === 'required' && (
                            <S.ConfirmMessage>닉네임을 입력해주세요.</S.ConfirmMessage>
                        )}
                        {isSubmitted && errors.nickname && errors?.nickname.type === 'minLength' && (
                            <S.ConfirmMessage>닉네임은 최소 2자 이상이어야 합니다.</S.ConfirmMessage>
                        )}
                        {isSubmitted && errors.nickname && errors?.nickname.type === 'maxLength' && (
                            <S.ConfirmMessage>닉네임은 최대 20자 이내여야 합니다.</S.ConfirmMessage>
                        )}
                    </S.NicknameInputContainer>

                    <S.Agree>약관 동의</S.Agree>
                    <S.AgreeContainer>
                        <S.AllAgree>
                            <label>
                                <S.AgreeCheckbox type="checkbox" checked={allChecked} onChange={handleAllChecked}/>전체동의
                                <span>선택항목에 대한 동의 포함</span>
                            </label>
                        </S.AllAgree>
                        <S.AgreeDivider></S.AgreeDivider>
                        <S.EachAgree>
                            <S.AgreeLabel>
                                <S.AgreeCheckbox type="checkbox" checked={isChecked.age} onChange={()=>handleEachChecked('age')} />만 14세 이상입니다
                                <S.Required>(필수)</S.Required>
                            </S.AgreeLabel>
                            <S.AgreeLabel>
                                <S.AgreeCheckbox type="checkbox" checked={isChecked.terms} onChange={()=>handleEachChecked('terms')} />이용약관
                                <S.Required>(필수)</S.Required>
                                <img src={right} />
                            </S.AgreeLabel>
                            <S.AgreeLabel>
                                <S.AgreeCheckbox type="checkbox" checked={isChecked.privacy} onChange={()=>handleEachChecked('privacy')} />개인정보수집 및 이용동의
                                <S.Required>(필수)</S.Required>
                                <img src={right} />
                            </S.AgreeLabel>
                            <S.AgreeLabel>
                                <S.AgreeCheckbox type="checkbox" checked={isChecked.marketing} onChange={()=>handleEachChecked('marketing')} />개인정보 마케팅 활용 동의
                                <S.Option>(선택)</S.Option>
                                <img src={right} />
                            </S.AgreeLabel>
                            <S.AgreeLabel>
                                <S.AgreeCheckbox type="checkbox" checked={isChecked.sms} onChange={()=>handleEachChecked('sms')} />이벤트, 쿠폰 및 SMS 등 수신
                                <S.Option>(선택)</S.Option>
                            </S.AgreeLabel>
                            {/* <CheckboxButton variant={"white"} shape={"round"} boxSize={"size"} checked={"isChecked"} onChange={"handleCheckedBoxChange"} checkColor={"checkColor"} />
                                만 14세 이상입니다. */}
                            
                            
                        </S.EachAgree>
                    </S.AgreeContainer>
                    <S.SignUpButton type="submit">회원가입하기</S.SignUpButton>
                    <S.ToLoginContainer>
                        <S.IsHaveId>이미 아이디가 있으신가요?</S.IsHaveId>
                        <S.ToLogin onClick={clickToLogin}>로그인하기</S.ToLogin>
                    </S.ToLoginContainer>
                </S.Wrapper>
            </S.Form>
            
        </div>
    );
};

export default SignUp;