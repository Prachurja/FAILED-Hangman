import Entry from "../auth/Entry"
import { useAuth } from "../contexts/AuthContext"
import Profile from "../auth/Profile"

export default function Header() {
    return (
        <header className="grid grid-rows-1 grid-cols-2 justify-between">
            <h1 className="font-bold text-4xl cursor-pointer">Hangman</h1>
            { useAuth().authenticatedState[0] ? <Profile /> : <Entry /> }
        </header>
    )
}