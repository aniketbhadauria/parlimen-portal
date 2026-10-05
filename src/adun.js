const featured = [
  { code: "N01", seat: "Buloh Kasap", name: "Datuk Zahari Sarip", party: "UMNO", bahagian: "Segamat", aduan: 142, hotspot: 2, program: 8, selesai: 98, rating: 4.7 },
  { code: "N03", seat: "Bekok", name: "Anuar Abd Manap", party: "UMNO", bahagian: "Segamat", aduan: 118, hotspot: 1, program: 6, selesai: 94, rating: 4.5 },
  { code: "N05", seat: "Tangkak", name: "Mohd Azahar Ibrahim", party: "UMNO", bahagian: "Tangkak", aduan: 167, hotspot: 2, program: 10, selesai: 95, rating: 4.8 },
  { code: "N07", seat: "Bentayan", name: "Ahmad Syar'e Yusof", party: "UMNO", bahagian: "Tangkak", aduan: 134, hotspot: 2, program: 7, selesai: 94, rating: 4.4 },
  { code: "N08", seat: "Sungai Balang", name: "Mohamad Fazli Mohamad Salleh", party: "UMNO", bahagian: "Muar", aduan: 98, hotspot: 1, program: 5, selesai: 96, rating: 4.6 },
  { code: "N09", seat: "Maharani", name: "Sahrihan Jani", party: "UMNO", bahagian: "Muar", aduan: 156, hotspot: 3, program: 9, selesai: 91, rating: 4.3 },
  { code: "N12", seat: "Parit Yaani", name: "Datuk Mohamad Najib Samuri", party: "UMNO", bahagian: "Batu Pahat", aduan: 188, hotspot: 2, program: 11, selesai: 94, rating: 4.7 },
  { code: "N13", seat: "Bukit Pasir", name: "Nadhirah Afiqah Abdull Rahim", party: "UMNO", bahagian: "Muar", aduan: 92, hotspot: 1, program: 5, selesai: 96, rating: 4.5 },
];

const more = [
  ["N14", "Tenang", "Hasni Mohammad", "UMNO", "Segamat"],
  ["N15", "Kemelah", "Sulaiman Mohd Nor", "UMNO", "Segamat"],
  ["N16", "Machap", "Onn Hafiz Ghazi", "UMNO", "Kluang"],
  ["N17", "Rengit", "Mohd Puad Zarkashi", "UMNO", "Batu Pahat"],
  ["N18", "Semarang", "Samsolbari Jamali", "UMNO", "Tangkak"],
  ["N19", "Semerah", "Mohd Fared Mohd Khalid", "UMNO", "Batu Pahat"],
  ["N20", "Sri Medan", "Zulkurnain Kamisan", "UMNO", "Batu Pahat"],
  ["N21", "Kukup", "Jefridin Atan", "UMNO", "Pontian"],
  ["N22", "Panti", "Hahasrin Hashim", "UMNO", "Kota Tinggi"],
  ["N23", "Pasir Raja", "Rashidah Ismail", "UMNO", "Kota Tinggi"],
  ["N24", "Johor Lama", "Norlizah Noh", "UMNO", "Kota Tinggi"],
  ["N25", "Tanjung Surat", "Aznan Tamin", "UMNO", "Kota Tinggi"],
  ["N26", "Kempas", "Ramlee Bohani", "UMNO", "Johor Bahru"],
  ["N27", "Bukit Permai", "Mohd Jafni Md Shukor", "UMNO", "Kulai"],
  ["N28", "Mahkota", "Sharifah Azizah Syed Zain", "UMNO", "Kluang"],
  ["N29", "Parit Raja", "Nor Rashidah Ramli", "UMNO", "Batu Pahat"],
  ["N30", "Pulai Sebatang", "Hasrunizah Zakaria", "UMNO", "Pontian"],
  ["N31", "Larkin", "Mohd Hairi Mad Shah", "UMNO", "Johor Bahru"],
  ["N32", "Layang-Layang", "Abd Mutalip Abd Rahim", "UMNO", "Kulai"],
  ["N33", "Endau", "Alwiyah Talib", "UMNO", "Mersing"],
  ["N34", "Sedili", "Rasman Ithnain", "UMNO", "Kota Tinggi"],
  ["N35", "Penawar", "Fauziah Misri", "UMNO", "Kota Tinggi"],
  ["N36", "Pemanis", "Mohd Khuzzan Abu Bakar", "UMNO", "Segamat"],
  ["N37", "Bukit Kepong", "Zulkipli Abdullah", "UMNO", "Muar"],
  ["N38", "Gambir", "Sahrihan already", "UMNO", "Tangkak"],
  ["N39", "Serom", "Khairin-Nisa Ismail", "UMNO", "Tangkak"],
  ["N40", "Bukit Naning", "Fuad Tukirin", "UMNO", "Muar"],
  ["N41", "Paloh", "Lee Ting Han", "MCA", "Kluang"],
  ["N42", "Yong Peng", "Ling Tian Soon", "MCA", "Batu Pahat"],
  ["N43", "Pekan Nanas", "Tan Eng Meng", "MCA", "Pontian"],
  ["N44", "Benut", "Tan Chong", "MCA", "Pontian"],
  ["N45", "Senai", "Teo Shi Yang", "MCA", "Kulai"],
  ["N46", "Stulang", "Chua Tee Yong", "MCA", "Johor Bahru"],
  ["N47", "Perling", "Lee Ting Wei", "MCA", "Johor Bahru"],
  ["N48", "Permas", "Wong You Fong", "MCA", "Johor Bahru"],
  ["N49", "Kahang", "R. Vidyananthan", "MIC", "Kluang"],
  ["N50", "Tenggaroh", "Raven Kumar Krishnasamy", "MIC", "Mersing"],
  ["N51", "Labis", "M. Asojan", "MIC", "Labis"],
  ["N52", "Bukit Batu", "Rosleli Jahari", "UMNO", "Kulai"],
  ["N53", "Kota Iskandar", "Nor Hayati Bachok", "UMNO", "Johor Bahru"],
];

function derived(index) {
  return {
    aduan: 80 + ((index * 17) % 110),
    hotspot: 1 + (index % 4),
    program: 4 + (index % 8),
    selesai: 90 + (index % 9),
    rating: Math.round((4.1 + (index % 8) * 0.1) * 10) / 10,
  };
}

export const adunList = [
  ...featured,
  ...more.map(([code, seat, name, party, bahagian], index) => ({
    code,
    seat,
    name: name === "Sahrihan already" ? "Mohd Solihan Badri" : name,
    party,
    bahagian,
    ...derived(index),
  })),
];

export const parties = ["Semua", "UMNO", "MCA", "MIC"];

export const bahagianOptions = ["Semua", ...new Set(adunList.map((item) => item.bahagian))];
