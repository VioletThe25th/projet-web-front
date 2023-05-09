export interface Rooms {
    devices: [Devices],
    name: string,
    id: string,
    date: Date,
    owner: string
}
export interface Devices {
  name: string,
  type: string,
  id: string,
  isOn: boolean
}