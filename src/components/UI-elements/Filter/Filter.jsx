import { useSearchParams } from "react-router-dom";
import styles from "./Filter.module.css";
import Button from "../Button";

function Filter({ fieldName, options }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentFieldValue = searchParams.get("subscription") || "all";
  const handleClick = (fieldValue) => {
    searchParams.set(fieldName, fieldValue);
    setSearchParams(searchParams);
  };
  return (
    <div className={`${styles.filterContainer} filterContainer`}>
      {options.map((option) => (
        <Button
          onClick={() => handleClick(option.value)}
          text={option.label}
          className={option.value === currentFieldValue ? "active" : ""}
          disabled={option.value === currentFieldValue}
          key={option.value}
        />
      ))}
    </div>
  );
}

export default Filter;
