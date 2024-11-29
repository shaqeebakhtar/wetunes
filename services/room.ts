export const createRoom = async ({ name }: { name: string }) => {
  const res = await fetch('/api/rooms', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name,
    }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error);
  }

  return data;
};

export const getRoomById = async ({ id }: { id: string }) => {
  const res = await fetch(`/api/rooms/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error);
  }

  return data.room;
};
