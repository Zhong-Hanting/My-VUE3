import { Get, Post , Delete} from './http';
// 登录
export const apiLogin= (param) => Post(`login`, param)