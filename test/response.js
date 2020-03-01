const productObject = {
    "productId": "4d71bd14-cb7e-4b24-a858-8513b043e3fd",
    "modelNumber": "H7",
    "productName": "Cool Hat",
    "productDesc": "A cool hat",
    "productPrice": "37,00"
}

const postErrors = {
    "modelNumber": {"error": "\"modelNumber\" must be a string"},
    "productPrice": {"error": "\"productPrice\" must be a string"},
    "productDesc": {"error": "\"productDesc\" must be a string"},
    "productName": {"error": "\"productName\" must be a string"}
}

const productsArray = [
    {
        "modelNumber": "H7",
        "productPrice": "37,00",
        "productDesc": "A cool hat",
        "productId": "4d71bd14-cb7e-4b24-a858-8513b043e3fd",
        "productName": "Cool Hat"
    },
    {
        "modelNumber": "H3",
        "productPrice": "27,00",
        "productDesc": "A green hat",
        "productId": "ab6fbce2-2d54-44e5-b64f-d8adf3e899fe",
        "productName": "Green Hat"
    },
    {
        "modelNumber": "H9",
        "productPrice": "999",
        "productDesc": "Super cool hat",
        "productId": "187e1935-e376-444d-9378-f87ebe251993",
        "productName": "The Coolest Hat"
    },
    {
        "modelNumber": "H1",
        "productPrice": "28,00",
        "productDesc": "A blue hat",
        "productId": "37c675f4-d69d-4c5c-9a1e-8db471f4ebb3",
        "productName": "Blue Hat"
    },
    {
        "modelNumber": "H5",
        "productPrice": "35,00",
        "productDesc": "A yellow hat",
        "productId": "34b3bbaf-5455-44d5-9620-0c14a607ef38",
        "productName": "Yellow Hat"
    },
    {
        "modelNumber": "H4",
        "productPrice": "30,00",
        "productDesc": "A violet hat",
        "productId": "5d647ad4-c4b4-421b-b7de-d8ac19b7efe6",
        "productName": "Violet Hat"
    },
    {
        "modelNumber": "H10",
        "productPrice": "0",
        "productDesc": "Free hat!",
        "productId": "0a0b64ce-cc17-446e-bdd5-2d7d939249fb",
        "productName": "Free hat"
    }
]

module.exports = {productObject, productsArray, postErrors};