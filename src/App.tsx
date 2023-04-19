import { ChangeEvent, useEffect, useState } from "react";
import {
  Button,
  ButtonGroup,
  Grid,
  GridItem,
  HStack,
  Show,
} from "@chakra-ui/react";
import FetchData from "./components/FetchData";
import NavBar from "./components/Navbar";
import DropDown from "./components/DropDown";
import { NewEmployeeType } from "./types/employee";
import {
  DocumentData,
  QuerySnapshot,
  onSnapshot,
  where,
  query,
} from "firebase/firestore";
import { empresa_colecction } from "./lb/controller";

function App() {
  const [users, setUsers] = useState<NewEmployeeType[]>([]);
  const [search, setSearch] = useState("");
  const [company, setCompany] = useState<NewEmployeeType[]>([]);
  const [usersfilter, setUsersfilter] = useState<NewEmployeeType[]>([]);

  // Manejar cambios en el input de búsqueda
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    filter(e.target.value);
    console.log(e.target.value);
  };

  const filter = (searchTerm: string) => {
    if (searchTerm === "") {
      setUsersfilter(company);
    } else {
      let resultsSearch = company.filter((element) => {
        if (
          element.nombre
            ?.toString()
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
        ) {
          return element;
        }
      });
      setUsers(resultsSearch);
    }
  };

  const filter_grid = (searchTerm: string) => {
    let resultsSearch = company.filter((element) => {
      if (
        element.nombre
          ?.toString()
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      ) {
        return element;
      }
    });
    setSearch(searchTerm);
    setUsersfilter(resultsSearch);
  };

  useEffect(
    () =>
      onSnapshot(
        empresa_colecction,
        (snapshot: QuerySnapshot<DocumentData>) => {
          setCompany(
            snapshot.docs.map((doc) => {
              return {
                id: doc.id,
                ...doc.data(),
              };
            })
          );

          setUsers(
            snapshot.docs.map((doc) => {
              return {
                id: doc.id,
                ...doc.data(),
              };
            })
          );

          setUsersfilter(
            snapshot.docs.map((doc) => {
              return {
                id: doc.id,
                ...doc.data(),
              };
            })
          );
        }
      ),
    []
  );
  console.log(company);
  return (
    <Grid
      templateAreas={{
        base: `"nav" "main"`,
        lg: `"nav nav" "aside main"`,
      }}
      templateColumns={{
        base: "1fr",
        lg: "100px 1fr",
      }}
    >
      <GridItem area="nav">
        <NavBar />
      </GridItem>
      {/* <Show above="lg">
        mostrar empleados por categoria
      </Show>{" "} */}

      <GridItem area="main" padding={10}>
        <HStack spacing={5} paddingLeft={2} marginBottom={50} padding={5}>
          <DropDown
            search={search}
            company={users}
            onChange={handleSearchChange}
            onClick={(e) => filter_grid(e)}
          />
        </HStack>

        <HStack paddingLeft={5}>
          <FetchData company={usersfilter} />
        </HStack>
      </GridItem>
    </Grid>
  );
}

export default App;
