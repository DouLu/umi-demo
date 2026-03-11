import React, { useState } from "react";
import { Link } from "umi";
import styles from "./index.less";
import { Button, message } from "antd";
import { useRequest } from "ahooks";

function changeUsername(username: string): Promise<{ success: boolean }> {
  console.log("us----", username);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true });
    }, 1000);
  });
}

export default () => {
  const [state, setState] = useState("umi");
  const { run } = useRequest(changeUsername, {
    manual: true,
    onSuccess: (result, params) => {
      if (result.success) {
        setState("ahooks");
        message.success(`The username was changed to "${params[0]}" !`);
      }
    },
  });
  return (
    <div>
      index page {state}
      <Button
        onClick={() => {
          run(state);
        }}
      >
        change name
      </Button>
      <div className={styles.button}>
        <Link to={"/user"}>go user page</Link>
      </div>
    </div>
  );
};
