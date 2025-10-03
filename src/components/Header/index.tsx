import AccountsLinks from "../AccountsLinks";
import Logo from "../Logo";
import Search from "../Search";

const Header = () => {
    return (
        <>
            <header className="flex justify-between items-center">
                <Logo />
                <Search />
                <AccountsLinks />
                {/* <button className="button-tertiary">TEst</button> */}
            </header>
            <div className="w-[80%] background-gold py-2 m-auto mt-7 rounded rounded-b-full"></div>
        </> 
    )
}

export default Header;