import type { QTableProps } from "quasar";

export const columns: QTableProps["columns"] = [
  {
    name: "avatar",
    label: "Avatar",
    field: "avatar",
    align: "center",
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
  {
    name: "createAt",
    align: "center",
    label: "Create",
    field: "createAt",
    sortable: true,
  },
  { name: "actions", label: "Actions", field: "actions", align: "center" },
];

export const rows = [
  {
    avatar: "https://cdn.quasar.dev/app-icons/icon-128x128.png",
    firstName: "user1",
    lastName: "Petrov",
    phone: "(123) 456 - 7890",
    password: "111111",
    email: "user1@mail.com",
    createAt: 1630037978762,
  },
  {
    avatar: "https://cdn.quasar.dev/app-icons/icon-128x128.png",
    firstName: "user2",
    lastName: "Petrov",
    phone: "(123) 456 - 7890",
    password: "111111",
    email: "user2@mail.com",
    createAt: 1609037971762,
  },
  {
    avatar: "https://cdn.quasar.dev/img/avatar.png",
    firstName: "user3",
    lastName: "Petrov",
    phone: "(123) 456 - 7890",
    password: "111111",
    email: "user3@mail.com",
    createAt: 1661107978762,
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
    createAt: 1639137978762,
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

export const imageDefault =
  "https://st4.depositphotos.com/4329009/19956/v/450/depositphotos_199564354-stock-illustration-creative-vector-illustration-of-default.jpg";
