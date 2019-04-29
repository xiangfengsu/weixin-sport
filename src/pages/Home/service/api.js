import request from '@/core/utils/request';

export async function queryUserInfo(params) {
  return request('/wx/home', {
    method: 'post',
    data: params,
  });
}
