export async function saveToAirtable(data) {
  const response = await fetch(`https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/Transactions`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      fields: data,
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to save to Airtable');
  }

  return response.json();
}