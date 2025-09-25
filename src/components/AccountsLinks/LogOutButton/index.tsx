'use client'
import { LogOut } from "@/actions/log-out";

const LogOutButton = () => {
    const handleSignOut = () => {
        LogOut();
    }
    return (
        <button className="button-secondary" onClick={handleSignOut}>Log out</button>
    )
}

export default LogOutButton;