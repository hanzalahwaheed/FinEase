import { useRecoilValue } from "recoil";
import userState from "../store/index.js";

const Appbar = () => {
  const user = useRecoilValue(userState);
  console.log(user);
  return (
    <div className="shadow h-14 flex justify-between">
      <div className="flex flex-col justify-center h-full ml-4 font-extrabold text-xl">
        FinEase
      </div>
      <div className="flex">
        <div className="flex flex-col justify-center h-full mr-4">
          Hello {user}
        </div>
        <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
          <div className="flex flex-col justify-center h-full text-xl">
            {user[0]}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Appbar;
