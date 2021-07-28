//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent } from "uu5g04-hooks";
import Config from "./config/config";

//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "BoatItem",
  nestingLevel: "bigBoxCollection",
  //@@viewOff:statics
};

export const BoatItem = createVisualComponent({
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
    const { data, handlerMap, openUpdateBoatModal } = props;
    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const className = Config.Css.css``;
    const attrs = UU5.Common.VisualComponent.getAttrs(props, className);
    const currentNestingLevel = UU5.Utils.NestingLevel.getNestingLevel(props, STATICS);
    const updateBoat = async (values) => {
      await handlerMap.update(values);
    };

    return currentNestingLevel ? (
      <div {...attrs}>
        <UU5.Bricks.Card className="uu5-common-padding-s">
          <UU5.Bricks.Button colorSchema="blue" bgStyle="outline" onClick={() => openUpdateBoatModal(data, updateBoat)}>
            Edit
          </UU5.Bricks.Button>
          <UU5.Bricks.Text>Boat Name: {data.boatName}</UU5.Bricks.Text>
          <UU5.Bricks.Text>Captain Name: {data.captainName}</UU5.Bricks.Text>

          <UU5.Bricks.Text>License Boat: {data.licenseBoat}</UU5.Bricks.Text>
          <UU5.Bricks.Text>Pier Id: {data.pierId}</UU5.Bricks.Text>
          <UU5.Bricks.Text>Docking From: {data.dockingFrom}</UU5.Bricks.Text>
        </UU5.Bricks.Card>
      </div>
    ) : null;
    //@@viewOff:render
  },
});

export default BoatItem;
