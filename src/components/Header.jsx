import person from "../assets/images/person.png"

function Header(){

 return(
    <div className="flex flex-row justify-between align-middle px-7 pt-7">
        <div className="flex flex-col justify-center">
            <div className="text-gray-500 text-sm">Welcome, John!</div>
            <div className="text-purple-950 font-extrabold text-3xl">Smart Notes</div>
        </div>
        <div 
        style={{backgroundImage: `url(${person})`}} 
        className="bg-cover bg-center h-15 w-15 rounded-2xl"
        ></div>
    </div>
 )
}
export default Header;