/**
 * Created by mapbar_front on 2020/1/3.
 */
import request from '@/utils/request'

export function demandSave(data) {
    return request({
        url: 'market/demand/save',
        method: 'post',
        data,
    })
}

export function getTags(data) {
    return request({
        url: '/market/robotMarket/getTag',
        method: 'post',
        params: data,
    })
}
