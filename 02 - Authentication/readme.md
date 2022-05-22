`prerequisite`
- cd start
- npm install
- npm start


# STEP 0 : INSPECT SERVICE & CONFIG
- ตรวจสอบไฟล์ใน src/services
- ตรวจสอบไฟล์ config.js


# STEP 1 : ASYNCHRONOUS HANDLE WITH THUNK FUNCTION

- ไฟที่ไฟล์ src/stores/auth
- เพิ่ม logic สำหรับ loginAsync

```js


import { setAccessToken } from '../services/localStorage'; 
import axios from '../config/axios'; 
 
export const loginAsync = (username, password) => async dispatch => { 
  const res = await axios.post('/users/login', { username, password }); 
  setAccessToken(res.data.token); 
  dispatch(login()); // { type: '', payload:  } 
}; 
 

```

- เปลี่ยนการ dispatch ใน loginForm เป็น loginAsync แทน
- ส่ง username password เป็น payload

```js
import { loginAsync } from "../../stores/auth";

 dispatch(loginAsync(username, password));
```

# STEP 2 : REWRITE LOGOUT

- เคลียร์ token เมื่อมีการ logout

```js
import { removeAccessToken, setAccessToken } from "../services/localStorage";

  logout: state => { 
      removeAccessToken(); 
      state.isAuthenticated = false; 
    } 

```


# STEP 3 : IMPROVE UX WITH INIT USER

- เพิ่ม logic ในการเช็ค user

```js
export const initUser = () => async dispatch => { 
  try { 
    const res = await axios.get('/users'); 
    dispatch(login({ user: res.data.user })); 
  } catch (err) { 
    console.dir(err); 
    // dispatch(logout()); 
  } 
}; 
 

```


```js
state.user = action.payload?.user || null; 

```
- เรียกใช้ใน app.js
```js
import { useEffect } from "react";
import { useDispatch } from "react-redux";

// import Header from "./components/layout/Header";
// import Router from "./route/Router";

import { initUser } from "./stores/auth";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("test");
    dispatch(initUser());
  }, []);
//   return (
//     <>
//       <Header />
//       <div className="container max-w-xs pt-5">
//         <Router />
//       </div>
//     </>
//   );
}

export default App;


```