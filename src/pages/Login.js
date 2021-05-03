import React, { useEffect, useState } from "react";
import styled from "styled-components";

import loginlogo from "media/image/login_logo.png";
import kakaoicon from "media/svg/kakao_symbol.svg";

import { emailCheck, pwdCheck } from "../shared/common";

const Login = () => {
  const [email, setEmail] = React.useState("");
  const [pwd, setPwd] = React.useState("");
  const [line1, setLine1] = useState("1px solid #707070");
  const [line2, setLine2] = useState("1px solid #707070");

  useEffect(() => {
    if (!email) {
      setLine1("1px solid #707070");
      return;
    }
    if (emailCheck(email)) {
      setLine1("1px solid #2B61E1");
    } else {
      setLine1("1px solid #FF8080");
    }
  }, [email]);

  useEffect(() => {
    if (!pwd) {
      setLine2("1px solid #707070");
      return;
    }
    if (pwdCheck(pwd)) {
      setLine2("1px solid #2B61E1");
    } else {
      setLine2("1px solid #FF8080");
    }
  }, [pwd]);

  return (
    <React.Fragment>
      <Wrap>
        <Image />
        <LoginDiv>LOGIN</LoginDiv>
        <EmailInput
          line={line1}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          placeholder="E-mail"
        ></EmailInput>
        <PwdInput
          line={line2}
          placeholder="PASSWORD"
          type="password"
          onChange={(e) => {
            setPwd(e.target.value);
          }}
        ></PwdInput>
        <Button1>LOGIN</Button1>
        <Button2>
          <Kakao />
          카카오톡으로 로그인
        </Button2>
        <Text href="/signup">회원가입</Text>
        <Text>비밀번호 찾기</Text>
      </Wrap>
    </React.Fragment>
  );
};

export default Login;

const Wrap = styled.div`
  width: 22rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0px auto;
  font-family: "TTTogether";
`;

const Image = styled.div`
  background-image: url("${loginlogo}");
  background-size: 23rem 18.75rem;
  width: 23rem;
  height: 18.75rem;
`;

const LoginDiv = styled.div`
  display: flex;
  font-size: 1.625rem;
  width: 22rem;
  margin: 0px auto;
  margin-top: 3rem;
  margin-bottom: 3rem;
  justify-content: center;
`;

const EmailInput = styled.input`
  font-family: "TTTogether";
  outline: none;
  width: 21.4rem;
  height: 3rem;
  margin-bottom: 2rem;
  border: ${(props) => props.line};
  border-radius: 5px;
  box-shadow: 0px 3px 6px #00000029;
  padding-left: 1.5rem;
  padding-right: 1.5rem;

  ::placeholder {
    font-family: "TTTogether";
    font-size: 1rem;
    color: #535353;
    opacity: 50%;
  }
`;

const PwdInput = styled.input`
  font-family: "TTTogether";
  outline: none;
  width: 21.4rem;
  height: 3rem;
  margin-bottom: 2rem;
  border: ${(props) => props.line};
  border-radius: 5px;
  box-shadow: 0px 3px 6px #00000029;
  padding-left: 1.5rem;
  padding-right: 1.5rem;

  ::placeholder {
    font-family: "TTTogether";
    font-size: 1rem;
    color: #535353;
    opacity: 50%;
  }
`;

const Button1 = styled.button`
  font-family: "TTTogether";
  width: 24.5rem;
  height: 3rem;
  box-shadow: 0px 3px 6px #00000029;
  border-radius: 5px;
  margin-bottom: 2rem;
  background-color: #2b61e1;
  color: #ffffff;
`;

const Button2 = styled.button`
  font-family: "TTTogether";
  width: 24.5rem;
  height: 3rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 3px 6px #00000029;
  border-radius: 5px;
  margin-bottom: 2rem;
  background-color: #ffe600;
  font-size: 1rem;
  color: #2b1718;
`;

const Kakao = styled.div`
  display: flex;
  margin: 0px;
  background-image: url("${kakaoicon}");
  background-size: 21.51px 19.86px;
  width: 21.51px;
  height: 19.86px;
  margin-right: 1rem;
`;

const Text = styled.a`
  width: 24.5rem;
  text-decoration: none;
  font-family: "AppleSDGothicNeoR";
  color: #5a5a5a;
  font-size: 0.8rem;
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
`;
