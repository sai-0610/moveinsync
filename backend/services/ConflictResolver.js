module.exports = {
  detectConflict(localData, serverData) {
    // If seat IDs match but coordinates/room mismatch → conflict
    return localData.some((localSeat) => {
      const match = serverData.find((s) => s.seatId === localSeat.seatId);

      if (!match) return false;

      return (
        match.x !== localSeat.x ||
        match.y !== localSeat.y ||
        match.room !== localSeat.room
      );
    });
  },

  resolve(localData, serverData, strategy = "server") {
    if (strategy === "local") return localData;
    return serverData;
  },
};
