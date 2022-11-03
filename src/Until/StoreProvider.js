import { useState, createContext } from "react";

const StoreContext = createContext(null);

const StoreProvider = ({ children }) => {
  const teamMembersNames = ["John", "Mary", "Jason", "David"];

  const [nameTeacher, setNameTeacher] = useState("Tin");
  const [help, setHelp] = useState([]);
  const [pairing, setPairing] = useState(teamMembersNames);

  const store = {
    nameTeacher: [nameTeacher, setNameTeacher],
    help: [help, setHelp],
    pairing: [pairing, setPairing]
  };
  

  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};
export {StoreContext};
export default StoreProvider;