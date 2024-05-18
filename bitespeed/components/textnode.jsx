import { MessageSquareText } from "lucide-react";
import Image from "next/image";
import { Handle, Position } from "reactflow";

const TextNode = ({ data, selected }) => {
  return (
    <div
      className={`w-40  shadow-md rounded-md bg-white   ${
        selected ? "border-solid border-2 border-indigo-500/100" : ""
      } `}
    >
      <div className="flex flex-col">
        <div className=" flex flex-row gap-2 items-center max-h-max px-2 py-1 text-left text-black text-xs font-semibold rounded-t-md bg-teal-300">
        <MessageSquareText className="h-2 w-2"/>
           Send message
            <div className="relative w-4 h-4">
                <Image
                    src = "/whatsapp.webp"
                    fill
                    className='object-contain'
                    alt='whatsapp logo' 
                    />
            </div>
        </div>
        <div className="px-3 py-2 ">
          <div className="text-xs font-normal text-black">
            {data.text ?? "Text Node"}
          </div>
        </div>
      </div>

      <Handle
        id="a"
        type="target"
        position={Position.Left}
        className="w-1 rounded-full bg-slate-500"
      />
      <Handle
        id="b"
        type="source"
        position={Position.Right}
        className="w-1 rounded-full bg-gray-500"
      />
    </div>
  );
}

export default TextNode