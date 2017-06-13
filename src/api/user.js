import fetch from 'utils/fetch';

// 用户增删改查API
export function listfetch(query) {
    return fetch({
        url: '/users',
        method: 'get',
        params: query
    });
}

export function userfetch() {
    return fetch({
        url: '/user',
        method: 'get'
    });
}

