import AccountsLinks from "../AccountsLinks";
import Logo from "../Logo";
import Search from "../Search";

const Header = () => {
    return (
        <>
            <header className="hidden md:flex justify-between items-center">
                <Logo />
                <Search />
                <AccountsLinks />
            </header>

            <header className="md:hidden flex flex-col justify-between items-center">
                <div className="flex items-center justify-center">
                    <AccountsLinks>
                        <Logo />
                    </AccountsLinks>
                </div>
                <Search />
            </header>
            <div className="w-full md:w-[80%] background-gold py-2 m-auto mt-7 rounded rounded-t-full"></div>
        </>
    )
}

export default Header;      