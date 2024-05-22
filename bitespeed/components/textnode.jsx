import { MessageSquareText, Trash2 } from "lucide-react";
import Image from "next/image";
import { Handle, Position, useNodeId } from "reactflow";

const TextNode = ({ data, selected}) => {
    const id = useNodeId();
  return (
    <>
    <div
      className={`w-45  shadow-md rounded-md bg-white   ${
        selected ? "border-solid border-2 border-indigo-500/100" : ""
      } `}
    >
      <div className="flex flex-col">
        <div className=" flex flex-row gap-1 items-center max-h-max px-2 py-1 text-left text-black font-bold rounded-t-md bg-teal-300">
        <MessageSquareText className="h-2 w-2"/>
           <div className="text-[8px]">Send Message</div>
            <div className="relative w-3 h-3 ml-6 bg-white rounded-full">
                <Image
                    src = "/whatsapp.webp"
                    fill
                    className='object-contain'
                    alt='whatsapp logo' 
                    />
            </div>
        </div>
        <div className="px-3 py-1 ">
          <div className="text-[8px] text-left font-normal text-black">
            {data.text}
          </div>
        </div>
      </div>

      <Handle
        id="a"
        type="target"
        position={Position.Left}
        className="w-[2px] rounded-full bg-slate-500"
      />
      <Handle
        id= {`b_${id}`}
        type="source"
        position={Position.Right}
        className="w-[2px] rounded-full bg-gray-500"
      />
    </div>
    </>
  );
}

export default TextNode
