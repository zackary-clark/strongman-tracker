import Keycloak from "keycloak-js";
import { createContext, useContext } from "react";

const defaultKeycloak = new Keycloak();

export const KeycloakContext = createContext(defaultKeycloak);

export const useKeycloak = (): Keycloak => (useContext(KeycloakContext));
