//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent } from "uu5g04-hooks";
import Config from "./config/config";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "BoatUpdateModalForm",
  nestingLevel: "bigBoxCollection",
  //@@viewOff:statics
};

export const BoatUpdateModalForm = createVisualComponent({
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
    const { callback, closeCallback } = props;
    //@@viewOn:private

    const handleUpdate = async ({ values, component }) => {
      component.setPending();

      try {
        await callback({ ...values, dockingFrom: new Date(values.dockingFrom) });
      } catch (e) {
        component
          .getAlertBus()
          .setAlert({ content: "Boat was failed to update.", colorSchema: "danger", closeTimer: 1000 });
      }
      component.getAlertBus().setAlert({ content: "Boat was updated.", colorSchema: "success", closeTimer: 1000 });

      component.reset();
      component.setReady();
      component.getAlertBus().clearAlerts();
    };
    //@@viewOff:private

    //@@viewOn:render
    const className = Config.Css.css``;
    const attrs = UU5.Common.VisualComponent.getAttrs(props, className);
    const currentNestingLevel = UU5.Utils.NestingLevel.getNestingLevel(props, STATICS);

    return currentNestingLevel ? (
      <div {...attrs}>
        <UU5.Forms.ContextSection>
          <UU5.Forms.ContextForm onSave={handleUpdate} onCancel={closeCallback}>
            <UU5.Forms.Text label={"Boat Name"} name="boatName" required />
            <UU5.Forms.Text label={"License Boat"} name="licenseBoat" required />
            <UU5.Forms.Text label={"Captain Name"} name="captainName" />

            <UU5.Forms.Text label={"DockingFrom"} name="dockingFrom" />
          </UU5.Forms.ContextForm>
          <UU5.Forms.ContextControls
            align={"center"}
            buttonSubmitProps={{ content: "Update" }}
            buttonCancelProps={{ content: "Cancel" }}
          />
        </UU5.Forms.ContextSection>
      </div>
    ) : null;
    //@@viewOff:render
  },
});

export default BoatUpdateModalForm;
