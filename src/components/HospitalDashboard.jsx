import DashboardNavbar from "./DashboardNavbar";
import styles from "./HospitalDashboard.module.css";
import CardList from "./CardList";
import { useEffect, useState } from "react";
import { fetchPatients } from "../services/data.service";

const hospitalList = [
  {
    id: 1,
    name: "Mayo Clinic-Jacksonville",
    phone: "904-587-2691",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNyA0Z5vU_VISsXSKeoLXOS2iQ-E7aT7I2ecplNrnDAA&s",
    address: "Jacksonville, FL 32224-1865",
    content:
      "Here's a small text description for the card content. Nothing more, nothing less.",
  },
  {
    id: 2,
    name: "Advent Health Orlando",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIsZYRq46-2hlBLD4rxm8aTRsvB3HbIIFdWHryNlE_bw&s",
    phone: "904-587-2691",
    address: "Orlando, FL 32803-1248",
    content:
      "Here's a small text description for the card content. Nothing more, nothing less.",
  },
  {
    id: 3,
    name: "UF Health shands Hospital",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNyA0Z5vU_VISsXSKeoLXOS2iQ-E7aT7I2ecplNrnDAA&s",
    phone: "904-587-2691",
    address: "Gainesville, FL 32610-3003",
    content:
      "Here's a small text description for the card content. Nothing more, nothing less.",
  },
  {
    id: 4,
    name: "Tampa General Hospital",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNyA0Z5vU_VISsXSKeoLXOS2iQ-E7aT7I2ecplNrnDAA&s",
    address: "Tampa, FL 33606-3571",
    content:
      "Here's a small text description for the card content. Nothing more, nothing less.",
  },
  {
    id: 5,
    name: "Baptist Health Baptist Hospital",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNyA0Z5vU_VISsXSKeoLXOS2iQ-E7aT7I2ecplNrnDAA&s",
    address: "Miami, FL 33176-2197",
    content:
      "Here's a small text description for the card content. Nothing more, nothing less.",
  },
  {
    id: 6,
    name: "Sarasota Memorial Hospital",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNyA0Z5vU_VISsXSKeoLXOS2iQ-E7aT7I2ecplNrnDAA&s",
    address: "Sarasota, FL 34239",
    content:
      "Here's a small text description for the card content. Nothing more, nothing less.",
  },
  {
    id: 1,
    name: "Mayo Clinic-Jacksonville",
    phone: "904-587-2691",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNyA0Z5vU_VISsXSKeoLXOS2iQ-E7aT7I2ecplNrnDAA&s",
    address: "Jacksonville, FL 32224-1865",
    content:
      "Here's a small text description for the card content. Nothing more, nothing less.",
  },
  {
    id: 1,
    name: "Mayo Clinic-Jacksonville",
    phone: "904-587-2691",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNyA0Z5vU_VISsXSKeoLXOS2iQ-E7aT7I2ecplNrnDAA&s",
    address: "Jacksonville, FL 32224-1865",
    content:
      "Here's a small text description for the card content. Nothing more, nothing less.",
  },
  {
    id: 1,
    name: "Mayo Clinic-Jacksonville",
    phone: "904-587-2691",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNyA0Z5vU_VISsXSKeoLXOS2iQ-E7aT7I2ecplNrnDAA&s",
    address: "Jacksonville, FL 32224-1865",
    content:
      "Here's a small text description for the card content. Nothing more, nothing less.",
  },
  {
    id: 1,
    name: "Mayo Clinic-Jacksonville",
    phone: "904-587-2691",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNyA0Z5vU_VISsXSKeoLXOS2iQ-E7aT7I2ecplNrnDAA&s",
    address: "Jacksonville, FL 32224-1865",
    content:
      "Here's a small text description for the card content. Nothing more, nothing less.",
  },
  {
    id: 1,
    name: "Mayo Clinic-Jacksonville",
    phone: "904-587-2691",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNyA0Z5vU_VISsXSKeoLXOS2iQ-E7aT7I2ecplNrnDAA&s",
    address: "Jacksonville, FL 32224-1865",
    content:
      "Here's a small text description for the card content. Nothing more, nothing less.",
  },
];

function HospitalDashboard() {
  const [hospitals, setHospitals] = useState([]);
  const [filteredHospitals, setFilteredHospitals] = useState([]);

  useEffect(() => {
    async function fetchPatiennts() {
      const data = await fetchPatients();
      setHospitals(data);
      setFilteredHospitals(data);
    }

    fetchPatiennts();
  }, []);

  const searchHospitals = (e) => {
    const val = e;
    if (val === "") {
      setFilteredHospitals(hospitals);
    } else {
      setFilteredHospitals((prevState) =>
        hospitals.filter((hos) =>
          hos.name.toUpperCase().includes(val.toUpperCase())
        )
      );
    }
  };
  return (
    <>
      <DashboardNavbar
        searchValue={(e) => searchHospitals(e)}
        feature="Patients"
      />
      <div className={styles.navTabName}>
        <span className={styles.navTabDesc}>Patients</span> for you
      </div>
      <CardList dataList={filteredHospitals} feature="Patients" />
    </>
  );
}

export default HospitalDashboard;
