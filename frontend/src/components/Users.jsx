import { users } from "../users";
import { FaEdit, FaRegPlusSquare } from "react-icons/fa";
import { Link } from "react-router-dom";
import { MdArrowForwardIos } from "react-icons/md";
import { FaCheck } from "react-icons/fa6";
import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/react";
import clsx from "clsx";
import { useState } from "react";

const people = [
  { id: 1, name: "Yazilim Geliştirme" },
  { id: 2, name: "Arge" },
  { id: 3, name: "Pazarlama" },
  { id: 4, name: "Guvenlik" },
  { id: 5, name: "Bla bla bla" },
];

const Users = () => {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(people[1]);

  const filteredPeople =
    query === ""
      ? people
      : people.filter((person) => {
          return person.name.toLowerCase().includes(query.toLowerCase());
        });
  console.log(query);

  return (
    <section className="fontRoboto">
      <div className="pl-12 pt-12">
        <Link
          className="text-[14px] w-auto px-10 py-2 rounded-sm fontCera tracking-widest bg-black hover:bg-[#333] text-[#fff] fontCera mt-4"
          to="/"
        >
          Go Back
        </Link>
      </div>
      <div className="flex flex-row items-center justify-around pt-8 mb-4">
        <h2 className="text-5xl font-bold tracking-wider">Personeller</h2>
        <button>
          <FaRegPlusSquare size={60} />
        </button>
      </div>
      <div className="flex flex-row items-start justify-center gap-20">
        <div className="flex flex-col items-center justify-center gap-10 mb-8">
          <div className="relative w-[200px] h-10">
            <input
              className="peer w-[200px] h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
              placeholder=" "
            />
            <label className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">
              Ad
            </label>
          </div>
          <div className="relative w-[200px] h-10">
            <input
              className="peer w-[200px] h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
              placeholder=" "
            />
            <label className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">
              Soyad
            </label>
          </div>
          <div className="relative w-[200px] h-10">
            <input
              className="peer w-[200px] h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
              placeholder=" "
            />
            <label className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">
              Kimlik Numarasi
            </label>
          </div>
        </div>
        <div>
          <div className="">
            <Combobox
              value={selected}
              onChange={(value) => setSelected(value)}
              onClose={() => setQuery("")}
            >
              <div className="relative">
                <ComboboxInput
                  className={clsx(
                    "w-full rounded-lg outline outline-[#E5E7EB] border-[#E5E7EB] bg-white/5 py-1.5 pr-8 pl-3 text-sm/6 text-[#6A7298]",
                    "data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-black"
                  )}
                  displayValue={(person) => person?.name}
                  onChange={(event) => setQuery(event.target.value)}
                />
                <ComboboxButton className="group absolute inset-y-0 right-0 px-2.5">
                  <MdArrowForwardIos
                    color="#000"
                    size={20}
                    className="rotate-90"
                  />
                </ComboboxButton>
              </div>

              <ComboboxOptions
                anchor="bottom"
                transition
                className={clsx(
                  "w-[var(--input-width)] rounded-xl border border-black/5 bg-black/5 p-1 [--anchor-gap:var(--spacing-1)] empty:invisible",
                  "transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0"
                )}
              >
                {filteredPeople.map((person) => (
                  <ComboboxOption
                    key={person.id}
                    value={person}
                    className="group flex cursor-default items-center gap-2 rounded-lg py-1.5 px-3 select-none data-[focus]:bg-black/10"
                  >
                    <FaCheck className="invisible size-4  group-data-[selected]:visible" />
                    <div className="text-sm/6 text-6A7298">{person.name}</div>
                  </ComboboxOption>
                ))}
              </ComboboxOptions>
            </Combobox>
          </div>
        </div>
        <div>
          <button
            type="button"
            className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2"
          >
            Ara
          </button>
        </div>
      </div>
      <div>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 fontCera">
          <thead className="text-xs text-white uppercase bg-[#332D2D]">
            <tr>
              <th
                scope="col"
                className="px-3 py-3 min-[675px]:px-6 text-center hidden min-[900px]:table-cell"
              >
                SİCİL NUMARASI
              </th>
              <th
                scope="col"
                className="px-1 py-3 min-[550px]:px-3  min-[675px]:px-6 text-center"
              >
                AD SOYAD
              </th>
              <th
                scope="col"
                className="px-1 py-3 min-[550px]:px-3 min-[675px]:px-6 text-center"
              >
                BİRİM
              </th>
              <th
                scope="col"
                className="px-1 py-3 min-[550px]:px-3 min-[675px]:px-6 text-center"
              >
                POZİSYON
              </th>
              <th
                scope="col"
                className="px-1 py-3 min-[550px]:px-3 min-[675px]:px-6 text-center"
              ></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="bg-white border-b">
                <td className="px-3 py-3 min-[675px]:px-6 text-center font-medium text-gray-900 whitespace-nowrap hidden min-[900px]:table-cell">
                  {user.registrationNumber}
                </td>
                <td className="px-1 py-3 min-[550px]:px-3 min-[675px]:px-6 text-center font-medium text-gray-900 whitespace-nowrap">
                  {user.name} {user.surname}
                </td>
                <td className="px-1 py-3 min-[550px]:px-3 min-[675px]:px-6 text-center">
                  {user.unit}
                </td>
                <td className="px-1 py-3 min-[550px]:px-3 min-[675px]:px-6 text-center">
                  {user.position}
                </td>
                <td className="px-1 py-3 min-[550px]:px-3min-[675px]:px-6">
                  <Link to={`/user/${user._id}`}>
                    <FaEdit />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default Users;
