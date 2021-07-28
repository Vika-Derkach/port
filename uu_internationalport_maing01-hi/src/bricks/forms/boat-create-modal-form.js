//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent } from "uu5g04-hooks";
import Config from "./config/config";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "BoatCreateModalForm",
  nestingLevel: "bigBoxCollection",
  //@@viewOff:statics
};

export const BoatCreateModalForm = createVisualComponent({
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
    const { callback, closeCallback, urlId } = props;

    //@@viewOn:private
    const handleCreate = async ({ values, component }) => {
      values.pierId = urlId;
      component.setPending();
      try {
        await callback(values);
      } catch (e) {
        component
          .getAlertBus()
          .setAlert({ content: "Pier was failed to create.", colorSchema: "danger", closeTimer: 1000 });
      }
      component.getAlertBus().setAlert({ content: "Pier was saved.", colorSchema: "success", closeTimer: 1000 });

      component.reset();
      component.setReady();

      component.getAlertBus().clearAlerts();
    };
    //@@viewOff:private
    const className = Config.Css.css``;
    const attrs = UU5.Common.VisualComponent.getAttrs(props, className);
    const currentNestingLevel = UU5.Utils.NestingLevel.getNestingLevel(props, STATICS);

    return currentNestingLevel ? (
      <div {...attrs}>
        <UU5.Forms.ContextSection>
          <UU5.Forms.ContextForm onSave={handleCreate} onCancel={closeCallback}>
            <UU5.Forms.Text label={"Boat Name"} name="boatName" required />
            <UU5.Forms.Text label={"License Boat"} name="licenseBoat" required />
            <UU5.Forms.Text label={"Captain Name"} name="captainName" />
            <UU5.Forms.Text label={"DockingFrom"} name="dockingFrom" />
          </UU5.Forms.ContextForm>
          <UU5.Forms.ContextControls
            align={"center"}
            buttonSubmitProps={{ content: "Create" }}
            buttonCancelProps={{ content: "Cancel" }}
          />
        </UU5.Forms.ContextSection>
      </div>
    ) : null;
    //@@viewOff:render
  },
});

export default BoatCreateModalForm;
