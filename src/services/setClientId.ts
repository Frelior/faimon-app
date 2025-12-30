export function setClientId<T extends { client_id?: string | null }>(obj: T): T {
  return {
    ...obj,
    client_id: obj.client_id ?? crypto.randomUUID(),
  }
}
