import Entry from "../simple/Entry"
import { useAuth } from "../core/AuthContext"
import Profile from "../simple/Profile"

function Header() {
    return (
        <header className="grid grid-rows-1 grid-cols-2 justify-between">
            <h1 className="font-bold text-4xl cursor-pointer">Hangman</h1>
            { useAuth().authenticated ? <Profile /> : <Entry /> }
        </header>
    )
}

export default Header