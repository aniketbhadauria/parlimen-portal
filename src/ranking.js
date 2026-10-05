import { adunList } from "./adun.js";

const pictured = [
  { code: "N26", seat: "Machap", name: "Datuk Onn Hafiz Ghazi", party: "UMNO", aduan: 312, selesai: 96, rating: 4.9, trend: "up" },
  { code: "N05", seat: "Tangkak", name: "Mohd Azahar Ibrahim", party: "UMNO", aduan: 167, selesai: 95, rating: 4.8, trend: "up" },
  { code: "N23", seat: "Kempas", name: "Datuk Samsolbari Jamali", party: "UMNO", aduan: 244, selesai: 94, rating: 4.8, trend: "up" },
  { code: "N42", seat: "Johor Jaya", name: "Chan San San", party: "MCA", aduan: 256, selesai: 93, rating: 4.8, trend: "up" },
  { code: "N01", seat: "Buloh Kasap", name: "Datuk Zahari Sarip", party: "UMNO", aduan: 142, selesai: 96, rating: 4.7, trend: "up" },
  { code: "N12", seat: "Parit Yaani", name: "Datuk Mohamad Najib Samuri", party: "UMNO", aduan: 188, selesai: 94, rating: 4.7, trend: "up" },
  { code: "N29", seat: "Mahkota", name: "Syed Hussien Syed Abdullah", party: "UMNO", aduan: 177, selesai: 94, rating: 4.7, trend: "up" },
  { code: "N43", seat: "Permas", name: "Datuk Ramlee Bohani", party: "UMNO", aduan: 202, selesai: 94, rating: 4.7, trend: "up" },
  { code: "N33", seat: "Panti", name: "Muszaide Maknor", party: "UMNO", aduan: 121, selesai: 91, rating: 4.2, trend: "down" },
  { code: "N10", seat: "Maharani Barat", name: "Haw Chin Teck", party: "MCA", aduan: 109, selesai: 90, rating: 4.3, trend: "down" },
  { code: "N39", seat: "Sedili", name: "Aznan Tamin", party: "UMNO", aduan: 133, selesai: 92, rating: 4.3, trend: "down" },
  { code: "N37", seat: "Johor Lama", name: "Norlizah Noh", party: "UMNO", aduan: 116, selesai: 91, rating: 4.3, trend: "down" },
  { code: "N32", seat: "Endau", name: "Mohd Youzaimi Yusof", party: "UMNO", aduan: 148, selesai: 94, rating: 4.3, trend: "down" },
];

function plain(name) {
  return name.toLowerCase().replace(/^datuk\s+/, "");
}

const usedNames = new Set(pictured.map((item) => plain(item.name)));
const usedCodes = new Set(pictured.map((item) => item.code));

const fillers = adunList
  .filter((item) => !usedNames.has(plain(item.name)) && !usedCodes.has(item.code))
  .map((item, index) => ({
    code: item.code,
    seat: item.seat,
    name: item.name,
    party: item.party,
    aduan: item.aduan,
    selesai: 93 + (index % 3),
    rating: index % 2 === 0 ? 4.6 : 4.5,
    trend: index % 5 === 0 ? "down" : "up",
  }));

const extras = [
  { code: "N54", seat: "Skudai", name: "Mohd Noorazman Abd Latiff", party: "UMNO", aduan: 154, selesai: 94, rating: 4.5, trend: "up" },
  { code: "N55", seat: "Gelang Patah", name: "Liow Cai Tung", party: "MCA", aduan: 139, selesai: 93, rating: 4.5, trend: "up" },
  { code: "N56", seat: "Pulai", name: "K. Yuganeelan", party: "MIC", aduan: 128, selesai: 93, rating: 4.4, trend: "down" },
].filter((item) => !usedCodes.has(item.code));

while (fillers.length + pictured.length < 48 && extras.length) {
  fillers.push(extras.shift());
}

function codeNumber(code) {
  return Number(code.replace(/\D/g, ""));
}

export const ranking = [...pictured, ...fillers].sort((a, b) => {
  if (b.rating !== a.rating) return b.rating - a.rating;
  if (b.selesai !== a.selesai) return b.selesai - a.selesai;
  return codeNumber(a.code) - codeNumber(b.code);
});

export const topFive = ranking.slice(0, 5);

export const attention = [
  pictured.find((item) => item.name === "Muszaide Maknor"),
  pictured.find((item) => item.name === "Haw Chin Teck"),
  pictured.find((item) => item.name === "Aznan Tamin"),
  pictured.find((item) => item.name === "Norlizah Noh"),
  pictured.find((item) => item.name === "Mohd Youzaimi Yusof"),
];
