import { createSlice } from "@reduxjs/toolkit";
import { config } from "./config";

const profileimgSlice = createSlice({
  name: "profile",
  initialState: {
    user_img: "",
    memberGrade: null,
    nickname: null,
    trils_data: [],
    trilog_data: [],
  },
  reducers: {
    SET_PREVIEW: (state, action) => {
      state.user_img = action.payload;
    },
    GET_PROFILE: (state, action) => {
      state.user_img = action.payload.user_img;
      state.memberGrade = action.payload.memberGrade;
      state.nickname = action.payload.nickname;
    },
    UPDATE_PROFILE: (state, action) => {
      state.uploading = action.payload;
    },
    TRILS_LOAD: (state, action) => {
      state.trils_data = action.payload;
    },
    TRILOG_LOAD: (state, action) => {
      state.trilog_data = action.payload;
    },
  },
});

// 프로필 조회
const getProfile = () => {
  return function (dispatch, getState, { history }) {
    const API = `${config}/member/profile`;
    let access_token = localStorage.getItem("access_token");

    if (!access_token) {
      console.log("토큰 없음");
      return;
    }

    fetch(API, {
      method: "GET",

      // 헤더에 토큰 담아 보내기
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `${access_token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        dispatch(
          GET_PROFILE({
            user_img: data.results.profileImgUrl,
            memberGrade: data.results.memberGrade,
            nickname: data.results.nickname,
          })
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

// 프로필 수정
const updateProfile = (nickname, newpwd, newpwdcheck, img) => {
  return function (dispatch, getState, { history }) {
    const API = `${config}/member/profile`;
    let access_token = localStorage.getItem("access_token");

    if (!access_token) {
      console.log("토큰 없음");
      return;
    }

    fetch(API, {
      method: "POST",

      // 헤더에 토큰 담아 보내기
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `${access_token}`,
      },
      body: JSON.stringify({
        nickname: nickname,
        newPassword: newpwd,
        newPasswordCheck: newpwdcheck,
        profileImgUrl: img,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        alert("수정되었습니다!");
        history.replace("/");
        history.go(0); // 메인 페이지로 돌아간 후 새로고침
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

// 내가 쓴 Trils 조회
const myTrilsLoad = () => {
  return function (dispatch, getState, { history }) {
    let access_token = localStorage.getItem("access_token");
    const API = `${config}/api/posts/member`;

    fetch(API, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `${access_token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        const results = data.results;
        dispatch(TRILS_LOAD(results));
      });
  };
};

// 내가 쓴 Trilog 조회
const myTrilogLoad = () => {
  return function (dispatch, getState, { history }) {
    let access_token = localStorage.getItem("access_token");
    const API = `${config}/api/boards/member`;

    fetch(API, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `${access_token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        const results = data.results;
        dispatch(TRILOG_LOAD(results));
      });
  };
};

export const {
  SET_PREVIEW,
  GET_PROFILE,
  UPDATE_PROFILE,
  TRILS_LOAD,
  TRILOG_LOAD,
} = profileimgSlice.actions;

export const actionCreators = {
  getProfile,
  updateProfile,
  myTrilsLoad,
  myTrilogLoad,
};

export default profileimgSlice.reducer;
