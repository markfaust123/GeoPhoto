export type Place = {
    id: string,
    title: string,
    imageUri: string,
    address: string,
    location: Location,
}

export type Location = {
    latitude: number,
    longitude: number,
}