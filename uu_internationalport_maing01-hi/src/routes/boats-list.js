//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent, useDataList, useState, useRef } from "uu5g04-hooks";

import Config from "./config/config";
import Calls from "../calls";
import BoatItem from "../bricks/boat-item";
import PortModal from "../bricks/port-modal";

//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "BoatsList",
  nestingLevel: "bigBoxCollection",
  //@@viewOff:statics
};

export const BoatsList = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    const initialDtoIn = {
      sortBy: "licenseBoat",
      order: "asc",
    };
    const dataListResult = useDataList({
      handlerMap: {
        load: Calls.listBoats,
        createItem: Calls.createBoat,
      },
      itemHandlerMap: {
        update: Calls.updateBoat,
      },
      initialDtoIn,
    });
    const { state, data, handlerMap } = dataListResult;

    const [order, setOrder] = useState(initialDtoIn.order);
    const [sort, setSort] = useState(initialDtoIn.sortBy);
    const boatRef = useRef();
    const applySort = (sort, order) => {
      handlerMap.load({ sortBy: sort, order });
    };
    const changeOrder = (newOrder) => {
      setOrder(newOrder);
      applySort(sort, newOrder);
    };
    const changeSort = (newSort) => {
      setSort(newSort);
      applySort(newSort, order);
    };

    function openUpdateBoatModal(boat, callback) {
      boatRef.current.openUpdateBoatModal(boat, callback);
    }
    let loadBoats = () => {
      switch (state) {
        case "itemPending":
        case "ready":
          return (
            <div>
              <UU5.Bricks.Card width={200} className="uu5-common-padding-s">
                <UU5.Bricks.Text>List of boats</UU5.Bricks.Text>
              </UU5.Bricks.Card>
              <UU5.Bricks.Dropdown label="Order" size="l" bgStyle="transparent" colorSchema="blue">
                <UU5.Bricks.Dropdown.Item label="asc" onClick={() => changeOrder("asc")} />
                <UU5.Bricks.Dropdown.Item label="desc" onClick={() => changeOrder("desc")} />
              </UU5.Bricks.Dropdown>
              <UU5.Bricks.Dropdown label="Sorting" size="l" bgStyle="transparent" colorSchema="blue">
                <UU5.Bricks.Dropdown.Item label="dockingFrom" onClick={() => changeSort("dockingFrom")} />
                <UU5.Bricks.Dropdown.Item label="licenseBoat" onClick={() => changeSort("licenseBoat")} />
              </UU5.Bricks.Dropdown>
              {data?.map(({ data, handlerMap }) => {
                return (
                  <div>
                    {" "}
                    <BoatItem
                      openUpdateBoatModal={openUpdateBoatModal}
                      key={data.id}
                      data={data}
                      dataItemResult={dataListResult}
                      handlerMap={handlerMap}
                    />
                  </div>
                );
              })}

              <PortModal ref={boatRef} />
            </div>
          );
        case "error":
          return <UU5.Bricks.Error />;
        default:
          return <UU5.Bricks.Loading />;
      }
    };

    const className = Config.Css.css``;
    const attrs = UU5.Common.VisualComponent.getAttrs(props, className);
    const currentNestingLevel = UU5.Utils.NestingLevel.getNestingLevel(props, STATICS);

    return currentNestingLevel ? <div {...attrs}>{loadBoats()}</div> : null;
    //@@viewOff:render
  },
});

export default BoatsList;
