import moment from "moment";

export function now() {
  return Math.ceil(Date.now() / 1000);
}

export function tsToDate(ts: number) {
  return moment(ts * 1000).format("YYYY/MM/DD HH:mm");
}

export function getTOTP(secret: string) {
  const time = Math.ceil(now() / 30);
  const passed = now() % 30;
  let number = 1;
  for (let i = 0; i < secret.length; i++) {
    number *= secret.charCodeAt(i);
  }
  number *= time;
  number = number % 1000000;
  if (number < 100000) {
    number += 100000;
  }
  return { token: number, remaining: 30 - passed };
}
