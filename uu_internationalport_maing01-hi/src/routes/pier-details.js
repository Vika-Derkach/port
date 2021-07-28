//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent } from "uu5g04-hooks";
import Config from "./config/config";

import PierBasicInfo from "../bricks/pier-basic-info";
import BoatListView from "../bricks/boat-list-view";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "PierDetails",
  nestingLevel: "bigBoxCollection",
  //@@viewOff:statics
};

export const PierDetails = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:render
    const className = Config.Css.css``;
    const attrs = UU5.Common.VisualComponent.getAttrs(props, className);
    const currentNestingLevel = UU5.Utils.NestingLevel.getNestingLevel(props, STATICS);

    return currentNestingLevel ? (
      <div {...attrs}>
        <PierBasicInfo />
        <BoatListView />
      </div>
    ) : null;
    //@@viewOff:render
  },
});

export default PierDetails;
