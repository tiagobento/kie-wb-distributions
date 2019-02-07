import * as AppFormer from "appformer-js";
import * as HomeApi from "kie-wb-common-home-api";
import { BusinessMonitoringCommunityHomePageProvider } from "./BusinessMonitoringCommunityHomePageProvider";

AppFormer.register(new HomeApi.HomeScreenAppFormerComponent(new BusinessMonitoringCommunityHomePageProvider()));
