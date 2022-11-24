import { sleep } from "@/utils/common";
import type { ShopsResponse } from "../dto/ShopsResponse";
import { Shop } from "@/core/models/Shop";

class ShopsSource {
  async getShops(): Promise<ShopsResponse[]> {
    await sleep(0.4);
    const response: ShopsResponse[] = [
      {
        logo: "https://pickbazar-react-admin-rest.vercel.app/_next/image?url=https%3A%2F%2Fpickbazarlaravel.s3.ap-southeast-1.amazonaws.com%2F882%2Fconversions%2FFurniture-thumbnail.jpg&w=96&q=75",
        cover_image:
          "https://pickbazar-react-admin-rest.vercel.app/_next/image?url=https%3A%2F%2Fpickbazarlaravel.s3.ap-southeast-1.amazonaws.com%2F883%2FUntitled-6.jpg&w=3840&q=75",
        name: "Clothing Shop",
        owner_name: "Store Owner",
        website: "",
        social_link: "",
        description:
          "The clothing shop is the best shop around the city. This is being run under the store owner and our aim is to provide quality product and hassle free customer service.",
        country: "USA",
        state: "Illinois",
        city: "Linkoln",
        street: "4885 Spring Street",
        zip_code: "62656",
        telephone_number: "123768234841",
        total_products: 64,
        total_orders: 4,
        date_of_registration: "June 27, 2021",
        id: 1,
        status: "active",
      },
      {
        logo: "https://pickbazar-react-admin-rest.vercel.app/_next/image?url=https%3A%2F%2Fpickbazarlaravel.s3.ap-southeast-1.amazonaws.com%2F886%2Fconversions%2FBackpack-thumbnail.jpg&w=3840&q=75",
        cover_image:
          "https://pickbazar-react-admin-rest.vercel.app/_next/image?url=https%3A%2F%2Fpickbazarlaravel.s3.ap-southeast-1.amazonaws.com%2F887%2FUntitled-1-%25281%2529.jpg&w=3840&q=75",
        name: "Bags Shop",
        owner_name: "Store Owner",
        website: "",
        social_link: "",
        description:
          "The Bag shop is the best shop around the city. This is being run under the store owner and our aim is to provide quality product and hassle free customer service.",
        country: "USA",
        state: "Alabama",
        city: "Michigan",
        street: "1740 Bedfort Street",
        zip_code: "35203",
        telephone_number: "123768234841",
        total_products: 15,
        total_orders: 7,
        date_of_registration: "June 27, 2021",
        id: 2,
        status: "active",
      },
      {
        logo: "https://pickbazar-react-admin-rest.vercel.app/_next/image?url=https%3A%2F%2Fpickbazarlaravel.s3.ap-southeast-1.amazonaws.com%2F891%2Fconversions%2FGroup-36321-thumbnail.jpg&w=3840&q=75",
        cover_image:
          "https://pickbazar-react-admin-rest.vercel.app/_next/image?url=https%3A%2F%2Fpickbazarlaravel.s3.ap-southeast-1.amazonaws.com%2F892%2FUntitled-2.jpg&w=3840&q=75",
        name: "Grocery Shop",
        owner_name: "Store Owner",
        website: "",
        social_link: "",
        description:
          "The grocery shop is the best shop around the city. This is being run under the store owner and our aim is to provide fresh and quality product and hassle free customer service.",
        country: "USA",
        state: "Illinois",
        city: "Freeport",
        street: "1986 Spinnaker Lane",
        zip_code: "61032",
        telephone_number: "123768234841",
        total_products: 585,
        total_orders: 55,
        date_of_registration: "June 27, 2021",
        id: 3,
        status: "active",
      },
      {
        logo: "https://pickbazar-react-admin-rest.vercel.app/_next/image?url=https%3A%2F%2Fpickbazarlaravel.s3.ap-southeast-1.amazonaws.com%2F889%2Fconversions%2FMakeup-thumbnail.jpg&w=3840&q=75",
        cover_image:
          "https://pickbazar-react-admin-rest.vercel.app/_next/image?url=https%3A%2F%2Fpickbazarlaravel.s3.ap-southeast-1.amazonaws.com%2F888%2FUntitled-3.jpg&w=3840&q=75",
        name: "Makeup Shop",
        owner_name: "Store Owner",
        website: "",
        social_link: "",
        description:
          "The makeup shop is the best shop around the city. This is being run under the store owner and our aim is to provide quality product and hassle free customer service.",
        country: "USA",
        state: "Louisiana",
        city: "Metairie",
        street: "2960 Rose Avenue",
        zip_code: "700001",
        telephone_number: "123768234841",
        total_products: 585,
        total_orders: 55,
        date_of_registration: "June 27, 2021",
        id: 4,
        status: "active",
      },
      {
        logo: "https://pickbazar-react-admin-rest.vercel.app/_next/image?url=https%3A%2F%2Fpickbazarlaravel.s3.ap-southeast-1.amazonaws.com%2F890%2Fconversions%2Fbakery-thumbnail.jpg&w=3840&q=75",
        cover_image:
          "https://pickbazar-react-admin-rest.vercel.app/_next/image?url=https%3A%2F%2Fpickbazarlaravel.s3.ap-southeast-1.amazonaws.com%2F893%2FUntitled-5.jpg&w=3840&q=75",
        name: "Bakery Shop",
        owner_name: "Store Owner",
        website: "",
        social_link: "",
        description:
          "The bakery shop is the best shop around the city. This is being run under the store owner and our aim is to provide fresh and quality product and hassle free customer service.",
        country: "USA",
        state: "Carolina",
        city: "Rocky Mount",
        street: "4422 Fort Street",
        zip_code: "27801",
        telephone_number: "123768234841",
        total_products: 72,
        total_orders: 8,
        date_of_registration: "June 27, 2021",
        id: 5,
        status: "active",
      },
    ];

    return Shop.fromShopDto(response);
  }
}

export const shopsSource = new ShopsSource();
