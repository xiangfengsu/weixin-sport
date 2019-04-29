import request from '@/core/utils/request';

export async function declareHandle(params) {
  return request('/wx/declare', {
    method: 'post',
    data: params,
  });
}

export async function getPartnerHandle(params) {
  return request('/wx/getpartner', {
    method: 'post',
    data: params,
  });
}

export async function queryPartnerHandle(params) {
  return request('/wx/getpartnerbyname', {
    method: 'post',
    data: params,
  });
}
