import * as AppFormer from "appformer-js";
import * as HomeApi from "kie-wb-common-home-api";
import { BusinessMonitoringProductHomePageProvider } from "./BusinessMonitoringProductHomePageProvider";

AppFormer.register(new HomeApi.HomeScreenAppFormerComponent(new BusinessMonitoringProductHomePageProvider()));
