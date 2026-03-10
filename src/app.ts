import { history } from "umi";

export function render(oldRender: any) {
  //   fetch("/api/auth").then((auth) => {
  //     if (auth.isLogin) {
  //       oldRender();
  //     } else {
  //       history.push("/login");
  //       oldRender();
  //     }
  //   });
  oldRender();
}
