import { useState, useEffect } from "react";
import { fetchUserData } from "./api/axios";
import DataSelection from "./components/DataSelection";
import Table from "./components/Table";
import { Parser } from "@json2csv/plainjs";

function App() {
  const options = [
    { value: "United_States", label: "United States" },
    { value: "Mexico", label: "Mexico" },
    { value: "Finland", label: "Finland" },
  ];
  const defaultOption = options[0];

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sliderValue, setSliderValue] = useState(1);
  const [selectedOption, setSelectedOption] = useState(defaultOption);
  const [seed, setSeed] = useState("");
  const [isBottom, setIsBottom] = useState(false);

  const fetchData = async (mode = "replace") => {
    setLoading(true);
    setError(null);

    try {
      const recordCount = mode === "append" ? 10 : 20;
      const startIndex = mode === "append" ? users.length : 0;
      const data = await fetchUserData(
        selectedOption.value,
        sliderValue,
        seed,
        startIndex,
        recordCount
      );

      if (mode === "append") {
        setUsers((prevUsers) => ({
          ...data,
          data: [...(prevUsers.data || []), ...data.data],
        }));
      } else {
        setUsers(data);
      }

      if (seed === "") {
        setSeed(data.seed);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (seed.trim() !== "") {
      fetchData();
    }
  }, [sliderValue, selectedOption, seed]);

  const exportToCSV = () => {
    const userList = Array.isArray(users.data) ? users.data : [];
    const dataToExport = userList.map((user) => ({
      ID: user.identifier,
      Name: user.name,
      Address: user.address,
      Phone: user.phone,
    }));

    const fields = ["ID", "Name", "Address", "Phone", "Page"];
    const json2csvParser = new Parser({ fields });
    const csv = json2csvParser.parse(dataToExport);

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `user_data.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    let numericValue = 0;

    if (value === "") {
      numericValue = 0;
    } else {
      numericValue = Number(value);
      if (isNaN(numericValue) || numericValue < 0) {
        return;
      }
    }
    setSliderValue(numericValue);
  };

  useEffect(() => {
    if (isBottom && !loading) {
      fetchData("append");
    }
  }, [isBottom, loading]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      if (scrollTop + windowHeight >= documentHeight - 10) {
        setIsBottom(true);
      } else {
        setIsBottom(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const totalRecords = Array.isArray(users.data) ? users.data.length : 0;

  return (
    <div className="p-4 pt-8 w-full">
      <DataSelection
        options={options}
        selectedOption={selectedOption}
        onDropdownChange={setSelectedOption}
        sliderValue={sliderValue}
        onSliderChange={(e) => setSliderValue(e.target.value)}
        onInputChange={handleInputChange}
        seed={seed}
        onSeedChange={(e) => setSeed(e.target.value)}
        onFetchData={() => fetchData()}
        exportToCSV={exportToCSV}
      />

      {loading && <p className="mt-4">Loading data...</p>}
      {error && (
        <p className="mt-4 text-red-500">Error fetching data: {error}</p>
      )}
      <p className="mt-4">Total Records: {totalRecords}</p>
      <Table users={users} />
    </div>
  );
}

export default App;
