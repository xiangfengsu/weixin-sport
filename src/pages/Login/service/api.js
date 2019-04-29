import request from '@/core/utils/request';

export async function checkLoginIn(params) {
  return request('/wx/login', {
    method: 'post',
    data: params,
  });
}

// export async function queryRecommendCarList() {
//   return request('/api/search/queryRecommendCarList');
// }

