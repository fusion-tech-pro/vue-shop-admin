import type { QTableProps } from "quasar";

export const columns: QTableProps["columns"] = [
  {
    name: "avatar",
    label: "Avatar",
    field: "avatar",
    align: "left",
  },
  {
    name: "firstName",
    required: true,
    align: "center",
    label: "First Name",
    field: "firstName",
    sortable: true,
  },
  {
    name: "lastName",
    align: "center",
    label: "Last Name",
    field: "lastName",
    sortable: true,
  },
  {
    name: "email",
    required: true,
    align: "center",
    label: "Email",
    field: "email",
    sortable: true,
  },
  {
    name: "phone",
    required: true,
    align: "center",
    label: "Phone",
    field: "phone",
    sortable: true,
  },
  // {
  //   name: "password",
  //   required: true,
  //   align: "center",
  //   label: "Password",
  //   field: "password",
  //   sortable: true,
  // },
  { name: "actions", label: "Actions", field: "actions" },
];

export const rows = [
  {
    avatar: "https://cdn.quasar.dev/app-icons/icon-128x128.png",
    firstName: "user1",
    lastName: "Petrov",
    phone: "(123) 456 - 7890",
    password: "111111",
    email: "user1@mail.com",
  },
  {
    avatar: "https://cdn.quasar.dev/app-icons/icon-128x128.png",
    firstName: "user2",
    lastName: "Petrov",
    phone: "(123) 456 - 7890",
    password: "111111",
    email: "user2@mail.com",
  },
  {
    avatar: "",
    firstName: "user3",
    lastName: "Petrov",
    phone: "(123) 456 - 7890",
    password: "111111",
    email: "user3@mail.com",
  },
  {
    firstName: "user4",
    lastName: "Petrov",
    phone: "(123) 456 - 7890",
    password: "111111",
    email: "user4@mail.com",
  },
  {
    firstName: "user5",
    email: "user5@mail.com",
    password: "222222",
  },
  {
    firstName: "user6",
    password: "222222",
    email: "user6@mail.com",
  },
  {
    firstName: "user7",
    password: "333333",
    email: "user7@mail.com",
  },
  {
    firstName: "user8",
    lastName: "Userovich",
    password: "555555",
    email: "user8@mail.com",
  },
  {
    firstName: "user9",
    password: "123456",
    phone: "(123) 456 - 7890",
    email: "user9@mail.com",
  },
  {
    firstName: "user10",
    password: "123456",
    email: "user10@mail.com",
  },
];

export const imageDefault = "https://cdn.quasar.dev/img/avatar.png";
