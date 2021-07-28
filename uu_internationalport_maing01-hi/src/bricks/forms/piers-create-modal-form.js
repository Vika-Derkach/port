//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent } from "uu5g04-hooks";
import Config from "./config/config";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "PiersCreateModalForm",
  nestingLevel: "bigBoxCollection",
  //@@viewOff:statics
};

export const PiersCreateModalForm = createVisualComponent({
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
      component.setPending();
      try {
        await callback({ ...values, pierId: urlId });
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

    //@@viewOn:render
    const className = Config.Css.css``;
    const attrs = UU5.Common.VisualComponent.getAttrs(props, className);
    const currentNestingLevel = UU5.Utils.NestingLevel.getNestingLevel(props, STATICS);

    return currentNestingLevel ? (
      <div {...attrs}>
        <UU5.Forms.ContextSection>
          <UU5.Forms.ContextForm onSave={handleCreate} onCancel={closeCallback}>
            <UU5.Forms.Text label={"Pier Name"} name="pierName" required />
            <UU5.Forms.Text label={"Location"} name="location" required />
            <UU5.Forms.Text label={"Max Capacity"} name="maxCapacity" />
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

export default PiersCreateModalForm;
