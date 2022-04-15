import Entry from "../level-2/Entry"
// import Profile from "../level-2/Profile"

function Header() {
    return (
        <header className="grid grid-rows-1 grid-cols-2 justify-between">
            <h1 className="font-bold text-4xl cursor-pointer">Hangman</h1>
            <Entry />
        </header>
    )
}

export default Header