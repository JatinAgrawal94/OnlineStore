const userData=[
    [
        "JATIN",
        "jatin@gmail.com",
        "123456",
        "JATIN",
        "AGRAWAL",
    ],
    [
        "RAJ",
        "raj@gmail.com",
        "123456",
        "RAJ",
        "KUMAR"
    ],
    [
        "BHAVYA",
        "bhavya@gmail.com",
        "123456",
        "BHAVYA",
        "JAIN"
    ],
    [
        "ANSH",
        "ansh@gmail.com",
        "123456",
        "ANSH",
        "LAL"
    ],
    [
        "ANIKET",
        "aniket@gmail.com",
        "123456",
        "ANIKET",
        "PARMAR"
    ],
    [
        "JAY",
        "jay@gmail.com",
        "123456",
        "JAY",
        "SURTI"
    ],
    [
        "VIKAS",
        "vikas@gmail.com",
        "123456",
        "VIKAS",
        "SARDHARA"
    ],
    [
        "MEERA",
        "meera@gmail.com",
        "123456",
        "MEERA",
        "KASUNDRA"
    ],
    [
        "DRASHTI",
        "drashti@gmail.com",
        "123456",
        "DRASHTI",
        "PARMAR"
    ],
    [
        "VAIBHAV",
        "vaibhav@gmail.com",
        "123456",
        "VAIBHAV",
        "KOLADIYA"
    ],
]

const productData=[
    [
        "JATIN",
         "Wireless Bluetooth Headphones",
         "High-quality over-ear headphones with noise cancellation",
         "Electronics,bluetooh,headphones,earphones,wireless",
         149.99,
         "2023-10-15"
    ],
    [
        "RAJ",
         "Men's Classic Leather Wallet",
         "Genuine leather wallet with multiple card slots and ID window",
         "Fashion,wallet,leather",
         39.99,
         "2023-10-20"
    ],
    [
        "BHAVYA",
         "Smart LED TV - 55 inch",
         "4K Ultra HD TV with built-in streaming services",
         "Electronics,television,led,tv,largetv",
         799.99,
         "2023-10-25"
    ],
    [
        "ANSH",
         "Stainless Steel Kitchen Knife Set",
         "Professional 8-piece chef's knife set with wooden block",
         "Home & Kitchen,knife,knife set",
         129.99,
         "2023-10-28"
    ],
    [
        "ANIKET",
         "Women's Running Shoes",
         "Lightweight and breathable sneakers for running and sports",
         "Sporting Goods,shoes, running shoes,women shoes",
         79.99,
         "2023-11-02"
    ],
    [
        "JAY",
         "Portable Bluetooth Speaker",
         "Waterproof and durable outdoor wireless speaker",
         "Electronics,bluetooth,speaker,wireless, portable",
         69.99,
         "2023-11-05"
    ],
    [
        "VIKAS",
         "Organic Herbal Tea Sampler",
         "Assorted collection of premium organic herbal teas",
         "Grocery,tea,herbal, healthytea,organic",
         24.99,
         "2023-11-10"
    ],
    [
        "MEERA",
         "Men's Leather Belt",
         "Classic reversible leather belt with rotating buckle",
         "Fashion,leather,wallet, men fashion",
         49.99,
         "2023-11-15"
    ],
    [
        "DRASHTI",
         "Digital SLR Camera Kit",
         "Professional-grade camera bundle with lenses and accessories",
         "Electronics,camera, photography, DSLR",
         1299.99,
         "2023-11-20"
    ],
    [
        "VAIBHAV",
         "Rechargeable Handheld Vacuum Cleaner",
         "Cordless and powerful vacuum for home and car use",
         "Home & Kitchen,vaccum,cleaning products, electric cleaner,home appliances",
         99.99,
         "2023-11-25"
    ]
]


const reviewData=[
    [
        "VAIBHAV",
         "1",
         "2023-11-10",
         "Excellent",
         "Absolutely amazing sound quality and comfortable to wear for hours.",
    ],
    [   
        "DRASHTI",
         "2",
         "2023-11-12",
         "Good",
         "Nice wallet, Good quality leather. It's a bit bigger than expected."
    ],
    [
        "MEERA",
         "3",
         "2023-11-05",
         "Fair",
         "Decent TV, but the smart features could be more user-friendly."
    ],
    [
        "VIKAS",
         "4",
         "2023-11-20",
         "Excellent",
         "Love this knife set! Sharp and well-built."
    ],
    [
        "JAY",
         "5",
         "2023-11-08",
         "Good",
         "Great for running. Comfortable and stylish."
    ],
    [
        "ANIKET",
         "6",
         "2023-11-25",
         "Excellent",
         "Awesome sound quality and portable too!"
    ],
    [
        "ANSH",
         "7",
         "2023-11-15",
         "Good",
         "Delicious teas, but the packaging could be improved."
    ],
    [
        "BHAVYA",
         "8",
         "2023-11-02",
         "Fair",
         "Decent quality, but the buckle feels a bit flimsy."
    ],
    [
        "JATIN",
         "9",
         "2023-11-18",
         "Excellent",
         "Amazing camera with great accessories. Highly recommended!"
    ],
    [
        "JAY",
         "10",
         "2023-11-30",
         "Good",
         "Good suction power, but battery life could be better."
    ],
    [
        "VIKAS",
         "1",
         "2023-12-05",
         "Good",
         "Good sound quality, comfortable to wear for long durations."
    ],
    [
        "VAIBHAV",
         "2",
         "2023-12-08",
         "Fair",
         "Decent quality leather, but stitching could be improved."
    ],
    [
        "DRASHTI",
         "3",
         "2023-12-10",
         "Excellent",
         "Outstanding picture quality and easy setup."
    ],
    [
        "MEERA",
         "4",
         "2023-12-15",
         "Poor",
         "Disappointing quality, knives aren't sharp as expected."
    ],
    [
        "ANSH",
         "5",
         "2023-12-18",
         "Excellent",
         "Extremely comfortable and great for running."
    ],
    [
        "VAIBHAV",
         "6",
         "2023-12-20",
         "Good",
         "Impressive sound quality and portable design."
    ],
    [
        "ANIKET",
         "7",
         "2023-12-25",
         "Fair",
         "Mixed reviews on the teas, some were Good, others not so much."
    ],
    [
        "ANSH",
         "8",
         "2023-12-28",
         "Excellent",
         "Great quality leather and a perfect fit."
    ],
    [
        "BHAVYA",
         "9",
         "2024-01-02",
         "Good",
         "Excellent camera, although the lens cover feels flimsy."
    ],
    [
        "JATIN",
         "10",
         "2024-01-05",
         "Fair",
         "Decent suction power, but battery life needs improvement."
    ]
]

module.exports={userData,productData,reviewData}