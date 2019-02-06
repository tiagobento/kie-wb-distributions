import { BusinessCentralCommunityHomePageProvider } from "../BusinessCentralCommunityHomePageProvider";
import { Profile } from "@kiegroup-ts-generated/kie-wb-common-profile-api";
import { AppFormer } from "appformer-js";
import * as HomeApi from "kie-wb-common-home-api";

const translationMap = new Map<string, string>([
  ["Heading", "Welcome to Business Central"],
  [
    "SubHeading",
    "Business Central offers a set of flexible tools that support " +
      "the way you need to work. Select a tool below to get started."
  ],
  ["Design", "Design"],
  ["DesignDescription.Full", "Create and modify {0} and {1}."],
  ["HomeProducer.Projects", "projects"],
  ["HomeProducer.Pages", "pages"],
  ["DesignDescription", "Create and modify {0}."],
  ["Deploy", "Deploy"],
  ["HomeProducer.Provisioning", "provisioning"],
  ["HomeProducer.Servers", "servers"],
  ["Manage", "Manage"],
  ["ManageDescription", "Access {0}, {1}, {2}, {3} and {4}."],
  ["HomeProducer.ProcessDefinitions", "process definitions"],
  ["HomeProducer.ProcessInstances", "process instances"],
  ["HomeProducer.Tasks", "tasks"],
  ["HomeProducer.Jobs", "jobs"],
  ["HomeProducer.ExecutionErrors", "executions errors"],
  ["Track", "Track"],
  ["TrackDescription", "View {0}, {1} and {2}."],
  ["HomeProducer.TaskInbox", "task inbox"],
  ["HomeProducer.ProcessReports", "process reports"],
  ["HomeProducer.TaskReports", "task reports"],
  ["DeployDescription2", "Administer {0} and {1}."],
  ["DeployDescription1", "Administer {0}."]
]);

