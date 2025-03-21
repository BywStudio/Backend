// 1. 导入 createBrowserRouter 
import { createBrowserRouter } from 'react-router-dom'

// 2. 导入路由级别组件
// import Home from '../page/Home/index.js'
import Login from '../page/Login/index.js'

// 3. 配置路由
const router = createBrowserRouter([
  // {
  //   path: '/',
  //   element: <Home />
  // },
  {
    path: '/login',
    element: <Login />
  }
])

// 4. 导出路由模块
export default router