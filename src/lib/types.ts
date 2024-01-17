export type Place = {
    id: string,
    title: string,
    imageUri: string,
    address: string,
    location: Location,
}

type Location = {
    lat: number,
    long: number,
}