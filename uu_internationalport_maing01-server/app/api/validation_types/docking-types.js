/* eslint-disable */
const dockingCreateDtoInType = shape({
  boatId: id().isRequired(),
  boatName: string(200).isRequired(),
  captainName: string(200),
  pierId: id().isRequired(),
  dockingFrom: datetime().isRequired(),
  dockingTo: datetime().isRequired(),
});
