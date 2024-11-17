import { chatActiveIcon, homeActiveIcon, userActiveIcon } from "../../assets/assets";

const TeacherNavBar = () => {
  return (
    <>
      <div className="py-4 px-[42px] flex justify-between shadow-navShadow">
        <img src={homeActiveIcon} alt="" className="cursor-pointer" />
        <img src={userActiveIcon} alt="" className="cursor-pointer" />
        <img src={chatActiveIcon} alt="" className="cursor-pointer" />
        <div className="w-7 h-7 rounded-full bg-slate-100" />
      </div>
    </>
  );
}
export default TeacherNavBar