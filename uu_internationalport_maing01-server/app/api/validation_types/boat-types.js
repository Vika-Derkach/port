/* eslint-disable */
const boatCreateDtoInType = shape({
  boatName: string(200).isRequired(),
  captainName: string(200),

  licenseBoat: number().isRequired(),
  pierId: id().isRequired(),
  dockingFrom: datetime(),
});
const boatUpdateDtoInType = shape({
  id: id().isRequired(),
  boatName: string(200),
  captainName: string(200),
  licenseBoat: number(),
  dockingFrom: datetime(),
});
const boatListDtoInType = shape({
  pierId: id(),
  boatName: string(),

  sortBy: oneOf(["dockingFrom", "licenseBoat"]).isRequired(),
  order: oneOf(["asc", "desc"]),

  pageInfo: shape({
    // standart pageInfo
    pageSize: integer(),
    pageIndex: integer(),
  }),
});
