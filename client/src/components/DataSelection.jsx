import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import { FaRandom } from "react-icons/fa";

const DataSelection = ({
  options,
  selectedOption,
  onDropdownChange,
  sliderValue,
  onSliderChange,
  onInputChange,
  seed,
  onSeedChange,
  onFetchData,
  exportToCSV,
  handleFetchDataWithSeed,
}) => {
  return (
    <div className="flex items-center justify-between space-x-4 w-full">
      <div className="flex-1">
        <Dropdown
          options={options}
          onChange={onDropdownChange}
          value={selectedOption}
          placeholder="Select Region"
        />
      </div>
      <div className="flex-1 flex items-center space-x-2">
        <label className="text-sm font-medium">Errors per Record</label>
        <input
          type="range"
          min="0"
          max="10"
          step="0.5"
          value={sliderValue}
          onChange={onSliderChange}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
        <input
          type="number"
          min="0"
          max="1000"
          step="0.5"
          value={sliderValue}
          onChange={onInputChange}
          className="w-16 p-1 text-sm text-center border border-gray-300 rounded"
        />
      </div>
      <div className="flex-1 flex items-center space-x-2">
        <label className="text-sm font-medium">Seed</label>
        <input
          type="text"
          value={seed}
          onChange={onSeedChange}
          className="border border-gray-300 rounded p-1 text-sm w-full"
          placeholder="Enter seed"
        />
        <button
          className="bg-blue-500 text-white px-2 py-1 rounded flex items-center text-sm"
          onClick={onFetchData}
        >
          <FaRandom className="mr-1" />
          Random
        </button>
      </div>
      <div className="flex-1 flex justify-end">
        <button
          className="bg-green-500 text-white px-3 py-1 rounded text-sm ml-2"
          onClick={exportToCSV}
        >
          Export to CSV
        </button>
      </div>
    </div>
  );
};

export default DataSelection;
