import { MessageSquareText } from "lucide-react";

const Sidebar = ({
    nodeText,
    setNodeText,
    selectedNode,
    setSelectedElements,
  }) => {
    const handleInputChange = (event) => {
        setNodeText(event.target.value);
      };

        const onDragStart = (event, nodeType) => {
        event.dataTransfer.setData("application/reactflow", nodeType);
        event.dataTransfer.effectAllowed = "move";
      };
    
      return (
        <div className="w-[15vw] border-solid border-l-blue-700 border-l-2 p-4 text-sm bg-white text-blue-700">
          {selectedNode ? (
            <div>
              <h3 className="text-xl mb-2">Update Node</h3>
                <div>
                  <label className="block mb-2 text-sm font-medium">Node Text:</label>
                  <input
                    type="text"
                    className="block w-full pt-2 px-3 pb-3 text-blue-700 border border-blue-700 rounded-lg bg-white focus:outline-none focus:border-gray-500"
                    value={nodeText}
                    onChange={handleInputChange}
                    autoFocus
                  />
                </div>
              <button
                className="mt-4 bg-gray-500 text-white rounded p-2 hover:bg-gray-600"
                onClick={() => setSelectedElements([])}
              >
                Go Back
              </button>
            </div>
          ) : (
            <>
              <h3 className="text-xl mb-4 text-blue-700">Nodes Panel</h3>
              <div
                className="bg-white p-3 border-solid border-2 border-blue-700 rounded cursor-move flex flex-col justify-center items-center text-blue-700"
                onDragStart={(event) => onDragStart(event, "textnode")}
                draggable
              >
                <MessageSquareText/>
                Message
              </div>
            </>
          )}
        </div>
      );
  
}

export default Sidebar