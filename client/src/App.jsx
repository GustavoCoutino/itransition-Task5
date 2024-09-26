import { useState } from "react";
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
  const [pageNumber, setPageNumber] = useState(0);

  const fetchData = async (newPageNumber = pageNumber) => {
    setLoading(true);
    setError(null);

    try {
      const data = await fetchUserData(
        selectedOption.value,
        sliderValue,
        seed,
        newPageNumber
      );
      setUsers((prev) => ({
        ...prev,
        data: [...prev.data, ...data.data],
      }));
      setPageNumber(newPageNumber);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const exportToCSV = () => {
    const userList = Array.isArray(users.data) ? users.data : [];
    const dataToExport = userList.map((user) => ({
      ID: user.identifier,
      Name: user.name,
      Address: user.address,
      Phone: user.phone,
      Page: pageNumber,
    }));

    const fields = ["ID", "Name", "Address", "Phone", "Page"];
    const json2csvParser = new Parser({ fields });
    const csv = json2csvParser.parse(dataToExport);

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `user_data_page_${pageNumber}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleNextPage = () => {
    fetchData(pageNumber + 1);
  };

  const handlePreviousPage = () => {
    if (pageNumber > 0) {
      fetchData(pageNumber - 1);
    }
  };
  const onLoadMore = () => {
    fetchData(pageNumber + 1);
  };

  return (
    <div className="p-4 pt-8 w-full">
      <DataSelection
        options={options}
        selectedOption={selectedOption}
        onDropdownChange={setSelectedOption}
        sliderValue={sliderValue}
        onSliderChange={(e) => setSliderValue(e.target.value)}
        onInputChange={(e) => setSliderValue(Number(e.target.value))}
        seed={seed}
        onSeedChange={(e) => setSeed(e.target.value)}
        onFetchData={() => fetchData(0)}
      />

      {loading && <p className="mt-4">Loading data...</p>}
      {error && (
        <p className="mt-4 text-red-500">Error fetching data: {error}</p>
      )}

      <Table users={users} pageNumber={pageNumber} onLoadMore={onLoadMore} />
    </div>
  );
}

export default App;
