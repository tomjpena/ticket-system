import { useSelector } from "react-redux"

const NoteItem = ({note}) => {

  const {user} = useSelector((state) => state.auth)

  return (
    <div className="my-5 rounded-md border border-neutral-content text-md py-3 px-4" style={{
      backgroundColor: note.isStaff ? '#000000' : '#FFFFFF',
      color: note.isStaff ? '#FFFFFF' : '#000000'
    }}>
      <h4>Note from {note.isStaff ? <span>Staff</span> : <span>{user.name}</span>}</h4>
      <p>{note.text}</p>
      <div className="note-date">
        {new Date(note.createdAt).toLocaleString('en-us')}
      </div>
    </div>
  )
}
export default NoteItem