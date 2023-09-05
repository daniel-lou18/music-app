function AppContainer({ children, hamburgerIsOpen }) {
  return (
    <div
      className={`app-container ${hamburgerIsOpen ? "hamburgerIsOpen" : ""}`}
    >
      {children}
    </div>
  );
}

export default AppContainer;
