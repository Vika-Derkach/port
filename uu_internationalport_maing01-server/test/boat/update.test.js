const { TestHelper } = require("uu_appg01_server-test");

const useCase = "boat/update";

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

    const boatCreateDtoInType = {
      boatName: "gggnnkaaaaaa",
      licenseBoat: 3,
      pierId: pier.data.id,
    };

    const boat = await TestHelper.executePostCommand("boat/create", boatCreateDtoInType, session);

    const dtoIn = {
      boatName: "titanic",

      id: boat.data.id,
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

    const boatCreateDtoInType = {
      boatName: "gggnnkaaaaaa",
      licenseBoat: 3,
      pierId: pier.data.id,
    };

    const boat = await TestHelper.executePostCommand("boat/create", boatCreateDtoInType, session);

    const dtoIn = {
      boatName: "titanic",
      maxCapacity: 1,
      id: boat.data.id,
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
    const pierCreateDtoIn = {
      pierName: "pier2",
      maxCapacity: 1,
    };
    const pier = await TestHelper.executePostCommand("pier/create", pierCreateDtoIn, session);

    const boatCreateDtoInType = {
      boatName: "gggnnkaaaaaa",
      licenseBoat: 3,
      pierId: pier.data.id,
    };

    const boat = await TestHelper.executePostCommand("boat/create", boatCreateDtoInType, session);
    const dtoIn = {
      boatName: 1,

      id: boat.data.id,
    };

    try {
      await TestHelper.executePostCommand(useCase, dtoIn, session);
    } catch (e) {
      expect(e.status).toEqual(400);
      expect(e.code).toEqual(errorCode);
      expect(e.dtoOut.uuAppErrorMap).toBeDefined();
    }
  });
  test("Boat does not exist", async () => {
    expect.assertions(3);
    let session = await TestHelper.login("AwidLicenseOwner", false, false);

    const dtoIn = {
      boatName: "gggnnkaaaaaa",

      id: "60f73963fc79ac1c54b938af",
    };

    const errorCode = `uu-internationalport-main/${useCase}/boatDoesNotExist`;

    try {
      await TestHelper.executePostCommand(useCase, dtoIn, session);
    } catch (e) {
      expect(e.status).toEqual(400);
      expect(e.code).toEqual(errorCode);
      expect(e.dtoOut.uuAppErrorMap).toBeDefined();
    }
  });
});
