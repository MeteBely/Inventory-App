// Personelin hangi envanteri aldığı ve Teslim alan personel yazılmayacak çünkü users'de personalde ref verdiğimiz için bu iki bilgiyi otoman bir şekilde elde etmiş olacağız.
//Zimmeti daha önce kimler almış vs. bunları kayıt et.
export const products = [
  {
    _id: 1,
    type: "Mouse",
    dateOfEntry: "3 Temmuz 2021",
    brand: "Razer",
    model: "km-03",
    serialNumber: 456952148,
    status: "Depoda",
    takenProductDate: "",
    submitterPersonal: "",
    returnProductDate: "",
  },
  {
    _id: 2,
    type: "Bilgisayar",
    dateOfEntry: "5 Temmuz 2021",
    brand: "Monster",
    model: "Mo5",
    serialNumber: 556942180,
    status: "Depoda",
    takenProductDate: "",
    submitterPersonal: "",
    returnProductDate: "",
  },
];
