const { TestHelper } = require("uu_appg01_server-test");
const useCase = "boat/create";

beforeAll(async () => {
  await TestHelper.setup();
  await TestHelper.initUuSubAppInstance();
  await TestHelper.createUuAppWorkspace();
  await TestHelper.initUuAppWorkspace({ uuAppProfileAuthorities: "urn:uu:GGPLUS4U", state: "active" });
});

afterAll(async () => {
  await TestHelper.teardown();
});

describe(`Testing ${useCase} uuCmd...`, () => {
  test("HDS", async () => {
    let session = await TestHelper.login("AwidLicenseOwner", false, false);

    const pierCreateDtoIn = {
      pierName: "pier2",
      maxCapacity: 1,
    };

    const pier = await TestHelper.executePostCommand("pier/create", pierCreateDtoIn, session);

    const dtoIn = {
      boatName: "titanic",
      licenseBoat: 1234,
      pierId: pier.data.id,
    };

    const result = await TestHelper.executePostCommand(useCase, dtoIn, session);

    expect(result.status).toEqual(200);
    expect(result.data.boatName).toEqual("titanic");
    expect(result.data.uuAppErrorMap).toBeDefined();
  });

  test("unsupported keys", async () => {
    let session = await TestHelper.login("AwidLicenseOwner", false, false);
    const errorCode = `uu-internationalport-main/${useCase}/unsupportedKeys`;
    const pierCreateDtoIn = {
      pierName: "pier2",
      maxCapacity: 1,
    };

    const pier = await TestHelper.executePostCommand("pier/create", pierCreateDtoIn, session);

    const dtoIn = {
      boatName: "titanic",
      licenseBoat: 1234,
      pierId: pier.data.id,
      name: "vika",
    };

    const result = await TestHelper.executePostCommand(useCase, dtoIn, session);

    expect(result.status).toEqual(200);
    expect(result.data.uuAppErrorMap).toBeDefined();
    expect(result.data.uuAppErrorMap[errorCode]).toBeDefined();
  });

  test("Invalid DtoIn", async () => {
    expect.assertions(3);

    const errorCode = `uu-internationalport-main/${useCase}/invalidDtoIn`;
    let session = await TestHelper.login("AwidLicenseOwner", false, false);

    const dtoIn = {
      boatName: "titanic",
      pierId: 1,
      licenseBoat: 1234,
    };

    try {
      await TestHelper.executePostCommand(useCase, dtoIn, session);
    } catch (e) {
      expect(e.status).toEqual(400);
      expect(e.code).toEqual(errorCode);
      expect(e.dtoOut.uuAppErrorMap).toBeDefined();
    }
  });
  test("Selected pier uuObject does not exist", async () => {
    expect.assertions(3);
    let session = await TestHelper.login("AwidLicenseOwner", false, false);

    const dtoIn = {
      boatName: "titanic",
      licenseBoat: 1234,
      pierId: "60f82cbefe552f3fc4e4f990",
    };

    const errorCode = `uu-internationalport-main/${useCase}/pierDoesNotExist`;

    try {
      await TestHelper.executePostCommand(useCase, dtoIn, session);
    } catch (e) {
      expect(e.status).toEqual(400);
      expect(e.code).toEqual(errorCode);
      expect(e.dtoOut.uuAppErrorMap).toBeDefined();
    }
  });
});
