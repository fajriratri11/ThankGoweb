export async function getWeddingData(slug: string) {
  try {
    const data = await import(`@/data/${slug}.json`);
    return data;
  } catch (err) {
    return null; // kalau file JSON ga ada
  }
}
