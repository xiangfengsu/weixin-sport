import request from '@/core/utils/request';


export async function queryScoreTop(params) {
  return request('/wx/scoretop', {
    method: 'post',
    data: params,
  });
}

export async function queryScorepgrTop(params) {
  return request('/wx/scorepgrtop', {
    method: 'post',
    data: params,
  });
}
