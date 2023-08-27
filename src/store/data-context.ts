import { createContext } from "react";

import { DataContextInterface } from "../interfaces/interfaces";

const DataContext = createContext<DataContextInterface | null>(null);

export default DataContext;
