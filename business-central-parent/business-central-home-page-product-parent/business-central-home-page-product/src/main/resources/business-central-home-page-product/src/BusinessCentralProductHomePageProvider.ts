import * as HomeApi from "kie-wb-common-home-api";
import { Profile } from "@kiegroup-ts-generated/kie-wb-common-profile-api";
import * as AppFormer from "appformer-js";

export class BusinessCentralProductHomePageProvider implements HomeApi.HomeScreenProvider {
  public get(profile: Profile): HomeApi.HomeScreen {
    switch (profile) {
      case Profile.PLANNER_AND_RULES:
        return this.buildPlannerAndRulesScreen();
      case Profile.FULL:
      default:
        return this.buildFullScreen();
    }
  }

  private buildFullScreen() {
    const welcomeText = AppFormer.translate("Heading", []);
    const description = AppFormer.translate("SubHeading", []);
    const backgroundImageUrl = "images/product_home_bg.png";

    const cards = [this.fullProfileDesignCard(), this.deployCard(), this.manageCard(), this.trackCard()];

    return new HomeApi.HomeScreen(welcomeText, description, backgroundImageUrl, cards);
  }

  private buildPlannerAndRulesScreen() {
    const welcomeText = AppFormer.translate("Heading.DecisionManager", []);
    const description = AppFormer.translate("SubHeading.DecisionManager", []);
    const backgroundImageUrl = "images/product_home_bg.png";

    const cards = [this.plannerAndRulesProfileDesignCard(), this.deployCard()];

    return new HomeApi.HomeScreen(welcomeText, description, backgroundImageUrl, cards);
  }

  private fullProfileDesignCard() {
    const cssClasses = ["pficon", "pficon-blueprint"];
    const title = AppFormer.translate("Design", []);
    const descriptionTextMask = AppFormer.translate("DesignDescription.Full", []);
    const description = new HomeApi.CardDescriptionBuilder(descriptionTextMask)
      .addLink(AppFormer.translate("HomeProducer.Projects", []), "LibraryPerspective")
      .addLink(AppFormer.translate("HomeProducer.Pages", []), "ContentManagerPerspective")
      .build();

    return new HomeApi.Card(cssClasses, title, description, "LibraryPerspective");
  }

  private plannerAndRulesProfileDesignCard() {
    const cssClasses = ["pficon", "pficon-blueprint"];
    const title = AppFormer.translate("Design", []);
    const descriptionTextMask = AppFormer.translate("DesignDescription", []);
    const description = new HomeApi.CardDescriptionBuilder(descriptionTextMask)
      .addLink(AppFormer.translate("HomeProducer.Projects", []), "LibraryPerspective")
      .build();

    return new HomeApi.Card(cssClasses, title, description, "LibraryPerspective");
  }

  private deployCard() {
    const cssClasses = ["fa", "fa-gears"];
    const title = AppFormer.translate("Deploy", []);
    const serverManagementPerspective = "ServerManagementPerspective";

    const deploymentAuthorized = HomeApi.AuthorizationManager.hasAccessToPerspective(serverManagementPerspective);

    const description = new HomeApi.CardDescriptionBuilder(this.getDeployCardDescription(deploymentAuthorized))
      .addLinkIf(
        () => deploymentAuthorized,
        AppFormer.translate("HomeProducer.Provisioning", []),
        "ProvisioningManagementPerspective"
      )
      .addLink(AppFormer.translate("HomeProducer.Servers", []), serverManagementPerspective)
      .build();

    return new HomeApi.Card(cssClasses, title, description, serverManagementPerspective);
  }

  private manageCard() {
    const cssClasses = ["fa", "fa-briefcase"];
    const title = AppFormer.translate("Manage", []);

    const descriptionTextMask = AppFormer.translate("ManageDescription", []);
    const description = new HomeApi.CardDescriptionBuilder(descriptionTextMask)
      .addLink(AppFormer.translate("HomeProducer.ProcessDefinitions", []), "ProcessDefinitions")
      .addLink(AppFormer.translate("HomeProducer.ProcessInstances", []), "ProcessInstances")
      .addLink(AppFormer.translate("HomeProducer.Tasks", []), "TaskAdmin")
      .addLink(AppFormer.translate("HomeProducer.Jobs", []), "Requests")
      .addLink(AppFormer.translate("HomeProducer.ExecutionErrors", []), "ExecutionErrors")
      .build();

    return new HomeApi.Card(cssClasses, title, description, "ProcessInstances");
  }

  private trackCard() {
    const cssClasses = ["pficon", "pficon-trend-up"];
    const title = AppFormer.translate("Track", []);

    const descriptionTextMask = AppFormer.translate("TrackDescription", []);
    const description = new HomeApi.CardDescriptionBuilder(descriptionTextMask)
      .addLink(AppFormer.translate("HomeProducer.TaskInbox", []), "Tasks")
      .addLink(AppFormer.translate("HomeProducer.ProcessReports", []), "ProcessDashboardPerspective")
      .addLink(AppFormer.translate("HomeProducer.TaskReports", []), "TaskDashboardPerspective")
      .build();

    return new HomeApi.Card(cssClasses, title, description, "ProcessDashboardPerspective");
  }

  private getDeployCardDescription(deploymentAuthorized: boolean) {
    if (deploymentAuthorized) {
      return AppFormer.translate("DeployDescription2", []);
    }

    return AppFormer.translate("DeployDescription1", []);
  }
}
