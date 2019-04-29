import request from '@/core/utils/request';


export async function querySchools(params) {
  return request('/wx/getschools', {
    method: 'post',
    data: params,
  });
}

export async function queryGrades(params) {
  return request('/wx/getgrades', {
    method: 'post',
    data: params,
  });
}

export async function queryClasses(params) {
  return request('/wx/getclasses', {
    method: 'post',
    data: params,
  });
}
