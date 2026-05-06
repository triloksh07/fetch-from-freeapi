export async function fetchData(url, options = {}) {
  try {
    const response = await fetch(url, options);
    if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
    const json = await response.json();
    return {
      payload: json?.data?.data ?? json?.data ?? json,
      raw: json,
    };
  } catch (err) {
    console.error(`Error fetching ${url}:`, err);
    return { payload: null };
  }
}
