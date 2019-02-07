import * as AppFormer from "appformer-js";
import * as HomeApi from "kie-wb-common-home-api";
import { BusinessCentralCommunityHomePageProvider } from "./BusinessCentralCommunityHomePageProvider";

AppFormer.register(new HomeApi.HomeScreenAppFormerComponent(new BusinessCentralCommunityHomePageProvider()));
