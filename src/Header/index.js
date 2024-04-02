import { FaRegCircleUser,} from "react-icons/fa6";

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