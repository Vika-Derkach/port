//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent, useDataList, useRef, useState } from "uu5g04-hooks";
import Config from "./config/config";
import Calls from "../calls";
import UuP from "uu_pg01";
import PortModal from "./port-modal";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "PiersDetailsItem",
  nestingLevel: "bigBoxCollection",
  //@@viewOff:statics
};

export const PierBasicInfo = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const url = UU5.Common.Url.parse(window.location.href);
    const urlId = url._parameters.id;
    const dataItemResult = useDataList({
      handlerMap: {
        load: Calls.listPiers,
        createItem: Calls.createPiers,

        delete: Calls.deletePiers,
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
    //@@viewOff:private

    let { data, state, handlerMap } = dataItemResult;
    const deleteListRef = useRef();
    const [isShowNotise, setIsShowNotise] = useState(false);

    const deleteCallback = async () => {
      try {
        await handlerMap.delete({ id: urlId, forceDelete: true });
        UU5.Environment.setRoute("piersList");
      } catch (e) {
        if (e.code === "uu-internationalport-main/pier/delete/relatedBoatsExist") {
          setIsShowNotise(true);
        }
      }
    };
    function openDeletePierConfirm() {
      deleteListRef.current.openDeletePierConfirm(data, deleteCallback);
    }
    const findData = data?.find(({ data }) => data.id === urlId);
    const getLocation = () => {
      if (data.location) {
        return <UU5.Bricks.Text>Location: {findData.data.location}</UU5.Bricks.Text>;
      }
    };

    let getDetail = () => {
      switch (state) {
        case "itemPending":
        case "ready":
          return (
            <div>
              <UU5.Bricks.Card borderRadius="8px" className="uu5-common-padding-s" elevationHover="3">
                <UU5.Bricks.Text>All information about {findData.data.pierName}</UU5.Bricks.Text>
              </UU5.Bricks.Card>
              <UuP.Bricks.ComponentWrapper>
                <UuP.Bricks.BasicInfo borderRadius="8px" className="uu5-common-padding-s" elevationHover="3">
                  <UU5.Bricks.Text> PierId {findData.data.id}</UU5.Bricks.Text>
                  {getLocation()}
                  <UU5.Bricks.Text> Max Capacity {findData.data.maxCapacity}</UU5.Bricks.Text>
                </UuP.Bricks.BasicInfo>
                <UU5.Bricks.Button colorSchema="red" onClick={openDeletePierConfirm}>
                  <UU5.Bricks.Icon icon="uu5-cross" />
                </UU5.Bricks.Button>
              </UuP.Bricks.ComponentWrapper>

              <PortModal ref={deleteListRef} />
              {isShowNotise && (
                <UU5.Bricks.Card className="uu5-common-padding-s" bgStyle="underline" colorSchema="red">
                  <UU5.Bricks.Text>Selected pier has related boats</UU5.Bricks.Text>
                  <UU5.Bricks.Button colorSchema="red" onClick={() => setIsShowNotise(false)}>
                    <UU5.Bricks.Icon icon="uu5-cross" />
                  </UU5.Bricks.Button>
                </UU5.Bricks.Card>
              )}
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

    return currentNestingLevel ? <div {...attrs}>{getDetail()}</div> : null;
    //@@viewOff:render
  },
});

export default PierBasicInfo;
