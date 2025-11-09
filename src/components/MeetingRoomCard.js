export default function MeetingRoomCard({ room, onSelect }) {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: 15,
        margin: 10,
        borderRadius: 8,
      }}
    >
      <h4>{room.name}</h4>
      <p>Capacity: {room.capacity}</p>
      <p>Floor: {room.floor}</p>

      <button onClick={() => onSelect(room)}>Select Room</button>
    </div>
  );
}
