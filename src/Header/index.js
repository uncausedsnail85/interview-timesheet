import { FaRegCircleUser,} from "react-icons/fa6";

// Banner component to appear over all pages
// For now displays user
function Header() {
    return (<>
        <div className="d-flex flex-row-reverse">
            {/* user info */}
            <div className="justify-content-end">
                username <FaRegCircleUser />
            </div>
        </div>
    </>)
}

export default Header;