//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent } from "uu5g04-hooks";
import Config from "./config/config";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "PiersItem",
  nestingLevel: "bigBoxCollection",
  //@@viewOff:statics
};

export const PiersItem = createVisualComponent({
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
    const { data } = props;

    //@@viewOn:interface

    //@@viewOff:interface
    const getLocation = () => {
      if (data.location) {
        return <UU5.Bricks.Text>Location: {data.location}</UU5.Bricks.Text>;
      }
    };
    const goToDetailPage = () => {
      UU5.Environment.setRoute("pierDetails", { id: data.id });
    };
    //@@viewOn:render
    const className = Config.Css.css``;
    const attrs = UU5.Common.VisualComponent.getAttrs(props, className);
    const currentNestingLevel = UU5.Utils.NestingLevel.getNestingLevel(props, STATICS);

    return currentNestingLevel ? (
      <div {...attrs}>
        <UU5.Bricks.Card borderRadius="8px" className="uu5-common-padding-s" elevationHover="3">
          <UU5.Bricks.Div>
            <UU5.Bricks.Text>Pier Name: {data.pierName}</UU5.Bricks.Text>
            <UU5.Bricks.Text>Pier ID: {data.id}</UU5.Bricks.Text>
            {getLocation()}
            <UU5.Bricks.Text>Max Capacity: {data.maxCapacity}</UU5.Bricks.Text>
          </UU5.Bricks.Div>
          <UU5.Bricks.Div>
            <UU5.Bricks.Button colorSchema="blue" bgStyle="outline" onClick={goToDetailPage}>
              <UU5.Bricks.Icon icon="uu5-finder" />
            </UU5.Bricks.Button>
          </UU5.Bricks.Div>
        </UU5.Bricks.Card>
      </div>
    ) : null;
    //@@viewOff:render
  },
});

export default PiersItem;
