'use client'
import { LogOut } from "@/actions/log-out";
import { DoorOpenIcon } from "lucide-react";

const LogOutButton = () => {
    const handleSignOut = () => {
        LogOut();
    }
    return (
    <>
        <div className="hidden md:block">
            <button className="button-secondary" onClick={handleSignOut}>Log out</button>
        </div>
        <div className="block md:hidden" onClick={handleSignOut}><DoorOpenIcon size={40}/></div>
    </>
    )
}

export default LogOutButton;