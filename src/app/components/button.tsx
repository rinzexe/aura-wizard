import * as React from "react"
import { Slot } from "@radix-ui/react-slot"

export default function Button({ children, onClick }: any) {
    return (
        <button onClick={onClick!} className="bg-white w-fit h-fit rounded-md text-black px-3 py-2 font-bold hover:bg-white/80 duration-300">
            {children}
        </button>
    )
}

