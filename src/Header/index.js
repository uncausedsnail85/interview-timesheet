import { FaRegCircleUser, } from "react-icons/fa6";

// Banner component to appear over all pages
// For now displays user
function Header() {
    return (<div className="m-3 bg-success-subtle">
        <h3 className="">Your Timesheets </h3>
        <div className="d-flex flex-row-reverse">

            {/* user info */}
            {/* <div className="justify-content-end">
                username <FaRegCircleUser />
            </div> */}
        </div>
    </div>)
}

export default Header;