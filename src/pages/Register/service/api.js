import request from '@/core/utils/request';

export async function registerHandle(params) {
  return request('/wx/register', {
    method: 'post',
    data: params,
  });
}

export async function updatePasswordHandle(params) {
  return request('/wx/changepwd', {
    method: 'post',
    data: params,
  });
}

