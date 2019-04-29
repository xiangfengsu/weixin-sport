import request from '@/core/utils/request';

export async function queryApplyList(params) {
  return request('/wx/decsearch', {
    method: 'post',
    data: params,
  });
}
export async function delHandle(params) {
  return request('/wx/deldeclare', {
    method: 'post',
    data: params,
  });
}

export async function checkHandle(params) {
  return request('/wx/approvedec', {
    method: 'post',
    data: params,
  });
}

export async function queryApplyItemInfo(params) {
  return request('/wx/getdeclare', {
    method: 'post',
    data: params,
  });
}

