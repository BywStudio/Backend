# Simple_Server

[TOC]



## 路由总览

| 地址           | 说明                   | 表单数据                                                     | 是否需要认证 |
| -------------- | ---------------------- | ------------------------------------------------------------ | ------------ |
| /user/register | 用户注册路由、POST     | phone、username、password                                    | 否           |
| /user/login    | 用户登录路由、POST     | phone、password，登录时需要携带 Token 字符串                 | 否           |
| /my/userinfo   | 获取用户基本信息、GET  | 从 Token 字符串解析出 req.user.id 查找用户信息               | 是           |
| /my/userinfo   | 更新用户基本信息、POST | id(根据登录之后 req.user.id 查找用户)、username(允许)、phone(允许)、email(允许)、intro(允许) |              |
|                |                        |                                                              |              |
|                |                        |                                                              |              |
|                |                        |                                                              |              |
|                |                        |                                                              |              |
|                |                        |                                                              |              |