describe("BusinessCentralCommunityHomePageProvider", () => {
  describe("get", () => {
    beforeEach(() => {
      jest.spyOn(HomeApi.AuthorizationManager, "hasAccessToPerspective").mockImplementation(() => true);
      AppFormer.prototype.translate = jest.fn((key: string): string => translationMap.get(key)!);
    });

    afterEach(() => {
      jest.resetAllMocks();
    });

    describe("with FULL profile", () => {
      const profile = Profile.FULL;

      test("should return consistent main data", () => {
        const model = new BusinessCentralCommunityHomePageProvider().get(profile);

        expect(model.welcomeText).toEqual("Welcome to Business Central");
        expect(model.description).toEqual(
          "Business Central offers a set of flexible tools that support the way you need to work. " +
            "Select a tool below to get started."
        );
        expect(model.backgroundImageUrl).toEqual("images/community_home_bg.jpg");

        const cards = model.cards;
        expect(cards).toHaveLength(4);
      });

      test("should return a correct design card", () => {
        const model = new BusinessCentralCommunityHomePageProvider().get(profile);

        const designCard = model.cards[0];
        expect(designCard.iconCssClasses).toStrictEqual(["pficon", "pficon-blueprint"]);
        expect(designCard.title).toEqual("Design");
        expect(designCard.perspectiveId).toEqual("LibraryPerspective");
        expect(designCard.onMayClick).toBeUndefined();

        const designDescription = designCard.description.elements;
        expect(designDescription).toHaveLength(5);

        expect(designDescription[0].isText()).toBeTruthy();
        expect((designDescription[0] as HomeApi.CardDescriptionTextElement).text).toEqual("Create and modify ");

        expect(designDescription[1].isLink()).toBeTruthy();
        expect((designDescription[1] as HomeApi.CardDescriptionLinkElement).text).toEqual("projects");
        expect((designDescription[1] as HomeApi.CardDescriptionLinkElement).targetId).toEqual("LibraryPerspective");

        expect(designDescription[2].isText()).toBeTruthy();
        expect((designDescription[2] as HomeApi.CardDescriptionTextElement).text).toEqual(" and ");

        expect(designDescription[3].isLink()).toBeTruthy();
        expect((designDescription[3] as HomeApi.CardDescriptionLinkElement).text).toEqual("pages");
        expect((designDescription[3] as HomeApi.CardDescriptionLinkElement).targetId).toEqual("ContentManagerPerspective");

        expect(designDescription[4].isText()).toBeTruthy();
        expect((designDescription[4] as HomeApi.CardDescriptionTextElement).text).toEqual(".");
      });

      test("with deployment authorized, should return a correct deploy card", () => {
        const model = new BusinessCentralCommunityHomePageProvider().get(profile);

        const deployCard = model.cards[1];
        expect(deployCard.iconCssClasses).toStrictEqual(["fa", "fa-gears"]);
        expect(deployCard.title).toEqual("Deploy");
        expect(deployCard.perspectiveId).toEqual("ServerManagementPerspective");
        expect(deployCard.onMayClick).toBeUndefined();

        const deployDescription = deployCard.description.elements;
        expect(deployDescription).toHaveLength(5);

        expect(deployDescription[0].isText()).toBeTruthy();
        expect((deployDescription[0] as HomeApi.CardDescriptionTextElement).text).toEqual("Administer ");

        expect(deployDescription[1].isLink()).toBeTruthy();
        expect((deployDescription[1] as HomeApi.CardDescriptionLinkElement).text).toEqual("provisioning");
        expect((deployDescription[1] as HomeApi.CardDescriptionLinkElement).targetId).toEqual(
          "ProvisioningManagementPerspective"
        );

        expect(deployDescription[2].isText()).toBeTruthy();
        expect((deployDescription[2] as HomeApi.CardDescriptionTextElement).text).toEqual(" and ");

        expect(deployDescription[3].isLink()).toBeTruthy();
        expect((deployDescription[3] as HomeApi.CardDescriptionLinkElement).text).toEqual("servers");
        expect((deployDescription[3] as HomeApi.CardDescriptionLinkElement).targetId).toEqual("ServerManagementPerspective");

        expect(deployDescription[4].isText()).toBeTruthy();
        expect((deployDescription[4] as HomeApi.CardDescriptionTextElement).text).toEqual(".");
      });

      test("with deployment unauthorized, should return a correct deploy card", () => {
        jest.spyOn(HomeApi.AuthorizationManager, "hasAccessToPerspective").mockImplementation(() => false);

        const model = new BusinessCentralCommunityHomePageProvider().get(profile);

        const deployCard = model.cards[1];
        expect(deployCard.iconCssClasses).toStrictEqual(["fa", "fa-gears"]);
        expect(deployCard.title).toEqual("Deploy");
        expect(deployCard.perspectiveId).toEqual("ServerManagementPerspective");
        expect(deployCard.onMayClick).toBeUndefined();

        //Administer {0}.
        const deployDescription = deployCard.description.elements;
        expect(deployDescription).toHaveLength(3);

        expect(deployDescription[0].isText()).toBeTruthy();
        expect((deployDescription[0] as HomeApi.CardDescriptionTextElement).text).toEqual("Administer ");

        expect(deployDescription[1].isLink()).toBeTruthy();
        expect((deployDescription[1] as HomeApi.CardDescriptionLinkElement).text).toEqual("servers");
        expect((deployDescription[1] as HomeApi.CardDescriptionLinkElement).targetId).toEqual("ServerManagementPerspective");

        expect(deployDescription[2].isText()).toBeTruthy();
        expect((deployDescription[2] as HomeApi.CardDescriptionTextElement).text).toEqual(".");
      });

      test("should return a correct manage card", () => {
        const model = new BusinessCentralCommunityHomePageProvider().get(profile);

        const manageCard = model.cards[2];
        expect(manageCard.iconCssClasses).toStrictEqual(["fa", "fa-briefcase"]);
        expect(manageCard.title).toEqual("Manage");
        expect(manageCard.perspectiveId).toEqual("ProcessInstances");
        expect(manageCard.onMayClick).toBeUndefined();

        const manageDescription = manageCard.description.elements;
        expect(manageDescription).toHaveLength(11);

        expect(manageDescription[0].isText()).toBeTruthy();
        expect((manageDescription[0] as HomeApi.CardDescriptionTextElement).text).toEqual("Access ");

        expect(manageDescription[1].isLink()).toBeTruthy();
        expect((manageDescription[1] as HomeApi.CardDescriptionLinkElement).text).toEqual("process definitions");
        expect((manageDescription[1] as HomeApi.CardDescriptionLinkElement).targetId).toEqual("ProcessDefinitions");

        expect(manageDescription[2].isText()).toBeTruthy();
        expect((manageDescription[2] as HomeApi.CardDescriptionTextElement).text).toEqual(", ");

        expect(manageDescription[3].isLink()).toBeTruthy();
        expect((manageDescription[3] as HomeApi.CardDescriptionLinkElement).text).toEqual("process instances");
        expect((manageDescription[3] as HomeApi.CardDescriptionLinkElement).targetId).toEqual("ProcessInstances");

        expect(manageDescription[4].isText()).toBeTruthy();
        expect((manageDescription[4] as HomeApi.CardDescriptionTextElement).text).toEqual(", ");

        expect(manageDescription[5].isLink()).toBeTruthy();
        expect((manageDescription[5] as HomeApi.CardDescriptionLinkElement).text).toEqual("tasks");
        expect((manageDescription[5] as HomeApi.CardDescriptionLinkElement).targetId).toEqual("TaskAdmin");

        expect(manageDescription[6].isText()).toBeTruthy();
        expect((manageDescription[6] as HomeApi.CardDescriptionTextElement).text).toEqual(", ");

        expect(manageDescription[7].isLink()).toBeTruthy();
        expect((manageDescription[7] as HomeApi.CardDescriptionLinkElement).text).toEqual("jobs");
        expect((manageDescription[7] as HomeApi.CardDescriptionLinkElement).targetId).toEqual("Requests");

        expect(manageDescription[8].isText()).toBeTruthy();
        expect((manageDescription[8] as HomeApi.CardDescriptionTextElement).text).toEqual(" and ");

        expect(manageDescription[9].isLink()).toBeTruthy();
        expect((manageDescription[9] as HomeApi.CardDescriptionLinkElement).text).toEqual("executions errors");
        expect((manageDescription[9] as HomeApi.CardDescriptionLinkElement).targetId).toEqual("ExecutionErrors");

        expect(manageDescription[10].isText()).toBeTruthy();
        expect((manageDescription[10] as HomeApi.CardDescriptionTextElement).text).toEqual(".");
      });

      test("should return a correct track card", () => {
        const model = new BusinessCentralCommunityHomePageProvider().get(profile);

        const trackCard = model.cards[3];
        expect(trackCard.iconCssClasses).toStrictEqual(["pficon", "pficon-trend-up"]);
        expect(trackCard.title).toEqual("Track");
        expect(trackCard.perspectiveId).toEqual("ProcessDashboardPerspective");
        expect(trackCard.onMayClick).toBeUndefined();

        const trackDescription = trackCard.description.elements;
        expect(trackDescription).toHaveLength(7);

        expect(trackDescription[0].isText()).toBeTruthy();
        expect((trackDescription[0] as HomeApi.CardDescriptionTextElement).text).toEqual("View ");

        expect(trackDescription[1].isLink()).toBeTruthy();
        expect((trackDescription[1] as HomeApi.CardDescriptionLinkElement).text).toEqual("task inbox");
        expect((trackDescription[1] as HomeApi.CardDescriptionLinkElement).targetId).toEqual("Tasks");

        expect(trackDescription[2].isText()).toBeTruthy();
        expect((trackDescription[2] as HomeApi.CardDescriptionTextElement).text).toEqual(", ");

        expect(trackDescription[3].isLink()).toBeTruthy();
        expect((trackDescription[3] as HomeApi.CardDescriptionLinkElement).text).toEqual("process reports");
        expect((trackDescription[3] as HomeApi.CardDescriptionLinkElement).targetId).toEqual("ProcessDashboardPerspective");

        expect(trackDescription[4].isText()).toBeTruthy();
        expect((trackDescription[4] as HomeApi.CardDescriptionTextElement).text).toEqual(" and ");

        expect(trackDescription[5].isLink()).toBeTruthy();
        expect((trackDescription[5] as HomeApi.CardDescriptionLinkElement).text).toEqual("task reports");
        expect((trackDescription[5] as HomeApi.CardDescriptionLinkElement).targetId).toEqual("TaskDashboardPerspective");

        expect(trackDescription[6].isText()).toBeTruthy();
        expect((trackDescription[6] as HomeApi.CardDescriptionTextElement).text).toEqual(".");
      });
    });

    describe("with PLANNER_AND_RULES profile", () => {
      const profile = Profile.PLANNER_AND_RULES;

      test("should return consistent main data", () => {
        const model = new BusinessCentralCommunityHomePageProvider().get(profile);

        expect(model.welcomeText).toEqual("Welcome to Business Central");
        expect(model.description).toEqual(
          "Business Central offers a set of flexible tools that support the way you need to work. " +
            "Select a tool below to get started."
        );
        expect(model.backgroundImageUrl).toEqual("images/community_home_bg.jpg");

        const cards = model.cards;
        expect(cards).toHaveLength(2);
      });

      test("should return a correct design card", () => {
        const model = new BusinessCentralCommunityHomePageProvider().get(profile);

        const designCard = model.cards[0];
        expect(designCard.iconCssClasses).toStrictEqual(["pficon", "pficon-blueprint"]);
        expect(designCard.title).toEqual("Design");
        expect(designCard.perspectiveId).toEqual("LibraryPerspective");
        expect(designCard.onMayClick).toBeUndefined();

        const designDescription = designCard.description.elements;
        expect(designDescription).toHaveLength(3);

        expect(designDescription[0].isText()).toBeTruthy();
        expect((designDescription[0] as HomeApi.CardDescriptionTextElement).text).toEqual("Create and modify ");

        expect(designDescription[1].isLink()).toBeTruthy();
        expect((designDescription[1] as HomeApi.CardDescriptionLinkElement).text).toEqual("projects");
        expect((designDescription[1] as HomeApi.CardDescriptionLinkElement).targetId).toEqual("LibraryPerspective");

        expect(designDescription[2].isText()).toBeTruthy();
        expect((designDescription[2] as HomeApi.CardDescriptionTextElement).text).toEqual(".");
      });

      test("with deployment authorized, should return a correct deploy card", () => {
        const model = new BusinessCentralCommunityHomePageProvider().get(profile);

        const deployCard = model.cards[1];
        expect(deployCard.iconCssClasses).toStrictEqual(["fa", "fa-gears"]);
        expect(deployCard.title).toEqual("Deploy");
        expect(deployCard.perspectiveId).toEqual("ServerManagementPerspective");
        expect(deployCard.onMayClick).toBeUndefined();

        const deployDescription = deployCard.description.elements;
        expect(deployDescription).toHaveLength(5);

        expect(deployDescription[0].isText()).toBeTruthy();
        expect((deployDescription[0] as HomeApi.CardDescriptionTextElement).text).toEqual("Administer ");

        expect(deployDescription[1].isLink()).toBeTruthy();
        expect((deployDescription[1] as HomeApi.CardDescriptionLinkElement).text).toEqual("provisioning");
        expect((deployDescription[1] as HomeApi.CardDescriptionLinkElement).targetId).toEqual(
          "ProvisioningManagementPerspective"
        );

        expect(deployDescription[2].isText()).toBeTruthy();
        expect((deployDescription[2] as HomeApi.CardDescriptionTextElement).text).toEqual(" and ");

        expect(deployDescription[3].isLink()).toBeTruthy();
        expect((deployDescription[3] as HomeApi.CardDescriptionLinkElement).text).toEqual("servers");
        expect((deployDescription[3] as HomeApi.CardDescriptionLinkElement).targetId).toEqual("ServerManagementPerspective");

        expect(deployDescription[4].isText()).toBeTruthy();
        expect((deployDescription[4] as HomeApi.CardDescriptionTextElement).text).toEqual(".");
      });

      test("with deployment unauthorized, should return a correct deploy card", () => {
        jest.spyOn(HomeApi.AuthorizationManager, "hasAccessToPerspective").mockImplementation(() => false);

        const model = new BusinessCentralCommunityHomePageProvider().get(profile);

        const deployCard = model.cards[1];
        expect(deployCard.iconCssClasses).toStrictEqual(["fa", "fa-gears"]);
        expect(deployCard.title).toEqual("Deploy");
        expect(deployCard.perspectiveId).toEqual("ServerManagementPerspective");
        expect(deployCard.onMayClick).toBeUndefined();

        //Administer {0}.
        const deployDescription = deployCard.description.elements;
        expect(deployDescription).toHaveLength(3);

        expect(deployDescription[0].isText()).toBeTruthy();
        expect((deployDescription[0] as HomeApi.CardDescriptionTextElement).text).toEqual("Administer ");

        expect(deployDescription[1].isLink()).toBeTruthy();
        expect((deployDescription[1] as HomeApi.CardDescriptionLinkElement).text).toEqual("servers");
        expect((deployDescription[1] as HomeApi.CardDescriptionLinkElement).targetId).toEqual("ServerManagementPerspective");

        expect(deployDescription[2].isText()).toBeTruthy();
        expect((deployDescription[2] as HomeApi.CardDescriptionTextElement).text).toEqual(".");
      });
    });
  });
});
