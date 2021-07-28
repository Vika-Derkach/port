const { TestHelper } = require("uu_appg01_server-test");

const useCase = "pier/get";

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
      id: pier.data.id,
    };

    const result = await TestHelper.executeGetCommand(useCase, dtoIn, session);

    expect(result.status).toEqual(200);

    expect(typeof result.data.id).toEqual("string");
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
      id: pier.data.id,
      pierName: "pier2",
    };

    const result = await TestHelper.executeGetCommand(useCase, dtoIn, session);

    expect(result.status).toEqual(200);
    expect(result.data.uuAppErrorMap).toBeDefined();
    expect(result.data.uuAppErrorMap[errorCode]).toBeDefined();
  });

  test("Invalid DtoIn", async () => {
    expect.assertions(3);

    const errorCode = `uu-internationalport-main/${useCase}/invalidDtoIn`;
    let session = await TestHelper.login("AwidLicenseOwner", false, false);

    const dtoIn = {
      id: 2,
    };

    try {
      await TestHelper.executeGetCommand(useCase, dtoIn, session);
    } catch (e) {
      expect(e.status).toEqual(400);
      expect(e.code).toEqual(errorCode);
      expect(e.dtoOut.uuAppErrorMap).toBeDefined();
    }
  });
  test("Selected pier uuObject does not exist.", async () => {
    expect.assertions(3);
    let session = await TestHelper.login("AwidLicenseOwner", false, false);

    const dtoIn = {
      id: "60f844b60bcc2810e870c945",
    };

    const errorCode = `uu-internationalport-main/${useCase}/pierDoesNotExist`;

    try {
      await TestHelper.executeGetCommand(useCase, dtoIn, session);
    } catch (e) {
      expect(e.status).toEqual(400);
      expect(e.code).toEqual(errorCode);

      expect(e.dtoOut.uuAppErrorMap).toBeDefined();
    }
  });
});
