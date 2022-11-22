import type { ShopsResponse } from "../../data/dto/ShopsResponse";

export class Shop {
  logo?: string;
  coverImage?: string;
  name: string;
  ownerName?: string;
  webSite?: string;
  socialLink?: string;
  description?: string;
  country?: string;
  state?: string;
  city?: string;
  street?: string;
  zipCode?: string;
  telephoneNumber?: string;
  totalProducts?: number;
  totalOrders?: number;
  dateOfRegistration?: string;
  id: number;

  constructor(options: {
    logo?: string;
    coverImage?: string;
    name: string;
    ownerName?: string;
    webSite?: string;
    socialLink?: string;
    description?: string;
    country?: string;
    state?: string;
    city?: string;
    street?: string;
    zipCode?: string;
    telephoneNumber?: string;
    totalProducts?: number;
    totalOrders?: number;
    dateOfRegistration?: string;
    id: number;
  }) {
    this.logo = options.logo;
    this.coverImage = options.coverImage;
    this.name = options.name;
    this.ownerName = options.ownerName;
    this.webSite = options.webSite;
    this.socialLink = options.socialLink;
    this.description = options.description;
    this.country = options.country;
    this.state = options.state;
    this.city = options.city;
    this.street = options.street;
    this.zipCode = options.zipCode;
    this.telephoneNumber = options.telephoneNumber;
    this.totalProducts = options.totalProducts;
    this.totalOrders = options.totalOrders;
    this.dateOfRegistration = options.dateOfRegistration;
    this.id = options.id;
  }

  static fromShopDto(ShopsResponse: ShopsResponse[]): Array<Shop> {
    return ShopsResponse.map((shop: Shop) => {
      return new Shop({
        logo: shop.logo,
        coverImage: shop.coverImage,
        name: shop.name,
        ownerName: shop.ownerName,
        webSite: shop.webSite,
        socialLink: shop.socialLink,
        description: shop.description,
        country: shop.country,
        state: shop.state,
        city: shop.city,
        street: shop.street,
        zipCode: shop.zipCode,
        telephoneNumber: shop.telephoneNumber,
        totalProducts: shop.totalProducts,
        totalOrders: shop.totalOrders,
        dateOfRegistration: shop.dateOfRegistration,
        id: shop.id,
      });
    });
  }
}
