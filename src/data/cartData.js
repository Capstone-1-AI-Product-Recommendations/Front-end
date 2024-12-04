import NewProductImg from "../img/Product/newProduct.png";
import AltProductImg1 from "../img/Product/altProductImg1.png";
import AltProductImg2 from "../img/Product/altProductImg2.png";
import AltProductImg3 from "../img/Product/newProduct.png";

export const cartData = [
  {
    id: 1,
    shopName: "Organic Food Store",
    shopIcon: "https://down-vn.img.susercontent.com/file/vn-11134207-7qukw-lf6e3m7n87ry64",
    isOfficial: true,
    products: [
      {
        id: 1,
        name: "Cantaloupe Melon Fresh Organic Cut",
        image: NewProductImg,
        variant: "Organic Fresh",
        price: 120400,
        originalPrice: 160780,
        quantity: 1,
        discount: "21%",
        badge: "COLD SALE",
        altImages: [AltProductImg1, AltProductImg2, AltProductImg3]
      },
      {
        id: 2,
        name: "Cantaloupe Melon Fresh Organic Cut",
        image: NewProductImg,
        variant: "Organic Fresh",
        price: 120400,
        originalPrice: 160780,
        quantity: 1,
        discount: "21%",
        badge: "COLD SALE",
        altImages: [AltProductImg1, AltProductImg2, AltProductImg3]
      }
    ]
  },
  {
    id: 2,
    shopName: "Nike Official Store",
    shopIcon: "https://down-vn.img.susercontent.com/file/vn-11134207-7qukw-lf5q3q0q69q454",
    isOfficial: true,
    products: [
      {
        id: 3,
        name: "Nike Air Force 1 '07 White",
        image: "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/b7d9211c-26e7-431a-ac24-b0540fb3c00f/air-force-1-07-shoes-WrLlWX.png",
        variant: "Size 42",
        price: 2649000,
        originalPrice: 3099000,
        quantity: 1,
        discount: "15%",
        badge: "MALL",
        altImages: [
          "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/00375837-849f-4f17-ba24-d201d27be49b/air-force-1-07-shoes-WrLlWX.png",
          "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/33533fe2-1157-4001-896e-1803b30659c8/air-force-1-07-shoes-WrLlWX.png",
          "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/a0a300da-2e16-4483-ba64-9815cf0598ac/air-force-1-07-shoes-WrLlWX.png"
        ]
      },
      {
        id: 4,
        name: "Nike Dri-FIT Academy",
        image: "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/c6d9d042-f0af-4a35-8cc4-1c060564c2c6/dri-fit-academy-short-sleeve-football-top-Sn2z4B.png",
        variant: "Size L",
        price: 699000,
        originalPrice: 899000,
        quantity: 1,
        discount: "22%",
        badge: "HOT",
        altImages: [
          "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/d3eb254d-0901-4158-956a-4610180545e5/dri-fit-academy-short-sleeve-football-top-Sn2z4B.png",
          "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/f7741640-0220-4e86-b5ae-5c4c1f6ce44b/dri-fit-academy-short-sleeve-football-top-Sn2z4B.png",
          "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/11c43e66-0e31-4b6f-929e-a4b4cce0b936/dri-fit-academy-short-sleeve-football-top-Sn2z4B.png"
        ]
      }
    ]
  }
]; 