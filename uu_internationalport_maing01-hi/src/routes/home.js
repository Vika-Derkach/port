//@@viewOn:imports
import UU5 from "uu5g04";
import "uu5g04-bricks";
import { createVisualComponent } from "uu5g04-hooks";
import Plus4U5 from "uu_plus4u5g01";
import "uu_plus4u5g01-bricks";

import Config from "./config/config.js";
import Lsi from "../config/lsi.js";

//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "Home",
  //@@viewOff:statics
};

const CLASS_NAMES = {
  welcomeRow: () => Config.Css.css`
    padding: 56px 0 20px;
    max-width: 624px;
    margin: 0 auto;
    text-align: center;
  
    ${UU5.Utils.ScreenSize.getMinMediaQueries("s", `text-align: left;`)}
  
    .uu5-bricks-header {
      margin-top: 8px;
    }
    
    .plus4u5-bricks-user-photo {
      margin: 0 auto;
    }
  `,
  welcome_port: () => Config.Css.css`
  
  text-align: center;
margin-left: 30%;
width: 30%;
 
`,
};

export const Home = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const attrs = UU5.Common.VisualComponent.getAttrs(props);
    return (
      <div {...attrs}>
        <Plus4U5.App.ArtifactSetter territoryBaseUri="" artifactId="" />

        <UU5.Bricks.Row className={CLASS_NAMES.welcomeRow()}>
          <UU5.Bricks.Column colWidth="x-12 s-9">
            <UU5.Bricks.Header level="2" content={<UU5.Bricks.Lsi lsi={Lsi.auth.welcome} />} />
            <UU5.Common.Identity>
              {({ identity }) => <UU5.Bricks.Header level="2" content={identity.name} />}
            </UU5.Common.Identity>
          </UU5.Bricks.Column>
        </UU5.Bricks.Row>

        <UU5.Bricks.Div className={CLASS_NAMES.welcome_port()}>
          <UU5.Bricks.Card className="uu5-common-padding-s" bgStyle="underline">
            <UU5.Bricks.Text>
              uuInternationalPort allows users to manage a port and to register boats docked there. There you can view
              details of a pier and see all boats parked at that pier. There is also an option to delete the pier, as
              well as an option to create a new boat. Also it is possible to change details of the boats that are
              already there.
            </UU5.Bricks.Text>
          </UU5.Bricks.Card>
        </UU5.Bricks.Div>
      </div>
    );
    //@@viewOff:render
  },
});

export default Home;
