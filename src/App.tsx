import { ChangeEvent, useEffect, useState } from "react";
import { Grid, GridItem, HStack } from "@chakra-ui/react";
import FetchData from "./components/FetchData";
import NavBar from "./components/Navbar";
import DropDown from "./components/DropDown";
import { NewEmployeeType, typesearch } from "./types/employee";
import { DocumentData, QuerySnapshot, onSnapshot } from "firebase/firestore";
import { empresa_colecction } from "./lb/controller";
import InfiniteScrollTable from "./components/infiniteScroll/InfiniteScrollTable";
import { Text } from "@chakra-ui/react";
import useGetEmployee from "./hooks/useGetEmployee";
import InfiniteScrollCtablePrueba from "./components/infiniteScroll/InfiniteScrollTablePruebaa";

function App() {
  const [users, setUsers] = useState<NewEmployeeType[]>([]);
  const [search, setSearch] = useState("");
  const [company, setCompany] = useState<NewEmployeeType[]>([]);
  const [usersfilter, setUsersfilter] = useState<NewEmployeeType[]>([]);

  //const [clickSearch, setClickSearch] = useState(false);

  // Manejar cambios en el input de búsqueda
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    filter(e.target.value);
  };

  const filter = (searchTerm: string) => {
    if (searchTerm === "") {
      setUsersfilter(company);
      //setClickSearch(false);
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
      setUsersfilter(resultsSearch);
    }
  };

  const filter_grid = (searchTerm: string, filter: typesearch) => {
    let resultsSearch = company.filter((element) => {
      if (
        element[filter]
          ?.toString()
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      ) {
        return element;
      }
    });
    setSearch("");
    setUsersfilter(resultsSearch);
    //setClickSearch(!clickSearch);
  };

  useGetEmployee({ setCompany, setUsers, setUsersfilter });

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
        <HStack spacing={5} paddingLeft={2} marginBottom={30} padding={5}>
          <DropDown
            search={search}
            company={users}
            onChange={handleSearchChange}
            onClick={(e) => filter_grid(e, typesearch.nombre)}
            onIconClick={(e) => filter_grid(e, typesearch.nombre)}
          />
        </HStack>

        <HStack paddingLeft={5}>
          {/* <FetchData company={usersfilter} /> */}
        </HStack>
        {/* <InfiniteScrollC
          company={company}
          onClick={(e) => filter_grid(e, typesearch.nombre)}
        /> */}
        <div style={{ textAlign: "center" }}>
          <Text fontSize="5xl">Infinite Scroll</Text>
        </div>

        <div>
          {/* <InfiniteScrollTable
            company={company}
            onClick={(e) => filter_grid(e, typesearch.nombre)}
          /> */}

          <InfiniteScrollCtablePrueba
            company={usersfilter}
            onClick={(e) => filter_grid(e, typesearch.nombre)}
          />
        </div>
      </GridItem>
    </Grid>
  );
}

export default App;
