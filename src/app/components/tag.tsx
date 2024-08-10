export default function Tag({ text, value }: any) {
    return(
        <div className="bg-neutral-700 w-fit h-fit px-5 flex justify-center items-center rounded-full">
            {text + " " + (value > 0 ? "+" + value : value)}
        </div>
    )
}