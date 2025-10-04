import { getBindings } from "@/lib/cf";

export async function putObject(key: string, value: string | ArrayBuffer) {
  const { BUCKET } = getBindings();
  await BUCKET.put(key, value);
}

export async function getObjectText(key: string) {
  const { BUCKET } = getBindings();
  const object = await BUCKET.get(key);
  if (!object) return null;
  return await object.text();
}
