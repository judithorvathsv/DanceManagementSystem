import { DanceClassProp } from "../types/danceClassTypes";

const DanceClass = ({name, id}: DanceClassProp) => {
  return (
    <div>
      {name}
      {id}
    </div>
  )
}

export default DanceClass
