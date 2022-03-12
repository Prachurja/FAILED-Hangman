import Gamemode from "../components/level-1/Gamemode"
import Dropdown from "../components/level-2/Dropdown"
import Button from "../components/level-4/Button"
import React from "react"

function Home() {
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
                play={<Dropdown title="Play" options={["Join Party", "Create Party"]} />}
                arrangeReverse={true}
            />
        </div>
    )
}

export default Home