// Personelin hangi envanteri aldığı ve Teslim alan personel yazılmayacak çünkü users'de personalde ref verdiğimiz için bu iki bilgiyi otoman bir şekilde elde etmiş olacağız.

export const products = [
  {
    type: "mouse",
    dateOfEntry: "3 Temmuz 2021",
    brand: "Razer",
    model: "km-03",
    serialNumber: 456952148,
    status: "depoda",
  },
  {
    type: "araba",
    dateOfEntry: "8 Temmuz 2021",
    brand: "Fiat",
    model: "Egea",
    serialNumber: 416252158,
    status: "personelde",
  },
  {
    type: "bilgisayar",
    dateOfEntry: "5 Temmuz 2021",
    brand: "Monster",
    model: "Mo5",
    serialNumber: 556942180,
    status: "depoda",
  },
  {
    type: "disk",
    dateOfEntry: "1 Temmuz 2021",
    brand: "Anoma",
    model: "Lomq",
    serialNumber: 426952548,
    status: "ofiste",
    takenProductDate: "",
    submitterPersonal: "",
    returnProductDate: "",
  },
];