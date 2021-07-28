const { TestHelper } = require("uu_appg01_server-test");

const useCase = "boat/list";

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
      pierId: pier.data.id,
      sortBy: "licenseBoat",
      order: "desc",
      pageInfo: {
        pageIndex: 0,
        pageSize: 6,
      },
    };

    const result = await TestHelper.executeGetCommand(useCase, dtoIn, session);

    expect(result.status).toEqual(200);

    expect(typeof result.data.pageInfo).toEqual("object");
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
      pierId: pier.data.id,
      sortBy: "licenseBoat",
      order: "desc",
      pageInfo: {
        pageIndex: 0,
        pageSize: 6,
      },
      maxCapacity: 1,
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

    const pierCreateDtoIn = {
      pierName: "pier2",
      maxCapacity: 1,
    };

    const pier = await TestHelper.executePostCommand("pier/create", pierCreateDtoIn, session);

    const dtoIn = {
      pierId: pier.data.id,
      sortBy: 1,
      order: "desc",
      pageInfo: {
        pageIndex: 0,
        pageSize: 6,
      },
    };

    try {
      await TestHelper.executeGetCommand(useCase, dtoIn, session);
    } catch (e) {
      expect(e.status).toEqual(400);
      expect(e.code).toEqual(errorCode);
      expect(e.dtoOut.uuAppErrorMap).toBeDefined();
    }
  });
});
