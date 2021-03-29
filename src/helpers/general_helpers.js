export const DOWNLOAD_STATE = {
  NEED_DOWNLOAD: 0,
  DOWNLOADING: 1,
  DOWNLOAD: 2,
  FAIL: 3,
};

export function openPage(page) {
  window.location.href = page;
}