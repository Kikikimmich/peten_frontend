import request from "@/utils/request";

// 获取凭证

export function getToken(query) {
  return request({
    url: "/token",
    method: "get",
    params: query,
  });
}

// 上传

export function upload(query) {
  return request({
    url: "https://upload-z0.qiniup.com/",
    method: "post",
    headers: { "Content-Type": "multipart/form-data" },
    data: query,
  });
}

// 上传

export function realUpload(query) {
  return request({
    // 暂时不可用
    // url: "/file/upload-image-v2",
    url: "/file/upload-image",
    method: "post",
    headers: { "Content-Type": "multipart/form-data" },
    data: query,
  });
}
