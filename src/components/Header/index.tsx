import AccountsLinks from "../AccountsLinks";
import Logo from "../Logo";

const Header = () => {
    return (
        <>
            <header className="flex justify-between items-center">
                <Logo />
                <AccountsLinks />
                <button className="button-tertiary">TEst</button>
            </header>
            <div className="w-[80%] bg-black py-1 m-auto"></div>
        </>
    )
}

export default Header;