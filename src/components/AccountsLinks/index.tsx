import Link from "next/link"

const AccountsLinks = () => {
    return (
        <div>
            <Link href='/auth/login' className="button-secondary">Log in</Link>
        </div>
    )
}

export default AccountsLinks;