import { format } from "date-fns";

function Note({title, note,date }) {
    
    return (
        <div className="flex flex-col justify-between align-middle mb-4 bg-white rounded-xl p-5 shadow-sm border border-gray-100">
            <div className="text-purple-950 font-bold sm:text-2xl md:text-xl">{title}</div> 
            <div className="line-clamp-3 mt-2 text-gray-500 text-sm">
                {note}
            </div> 
            <div className="text-gray-400 text-xs font-bold mt-3 text-right">{format(new Date(date),"yyyy-MM-dd HH:mm")}</div>
        </div>
    );
}

export default Note