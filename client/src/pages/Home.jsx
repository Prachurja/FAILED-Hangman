import Gamemode from "../components/home/Gamemode"
import Dropdown from "../components/form/Dropdown"
import Button from "../components/form/Button"
import React from "react"
import { useAuth, useSignupOpen } from "../components/general/Context"
import { openCreateParty } from "../components/home/CreateParty"

export default function Home() {
    const [authenticated] = useAuth().authenticatedState
    const signupOpenState = useSignupOpen()

    return (
        <div className="grid grid-flow-row grid-cols-1 auto-rows-fr md:grid-flow-col md:grid-cols-2 lg:px-10 py-10 gap-10">
            <Gamemode
                title="Singleplayer"
                description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis ab eveniet, distinctio perferendis laborum nesciunt reprehenderit dignissimos illum perspiciatis aliquam veniam totam quas maxime odit non in similique dolor consequuntur, nulla natus! Id, modi fugiat ratione doloribus porro at iure culpa hic natus eaque maxime. Dolorem nisi sit atque facilis."
                play={<Button>Play</Button>}
            />
            <Gamemode
                title="Multiplayer"
                description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis ab eveniet, distinctio perferendis laborum nesciunt reprehenderit dignissimos illum perspiciatis aliquam veniam totam quas maxime odit non in similique dolor consequuntur, nulla natus! Id, modi fugiat ratione doloribus porro at iure culpa hic natus eaque maxime. Dolorem nisi sit atque facilis."
                play={<Dropdown select={true} title="Play" options={[{title: "Join Party"}, {title: "Create Party", onClick: authenticated ? openCreateParty : (() => signupOpenState[1](true))}]} />}
                arrangeReverse={true}
            />
        </div>
    )
}