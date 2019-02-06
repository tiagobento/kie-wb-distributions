import * as AppFormer from "appformer-js";
import * as HomeApi from "kie-wb-common-home-api";
import { BusinessCentralProductHomePageProvider } from "./BusinessCentralProductHomePageProvider";

AppFormer.register(new HomeApi.HomeScreenAppFormerComponent(new BusinessCentralProductHomePageProvider()));
