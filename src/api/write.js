import request from "@/utils/request";

// 新增

export function articreInsert(query) {
  return request({
    url: "/article/add",
    method: "post",
    data: query,
  });
}

// 删除

export function remove(query) {
  return request({
    url: "/article/delete",
    method: "get",
    params: query,
  });
}

// 修改

export function update(query) {
  return request({
    url: "/article/update",
    method: "post",
    data: query,
  });
}

// 详情

export function detail(query) {
  return request({
    url: "/article/detail",
    method: "get",
    params: query,
  });
}
