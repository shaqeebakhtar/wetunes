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

export const voteTrack = async ({
  roomId,
  trackId,
  isVoted,
}: {
  roomId: string;
  trackId: string;
  isVoted: boolean;
}) => {
  const method = isVoted ? 'DELETE' : 'POST';
  const res = await fetch(`/api/rooms/${roomId}/tracks/${trackId}/vote`, {
    method,
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

export const playNextTrack = async ({
  roomId,
  trackId,
}: {
  roomId: string;
  trackId: string;
}) => {
  const res = await fetch(
    `/api/rooms/${roomId}/tracks/next?currTrack=${trackId}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error);
  }

  return data.tracks;
};
