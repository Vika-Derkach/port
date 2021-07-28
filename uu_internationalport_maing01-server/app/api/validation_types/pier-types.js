/* eslint-disable */
const pierCreateDtoInType = shape({
  pierName: string(100).isRequired(),
  location: string(200),
  maxCapacity: number().isRequired(),
});
const pierGetDtoInType = shape({
  id: id().isRequired(),
});
const pierDeleteDtoInType = shape({
  id: id().isRequired(),
  forceDelete: boolean(),
});
const pierListDtoInType = shape({
  maxCapacity: number(),

  sortBy: oneOf(["pierName", "location"]).isRequired(),
  order: oneOf(["asc", "desc"]),

  pageInfo: shape({
    // standart pageInfo
    pageSize: integer(),
    pageIndex: integer(),
  }),
});
