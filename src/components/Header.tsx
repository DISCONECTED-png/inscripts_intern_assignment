import { FaChevronRight } from "react-icons/fa";

const Header = () => {
  return (
    <section className="h-[8%]  border-none w-full flex justify-between p-1 text-[14px] border">
      {/* Left section: Path & Icons */}
      <div className="left-sect flex items-center gap-1 text-[#AFAFAF] font-medium">
        <button className="border-none">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M18.75 4C20.5449 4 22 5.45507 22 7.25V16.75C22 18.5449 20.5449 20 18.75 20H5.25C3.45507 20 2 18.5449 2 16.75V7.25C2 5.45507 3.45507 4 5.25 4H18.75ZM5.25 5.5C4.2835 5.5 3.5 6.2835 3.5 7.25V16.75C3.5 17.7165 4.2835 18.5 5.25 18.5H14.5V5.5H5.25Z" fill="#618666"/>
</svg>

        </button>
        <a className="text-[16px] font-normal">Workspace</a>
        <div className="icon">
          <FaChevronRight className="text-[#AFAFAF] text-[13px]" />
        </div>
        <a className="text-[16px] font-normal">Folder 2</a>
        <div className="icon">
          <FaChevronRight className="text-[#AFAFAF] text-[13px]" />
        </div>
        <a className="text-black text-[16px] font-normal">Spreadsheet 3</a>
        <div className="icon">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6.45832 10C6.45832 10.8054 5.80541 11.4583 4.99999 11.4583C4.19457 11.4583 3.54166 10.8054 3.54166 10C3.54166 9.19459 4.19457 8.54167 4.99999 8.54167C5.80541 8.54167 6.45832 9.19459 6.45832 10ZM11.4583 10C11.4583 10.8054 10.8054 11.4583 9.99999 11.4583C9.19457 11.4583 8.54166 10.8054 8.54166 10C8.54166 9.19459 9.19457 8.54167 9.99999 8.54167C10.8054 8.54167 11.4583 9.19459 11.4583 10ZM15 11.4583C15.8054 11.4583 16.4583 10.8054 16.4583 10C16.4583 9.19459 15.8054 8.54167 15 8.54167C14.1946 8.54167 13.5417 9.19459 13.5417 10C13.5417 10.8054 14.1946 11.4583 15 11.4583Z" fill="#AFAFAF"/>
</svg>

        </div>
      </div>

      {/* Right section: Search + Bell + Profile */}
      <div className="right-sect flex items-center gap-2">
        <div className="input-box flex items-center gap-1 bg-[#e8e7e7] px-3 py-2">
          <div className="icon">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M13.4732 13.4733C13.2132 13.7333 12.7866 13.7333 12.5266 13.4733L10.3666 11.3067C10.7132 11.0267 11.0266 10.7133 11.3066 10.3667L13.4732 12.5267C13.7332 12.7867 13.7332 13.2133 13.4732 13.4733Z" fill="#AFAFAF"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M6.50004 11.3333C9.16942 11.3333 11.3334 9.16938 11.3334 6.5C11.3334 3.83062 9.16942 1.66667 6.50004 1.66667C3.83066 1.66667 1.66671 3.83062 1.66671 6.5C1.66671 9.16938 3.83066 11.3333 6.50004 11.3333ZM6.50004 12.6667C9.9058 12.6667 12.6667 9.90576 12.6667 6.5C12.6667 3.09424 9.9058 0.333334 6.50004 0.333334C3.09428 0.333334 0.333374 3.09424 0.333374 6.5C0.333374 9.90576 3.09428 12.6667 6.50004 12.6667Z" fill="#AFAFAF"/>
</svg>

          </div>
          <input
            placeholder="Search within sheet"
            className="bg-[#e8e7e7] outline-none text-[13px]"
            type="text"
          />
        </div>
        <div className="icon">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12 1.99622C16.0499 1.99622 19.3567 5.19097 19.4958 9.24528L19.5 9.49622V13.5932L20.88 16.7492C20.949 16.9071 20.9847 17.0776 20.9847 17.25C20.9847 17.9404 20.425 18.5 19.7347 18.5L15 18.5015C15 20.1583 13.6568 21.5015 12 21.5015C10.4023 21.5015 9.09633 20.2526 9.00508 18.6778L8.99954 18.4992L4.27485 18.5C4.10351 18.5 3.93401 18.4648 3.77685 18.3965C3.14365 18.1215 2.8533 17.3852 3.12834 16.752L4.49999 13.5941V9.49612C4.50059 5.34132 7.85208 1.99622 12 1.99622ZM13.4995 18.4992L10.5 18.5015C10.5 19.3299 11.1716 20.0015 12 20.0015C12.7797 20.0015 13.4204 19.4066 13.4931 18.646L13.4995 18.4992ZM12 3.49622C8.67983 3.49622 6.00047 6.17048 5.99999 9.49622V13.9059L4.65601 17H19.3525L18 13.9068L18.0001 9.50908L17.9964 9.28388C17.8853 6.0504 15.2416 3.49622 12 3.49622Z" fill="#121212"/>
</svg>

        </div>
        <div className="profile pl-2 pr-2 w-30 h-8">
          <img
            src="https://spreadsheet-react-prashant.netlify.app/Profile_block.png"
            alt="Profile"
            className="w-full h-full object-cover rounded-full"
          />
        </div>
      </div>
    </section>
  );
};

export default Header;
