//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent, useDataList, useRef } from "uu5g04-hooks";
import Config from "./config/config";
import Calls from "../calls";
import PiersItem from "../bricks/piers-item";
import PortModal from "../bricks/port-modal";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "PiersList",
  nestingLevel: "bigBoxCollection",
  //@@viewOff:statics
};

export const PiersList = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    //@@viewOff:private
    const dataListResult = useDataList({
      handlerMap: {
        load: Calls.listPiers,
        createItem: Calls.createPiers,
      },
      itemHandlerMap: {
        load: Calls.getPiers,

        delete: Calls.deletePiers,
      },
      initialDtoIn: {
        sortBy: "pierName",
        order: "asc",
      },
    });

    const { state, data } = dataListResult;
    //@@viewOn:interface
    //@@viewOff:interface
    const pierListRef = useRef();
    function openCreatePiersModal() {
      pierListRef.current.openCreatePiersModal(dataListResult.handlerMap.createItem);
    }

    let loadPiers = () => {
      switch (state) {
        case "itemPending":
        case "ready":
          return (
            <div>
              <UU5.Bricks.Card width={200} className="uu5-common-padding-s">
                <UU5.Bricks.Text>Create new pier</UU5.Bricks.Text>

                <UU5.Bricks.Button colorSchema="blue" bgStyle="outline" onClick={openCreatePiersModal}>
                  <UU5.Bricks.Icon icon="uu5-plus" />
                </UU5.Bricks.Button>
              </UU5.Bricks.Card>

              {data?.map(({ data, handlerMap }) => {
                return (
                  <div>
                    {" "}
                    <PiersItem
                      key={data.id + "piers"}
                      data={data}
                      dataItemResult={dataListResult}
                      handlerMap={handlerMap}
                    />
                  </div>
                );
              })}
              <PortModal ref={pierListRef} />
            </div>
          );
        case "error":
          return <UU5.Bricks.Error />;
        default:
          return <UU5.Bricks.Loading />;
      }
    };
    //@@viewOn:render
    const className = Config.Css.css``;
    const attrs = UU5.Common.VisualComponent.getAttrs(props, className);
    const currentNestingLevel = UU5.Utils.NestingLevel.getNestingLevel(props, STATICS);

    return currentNestingLevel ? <div {...attrs}>{loadPiers()}</div> : null;
    //@@viewOff:render
  },
});

export default PiersList;
