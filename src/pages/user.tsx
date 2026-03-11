import { Button } from "antd";
import { useModel } from "umi";

export default () => {
  const { user, fetchUser } = useModel(
    "user",
    (model: { user: string; fetchUser: Function }) => ({
      user: model.user,
      fetchUser: model.fetchUser,
    }),
  );
  const { add, minus } = useModel("counterModel", (model) => ({
    add: model.increment,
    minus: model.decrement,
  }));
  return (
    <div>
      user page
      <Button onClick={() => fetchUser()}>hello {user}</Button>
      <Button onClick={add}>add by 1</Button>
      <Button onClick={minus}>minus by 1</Button>
    </div>
  );
};
