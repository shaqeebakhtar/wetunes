export const addTrack = async ({
  url,
  roomId,
}: {
  url: string;
  roomId: string;
}) => {
  const res = await fetch(`/api/rooms/${roomId}/tracks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      url,
    }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error);
  }

  return data.track;
};

export const getTracksByRoomId = async ({ roomId }: { roomId: string }) => {
  const res = await fetch(`/api/rooms/${roomId}/tracks`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error);
  }

  return data.tracks;
};
