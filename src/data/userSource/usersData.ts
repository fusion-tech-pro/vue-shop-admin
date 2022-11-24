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
    name: "contactNumber",
    required: true,
    align: "center",
    label: "Phone",
    field: "contactNumber",
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

export const imageDefault =
  "https://st4.depositphotos.com/4329009/19956/v/450/depositphotos_199564354-stock-illustration-creative-vector-illustration-of-default.jpg";
