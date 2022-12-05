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
  status: string;

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
    status: string;
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
    this.status = options.status;
  }

  static fromShopDto(ShopsResponse: ShopsResponse): Shop {
    return new Shop({
      logo: ShopsResponse.logo,
      coverImage: ShopsResponse.cover_image,
      name: ShopsResponse.name,
      ownerName: ShopsResponse.owner_name,
      webSite: ShopsResponse.website,
      socialLink: ShopsResponse.social_link,
      description: ShopsResponse.description,
      country: ShopsResponse.country,
      state: ShopsResponse.state,
      city: ShopsResponse.city,
      street: ShopsResponse.street,
      zipCode: ShopsResponse.zip_code,
      telephoneNumber: ShopsResponse.telephone_number,
      totalProducts: ShopsResponse.total_products,
      totalOrders: ShopsResponse.total_orders,
      dateOfRegistration: ShopsResponse.date_of_registration,
      id: ShopsResponse.id,
      status: ShopsResponse.status,
    });
  }
}
