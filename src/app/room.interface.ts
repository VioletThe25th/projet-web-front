export interface Rooms {
    devices: [Devices],
    name: string,
    id: string,
    date: Date
}
export interface Devices {
  name: string,
  type: string,
  id: string
}