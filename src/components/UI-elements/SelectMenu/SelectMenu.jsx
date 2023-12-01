import styles from "./SelectMenu.module.css";

function SelectMenu({ options, onChange, value }) {
  return (
    <select className={styles.select} onChange={onChange} value={value}>
      {options.map((option) => (
        <option value={option.value} key={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

export default SelectMenu;
