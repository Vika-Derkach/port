//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent } from "uu5g04-hooks";
import Config from "./config/config";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "PierDeleteForm",
  nestingLevel: "bigBoxCollection",
  //@@viewOff:statics
};
const delete_form = () => Config.Css.css`
  text-align: center;
  margin-bottom: 20px;
`;
const delete_form_text = () => Config.Css.css`
  text-align: center;
  margin-bottom: 20px;
`;
const button_cancel = () => Config.Css.css`
  margin-right: 5px;
`;
export const PierDeleteForm = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:interface
    //@@viewOff:interface
    const { pier, callback, closeCallback } = props;

    //@@viewOn:private
    const runDelete = async () => {
      try {
        await callback({
          id: pier.id,
        });
      } finally {
        closeCallback();
      }
    };
    //@@viewOff:private

    //@@viewOn:render
    const className = Config.Css.css``;
    const attrs = UU5.Common.VisualComponent.getAttrs(props, className);
    const currentNestingLevel = UU5.Utils.NestingLevel.getNestingLevel(props, STATICS);

    return currentNestingLevel ? (
      <div {...attrs}>
        <div className={delete_form()}>
          <UU5.Bricks.Text className={delete_form_text()}>
            <strong>Do you really want to delete these pier?</strong>{" "}
          </UU5.Bricks.Text>

          <UU5.Bricks.Button colorSchema="grey" onClick={closeCallback} className={button_cancel()}>
            Cancel
          </UU5.Bricks.Button>
          <UU5.Bricks.Button colorSchema="red" onClick={runDelete}>
            <UU5.Bricks.Icon icon="fa-trash" /> Delete
          </UU5.Bricks.Button>
        </div>
      </div>
    ) : null;
    //@@viewOff:render
  },
});

export default PierDeleteForm;
