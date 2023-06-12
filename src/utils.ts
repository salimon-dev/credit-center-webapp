import moment from "moment";

export function now() {
  return Math.ceil(Date.now() / 1000);
}

export function tsToDate(ts: number) {
  return moment(ts * 1000).format("YYYY/MM/DD HH:mm");
}
