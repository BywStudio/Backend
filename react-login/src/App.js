// import logo from './logo.svg';
import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }
import React from 'react'

// 标题
function FormTitle() {
  return <h3>User Login</h3>
}

// userId 输入框
function UserId() {
  const userId = (
    <p>
      <label>User Id(*): </label>
      <input type="text" placeholder="请输入 ID" />
    </p>
  )
  return userId
}

// username 输入框
function UserName() {
  const userName = (
    <p>
      <label>User Name: </label>
      <input type="text" placeholder="请输入用户名" />
    </p>
  )
  return userName
}

// password
function Password() {
  const passwd = (
    <p>
      <label>Password(*): </label>
      <input type="password" placeholder="请输入密码" />
    </p>
  )
  return passwd
}

// 提交按钮
function Submit() {
  const submit = (
    <p>
      <button>Login</button>
    </p>
  )
  return submit
}

class FormLogin extends React.Component {
  render() {
    return (
      <div id="id-form-login">
        <FormTitle />
        <UserId />
        <UserName />
        <Password />
        <Submit />
      </div>
    )
  }
}

const frmLogin = <FormLogin />

function App() {
  return(
    <div className="home">
      <div className="App-header">
      { frmLogin }
      </div>      
    </div>
  )
}

export default App