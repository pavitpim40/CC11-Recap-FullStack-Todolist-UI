`prerequisite`
- cd start
- npm install
- npm start

# STEP 0 : INSPECT PRIVATE ROUTE

- ตรวจสอบ code ในโฟลเดอร์ route.js 
- ลองเปลี่ยน condition ในการ render จาก true เป็น false
- สังเกตหน้า UI

```js
 <Routes>
      {true ? (
        <>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<Navigate to="/" />} />
        </>
      ) : (
        <>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </>
      )}
    </Routes>


```

# STEP 1 : SET UP REDUX

- `npm install react-redux @reduxjs/toolkit`
- สร้างโฟลเดอร์ stores ขึ้นมา
- สร้างไฟล์ index.js แล้วใส่ logic สำหรับ config store 
- export store 


```js
import { configureStore } from '@reduxjs/toolkit'; 

 
export const store = configureStore({}); 

```

- ทำให้ app รู้จัก store

```js 
import { Provider } from 'react-redux';
import { store } from './stores';

  <Provider store={store}>
    {/* <BrowserRouter>
      <App />
    </BrowserRouter> */}
  </Provider>

```

# STEP 2 : CREATE SLICE (AUTH SLICE)

- สร้างไฟล์ auth.js ในโฟลเดอร์ stores
- สร้าง slice ขึ้นมา

```js

import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {},
  reducers: {}
});




```
- กำหนดหน้าตาของ state

```js
 initialState: {
    isAuthenticated: false,
    user: null
  },
```
- เขียน reducer function

```js

reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
    },
    logout: state => {
      state.isAuthenticated = false;
    }
  }

// authSlice => { reducer: reducerFn, actions: { login: 'auth/login', logout: 'auth/logout' } }

``` 

- export ไปให้คนอื่นใช้

```js
export default authSlice.reducer;

export const { login, logout } = authSlice.actions;

```

# STEP 3 : UPDATE STORE (AUTH SLICE)

- เพิ่ม slice ใน stores

```js

import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth';


export const store = configureStore({
  reducer: {
    auth: authReducer,
  }
});


```

# STEP 4 : SELECT STATE

- กลับไปที่ route.js
- ใช้ useSelector ในการดึงค่า state จาก redux
- ใช้ isAuthenticated ควบคุม condition render 
- ลองปรับค่า initial state ใน auth แล้วสังเกต ui


```js
import { useSelector } from 'react-redux';
  
  function Router() {

   //const auth = useSelector(state => state.auth);
   const {isAuthenticated} = useSelector(state => state.auth); 
  //  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  return (
    <Routes>
      {isAuthenticated ? (
        <>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<Navigate to="/" />} />
        </>
      ) : (
        <>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </>
      )}
    </Routes>
  );
}


```

# STEP 5 : MANIPULATE STATE (ACTION --> DISPATCH --> REDUCER)


- ไปที่ไฟล์ src/components/auth/LoginForm.js
- comment code ส่วนที่เป็น axios ในฟังก์ชัน handleSubmit
- import useDispatch
- import login action มาใช้งาน

```js
import { useDispatch } from 'react-redux';
import { login } from '../../stores/auth';

// ใน function LoginForm

  const dispatch = useDispatch();

// ใน function handleSubmit
    dispatch(login());

```

- ใส่ username , password แล้วลอง login
- ทำ logout (ไฟล์อยู่ใน src/components/Header.js)


# STEP 6 : CONDITION RENDER NAVBAR