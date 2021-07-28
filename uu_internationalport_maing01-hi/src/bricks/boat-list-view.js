//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent, useDataList, useRef } from "uu5g04-hooks";
import Config from "./config/config";

import Calls from "../calls";
import Uu5Tiles from "uu5tilesg02";
import BoatItem from "./boat-item";
import PortModal from "./port-modal";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "BoatListView",
  nestingLevel: "bigBoxCollection",
  //@@viewOff:statics
};

export const BoatListView = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    const url = UU5.Common.Url.parse(window.location.href);
    const urlId = url._parameters.id;
    const dataListResult = useDataList({
      handlerMap: {
        load: Calls.listBoats,
        createItem: Calls.createBoat,
      },
      itemHandlerMap: {
        update: Calls.updateBoat,
        delete: Calls.deletePiers,
      },
      initialDtoIn: {
        sortBy: "licenseBoat",
        order: "asc",
        pierId: urlId,
      },
    });
    const { state, data } = dataListResult;
    const pierBoatRef = useRef();

    function openCreateBoatModal() {
      pierBoatRef.current.openCreateBoatModal(dataListResult.handlerMap.createItem, urlId);
    }

    function openUpdateBoatModal(boat, callback) {
      pierBoatRef.current.openUpdateBoatModal(boat, callback);
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

              <UU5.Bricks.Card width={200} className="uu5-common-padding-s">
                <UU5.Bricks.Button colorSchema="blue" bgStyle="outline" onClick={openCreateBoatModal}>
                  Create
                </UU5.Bricks.Button>
              </UU5.Bricks.Card>

              {data?.map(({ data, handlerMap, urlId }) => {
                return (
                  <div>
                    <Uu5Tiles.ControllerProvider>
                      <BoatItem
                        key={data.id}
                        data={data}
                        dataItemResult={dataListResult}
                        handlerMap={handlerMap}
                        openUpdateBoatModal={openUpdateBoatModal}
                      />
                    </Uu5Tiles.ControllerProvider>
                  </div>
                );
              })}
              <PortModal ref={pierBoatRef} />
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

export default BoatListView;
