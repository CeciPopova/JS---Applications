export const albumIsInvalid = (albumData) => {
    const requiredField = [
        'name',
        'imgUrl',
        'price',
        'releaseDate',
        'artist',
        'genre',
        'description'
    ]

    return requiredField.some(x => !albumData[x])
}