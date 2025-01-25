import { DanceClassProp } from "../types/danceClassTypes";
import Button from "./Button";
import { useState } from "react";

const DanceClass = ({ name, id }: DanceClassProp) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(name);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleDelete = () => {
    console.log(`Deleting class with id: ${id}`);
  };

  const handleSave = () => {
    console.log(`Editing class with id: ${id}`);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedName(name);
    setIsEditing(false);
  };

  return (
    <div className="flex items-center justify-between p-4 border-b border-third  hover:bg-third/10 transition-colors duration-300 cursor-pointer">
      {isEditing ? (
        <input 
          type="text" 
          value={editedName} 
          placeholder={name} 
          onChange={(e) => setEditedName(e.target.value)}
          className="border rounded px-2 py-1 mr-2 flex-grow text-black"
        />
      ) : (
        <span>{name}</span>
      )}
      
      <div className="space-x-2">
        {isEditing ? (
          <>
            <Button 
              variant="primary" 
              onClick={handleSave}
            >
              Save
            </Button>
            <Button 
              variant="secondary" 
              onClick={handleCancel}
            >
              Cancel
            </Button>
          </>
        ) : (
          <>
            <Button 
              variant="primary" 
              onClick={handleEdit}
            >
              Edit
            </Button>
            <Button 
              variant="secondary" 
              onClick={handleDelete}
            >
              Delete
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default DanceClass;
